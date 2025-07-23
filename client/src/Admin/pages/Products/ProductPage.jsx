import { useState } from "react";
import { Table, Button, Input, Select, Space, Checkbox, Modal, message, Popconfirm } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, SettingOutlined, SearchOutlined } from "@ant-design/icons";
import ProductForm from "../../components/Product/Form/ProductForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../../utils/api";
import { useAdmin } from "../../context/AdminContext";

const { Option } = Select;
const { Search } = Input;

const ProductPage = ({ onNavigateToVariants }) => {
  const { isAuthenticated } = useAdmin();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  // Fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/admin/products`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
      return response.data;
    },
    enabled: isAuthenticated
  });

  // Create product mutation
  const createMutation = useMutation({
    mutationFn: (data) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, JSON.stringify(value));
      });
      return axios.post(`${API_URL}/api/admin/products`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
    },
    onSuccess: () => {
      message.success("Product added successfully");
      queryClient.invalidateQueries(["products"]);
      setIsModalVisible(false);
    },
    onError: () => message.error("Failed to add product")
  });

  // Update product mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, JSON.stringify(value));
      });
      return axios.put(`${API_URL}/api/admin/products/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
    },
    onSuccess: () => {
      message.success("Product updated successfully");
      queryClient.invalidateQueries(["products"]);
      setIsModalVisible(false);
    },
    onError: () => message.error("Failed to update product")
  });

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${API_URL}/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
    }),
    onSuccess: () => {
      message.success("Product deleted successfully");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => message.error("Failed to delete product")
  });

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleSave = (productData) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct._id, data: productData });
    } else {
      createMutation.mutate(productData);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.en.toLowerCase().includes(searchText.toLowerCase()) ||
      product.name.ar.toLowerCase().includes(searchText.toLowerCase()) ||
      product.category?.name?.en.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "#",
      key: "checkbox",
      width: 50,
      render: () => <Checkbox />
    },
    {
      title: "S.No.",
      key: "serialNumber",
      width: 80,
      render: (_, __, index) => index + 1
    },
    {
      title: "Name (EN)",
      dataIndex: ["name", "en"],
      key: "name_en",
      ellipsis: true
    },
    {
      title: "Name (AR)",
      dataIndex: ["name", "ar"],
      key: "name_ar",
      ellipsis: true
    },
    {
      title: "Category",
      dataIndex: ["category", "name", "en"],
      key: "category",
      width: 150
    },
    {
      title: "Variants",
      key: "variants",
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          icon={<SettingOutlined />}
          onClick={() => onNavigateToVariants(record._id)}
          className="p-0"
        >
          {record.variants.length}
        </Button>
      )
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleEdit(record)}
            className="p-0"
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="p-0"
          />
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              danger
              className="p-0"
            />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h1 className="mb-6 text-2xl font-medium text-gray-600">Products</h1>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show</span>
                <Select
                  value={pageSize}
                  onChange={setPageSize}
                  className="w-20"
                >
                  <Option value={10}>10</Option>
                  <Option value={25}>25</Option>
                  <Option value={50}>50</Option>
                </Select>
              </div>

              <Search
                placeholder="Search in Table"
                allowClear
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-64"
                prefix={<SearchOutlined />}
              />
            </div>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              className="px-6 bg-purple-500 border-purple-500 rounded-full hover:bg-purple-600"
            >
              Add New
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="_id"
          loading={isLoading}
          pagination={{
            pageSize: pageSize,
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `Page ${Math.ceil(range[0] / pageSize)} of ${Math.ceil(total / pageSize)}`
          }}
          className="border-0"
        />
      </div>

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose={true}
        footer={null}
        width={800}
      >
        <ProductForm
          initialData={editingProduct}
          onSave={handleSave}
          onCancel={() => setIsModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductPage;