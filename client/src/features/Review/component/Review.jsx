/* eslint-disable react/prop-types */
import React from "react";
import { PencilIcon, StarIcon, TrashIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../../app/constants";
import { useSelector } from "react-redux";
import { selectAuth } from "../../auth/authSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Review = ({ review, setOpenForm, openForm, setValue }) => {
  const { user } = useSelector(selectAuth);
  const queryClient = useQueryClient();

  const handleEditForm = (data) => {
    setOpenForm(!openForm);
    setValue("rating", data.rating);
    setValue("title", data.title);
    setValue("comment", data.comment);
    setValue("_id", data._id);
  };

  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`/api/v1/review/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["review"]);
      toast.success("Review Deleted");
    },
  });

  const handleDelete = (reviewId) => {
    mutation.mutate(reviewId);
  };

  return (
    <div
      className="w-full flex flex-col px-2 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg"
      key={review?._id}
    >
      <div className="w-full flex justify-start items-center md:px-4 py-4">
        <div className="flex flex-row justify-between items-start">
          <p className="text-xl md:text-2xl font-medium leading-normal text-gray-800 dark:text-slate-200">
            {review?.title}
          </p>
        </div>
        &nbsp;&nbsp;
        <div className="flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  review?.rating > rating ? "text-yellow-500" : "text-gray-300",
                  "h-5 w-5 flex-shrink-0"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <span>&nbsp;&nbsp;{review?.rating} out of 5 stars</span>
        </div>
        <div className="flex items-center ml-auto space-x-2">
          {review?.user?.id === user?.id && (
            <>
              <PencilIcon
                className="h-6 w-6 text-green-600 cursor-pointer hover:text-green-500"
                aria-hidden="true"
                onClick={() => handleEditForm(review)}
              />
              <TrashIcon
                aria-hidden="true"
                type="submit"
                className="h-6 w-6 text-red-600 cursor-pointer hover:text-red-500"
                onClick={() => handleDelete(review._id)}
              />
            </>
          )}
        </div>
      </div>
      <div id="menu2" className="md:block">
        <p className="mt-3 text-base leading-normal text-gray-600  w-full md:w-9/12 xl:w-5/6  dark:text-slate-200">
          {review?.comment}
        </p>

        <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
          <div>
            <img
              className="group flex w-12 h-12 rounded-full"
              src={
                review?.user.profileImage ||
                "https://img.freepik.com/free-icon/userInfo_318-159711.jpg?size=626&ext=jpg&ga=GA1.1.503580097.1688107904&semt=ais"
              }
              alt={review?.user?.firstName || "userName"}
            />
          </div>
          <div className="flex flex-col justify-start items-start space-y-2">
            <p className="text-base font-medium leading-none text-gray-800 dark:text-slate-200">
              {review?.user?.name?.firstName || "user"}{" "}
              {review?.user?.name?.lastName}
            </p>
            <p className="text-sm leading-none text-gray-600 dark:text-slate-400">
              {new Date(review?.updatedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
