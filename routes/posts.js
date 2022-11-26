const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const {
  getPosts,
  newPost,
  editPost,
  deletePost,
} = require("../controllers/posts");
const { existsPost } = require("../helpers/dbValidators");

const router = Router();

router.get("/", getPosts);

router.post(
  "/",
  [
    check("author").not().isEmpty(),
    check("content").not().isEmpty(),
    check("author").isEmail().withMessage("No es un email valido"),
    validateFields,
  ],
  newPost
);

router.put(
  "/:id",
  [
    check("id").not().isEmpty(),
    check("id").custom(existsPost),
    check("author").optional().isEmail().withMessage("Invalid email"),
    validateFields,
  ],
  editPost
);

router.delete(
  "/:id",
  [check("id").not().isEmpty(), check("id").custom(existsPost), validateFields],
  deletePost
);

module.exports = router;
