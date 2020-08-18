const { bucket } = require("../../gcloud");
const { successResponse, errorResponse } = require("../../helpers/apiResponse");
const { FileManager, Logs } = require("../../models/file-manager");

const createLog = ({ createdBy, fileName }) => {
  const log = new Logs({
    createdAt: new Date(),
    message: `${createdBy} delete ${fileName}`,
  });
  return log.save();
};

module.exports = ({ query: { path = "", fileName = "" } }, res, next) => {
  Promise.all([
    bucket.file(path).delete(),
    FileManager.deleteOne({ fileUrl: path }),
    createLog({ createdBy: "Hieu", fileName }),
  ])
    .then(([deleteStorage, { ok }, { errors }]) => {
      if (deleteStorage && ok && !errors) {
        successResponse(res, "Delete Successfully");
        return;
      }
      errorResponse(res, "Delete Failure");
      return;
    })
    .catch((e) => {
      next(e);
    });
};
