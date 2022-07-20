import React from 'react';

type TooltipProps = {
  text: string;
  position?: 'top' | 'left' | 'right' | 'bottom';
};

const Tooltip = ({ text }: TooltipProps) => {
  return (
    <div className='tooltip'>
      <div className='tooltip__arrow'></div>
      <div className='tooltip__text'>{text}</div>
    </div>
  );
};

export default Tooltip;
