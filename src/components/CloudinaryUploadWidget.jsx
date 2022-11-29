import React, { Component } from 'react';
import api from '../config';

class CloudinaryUploadWidget extends Component {
  async componentDidMount() {
    const cloudName = process.env.REACT_APP_CLOUD_NAME; // replace with your own cloud name
    const uploadPreset = 'ml_default'; // replace with your own upload preset

    // Remove the comments from the code below to add
    // additional functionality.
    // Note that these are only a few examples, to see
    // the full list of possible parameters that you
    // can add see:
    //  c

    const generatedSignature = async () => {
      const response = await api.get('/images');
      return response.data;
    };
    console.log('generatedSignature', generatedSignature);

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        // cropping: true, //add a cropping step
        showAdvancedOptions: true,
        public_id: 'test123',
        uploadSignature: generatedSignature(),
        apiKey: process.env.REACT_APP_CLOUD_API_KEY,
        // add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        // multiple: false,  //restrict upload to a single file
        // folder: "user_images", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);
          // document
          //   .getElementById('uploadedimage')
          //   .setAttribute('src', result.info.secure_url);
        }
      },
    );
    document.getElementById('upload_widget').addEventListener(
      'click',
      () => {
        myWidget.open();
        // generateSignature();
      },
      false,
    );
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
