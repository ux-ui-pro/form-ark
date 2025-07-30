export * from './core';

import './styles/index.scss';

import { Control } from './selection‑control/Control';
import { Input } from './text‑field/Input';
import { Textarea } from './text‑field/Textarea';
import { Select } from './dropdown/Select';

function initFormElements(): void {
  new Control().init();
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
