const { bucket } = require("../../gcloud");
const { uuid } = require("uuidv4");
const { successResponse } = require("../../helpers/apiResponse");
const fs = require("fs");
const { FileManager } = require("../../models/file-manager");

const uploadFile = ({ path, folder, originalName }) =>
  bucket.upload(path, {
    destination: `${folder}${originalName}`,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuid(),
      },
    },
  });

const createLogFile = ({ originalName: fileName, createdBy, fileUrl, note }) => {
  const fileManager = new FileManager({
    fileName,
    createdAt: new Date(),
    createdBy,
    fileUrl,
    note,
  });
  return fileManager.save();
};

module.exports = (req, res, next) => {
  let {
    file: { path, originalname: originalName },
    body: { path: folder, note },
  } = req;
  folder = folder ? `root/${folder}/` : `root/${folder}`;
  Promise.all([
    uploadFile({ path, originalName, folder }),
    createLogFile({ originalName, createdBy: "Hieu", fileUrl: `${folder}${originalName}`, note }),
  ])
    .then(([[file], { errors }]) => {
      if (file && !errors) {
        return successResponse(res, "Upload success");
      }
      return errorResponse(res, "Upload failure");
    })
    .catch((e) => {
      next(e);
    });
};
