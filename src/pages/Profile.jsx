import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import {
  AdvancedImage,
  lazyload,
  responsive,
  accessibility,
  placeholder,
} from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { byRadius, max } from '@cloudinary/url-gen/actions/roundCorners';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
import { outline, cartoonify } from '@cloudinary/url-gen/actions/effect';
import { innerFill, fill } from '@cloudinary/url-gen/qualifiers/outlineMode';

import { loadAuthToken } from '../utils/local-storage';
import Header from '../components/Header';
import CloudinaryUploadWidget from '../components/CloudinaryUploadWidget';
import api from '../config';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log('user', user);
  // Create and configure your Cloudinary instance.

  const [useAltImage, setUseAltImage] = useState(false);
  const [url, setUrl] = useState();
  const [userName, setUserName] = useState(user.name);
  const [about, setAbout] = useState();

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUD_NAME,
    },
  });
  const myImage = cld
    .image(`booklists/${user.sub}`)
    .resize(thumbnail().width(300).height(300).gravity(focusOn(FocusOn.face())))
    .backgroundColor('#F3F4F6')
    .roundCorners(max())
    .effect(outline().mode(fill()).width(16).color('#195885'));

  const [localFile, setLocalFile] = useState();
  const fileInput = React.createRef();

  // Activates user file input to set div
  // const editProfilePic = () => {
  //   fileInput.current.click();
  // };

  const handleImageChange = (e) => {
    e.preventDefault();
    setLocalFile(e.target.files[0]);
  };

  useEffect(() => {
    console.log('localFile', localFile);
  }, [localFile]);

  const handleSubmit = async () => {
    async function getFileFromUrl(url, name, defaultType = 'image/jpeg') {
      const response = await fetch(url);
      const data = await response.blob();
      return new File([data], name, {
        type: data.type || defaultType,
      });
    }
    const file = await getFileFromUrl(
      'https://www.bubblypet.com/wp-content/uploads/2020/11/Black-and-tan-Shiba-Inu-having-a-Sunny-walk-in-Dennistoun.jpg',
      'example.jpg',
    );

    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;

    api.get(`/images`).then((res) => {
      const { signature, timestamp } = res.data;
      const formData = new FormData();
      formData.append('file', localFile);
      formData.append('api_key', process.env.REACT_APP_CLOUD_API_KEY);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      // formData.append('eager', 'c_pad,h_300,w_400|c_crop,h_200,w_260');
      formData.append('folder', 'booklists');
      formData.append('public_id', user.sub);
      formData.append('invalidate', true);
      formData.append('overwrite', true);

      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log('res from cloudinary', JSON.parse(data));
        });
    });
  };

  // const handleImageAlt = () => {
  //   console.log('hitting this');
  //   setUseAltImage(true);
  //   // document.querySelector('#profileImg').src = user.picture;
  //   document.querySelector('#profileImg').cldImg = user.picture;
  // };

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
          {/* <CloudinaryUploadWidget /> */}
          {/* <div onClick={editProfilePic}> */}
          <label htmlFor="file" className="flex flex-col my-3 mt-5">
            Upload profile image from file
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInput}
              id="file"
              className="mt-1"
            />
          </label>
          {/* </div> */}
          <label htmlFor="url" className="flex flex-col my-3">
            Upload profile image from URL
            <input
              type="text"
              name="url"
              id="url"
              placeholder="paste url"
              onChange={(e) => setUrl(e.target.value)}
              className="w-full mt-1 border-2 py-1.5 px-2 rounded-md mb-5"
              value={url}
            />
          </label>

          {/* <img src={user.picture} alt={user.name} /> */}

          {!useAltImage ? (
            <AdvancedImage
              cldImg={myImage}
              id="profileImg"
              onError={() => setUseAltImage(true)}
              // plugins={[lazyload(), responsive(), accessibility(), placeholder()]}
            />
          ) : (
            <img src={user.picture} alt="user" className="rounded-full" />
          )}

          {/* <img
            src="https://res.cloudinary.com/deqapvzrv/image/upload/ar_1:1,b_rgb:f3f4f6,bo_6px_solid_rgb:195885,c_fill,g_auto,r_max,w_400/v1669834995/booklists/google-oauth2%7C108968739070494181045.jpg"
            alt=""
            id="profileImg"
            onError={handleImageAlt}
          /> */}

          <button
            type="button"
            onClick={handleSubmit}
            className="h-10 font-semibold text-white rounded-md bg-booklistBlue-dark w-28 mt-24"
          >
            Update
          </button>
        </section>
      </section>
    )
  );
};

export default Profile;
