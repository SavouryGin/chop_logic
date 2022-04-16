import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { TabProps } from 'types';
import { useAppSelector } from 'hooks';
import { soundPlayer } from 'helpers/sounds';
import { settingsSelectors } from 'store/settings/selectors';

function Tab({ title, onSelect, tabId, isActive }: TabProps): React.ReactElement {
  const classNames = formatClassName(['tab-list__tab', { 'tab-list__tab_active': isActive }]);
  const isSoundEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const language = useAppSelector(settingsSelectors.getLanguage);

  const onClickTab = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.stopPropagation();
    onSelect(tabId);
    if (isSoundEnabled) soundPlayer.seatbelt.play();
  };

  return (
    <h3 role='tab' id={tabId} onClick={onClickTab} className={classNames} aria-selected={isActive}>
      {title[language]}
    </h3>
  );
}

export default Tab;
