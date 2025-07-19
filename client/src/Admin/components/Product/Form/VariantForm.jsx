import { useState, useEffect } from "react";
import { Form, Input, Button, Switch, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TipTapComponent from "../Editor/TipTapComponent";

const { Option } = Select;

const VariantForm = ({ initialData, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [editorData, setEditorData] = useState({
    titleEnglish: "",
    titleArabic: "",
  });

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        status: initialData.status || false,
        images: initialData.images || [],
      });
      setEditorData({
        titleEnglish: initialData.titleEnglish || "",
        titleArabic: initialData.titleArabic || "",
      });
      setFileList(initialData.images || []);
    } else {
      form.setFieldsValue({
        status: true,
        currency: "AED",
        size: "Pack of 1",
      });
    }
  }, [initialData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const formData = {
        ...values,
        ...editorData,
        images: fileList.map((file) => file.response || file.name || file.url), // Handle file upload response or file name
      };

      onSave(formData);
    } catch (error) {
      console.log(error);
      message.error("Please fill in all required fields");
    }
  };

  const handleEditorChange = (field, data) => {
    setEditorData((prev) => ({
      ...prev,
      [field]: data,
    }));
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadProps = {
    multiple: true,
    fileList,
    onChange: handleUploadChange,
    beforeUpload: () => false, // Prevent auto upload, handle manually if needed
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = [...fileList];
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
  };

  return (
    <div className="overflow-y-auto max-h-96">
      <Form form={form} layout="vertical" className="space-y-4">
        <Form.Item
          label="SKU ID"
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
          <Input placeholder="Enter weight in grams" type="number" />
        </Form.Item>

        <Form.Item
          label="Title in English"
          name="titleEnglish"
          rules={[{ required: true, message: "Please enter title in English" }]}
        >
          <TipTapComponent
            data={editorData.titleEnglish}
            onChange={(data) => handleEditorChange("titleEnglish", data)}
            placeholder="Enter title in English"
            height={150}
          />
        </Form.Item>

        <Form.Item
          label="Title in Arabic"
          name="titleArabic"
          rules={[{ required: true, message: "Please enter title in Arabic" }]}
        >
          <TipTapComponent
            data={editorData.titleArabic}
            onChange={(data) => handleEditorChange("titleArabic", data)}
            placeholder="Enter title in Arabic"
            height={150}
            dir="rtl" // Support RTL for Arabic
          />
        </Form.Item>

        <Form.Item
          label="Images"
          name="images"
          rules={[
            { required: true, message: "Please upload at least one image" },
          ]}
          valuePropName="fileList" // Use fileList as the value
          getValueFromEvent={(e) => e.fileList} // Sync fileList with form
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Choose Files</Button>
          </Upload>
          <span className="ml-2 text-sm text-gray-500">
            {fileList.length > 0
              ? `${fileList.length} file(s) selected`
              : "No file chosen"}
          </span>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <Input placeholder="Enter price" type="number" />
        </Form.Item>

        <Form.Item
          label="Price in Arabic"
          name="priceArabic"
          rules={[{ required: true, message: "Please enter price in Arabic" }]}
        >
          <Input placeholder="Enter price in Arabic" />
        </Form.Item>

        <Form.Item
          label="Select Currency"
          name="currency"
          rules={[{ required: true, message: "Please select currency" }]}
        >
          <Select>
            <Option value="AED">AED</Option>
            <Option value="USD">USD</Option>
            <Option value="EUR">EUR</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Status" name="status" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item
          label="Size"
          name="size"
          rules={[{ required: true, message: "Please select size" }]}
        >
          <Select>
            <Option value="Pack of 1">Pack of 1</Option>
            <Option value="Pack of 2">Pack of 2</Option>
            <Option value="Pack of 3">Pack of 3</Option>
            <Option value="Pack of 5">Pack of 5</Option>
          </Select>
        </Form.Item>
      </Form>

      <div className="flex justify-end pt-4 mt-6 space-x-2 border-t">
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          className="bg-purple-500 border-purple-500 hover:bg-purple-600"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default VariantForm;
