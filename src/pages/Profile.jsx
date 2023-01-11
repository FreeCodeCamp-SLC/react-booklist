import React, { useEffect, useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Header from '../components/Header';
import api from '../config';
import useProfile, {
  useUpdateProfile,
  useCreateProfile,
  uploadToCloudinary,
  getFileFromUrl,
} from '../hooks/useProfileApi';
import ToastContext from '../contexts/toast-context';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { data: profile, refetch } = useProfile();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const { mutateAsync: createProfile } = useCreateProfile();
  const { setToast } = useContext(ToastContext);

  const [url, setUrl] = useState('');
  const [userName, setUserName] = useState(
    profile?.data[0]?.user_name || user.name,
  );
  const [about, setAbout] = useState(profile?.data[0]?.about || '');
  const [toggleUrl, setToggleUrl] = useState(false);

  const [localFile, setLocalFile] = useState();
  const fileInput = React.createRef();

  const handleImageChange = (e) => {
    e.preventDefault();
    setLocalFile(e.target.files[0]);
  };

  const submitImage = async () => {
    let imageUrl;

    if (url || localFile) {
      return new Promise((resolve, reject) => {
        api.get(`/profiles/generateSignature`).then(async (res) => {
          const { signature, timestamp } = res.data;
          const formData = new FormData();
          if (toggleUrl && url) {
            const urlFile = await getFileFromUrl(url);
            formData.append('file', urlFile);
          } else {
            formData.append('file', localFile);
          }
          formData.append('api_key', process.env.REACT_APP_CLOUD_API_KEY);
          formData.append('timestamp', timestamp);
          formData.append('signature', signature);
          formData.append('folder', 'booklists');
          formData.append('public_id', user.sub);
          formData.append('invalidate', true);
          formData.append('overwrite', true);
          return uploadToCloudinary(formData).then((data) => {
            const { secure_url } = data.data;
            if (secure_url) {
              resolve(secure_url.substring(50));
            } else {
              reject();
              setToast({
                status: 'error',
                message: 'Error uploading image',
              });
            }
          });
        });
      });
    }
    return imageUrl;
  };

  const handleSubmit = async () => {
    submitImage().then((imageUrl) => {
      if (profile.data.length === 0) {
        createProfile({
          user_name: userName,
          about,
          image_url: imageUrl,
        }).then(() => {
          refetch();
        });
      } else {
        updateProfile({
          user_name: userName,
          about,
          image_url: imageUrl,
        }).then(() => {
          refetch();
        });
      }
    });
  };

  return (
    isAuthenticated && (
      <section className="sm:grid grid-cols-layout grid-rows-layout">
        <Header />
        <section className="p-10 bg-gray-100">
          <h2 className="font-bold">Email:</h2>
          <p className="mt-1 mb-3 "> {user.email}</p>
          <label className="flex flex-col my-3" htmlFor="name">
            User Name
            <input
              type="text"
              name="name"
              id="name"
              value={userName}
              className="w-full mt-1 border-2 py-1.5 px-2 rounded-md"
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label className="flex flex-col my-3" htmlFor="about">
            About
            <textarea
              name="about"
              id="about"
              value={about}
              className="w-full mt-1 border-2 py-1.5 px-2 rounded-md"
              onChange={(e) => setAbout(e.target.value)}
            />
          </label>

          {profile?.data[0]?.image_url && (
            <img
              src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/ar_1:1,b_rgb:f3f4f6,bo_12px_solid_rgb:195885,c_thumb,g_face:center,r_max,w_300/${profile?.data[0]?.image_url}`}
              alt=""
              id="profileImg"
            />
          )}

          <label htmlFor="file" className="flex flex-col my-3 mt-5">
            Upload profile image
            {!toggleUrl && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInput}
                id="file"
                className="mt-1"
              />
            )}
            <button
              style={{ width: '104px', backgroundColor: '#EFEFEF' }}
              className="py-0.5 rounded-sm border-gray-500 border inline mt-2"
              type="button"
              onClick={() => setToggleUrl(!toggleUrl)}
            >
              {toggleUrl ? 'From File' : 'From URL'}
            </button>
            {toggleUrl && (
              <input
                type="text"
                name="url"
                id="url"
                placeholder="paste url"
                onChange={(e) => setUrl(e.target.value)}
                className="w-full mt-1 border-2 py-1.5 px-2 rounded-md mb-5"
                value={url}
              />
            )}
          </label>

          <button
            disabled={userName.length < 1}
            type="button"
            onClick={handleSubmit}
            className={`h-10 font-semibold text-white rounded-md ${
              userName.length < 1 ? 'bg-gray-400' : 'bg-booklistBlue-dark'
            } w-28 mt-24`}
          >
            Update
          </button>
        </section>
      </section>
    )
  );
};

export default Profile;
