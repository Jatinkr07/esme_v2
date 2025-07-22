import { useState } from "react";
import { Button, Form, Input, Select, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TipTapComponent from "../Product/Editor/TipTapComponent";

const { Option } = Select;

const AddBlogForm = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const [englishContent, setEnglishContent] = useState("");
  const [arabicContent, setArabicContent] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = (values) => {
    onSubmit({
      ...values,
      englishContent,
      arabicContent,
      file: fileList[0]?.originFileObj,
    });
    form.resetFields();
    setFileList([]);
    setEnglishContent("");
    setArabicContent("");
    onCancel();
  };

  const uploadProps = {
    onChange: handleUploadChange,
    fileList,
    beforeUpload: () => false, // Prevent auto-upload
    accept: "image/*",
    listType: "picture",
    maxCount: 1,
  };

  return (
    <Modal
      title="Add Blog"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      className="font-sans"
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Upload Image"
          name="file"
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select...">
            <Option value="Skin Beauty">Skin Beauty</Option>
            <Option value="Wellness">Wellness</Option>
            <Option value="Nutrition">Nutrition</Option>
          </Select>
        </Form.Item>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Item
            label="Blog title in English"
            name="englishTitle"
            rules={[{ required: true, message: "Please enter English title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Blog title in Arabic"
            name="arabicTitle"
            rules={[{ required: true, message: "Please enter Arabic title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Author in English"
            name="englishAuthor"
            rules={[{ required: true, message: "Please enter English author" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Author in Arabic"
            name="arabicAuthor"
            rules={[{ required: true, message: "Please enter Arabic author" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item label="Blog content in English">
          <TipTapComponent
            data={englishContent}
            onChange={setEnglishContent}
            placeholder="Start typing in English..."
            height={150}
          />
        </Form.Item>
        <Form.Item label="Blog content in Arabic">
          <TipTapComponent
            data={arabicContent}
            onChange={setArabicContent}
            placeholder="ابدأ الكتابة بالعربية..."
            height={150}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBlogForm;
