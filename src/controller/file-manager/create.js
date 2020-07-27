const { bucket } = require("../../gcloud");
const { uuid } = require("uuidv4");
const fs = require("fs");

module.exports = async function get(req, res, next) {
  try {
    let {
      file: { path, originalname },
      body: { path: folder, note },
    } = req;
    folder = folder ? `root/${folder}/` : `root/${folder}`;
    await bucket.upload(
      path,
      {
        destination: `${folder}${originalname}`,
        metadata: {
          metadata: {
            firebaseStorageDownloadTokens: uuid(),
          },
        },
      },
      (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          success: true,
          message: "Upload success",
        });
      },
    );
  } catch (error) {
    next(error);
  }
};
