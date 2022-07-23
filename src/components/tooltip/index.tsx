import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector, useHover } from 'hooks';
import './styles.scss';

type TooltipProps = CommonProps & {
  text: string;
  position?: 'top' | 'bottom';
  children?: React.ReactElement | string;
};

const Tooltip = ({ text, children, position = 'bottom' }: TooltipProps) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const tooltipClass = formatClassName(['tooltip', { tooltip_dark: isDarkMode }]);
  const containerClass = formatClassName(['tooltip__container', `tooltip__container_${position}`]);
  console.log(isHovered);
  const tooltipContainer = <span className={containerClass}>{text}</span>;

  return (
    <span ref={hoverRef} className={tooltipClass}>
      {isHovered && tooltipContainer}
      {children}
    </span>
  );
};

export default Tooltip;
