import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.get("/", userController.getAllUsersEP);
// router.post("/createPostAndComments", PostController.createPostAndComments);
// router.get("/getall", PostController.getBlogPosts);
// router.get("/get/:id", PostController.getBlogPost);
// router.put("/update/:id", PostController.updateBlogPost);
// router.delete("/delete/:id", PostController.deleteBlogPost);
// router.delete("/deleteall", PostController.deleteAllBlogPosts);
// router.post("/like", PostController.likeBlogPost);

export default router;
