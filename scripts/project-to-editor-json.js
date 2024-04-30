/* eslint-disable no-console */
const path = require('path');
const json5 = require('json5');
const readJSON = require('./lib/readJSON');
const convertProjectToEditorJSON = require('./lib/convertProjectToEditorJSON');

const main = () => {
  const filepath = path.resolve(process.argv[2]);
  const json = readJSON(filepath);
  console.log(json5.stringify(convertProjectToEditorJSON(json), null, 2));
};
main();
