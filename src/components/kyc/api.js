import { adminInstance } from "../../config/axios";
import axios from 'axios';


export const getKYCRequest = async (managedState,cancelToken) => {
    try {
      const payload={
        limit:10,
        page:managedState.currentPage,
        status:managedState.requestedTab,
        searchTerm:managedState.searchTerm
      }
      const response = await adminInstance().post(
        `/getKyc`,
        payload,
        { cancelToken }
      );
      return response?.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        return error?.response?.data;
      } 
    }
  };
  export const updatekycRequest = async (payload) => {
    try {
      const response = await adminInstance().post(`/updateKyc/${payload.id}`, payload);
      return response?.data;
    } catch (error) {
      console.log("Error in update update kyc Request =>", error);
      return error?.response?.data
    }
  };  