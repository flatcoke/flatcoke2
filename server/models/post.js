export default (Sequelize, DataTypes) => {
  const Post = Sequelize.define(
    'Post',
    {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      userId: { field: 'user_id', type: DataTypes.INTEGER },
      createdAt: { field: 'created_at', type: DataTypes.DATE },
      updatedAt: { field: 'updated_at', type: DataTypes.DATE },
    },
    {
      tableName: 'posts',
    }
  )

  Post.associate = models => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    })
  }

  return Post
}
