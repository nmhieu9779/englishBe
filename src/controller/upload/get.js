module.exports = async function get(req, res, next) {
  try {
    return res.status(200).json({ haha });
  } catch (error) {
    next(error);
  }
};
