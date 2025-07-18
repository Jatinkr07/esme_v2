import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Switch,
  Upload,
  InputNumber,
  message,
} from "antd";
import { FiUpload } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

const AddVariantModal = ({ visible, onCancel, onSubmit, product }) => {
  const [form] = Form.useForm();
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const variantData = {
        ...values,
        titleEn,
        titleAr,
        status: values.status ? "Active" : "Inactive",
      };
      onSubmit(variantData);
      handleReset();
    } catch (error) {
      message.error("Please fill in all required fields");
    }
  };

  const handleReset = () => {
    form.resetFields();
    setTitleEn("");
    setTitleAr("");
  };

  const handleCancel = () => {
    handleReset();
    onCancel();
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

  const uploadProps = {
    name: "file",
    multiple: true,
    accept: "image/*",
    beforeUpload: () => {
      return false; // Prevent automatic upload
    },
    onChange: (info) => {
      console.log("Files:", info.fileList);
    },
  };

  return (
    <Modal
      title="Add Variant"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      style={{ top: 20 }}
    >
      <Form form={form} layout="vertical" initialValues={{ status: true }}>
        <Form.Item
          label="Sku_id"
          name="skuId"
          rules={[{ required: true, message: "Please enter SKU ID" }]}
        >
          <Input placeholder="Enter SKU ID" />
        </Form.Item>

        <Form.Item
          label="Weight in grams"
          name="weight"
          rules={[{ required: true, message: "Please enter weight" }]}
        >
          <InputNumber
            placeholder="Enter weight in grams"
            style={{ width: "100%" }}
            min={0}
          />
        </Form.Item>

        <div className="form-section">
          <div className="form-section-title">Title in english</div>
          <ReactQuill
            value={titleEn}
            onChange={setTitleEn}
            modules={quillModules}
            style={{ marginBottom: "16px" }}
            placeholder="Enter title in English"
          />
          <div className="form-section-title">Title in arabic</div>
          <ReactQuill
            value={titleAr}
            onChange={setTitleAr}
            modules={quillModules}
            placeholder="Enter title in Arabic"
          />
        </div>

        <Form.Item label="Images" name="images">
          <Upload {...uploadProps}>
            <Button icon={<FiUpload />}>Choose Files</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <div className="currency-price-row">
            <Form.Item
              name="currency"
              rules={[{ required: true, message: "Please select currency" }]}
              style={{ margin: 0 }}
            >
              <Select placeholder="Select Currency" className="currency-select">
                <Option value="AED">AED</Option>
                <Option value="USD">USD</Option>
                <Option value="EUR">EUR</Option>
                <Option value="SAR">SAR</Option>
              </Select>
            </Form.Item>
            <InputNumber
              placeholder="Enter price"
              className="price-input"
              min={0}
              precision={2}
            />
          </div>
        </Form.Item>

        <Form.Item label="Status" name="status" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item
          label="Size"
          name="size"
          rules={[{ required: true, message: "Please select size" }]}
        >
          <Select placeholder="Select Size">
            <Option value="Pack of 1">Pack of 1</Option>
            <Option value="Pack of 2">Pack of 2</Option>
            <Option value="Pack of 3">Pack of 3</Option>
            <Option value="Pack of 5">Pack of 5</Option>
            <Option value="Pack of 10">Pack of 10</Option>
          </Select>
        </Form.Item>
      </Form>

      <div className="modal-footer">
        <Button onClick={handleCancel} className="btn-cancel">
          Cancel
        </Button>
        <Button type="primary" onClick={handleSubmit} className="btn-primary">
          Add Variant
        </Button>
      </div>
    </Modal>
  );
};

export default AddVariantModal;
