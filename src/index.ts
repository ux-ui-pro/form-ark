export * from './core';
import { Controls } from './controls/Controls';
import { Input } from './text/Input';
import { Textarea } from './text/Textarea';
import { Select } from './select/Select';

function initFormElements(): void {
  new Controls().init();
  new Input().init();
  new Textarea().init();
  new Select().init();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormElements);
  } else {
    initFormElements();
  }
}
