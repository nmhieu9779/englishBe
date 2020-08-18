const { bucket } = require("../../gcloud");
const { uuid } = require("uuidv4");
const { successResponse, errorResponse } = require("../../helpers/apiResponse");
const fs = require("fs");
const { FileManager, Logs } = require("../../models/file-manager");

const uploadFile = ({ path, folder, originalName }) =>
  bucket.upload(path, {
    destination: `${folder}${originalName}`,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuid(),
      },
    },
  });

const createFile = ({ originalName: fileName, createdBy, fileUrl, note }) => {
  const fileManager = new FileManager({
    fileName,
    createdAt: new Date(),
    createdBy,
    fileUrl,
    note,
  });
  return fileManager.save();
};

const createLog = ({ createdBy, originalName }) => {
  const log = new Logs({
    createdAt: new Date(),
    message: `${createdBy} upload ${originalName}`,
  });
  return log.save();
};

module.exports = (req, res, next) => {
  let {
    file: { path, originalname: originalName },
    body: { path: folder, note },
  } = req;
  folder = folder ? `root/${folder}/` : `root/${folder}`;
  Promise.all([
    uploadFile({ path, originalName, folder }),
    createFile({ originalName, createdBy: "Hieu", fileUrl: `${folder}${originalName}`, note }),
    createLog({ originalName, createdBy: "Hieu" }),
  ])
    .then(([[file], { errors: createFileErrors }, { errors: createLogErrors }]) => {
      if (file && !createFileErrors && !createLogErrors) {
        return successResponse(res, "Upload Successfully");
      }
      return errorResponse(res, "Upload Failure");
    })
    .catch((e) => {
      next(e);
    });
};
