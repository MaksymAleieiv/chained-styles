import { Ref } from "react";
import { CSSObject } from "styled-components";
import styled from "styled-components";

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
  Div: <T extends object>(props: CSSObject) =>
    styled.div<ChainedStylesThemeType<T & RefType<HTMLDivElement>>>(
      getStyle(props)
    ),
  DivStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.Div<ChainedStylesThemeType<T>>(props)),

  Span: <T extends object>(props: CSSObject) =>
    styled.span<ChainedStylesThemeType<T & RefType<HTMLSpanElement>>>(
      getStyle(props)
    ),
  SpanStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.Span<ChainedStylesThemeType<T>>(props)),

  P: <T extends object>(props: CSSObject) =>
    styled.p<ChainedStylesThemeType<T & RefType<HTMLParagraphElement>>>(
      getStyle(props)
    ),
  PStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.P<ChainedStylesThemeType<T>>(props)),

  H1: <T extends object>(props: CSSObject) =>
    styled.h1<ChainedStylesThemeType<T & RefType<HTMLHeadingElement>>>(
      getStyle(props)
    ),
  H1Styled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.H1<ChainedStylesThemeType<T>>(props)),

  H2: <T extends object>(props: CSSObject) =>
    styled.h2<ChainedStylesThemeType<T & RefType<HTMLHeadingElement>>>(
      getStyle(props)
    ),
  H2Styled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.H2<ChainedStylesThemeType<T>>(props)),

  H3: <T extends object>(props: CSSObject) =>
    styled.h3<ChainedStylesThemeType<T & RefType<HTMLHeadingElement>>>(
      getStyle(props)
    ),
  H3Styled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.H3<ChainedStylesThemeType<T>>(props)),

  H4: <T extends object>(props: CSSObject) =>
    styled.h4<ChainedStylesThemeType<T & RefType<HTMLHeadingElement>>>(
      getStyle(props)
    ),
  H4Styled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.H4<ChainedStylesThemeType<T>>(props)),

  H5: <T extends object>(props: CSSObject) =>
    styled.h5<ChainedStylesThemeType<T & RefType<HTMLHeadingElement>>>(
      getStyle(props)
    ),
  H5Styled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.H5<ChainedStylesThemeType<T>>(props)),

  H6: <T extends object>(props: CSSObject) =>
    styled.h6<ChainedStylesThemeType<T & RefType<HTMLHeadingElement>>>(
      getStyle(props)
    ),
  H6Styled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.H6<ChainedStylesThemeType<T>>(props)),

  Ul: <T extends object>(props: CSSObject) =>
    styled.ul<ChainedStylesThemeType<T & RefType<HTMLUListElement>>>(
      getStyle(props)
    ),
  UlStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.Ul<ChainedStylesThemeType<T>>(props)),

  Ol: <T extends object>(props: CSSObject) =>
    styled.ol<ChainedStylesThemeType<T & RefType<HTMLOListElement>>>(
      getStyle(props)
    ),
  OlStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.Ol<ChainedStylesThemeType<T>>(props)),

  Li: <T extends object>(props: CSSObject) =>
    styled.li<ChainedStylesThemeType<T & RefType<HTMLLIElement>>>(
      getStyle(props)
    ),
  LiStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.Li<ChainedStylesThemeType<T>>(props)),

  Button: <T extends object>(props: CSSObject) =>
    styled.button<ChainedStylesThemeType<T & RefType<HTMLButtonElement>>>(
      getStyle(props)
    ),
  ButtonStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.Button<ChainedStylesThemeType<T>>(props)),

  A: <T extends object>(props: CSSObject) =>
    styled.a<ChainedStylesThemeType<T & RefType<HTMLAnchorElement>>>(
      getStyle(props)
    ),
  AStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.A<ChainedStylesThemeType<T>>(props)),

  Input: <T extends object>(props: CSSObject) =>
    styled.input<ChainedStylesThemeType<T & RefType<HTMLInputElement>>>(
      getStyle(props)
    ),
  InputStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.Input<ChainedStylesThemeType<T>>(props)),

  Textarea: <T extends object>(props: CSSObject) =>
    styled.textarea<ChainedStylesThemeType<T & RefType<HTMLTextAreaElement>>>(
      getStyle(props)
    ),
  TextareaStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.Textarea<ChainedStylesThemeType<T>>(props)),

  Img: <T extends object>(props: CSSObject) =>
    styled.img<ChainedStylesThemeType<T & RefType<HTMLImageElement>>>(
      getStyle(props)
    ),
  ImgStyled: <T extends object>(props: CSSObject) =>
    styled(styledComponents.Img<ChainedStylesThemeType<T>>(props)),

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
