import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Space,
  Upload,
  Image,
  message,
  Spin,
} from "antd";

import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { FaImage } from "react-icons/fa6";
import { MdOutlineOndemandVideo } from "react-icons/md";
import {
  useCategoriesQuery,
  useSubCategoriesQuery,
} from "../../../redux/apiSlices/categorySlice";
import { useCreateRecipeMutation } from "../../../redux/apiSlices/recipeSlice";
import toast from "react-hot-toast";
import { useGetIngredientsQuery } from "../../../redux/apiSlices/ingredientsSlice";
const { TextArea } = Input;
const { Option } = Select;

const AddRecipe = () => {
  const [form] = Form.useForm();
  const [ingredients, setIngredients] = useState([
    { id: 1, ingredientName: "", amount: "0", unit: "" },
  ]);
  const [instructions, setInstructions] = useState([
    { id: uuidv4(), instruction: "" },
  ]);
  const [nutritionalValues, setNutritionalValues] = useState([
    { id: uuidv4(), name: "", Kcal: "" },
  ]);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const { data: categories, isLoading: categoriesLoading } =
    useCategoriesQuery();
  const { data: subCategories, isLoading: subCategoriesLoading } =
    useSubCategoriesQuery();
  const [addRecipe, { isLoading: addRecipeLoading }] =
    useCreateRecipeMutation();
  const { data: ingredientsData, isLoading: ingredientsLoading } =
    useGetIngredientsQuery();

  if (categoriesLoading || subCategoriesLoading || ingredientsLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );

  const categoriesData = categories?.data;
  const subCategoriesData = subCategories?.data;
  const allIngredients = ingredientsData?.data;

  const handleImageUploadChange = ({ fileList }) => {
    if (fileList.length > 3) {
      message.error("You can upload a maximum of 3 images!");
      return;
    }
    setImageFiles(fileList);
  };

  const handleVideoUploadChange = ({ fileList }) => {
    if (fileList.length > 1) {
      message.error("You can upload only one video!");
      return;
    }
    setVideoFile(fileList[0]?.originFileObj || null);
  };

  const addNutritionalValue = () => {
    setNutritionalValues([
      ...nutritionalValues,
      { id: uuidv4(), name: "", Kcal: "" },
    ]);
  };

  const removeNutritionalValue = (id) => {
    setNutritionalValues(nutritionalValues.filter((nv) => nv.id !== id));
  };

  const handleNutritionChange = (id, field, value) => {
    setNutritionalValues((prev) =>
      prev?.map((nv) => (nv.id === id ? { ...nv, [field]: value } : nv))
    );
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now(), ingredientName: "", amount: "0", unit: "" },
    ]);
  };

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const handleIngredientChange = (id, field, value) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const handleInstructionChange = (id, value) => {
    setInstructions((prevInstructions) =>
      prevInstructions?.map((instruction) =>
        instruction.id === id
          ? { ...instruction, instruction: value }
          : instruction
      )
    );
  };

  const addInstruction = () => {
    setInstructions([...instructions, { id: uuidv4(), instruction: "" }]);
  };

  const removeInstruction = (id) => {
    setInstructions(
      instructions.filter((instruction) => instruction.id !== id)
    );
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("recipeName", values.recipeName);
    formData.append("description", values.description);
    formData.append("portionSize", values.portionSize);
    formData.append("selectLevel", values.selectLevel);
    formData.append("category", values.category);
    formData.append("prepTime", values.prepTime);
    formData.append("cookTime", values.cookTime);
    formData.append("tags", JSON.stringify(values.tags || []));
    formData.append("subCategory", values.subCategory);

    const ingredientsData = ingredients?.map((ingredient) => ({
      ingredientName: ingredient._id,
      amount: Number(ingredient.amount) || 0,
      unit: ingredient.unit,
    }));
    formData.append("ingredientName", JSON.stringify(ingredientsData));

    instructions.forEach((instruction, index) => {
      formData.append(`instructions[${index}]`, instruction.instruction);
    });

    const nutritionalData = nutritionalValues?.map((nv) => ({
      name: nv.name,
      Kcal: Number(nv.Kcal) || 0,
    }));
    formData.append("NutritionalValue", JSON.stringify(nutritionalData));

    imageFiles.forEach((file) => {
      formData.append("image", file.originFileObj);
    });

    if (videoFile) {
      formData.append("video", videoFile);
    }

    try {
      const res = await addRecipe(formData).unwrap();
      if (res.success) {
        toast.success("Recipe created successfully!");
      } else {
        toast.error(res.message || "Failed to create recipe");
      }

      form.resetFields();
      setIngredients([{ id: 1, ingredientName: "", amount: "", unit: "" }]);
      setInstructions([{ id: uuidv4(), instruction: "" }]);
      setNutritionalValues([{ id: uuidv4(), name: "", Kcal: "" }]);
      setImageFiles([]);
      setVideoFile(null);
    } catch (error) {
      message.error(error.data?.message || "Failed to create recipe");
    }
  };

  return (
    <div className="p-10 rounded-2xl bg-white">
      <h1 className="text-2xl font-semibold mb-6">Add Recipes</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-6"
      >
        <div className="flex w-full gap-5">
          {/* Left Side */}
          <div className="w-[50%]">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="mb-4">Upload Recipe Images (Maximum 3)</div>
              <Upload.Dragger
                multiple
                fileList={imageFiles}
                onChange={handleImageUploadChange}
                beforeUpload={() => false}
                style={{
                  minHeight: "150px",
                  padding: "20px",
                  border: "2px dashed #d9d9d9",
                }}
              >
                <p className="flex items-center justify-center">
                  <FaImage size={40} />
                </p>
                <div className="ant-upload-text">
                  {imageFiles.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {imageFiles?.map((file, index) => (
                        <Image
                          key={index}
                          src={URL.createObjectURL(file.originFileObj)}
                          alt={`Product ${index + 1}`}
                          width={80}
                          className="rounded-md !w-20 !h-20 object-cover"
                        />
                      ))}
                    </div>
                  ) : (
                    "Click or drag images here to upload"
                  )}
                </div>
              </Upload.Dragger>
            </div>
            <div className="bg-white p-4 mt-6 rounded-lg shadow">
              <div className="mb-4">Upload Recipe Video (Maximum 1)</div>
              <Upload.Dragger
                fileList={videoFile ? [videoFile] : []}
                onChange={handleVideoUploadChange}
                beforeUpload={(file) => {
                  if (file.type !== "video/mp4") {
                    message.error("Only MP4 video files are allowed!");
                    return false;
                  }
                }}
                style={{
                  minHeight: "150px",
                  padding: "20px",
                  border: "2px dashed #d9d9d9",
                }}
              >
                <p className="flex items-center justify-center">
                  <MdOutlineOndemandVideo size={40} />
                </p>
                <div className="ant-upload-text">
                  {videoFile ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <video
                        src={URL.createObjectURL(videoFile)}
                        controls
                        width={160}
                        className="rounded-md"
                      />
                    </div>
                  ) : (
                    "Click or drag a video here to upload"
                  )}
                </div>
              </Upload.Dragger>
            </div>
            <div className="space-y-4 mt-6">
              <Form.Item
                label="Recipe Name"
                name="recipeName"
                rules={[
                  { required: true, message: "Please enter the recipe name!" },
                ]}
              >
                <Input className="w-full" />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please add a description!" },
                ]}
              >
                <TextArea className="min-h-[100px]" />
              </Form.Item>
              {/* category & subCategory */}
              <div className="flex gap-4 w-full">
                <div className="w-[50%]">
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: "Please select a category!",
                      },
                    ]}
                  >
                    <Select placeholder="Select category">
                      {categoriesData?.map((category) => (
                        <Option key={category._id} value={category._id}>
                          {category.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-[50%]">
                  <Form.Item
                    label="Sub Category"
                    name="subCategory"
                    rules={[
                      { required: true, message: "Please select a level!" },
                    ]}
                  >
                    <Select placeholder="Select sub category">
                      {subCategoriesData?.map((subCategory) => (
                        <Option key={subCategory._id} value={subCategory._id}>
                          {subCategory.subCategory}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="flex gap-4 w-full">
                <div className="w-[50%]">
                  <Form.Item
                    label="Portion size for"
                    name="portionSize"
                    rules={[
                      {
                        required: true,
                        message: "Please specify the portion size!",
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Only numbers are allowed!",
                      },
                    ]}
                  >
                    <Input type="number" className="w-full" />
                  </Form.Item>
                </div>
                <div className="w-[50%]">
                  <Form.Item
                    label="Select Level"
                    name="selectLevel"
                    rules={[
                      { required: true, message: "Please select a level!" },
                    ]}
                  >
                    <Select placeholder="Select level">
                      <Option value="Easy">Easy</Option>
                      <Option value="Medium">Medium</Option>
                      <Option value="Hard">Hard</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-[50%]">
                <Form.Item
                  label="Prep Time"
                  name="prepTime"
                  rules={[
                    { required: true, message: "Please enter the prep time!" },
                  ]}
                >
                  <Input placeholder="HH:MM" />
                </Form.Item>
              </div>
              <div className="w-[50%]">
                <Form.Item
                  label="Cook Time"
                  name="cookTime"
                  rules={[
                    { required: true, message: "Please enter the cook time!" },
                  ]}
                >
                  <Input placeholder="HH:MM" />
                </Form.Item>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="w-[50%]">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="mb-4">Instructions</div>
              <div className="flex flex-col gap-4">
                {instructions?.map((instruction) => (
                  <div key={instruction.id} className="flex gap-4">
                    <Input
                      placeholder="Instruction"
                      name="instruction"
                      value={instruction.instruction}
                      onChange={(e) =>
                        handleInstructionChange(instruction.id, e.target.value)
                      }
                    />
                    <Button
                      type="text"
                      danger
                      onClick={() => removeInstruction(instruction.id)}
                      icon={<Trash2 className="w-4 h-4" />}
                    />
                  </div>
                ))}
                <Button
                  className="w-full bg-primary text-white"
                  onClick={addInstruction}
                  icon={<Plus className="w-4 h-4" />}
                >
                  Add More
                </Button>
              </div>
            </div>
            <div className="p-4 my-5 w-full rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Ingredients</h2>
              {ingredients?.map((ingredient) => (
                <Space
                  key={ingredient.id}
                  className="w-full mb-2"
                  align="start"
                >
                  <Form.Item
                    style={{ marginBottom: 0, flex: 2 }}
                    name={["ingredients", ingredient.id, "name"]}
                    rules={[{ required: true, message: "Ingredient required" }]}
                  >
                    <Select
                      placeholder="Ingredient"
                      value={ingredient.ingredientName}
                      onChange={(value) =>
                        handleIngredientChange(
                          ingredient.id,
                          "ingredientName",
                          value
                        )
                      }
                    >
                      {allIngredients?.map((ing) => (
                        <Option key={ing._id} value={ing._id}>
                          {ing.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: 0, flex: 1 }}
                    name={["ingredients", ingredient.id, "amount"]}
                    rules={[
                      { required: true, message: "Amount required" },
                      {
                        validator: (_, value) =>
                          Number(value) > 0
                            ? Promise.resolve()
                            : Promise.reject("Must be > 0"),
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      min={0}
                      step="0.1"
                      value={ingredient.amount}
                      onChange={(e) => {
                        if (!/^\d+\.?\d*$/.test(e.target.value)) return;
                        handleIngredientChange(
                          ingredient.id,
                          "amount",
                          e.target.value
                        );
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: 0, flex: 1 }}
                    name={["ingredients", ingredient.id, "unit"]}
                    rules={[{ required: true, message: "Unit required" }]}
                  >
                    <Select
                      placeholder="Unit"
                      value={ingredient.unit}
                      onChange={(value) =>
                        handleIngredientChange(ingredient.id, "unit", value)
                      }
                    >
                      <Option value="kg">kg</Option>
                      <Option value="g">g</Option>
                      <Option value="l">L</Option>
                      <Option value="ml">ml</Option>
                      <Option value="tsp">tsp</Option>
                      <Option value="tbsp">tbsp</Option>
                      <Option value="unit">unit</Option>
                    </Select>
                  </Form.Item>
                  <Button
                    type="text"
                    danger
                    onClick={() => removeIngredient(ingredient.id)}
                    icon={<Trash2 className="w-4 h-4" />}
                  />
                </Space>
              ))}
              <Button
                type="dashed"
                className="mt-4 bg-primary text-white"
                onClick={addIngredient}
                icon={<Plus className="w-4 h-4" />}
              >
                Add Ingredient
              </Button>
            </div>
            {/* Nutritional Value Section */}
            <div className="p-4 my-5 w-full rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Nutritional Values</h2>
              {nutritionalValues?.map((nutrition) => (
                <Space
                  key={nutrition._id}
                  className="w-full mb-2"
                  align="start"
                >
                  <Input
                    placeholder="Name (e.g., Energy)"
                    value={nutrition.name}
                    onChange={(e) =>
                      handleNutritionChange(
                        nutrition.id,
                        "name",
                        e.target.value
                      )
                    }
                  />
                  <Input
                    placeholder="Value (e.g., 680)"
                    type="number" // <-- Force numeric input
                    min={0}
                    value={nutrition.Kcal}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numbers
                      if (!/^\d*\.?\d*$/.test(value)) return;
                      handleNutritionChange(nutrition.id, "Kcal", value);
                    }}
                  />
                  <Button
                    type="text"
                    danger
                    onClick={() => removeNutritionalValue(nutrition.id)}
                    icon={<Trash2 className="w-4 h-4" />}
                  />
                </Space>
              ))}
              <Button
                type="dashed"
                className="mt-4 bg-primary text-white"
                onClick={addNutritionalValue}
                icon={<Plus className="w-4 h-4" />}
              >
                Add Nutritional Value
              </Button>
            </div>
            <Form.Item label="Tags (Maximum 20)" name="tags">
              <Select mode="tags" placeholder="Add tags" className="w-full" />
            </Form.Item>
            <div className="text-gray-500">
              Suggested: Breakfast, Eggs, 5min recipes, easy_recipes
            </div>
          </div>
        </div>
        <Form.Item>
          <Button
            type="primary"
            className="w-full bg-orange-500 hover:bg-orange-600"
            htmlType="submit"
          >
            Publish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddRecipe;
