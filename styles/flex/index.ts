import { flexAlign } from './flex.align';
import { flexAlignContent } from './flex.align.content';
import { flexAlignSelf } from './flex.align.self';
import { flexDirections } from './flex.directions';
import { flexGap } from './flex.gap';
import { flexJustify } from './flex.justify';
import { flexSize } from './flex.size';
import { flexWrap } from './flex.wrap';

export const flexStyles = {
  ...flexDirections,
  ...flexJustify,
  ...flexAlign,
  ...flexAlignSelf,
  ...flexAlignContent,
  ...flexWrap,
  ...flexSize,
  ...flexGap,
  Flex: (flex = 1) => ({ flex }),
  FlexGrow: (flexGrow: number) => ({ flexGrow }),
  FlexBasis: (flexBasis: number | string) => ({ flexBasis }),
  FlexShrink: (flexShrink: number) => ({ flexShrink }),
};
