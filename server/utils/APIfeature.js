const { convertStringsToNumbers } = require('./convertStringsToNumbers');

class PrismaAPIFeatures {
  constructor(queryString, numericFields) {
    this.queryString = queryString; // Request query string
    this.query = {}; // Holds the Prisma `where` filters
    this.orderBy = []; // Holds Prisma `orderBy` sorting
    this.selectFields = undefined; // Holds Prisma `select` fields
    this.pagination = {}; // Holds pagination options
    this.numericFields = numericFields || [];
  }

  filter(qForField) {
    // Exclude special query parameters
    const excludedFields = ['q', 'page', 'sort', 'limit', 'fields'];
    let queryObj = { ...this.queryString };
    excludedFields.forEach((field) => delete queryObj[field]);

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
    this.query.where = queryObj;

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

// NOTE
// OLD CONTROLLER
// const getAllMembers = async (req, res, next) => {
//   const queryString = req.query;
//   // console.log(queryString);
//   const filters = {};

//   // NOTE
//   const features = new PrismaAPIFeatures(queryString)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate()
//     .build();
//   console.log(JSON.stringify(features, null, 2));
//   // NOTE

//   if (queryString.q) {
//     filters.AND = {
//       full_name: { contains: queryString.q, mode: 'insensitive' },
//     };
//   }

//   excludeQuery = ['q', 'page', 'sort', 'limit', 'fields'];
//   const tempQueryString = { ...queryString };
//   // console.log(tempQueryString);
//   excludeQuery.forEach((f) => delete tempQueryString[f]);
//   // console.log(tempQueryString);
//   // BASIC SEARCH
//   filters.AND = { ...filters.AND, ...tempQueryString };
//   // console.log(filters);
//   clearedFilters = convertStringsToNumbers(filters, [
//     'gt',
//     'gte',
//     'lt',
//     'lte',
//     'membership_amount',
//   ]);

//   // filter().sort().limitFields().paginate();
//   // SORT
//   let sortBy = [];
//   if (queryString.sort) {
//     sortBy = queryString.sort.split(',').map((field) => ({
//       [field.replace('-', '')]: field.startsWith('-') ? 'desc' : 'asc',
//     }));
//     // console.log(sortBy);
//   } else {
//     sortBy = [{ createdAt: 'desc' }];
//   }

//   // LIMIT_FIELDS

//   let limitFields;
//   if (queryString.fields) {
//     limitFields = queryString.fields.split(',').reduce((acc, field) => {
//       acc[field] = true;
//       return acc;
//     }, {});
//   }

//   // PAGINATE
//   const page = parseInt(queryString.page, 10) || 1;
//   const limit = parseInt(queryString.limit, 10) || 10;
//   const offset = (page - 1) * limit;

//   const members = prisma.member.findMany(features);

//   console.log(await members);
//   return res.status(200).json({
//     status: 'success',
//   });
// };
