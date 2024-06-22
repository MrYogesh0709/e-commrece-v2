import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectAuth } from "../../auth/authSlice";
import { Controller, useForm } from "react-hook-form";
import { StarRating } from "../../common/StarRating";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { singleProductReview } from "../../../pages/ProductDetailPage";
import axios from "axios";
import { toast } from "react-toastify";
import Review from "./Review";

const ReviewComponent = () => {
  const { id: productId } = useParams();
  const {
    data: { reviews, count: totalReviews },
  } = useQuery(singleProductReview(productId));
  const { user } = useSelector(selectAuth);
  const [openForm, setOpenForm] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const mutationAdd = useMutation({
    mutationFn: (newReview) => {
      return axios.post("/api/v1/review", newReview);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["review", productId]);
      queryClient.invalidateQueries(["singleProduct", productId]);
      toast.success("Review Added successfully");
      reset();
      setOpenForm(false);
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  const mutationEdit = useMutation({
    mutationFn: (newReview) => {
      return axios.patch(`/api/v1/review/${newReview._id}`, newReview);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["review", productId]);
      queryClient.invalidateQueries(["singleProduct", productId]);
      toast.success("Review Updated !!!");
      reset();
      setOpenForm(false);
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  const handleSubmitForm = (data) => {
    if (!data._id) {
      mutationAdd.mutate({ ...data, product: productId });
    }
    if (data._id) {
      const reviewId = data._id;
      mutationEdit.mutate({ ...data, reviewId });
    }
  };

  const handleForm = () => setOpenForm((value) => !value);

  const handleEdit = (data) => {
    setValue("rating", data.rating);
    setValue("title", data.title);
    setValue("comment", data.comment);
    setValue("_id", data._id);
  };

  return (
    <>
      <div className="flex justify-center items-start" id="review">
        <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-slate-200 underline">
          Reviews
        </p>
      </div>
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div>
          <div className="dark:text-slate-200">
            {totalReviews === 0 ? (
              <p>No Review yet , put your review first </p>
            ) : (
              <p>Total {totalReviews} People have reviewed this product.</p>
            )}
          </div>
          {user ? (
            <div
              className="mt-2 underline text-blue-600 cursor-pointer"
              onClick={handleForm}
            >
              {reviews.find((review) => review.user.id === user.id) ? (
                <span
                  onClick={() =>
                    handleEdit(
                      reviews.find((review) => review.user.id === user.id)
                    )
                  }
                >
                  Update Review
                </span>
              ) : (
                <span>Add Review</span>
              )}
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
                onSubmit={handleSubmit((data) => handleSubmitForm(data))}
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
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={mutationAdd.isLoading || mutationEdit.isLoading}
                  >
                    {mutationAdd.isLoading || mutationEdit.isLoading
                      ? "loading"
                      : reviews.find((review) => review.user.id === user.id)
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
            reviews.map((review) => (
              <Review
                key={review?._id}
                review={review}
                setOpenForm={setOpenForm}
                openForm={openForm}
                setValue={setValue}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ReviewComponent;
