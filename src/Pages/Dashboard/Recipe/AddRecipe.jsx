import React from "react";
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
import { FaImage } from "react-icons/fa6";
import { MdOutlineOndemandVideo } from "react-icons/md";
import {
  useCategoriesQuery,
  useSubCategoriesQuery,
} from "../../../redux/apiSlices/categorySlice";
import { useCreateRecipeMutation } from "../../../redux/apiSlices/recipeSlice";
import toast from "react-hot-toast";
import { useGetIngredientsQuery } from "../../../redux/apiSlices/ingredientsSlice";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const AddRecipe = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imageFiles, setImageFiles] = React.useState([]);
  const [videoFile, setVideoFile] = React.useState(null);

  // API Queries
  const { data: categories, isLoading: categoriesLoading } =
    useCategoriesQuery();
  const { data: subCategories, isLoading: subCategoriesLoading } =
    useSubCategoriesQuery();
  const [addRecipe, { isLoading: addRecipeLoading }] =
    useCreateRecipeMutation();
  const { data: ingredientsData, isLoading: ingredientsLoading } =
    useGetIngredientsQuery();

  if (categoriesLoading || subCategoriesLoading || ingredientsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );
  }

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

  const handleSubmit = async (values) => {
    const formData = new FormData();

    // Convert HH:MM to total minutes
    const convertToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return (hours || 0) * 60 + (minutes || 0);
    };

    // Basic fields
    formData.append("recipeName", values.recipeName);
    formData.append("description", values.description);
    formData.append("portionSize", values.portionSize);
    formData.append("selectLevel", values.selectLevel);
    formData.append("category", values.category);
    formData.append("prepTime", convertToMinutes(values.prepTime));
    formData.append("cookTime", convertToMinutes(values.cookTime));
    formData.append("tags", JSON.stringify(values.tags || []));
    formData.append("subCategory", values.subCategory);

    // Ingredients
    const ingredientsData = values.ingredients?.map((ingredient) => ({
      ingredientName: ingredient.ingredientName,
      amount: Number(ingredient.amount) || 0,
      unit: ingredient.unit,
    }));
    formData.append("ingredientName", JSON.stringify(ingredientsData));

    // Instructions (now formatted per backend expectation)
    // Instructions with images
    const instructionTexts = [];
    const instructionImages = [];

    values.instructions?.forEach((item) => {
      if (item.text) {
        formData.append("text", item.text);
      } else {
        instructionTexts.push(item.text);
      }


      if (item.image instanceof File) {
        formData.append("instructionImage", item.image);
      } else {
        instructionImages.push("");
      }
    });

    const instructionsPayload = {
      text: instructionTexts,
      instructionImage: [],
    };

    formData.append("instructions", JSON.stringify(instructionsPayload));

    // Nutritional Values
    const nutritionalData = values.nutritionalValues?.map((nv) => ({
      name: nv.name,
      Kcal: nv.Kcal || "",
    }));
    formData.append("NutritionalValue", JSON.stringify(nutritionalData));

    // Media files
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
        form.resetFields();
        setImageFiles([]);
        setVideoFile(null);
        navigate("/recipe");
      }
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
            {/* Image Upload Section */}
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

            {/* Video Upload Section */}
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

            {/* Basic Information Section */}
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

              {/* Category & Subcategory */}
              <div className="flex gap-4 w-full">
                <div className="w-[50%]">
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                      { required: true, message: "Please select a category!" },
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
                      {
                        required: true,
                        message: "Please select a sub category!",
                      },
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

              {/* Portion Size & Difficulty Level */}
              <div className="flex gap-4 w-full">
                <div className="w-[50%]">
                  <Form.Item
                    label="Portion size for"
                    name="portionSize"
                    rules={[
                      {
                        required: true,
                        message: "Please specify portion size!",
                      },
                      { pattern: /^[0-9]+$/, message: "Only numbers allowed!" },
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
                      {
                        required: true,
                        message: "Please select difficulty level!",
                      },
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

              {/* Prep Time & Cook Time */}
              <div className="flex gap-4 w-full">
                <div className="w-[50%]">
                  <Form.Item
                    label="Prep Time"
                    name="prepTime"
                    rules={[
                      { required: true, message: "Please enter prep time!" },
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
                      { required: true, message: "Please enter cook time!" },
                    ]}
                  >
                    <Input placeholder="HH:MM" />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-[50%]">
            {/* Instructions Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="mb-4">Instructions</div>
              <Form.List name="instructions">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className="mb-4 space-y-2">
                        <div className="flex gap-4">
                          <Form.Item
                            {...restField}
                            name={[name, "text"]}
                            rules={[{ required: true, message: "Instruction text required" }]}
                            className="flex-1"
                          >
                            <Input placeholder={`Instruction ${key + 1}`} />
                          </Form.Item>

                          <Button
                            type="text"
                            danger
                            onClick={() => remove(name)}
                            icon={<Trash2 className="w-4 h-4" />}
                          />
                        </div>

                        <Form.Item
                          name={[name, "image"]}
                          valuePropName="file"
                          getValueFromEvent={(e) =>
                            Array.isArray(e) ? e : e?.fileList?.[0]?.originFileObj
                          }
                        >
                          <Upload
                            beforeUpload={() => false}
                            maxCount={1}
                            accept="image/*"
                            listType="picture"
                          >
                            <Button icon={<FaImage />}>Upload Instruction Image</Button>
                          </Upload>
                        </Form.Item>
                      </div>
                    ))}
                    <Button
                      className="w-full bg-primary text-white"
                      onClick={() => add()}
                      icon={<Plus className="w-4 h-4" />}
                    >
                      Add Instruction
                    </Button>
                  </>
                )}
              </Form.List>
            </div>

            {/* Ingredients Section */}
            <div className="p-4 my-5 w-full rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Ingredients</h2>
              <Form.List name="ingredients">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} className="w-full mb-2" align="start">
                        <Form.Item
                          {...restField}
                          name={[name, "ingredientName"]}
                          rules={[{ required: true, message: "Required" }]}
                          style={{ flex: 2 }}
                        >
                          <Select placeholder="Ingredient">
                            {allIngredients?.map((ing) => (
                              <Option key={ing._id} value={ing._id}>
                                {ing.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "amount"]}
                          rules={[
                            { required: true, message: "Required" },
                            {
                              validator: (_, value) =>
                                Number(value) > 0
                                  ? Promise.resolve()
                                  : Promise.reject("Must be > 0"),
                            },
                          ]}
                          style={{ flex: 1 }}
                        >
                          <Input
                            type="number"
                            min={0}
                            step="0.1"
                            placeholder="Amount"
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "unit"]}
                          rules={[{ required: true, message: "Required" }]}
                          style={{ flex: 1 }}
                        >
                          <Select placeholder="Unit">
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
                          onClick={() => remove(name)}
                          icon={<Trash2 className="w-4 h-4" />}
                        />
                      </Space>
                    ))}
                    <Button
                      type="dashed"
                      className="mt-4 bg-primary text-white"
                      onClick={() => add()}
                      icon={<Plus className="w-4 h-4" />}
                    >
                      Add Ingredient
                    </Button>
                  </>
                )}
              </Form.List>
            </div>

            {/* Nutritional Values Section */}
            <div className="p-4 my-5 w-full rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Nutritional Values</h2>
              <Form.List name="nutritionalValues">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} className="w-full mb-2" align="start">
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[{ required: true, message: "Name required" }]}
                        >
                          <Input placeholder="Nutrient name (e.g., Protein)" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "Kcal"]} // Keep field name as Kcal
                          rules={[
                            { required: true, message: "Value required" },
                            {
                              pattern: /^[0-9]+[a-zA-Z%]*$/,
                              message:
                                "Format: Number + unit (e.g., 10g or 50%)",
                            },
                          ]}
                        >
                          <Input placeholder="Value (e.g., 55g or 20%)" />
                        </Form.Item>
                        <Button
                          type="text"
                          danger
                          onClick={() => remove(name)}
                          icon={<Trash2 className="w-4 h-4" />}
                        />
                      </Space>
                    ))}
                    <Button
                      type="dashed"
                      className="mt-4 bg-primary text-white"
                      onClick={() => add()}
                      icon={<Plus className="w-4 h-4" />}
                    >
                      Add Nutrient
                    </Button>
                  </>
                )}
              </Form.List>
            </div>

            {/* Tags Section */}
            <Form.Item label="Tags (Maximum 20)" name="tags">
              <Select
                mode="tags"
                placeholder="Add tags (e.g., Breakfast, Vegetarian)"
                className="w-full"
              />
            </Form.Item>
            <div className="text-gray-500 text-sm mt-2">
              Example tags: Breakfast, Eggs, Quick Recipes, Healthy
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg"
            htmlType="submit"
            loading={addRecipeLoading}
          >
            Publish Recipe
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddRecipe;
