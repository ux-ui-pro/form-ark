export interface CheckableOptions {
  containerSelector?: string;
}

export type CheckableType = 'checkbox' | 'radio';

export function addAriaCheckedAttribute(inputs: HTMLInputElement[]): void {
  inputs.forEach((input) => {
    input.setAttribute('aria-checked', String(input.checked));
  });
}

export function updateAriaCheckedAttribute(input: HTMLInputElement, container: Element): void {
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