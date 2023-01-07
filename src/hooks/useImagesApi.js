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
  const { setToastFade, setToastStatus, setBook, setToastType } =
  useContext(ToastContext);
  const queryClient = useQueryClient();
  const history = useHistory();
  const uploadToCloudinary = (formData) =>
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        formData,
      )
      .then((data) => {
        const { secure_url } = data.data;
        if (secure_url) {
            api.post('/images', { image_url: secure_url.substring(50) });
        }
      });

  return useMutation(uploadToCloudinary, {
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries('profileImage');
      setToastStatus('success');
      console.log('success toast')
      setToastType('update_profile');
      setTimeout(() => {
        setToastFade(true);
      }, 250);
      setTimeout(() => {
        setToastFade(false);
      }, 2000);
      // success toast
    },
    onError: (error) => {
      if (error.response.status === 401) {
        history.push('/Auth');
      }
      setToastStatus('error');
      setToastType('update_profile');
      setToastFade(true);
      setTimeout(() => {
        setToastFade(false);
      }, 2000);    },
  });
};
