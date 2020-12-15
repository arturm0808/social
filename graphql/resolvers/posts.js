const Post = require("../../models/post");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();
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
      console.log(user);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },
  },
};
