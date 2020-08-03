const { bucket } = require("../../gcloud");
const { successResponseWithData } = require("../../helpers/apiResponse");
module.exports = function get({ query: { directory = "" } }, res, next) {
  try {
    bucket.getFiles(
      {
        directory: directory ? `root/${directory}` : "root",
        autoPaginate: false,
        delimiter: "/",
      },
      (err, responseFiles, nextQuery, apiResponse) => {
        if (err) next(err);
        let files = [];
        let folders = [];
        const { prefixes = [] } = apiResponse;
        responseFiles.forEach(({ name: path, metadata: { contentType, size } }) => {
          let name = path.split("/");
          name = name[name.length - 1];
          files.push({
            name,
            contentType,
            size,
            path,
          });
        });
        prefixes.forEach((path) => {
          path = path.split("/");
          folders.push(path[path.length - 2]);
        });
        return successResponseWithData(res, "", { files, folders });
      },
    );
  } catch (error) {
    next(error);
  }
};
