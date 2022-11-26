const { db } = require("../database/config");

const getPosts = async (req, res) => {
  const posts = await db.query("SELECT * FROM posts WHERE isDeleted=0");

  res.status(200).json(posts);
};

const newPost = async (req, res) => {
  const { author = "", content = "" } = req.body;

  if (!author.trim() || !content.trim()) {
    res.status(400).json({
      ok: false,
      message: "You have to provide all the information to create a post",
    });

    return;
  }

  await db.query("INSERT INTO posts set ?", [{ author, content }]);

  res.status(201).json({ ok: true });
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;

  if (!author && !content) {
    res
      .status(400)
      .json({
        ok: false,
        message: "You have to provide data to update the post",
      });
  }

  const data = {
    ...(author ? { author } : {}),
    ...(content ? { content } : {}),
  };

  await db.query("UPDATE posts set ? WHERE id=? AND isDeleted=0", [data, id]);

  res.status(200).json({ ok: true });
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  await db.query("UPDATE posts set ? WHERE id=? AND isDeleted=0", [
    { isDeleted: true },
    id,
  ]);

  res.json({ ok: true });
};

module.exports = {
  getPosts,
  newPost,
  editPost,
  deletePost,
};
