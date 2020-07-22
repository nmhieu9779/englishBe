const { Storage } = require("@google-cloud/storage");
const { uuid } = require("uuidv4");
const fs = require("fs");

const storage = new Storage();

module.exports = async function get(req, res, next) {
  try {
    const {
      file: { path, originalname },
    } = req;
    await storage.bucket("englishbe.appspot.com").upload(
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
      },
    );
    await setTimeout(() => {
      fs.unlink(path, (err) => {
        if (err) {
          return next(err);
        }
      });
    }, 5000);
    return res.status(200).json({
      success: true,
      message: "Upload success",
    });
  } catch (error) {
    next(error);
  }
};
