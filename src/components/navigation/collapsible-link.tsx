import AppLink from 'components/app-link';
import React from 'react';
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
  return (
    <>
      <AppLink path={item.url} text={item.title[language]} isNavigation icon={item.icon} />
      <ul className='navigation__nested-list'>{groupedLinks[pageId].map((x) => getNavigationListItem(x, language))}</ul>
    </>
  );
};

export default CollapsibleLink;
