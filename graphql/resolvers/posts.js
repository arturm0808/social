const Post = require("../../models/post");

module.exports = {
  Query: {
    getPost: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
