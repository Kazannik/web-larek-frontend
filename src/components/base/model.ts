import { IEvents } from './events';

export const isObjectModel = (obj: unknown): obj is objectModel<any> => {
  return obj instanceof objectModel;
};

export abstract class objectModel<T> {
  constructor(data: Partial<T>, protected event: IEvents) {
    Object.assign(this, data);
  }


  emitChanges(evt: string, payload?: object) {
    this.event.emit(evt, payload ?? {});
  }
}