export const PostModel = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        title: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        creator: {
            type: Sequelize.STRING
        },
        tags: {
            type: Sequelize.STRING
        },
        selectedFile: {
            type: Sequelize.STRING
        },
        likes: {
            type: Sequelize.STRING,
            default: '',
        },
        comments: {
            type: Sequelize.STRING,
            default: '',
        },
        createdAt: {
            type: Sequelize.DATE,
            default: new Date(),
        },
    });
    return Post;
  };
