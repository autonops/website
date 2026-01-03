# Autonops Design Tokens

Single source of truth for design values across all Autonops applications.

## Usage

### In HTML/CSS (Marketing Site)

```html
<link rel="stylesheet" href="/path/to/tokens.css">
```

Then use CSS variables:

```css
.button {
  background: var(--color-primary);
  border-radius: var(--radius-md);
}
```

### In Tailwind (Dashboard)

Import the JSON tokens in `tailwind.config.ts`:

```typescript
import tokens from '../../packages/design-tokens/tokens.json'

export default {
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary.default,
        // ...
      }
    }
  }
}
```

## Files

- `tokens.css` - CSS custom properties for direct use
- `tokens.json` - JSON format for programmatic use
