const onlyLatinLetters = /^[a-zA-Z]+$/;

const fileName = /^[\w\-. ]+$/;

const xmlDeclaration = /<\?xml.*?\?>/;

export default Object.freeze({
  onlyLatinLetters,
  fileName,
  xmlDeclaration,
});
