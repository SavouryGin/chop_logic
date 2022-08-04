import { CommonProps } from './general';
import { Icon } from 'enums';

export type TooltipProps = CommonProps & {
  text: string;
  position?: 'top' | 'bottom';
  children?: React.ReactElement | string;
  icon?: Icon;
};
