export type ClassNameProp = {
  [key in string]: boolean;
};

function formatClassName(input: Array<string | ClassNameProp | undefined | null>): string {
  const names = input
    .map((item) => {
      if (typeof item === 'string') return item.trim();
      if (typeof item === 'object') {
        const trueKeys = [];
        for (const key in item) {
          if (item[key]) trueKeys.push(key.trim());
        }
        return trueKeys.join(' ');
      }
    })
    .filter((item) => !!item);
  return names.join(' ');
}

export default formatClassName;
