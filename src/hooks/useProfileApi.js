import axios from 'axios';
import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import api from '../config';
import ToastContext from '../contexts/toast-context';


export default function useProfile() {
    const history = useHistory();
    
    const getProfile = api.get(`/profiles`);
    
    return useQuery('profile', () => getProfile, {
        onError: (error) => {
        if (error.response.status === 401) {
            history.push('/Auth');
        }
        },
        retry: 1,
    });
}

export const useCreateProfile = () => {
    const queryClient = useQueryClient();
    const history = useHistory();
    const createProfile = (profile) => api.post('/profiles', profile);
    
    return useMutation(createProfile, {
        retry: 1,
        onSuccess: () => {
        queryClient.invalidateQueries('profile');
   
        // success toast
        },
        onError: (error) => {
        if (error.response.status === 401) {
            history.push('/Auth');
        }
        },
    });
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const history = useHistory();
    const updateProfile = (profile) => api.put('/profiles', profile);
    
    return useMutation(updateProfile, {
        retry: 1,
        onSuccess: () => {
        queryClient.invalidateQueries('profile');
   
        // success toast
        },
        onError: (error) => {
        if (error.response.status === 401) {
            history.push('/Auth');
        }
        },
    });
}

export const uploadToCloudinary = (formData) => axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
    formData,
  )

  export const getFileFromUrl = async (urlString, defaultType = 'image/jpeg') => {
    const response = await fetch(urlString);
    const data = await response.blob();
    return new File([data], 'urlUpload', {
      type: data.type || defaultType,
    });
  }

