export const createUser = async (userData, thunkAPI) => {
  try {
    const resp = await fetch("/api/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    if (resp.ok) {
      const data = await resp.json();
      return data;
    } else {
      const data = await resp.json();
      return thunkAPI.rejectWithValue(data.msg || data.message);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const loginUser = async (userData, thunkAPI) => {
  try {
    const resp = await fetch("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    if (resp.ok) {
      const data = await resp.json();
      return data;
    } else {
      const data = await resp.json();
      return thunkAPI.rejectWithValue(data.msg || data.message);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const checkUser = async (_, thunkAPI) => {
  try {
    const resp = await fetch("/api/v1/auth/check");
    if (resp.ok) {
      const data = await resp.json();
      return data;
    } else {
      const data = await resp.json();
      return thunkAPI.rejectWithValue(data.msg || data.message);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const signOutUser = async (_, thunkAPI) => {
  try {
    const resp = await fetch("/api/v1/auth/logout");
    if (resp.ok) {
      const data = await resp.json();
      return data;
    } else {
      const data = await resp.json();
      console.error(data);
      // return thunkAPI.rejectWithValue(data.msg);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const forgotPasswordRequest = async (data, thunkAPI) => {
  try {
    const resp = await fetch("/api/v1/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (resp.ok) {
      const data = await resp.json();
      return data;
    } else {
      const data = await resp.json();
      return thunkAPI.rejectWithValue(data.msg || data.message);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const resetPassword = async (data, thunkAPI) => {
  try {
    const resp = await fetch("/api/v1/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (resp.ok) {
      const data = await resp.json();
      return data;
    } else {
      const data = await resp.json();
      return thunkAPI.rejectWithValue(data.msg || data.message);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const verifyMail = async (data, thunkAPI) => {
  try {
    const resp = await fetch("/api/v1/auth/verify-email", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (resp.ok) {
      const data = await resp.json();
      return data;
    } else {
      const data = await resp.json();
      return thunkAPI.rejectWithValue(data.msg || data.message);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const verifyMailAgain = async (data, thunkAPI) => {
  try {
    const resp = await fetch("/api/v1/auth/request-verification-email", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (resp.ok) {
      const data = await resp.json();
      return data;
    } else {
      const data = await resp.json();
      return thunkAPI.rejectWithValue(data.msg || data.message);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
