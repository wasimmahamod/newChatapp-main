import React, { useState, createRef } from "react";
import { BsUpload } from "react-icons/bs";
import { useSelector } from "react-redux";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import {Puff} from 'react-loader-spinner'
import {
  getDatabase,
  ref as dref,
  onValue,
  set,
  push,
  update,
} from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePic = () => {
  const db = getDatabase();
  const auth = getAuth();
  let [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const storage = getStorage();
  let data = useSelector((state) => state.userLogininfo.userInfo);
  let [profilepicModal, setPorfilePicModal] = useState(false);
  // react cropper
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    setLoader(true)
    toast.info('please wait a few seconds')
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storageRef = ref(storage, auth.currentUser.uid);
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              update(dref(db, "users/" + data.uid), {
                img: downloadURL,
              }).then(() => {
                setPorfilePicModal(false);
                setImage("");
                setCropData("");
                setLoader(false)
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
    }
  };

  let handleProfileModal = () => {
    setPorfilePicModal(false);
    setCropData("");
    setImage("");
  };

  return (
    <div className="w-full ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="flex items-center gap-x-2">
        <div className="w-[96px] h-[96px] rounded-full overflow-hidden relative group ">
          <img className="w-full h-full " src={data && data.photoURL} alt="" />
          <div
            onClick={() => setPorfilePicModal(true)}
            className="w-0 h-full bg-[rgba(0,0,0,.4)] absolute top-0 left-0 group-hover:w-full transition-all ease-linear duration-150 flex justify-center items-center"
          >
            <BsUpload className="text-white font-bold text-2xl" />
          </div>
        </div>
        <h2 className="font-primary text-primary text-3xl font-semibold">
          {data && data.displayName}
        </h2>
      </div>
      {profilepicModal && (
        <div className="p-10 rounded-lg bg-primary inline-block mt-5 transition-all duration-700 ease-linear">
          <h2 className="font-primary text-lg text-white font-semibold">
            Upload Your Porfile Photo
          </h2>
          <input
            onChange={onChange}
            className="mt-2 text-white font-primary "
            type="file"
          />
          {image && (
            <div className="w-[96px] h-[96px] rounded-full overflow-hidden mx-auto">
              <div
                className="img-preview"
                style={{ width: "100%", float: "left", height: "300px" }}
              />
            </div>
          )}
          {image && (
            <div className="w-[300px] mt-3">
              <Cropper
                ref={cropperRef}
                style={{ height: 300, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
            </div>
          )}
          <br />
       <div className="flex items-center">
       {loader?
        <div className="mt-5">
            <Puff
          height="50"
          width="50"
          radius={1}
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        </div>
          :
          <button
            onClick={getCropData}
            className="px-3 py-2 bg-green-400 text-white font-primary rounded-sm  mt-5"
          >
            Upload
          </button>
          }

          <button
            onClick={handleProfileModal}
            className="px-3 py-2 bg-red-400 text-white font-primary rounded-sm  mt-5 ml-2"
          >
            Cancel
          </button>
       </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePic;
