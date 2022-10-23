export function groupArrayOfObjectsBy(arr: any[], property: string) {
  return arr.reduce((memo, x) => {
    if (!memo[x[property]]) {
      memo[x[property]] = [];
    }
    memo[x[property]].push(x);

    return memo;
  }, {});
}
