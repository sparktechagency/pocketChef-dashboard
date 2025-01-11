import React, { useState } from "react";
import { Form, Input, Select, Button, Space, Upload, Image } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Plus, Trash2 } from "lucide-react";

const { TextArea } = Input;
const { Option } = Select;

const AddRecipe = () => {
  const [form] = Form.useForm();
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "", amount: "", unit: "" },
  ]);
  const [fileList, setFileList] = useState([]);
  const [video, setVideo] = useState("");

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleVideoChange = (file) => {
    setVideo(file ? URL.createObjectURL(file) : "");
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now(), name: "", amount: "", unit: "" },
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

  const handleSubmit = (values) => {
    const recipeData = {
      ...values,
      ingredients: ingredients.map((ingredient) => ({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      })),
      images: fileList.map((file) => file.originFileObj),
      video,
    };
    console.log("Submitted Recipe Data:", recipeData);
    // Add your form submission logic here
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
            {/* Image and Video Upload */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="mb-4">Upload Recipe Images (3) and Video</div>
              <Upload.Dragger
                multiple
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={() => false} // Prevent auto-upload
                style={{
                  minHeight: "150px",
                  padding: "20px",
                  border: "2px dashed #d9d9d9",
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined size={40} />
                </p>
                <div className="ant-upload-text">
                  {fileList.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {fileList.map((file, index) => (
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

            {/* Basic Info */}
            <div className="space-y-4">
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

              <Form.Item
                label="Portion size for"
                name="portionSize"
                rules={[
                  {
                    required: true,
                    message: "Please specify the portion size!",
                  },
                ]}
              >
                <Input className="w-1/4" />
              </Form.Item>
            </div>

            {/* Recipe Details */}
            <div className="grid grid-cols-3 gap-4">
              <Form.Item
                label="Select Level"
                name="level"
                rules={[{ required: true, message: "Please select a level!" }]}
              >
                <Select placeholder="Select level">
                  <Option value="beginner">Beginner</Option>
                  <Option value="intermediate">Intermediate</Option>
                  <Option value="advanced">Advanced</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Select Course"
                name="course"
                rules={[{ required: true, message: "Please select a course!" }]}
              >
                <Select placeholder="Select course">
                  <Option value="breakfast">Breakfast</Option>
                  <Option value="lunch">Lunch</Option>
                  <Option value="dinner">Dinner</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Select Key Ingredient"
                name="keyIngredient"
                rules={[
                  {
                    required: true,
                    message: "Please select a key ingredient!",
                  },
                ]}
              >
                <Select placeholder="Select ingredient">
                  <Option value="chicken">Chicken</Option>
                  <Option value="beef">Beef</Option>
                  <Option value="fish">Fish</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Select by Diet"
                name="diet"
                rules={[{ required: true, message: "Please select a diet!" }]}
              >
                <Select placeholder="Select diet">
                  <Option value="vegetarian">Vegetarian</Option>
                  <Option value="vegan">Vegan</Option>
                  <Option value="keto">Keto</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Cooking Method"
                name="cookingMethod"
                rules={[
                  {
                    required: true,
                    message: "Please select a cooking method!",
                  },
                ]}
              >
                <Select placeholder="Select method">
                  <Option value="baking">Baking</Option>
                  <Option value="frying">Frying</Option>
                  <Option value="grilling">Grilling</Option>
                </Select>
              </Form.Item>
            </div>

            {/* Time Details */}
            <div className="grid grid-cols-3 gap-4">
              <Form.Item
                label="Total Time"
                name="totalTime"
                rules={[
                  { required: true, message: "Please enter the total time!" },
                ]}
              >
                <Input placeholder="HH:MM" />
              </Form.Item>
              <Form.Item
                label="Prep Time"
                name="prepTime"
                rules={[
                  { required: true, message: "Please enter the prep time!" },
                ]}
              >
                <Input placeholder="HH:MM" />
              </Form.Item>
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
          <div className="w-[50%]">
            {/* Instructions Editor */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="mb-4">Instructions</div>
              <div className="p-4">
                <TextArea placeholder="Enter instructions here" rows={6} />
              </div>
            </div>

            {/* Ingredients */}
            <div className="p-4 my-5 w-full rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Ingredients</h2>
              {ingredients.map((ingredient, index) => (
                <Space
                  key={ingredient.id}
                  className="w-full mb-2"
                  align="start"
                >
                  <Input
                    placeholder="Ingredient Name"
                    value={ingredient.name}
                    onChange={(e) =>
                      handleIngredientChange(
                        ingredient.id,
                        "name",
                        e.target.value
                      )
                    }
                    className=""
                  />
                  <Input
                    placeholder="Amount"
                    value={ingredient.amount}
                    onChange={(e) =>
                      handleIngredientChange(
                        ingredient.id,
                        "amount",
                        e.target.value
                      )
                    }
                    className=""
                  />
                  <Select
                    placeholder="Unit"
                    value={ingredient.unit}
                    onChange={(value) =>
                      handleIngredientChange(ingredient.id, "unit", value)
                    }
                    className=""
                  >
                    <Option value="kg">kg</Option>
                    <Option value="g">g</Option>
                    <Option value="unit">unit</Option>
                  </Select>
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

            {/* Tags */}
            <Form.Item label="Tags (Maximum 20)" name="tags">
              <Select mode="tags" placeholder="Add tags" className="w-full" />
            </Form.Item>

            <div className="text-gray-500">
              Suggested: Breakfast, Eggs, 5min recipes, easy_recipes
            </div>
          </div>
        </div>

        {/* Submit Button */}
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
