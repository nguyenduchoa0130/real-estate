import { Landlord } from '@interfaces/landlord.interface';
import axiosClient from '@utils/axios-client.util';

const LandLordService = {
  createNewLandlord: async (payload: Landlord): Promise<Landlord> => {
    try {
      const { data } = await axiosClient.post('/api/landlords', payload);
      return data.value;
    } catch (error) {
      throw error;
    }
  },
  getAllLandlords: async (): Promise<Landlord[]> => {
    try {
      const { data } = await axiosClient.get('/api/landlords');
      return data.value;
    } catch (error) {
      throw error;
    }
  },
};

export default LandLordService;
