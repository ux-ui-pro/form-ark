# Checkable Components

Библиотека предоставляет отдельные компоненты для различных типов чекбоксов и переключателей.

## Компоненты

### Checkbox
Обрабатывает обычные чекбоксы (`input[type="checkbox"]` без `role="switch"`).

```typescript
import { Checkbox } from './checkable/Checkbox';

const checkbox = new Checkbox();
checkbox.init();
```

### Radio
Обрабатывает радио-кнопки (`input[type="radio"]` без `role="switch"`).

```typescript
import { Radio } from './checkable/Radio';

const radio = new Radio();
radio.init();
```

### Switch
Обрабатывает переключатели (`input[role="switch"]`).

```typescript
import { Switch } from './checkable/Switch';

const switchComponent = new Switch();
switchComponent.init();
```

## Преимущества разделения

1. **Tree-shaking**: Импортируйте только нужные компоненты
2. **Меньший размер бандла**: Загружаются только используемые компоненты
3. **Лучшая производительность**: Нет лишнего кода
4. **Гибкость**: Можно настроить каждый компонент отдельно

## Обратная совместимость

Для обратной совместимости сохранен объединенный класс `Checkable`:

```typescript
import { Checkable } from './checkable/Checkable';

const checkable = new Checkable();
checkable.init();
```

## Настройка

Все компоненты принимают опции:

```typescript
const checkbox = new Checkbox({
  containerSelector: '.my-form' // по умолчанию '.form-item'
});
``` 