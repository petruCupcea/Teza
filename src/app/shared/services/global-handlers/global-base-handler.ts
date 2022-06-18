import { ApiClientService } from 'common/request';
import { HandlerOptions } from 'common/structures';
import { RingBuffer } from 'common/core/lib';


declare const window: any;


export class GlobalBaseHandler<T> {

  protected ringBuffer: RingBuffer<T>;
  protected isFull: boolean;
  protected timer: any;


  constructor(
    protected apiClientService: ApiClientService,
    protected options: HandlerOptions,
  ) {
    this.options = {
      storeKey: 'BaseHandler',
      maxSize: 10,
      consideredFullSize: 5,
      timerIntervalInMs: 60 * 1000,
      apiRequestKey: undefined,
      ...this.options,
    };


    this.ringBuffer = RingBuffer.fromPlain(
      JSON.parse(window.localStorage.getItem(this.options.storeKey)),
      this.options.maxSize,
    );

    this.ringBuffer.updated$.subscribe((length: number) => {
      this.handleBufferUpdate(length);
    });

    this.timer = setInterval(() => {
      this.uploadItemsToServer();
    }, this.options.timerIntervalInMs);
  }


  handleBufferUpdate(length: number) {
    if (!this.isFull && length >= this.options.consideredFullSize) {
      this.isFull = true;
      this.uploadItemsToServer();
    } else {
      window.localStorage.setItem(this.options.storeKey, JSON.stringify(this.ringBuffer));
    }
  }


  uploadItemsToServer() {
    const items = this.ringBuffer.splice(0, this.ringBuffer.length);
    if (this.options.apiRequestKey && items && items.length) {
      this.apiClientService.call(this.options.apiRequestKey, {
        payload: {
          list: JSON.parse(JSON.stringify(items)),
        },
      }).subscribe(() => {
        this.isFull = false;
      }, () => {
        // in case of failure...retry sending the errors again the next time around
        this.ringBuffer.unshift(...items);
      });
    }
  }

}
