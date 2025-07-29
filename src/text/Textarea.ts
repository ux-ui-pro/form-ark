import { createNotchedOutline, getNotchWidth, setNotchWidth } from '../utils/NotchedOutline';

export class Textarea {
  public init(): void {
    if (typeof document === 'undefined') return;
    const textareas = Array.from(
      document.querySelectorAll<HTMLTextAreaElement>('.text-field-container textarea'),
    );
    textareas.forEach((textarea) => {
      const container = textarea.closest('.text-field-container') as HTMLElement;
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

      textarea.addEventListener('focus', () => {
        container.classList.add('textarea--focused');
        if (notchedOutline) {
          const notch = notchedOutline.querySelector('.notched-outline__notch') as HTMLElement;
          if (notch) {
            setNotchWidth(notch, getNotchWidth(notch));
          }
        }
      });

      textarea.addEventListener('blur', () => {
        container.classList.remove('textarea--focused');
        if (notchedOutline) {
          const notch = notchedOutline.querySelector('.notched-outline__notch') as HTMLElement;
          if (notch) {
            setNotchWidth(notch, textarea.value.trim() ? getNotchWidth(notch) : 'auto');
          }
        }
      });

      textarea.addEventListener('input', () => {
        container.classList.toggle('textarea--filled', textarea.value.trim().length > 0);
        container.classList.toggle('textarea--disabled', textarea.disabled);

        if (container.classList.contains('textarea--auto-resizeable')) {
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      });

      container.classList.toggle('textarea--filled', textarea.value.trim().length > 0);
      container.classList.toggle('textarea--disabled', textarea.disabled);
    });
  }
}
