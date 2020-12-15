const { AuthenticationError } = require("apollo-server");

const Post = require("../../models/post");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    getPost: async (_, { postID }) => {
      try {
        const post = await Post.findById(postID);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found 💩");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context);

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },
    deletePost: async (_, { postId }, context) => {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);

        if (user.username === post.username) {
          await post.delete();

          return "Post Deleted ✔";
        } else {
          throw new AuthenticationError("Action not allowed 🤚");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
