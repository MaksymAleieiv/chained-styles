# Chained Styles

A tree-shakeable styled-components library for React and React Native with support for both web and native platforms.

## Features

- 🌳 **Tree-shakeable**: Import only what you need (web or native)
- 🎨 **Comprehensive styling**: Flex, sizing, positioning, borders, opacity, and more
- 🔧 **TypeScript support**: Full type safety with intellisense
- 📱 **Platform-specific**: Separate optimized builds for web and native
- 🎯 **Styled-components**: Built on top of the popular styled-components library

## Installation

```bash
bun add chained-styles
# or
npm install chained-styles
# or
yarn add chained-styles
```

## Usage

### Tree-shakeable Imports (Recommended)

For optimal bundle size, import directly from the platform-specific modules:

#### Web Components

```typescript
import {
  styledComponents,
  defaultStyles,
  generateWebStyle,
} from "chained-styles/web";

// Use web-specific HTML elements
const StyledDiv = styledComponents.Div({
  width: 100,
  height: 100,
  backgroundColor: "blue",
});

const StyledButton = styledComponents.Button({
  padding: 16,
  borderRadius: 8,
});

// Available web components:
// Div, Section, Article, Header, Footer, Main, Nav, Aside
// Span, P, H1-H6, Strong, Em, Small
// Ul, Ol, Li
// Button, A, Input, Textarea, Select, Option, Label, Form
// Img, Video, Audio
// Table, Thead, Tbody, Tr, Td, Th
```

#### React Native Components

```typescript
import {
  styledComponents,
  defaultStyles,
  generateNativeStyle,
} from "chained-styles/native";

// Use React Native components
const StyledView = styledComponents.View({
  width: 100,
  height: 100,
  backgroundColor: "blue",
});

const StyledTouchable = styledComponents.TouchableOpacity({
  padding: 16,
  borderRadius: 8,
});

// Available native components:
// View, Pressable, TouchableOpacity, TouchableHighlight
// Text, TextInput, AnimatedTextInput
// AnimatedView, AnimatedText
```

### Legacy Import (Includes Both Platforms)

```typescript
import { web, native } from "chained-styles";

// Access web components
const WebDiv = web.styledComponents.Div({ width: 100 });

// Access native components
const NativeView = native.styledComponents.View({ width: 100 });
```

## Available Styles

All platforms support the following style categories:

### Size Styles

- `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`
- `w`, `h`, `minW`, `maxW`, `minH`, `maxH` (shortcuts)

### Flex Styles

- `flex`, `flexDirection`, `justifyContent`, `alignItems`, `alignSelf`
- `flexWrap`, `alignContent`, `gap`, `rowGap`, `columnGap`

### Position Styles

- `position`, `top`, `right`, `bottom`, `left`
- `zIndex`

### Border Styles

- `border`, `borderWidth`, `borderColor`, `borderStyle`
- `borderRadius`, `borderTop`, `borderRight`, `borderBottom`, `borderLeft`

### Text Styles

- `fontSize`, `fontWeight`, `fontFamily`, `lineHeight`
- `textAlign`, `textDecoration`, `textTransform`, `color`

### Opacity

- `opacity`

## Generating Custom Styles

Both platforms provide helper functions to generate custom styled components with colors:

### Web

```typescript
import { generateWebStyle } from "chained-styles/web";

const colors = {
  primary: "#007bff",
  secondary: "#6c757d",
  success: "#28a745",
};

const additionalStyles = {
  card: {
    padding: 16,
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
};

const customStyles = generateWebStyle(colors, additionalStyles);

// Use generated styles
const PrimaryButton = customStyles.Button.primary.card();
const SecondaryDiv = customStyles.Div.secondary.card();
```

### React Native

```typescript
import { generateNativeStyle } from "chained-styles/native";

const colors = {
  primary: "#007bff",
  secondary: "#6c757d",
};

const additionalStyles = {
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

const customStyles = generateNativeStyle(colors, additionalStyles);

// Use generated styles
const PrimaryView = customStyles.View.primary.shadow();
const SecondaryText = customStyles.Text.secondary();
```

## TypeScript Support

The library is fully typed with TypeScript. All components include proper ref types:

```typescript
import { styledComponents } from "chained-styles/web";
import { useRef } from "react";

const MyComponent = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const StyledDiv = styledComponents.Div({ width: 100 });

  return <StyledDiv ref={divRef}>Content</StyledDiv>;
};
```

## Advanced Usage

### Creating Custom Styled Components

You can use the helper functions to create your own styled components. Each function generates **both** the base component and styled version:

```typescript
import {
  createStyledComponent,
  createStyledComponents,
} from "chained-styles/web";

// Create BOTH Div and DivStyled from a single function call
const { Div, DivStyled } = createStyledComponent("div");
const MyDiv = Div({ width: 100, padding: 16 });
const MyStyledDiv = DivStyled({ borderRadius: 8 });

// Create multiple components at once - generates ALL base + styled versions
const components = createStyledComponents(["div", "span", "button"]);
// Available: Div, DivStyled, Span, SpanStyled, Button, ButtonStyled
const Container = components.Div({ display: "flex" });
const StyledText = components.SpanStyled({ fontSize: 14 });
const StyledButton = components.ButtonStyled({ borderRadius: 8 });
```

### Type Mapping for HTML Elements

The library includes a complete type mapping for HTML elements:

```typescript
import { HTMLElementTypeMap } from "chained-styles/web";

// HTMLElementTypeMap includes mappings like:
// div: HTMLDivElement
// button: HTMLButtonElement
// input: HTMLInputElement
// etc.
```

## Bundle Size Optimization

To ensure optimal bundle size:

1. **Use platform-specific imports**: Import from `/web` or `/native` directly
2. **Avoid the main index**: The main index includes both platforms
3. **Import only what you need**: Tree-shaking will eliminate unused components

```typescript
// ✅ Good - Only includes web components
import { styledComponents } from "chained-styles/web";

// ❌ Bad - Includes both web and native
import { web } from "chained-styles";
```

## License

ISC
