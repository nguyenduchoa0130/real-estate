import { HouseType } from '@interfaces/house-type.interface';
import { House } from '@interfaces/house.interface';
import axiosClient from '@utils/axios-client.util';

const HousesService = {
  getAllHouseTypes: async (): Promise<HouseType[]> => {
    try {
      const { data } = await axiosClient.get('/api/houses/types');
      return data.value;
    } catch (error) {
      throw error;
    }
  },
  createNewHouse: async (payload: House): Promise<House> => {
    try {
      const { data } = await axiosClient.post('/api/houses', payload);
      return data.value;
    } catch (error) {
      throw error;
    }
  },
  getAllHousesByLandlordId: async (landlordId: number): Promise<House[]> => {
    try {
      const { data } = await axiosClient.get(`/api/houses/landlords/${landlordId}`);
      return data.value;
    } catch (error) {
      throw error;
    }
  },
};

export default HousesService;
