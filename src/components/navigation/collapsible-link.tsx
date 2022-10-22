import AppLink from 'components/app-link';
import React, { useState } from 'react';
import ShowMoreButton from 'components/controls/show-more-button';
import { Language, RoutesMapItem } from 'types';
import { getNavigationListItem } from './helpers';

const CollapsibleLink = ({
  item,
  language,
  groupedLinks,
  pageId,
}: {
  item: RoutesMapItem;
  language: Language;
  pageId: string;
  groupedLinks: { [x: string]: RoutesMapItem[] };
}): React.ReactElement => {
  const [isOpened, setIsOpened] = useState(false);

  const onShowMore = () => {
    setIsOpened(!isOpened);
  };

  const nestedLinks = <ul className='navigation__nested-list'>{groupedLinks[pageId].map((x) => getNavigationListItem(x, language))}</ul>;

  return (
    <>
      <AppLink path={item.url} text={item.title[language]} isNavigation icon={item.icon} />
      <ShowMoreButton onClick={onShowMore} isOpened={isOpened} />
      {isOpened && nestedLinks}
    </>
  );
};

export default CollapsibleLink;
