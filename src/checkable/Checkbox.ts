import { CheckableOptions, addAriaCheckedAttribute, updateAriaCheckedAttribute } from './types';

export class Checkbox {
  private containerSelector: string;
  private checkableBoxContainers: Element[];

  constructor(options: CheckableOptions = {}) {
    this.containerSelector = options.containerSelector || '.form-item';
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
        container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not([role="switch"])'),
      );

      addAriaCheckedAttribute(checkboxes);

      container.addEventListener('click', (event: Event) => {
        const target = event.target as Element;
        if (target instanceof HTMLInputElement && target.type === 'checkbox' && target.getAttribute('role') !== 'switch') {
          updateAriaCheckedAttribute(target, container);
        }
      });
    });
  }
} 