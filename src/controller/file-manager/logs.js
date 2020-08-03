const { bucket } = require("../../gcloud");
const { successResponseWithData } = require("../../helpers/apiResponse");
const { FileManager } = require("../../models/file-manager");

module.exports = ({ query: { page = 0, pageSize = 10 } }, res, next) => {
  FileManager.find()
    .sort({ createdAt: -1 })
    .limit(+pageSize)
    .skip(page * pageSize)
    .exec((err, response) => {
      if (err) {
        return next(err);
      }
      return successResponseWithData(
        res,
        "",
        response.map(({ createdAt, fileName, createdBy, fileUrl }) => ({
          createdAt,
          createdBy,
          fileUrl,
          fileName,
          status: "success",
        })),
      );
    });
};
