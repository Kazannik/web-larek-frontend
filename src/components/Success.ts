import { IActions, ISuccess } from "../types";
import { TXT_ACTION, TXT_CURRENCY } from "../utils/constants";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export class Success extends Component<ISuccess> {
  protected _close: HTMLElement;
  protected _price: HTMLElement;
  constructor(container: HTMLElement, actions: IActions) {
      super(container);
      this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
      this._price = ensureElement<HTMLElement>('.order-success__description', this.container);
      if (actions?.onClick) {
          this._close.addEventListener('click', actions.onClick);
      }
  }
  set price (value: number) {
      this.setText(this._price, TXT_ACTION + ` ${value} ` + TXT_CURRENCY);
  }
}