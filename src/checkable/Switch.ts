import { CheckableOptions, addAriaCheckedAttribute, updateAriaCheckedAttribute } from './types';

export class Switch {
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
      const switches = Array.from(
        container.querySelectorAll<HTMLInputElement>('input[role="switch"]'),
      );

      addAriaCheckedAttribute(switches);

      container.addEventListener('click', (event: Event) => {
        const target = event.target as Element;
        if (target instanceof HTMLInputElement && target.getAttribute('role') === 'switch') {
          updateAriaCheckedAttribute(target, container);
        }
      });
    });
  }
} 