export const ITEMS_PER_PAGE = 12;
export const PRODUCT_TITLE_LENGTH = 20;

export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number);
};

export const getStatusColorUserOrder = (status) => {
  switch (status) {
    case "pending":
      return "text-purple-600";
    case "dispatched":
      return "text-blue-600";
    case "delivered":
      return "text-green-600";
    case "cancelled":
      return "text-red-600";
    case "succeeded":
      return "text-green-600";
    case "canceled":
      return "text-orange-600";
    case "failed":
      return "text-red-600";
    default:
      return "bg-gray-200 text-gray-600";
  }
};
export const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-purple-200 text-purple-600";
    case "dispatched":
      return "bg-blue-200 text-blue-600";
    case "delivered":
      return "bg-green-200 text-green-600";
    case "cancelled":
      return "bg-red-200 text-red-600";
    case "succeeded":
      return "bg-green-200 text-green-600";
    case "canceled":
      return "bg-orange-200 text-orange-600";
    case "failed":
      return "bg-red-200 text-red-600";
    default:
      return "bg-gray-200 text-gray-600";
  }
};
export const firstLatterCapital = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const colors = [
  {
    name: "White",
    class: "bg-white",
    selectedClass: "ring-gray-400",
    id: "white",
  },
  {
    name: "Gray",
    class: "bg-gray-200",
    selectedClass: "ring-gray-400",
    id: "gray",
  },
  {
    name: "Black",
    class: "bg-gray-900",
    selectedClass: "ring-gray-900",
    id: "black",
  },
];

export const sizes = [
  { name: "XXS", inStock: false, id: "xxs" },
  { name: "XS", inStock: true, id: "xs" },
  { name: "S", inStock: true, id: "s" },
  { name: "M", inStock: true, id: "m" },
  { name: "L", inStock: true, id: "l" },
  { name: "XL", inStock: true, id: "xl" },
  { name: "2XL", inStock: true, id: "2xl" },
  { name: "3XL", inStock: true, id: "3xl" },
];

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const sortOptions = [
  { name: "Best Rating", sort: "averageRating", order: "desc", current: false },
  // { name: "Newest",sort:"rating", current: false },
  {
    name: "Price: Low to High",
    sort: "discountPrice",
    order: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "discountPrice",
    order: "desc",
    current: false,
  },
];
