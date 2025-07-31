export class Checkable {
  private containerSelector: string;
  private checkableBoxContainers: Element[];

  constructor(containerSelector: string = '.form-item') {
    this.containerSelector = containerSelector;
    if (typeof document !== 'undefined') {
      this.checkableBoxContainers = Array.from(document.querySelectorAll(this.containerSelector));
    } else {
      this.checkableBoxContainers = [];
    }
  }

  public init(): void {
    if (!this.checkableBoxContainers.length) {
      return;
    }
    this.checkableBoxContainers.forEach((container) => {
      const checkboxes = Array.from(
        container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'),
      );
      const radios = Array.from(
        container.querySelectorAll<HTMLInputElement>('input[type="radio"]'),
      );

      Checkable.addAriaCheckedAttribute([...checkboxes, ...radios]);

      container.addEventListener('click', (event: Event) => {
        const target = event.target as Element;
        if (
          target instanceof HTMLInputElement &&
          (target.type === 'checkbox' || target.type === 'radio')
        ) {
          Checkable.checkableBoxAriaCheckedAttribute(target, container);
        }
      });
    });
  }

  private static addAriaCheckedAttribute(inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => {
      input.setAttribute('aria-checked', String(input.checked));
    });
  }

  private static checkableBoxAriaCheckedAttribute(input: HTMLInputElement, container: Element): void {
    const groupName = input.getAttribute('name');
    if (groupName) {
      const groupInputs = container.querySelectorAll<HTMLInputElement>(
        `input[name="${groupName}"]`,
      );
      groupInputs.forEach((groupInput) => {
        groupInput.setAttribute('aria-checked', String(groupInput.checked));
      });
    } else {
      input.setAttribute('aria-checked', String(input.checked));
    }
  }
}
