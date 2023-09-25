export async function createReview(reviewData, thunkAPI) {
  try {
    const response = await fetch("/api/v1/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    const data = await response.json();
    if (response.ok) {
      return { data };
    } else {
      return thunkAPI.rejectWithValue(data.msg || data.message);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
}

export async function updateReview(reviewData, thunkAPI) {
  try {
    const response = await fetch(`/api/v1/review/${reviewData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    const data = await response.json();
    if (response.ok) {
      return { data };
    } else {
      return thunkAPI.rejectWithValue(data.msg || data.message);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteReview(reviewId, thunkAPI) {
  try {
    const response = await fetch(`/api/v1/review/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      return { data };
    } else {
      return thunkAPI.rejectWithValue(data.msg || data.message);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getSingleProductReviews(productId, thunkAPI) {
  try {
    const response = await fetch(`/api/v1/review/product/${productId}`);
    const data = await response.json();
    if (response.ok) {
      return { data };
    } else {
      return thunkAPI.rejectWithValue(data.msg || data.message);
    }
  } catch (error) {
    console.error(error);
  }
}
