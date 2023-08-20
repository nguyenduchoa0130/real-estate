import axiosClient from '@utils/axios-client.util';

const UserService = {
  register: async () => {
    try {
      const {
        data: { value },
      } = await axiosClient.post('/api/users');
      return value;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
