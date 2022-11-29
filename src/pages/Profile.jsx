import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';
import { loadAuthToken } from '../utils/local-storage';
import Header from '../components/Header';
import CloudinaryUploadWidget from '../components/CloudinaryUploadWidget';
import api from '../config';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  console.log('test var', process.env.REACT_APP_CLOUD_NAME);

  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUD_NAME,
    },
  });

  // Use the image with public ID, 'front_face'.
  // const myImage = cld.image('booklists/test123');

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'utahfcc.us.auth0.com';
      const accessToken = loadAuthToken();
      try {
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { userMetadataResponse } = await metadataResponse.json();
        setUserMetadata(userMetadataResponse);
      } catch (e) {
        console.log(e.message);
      }
    };
    getUserMetadata();
  }, []);

  const [values, setValues] = useState({
    image: '',
    title: null,
  });
  const fileInput = React.createRef();

  // Activates user file input to set div
  const editProfilePic = () => {
    fileInput.current.click();
  };
  // Handles the image that was input by user
  const handleImageChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const inFile = e.target.files[0];
    setValues(inFile);

    // reader.onloadend = () => {
    //   setValues(inFile);
    // };
    // reader.readAsDataURL(inFile);
  };

  useEffect(() => {
    console.log('values', values);
  }, [values]);

  // Call the API Backend, will describe this later
  const handleSubmit = () => {
    // response stores the response back from the API
    api
      .get(`/images`)
      .then((res) => {
        const { signature, timestamp } = res.data;
        console.log('signature', signature);
        console.log('timestamp', timestamp);
        console.log(
          'process.env.REACT_APP_CLOUD_NAME',
          process.env.REACT_APP_CLOUD_NAME,
        );
        console.log(
          'process.env.REACT_APP_CLOUD_API_KEY',
          process.env.REACT_APP_CLOUD_API_KEY,
        );
        const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload?api_key=${process.env.REACT_APP_CLOUD_API_KEY}&timestamp=${timestamp}&signature=${signature}`;
        console.log('url', url);
        const formdata = new FormData();

        formdata.append('file', values);
        formdata.append('cloud_name', process.env.REACT_APP_CLOUD_NAME);
        formdata.append('upload_preset', 'ml_default');
        axios.post(url, formdata);
      })
      .catch((error) => {
        alert(
          'Error occurred while uploading picture, try uploading a smaller image size or try again later.',
        );
      });
  };

  return (
    isAuthenticated && (
      <section className="sm:grid grid-cols-layout grid-rows-layout">
        <WidgetLoader />

        <Header />
        <section className="p-10 bg-gray-100">
          <CloudinaryUploadWidget />
          <div onClick={editProfilePic}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInput}
            />
            <img src={values.image} alt="..." style={{ objectFit: 'cover' }} />
          </div>
          <button type="button" onClick={() => handleSubmit()}>
            Submit
          </button>
          <Widget
            sources={['local', 'camera', 'dropbox', 'url']} // set the sources available for uploading -> by default
            // all sources are available. More information on their use can be found at
            // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
            // sourceKeys={{
            //   dropboxAppKey: '1dsf42dl1i2',
            //   instagramClientId: 'd7aadf962m',
            // }} // add source keys
            // and ID's as an object. More information on their use can be found at
            // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
            resourceType="image" // optionally set with 'auto', 'image', 'video' or 'raw' -> default = 'auto'
            cloudName={process.env.REACT_APP_CLOUD_NAME} // your cloudinary account cloud name.
            // Located on https://cloudinary.com/console/
            uploadPreset="artcoxpd" // check that an upload preset exists and check mode is signed or unisgned
            buttonText="Open" // default 'Upload Files'
            style={{
              color: 'white',
              border: 'none',
              width: '120px',
              backgroundColor: 'green',
              borderRadius: '4px',
              height: '25px',
            }} // inline styling only or style id='cloudinary_upload_button'
            folder="my_folder" // set cloudinary folder name to send file
            cropping={false} // set ability to crop images -> default = true
            // https://support.cloudinary.com/hc/en-us/articles/203062071-How-to-crop-images-via-the-Upload-Widget-#:~:text=Click%20on%20the%20%22Edit%22%20link,OK%22%20and%20Save%20the%20changes.
            // more information here on cropping. Coordinates are returned or upload preset needs changing
            multiple // set to false as default. Allows multiple file uploading
            // will only allow 1 file to be uploaded if cropping set to true
            autoClose={false} // will close the widget after success. Default true
            // onSuccess={successCallBack} // add success callback -> returns result
            // onFailure={failureCallBack} // add failure callback -> returns 'response.error' + 'response.result'
            logging={false} // logs will be provided for success and failure messages,
            // set to false for production -> default = true
            customPublicId="test111" // set a specific custom public_id.
            // To use the file name as the public_id use 'use_filename={true}' parameter
            eager="w_400,h_300,c_pad|w_260,h_200,c_crop" // add eager transformations -> deafult = null
            // use_filename={false} // tell Cloudinary to use the original name of the uploaded
            // file as its public ID -> default = true,

            widgetStyles={{
              palette: {
                window: '#737373',
                windowBorder: '#FFFFFF',
                tabIcon: '#FF9600',
                menuIcons: '#D7D7D8',
                textDark: '#DEDEDE',
                textLight: '#FFFFFF',
                link: '#0078FF',
                action: '#FF620C',
                inactiveTabIcon: '#B3B3B3',
                error: '#F44235',
                inProgress: '#0078FF',
                complete: '#20B832',
                sourceBg: '#909090',
              },
              fonts: {
                default: null,
                "'Fira Sans', sans-serif": {
                  url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
                  active: true,
                },
              },
            }} // ability to customise the style of the widget uploader
            // destroy // will destroy the widget on completion
            // 👇 FOR SIGNED UPLOADS ONLY 👇

            // generateSignatureUrl="http://my_domain.com/api/v1/media/generate_signature" // pass the api
            // // endpoint for generating a signature -> check cloudinary docs and SDK's for signing uploads
            // apiKey={process.env.REACT_APP_CLOUD_API_KEY} // cloudinary API key -> number format
            // accepts="application/json" // for signed uploads only -> default = 'application/json'
            // contentType="application/json" // for signed uploads only -> default = 'application/json'
            // withCredentials // default = true -> check axios documentation for more information
            // unique_filename // setting it to false, you can tell Cloudinary not to attempt to make
            // the Public ID unique, and just use the normalized file name -> default = true
          />
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <h3>User Metadata</h3>
          {userMetadata ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          ) : (
            'No user metadata defined'
          )}
          <div>{/* <AdvancedImage cldImg={myImage} /> */}</div>
        </section>
      </section>
    )
  );
};

export default Profile;
