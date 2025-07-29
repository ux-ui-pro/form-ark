export class Controls {
  private containerSelector: string;
  private tickBoxContainers: Element[];

  constructor(containerSelector: string = '.tickbox-container') {
    this.containerSelector = containerSelector;
    if (typeof document !== 'undefined') {
      this.tickBoxContainers = Array.from(document.querySelectorAll(this.containerSelector));
    } else {
      this.tickBoxContainers = [];
    }
  }

  public init(): void {
    if (!this.tickBoxContainers.length) {
      return;
    }
    this.tickBoxContainers.forEach((container) => {
      const checkboxes = Array.from(
        container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'),
      );
      const radios = Array.from(
        container.querySelectorAll<HTMLInputElement>('input[type="radio"]'),
      );

      Controls.addAriaCheckedAttribute([...checkboxes, ...radios]);

      container.addEventListener('click', (event: Event) => {
        const target = event.target as Element;
        if (
          target instanceof HTMLInputElement &&
          (target.type === 'checkbox' || target.type === 'radio')
        ) {
          Controls.tickBoxAriaCheckedAttribute(target, container);
        }
      });
    });
  }

  private static addAriaCheckedAttribute(inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => {
      input.setAttribute('aria-checked', String(input.checked));
    });
  }

  private static tickBoxAriaCheckedAttribute(input: HTMLInputElement, container: Element): void {
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
