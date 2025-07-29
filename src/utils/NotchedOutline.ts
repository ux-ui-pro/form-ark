export interface NotchedOutlineClasses {
  outline: string;
  notch: string;
  leading: string;
  trailing: string;
}

export const DEFAULT_NOTCHED_CLASSES: NotchedOutlineClasses = {
  outline: 'notched-outline',
  notch: 'notched-outline__notch',
  leading: 'notched-outline__leading',
  trailing: 'notched-outline__trailing',
};

export function createNotchedOutline(
  label: HTMLElement,
  classes: NotchedOutlineClasses = DEFAULT_NOTCHED_CLASSES,
): HTMLElement {
  const notchedOutline = document.createElement('div');
  notchedOutline.classList.add(classes.outline);
  notchedOutline.innerHTML = `
    <div class="${classes.leading}"></div>
    <div class="${classes.notch}">${label.outerHTML}</div>
    <div class="${classes.trailing}"></div>
  `;

  label.replaceWith(notchedOutline);
  return notchedOutline;
}

export function getNotchWidth(notch: HTMLElement): string {
  const label = notch.querySelector('.floating-label') as HTMLElement;
  if (label) {
    const computed = getComputedStyle(label);
    const width = parseFloat(computed.width);
    return `${(width + 13) * 0.75}px`;
  }
  return 'auto';
}

export function setNotchWidth(notch: HTMLElement, width: string): void {
  notch.style.width = width;
}
