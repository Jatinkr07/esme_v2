import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Switch,
  Select,
  Upload,
  message,
  Image,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import TipTapComponent from "../Editor/TipTapComponent";
import API_URL from "../../../../utils/api";

const { Option } = Select;

const VariantForm = ({ initialData, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [editorData, setEditorData] = useState({
    title: { en: "", ar: "" },
  });

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        skuId: initialData.skuId,
        weight: initialData.weight,
        price: initialData.price,
        priceArabic: initialData.priceArabic,
        currency: initialData.currency || "AED",
        status: initialData.status !== undefined ? initialData.status : true,
        size: initialData.size || "Pack of 1",
      });
      setEditorData({
        title: initialData.title || { en: "", ar: "" },
      });
      setFileList(
        initialData.images?.map((url, index) => ({
          uid: `-${index}`,
          name: url.split("/").pop(),
          status: "done",
          url: `${API_URL}${url}`,
        })) || []
      );
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
      // Validate Ant Design form fields
      const values = await form.validateFields();

      // Validate editor fields
      if (!editorData.title.en.trim()) {
        message.error("Please fill in the English title");
        return;
      }
      if (!editorData.title.ar.trim()) {
        message.error("Please fill in the Arabic title");
        return;
      }

      // Validate images (required for new variants, optional for updates if images exist)
      if (!initialData && fileList.length === 0) {
        message.error("Please upload at least one image for a new variant");
        return;
      }
      if (
        initialData &&
        fileList.length === 0 &&
        imagesToDelete.length === initialData.images.length
      ) {
        message.error("At least one image must remain for the variant");
        return;
      }

      // Construct FormData
      const formData = new FormData();
      formData.append("skuId", values.skuId);
      formData.append("weight", values.weight);
      formData.append("title", JSON.stringify(editorData.title));
      formData.append("price", values.price);
      formData.append("priceArabic", values.priceArabic);
      formData.append("currency", values.currency);
      formData.append("status", values.status);
      formData.append("size", values.size);
      formData.append("imagesToDelete", JSON.stringify(imagesToDelete));
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });

      // Debug FormData contents
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      onSave(formData);
    } catch (error) {
      console.error("Validation error:", error);
      message.error("Please fill in all required fields");
    }
  };

  const handleEditorChange = (field, lang, data) => {
    setEditorData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: data },
    }));
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemoveImage = (file) => {
    if (file.url) {
      setImagesToDelete((prev) => [
        ...prev,
        file.url.replace(`${API_URL}`, ""),
      ]);
    }
    setFileList(fileList.filter((f) => f.uid !== file.uid));
  };

  const uploadProps = {
    multiple: true,
    fileList,
    onChange: handleUploadChange,
    beforeUpload: () => false, // Prevent auto upload
    onRemove: handleRemoveImage,
    listType: "picture",
    showUploadList: { showPreviewIcon: true, showRemoveIcon: true },
  };

  return (
    <div className="overflow-y-auto max-h-[80vh]">
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
            data={editorData.title.en}
            onChange={(data) => handleEditorChange("title", "en", data)}
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
            data={editorData.title.ar}
            onChange={(data) => handleEditorChange("title", "ar", data)}
            placeholder="Enter title in Arabic"
            height={150}
            dir="rtl"
          />
        </Form.Item>

        <Form.Item
          label="Images"
          name="images"
          rules={[
            {
              validator: () => {
                if (!initialData && fileList.length === 0) {
                  return Promise.reject(
                    "Please upload at least one image for a new variant"
                  );
                }
                if (
                  initialData &&
                  fileList.length === 0 &&
                  imagesToDelete.length === initialData.images.length
                ) {
                  return Promise.reject(
                    "At least one image must remain for the variant"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Choose Files</Button>
          </Upload>
          <div className="flex flex-wrap gap-2 mt-2">
            {fileList.map((file) => (
              <div key={file.uid} className="flex items-center space-x-2">
                <Image
                  src={file.url || URL.createObjectURL(file.originFileObj)}
                  alt="Preview"
                  width={50}
                  height={50}
                />
              </div>
            ))}
          </div>
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
