import {
    Clock,
    User,
    Flame,
    Heart,
    Play,
    Star,
    Book,
    ChevronDown,
    ChevronUp,
    Users,
    Timer,
    // Chef,
    Award,
    MessageSquare,
    Camera,
    ChefHat,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetRecipeByIdQuery } from '../../../redux/apiSlices/recipeSlice';
import { Avatar, Card, Badge, Collapse, Button, Divider } from 'antd';
import { imageUrl } from '../../../redux/api/baseApi';

const { Panel } = Collapse;

const SingleRecipe = () => {
    const { id } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [showAllIngredients, setShowAllIngredients] = useState(false);

    const { data: recipe, isLoading: recipeLoading } = useGetRecipeByIdQuery(id);

    if (recipeLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading recipe...</p>
                </div>
            </div>
        );
    }

    const recipeData = recipe?.data;

    if (!recipeData) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="text-6xl mb-4">🍳</div>
                    <p className="text-gray-500 text-lg">Recipe not found</p>
                </div>
            </div>
        );
    }

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite);
    };

    const getDifficultyBadge = (level) => {
        const colors = {
            'Easy': 'bg-green-100 text-green-800 border-green-200',
            'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'Hard': 'bg-red-100 text-red-800 border-red-200'
        };
        return colors[level] || 'bg-blue-100 text-blue-800 border-blue-200';
    };

    const renderIngredients = () => {
        const ingredients = recipeData?.ingredientName || [];
        const displayedIngredients = showAllIngredients ? ingredients : ingredients.slice(0, 3);

        return (
            <div className="space-y-3">
                {displayedIngredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center p-3 bg-white rounded-lg border border-gray-100 hover:border-green-300 transition-colors">
                        <Avatar
                            src={ingredient?.ingredientImages?.startsWith('http') ? ingredient?.ingredientImages : `${imageUrl}${ingredient?.ingredientImages}`}
                            alt={ingredient?.name}
                            size={40}
                            className="border-2 border-gray-200"
                        />
                        <div className="ml-3 flex-1">
                            <h4 className="font-semibold text-gray-800">{ingredient?.name}</h4>
                            <p className="text-sm text-gray-500">{ingredient?.subName}</p>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-green-600">
                                {ingredient?.amount} {ingredient?.unit}
                            </div>
                        </div>
                    </div>
                ))}

                {ingredients.length > 3 && (
                    <button
                        onClick={() => setShowAllIngredients(!showAllIngredients)}
                        className="w-full flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 font-medium"
                    >
                        {showAllIngredients ? (
                            <>
                                <ChevronUp className="w-4 h-4" />
                                Show less ingredients
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4" />
                                Show {ingredients.length - 3} more ingredients
                            </>
                        )}
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto p-4 lg:p-6">
                {/* Hero Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="relative">
                        {/* Main Image/Video */}
                        <div className="h-64 lg:h-96 overflow-hidden">
                            {recipeData?.video ? (
                                <div className="relative h-full">
                                    <video
                                        src={recipeData?.video?.startsWith('http') ? recipeData?.video : `${imageUrl}${recipeData?.video}`}
                                        controls
                                        className="w-full h-full object-cover"
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
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                            <div className="flex justify-between items-end">
                                <div className="flex-1">
                                    <h1 className="text-3xl lg:text-5xl font-bold mb-2">{recipeData?.recipeName}</h1>
                                    <p className="text-gray-200 text-lg mb-4 max-w-2xl">{recipeData?.description}</p>

                                    {/* Quick Stats */}
                                    <div className="flex flex-wrap gap-4 mb-4">
                                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                            <Timer className="w-4 h-4" />
                                            <span className="text-sm font-medium">{formatTime(recipeData?.totalTime)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                            <Users className="w-4 h-4" />
                                            <span className="text-sm font-medium">{recipeData?.portionSize} servings</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                            <Award className="w-4 h-4" />
                                            <span className="text-sm font-medium">{recipeData?.selectLevel}</span>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < recipeData?.averageRating
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-white/50'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm">
                                            {recipeData?.averageRating > 0 ? `${recipeData?.averageRating}/5` : 'No ratings'}
                                            ({recipeData?.totalRatings} reviews)
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className={`p-3 rounded-full backdrop-blur-sm transition-all ${isFavorite
                                        ? 'bg-red-500 text-white scale-110'
                                        : 'bg-white/20 hover:bg-white/30 text-white'
                                        }`}
                                    onClick={handleFavoriteToggle}
                                >
                                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Image Thumbnails */}
                    {recipeData?.image?.length > 1 && (
                        <div className="p-4 bg-gray-50">
                            <div className="flex gap-2 overflow-x-auto">
                                {recipeData?.image?.map((img, index) => (
                                    <Avatar
                                        key={index}
                                        src={img?.startsWith('http') ? img : `${imageUrl}${img}`}
                                        alt={`${recipeData?.recipeName} ${index + 1}`}
                                        className={`flex-shrink-0 w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all ${activeImageIndex === index
                                            ? 'border-blue-500 scale-105'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        onClick={() => setActiveImageIndex(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Recipe Details */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="text-center p-4 bg-blue-50 rounded-xl">
                                    <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                    <div className="text-sm text-gray-600">Prep Time</div>
                                    <div className="font-bold text-blue-600">{formatTime(recipeData?.prepTime)}</div>
                                </div>
                                <div className="text-center p-4 bg-orange-50 rounded-xl">
                                    <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                                    <div className="text-sm text-gray-600">Cook Time</div>
                                    <div className="font-bold text-orange-600">{formatTime(recipeData?.cookTime)}</div>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-xl">
                                    <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                    <div className="text-sm text-gray-600">Servings</div>
                                    <div className="font-bold text-green-600">{recipeData?.portionSize}</div>
                                </div>
                                <div className="text-center p-4 bg-purple-50 rounded-xl">
                                    <Award className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                    <div className="text-sm text-gray-600">Difficulty</div>
                                    <div className="font-bold text-purple-600">{recipeData?.selectLevel}</div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full font-medium">
                                    {recipeData?.category?.name}
                                </span>
                                <span className="px-3 py-1 text-sm bg-cyan-100 text-cyan-800 rounded-full font-medium">
                                    {recipeData?.subCategory?.subCategory}
                                </span>
                                <span className={`px-3 py-1 text-sm rounded-full font-medium border ${getDifficultyBadge(recipeData?.selectLevel)}`}>
                                    {recipeData?.selectLevel}
                                </span>
                                {recipeData?.tags?.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <ChefHat className="text-blue-500" />
                                Instructions
                            </h2>
                            <div className="space-y-4">
                                {recipeData?.instructions?.text?.map((instruction, index) => (
                                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-800 leading-relaxed">{instruction}</p>
                                            {recipeData?.instructions?.instructionImage[index] && (
                                                <div className="mt-3 flex items-center gap-2">
                                                    <Camera className="w-4 h-4 text-gray-500" />
                                                    <img
                                                        src={recipeData?.instructions?.instructionImage[index]?.startsWith('http') ? recipeData?.instructions?.instructionImage[index] : `${imageUrl}${recipeData?.instructions?.instructionImage[index]}`}
                                                        alt={`Step ${index + 1}`}
                                                        className="w-32 h-24 object-cover rounded-lg border border-gray-200"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nutritional Information */}
                        {recipeData?.NutritionalValue?.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold mb-6">Nutritional Information</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {recipeData?.NutritionalValue?.map((nutrition, index) => (
                                        <div key={index} className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                                            <h4 className="font-semibold text-gray-700 capitalize mb-1">{nutrition?.name}</h4>
                                            <p className="text-2xl font-bold text-green-600">{nutrition?.Kcal}</p>
                                            <p className="text-xs text-gray-500">per serving</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Ingredients */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Book className="text-green-500" />
                                Ingredients
                                <span className="text-sm font-normal text-gray-500">
                                    ({recipeData?.ingredientName?.length || 0} items)
                                </span>
                            </h2>
                            {renderIngredients()}
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <MessageSquare className="text-blue-500" />
                                Reviews
                            </h2>
                            {recipeData?.reviewData?.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">💬</div>
                                    <p className="text-gray-500 mb-4">No reviews yet</p>
                                    <Button type="primary" className="bg-blue-500 hover:bg-blue-600">
                                        Write First Review
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {recipeData?.reviewData?.map((review, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                    <User className="w-4 h-4 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-800">{review?.userName}</h4>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-3 h-3 ${i < review?.rating
                                                                    ? 'text-yellow-400 fill-current'
                                                                    : 'text-gray-300'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 text-sm leading-relaxed">{review?.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleRecipe;