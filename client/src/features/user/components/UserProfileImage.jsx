import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserProfileImageAsync } from "../userSlice";
import { toast } from "react-toastify";

const UserProfileImage = () => {
  const dispatch = useDispatch();
  const { userInfo: user, isLoading } = useSelector(selectUser);
  const [selectFile, setSelectFile] = useState(null);
  const handleImageChange = (e) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const file = e.target.files[0];
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPEG and PNG are allowed.");
      return;
    }
    if (file.size > maxSize) {
      toast.error("Image size limit is 5 MB");
      return;
    }
    setSelectFile(file);
  };

  const handleUpdateImage = (e) => {
    e.preventDefault();
    if (!selectFile) {
      toast.error("Please select a file");
      return;
    }
    dispatch(updateUserProfileImageAsync({ image: selectFile }));
  };

  return (
    <div>
      <form onSubmit={handleUpdateImage} encType="multipart/form-data">
        <label htmlFor="profileImageInput">
          <input
            id="profileImageInput"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {!isLoading && (
            <img
              className="w-32 h-32 rounded-full cursor-pointer"
              src={
                user?.profileImage ||
                "https://img.freepik.com/free-icon/user_318-159711.jpg?size=626&ext=jpg&ga=GA1.1.503580097.1688107904&semt=ais"
              }
              alt="Profile Image"
            />
          )}
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-blue-600 my-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoading ? "Updating" : " Update Image"}
        </button>
      </form>
    </div>
  );
};

export default UserProfileImage;
