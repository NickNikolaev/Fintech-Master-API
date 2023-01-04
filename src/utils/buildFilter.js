const buildFilter = (filter) => {
  const filterOperators = {
    eq: '=',
    gt: '>',
    gte: '>=',
    lt: '<',
    lte: '<=',
  };

  // Generate a filter query
  let filterQuery = ``;
  Object.keys(filter).forEach((key) => {
    const filterValue = typeof filter[key] === 'object' ? filter[key] : { eq: filter[key] };

    Object.keys(filterValue).forEach((operator) => {
      const filterOperator = filterOperators[operator];
      const filterOperatorValue = filterValue[operator];
      filterQuery += `${key} ${filterOperator} ${filterOperatorValue} AND `;
    });
  });

  // Return the filter query without the last "AND "
  return filterQuery.slice(0, -4);
};

module.exports = buildFilter;
