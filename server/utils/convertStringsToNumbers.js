const convertStringsToNumbers = (query, numericFields = []) => {
  if (!query || typeof query !== 'object') return query;

  for (const key in query) {
    if (numericFields.includes(key) && typeof query[key] === 'string') {
      // Convert string to a number
      query[key] = Number(query[key]);
    } else if (typeof query[key] === 'object') {
      // Recursively process nested objects
      query[key] = convertStringsToNumbers(query[key], numericFields);
    }
  }
  return query;
};

module.exports = { convertStringsToNumbers };
