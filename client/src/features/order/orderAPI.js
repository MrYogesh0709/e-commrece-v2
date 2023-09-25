export const createOrder = async (order) => {
  try {
    const response = await fetch("/api/v1/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllOrders = async (sort, pagination) => {
  //pagination ={_page=1,_limit=10}
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  try {
    const response = await fetch(`/api/v1/order/admin?${queryString}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    return { data: { orders: data, totalOrders: +totalOrders } };
  } catch (error) {
    console.error(error);
  }
};

export const updateOrder = async (order) => {
  try {
    const response = await fetch("/api/v1/order/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
  }
};
