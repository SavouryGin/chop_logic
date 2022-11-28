const onlyLatinLetters = /^[a-zA-Z]+$/;

const fileName = /^[\w\-. ]+$/;

export default Object.freeze({
  onlyLatinLetters,
  fileName,
});
