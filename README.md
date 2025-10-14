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

```typescript
// Component.styles.ts

import { Style } from "@theme/style/style";
import { PADDING_HORIZONTAL_COEF } from "@utils/constants";
import { screenWidth } from "@utils/device-info.util";
import { getSize } from '@utils/get-size.util';

export const HOME_HEADER_PADDING_COEF = PADDING_HORIZONTAL_COEF;

// typesafe props
interface HomeFriendCardWrapperProps {
  isFirst: boolean;
}

interface HomeHeaderUpcomingWrapperProps {
  hasUpcoming: boolean;
}

// Pass size token to .RowGap, this will determinate correct size based on getSize function you provided
// In our case this will translate to 'row-gap: 16' for phones with 812px screen height
export const HomeHeaderSliderWrapper = Style.ModeBgBase2.RowGap(2).Padding(5, 0, 2.25).View;

// Add custom logic to your styles based on typesafe props!
export const HomeFriendCardWrapper = Style.ModeBgBase1.Margin(0.75, PADDING_HORIZONTAL_COEF).ViewStyled<HomeFriendCardWrapperProps>`
  margin-top: ${({ isFirst }) => getSize(isFirst ? 1.5 : 0.75, false)}
`;

// We use insets passed from theme context !
export const HomeHeaderWrapper = Style.ViewStyled`
  padding-top: ${({ theme }) => theme.insets.top}px;
`;

// Easily apply existing styles using .ApplyStyles({ theme }) !
export const HomeHeaderUpcomingWrapper = Style.Padding(
  0,
  HOME_HEADER_PADDING_COEF
).ViewStyled<HomeHeaderUpcomingWrapperProps>`
  ${({ hasUpcoming, theme }) => (hasUpcoming ? Style.ModeColorAttention.ApplyStyles({ theme }) : Style.ModeColorSecondary.ApplyStyles({ theme }))
`;

// Component.tsx

export const HomeHeader = () => {
  return (
    <HomeHeaderWrapper onLayout={handleLayout}>
      <HomeHeaderSliderWrapper>
        <HomeHeaderUpcomingWrapper hasUpcoming={false}>
          <UpcomingEvent />
        </HomeHeaderUpcomingWrapper>
      </HomeHeaderSliderWrapper>

      <HomeFriendCardWrapper isFirst />
      <HomeFriendCardWrapper isFirst={false} />
    </HomeHeaderWrapper>
  );
};
```

### Setup size utils

#### Size utils will help you keep same size rules between various components of your components.

In this example we will create a size util that changes size relative to phone width so we dont have to worry about text running out of boundaries on different phone sizes

```typescript
// size.util.ts

export const LAYOUT_MESH_RATIO = 8;
const SCALING_FACTOR = 0.5;
const LAYOUT_HEIGHT = 812;

const scale = (size: number) => (size * screenHeight) / LAYOUT_HEIGHT;

export const makeSmoothScale = (size: number) =>
  size + (scale(size) - size) * SCALING_FACTOR;

export function getFontSize(size: number, hasUnit = true) {
  const flexibleFontSize = Math.round(makeSmoothScale(size));

  return hasUnit ? `${flexibleFontSize}px` : flexibleFontSize;
}

export function getSize(coefficient: number, hasUnit = true) {
  const newSize = Math.round(
    PixelRatio.roundToNearestPixel(
      makeSmoothScale(LAYOUT_MESH_RATIO) * coefficient
    )
  );

  return hasUnit ? `${newSize}px` : newSize;
}
```

### Setup colors pallete

#### Chained styles uses the colors that you provide to creates typesafe style extensions like Style.Base1.View

```typescript
// colors.enum.ts

export enum ColorEnum {
  Base1 = "#FFFFFF",
  DarkBase1 = "#111111",

  Base2 = "#F1F0F0",
  DarkBase2 = "#111111",
}
```

### Setup theme

#### Since chained styles are build on top of styled-components we support expandable themes, in this example we will add dark/light themes and our _happy_ theme

```typescript
// theme.util.ts

export enum ThemeModeEnum {
  LIGHT = "light",
  DARK = "dark",
  HAPPY = "happy",
}

export const createModeColors = <T extends ColorEnum>(
  light: T,
  dark: T
): ThemeColorsType => ({
  light,
  dark,
  happy: light,
});
```

### Create theme context

#### Here you can add any property that you want, this property will later be accessible in custom styles. For this example we will pass insets from react-native-safe-area-context and our custom getSize function

```typescript
// theme.tsx
import { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";

import { ThemeInterface } from "./theme.interface";
import { getSize } from "@utils/get-size.util";
import { StorageKeysEnum } from "@enums/storage-keys.enum";
import { useStorage } from "@hooks/storage/storage.hook";
import { ThemeModeEnum } from "@enums/theme.enum";

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [mode] = useStorage(StorageKeysEnum.Theme, ThemeModeEnum.LIGHT);
  const insets = useSafeAreaInsets();

  const theme: ThemeInterface = {
    insets,
    getSize,
    mode,
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
```

### Setup theme colors

#### Prepare colors.

`base1Colors` - colors that you use wherever you want for exapmle you will pass these to icons as background
`colorStyles` - object that contains your own 'classes', these will be accessible like this Style.ModeColorPrimary.View

```typescript
// colors.ts
type ColorKeyType = "color" | "backgroundColor";
type ThemeColorsType = Record<ThemeModeEnum, ColorEnum>;

const getThemeColorStyle =
  (colors: ThemeColorsType, styleName: ColorKeyType) =>
  ({ theme }: ChainedStylesThemeType) => ({
    [styleName]: colors[theme.mode],
  });

export const base1Colors = createModeColors(
  ColorEnum.Base1,
  ColorEnum.DarkBase1
);
export const base2Colors = createModeColors(
  ColorEnum.Base2,
  ColorEnum.DarkBase2
);

export const primaryColors = createModeColors(
  ColorEnum.Primary,
  ColorEnum.Primary
);
export const ghostColors = createModeColors(
  ColorEnum.Ghost,
  ColorEnum.DarkGhost
);

export const primaryTextColors = createModeColors(
  ColorEnum.TextPrimary,
  ColorEnum.DarkTextPrimary
);
export const secondaryTextColors = createModeColors(
  ColorEnum.TextSecondary,
  ColorEnum.DarkTextSecondary
);
export const attentionTextColors = createModeColors(
  ColorEnum.TextAttention,
  ColorEnum.DarkTextAttention
);

export const colorStyles = {
  ModeBgColorBase1: {
    getPropertyBackgroundColor: getThemeColorStyle(
      base1Colors,
      "backgroundColor"
    ),
  },
  ModeBgColorBase2: {
    getPropertyBackgroundColor: getThemeColorStyle(
      base2Colors,
      "backgroundColor"
    ),
  },
  ModeBgColorPrimary: {
    getPropertyBackgroundColor: getThemeColorStyle(
      primaryColors,
      "backgroundColor"
    ),
  },
  ModeColorPrimary: {
    getPropertyColor: getThemeColorStyle(primaryTextColors, "color"),
  },
  ModeColorGhost: {
    getPropertyColor: getThemeColorStyle(ghostColors, "color"),
  },
  ModeColorSecondary: {
    getPropertyColor: getThemeColorStyle(secondaryTextColors, "color"),
  },
  ModeColorAttention: {
    getPropertyColor: getThemeColorStyle(attentionTextColors, "color"),
  },
  DEBUG: {
    backgroundColor: "red",
  },
  TransparentBg: {
    backgroundColor: "transparent",
  },
};
```

Notice getPropertyBackgroundColor and getPropertyColor, these are functions that will be called by chained-styles to determine your styles for background and text color. You can write your own functions that will return any styles you want.

#### !!! Important: custom functions with the same name will be overwritten by the last style in chain

### Setup typography

#### Here we add fonts with predetermined sizes, this will allow us to control font sizes across whole app. Note that we use our custom getFontSize util, later you can use this util on icon sizes so they have the same size as text!

```typescript
// typography.ts

enum FontFamilyEnum {
  RobotoBold = "RobotoFlex-Bold",
  RobotoRegular = "RobotoFlex-Regular",
  RobotoLight = "RobotoFlex-Light",
}

export const typographyStyles = {
  BodyLargeBold: {
    fontFamily: FontFamilyEnum.RobotoBold,
    fontSize: getFontSize(22),
    lineHeight: getFontSize(26),
  },
  BodyLargeRegular: {
    fontFamily: FontFamilyEnum.RobotoRegular,
    fontSize: getFontSize(22),
    lineHeight: getFontSize(26),
  },
  BodyMediumBold: {
    fontFamily: FontFamilyEnum.RobotoBold,
    fontSize: getFontSize(16),
    lineHeight: getFontSize(24),
  },
  BodyMediumRegular: {
    fontFamily: FontFamilyEnum.RobotoRegular,
    fontSize: getFontSize(16),
    lineHeight: getFontSize(24),
  },
  BodySmallBold: {
    fontFamily: FontFamilyEnum.RobotoBold,
    fontSize: getFontSize(14),
    lineHeight: getFontSize(20),
  },
  BodySmallRegular: {
    fontFamily: FontFamilyEnum.RobotoRegular,
    fontSize: getFontSize(14),
    lineHeight: getFontSize(20),
  },
};
```

### Final setup

```typescript
// style.ts

export const Style = generateStyle(ColorEnum, {
  ...colorStyles,
  ...typographyStyles,
});
```
