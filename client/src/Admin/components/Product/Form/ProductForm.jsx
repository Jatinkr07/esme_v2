import { useState, useEffect } from "react";
import { Form, Input, Select, Button, Tabs, message, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import TipTapComponent from "../Editor/TipTapComponent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../../../utils/api";

const { Option } = Select;

const ProductForm = ({ initialData, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1");
  const [ingredients, setIngredients] = useState([""]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [completedTabs, setCompletedTabs] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [editorData, setEditorData] = useState({
    productBenefits: { en: "", ar: "" },
    methodsOfUse: { en: "", ar: "" },
    productComposition: { en: "", ar: "" },
    productSummary: { en: "", ar: "" },
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/admin/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        name: initialData.name,
        category: initialData.category?._id || initialData.category,
      });
      setIngredients(
        initialData.ingredients?.filter((ing) => ing.trim()) || [""]
      );
      setEditorData({
        productBenefits: initialData.productBenefits || { en: "", ar: "" },
        methodsOfUse: initialData.methodsOfUse || { en: "", ar: "" },
        productComposition: initialData.productComposition || {
          en: "",
          ar: "",
        },
        productSummary: initialData.productSummary || { en: "", ar: "" },
      });

      setCompletedTabs({
        1: !!(
          initialData.name?.en &&
          initialData.name?.ar &&
          initialData.category &&
          initialData.ingredients?.some((ing) => ing.trim())
        ),
        2: !!(
          initialData.productBenefits?.en && initialData.productBenefits?.ar
        ),
        3: !!(initialData.methodsOfUse?.en && initialData.methodsOfUse?.ar),
        4: !!(
          initialData.productComposition?.en &&
          initialData.productComposition?.ar
        ),
      });
    }
  }, [initialData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const requiredEditorFields = [
        { field: "productSummary", tab: "1" },
        { field: "productBenefits", tab: "2" },
        { field: "methodsOfUse", tab: "3" },
        { field: "productComposition", tab: "4" },
      ];
      for (const { field, tab } of requiredEditorFields) {
        if (!editorData[field].en || !editorData[field].ar) {
          message.error(
            `Please fill in both English and Arabic ${field} in tab ${tab}`
          );
          setActiveTab(tab);
          return;
        }
      }

      if (!ingredients.some((ing) => ing.trim())) {
        message.error("Please add at least one ingredient");
        setActiveTab("1");
        return;
      }

      if (Object.values(completedTabs).some((completed) => !completed)) {
        message.error("Please fill in all required fields in all tabs");
        return;
      }
      const formData = {
        ...values,
        ...editorData,
        ingredients: ingredients.filter((ing) => ing.trim() !== ""),
      };
      onSave(formData);
    } catch (error) {
      console.error(error);
      message.error("Please fill in all required fields");
    }
  };

  const handleEditorChange = (field, lang, data) => {
    setEditorData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: data },
    }));

    setCompletedTabs((prev) => ({
      ...prev,
      [getTabKey(field)]: !!(
        editorData[field].en &&
        editorData[field].ar &&
        data
      ),
    }));
  };

  const addIngredient = () => {
    if (currentIngredient.trim()) {
      setIngredients([
        ...ingredients.filter((ing) => ing.trim()),
        currentIngredient,
      ]);
      setCurrentIngredient("");

      setCompletedTabs((prev) => ({
        ...prev,
        1: !!(
          form.getFieldValue("name")?.en &&
          form.getFieldValue("name")?.ar &&
          form.getFieldValue("category")
        ),
      }));
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
    setCompletedTabs((prev) => ({
      ...prev,
      1: !!(
        form.getFieldValue("name")?.en &&
        form.getFieldValue("name")?.ar &&
        form.getFieldValue("category") &&
        ingredients.filter((_, i) => i !== index).some((ing) => ing.trim())
      ),
    }));
  };

  const getTabKey = (field) => {
    switch (field) {
      case "productSummary":
        return "1";
      case "productBenefits":
        return "2";
      case "methodsOfUse":
        return "3";
      case "productComposition":
        return "4";
      default:
        return "1";
    }
  };

  const handleTabChange = async (key) => {
    try {
      if (activeTab === "1") {
        await form.validateFields(["name.en", "name.ar", "category"]);
        const hasIngredients = ingredients.some((ing) => ing.trim());
        setCompletedTabs((prev) => ({
          ...prev,
          1: !!(
            form.getFieldValue("name")?.en &&
            form.getFieldValue("name")?.ar &&
            form.getFieldValue("category") &&
            hasIngredients &&
            editorData.productSummary.en &&
            editorData.productSummary.ar
          ),
        }));
      } else if (activeTab === "2") {
        setCompletedTabs((prev) => ({
          ...prev,
          2: !!(editorData.productBenefits.en && editorData.productBenefits.ar),
        }));
      } else if (activeTab === "3") {
        setCompletedTabs((prev) => ({
          ...prev,
          3: !!(editorData.methodsOfUse.en && editorData.methodsOfUse.ar),
        }));
      } else if (activeTab === "4") {
        setCompletedTabs((prev) => ({
          ...prev,
          4: !!(
            editorData.productComposition.en && editorData.productComposition.ar
          ),
        }));
      }
      setActiveTab(key);
    } catch (error) {
      message.error("Please fill in all required fields in the current tab");
    }
  };

  const tabItems = [
    {
      key: "1",
      label: `Product Information${completedTabs[1] ? " ✓" : ""}`,
      children: (
        <Form form={form} layout="vertical" className="space-y-4">
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select...">
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name.en}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Name in English"
            name={["name", "en"]}
            rules={[
              {
                required: true,
                message: "Please enter product name in English",
              },
            ]}
          >
            <Input
              onChange={() => {
                setCompletedTabs((prev) => ({
                  ...prev,
                  1: !!(
                    form.getFieldValue("name")?.en &&
                    form.getFieldValue("name")?.ar &&
                    form.getFieldValue("category") &&
                    ingredients.some((ing) => ing.trim()) &&
                    editorData.productSummary.en &&
                    editorData.productSummary.ar
                  ),
                }));
              }}
            />
          </Form.Item>

          <Form.Item
            label="Name in Arabic"
            name={["name", "ar"]}
            rules={[
              {
                required: true,
                message: "Please enter product name in Arabic",
              },
            ]}
          >
            <Input
              dir="rtl"
              onChange={() => {
                setCompletedTabs((prev) => ({
                  ...prev,
                  1: !!(
                    form.getFieldValue("name")?.en &&
                    form.getFieldValue("name")?.ar &&
                    form.getFieldValue("category") &&
                    ingredients.some((ing) => ing.trim()) &&
                    editorData.productSummary.en &&
                    editorData.productSummary.ar
                  ),
                }));
              }}
            />
          </Form.Item>

          <Form.Item label="Product Summary in English">
            <TipTapComponent
              data={editorData.productSummary.en}
              onChange={(data) =>
                handleEditorChange("productSummary", "en", data)
              }
              placeholder="Enter product summary in English"
              height={150}
            />
          </Form.Item>

          <Form.Item label="Product Summary in Arabic">
            <TipTapComponent
              data={editorData.productSummary.ar}
              onChange={(data) =>
                handleEditorChange("productSummary", "ar", data)
              }
              placeholder="Enter product summary in Arabic"
              height={150}
              dir="rtl"
            />
          </Form.Item>

          <Form.Item label="Ingredients">
            <div className="flex items-center mb-2 space-x-2">
              <Input
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                placeholder="Enter ingredient"
                onPressEnter={addIngredient}
              />
              <Button type="dashed" onClick={addIngredient}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {ingredients
                .filter((ing) => ing.trim())
                .map((ingredient, index) => (
                  <Tag
                    key={index}
                    closable
                    onClose={() => removeIngredient(index)}
                    closeIcon={<CloseOutlined />}
                    className="flex items-center"
                  >
                    {ingredient}
                  </Tag>
                ))}
            </div>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: `Benefits${completedTabs[2] ? " ✓" : ""}`,
      children: (
        <Form form={form} layout="vertical" className="space-y-4">
          <Form.Item label="Product Benefits in English">
            <TipTapComponent
              data={editorData.productBenefits.en}
              onChange={(data) =>
                handleEditorChange("productBenefits", "en", data)
              }
              placeholder="Enter product benefits in English"
              height={150}
            />
          </Form.Item>

          <Form.Item label="Product Benefits in Arabic">
            <TipTapComponent
              data={editorData.productBenefits.ar}
              onChange={(data) =>
                handleEditorChange("productBenefits", "ar", data)
              }
              placeholder="Enter product benefits in Arabic"
              height={150}
              dir="rtl"
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "3",
      label: `Methods of Use${completedTabs[3] ? " ✓" : ""}`,
      children: (
        <Form form={form} layout="vertical" className="space-y-4">
          <Form.Item label="Methods of Use in English">
            <TipTapComponent
              data={editorData.methodsOfUse.en}
              onChange={(data) =>
                handleEditorChange("methodsOfUse", "en", data)
              }
              placeholder="Enter methods of use in English"
              height={150}
            />
          </Form.Item>

          <Form.Item label="Methods of Use in Arabic">
            <TipTapComponent
              data={editorData.methodsOfUse.ar}
              onChange={(data) =>
                handleEditorChange("methodsOfUse", "ar", data)
              }
              placeholder="Enter methods of use in Arabic"
              height={150}
              dir="rtl"
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "4",
      label: `Composition${completedTabs[4] ? " ✓" : ""}`,
      children: (
        <Form form={form} layout="vertical" className="space-y-4">
          <Form.Item label="Product Composition in English">
            <TipTapComponent
              data={editorData.productComposition.en}
              onChange={(data) =>
                handleEditorChange("productComposition", "en", data)
              }
              placeholder="Enter product composition in English"
              height={150}
            />
          </Form.Item>

          <Form.Item label="Product Composition in Arabic">
            <TipTapComponent
              data={editorData.productComposition.ar}
              onChange={(data) =>
                handleEditorChange("productComposition", "ar", data)
              }
              placeholder="Enter product composition in Arabic"
              height={150}
              dir="rtl"
            />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="overflow-y-auto max-h-[80vh]">
      <Tabs activeKey={activeTab} onChange={handleTabChange} items={tabItems} />
      <div className="flex justify-end pt-4 mt-6 space-x-2 border-t">
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          type="primary"
          onClick={
            activeTab === "4"
              ? handleSubmit
              : () => handleTabChange(String(Number(activeTab) + 1))
          }
          className="bg-purple-500 border-purple-500 hover:bg-purple-600"
          disabled={activeTab !== "4" && !completedTabs[activeTab]}
        >
          {activeTab === "4" ? "Save" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
