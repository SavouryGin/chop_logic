function formatClassName(input: Array<string | undefined>): string {
  const names = input.filter((str) => str);
  return names.join(' ');
}

export default formatClassName;
