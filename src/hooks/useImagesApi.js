import axios from 'axios';
import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import api from '../config';
import ToastContext from '../contexts/toast-context';

export default function useProfileImage() {
  const history = useHistory();

  const getProfileImage = api.get(`/images`);

  return useQuery('profileImage', () => getProfileImage, {
    onError: (error) => {
      if (error.response.status === 401) {
        history.push('/Auth');
      }
    },
    retry: 1,
  });
}


export const useUploadToCloudinary = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const uploadToCloudinary = (formData) =>
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        formData,
      )
      .then((data) => {
        console.log('res from cloudinary', data);
        const { secure_url } = data.data;
        if (secure_url) {
            api.post('/images', { image_url: secure_url.substring(50) });
        }
      });

  return useMutation(uploadToCloudinary, {
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries('profileImage');
    },
    onError: (error) => {
      if (error.response.status === 401) {
        history.push('/Auth');
      }
      // error toast
    },
  });
};
