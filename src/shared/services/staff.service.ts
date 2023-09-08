import { Staff } from '@interfaces/staff.interface';
import axiosClient from '@utils/axios-client.util';

const StaffService = {
  createNewStaff: async (payload: Staff): Promise<Staff> => {
    try {
      const { data } = await axiosClient.post('/api/staffs', payload);
      return data.value;
    } catch (error) {
      throw error;
    }
  },
  getAllStaffs: async (): Promise<Staff[]> => {
    try {
      const { data } = await axiosClient.get('/api/staffs');
      return data.value;
    } catch (error) {
      throw error;
    }
  },
};

export default StaffService;
