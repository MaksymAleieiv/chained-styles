import { textDecoration } from './text.decoration';
import { textAlign } from './text.align';
import { textTransform } from './text.transform';

export const textStyles = {
  ...textAlign,
  ...textTransform,
  ...textDecoration,
};
