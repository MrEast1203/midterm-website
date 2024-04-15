import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { useUser } from "../hooks/userHooks";
import services from "../services";
const MyAccountPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [message, setMessage] = useState("");
  const { user, isLoggedIn, setImage, image } = useUser();

  const onDrop = (picture) => {
    setIsUploaded(false);
    setUploadedImage(picture);
  };

  const submitPictures = () => {
    // console.log(uploadedImage);
    const reader = new FileReader();
    reader.readAsDataURL(uploadedImage[0]);
    reader.onload = function () {
      const base64Url = reader.result;
      //   console.log(base64Url);
      setIsUploaded(true);
      services.user
        .addImage(base64Url, user.username, user.password)
        .then((data) => {
          //   console.log(data);
          setImage(base64Url);
          setMessage("Image uploaded successfully");
        })
        .catch((error) => {
          console.error(error);
          setMessage("Failed to upload image");
        });
    };
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-lg font-semibold mb-4">
            {user.username} Account Page
          </div>
          {image ? (
            <img src={image} alt="Account Image" className="mt-4" />
          ) : (
            <></>
          )}
          <ImageUploader
            withIcon={true}
            withPreview={true}
            buttonText="Choose images"
            onChange={(image) => onDrop(image)}
            singleImage={true}
            imgExtension={[".jpg", ".png"]}
            maxFileSize={5242880}
            accept="image/.jpg, image/.png"
            label="Max file size: 5mb, accepted: jpg, png"
          />
          {uploadedImage && (
            <>
              <button
                onClick={submitPictures}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Save your profile picture
              </button>
            </>
          )}
          {isUploaded ? <p>{message}</p> : <></>}
        </div>
      ) : (
        <h1>Please Login First</h1>
      )}
    </>
  );
};

export default MyAccountPage;
