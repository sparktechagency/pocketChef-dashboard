import {
    Clock,
    User,
    Flame,
    Heart,
    Play,
    Star,
    Book,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetRecipeByIdQuery } from '../../../redux/apiSlices/recipeSlice';
import { Avatar, Card } from 'antd';
import { imageUrl } from '../../../redux/api/baseApi';

const SingleRecipe = () => {
    const { id } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const { data: recipe, isLoading: recipeLoading } = useGetRecipeByIdQuery(id);

    if (recipeLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const recipeData = recipe?.data;

    if (!recipeData) {
        return <div className="flex items-center justify-center h-screen text-gray-500">Recipe not found</div>;
    }

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const getDifficultyColor = (level) => {
        switch (level) {
            case 'Easy': return 'green';
            case 'Medium': return 'orange';
            case 'Hard': return 'red';
            default: return 'blue';
        }
    };

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite);
    };


    console.log(recipeData);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">{recipeData?.recipeName}</h1>
                        <p className="text-gray-600 text-lg">{recipeData?.description}</p>
                    </div>
                    <button
                        className={`p-2 rounded-full transition-colors ${isFavorite
                            ? 'bg-red-100 text-red-500'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                            }`}
                        onClick={handleFavoriteToggle}
                    >
                        <Heart
                            className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`}
                        />
                    </button>
                </div>

                {/* Recipe Meta Info */}
                <div className="flex flex-wrap gap-6 mb-6">
                    <div className="flex items-center gap-2">
                        <Clock className="text-blue-500 w-5 h-5" />
                        <span className="font-semibold">Total Time:</span>
                        <span>{formatTime(recipeData?.totalTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="text-green-500 w-5 h-5" />
                        <span className="font-semibold">Prep:</span>
                        <span>{formatTime(recipeData?.prepTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Flame className="text-orange-500 w-5 h-5" />
                        <span className="font-semibold">Cook:</span>
                        <span>{formatTime(recipeData?.cookTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="text-purple-500 w-5 h-5" />
                        <span className="font-semibold">Serves:</span>
                        <span>{recipeData?.portionSize}</span>
                    </div>
                </div>

                {/* Category and Tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                        {recipeData?.category?.name}
                    </span>
                    <span className="px-3 py-1 text-sm bg-cyan-100 text-cyan-800 rounded-full">
                        {recipeData?.subCategory?.subCategory}
                    </span>
                    <span className={`px-3 py-1 text-sm rounded-full ${recipeData?.selectLevel === 'Easy' ? 'bg-green-100 text-green-800' :
                        recipeData?.selectLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {recipeData?.selectLevel}
                    </span>
                    {recipeData?.tags?.map((tag, index) => (
                        <span key={index} className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-5 h-5 ${i < recipeData?.averageRating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-gray-600">
                        {recipeData?.averageRating > 0 ? `${recipeData?.averageRating}/5` : 'No ratings yet'}
                        ({recipeData?.totalRatings} reviews)
                    </span>
                </div>
            </div>

            {/* Images and Video Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Main Image/Video */}
                <div>
                    <div className="mb-4">
                        {recipeData?.video ? (
                            <div className="relative">
                                <video
                                    src={recipeData?.video?.startsWith('http') ? recipeData?.video : `${imageUrl}${recipeData?.video}`}
                                    controls
                                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                                    poster={recipeData?.image?.[0]}
                                />
                                <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2">
                                    <Play className="text-white w-6 h-6" />
                                </div>
                            </div>
                        ) : (
                            <img
                                src={recipeData?.image?.[activeImageIndex]?.startsWith('http') ? recipeData?.image?.[activeImageIndex] : `${imageUrl}${recipeData?.image?.[activeImageIndex]}`}
                                alt={recipeData?.recipeName}
                                className="w-full h-64 object-cover rounded-lg shadow-lg"
                            />
                        )}
                    </div>

                    {/* Image Thumbnails */}
                    {recipeData?.image?.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {recipeData?.image?.map((img, index) => (
                                <Avatar
                                    key={index}
                                    src={img?.startsWith('http') ? img : `${imageUrl}${img}`}
                                    alt={`${recipeData?.recipeName} ${index + 1}`}
                                    className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${activeImageIndex === index ? 'border-blue-500' : 'border-gray-300'
                                        }`}
                                    onClick={() => setActiveImageIndex(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Ingredients */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Book className="text-green-500" />
                        Ingredients
                    </h2>
                    <div className="space-y-4">
                        {recipeData?.ingredientName?.map((ingredient, index) => (
                            <Card key={index} className="p-4 border-l-4 border-l-green-500">
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        src={ingredient?.ingredientImages?.startsWith('http') ? ingredient?.ingredientImages : `${imageUrl}${ingredient?.ingredientImages}`}
                                        alt={ingredient?.name}
                                        size={48}
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg">{ingredient?.name}</h4>
                                        <p className="text-gray-600">{ingredient?.subName}</p>
                                        <p className="text-sm text-gray-500">{ingredient?.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg">
                                            {ingredient?.amount} {ingredient?.unit}
                                        </div>
                                    </div>
                                </div>
                                {ingredient?.preparation && (
                                    <div className="mt-2 p-2 bg-gray-50 rounded">
                                        <span className="text-sm font-medium">Preparation: </span>
                                        <span className="text-sm">{ingredient?.preparation}</span>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                <div className="space-y-6">
                    {recipeData?.instructions?.text?.map((instruction, index) => (
                        <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                        {index + 1}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-800 leading-relaxed">{instruction}</p>
                                    {recipeData?.instructions?.instructionImage[index] && (
                                        <img
                                            src={recipeData?.instructions?.instructionImage[index]?.startsWith('http') ? recipeData?.instructions?.instructionImage[index] : `${imageUrl}${recipeData?.instructions?.instructionImage[index]}`}
                                            alt={`Step ${index + 1}`}
                                            className="mt-3 w-full max-w-md h-48 object-cover rounded-lg"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nutritional Information */}
            {recipeData?.NutritionalValue?.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Nutritional Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recipeData?.NutritionalValue?.map((nutrition, index) => (
                            <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                                <h4 className="font-semibold text-lg capitalize">{nutrition?.name}</h4>
                                <p className="text-2xl font-bold text-green-600">{nutrition?.Kcal}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Reviews Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                {recipeData?.reviewData?.length === 0 ? (
                    <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-500">No reviews yet. Be the first to review this recipe!</p>
                        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            Write a Review
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {recipeData?.reviewData?.map((review, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{review?.userName}</h4>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review?.rating
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700">{review?.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleRecipe;