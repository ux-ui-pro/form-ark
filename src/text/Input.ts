import { createNotchedOutline, getNotchWidth, setNotchWidth } from '../utils/NotchedOutline';

export class Input {
  public init(): void {
    if (typeof document === 'undefined') return;
    const inputs = Array.from(
      document.querySelectorAll<HTMLInputElement>('.text-field-container input'),
    );
    inputs.forEach((input) => {
      const container = input.closest('.text-field-container') as HTMLElement;
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
    });
  }
}
