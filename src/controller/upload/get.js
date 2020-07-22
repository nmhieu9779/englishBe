const { bucket } = require("../../gcloud");

module.exports = async function get(req, res, next) {
  try {
    const [files] = await bucket.getFiles();
    Promise.all(
      files.map(({ name }) =>
        bucket.file(name).getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        }),
      ),
    ).then((data) => {
      return res.status(200).json(
        data.map(([url], idx) => ({
          url,
          name: files[idx].name,
        })),
      );
    });
  } catch (error) {
    next(error);
  }
};
