// tokenBlacklist.js
const tokenBlacklist = new Set([
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
]);

/**
 * Add a token to the blacklist.
 * @param {string} token - The token to blacklist.
 */
function addToken(token) {
  tokenBlacklist.add(token);
}

// /**
//  * Remove a token from the blacklist.
//  * @param {string} token - The token to remove.
//  */
// function removeToken(token) {
//   tokenBlacklist.delete(token);
// }

/**
 * Check if a token is in the blacklist.
 * @param {string} token - The token to check.
 * @returns {boolean} - True if the token is blacklisted, otherwise false.
 */
function isBlacklisted(token) {
  return tokenBlacklist.has(token);
}

/**
 * Get the current state of the blacklist (for debugging or testing purposes).
 * @returns {Array} - A list of all blacklisted tokens.
 */
function getAllTokens() {
  return Array.from(tokenBlacklist);
}

/**
 * Remove the first 30% of tokens from the blacklist.
 */
function removeFirst30Percent() {
  const totalTokens = tokenBlacklist.size;

  if (totalTokens === 0) {
    console.log('Blacklist is empty. No tokens to remove.');
    return;
  }

  const tokensToRemoveCount = Math.ceil(totalTokens * 0.3); // Calculate 30% of total tokens
  let removedTokens = 0;

  for (const token of tokenBlacklist) {
    if (removedTokens >= tokensToRemoveCount) break; // Stop after removing enough tokens

    tokenBlacklist.delete(token);
    removedTokens++;
  }

  console.log(`Removed ${removedTokens} tokens from the blacklist.`);
}

module.exports = {
  addToken,
  isBlacklisted,
  getAllTokens,
  removeFirst30Percent,
};
