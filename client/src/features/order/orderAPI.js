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
