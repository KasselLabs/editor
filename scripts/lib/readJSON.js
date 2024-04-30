const fs = require('fs');

module.exports = function readJSON(filepath) {
  const jsonString = fs.readFileSync(filepath).toString();
  return JSON.parse(jsonString);
};
