import AppLink from 'components/app-link';
import React from 'react';
import { Language, RoutesMapItem } from 'types';

export function getNavigationLinksList(routesMap: RoutesMapItem[], language: Language): JSX.Element[] {
  const topLinksMap = routesMap.filter((item) => !item.parentPageId);

  const groupedLinks = groupRoutesMapItemsByParentPage(routesMap);
  console.log(groupedLinks);

  return topLinksMap.map((item) => {
    return (
      <li key={item.key}>
        <AppLink path={item.url} text={item.title[language]} isNavigation icon={item.icon} />
      </li>
    );
  });
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
