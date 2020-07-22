const { bucket } = require("../../gcloud");
const { uuid } = require("uuidv4");
const fs = require("fs");

module.exports = async function get(req, res, next) {
  try {
    const {
      file: { path, originalname },
    } = req;
    await bucket.upload(
      path,
      {
        destination: originalname,
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
