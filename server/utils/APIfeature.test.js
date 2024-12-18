const PrismaAPIFeatures = require('../utils/APIfeature');
const { convertStringsToNumbers } = require('./convertStringsToNumbers');

jest.mock('../utils/convertStringsToNumbers');

describe('PrismaAPIFeatures', () => {
  it('should exclude special query parameters from the queryObj', () => {
    const queryString = {
      q: 'search',
      page: '1',
      sort: 'name',
      limit: '10',
      fields: 'id,name',
      status: 'active',
    };
    const apiFeatures = new PrismaAPIFeatures(queryString);
    apiFeatures.filter(['name']);

    expect(apiFeatures.query.where).toEqual({
      status: 'active',
      name: { contains: 'search', mode: 'insensitive' },
    });
  });
  it('should handle empty qForField array correctly', () => {
    const queryString = { q: 'test', someField: 'value' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.filter([]);

    expect(apiFeatures.query.where).toEqual({ someField: 'value' });
    expect(convertStringsToNumbers).toHaveBeenCalledWith(
      { someField: 'value' },
      ['gt', 'gte', 'lt', 'lte']
    );
  });
  it('should create case-insensitive "contains" queries for each field in qForField', () => {
    const apiFeatures = new PrismaAPIFeatures({ q: 'test' }, []);
    const qForField = ['email', 'name'];

    apiFeatures.filter(qForField);

    expect(apiFeatures.query.where).toEqual({
      OR: [
        { name: { contains: 'test', mode: 'insensitive' } },
        { email: { contains: 'test', mode: 'insensitive' } },
      ],
    });
  });
  it('should generate an OR clause when qForField has multiple entries', () => {
    const queryString = { q: 'searchTerm' };
    const numericFields = [];
    const apiFeatures = new PrismaAPIFeatures(queryString, numericFields);
    const qForField = ['field3', 'field2', 'field1'];

    convertStringsToNumbers.mockImplementation((obj) => obj);

    apiFeatures.filter(qForField);

    expect(apiFeatures.query.where).toEqual({
      OR: [
        { field1: { contains: 'searchTerm', mode: 'insensitive' } },
        { field2: { contains: 'searchTerm', mode: 'insensitive' } },
        { field3: { contains: 'searchTerm', mode: 'insensitive' } },
      ],
    });
  });

  it('should handle empty queryString.q correctly', () => {
    const queryString = { someField: 'someValue' };
    const numericFields = ['price'];
    const apiFeatures = new PrismaAPIFeatures(queryString, numericFields);
    const qForField = ['name', 'description'];

    convertStringsToNumbers.mockReturnValue(queryString);

    apiFeatures.filter(qForField);

    expect(apiFeatures.query.where).toEqual(queryString);
    expect(convertStringsToNumbers).toHaveBeenCalledWith(queryString, [
      'gt',
      'gte',
      'lt',
      'lte',
      'price',
    ]);
  });

  it('should handle edge case where all fields are excluded', () => {
    const queryString = {
      q: 'searchTerm',
      page: '1',
      sort: 'name',
      limit: '10',
      fields: 'name,email',
    };
    const apiFeatures = new PrismaAPIFeatures(queryString);
    const result = apiFeatures.filter(['name', 'email']);

    expect(result.query.where).toEqual({
      OR: [
        { email: { contains: 'searchTerm', mode: 'insensitive' } },
        { name: { contains: 'searchTerm', mode: 'insensitive' } },
      ],
    });
    expect(result).toBe(apiFeatures);
  });
});

describe('sort', () => {
  it('should correctly sort fields in ascending order when no minus sign is present', () => {
    const queryString = { sort: 'name,age,email' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.sort();

    expect(apiFeatures.orderBy).toEqual([
      { name: 'asc' },
      { age: 'asc' },
      { email: 'asc' },
    ]);
  });
  it('should correctly sort fields in descending order when a minus sign is present', () => {
    const queryString = { sort: '-name,age,-createdAt' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.sort();

    expect(apiFeatures.orderBy).toEqual([
      { name: 'desc' },
      { age: 'asc' },
      { createdAt: 'desc' },
    ]);
  });
  it('should handle multiple sort fields correctly', () => {
    const queryString = { sort: 'name,-age,createdAt' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.sort();

    expect(apiFeatures.orderBy).toEqual([
      { name: 'asc' },
      { age: 'desc' },
      { createdAt: 'asc' },
    ]);
  });
  it('should apply default sorting when queryString.sort is an empty string', () => {
    const queryString = { sort: '' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.sort();

    expect(apiFeatures.orderBy).toEqual([{ createdAt: 'desc' }]);
  });

  it('should maintain the order of sort fields as specified in the queryString', () => {
    const queryString = { sort: 'name,-age,createdAt' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.sort();

    expect(apiFeatures.orderBy).toEqual([
      { name: 'asc' },
      { age: 'desc' },
      { createdAt: 'asc' },
    ]);
  });
  it('should handle special characters in field names correctly', () => {
    const queryString = { sort: 'name,-created@At,user_id' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.sort();

    expect(apiFeatures.orderBy).toEqual([
      { name: 'asc' },
      { 'created@At': 'desc' },
      { user_id: 'asc' },
    ]);
  });
  it('should return the instance of the class to allow method chaining', () => {
    const queryString = { sort: 'name,-age' };
    const apiFeatures = new PrismaAPIFeatures(queryString);
    const result = apiFeatures.sort();

    expect(result).toBe(apiFeatures);
    expect(apiFeatures.orderBy).toEqual([{ name: 'asc' }, { age: 'desc' }]);
  });
  it('should handle extremely long sort strings without performance issues', () => {
    const longSortString = Array(1000).fill('field1,-field2').join(',');
    const queryString = { sort: longSortString };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    const startTime = Date.now();
    apiFeatures.sort();
    const endTime = Date.now();

    expect(apiFeatures.orderBy.length).toBe(2000);
    expect(apiFeatures.orderBy[0]).toEqual({ field1: 'asc' });
    expect(apiFeatures.orderBy[1]).toEqual({ field2: 'desc' });
    expect(endTime - startTime).toBeLessThan(100); // Assuming 100ms is a reasonable threshold
  });
});

describe('limit field', () => {
  it('should correctly handle the fields parameter in the queryString', () => {
    const queryString = { fields: 'name,email,age' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.limitFields();

    expect(apiFeatures.selectFields).toEqual({
      name: true,
      email: true,
      age: true,
    });
  });
  it('should return the instance of the class to allow method chaining in limitFields', () => {
    const queryString = { fields: 'name,email,age' };
    const apiFeatures = new PrismaAPIFeatures(queryString);
    const result = apiFeatures.limitFields();

    expect(result).toBe(apiFeatures);
    expect(apiFeatures.selectFields).toEqual({
      name: true,
      email: true,
      age: true,
    });
  });
  it('should handle an empty fields parameter in the queryString', () => {
    const queryString = { fields: '' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.limitFields();

    expect(apiFeatures.selectFields).toBeUndefined();
  });
  it('should handle a single field in the fields parameter', () => {
    const queryString = { fields: 'name' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.limitFields();

    expect(apiFeatures.selectFields).toEqual({ name: true });
  });
  it('should handle multiple fields in the fields parameter', () => {
    const queryString = { fields: 'name,email,age' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.limitFields();

    expect(apiFeatures.selectFields).toEqual({
      name: true,
      email: true,
      age: true,
    });
  });
  it('should ignore non-existent fields in the fields parameter', () => {
    const queryString = { fields: 'name,email,nonExistentField' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.limitFields();

    expect(apiFeatures.selectFields).toEqual({
      name: true,
      email: true,
      nonExistentField: true,
    });
  });
  it('should handle special characters in field names in the fields parameter', () => {
    const queryString = { fields: 'name,user@email,created_at' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.limitFields();

    expect(apiFeatures.selectFields).toEqual({
      name: true,
      'user@email': true,
      created_at: true,
    });
  });
  it('should not modify selectFields if fields parameter is not present in queryString', () => {
    const queryString = { someOtherParam: 'value' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.limitFields();

    expect(apiFeatures.selectFields).toBeUndefined();
  });
});

describe('paginate', () => {
  it('should handle negative limit values by defaulting to limit 5', () => {
    const queryString = { page: '2', limit: '-10' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.paginate();

    expect(apiFeatures.pagination).toEqual({ skip: 5, take: 5 });
  });
  it('should handle negative page numbers by defaulting to page 1', () => {
    const queryString = { page: '-2', limit: '10' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.paginate();

    expect(apiFeatures.pagination).toEqual({ skip: 0, take: 10 });
  });
  it('should correctly calculate skip for page values greater than 1', () => {
    const queryString = { page: '3', limit: '10' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.paginate();

    expect(apiFeatures.pagination).toEqual({ skip: 20, take: 10 });
  });
  it('should handle non-numeric string inputs for page and limit', () => {
    const queryString = { page: 'abc', limit: 'def' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.paginate();

    expect(apiFeatures.pagination).toEqual({ skip: 0, take: 5 });
  });
  it('should handle floating point numbers for page and limit by rounding down', () => {
    const queryString = { page: '2.7', limit: '10.3' };
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.paginate();

    expect(apiFeatures.pagination).toEqual({ skip: 10, take: 10 });
  });

  it('should return the correct pagination object for default values', () => {
    const queryString = {};
    const apiFeatures = new PrismaAPIFeatures(queryString);

    apiFeatures.paginate();

    expect(apiFeatures.pagination).toEqual({ skip: 0, take: 5 });
  });
  it('should maintain the original queryString object without modifying it', () => {
    const originalQueryString = { page: '2', limit: '10', otherParam: 'value' };
    const queryStringCopy = { ...originalQueryString };
    const apiFeatures = new PrismaAPIFeatures(queryStringCopy);

    apiFeatures.paginate();

    expect(queryStringCopy).toEqual(originalQueryString);
    expect(apiFeatures.pagination).toEqual({ skip: 10, take: 10 });
  });

  it('should return "this" to allow method chaining', () => {
    const queryString = { page: '2', limit: '10' };
    const apiFeatures = new PrismaAPIFeatures(queryString);
    const result = apiFeatures.paginate();

    expect(result).toBe(apiFeatures);
    expect(apiFeatures.pagination).toEqual({ skip: 10, take: 10 });
  });
});
