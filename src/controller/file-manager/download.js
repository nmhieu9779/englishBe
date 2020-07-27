const { bucket } = require("../../gcloud");

module.exports = async function download({ query: { path = "" } }, res, next) {
  try {
    Promise.all([bucket.file(path).download(), bucket.file(path).getMetadata()]).then(
      ([[fileData], [{ contentType }]]) => {
        let fileName = path.split("/");
        fileName = fileName[fileName.length - 1];
        res.setHeader("fileName", fileName);
        res.setHeader("content-type", contentType);
        res.status(200).end(fileData);
      },
    );
  } catch (error) {
    next(error);
  }
};
