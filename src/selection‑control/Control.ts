export class Control {
  private containerSelector: string;
  private controlBoxContainers: Element[];

  constructor(containerSelector: string = '.control-container') {
    this.containerSelector = containerSelector;
    if (typeof document !== 'undefined') {
      this.controlBoxContainers = Array.from(document.querySelectorAll(this.containerSelector));
    } else {
      this.controlBoxContainers = [];
    }
  }

  public init(): void {
    if (!this.controlBoxContainers.length) {
      return;
    }
    this.controlBoxContainers.forEach((container) => {
      const checkboxes = Array.from(
        container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'),
      );
      const radios = Array.from(
        container.querySelectorAll<HTMLInputElement>('input[type="radio"]'),
      );

      Control.addAriaCheckedAttribute([...checkboxes, ...radios]);

      container.addEventListener('click', (event: Event) => {
        const target = event.target as Element;
        if (
          target instanceof HTMLInputElement &&
          (target.type === 'checkbox' || target.type === 'radio')
        ) {
          Control.controlBoxAriaCheckedAttribute(target, container);
        }
      });
    });
  }

  private static addAriaCheckedAttribute(inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => {
      input.setAttribute('aria-checked', String(input.checked));
    });
  }

  private static controlBoxAriaCheckedAttribute(input: HTMLInputElement, container: Element): void {
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
