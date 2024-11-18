const bcrypt = require('bcrypt');
async function hashText(text) {
  return await bcrypt.hash(text, 11);
}

async function compareHashedText(hashText, text) {
  const result = await bcrypt.compare(text, hashText);
  console.log('result compare', result);
  return result;
}

module.exports = { compareHashedText, hashText };
