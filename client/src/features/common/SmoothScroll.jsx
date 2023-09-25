export const scrollToReviewSection = (event, scrollId) => {
  event.preventDefault();
  const reviewSection = document.getElementById(scrollId);
  reviewSection.scrollIntoView({ behavior: "smooth" });
};
