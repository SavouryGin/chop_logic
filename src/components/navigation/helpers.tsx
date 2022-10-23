import AppLink from 'components/app-link';
import CollapsibleLink from './collapsible-link';
import React from 'react';
import { Language, RoutesMapItem } from 'types';
import { Page } from 'enums';

export function getNavigationLinksList(routesMap: RoutesMapItem[], language: Language): React.ReactElement {
  const groupedLinks = groupRoutesMapItemsByParentPage(routesMap);
  const topLinksMap = groupedLinks[Page.Home.toString()];

  const links = topLinksMap.map((item) => {
    const pageId = item.id.toString();

    if (Object.keys(groupedLinks).includes(pageId)) {
      return (
        <li key={item.key}>
          <CollapsibleLink item={item} language={language} groupedLinks={groupedLinks} pageId={pageId} />
        </li>
      );
    } else {
      return getNavigationListItem(item, language);
    }
  });

  return <ul className='navigation__list'>{links}</ul>;
}

export function getNavigationListItem(item: RoutesMapItem, language: Language): JSX.Element {
  return (
    <li key={item.key}>
      <AppLink path={item.url} text={item.title[language]} isNavigation icon={item.icon} />
    </li>
  );
}

function groupRoutesMapItemsByParentPage(arr: RoutesMapItem[]) {
  return arr.reduce((memo: { [key in string]: RoutesMapItem[] }, x) => {
    const page = x.parentPageId.toString();
    if (!(page in memo)) {
      memo[page] = [];
    }
    memo[page].push(x);

    return memo;
  }, {});
}
