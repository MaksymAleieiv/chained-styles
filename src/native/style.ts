import { Ref } from "react";
import { Text, TextInput, View } from "react-native";
import Reanimated from "react-native-reanimated";
import { CSSObject } from "styled-components";
import styled from "styled-components/native";

import { ChainedStylesThemeType } from "../shared/style.interface";
import { isFunction } from "../shared/utils/is-type.util";
import { StyleSize } from "../shared/styles/style.size";
import { StyleBorder } from "../shared/styles/style.border";
import { StylePosition } from "../shared/styles/style.position";
import { StyleOpacity } from "../shared/styles/style.opacity";
import { StyleCustom } from "../shared/styles/style.custom";
import { textStyles } from "../shared/styles/text";
import { flexStyles } from "../shared/styles/flex";
import { generateStyle as generateStyleUtil } from "../shared/style.util";

type RefType<T> = { ref?: Ref<T | undefined> };

export const defaultStyles = {
  ...StyleSize,
  ...StyleBorder,
  ...StylePosition,
  ...StyleOpacity,
  ...StyleCustom,
  ...textStyles,
  ...flexStyles,
};

const getStyle =
  (combineResults: any) =>
  (theme: ChainedStylesThemeType): any => {
    const functionStyles = Object.values(combineResults)
      .filter(isFunction)
      .map((func) => func(theme));

    const functionStylesObject = Object.assign({}, ...functionStyles);

    const nonFunctionProps = Object.fromEntries(
      Object.entries(combineResults).filter(([, value]) => !isFunction(value))
    );

    return {
      ...nonFunctionProps,
      ...functionStylesObject,
    };
  };

const styledComponents = {
  View: <T extends object>(props: CSSObject) =>
    styled.View<ChainedStylesThemeType<T & RefType<View>>>(getStyle(props)),
  ViewStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.View<ChainedStylesThemeType<T>>(props)),

  Pressable: <T extends object>(props: CSSObject) =>
    styled.Pressable<ChainedStylesThemeType<T>>(getStyle(props)),
  PressableStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.Pressable<ChainedStylesThemeType<T>>(props)),
  TouchableOpacity: <T extends object>(props: CSSObject) =>
    styled.TouchableOpacity<ChainedStylesThemeType<T>>(getStyle(props)),
  TouchableOpacityStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.TouchableOpacity<ChainedStylesThemeType<T>>(props)),
  TouchableHighlight: <T extends object>(props: CSSObject) =>
    styled.TouchableHighlight<ChainedStylesThemeType<T>>(getStyle(props)),
  TouchableHighlightStyled: <T extends object>(props: CSSObject) =>
    styled(
      styledComponents.TouchableHighlight<ChainedStylesThemeType<T>>(props)
    ),

  Text: <T extends object>(props: CSSObject) =>
    styled(Text)<ChainedStylesThemeType<T & RefType<Text>>>(getStyle(props)),
  TextStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.Text<ChainedStylesThemeType<T>>(props)),

  TextInput: <T extends object>(props: CSSObject) =>
    styled.TextInput<ChainedStylesThemeType<T & RefType<TextInput>>>(
      getStyle({ ...props })
    ),
  TextInputStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.TextInput<ChainedStylesThemeType<T>>(props)),

  AnimatedView: <T extends object>(props: CSSObject) =>
    styled(Reanimated.View)<ChainedStylesThemeType<T>>(getStyle(props)),
  AnimatedViewStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.AnimatedView<ChainedStylesThemeType<T>>(props)),
  AnimatedText: <T extends object>(props: CSSObject) =>
    styled(Reanimated.Text)<ChainedStylesThemeType<T>>(getStyle(props)),
  AnimatedTextStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.AnimatedText<ChainedStylesThemeType<T>>(props)),

  ApplyStyles: (props: CSSObject) => getStyle(props),
};

export const generateStyle = <
  T extends Record<string, string>,
  U extends Record<string, any>
>(
  colors: T,
  additionalStyles: U
) =>
  generateStyleUtil(colors, additionalStyles, defaultStyles, styledComponents);
