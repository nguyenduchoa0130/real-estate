import { LoginPayload, User } from '@interfaces/user.interface';
import axiosClient from '@utils/axios-client.util';

const UserService = {
  register: async (payload: Partial<User>): Promise<User> => {
    try {
      const {
        data: { value },
      } = await axiosClient.post('/api/customers/register', payload);
      return value;
    } catch (error) {
      throw error;
    }
  },
  login: async (payload: LoginPayload): Promise<User> => {
    try {
      const {
        data: { value },
      } = await axiosClient.post('/api/customers/login', payload);
      return value;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
