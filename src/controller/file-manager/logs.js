const { successResponseWithData } = require("../../helpers/apiResponse");
const { Logs } = require("../../models/file-manager");

module.exports = ({ query: { page = 0, pageSize = 10 } }, res, next) => {
  Promise.all([
    Logs.countDocuments(),
    Logs.find()
      .sort({ createdAt: -1 })
      .limit(+pageSize)
      .skip(page * pageSize)
      .exec(),
  ]).then(([totalRecord, response]) => {
    return successResponseWithData(res, "", {
      data: response.map(({ createdBy, message }) => {
        return {
          createdBy,
          message,
        };
      }),
      totalPage: Math.ceil(totalRecord / pageSize),
    });
  });
};
