import { Image } from "antd";
import { imageUrl } from "../../../redux/api/baseApi";
import { useGetRecipeByIdQuery } from "../../../redux/apiSlices/recipeSlice";
import { useParams } from "react-router-dom";
import moment from "moment";

const themeColor = "#F28705";

const SingleRecipe = () => {
  const { id } = useParams();
  const { data: recipe, isLoading } = useGetRecipeByIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-orange-50 to-yellow-100">
        <div className="flex flex-col items-center">
          <div
            className="animate-spin rounded-full h-16 w-16 border-4 border-[var(--theme)] border-t-transparent"
            style={{ "--theme": themeColor }}
          ></div>
          <p className="mt-4 text-gray-700 font-medium">Loading recipe...</p>
        </div>
      </div>
    );
  }

  const recipeData = recipe?.data;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 mb-20">
      {/* Recipe Title & Description */}
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        {recipeData.recipeName}
      </h1>
      <p className="text-gray-600 mb-4">{recipeData.description}</p>

      {/* Video */}
      {recipeData.video && (
        <video
          controls
          className="w-full mb-6 rounded-lg shadow border border-gray-300"
          src={`${imageUrl}${recipeData.video}`}
        />
      )}

      {/* Recipe Images */}
      <div className="flex gap-4 overflow-x-auto mb-6">
        {recipeData.image.map((img, index) => (
          <Image
            alt={`recipe-${index}`}
            key={index}
            src={`${imageUrl}${img}`}
            height={160}
            width={160}
            className="w-40 h-40 object-cover rounded-lg border border-gray-200"
          />
        ))}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700 mb-6">
        <div className="bg-orange-100 p-4 rounded-3xl text-center shadow-sm">
          <strong>Portion Size:</strong> {recipeData.portionSize}
        </div>
        <div className="bg-orange-100 p-4 rounded-3xl text-center shadow-sm">
          <strong>Level:</strong> {recipeData.selectLevel}
        </div>
        <div className="bg-orange-100 p-4 rounded-3xl text-center shadow-sm">
          <strong>Prep Time:</strong> {recipeData.prepTime} min
        </div>
        <div className="bg-orange-100 p-4 rounded-3xl text-center shadow-sm">
          <strong>Cook Time:</strong> {recipeData.cookTime} min
        </div>
        <div className="bg-orange-100 p-4 rounded-3xl text-center shadow-sm">
          <strong>Total Time:</strong> {recipeData.totalTime} min
        </div>
        <div className="bg-orange-100 p-4 rounded-3xl text-center shadow-sm">
          <strong>Category:</strong> {recipeData.category.name}
        </div>
        <div className="bg-orange-100 p-4 rounded-3xl text-center shadow-sm">
          <strong>Sub Category:</strong> {recipeData.subCategory.subCategory}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <strong className="text-gray-800">Tags:</strong>
        <div className="flex flex-wrap gap-2 mt-1">
          {recipeData.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-orange-100 text-[var(--theme)] font-medium"
              style={{ "--theme": themeColor }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Ingredients
        </h2>
        {recipeData.ingredientName.map((ingredient) => (
          <div
            key={ingredient._id}
            className="flex items-center gap-4 p-4 bg-orange-50 border border-orange-200 rounded-lg mb-4"
          >
            <img
              src={`${imageUrl}${ingredient.ingredientImages}`}
              alt={ingredient.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <h3
                className="text-lg font-bold text-[var(--theme)]"
                style={{ "--theme": themeColor }}
              >
                {ingredient.name} ({ingredient.subName})
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                Amount: {ingredient.amount} {ingredient.unit}
              </p>
              {/* <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {ingredient.description}
              </p> */}
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Instructions
        </h2>
        <ul className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          {recipeData.instructions.text.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
        <div className="flex gap-4 overflow-x-auto">
          {recipeData.instructions.instructionImage.map((img, index) => (
            <img
              key={index}
              src={`${imageUrl}${img}`}
              alt={`instruction-${index}`}
              className="w-40 h-40 object-cover rounded-lg border border-gray-200"
            />
          ))}
        </div>
      </div>

      {/* Nutrition */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Nutritional Values
        </h2>
        <div className="grid grid-cols-4 h-[80px] gap-4 text-sm text-gray-700">
          {recipeData.NutritionalValue.map((n) => (
            <div
              key={n._id}
              className="bg-orange-100 p-2 flex items-center justify-center rounded-xl shadow-sm"
            >
              <strong>{n.name}: </strong> {n.Kcal} kcal
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Top Reviews
          </h2>
          <div className="flex flex-col gap-4">
            {(() => {
              const reviews = recipeData?.reviewData || [];
              const maxStar = Math.max(...reviews?.map((r) => r.star), 0);
              const topReviews = reviews?.filter((r) => r.star === maxStar);
              return topReviews?.slice(0, 3).map((review, index) => (
                <div
                  key={index}
                  className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-500 font-bold">
                      {review?.userDetails?.name} -{" "}
                      {moment(review.createdAt).format("MMM Do YYYY")}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {review.star} / 5
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
