export interface Display {
  setID(newID: string): void;
  getID(): string;

  getElementToRender(): HTMLElement;
}
