import { createNotchedOutline, getNotchWidth, setNotchWidth } from '../utils/NotchedOutline';

export class Input {
  private inputs = Array.from(
    document.querySelectorAll<HTMLInputElement>('.form-item input[type="text"], .form-item input[type="email"], .form-item input[type="password"], .form-item input[type="search"], .form-item input[type="tel"], .form-item input[type="url"], .form-item input[type="number"], .form-item input:not([type])'),
  );

  private updateContainer(input: HTMLInputElement): void {
    const container = input.closest('.form-item') as HTMLElement;
    if (!container) return;
    let notchedOutline = container.querySelector('.notched-outline') as HTMLElement;
    if (!notchedOutline) {
      const label = container.querySelector('.floating-label') as HTMLElement;
      if (label) {
        notchedOutline = createNotchedOutline(label);
      }
    }

    if (typeof ResizeObserver !== 'undefined' && notchedOutline) {
      const label = notchedOutline.querySelector('.floating-label') as HTMLElement;
      if (label) {
        const observer = new ResizeObserver(() => {
          const notch = notchedOutline.querySelector('.notched-outline__notch') as HTMLElement;
          if (notch) {
            setNotchWidth(notch, getNotchWidth(notch));
          }
        });
        observer.observe(label);
      }
    }

    input.addEventListener('focus', () => {
      container.classList.add('input--focused');
      if (notchedOutline) {
        const notch = notchedOutline.querySelector('.notched-outline__notch') as HTMLElement;
        if (notch) {
          setNotchWidth(notch, getNotchWidth(notch));
        }
      }
    });

    input.addEventListener('blur', () => {
      container.classList.remove('input--focused');
      if (notchedOutline) {
        const notch = notchedOutline.querySelector('.notched-outline__notch') as HTMLElement;
        if (notch) {
          setNotchWidth(notch, input.value.trim() ? getNotchWidth(notch) : 'auto');
        }
      }
    });

    input.addEventListener('change', () => {
      container.classList.toggle('input--filled', input.value.trim().length > 0);
      container.classList.toggle('input--disabled', input.disabled);
    });

    container.classList.toggle('input--filled', input.value.trim().length > 0);
    container.classList.toggle('input--disabled', input.disabled);
  }

  public init(): void {
    if (typeof document === 'undefined') return;
    this.inputs.forEach((input) => {
      this.updateContainer(input);
    });
  }
}
