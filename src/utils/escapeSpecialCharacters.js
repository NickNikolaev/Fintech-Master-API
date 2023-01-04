// const escapeSpecialCharacters = (object) => JSON.stringify(object).replace(/'/g, `\\\\\\'`).replace(/"/g, `\\\\\\"`);
const escapeSpecialCharacters = (object) => JSON.stringify(object).replace(/'/g, `\\\\\\'`);

module.exports = escapeSpecialCharacters;
