import CreateReviewForm from "@/components/Review/CreatePremiumReviews";

import { getCategoriesAdmin } from "@/services/payment";
import React from "react";

const CreateAdminReviews = async () => {
  const categoriesData = await getCategoriesAdmin();
  const categories = categoriesData?.data || [];

  return (
    <div>
      <CreateReviewForm categories={categories} />
    </div>
  );
};

export default CreateAdminReviews;
