import { Observable,  Subject } from 'rxjs';


export class RingBuffer<T> extends Array<T> {

  /**
   * Emits everytime elements get inserts or removed from the buffer, emitting the newLength of the array.
   */
  updated$: Observable<number>;
  private readonly _maxSize: number;
  private readonly updatedSubject: Subject<number>;


  /**
   * Creates a RingBuffer from a regular Array.
   *
   * @param plainArray The array to convert to a ring buffer.
   * @param maxSize The max size of the ring buffer.
   * If left undefined, the current size of the array will be used.
   */
  // eslint-disable-next-line no-shadow
  static fromPlain<T>(plainArray: Array<T>, maxSize?: number): RingBuffer<T> {
    maxSize = maxSize || plainArray.length;
    const ringBuffer = new RingBuffer<T>(maxSize);
    if (plainArray && plainArray.length) {
      ringBuffer.push(...plainArray);
    }

    return ringBuffer;
  }


  constructor(maxSize: number) {
    super();
    // See: https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work

    if (!Object.setPrototypeOf) {
      // Polyfill for IE<11
      Object.setPrototypeOf = (origin: any, proto: any) => {
        for (const prop in proto) {
          if (prop) {
            origin[prop] = proto[prop];
          }
        }

        return origin;
      };
    }

    Object.setPrototypeOf(this, RingBuffer.prototype);
    this._maxSize = maxSize;
    this.updatedSubject = new Subject<number>();
    this.updated$ = this.updatedSubject.asObservable();
  }


  get maxSize(): number {
    return this._maxSize;
  }


  /**
   * Adds one or more items to the end of the array.
   * Returns the new length of the array
   *
   * @param items Additional items to add to the end of array.
   */
  push(...items: Array<T>): number {
    this.shiftBack(items.length);

    const newLength = super.push(...items);
    this.updatedSubject.next(newLength);

    return newLength;
  }


  /**
   * Combines two or more arrays.
   *
   * @param items Additional items to add to the end of array.
   */
  concat<U extends Array<T>>(...items: Array<U>): Array<T>;


  /**
   * Combines two or more arrays.
   *
   * @param items Additional items to add to the end of array.
   */
  concat(...items: Array<T>): Array<T> {
    this.shiftBack(items.length);
    const newArray = super.concat(items);
    this.updatedSubject.next(newArray.length);

    return newArray;
  }


  /**
   * Removes elements from an array and, if necessary,
   * inserts new elements in their place, returning the deleted elements.
   *
   * @param start The zero-based location in the array from which
   * to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @param items Elements to insert into the array in place of the deleted elements.
   */
  splice(start: number, deleteCount?: number, ...items: Array<T>): Array<T> {
    const removed = super.splice(start, deleteCount);
    const newLength = this.push(...items);
    this.updatedSubject.next(newLength);

    return removed;
  }


  /**
   * Inserts new elements at the start of an array.
   *
   * @param items  Elements to insert at the start of the Array.
   */
  unshift(...items: Array<T>): number {
    this.shiftForward(items.length);
    const newLength = super.unshift(...items);
    this.updatedSubject.next(newLength);

    return newLength;
  }


  private shiftBack(length: number) {
    const overwrite = (this.length + length) - this.maxSize;

    if (overwrite > 0) {
      super.splice(0, overwrite);
    }
  }


  private shiftForward(length: number) {
    const overwrite = (this.length + length) - this.maxSize;

    if (overwrite > 0) {
      const startAt = this.length - overwrite;
      super.splice(startAt, overwrite);
    }
  }

}
