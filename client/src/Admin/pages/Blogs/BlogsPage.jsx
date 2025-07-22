import { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddBlogForm from "../../components/Blogs/AddBlogForm";
import BlogsTable from "../../components/Blogs/BlogsTable";

const BlogsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([
    {
      key: "1",
      sno: "1.",
      title: "Do Collagen Supplements Work?",
      author: "Jurita Motuzaite",
      category: "Skin Beauty",
    },
    {
      key: "2",
      sno: "2.",
      title: "TOP 6 vitamins for your skin",
      author: "Jurita Motuzaite",
      category: "Skin Beauty",
    },
    {
      key: "3",
      sno: "3.",
      title: "How gratitude can transform your life?",
      author: "Jurita Motuzaite",
      category: "Wellness",
    },
    {
      key: "4",
      sno: "4.",
      title: "Signs that your mental health needs attention",
      author: "Jurita Motuzaite",
      category: "Wellness",
    },
    {
      key: "5",
      sno: "5.",
      title: "10 ways to ditch sugar",
      author: "Jurita Motuzaite",
      category: "Nutrition",
    },
    {
      key: "6",
      sno: "6.",
      title: "How to nourish brains?",
      author: "Jurita Motuzaite",
      category: "Nutrition",
    },
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (newBlog) => {
    const newKey = (data.length + 1).toString();
    setData([...data, { ...newBlog, key: newKey, sno: `${data.length + 1}.` }]);
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  return (
    <div className="p-4">
      <div className="flex justify-end ">
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add New
        </Button>
      </div>
      <BlogsTable data={data} onDelete={handleDelete} />
      <AddBlogForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default BlogsPage;
