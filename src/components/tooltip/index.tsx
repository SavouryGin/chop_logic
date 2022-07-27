import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { TooltipProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector, useHover } from 'hooks';
import './styles.scss';

const Tooltip = ({ text, children, position = 'bottom', icon }: TooltipProps) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const tooltipClass = formatClassName(['tooltip', { tooltip_dark: isDarkMode }]);
  const containerClass = formatClassName(['tooltip__container', `tooltip__container_${position}`]);
  const iconClass = formatClassName([icon]);

  const tooltipContainer = <span className={containerClass}>{text}</span>;
  const iconElement = <span role='img' aria-label='Hint' className={iconClass}></span>;

  return (
    <span ref={hoverRef} className={tooltipClass}>
      {icon && iconElement}
      {isHovered && tooltipContainer}
      {children}
    </span>
  );
};

export default Tooltip;
