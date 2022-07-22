import React, { ReactElement } from 'react';
import { CommonProps } from 'types';
import { useHover } from 'hooks';
import './styles.scss';

type TooltipProps = CommonProps & {
  text: string;
  position?: 'top' | 'left' | 'right' | 'bottom';
  children?: ReactElement | string;
};

const Tooltip = ({ text, children }: TooltipProps) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  console.log(isHovered);
  const tooltipContainer = (
    <div className='tooltip__container'>
      <div className='tooltip__text'>{text}</div>
    </div>
  );

  return (
    <div ref={hoverRef} className='tooltip'>
      {tooltipContainer}
      {children}
    </div>
  );
};

export default Tooltip;
