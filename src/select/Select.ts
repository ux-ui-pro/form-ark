import { createNotchedOutline, getNotchWidth, setNotchWidth } from '../utils/NotchedOutline';

interface SelectOptionsConfig {
  mobileMode?: boolean;
}

export class Select {
  private selectContainer: HTMLSelectElement[] = [];
  private floatingLabel: HTMLElement[] = [];
  private customSelects: HTMLElement[] = [];
  private openSelect: HTMLElement | null = null;
  private resizeObserver: ResizeObserver;
  private mobileMode: boolean = false;

  private static CLASSES = {
    selectContainer: 'field-container',
    selectOption: 'select',
    floatingLabel: 'floating-label',
    selectOptionTrigger: 'select-option-trigger',
    selectOptionList: 'select-option-list',
    selectOptionListItem: 'select-option-list-item',
    selectOptionListItemSelected: 'select-option-list-item--selected',
    selectOptionOpened: 'select--opened',
    selectOptionMobile: 'select--mobile',
    selectOptionSelected: 'select--selected',
    selectOptionLabeled: 'select--labeled',
    selectOptionUnlabeled: 'select--unlabeled',
    selectOptionDownstairs: 'select--downstairs',
    notchedOutline: 'notched-outline',
    notchedOutlineNotch: 'notched-outline__notch',
  };

  constructor({ mobileMode = false }: SelectOptionsConfig = {}) {
    this.mobileMode = mobileMode;
    if (typeof document !== 'undefined') {
      this.selectContainer = Array.from(
        document.querySelectorAll(`.${Select.CLASSES.selectContainer} select`),
      );
      this.floatingLabel = Array.from(
        document.querySelectorAll(`.${Select.CLASSES.floatingLabel}`),
      );
    }
    this.resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const notchElement = entry.target
          .closest(`.${Select.CLASSES.notchedOutline}`)
          ?.querySelector(`.${Select.CLASSES.notchedOutlineNotch}`) as HTMLElement | null;
        if (notchElement) {
          setNotchWidth(notchElement, getNotchWidth(notchElement));
        }
      });
    });
  }

  private notched(): void {
    this.floatingLabel.forEach((label) => {
      let notchedOutline = label.closest(`.notched-outline`);
      let notch: HTMLElement;
      if (!notchedOutline) {
        notchedOutline = createNotchedOutline(label);
        notch = notchedOutline.querySelector('.notched-outline__notch') as HTMLElement;
        label = notch.querySelector('.floating-label') as HTMLElement;
      } else {
        notch = notchedOutline.querySelector('.notched-outline__notch') as HTMLElement;
        label = notch.querySelector('.floating-label') as HTMLElement;
      }
      setNotchWidth(notch, getNotchWidth(notch));
      this.resizeObserver.observe(label);
    });
  }

  private setupCustomSelect(
    selectElement: HTMLSelectElement,
    customSelect: HTMLElement,
    options: HTMLOptionElement[],
  ): void {
    let selectTrigger: HTMLElement | null = customSelect.querySelector(
      `.${Select.CLASSES.selectOptionTrigger}`,
    );
    let selectItems: HTMLElement | null = customSelect.querySelector(
      `.${Select.CLASSES.selectOptionList}`,
    );

    if (!(selectTrigger instanceof HTMLElement)) {
      selectTrigger = document.createElement('div');
      selectTrigger.classList.add(Select.CLASSES.selectOptionTrigger);
    }

    if (!(selectItems instanceof HTMLElement)) {
      selectItems = document.createElement('div');
      selectItems.classList.add(Select.CLASSES.selectOptionList);
    }

    customSelect.append(selectTrigger, selectItems);

    this.createOptions(selectElement, selectTrigger, selectItems, options);

    selectTrigger.addEventListener('click', (e) => {
      this.toggleDropdown(e, customSelect);
    });

    Select.updateCustomSelectState(customSelect, selectElement);
    this.customSelects.push(customSelect);

    selectElement.addEventListener('change', () => {
      this.updateCustomSelect(selectElement, customSelect, options);
    });

    if (this.mobileMode && Select.isMobileDevice()) {
      customSelect.classList.add(Select.CLASSES.selectOptionMobile);
    }
  }

  private createOptions(
    selectElement: HTMLSelectElement,
    selectTrigger: HTMLElement,
    selectItems: HTMLElement,
    options: HTMLOptionElement[],
  ): void {
    selectItems.innerHTML = '';
    options.forEach((option, index) => {
      if (option.disabled) return;
      const selectItem = document.createElement('div');
      selectItem.classList.add(Select.CLASSES.selectOptionListItem);
      selectItem.textContent = option.textContent;
      const customValue = option.getAttribute('data-custom');
      if (customValue) {
        selectItem.classList.add(`${Select.CLASSES.selectOptionListItem}--${customValue}`);
      }
      if (option.selected) {
        selectItem.classList.add(Select.CLASSES.selectOptionListItemSelected);
        selectTrigger.textContent = option.textContent;
        if (customValue) {
          selectTrigger.classList.add(`${Select.CLASSES.selectOptionTrigger}--${customValue}`);
        }
      }
      selectItem.addEventListener('click', () =>
        this.selectItem(selectTrigger, selectElement, index, selectItems),
      );
      selectItems.appendChild(selectItem);
    });
  }

  private updateCustomSelect(
    selectElement: HTMLSelectElement,
    customSelect: HTMLElement,
    options: HTMLOptionElement[],
  ): void {
    const selectTrigger = customSelect.querySelector(
      `.${Select.CLASSES.selectOptionTrigger}`,
    ) as HTMLElement;
    const selectItems = customSelect.querySelector(
      `.${Select.CLASSES.selectOptionList}`,
    ) as HTMLElement;
    const { selectedIndex } = selectElement;
    const selectedOption = options[selectedIndex];
    const customValue = selectedOption.getAttribute('data-custom');
    selectTrigger.textContent = selectedOption.textContent;
    Select.updateClasses(selectTrigger, `${Select.CLASSES.selectOptionTrigger}--${customValue}`);
    customSelect.classList.toggle(Select.CLASSES.selectOptionSelected, selectedIndex > 0);
    this.createOptions(selectElement, selectTrigger, selectItems, options);
  }

  private selectItem(
    selectTrigger: HTMLElement,
    selectElement: HTMLSelectElement,
    index: number,
    selectItems: HTMLElement,
  ): void {
    selectElement.selectedIndex = index;
    selectElement.dispatchEvent(new Event('change'));
    this.createOptions(
      selectElement,
      selectTrigger,
      selectItems,
      Array.from(selectElement.options),
    );
    this.closeDropdown(selectTrigger.closest(`.${Select.CLASSES.selectOption}`) as HTMLElement);
  }

  private closeDropdown(customSelect: HTMLElement): void {
    customSelect.classList.remove(Select.CLASSES.selectOptionOpened);
    this.openSelect = null;
    const selectTrigger = customSelect.querySelector(
      `.${Select.CLASSES.selectOptionTrigger}`,
    ) as HTMLElement;
    if (selectTrigger) {
      selectTrigger.blur();
    }
  }

  private openDropdown(customSelect: HTMLElement): void {
    this.closeOpenedDropdowns();
    customSelect.classList.add(Select.CLASSES.selectOptionOpened);
    this.openSelect = customSelect;
  }

  private closeOpenedDropdowns(e?: MouseEvent): void {
    this.customSelects.forEach((dropdown) => {
      if (!e || !dropdown.contains(e.target as Node)) {
        dropdown.classList.remove(Select.CLASSES.selectOptionOpened);
      }
    });
    this.openSelect = null;
  }

  private toggleDropdown(e: Event, customSelect: HTMLElement): void {
    e.stopPropagation();
    if (customSelect.classList.contains(Select.CLASSES.selectOptionOpened)) {
      this.closeDropdown(customSelect);
    } else {
      this.openDropdown(customSelect);
    }
  }

  private static checkAndSetDownstairsClass(customSelect: HTMLElement): void {
    const rect = customSelect.getBoundingClientRect();
    customSelect.classList.toggle(
      Select.CLASSES.selectOptionDownstairs,
      rect.bottom + 160 > window.innerHeight,
    );
  }

  private handleResize = (): void => {
    this.customSelects.forEach((customSelect) => {
      Select.checkAndSetDownstairsClass(customSelect);
    });
  };

  private static isMobileOS(): boolean {
    return (
      /android/i.test(navigator.userAgent || '') ||
      (/iPad|iPhone|iPod/.test(navigator.userAgent || '') && !('MSStream' in window))
    );
  }

  private static isTouchDevice(): boolean {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(hover: none) and (pointer: coarse)').matches
    );
  }

  private static isMobileDevice(): boolean {
    return Select.isTouchDevice() || Select.isMobileOS();
  }

  private static updateCustomSelectState(
    customSelect: HTMLElement,
    selectElement: HTMLSelectElement,
  ): void {
    const hasLabel = customSelect.querySelector(`label.${Select.CLASSES.floatingLabel}`) !== null;
    customSelect.classList.toggle(Select.CLASSES.selectOptionLabeled, hasLabel);
    customSelect.classList.toggle(Select.CLASSES.selectOptionUnlabeled, !hasLabel);
    customSelect.classList.toggle(
      Select.CLASSES.selectOptionSelected,
      hasLabel && selectElement.selectedIndex > 0,
    );
  }

  private static updateClasses(element: HTMLElement, className: string): void {
    const regex = new RegExp(`^${Select.CLASSES.selectOptionTrigger}--`);
    element.classList.forEach((cls) => {
      if (regex.test(cls)) {
        element.classList.remove(cls);
      }
    });
    if (className) element.classList.add(className);
  }

  public updateSelects(): void {
    this.selectContainer.forEach((selectElement) => {
      const customSelect = selectElement
        .closest(`.${Select.CLASSES.selectContainer}`)
        ?.querySelector(`.${Select.CLASSES.selectOption}`) as HTMLElement;
      const options = Array.from(selectElement.options);
      if (customSelect) {
        this.updateCustomSelect(selectElement, customSelect, options);
      }
    });
  }

  public init(): void {
    if (typeof document === 'undefined') return;
    this.notched();
    this.selectContainer.forEach((selectElement) => {
      const customSelect = selectElement
        .closest(`.${Select.CLASSES.selectContainer}`)
        ?.querySelector(`.${Select.CLASSES.selectOption}`) as HTMLElement;
      const options = Array.from(selectElement.options);
      if (customSelect) {
        this.setupCustomSelect(selectElement, customSelect, options);
        Select.checkAndSetDownstairsClass(customSelect);
      }
    });
    document.addEventListener('pointerdown', (e) => this.closeOpenedDropdowns(e));
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleResize);
  }
}
