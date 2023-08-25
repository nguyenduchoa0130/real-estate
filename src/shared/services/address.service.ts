import { District, Ward } from '@interfaces/addresses.interface';
import axiosClient from '@utils/axios-client.util';

const AddressService = {
  createNewDistrict: async (payload: Omit<District, 'id'>): Promise<District> => {
    try {
      const { data } = await axiosClient.post('/api/addresses/districts/_create', payload);
      return data.value;
    } catch (error) {
      throw error;
    }
  },
  createNewWard: async (payload: Omit<Ward, 'id'>): Promise<Ward> => {
    try {
      const { data } = await axiosClient.post('/api/addresses/wards/_create', payload);
      return data.value;
    } catch (error) {
      throw error;
    }
  },
  getAllDistricts: async (): Promise<District[]> => {
    try {
      const { data } = await axiosClient.get('/api/addresses/districts/_get');
      return data.value;
    } catch (error) {
      throw error;
    }
  },
  getWardsByDistrictId: async (districtId: number): Promise<Ward[]> => {
    try {
      const { data } = await axiosClient.get(`/api/addresses/wards/_get/${districtId}`);
      return data.value;
    } catch (error) {
      throw error;
    }
  },
};

export default AddressService;
