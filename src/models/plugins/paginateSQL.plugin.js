const { executeQuery } = require('../../config/snowflake');
const buildFilter = require('../../utils/buildFilter');

const paginate = async (options, filter, query) => {
  // Calculate page size
  const size = options.size && parseInt(options.size, 10) > 0 ? parseInt(options.size, 10) : 25;

  // Calculate page
  const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;

  // Calculate how many records need to be skipped
  const skip = (page - 1) * size;

  // Build filter query
  const filterQuery = buildFilter(filter);

  // Append req.query options (if any) filters and req.query filter (if any) to the rows query
  let rowsQuery = query;
  if (options.where || filterQuery) {
    // If the rows query contains "WHERE" clause -> Add " AND ", Else -> Add " WHERE "
    rowsQuery += rowsQuery.includes('WHERE') ? ' AND ' : ' WHERE ';

    // If options.where exists -> Add it to the rows query
    if (options.where) rowsQuery += options.where;

    // If both options.where and filterQuery exist -> Add " AND " between them
    if (options.where && filterQuery) rowsQuery += ' AND ';

    // If filterQuery exists -> Add it to the rows query
    if (filterQuery) rowsQuery += filterQuery;

    console.log('rowsQuery', rowsQuery);
  }

  // If req.query.orderBy -> Append ORDER BY clause to the rows query
  if (options.orderBy) rowsQuery += ` ORDER BY ${options.orderBy} `;

  // TODO: Add handling for SORT BY and Cache

  // Get db's rows count
  const queryWithoutSelectFromClause = rowsQuery.split('SELECT * FROM')[1];
  const countQuery = `select count(*) as "totalResults"
                      from ${queryWithoutSelectFromClause}`;
  const totalResultsResponse = await executeQuery(countQuery);
  const { totalResults } = totalResultsResponse[0];

  // Generate OFFSET query and Append it to "rowsQuery" (if req.query.size does not equal "all")
  const offsetQuery = ` OFFSET ${skip} ROWS FETCH NEXT ${size} ROWS ONLY`;
  if (options.size !== 'all') rowsQuery += offsetQuery;

  // Execute the rows query
  const results = await executeQuery(rowsQuery);

  // Return response data
  return {
    results,
    page: options.size === 'all' ? 1 : page,
    size: options.size === 'all' ? totalResults : size,
    totalPages: options.size === 'all' ? 1 : Math.ceil(totalResults / size),
    totalResults,
    query: rowsQuery,
  };
};

module.exports = {
  paginate,
};
