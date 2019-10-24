const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userObject = {
  Query: {
    currentUser: async (_source, {}, { dataSources }) => {
      return dataSources.userAPI.getUserList();
    }
  },
  Mutation: {
    register: async (_source, { firstName, lastName }, { dataSources }) => {
      const data = { firstName, lastName };
      return dataSources.userAPI.postUser(data);
    },
    userDelete: async (_source, { _id }, { dataSources }) => {
      return dataSources.userAPI.userDelete(_id);
    },
    login: async (parent, { username, password }, ctx, info) => {
      const user = await ctx.prisma.user({ username });

      if (!user) {
        throw new Error('Invalid Login');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Invalid Login');
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.email
        },
        'my-secret-from-env-file-in-prod',
        {
          expiresIn: '30d' // token will expire in 30days
        }
      );
      return {
        token,
        user
      };
    }
  }
};
export default userObject;
