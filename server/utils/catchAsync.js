// const catchAsync = (fn) => {
//   return (req, res, next) => fn(req, res).catch((err) => next(err));
// };

// module.exports = catchAsync;
const catchAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch((err) => next(err));
};

module.exports = catchAsync;
