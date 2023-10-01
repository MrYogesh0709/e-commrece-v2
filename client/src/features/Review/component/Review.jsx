import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { selectAuth } from "../../auth/authSlice";
import {
  createReviewAsync,
  deleteReviewAsync,
  selectReview,
  updateReviewAsync,
} from "../reviewSlice";
import { Controller, useForm } from "react-hook-form";
import { StarRating } from "../../common/StarRating";
import { PencilIcon, StarIcon, TrashIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../../app/constants";
import { useQueryClient } from "@tanstack/react-query";

const Review = () => {
  const dispatch = useDispatch();
  const { reviews } = useLoaderData();
  const { id } = useParams();
  const { user } = useSelector(selectAuth);
  const { totalReviews, isLoading: loading, error } = useSelector(selectReview);
  const [openForm, setOpenForm] = useState(false);
  const [editForm, setEditFrom] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const handleEditForm = (data) => {
    setOpenForm(!openForm);
    setEditFrom(true);
    setValue("rating", data.rating);
    setValue("title", data.title);
    setValue("comment", data.comment);
    setValue("_id", data._id);
  };

  const onSubmit = (data) => {
    try {
      if (!data._id) {
        const product = id;
        dispatch(createReviewAsync({ ...data, product: product }));
      } else {
        dispatch(updateReviewAsync(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      queryClient.invalidateQueries(["review"]);
      reset();
      setOpenForm(false);
    }
  };

  const handleForm = () => setOpenForm((value) => !value);

  const handleDeleteReview = (reviewId) => {
    try {
      dispatch(deleteReviewAsync(reviewId));
      setEditFrom(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-start" id="review">
        <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-slate-200 ">
          Reviews
        </p>
      </div>
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div>
          <div className="dark:text-slate-200">
            Total {totalReviews} People have reviewed this product.
          </div>
          {user ? (
            <div
              className="mt-2 underline text-blue-600 cursor-pointer"
              onClick={handleForm}
            >
              {editForm ? "Update Review" : "Add Your Review"}
            </div>
          ) : (
            <Link
              className="mt-2 underline text-blue-600 cursor-pointer"
              to="/login"
            >
              Login or SignUp to add Review
            </Link>
          )}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {openForm && (
              <form
                noValidate
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="star"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Rating
                  </label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name="rating"
                      defaultValue={null}
                      rules={{ required: "Select Your Rating" }}
                      render={({ field }) => (
                        <StarRating
                          value={field.value}
                          onChange={(selectedRating) =>
                            field.onChange(selectedRating)
                          }
                        />
                      )}
                    />
                    <p className="text-red-500">
                      {errors?.rating && errors?.rating?.message}
                    </p>
                  </div>
                </div>
                {/* Title */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                    >
                      Title
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="title"
                      {...register("title", {
                        required: "Title is required",
                      })}
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500">
                      {errors?.title && errors?.title?.message}
                    </p>
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                </div>
                {/* Comment */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                    >
                      Comment
                    </label>
                  </div>
                  <div className="mt-2">
                    <textarea
                      id="comment"
                      {...register("comment", {
                        required: "comment is required",
                      })}
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500">
                      {errors.comment && errors.comment?.message}
                    </p>
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {loading
                      ? "loading"
                      : editForm
                      ? "Update Review"
                      : "Add Review"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          {reviews?.length > 0 &&
            reviews?.map((review) => (
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
                            review?.rating > rating
                              ? "text-yellow-500"
                              : "text-gray-300",
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
                          className="h-6 w-6 text-red-600 cursor-pointer hover:text-red-500"
                          aria-hidden="true"
                          onClick={() => handleDeleteReview(review._id)}
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
                        {new Date(review?.updatedAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Review;
