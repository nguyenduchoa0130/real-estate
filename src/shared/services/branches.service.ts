import { Branch } from '@interfaces/branch.interface';
import axiosClient from '@utils/axios-client.util';

const BranchesService = {
  createNewBranch: async (payload: Partial<Branch>): Promise<Branch> => {
    try {
      const { data } = await axiosClient.post('/api/branches', payload);
      return data.value;
    } catch (error) {
      throw error;
    }
  },
  getAllBranches: async (): Promise<Branch[]> => {
    try {
      const { data } = await axiosClient.get('/api/branches');
      return data.value;
    } catch (error) {
      throw error;
    }
  },
};

export default BranchesService;
