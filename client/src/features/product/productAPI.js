export async function createProduct(productData) {
  try {
    const response = await fetch("/api/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
  }
}

export async function fetchProductById(productId, thunkAPI) {
  try {
    const response = await fetch(`/api/v1/products/${productId}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      return thunkAPI.rejectWithValue(data.msg);
      // throw new Error("Failed to fetch products");
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
}

export async function fetchProductsByFilters(
  filter,
  sort,
  pagination,
  admin,
  search
) {
  //filter = {"category":["smartphones","laptop"]}
  //sort = {_sort:"price",_order:"desc"}
  //pagination ={_page=1,limit=10}
  //search= "laptop"
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=true`;
  }
  if (search) {
    queryString += `search=${search}`;
  }
  try {
    const response = await fetch(`/api/v1/products?${queryString}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    return { data: { products: data, totalItems: +totalItems } };
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAllCategory() {
  try {
    const response = await fetch("/api/v1/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAllBrands() {
  try {
    const response = await fetch("/api/v1/brands");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
  }
}

export const updateProduct = async (product) => {
  try {
    const response = await fetch("/api/v1/products/" + product.id, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
  }
};
