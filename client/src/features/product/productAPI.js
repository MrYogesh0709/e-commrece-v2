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
