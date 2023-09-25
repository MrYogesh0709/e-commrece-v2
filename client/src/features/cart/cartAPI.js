export const addToCart = async (item) => {
  try {
    const response = await fetch("/api/v1/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
  }
};

export async function fetchCartItemsByUserId() {
  try {
    const response = await fetch("/api/v1/cart");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
  }
}

export const updateCart = async (item) => {
  try {
    const response = await fetch("/api/v1/cart/" + item.id, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
  }
};
export const removeItemFromCart = async (itemId) => {
  try {
    const response = await fetch("/api/v1/cart/" + itemId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
  }
};

export const resetCart = async () => {
  //get all items of user-and delete each item
  try {
    const response = await fetchCartItemsByUserId();
    const items = await response.data;
    for (let item of items) {
      await removeItemFromCart(item.id);
    }
    return { status: "success" };
  } catch (error) {
    console.error(error);
  }
};
