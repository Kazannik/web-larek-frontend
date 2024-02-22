import { IEvents } from "./events";

export abstract class Component<T> {
  constructor(protected readonly container: HTMLElement) { }

  toggleClass(element: HTMLElement, className: string, state?: boolean) {
    element.classList.toggle(className, state);
  }


  protected setText(element: HTMLElement, value: unknown, additionalText?: string) {
    element.textContent = String(value) + (additionalText || '');
  }


  setDisabled(element: HTMLElement, state: boolean) {
    element?.toggleAttribute(`disabled`, state);
  }


  protected setHide(element: HTMLElement) {
    element.style.display = 'none';
  }


  protected setVisible(element: HTMLElement) {
    element?.style.removeProperty(`display`);
  }


  protected setImage(element: HTMLImageElement, src: string, alt: string) {
    element.src = src;
    element.alt = alt;
  }


  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }
}

