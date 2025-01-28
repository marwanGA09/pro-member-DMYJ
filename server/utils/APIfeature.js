const { convertStringsToNumbers } = require('./convertStringsToNumbers');

class PrismaAPIFeatures {
  constructor(queryString, numericFields) {
    this.queryString = queryString; // Request query string
    this.query = {}; // Holds the Prisma `where` filters
    this.orderBy = []; // Holds Prisma `orderBy` sorting
    this.selectFields = undefined; // Holds Prisma `select` fields
    this.pagination = {}; // Holds pagination options
    this.numericFields = numericFields || [];
    this.payments = {}; // Holds
  }

  filter(qForField) {
    // Exclude special query parameters
    const excludedFields = [
      'q',
      'page',
      'sort',
      'limit',
      'fields',
      'payments',
      'pmonth',
      'pyear',
    ];
    let queryObj = { ...this.queryString };
    excludedFields.forEach((field) => delete queryObj[field]);
    let paymentStr = {};
    const current = new Date();
    if (this.queryString.payments) {
      paymentStr = {
        payments: {
          [this.queryString.payments]: {
            month: parseInt(this.queryString.pmonth) || current.getMonth() + 1,
            year: parseInt(this.queryString.pyear) || current.getFullYear(),
          },
        },
      };
    }
    if (this.queryString.q) {
      qForField.forEach(
        (f) =>
          (queryObj = {
            [f]: { contains: this.queryString.q, mode: 'insensitive' },
            ...queryObj,
          })
      );

      if (qForField.length > 1) {
        const some = Object.entries(queryObj).map(([key, value]) => ({
          [key]: value,
        }));

        queryObj = { OR: some };
      }
    }

    // Add the processed filters to the Prisma `where` clause
    this.query.where = convertStringsToNumbers(queryObj, [
      'gt',
      'gte',
      'lt',
      'lte',
      ...this.numericFields,
    ]);
    this.query.where = { ...queryObj, ...paymentStr };

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      // Convert "field,-field2" to Prisma's orderBy array
      this.orderBy = this.queryString.sort.split(',').map((field) => {
        const direction = field.startsWith('-') ? 'desc' : 'asc';
        const cleanField = field.replace('-', '');
        return { [cleanField]: direction };
      });
    } else {
      // Default sorting
      this.orderBy = [{ createdAt: 'desc' }];
    }

    return this;
  }

  limitFields(hideArrayFields) {
    if (this.queryString.fields) {
      // Convert "field1,field2" to Prisma's select format
      this.selectFields = this.queryString.fields
        .split(',')
        .reduce((acc, field) => {
          acc[field] = true;
          return acc;
        }, {});
    }

    this.selectFields = this.selectFields;

    return this;
  }

  paginate() {
    let page = parseInt(this.queryString.page, 10) || 1;
    let limit = parseInt(this.queryString.limit, 10) || 10;
    page = page < 0 ? 1 : page;
    limit = limit < 0 ? 5 : limit;
    const skip = (page - 1) * limit;

    this.pagination = { skip, take: limit };

    return this;
  }

  build() {
    return {
      where: { AND: { ...this.query.where } },
      orderBy: this.orderBy,
      select: this.selectFields,
      ...this.pagination,
    };
  }

  // NOTE I DON'T USE THIS (convertValue)BUT I IT CAN BE BENEFICIARY FOR FUTURE
  // Helper function to convert string values to appropriate data types
  convertValue(value) {
    if (!isNaN(value)) return parseFloat(value); // Convert numbers
    if (value === 'true') return true; // Convert boolean true
    if (value === 'false') return false; // Convert boolean false
    return value; // Return as-is for strings
  }
}

module.exports = PrismaAPIFeatures;
