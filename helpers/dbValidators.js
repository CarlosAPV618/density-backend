const { db } = require("../database/config");

const existsPost = async (id = "") => {
  const [post] = await db.query("SELECT * FROM posts WHERE id=?", [id]);

  if (!post || post.isDeleted) {
    throw new Error("No post found");
  }
};

module.exports = { existsPost };
