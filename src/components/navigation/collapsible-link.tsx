import AppLink from 'components/app-link';
import React, { useState } from 'react';
import ShowMoreButton from 'components/controls/show-more-button';
import { Language, RoutesMapItem } from 'types';
import { getNavigationListItem } from './helpers';

type CollapsibleLinkProps = {
  item: RoutesMapItem;
  language: Language;
  pageId: string;
  groupedLinks: { [x: string]: RoutesMapItem[] };
};

const CollapsibleLink = ({ item, language, groupedLinks, pageId }: CollapsibleLinkProps): React.ReactElement => {
  const [isOpened, setIsOpened] = useState(false);

  const onShowMore = () => {
    setIsOpened(!isOpened);
  };

  const openSubMenu = () => {
    setIsOpened(true);
  };

  const nestedLinks = <ul className='navigation__nested-list'>{groupedLinks[pageId].map((x) => getNavigationListItem(x, language))}</ul>;

  return (
    <>
      <AppLink
        path={item.url}
        text={item.title[language]}
        isNavigation
        icon={item.icon}
        id={`link-to_${item.id.toString()}`}
        onHover={openSubMenu}
      />
      <ShowMoreButton onClick={onShowMore} isOpened={isOpened} id={`show-more-for_${item.id.toString()}`} />
      {isOpened && nestedLinks}
    </>
  );
};

export default CollapsibleLink;
