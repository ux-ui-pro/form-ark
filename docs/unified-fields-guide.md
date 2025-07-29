# Руководство по унифицированным стилям полей

## Обзор

Унифицированные стили полей (`unified-field.scss`) объединяют поведение `notched outline` и `floating label` для всех типов полей ввода: `input`, `textarea` и `select`. Это обеспечивает единообразный внешний вид и поведение всех компонентов формы.

## Основные компоненты

### 1. Field Container (`.field-container`)
Базовый контейнер для всех типов полей, который управляет состояниями и переменными CSS.

### 2. Unified Floating Label (`.unified-floating-label`)
Унифицированный плавающий лейбл, который работает одинаково для всех типов полей.

### 3. Unified Notched Outline (`.unified-notched-outline`)
Унифицированная рамка с вырезом, которая создает эффект Material Design. Использует CSS Grid для единообразного расположения элементов.

### 4. Unified Field Input (`.unified-field-input`)
Базовые стили для полей ввода.

## Структура HTML

### Для Input полей:
```html
<div class="field-container input-field">
  <div class="unified-notched-outline">
    <div class="unified-notched-outline__leading"></div>
    <div class="unified-notched-outline__notch"></div>
    <div class="unified-notched-outline__trailing"></div>
  </div>
  <label class="unified-floating-label">Email</label>
  <input type="email" class="unified-field-input" placeholder=" ">
</div>
```

### Для Textarea полей:
```html
<div class="field-container textarea-field">
  <div class="unified-notched-outline">
    <div class="unified-notched-outline__leading"></div>
    <div class="unified-notched-outline__notch"></div>
    <div class="unified-notched-outline__trailing"></div>
  </div>
  <label class="unified-floating-label">Описание</label>
  <textarea class="unified-field-input" placeholder=" "></textarea>
</div>
```

### Для Select полей:
```html
<div class="field-container select-field">
  <div class="unified-notched-outline">
    <div class="unified-notched-outline__leading"></div>
    <div class="unified-notched-outline__notch"></div>
    <div class="unified-notched-outline__trailing"></div>
  </div>
  <label class="unified-floating-label">Выберите опцию</label>
  <select class="unified-field-input">
    <option value="">Выберите опцию</option>
    <option value="1">Опция 1</option>
    <option value="2">Опция 2</option>
  </select>
</div>
```

## Состояния полей

### Базовые состояния:
- `.field--focused` - поле в фокусе
- `.field--filled` - поле заполнено данными
- `.field--error` - поле с ошибкой
- `.field--disabled` - отключенное поле

### Специфичные состояния для Select:
- `.field--selected` - выбрана опция
- `.field--opened` - выпадающий список открыт

## Модификаторы

### Размеры для Input:
- `.input--dense` - компактный размер (36px)
- `.input--large` - большой размер (70px)

### Иконки для Input:
- `.input--leading-icon` - иконка слева
- `.input--trailing-icon` - иконка справа

### Размеры для Select:
- `.select--dense` - компактный размер
- `.select--unlabeled` - без лейбла

## CSS переменные

### Базовые переменные:
```css
:root {
  --unified-field-border-radius: 6px;
  --unified-field-border-width: 1px;
  --unified-field-border-width-active: 2px;
  --unified-field-transition-duration: 150ms;
  --unified-field-transition-easing: cubic-bezier(0, 0.202, 0.204, 1);
  --unified-field-label-scale: 0.75;
  --unified-field-label-offset: 17px;
  --unified-field-icon-size: 24px;
  --unified-field-icon-offset: 12px;
}
```

### Переменные состояний:
```css
.field-container {
  --field-outline-width: var(--unified-field-border-width);
  --field-outline-color: var(--form-color-outline);
  --field-border-radius: var(--unified-field-border-radius);
  --field-transition-easing: var(--unified-field-transition-easing);
}
```

## Цветовые переменные

Унифицированные стили используют следующие цветовые переменные:

```css
--form-color-outline: #ccc;
--form-color-outline-hover: #999;
--form-color-outline-opened: #2196F3;
--form-color-activated: #4CAF50;
--form-color-error: #f44336;
--form-color-disabled: #999;
--form-color-label: #666;
--form-color-focused: #2196F3;
--form-color-text-field: #333;
--form-color-label-selected: #4CAF50;
--form-color-label-opened: #2196F3;
```

## Примеры использования

### Простое поле ввода:
```html
<div class="field-container input-field">
  <div class="unified-notched-outline">
    <div class="unified-notched-outline__leading"></div>
    <div class="unified-notched-outline__notch"></div>
    <div class="unified-notched-outline__trailing"></div>
  </div>
  <label class="unified-floating-label">Имя</label>
  <input type="text" class="unified-field-input" placeholder=" ">
</div>
```

### Поле с иконкой:
```html
<div class="field-container input-field input--leading-icon">
  <div class="unified-notched-outline">
    <div class="unified-notched-outline__leading"></div>
    <div class="unified-notched-outline__notch"></div>
    <div class="unified-notched-outline__trailing"></div>
  </div>
  <label class="unified-floating-label">Поиск</label>
  <input type="text" class="unified-field-input" placeholder=" ">
  <svg class="unified-field-icon icon--leading" viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
</div>
```

### Поле с ошибкой:
```html
<div class="field-container input-field field--error">
  <div class="unified-notched-outline">
    <div class="unified-notched-outline__leading"></div>
    <div class="unified-notched-outline__notch"></div>
    <div class="unified-notched-outline__trailing"></div>
  </div>
  <label class="unified-floating-label">Email</label>
  <input type="email" class="unified-field-input" placeholder=" ">
</div>
```

## JavaScript интеграция

Для автоматического управления состояниями можно использовать следующий JavaScript:

```javascript
// Автоматическое добавление состояния filled при вводе
document.querySelectorAll('.unified-field-input').forEach(input => {
  input.addEventListener('input', function() {
    const container = this.closest('.field-container');
    if (this.value.trim()) {
      container.classList.add('field--filled');
    } else {
      container.classList.remove('field--filled');
    }
  });
  
  input.addEventListener('focus', function() {
    const container = this.closest('.field-container');
    container.classList.add('field--focused');
  });
  
  input.addEventListener('blur', function() {
    const container = this.closest('.field-container');
    container.classList.remove('field--focused');
  });
});
```

## Кастомизация

### Изменение размеров:
```css
.custom-field {
  --unified-field-border-radius: 8px;
  --unified-field-border-width: 2px;
  --unified-field-border-width-active: 3px;
  --unified-field-label-scale: 0.8;
  --unified-field-label-offset: 20px;
}
```

### Темная тема:
```css
.dark-theme {
  --form-color-outline: #666;
  --form-color-outline-hover: #888;
  --form-color-outline-opened: #4CAF50;
  --form-color-activated: #2196F3;
  --form-color-error: #f44336;
  --form-color-disabled: #999;
  --form-color-label: #ccc;
  --form-color-focused: #4CAF50;
  --form-color-text-field: #fff;
}
```

## Технические детали

### CSS Grid Layout
Унифицированные стили используют CSS Grid для расположения элементов `notched outline`:
- `grid-template: 1fr / 12px auto 1fr` - создает три колонки: фиксированная левая (12px), автоматическая центральная, и растягивающаяся правая
- Единообразное поведение для всех типов полей (input, textarea, select)
- Упрощенная структура без необходимости в flex-свойствах

### Переменные CSS
Все размеры и цвета настраиваются через CSS переменные, что обеспечивает:
- Легкую кастомизацию
- Поддержку тем
- Консистентность между компонентами

## Преимущества унифицированных стилей

1. **Единообразие**: Все поля выглядят и ведут себя одинаково
2. **Переиспользование**: Один набор стилей для всех типов полей
3. **Легкость поддержки**: Меньше дублирования кода
4. **Гибкость**: Легко кастомизировать через CSS переменные
5. **Совместимость**: Работает с существующими компонентами
6. **Современность**: Использование CSS Grid для лучшего контроля над layout

## Миграция с существующих стилей

Для миграции с существующих стилей:

1. Замените классы `.text-field-container` на `.field-container`
2. Замените классы `.floating-label` на `.unified-floating-label`
3. Замените классы `.notched-outline` на `.unified-notched-outline`
4. Добавьте соответствующие модификаторы типа поля (`.input-field`, `.textarea-field`, `.select-field`)
5. Обновите состояния согласно новой системе

## Демонстрация

Смотрите файл `examples/unified-fields-demo.html` для интерактивной демонстрации всех возможностей унифицированных стилей. 