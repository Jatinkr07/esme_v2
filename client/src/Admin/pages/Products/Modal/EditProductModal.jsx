import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Tabs,
  Switch,
  message,
} from "antd";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;
const { TabPane } = Tabs;

const EditProductModal = ({ visible, onCancel, onSubmit, product }) => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("info");
  const [ingredients, setIngredients] = useState([""]);
  const [summaryEn, setSummaryEn] = useState("");
  const [summaryAr, setSummaryAr] = useState("");
  const [benefitsEn, setBenefitsEn] = useState("");
  const [benefitsAr, setBenefitsAr] = useState("");
  const [methodsEn, setMethodsEn] = useState("");
  const [methodsAr, setMethodsAr] = useState("");
  const [compositionEn, setCompositionEn] = useState("");
  const [compositionAr, setCompositionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");

  useEffect(() => {
    if (product && visible) {
      form.setFieldsValue({
        category: product.category,
        nameEn: product.name,
        nameAr: product.nameAr || "",
      });
      setIngredients(product.ingredients || [""]);
      setSummaryEn(product.summaryEn || "");
      setSummaryAr(product.summaryAr || "");
      setBenefitsEn(product.benefitsEn || "");
      setBenefitsAr(product.benefitsAr || "");
      setMethodsEn(product.methodsEn || "");
      setMethodsAr(product.methodsAr || "");
      setCompositionEn(product.compositionEn || "");
      setCompositionAr(product.compositionAr || "");
      setDescriptionEn(product.descriptionEn || "");
      setDescriptionAr(product.descriptionAr || "");
    }
  }, [product, visible, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const productData = {
        ...values,
        ingredients: ingredients.filter((ing) => ing.trim() !== ""),
        summaryEn,
        summaryAr,
        benefitsEn,
        benefitsAr,
        methodsEn,
        methodsAr,
        compositionEn,
        compositionAr,
        descriptionEn,
        descriptionAr,
      };
      onSubmit(productData);
      handleReset();
    } catch (error) {
      message.error("Please fill in all required fields");
    }
  };

  const handleReset = () => {
    form.resetFields();
    setIngredients([""]);
    setSummaryEn("");
    setSummaryAr("");
    setBenefitsEn("");
    setBenefitsAr("");
    setMethodsEn("");
    setMethodsAr("");
    setCompositionEn("");
    setCompositionAr("");
    setDescriptionEn("");
    setDescriptionAr("");
    setActiveTab("info");
  };

  const handleCancel = () => {
    handleReset();
    onCancel();
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <Modal
      title="Edit Product"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width={800}
      style={{ top: 20 }}
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Product Information" key="info">
          <Form form={form} layout="vertical">
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select...">
                <Option value="Skin Beauty">Skin Beauty</Option>
                <Option value="Vitamins">Vitamins</Option>
                <Option value="Supplements">Supplements</Option>
                <Option value="Health">Health</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Name in english"
              name="nameEn"
              rules={[
                {
                  required: true,
                  message: "Please enter product name in English",
                },
              ]}
            >
              <Input placeholder="Enter product name in English" />
            </Form.Item>

            <Form.Item label="Name in arabic" name="nameAr">
              <Input placeholder="Enter product name in Arabic" />
            </Form.Item>

            <div className="form-section">
              <div className="form-section-title">Product summary</div>
              <ReactQuill
                value={summaryEn}
                onChange={setSummaryEn}
                modules={quillModules}
                style={{ marginBottom: "16px" }}
                placeholder="Enter product summary in English"
              />
              <ReactQuill
                value={summaryAr}
                onChange={setSummaryAr}
                modules={quillModules}
                placeholder="Enter product summary in Arabic"
              />
            </div>

            <div className="form-section">
              <div className="form-section-title">Ingredients</div>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-row">
                  <Input
                    className="ingredient-input"
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    placeholder="Enter ingredient"
                  />
                  {ingredients.length > 1 && (
                    <Button
                      type="text"
                      icon={<FiTrash2 />}
                      className="remove-ingredient"
                      onClick={() => removeIngredient(index)}
                    />
                  )}
                </div>
              ))}
              <Button
                type="dashed"
                icon={<FiPlus />}
                onClick={addIngredient}
                className="add-ingredient"
              >
                Add Ingredient
              </Button>
            </div>

            <div className="form-section">
              <div className="form-section-title">Description</div>
              <ReactQuill
                value={descriptionEn}
                onChange={setDescriptionEn}
                modules={quillModules}
                style={{ marginBottom: "16px" }}
                placeholder="Enter description in English"
              />
              <ReactQuill
                value={descriptionAr}
                onChange={setDescriptionAr}
                modules={quillModules}
                placeholder="Enter description in Arabic"
              />
            </div>
          </Form>
        </TabPane>

        <TabPane tab="Benefits" key="benefits">
          <div className="form-section">
            <div className="form-section-title">Benefits in English</div>
            <ReactQuill
              value={benefitsEn}
              onChange={setBenefitsEn}
              modules={quillModules}
              style={{ marginBottom: "16px" }}
              placeholder="Enter benefits in English"
            />
            <div className="form-section-title">Benefits in Arabic</div>
            <ReactQuill
              value={benefitsAr}
              onChange={setBenefitsAr}
              modules={quillModules}
              placeholder="Enter benefits in Arabic"
            />
          </div>
        </TabPane>

        <TabPane tab="Methods of use" key="methods">
          <div className="form-section">
            <div className="form-section-title">Methods of use in English</div>
            <ReactQuill
              value={methodsEn}
              onChange={setMethodsEn}
              modules={quillModules}
              style={{ marginBottom: "16px" }}
              placeholder="Enter methods of use in English"
            />
            <div className="form-section-title">Methods of use in Arabic</div>
            <ReactQuill
              value={methodsAr}
              onChange={setMethodsAr}
              modules={quillModules}
              placeholder="Enter methods of use in Arabic"
            />
          </div>
        </TabPane>

        <TabPane tab="Composition" key="composition">
          <div className="form-section">
            <div className="form-section-title">Composition in English</div>
            <ReactQuill
              value={compositionEn}
              onChange={setCompositionEn}
              modules={quillModules}
              style={{ marginBottom: "16px" }}
              placeholder="Enter composition in English"
            />
            <div className="form-section-title">Composition in Arabic</div>
            <ReactQuill
              value={compositionAr}
              onChange={setCompositionAr}
              modules={quillModules}
              placeholder="Enter composition in Arabic"
            />
          </div>
        </TabPane>
      </Tabs>

      <div className="modal-footer">
        <Button onClick={handleCancel} className="btn-cancel">
          Cancel
        </Button>
        <Button type="primary" onClick={handleSubmit} className="btn-primary">
          Update Product
        </Button>
      </div>
    </Modal>
  );
};

export default EditProductModal;
