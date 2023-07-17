import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { CommonProps } from 'types';
import { Icon } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

type ShowMoreButtonProps = CommonProps & {
  onClick: () => void;
  isOpened: boolean;
  isDisabled?: boolean;
};

const ShowMoreButton = ({ onClick, isOpened, ...rest }: ShowMoreButtonProps): React.ReactElement => {
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const buttonClass = formatClass([
    'show-more-button',
    rest.className,
    { [Icon.CaretUp]: isOpened, [Icon.CaretDown]: !isOpened, 'show-more-button_dark': isDarkMode },
  ]);

  return (
    <button
      onClick={onClick}
      type='button'
      id={rest.id}
      data-testid={rest.id ?? 'show-more-button'}
      disabled={rest.isDisabled}
      className={buttonClass}
    ></button>
  );
};

export default ShowMoreButton;
