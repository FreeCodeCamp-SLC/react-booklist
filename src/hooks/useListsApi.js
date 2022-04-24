import axios from 'axios';
import { useQuery } from 'react-query';
import API_BASE_URL from '../config';
import { loadAuthToken } from '../utils/local-storage';

export default function useListsApi() {

  const getAllLists = axios.get(`${API_BASE_URL}/lists`, {
      headers: {
        Authorization: `Bearer ${loadAuthToken()}`,
      },
    }) 

    return useQuery('getLists', () => getAllLists);
}