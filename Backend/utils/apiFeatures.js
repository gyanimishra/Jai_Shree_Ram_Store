
//   function apiSearchFeature(query, queryStr) {
//     const keyword = queryStr.keyword
//       ? {
//           name: {
//             $regex: queryStr.keyword,
//             $options: "i",
//           },
//         }
//       : {};
  
//     query = query.find({ ...keyword });
    
//     return query;
//   }
  function apiFeatures(query, queryStr, resultPerPage) {
    // search
    const keyword = queryStr.keyword
      ? {
          name: {
            $regex: queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    query = query.find({ ...keyword });
  
    // filter
    const queryCopy = { ...queryStr };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    let queryStrFilter = JSON.stringify(queryCopy);
    queryStrFilter = queryStrFilter.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    query = query.find(JSON.parse(queryStrFilter));
  
    // pagination
    const currentPage = Number(queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    query = query.limit(resultPerPage).skip(skip);
  
    return query;
  }
  
  
  
  module.exports = apiFeatures;