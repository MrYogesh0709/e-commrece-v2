export const fetchLoggedInUser = async (_, thunkAPI) => {
  try {
    const response = await fetch("/api/v1/user/me");
    const data = await response.json();
    if (response.ok) {
      return { data };
    } else {
      return thunkAPI.rejectWithValue(data.msg || data.message);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const updateUser = async (userData, thunkAPI) => {
  try {
    const response = await fetch("/api/v1/user/update", {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      return { data };
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const updateUserProfileImage = async (userData, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("image", userData.image);
    const response = await fetch("/api/v1/user/upload-profile-image", {
      method: "PATCH",
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      return { data };
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const addAddress = async (address, thunkAPI) => {
  try {
    const response = await fetch("/api/v1/address/add", {
      method: "POST",
      body: JSON.stringify(address),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      return { data };
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const removeAddress = async (addressId, thunkAPI) => {
  try {
    const response = await fetch(`/api/v1/address/remove/${addressId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      return { data };
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const editAddress = async (address, addressId, thunkAPI) => {
  try {
    const response = await fetch(`/api/v1/address/edit/${addressId}`, {
      method: "PATCH",
      body: JSON.stringify(address),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      return { data };
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const updatePassword = async (password, thunkAPI) => {
  try {
    const response = await fetch(`/api/v1/user/update-password`, {
      method: "PATCH",
      body: JSON.stringify(password),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      return { data };
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
