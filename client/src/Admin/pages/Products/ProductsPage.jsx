import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Tag,
  Tooltip,
  message,
} from "antd";
import { FiPlus, FiEye, FiEdit2, FiTrash2, FiSettings } from "react-icons/fi";
import AddProductModal from "./Modal/AddProductModal";
import EditProductModal from "./Modal/EditProductModal";
import ViewProductModal from "./Modal/ViewProductModal";
import DeleteConfirmModal from "./Modal/DeleteConfirmModal";

const { Search } = Input;
const { Option } = Select;

const ProductsPage = ({ onNavigateToVariants }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mock data
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: "Esmé Collagen Supplement BEAUTY THROUGH IMMUNITY, 14 vials x 15 ml",
        category: "Skin Beauty",
        variants: 3,
        description: "Premium collagen supplement for beauty and immunity",
        ingredients: ["Collagen", "Vitamin C", "Hyaluronic Acid"],
        benefits: "Improves skin elasticity and hydration",
        methods: "Take one vial daily with meals",
        composition: "Marine collagen 10g, Vitamin C 80mg",
      },
      {
        id: 2,
        name: "Vitamin D3 + K2 Complex",
        category: "Vitamins",
        variants: 2,
        description: "High-quality vitamin D3 and K2 supplement",
        ingredients: ["Vitamin D3", "Vitamin K2", "MCT Oil"],
        benefits: "Supports bone health and immune function",
        methods: "Take 1-2 capsules daily",
        composition: "Vitamin D3 5000IU, Vitamin K2 100mcg",
      },
    ];
    setProducts(mockProducts);
  }, []);

  const handleAdd = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      variants: 0,
    };
    setProducts([...products, newProduct]);
    setIsAddModalVisible(false);
    message.success("Product added successfully!");
  };

  const handleEdit = (productData) => {
    setProducts(
      products.map((p) =>
        p.id === selectedProduct.id ? { ...p, ...productData } : p
      )
    );
    setIsEditModalVisible(false);
    message.success("Product updated successfully!");
  };

  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    setIsDeleteModalVisible(false);
    message.success("Product deleted successfully!");
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setIsViewModalVisible(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalVisible(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalVisible(true);
  };

  const handleVariantsClick = (product) => {
    onNavigateToVariants(product);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "#",
      key: "checkbox",
      width: 50,
      render: () => <input type="checkbox" />,
    },
    {
      title: "S.No.",
      key: "sno",
      width: 80,
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      render: (text) => (
        <span style={{ color: "#1890ff", cursor: "pointer" }}>{text}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Variants",
      dataIndex: "variants",
      key: "variants",
      width: 100,
      render: (variants, record) => (
        <Button
          type="link"
          icon={<FiSettings />}
          onClick={() => handleVariantsClick(record)}
          style={{ padding: 0 }}
        >
          {variants}
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View">
            <Button
              type="text"
              icon={<FiEye />}
              className="action-button view"
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<FiEdit2 />}
              className="action-button edit"
              onClick={() => handleEditClick(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              icon={<FiTrash2 />}
              className="action-button delete"
              onClick={() => handleDeleteClick(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Products</h1>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div className="table-controls">
            <Select
              value={pageSize}
              onChange={setPageSize}
              style={{ width: 120 }}
            >
              <Option value={10}>Show 10</Option>
              <Option value={25}>Show 25</Option>
              <Option value={50}>Show 50</Option>
              <Option value={100}>Show 100</Option>
            </Select>
            <Search
              placeholder="Search in Table"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </div>
          <Button
            type="primary"
            icon={<FiPlus />}
            onClick={() => setIsAddModalVisible(true)}
            className="add-button"
          >
            Add New
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredProducts}
          loading={loading}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredProducts.length,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `Page ${currentPage} of ${Math.ceil(total / pageSize)}`,
            className: "pagination-container",
          }}
        />
      </div>

      <AddProductModal
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onSubmit={handleAdd}
      />

      <EditProductModal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onSubmit={handleEdit}
        product={selectedProduct}
      />

      <ViewProductModal
        visible={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        product={selectedProduct}
      />

      <DeleteConfirmModal
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        content={`Are you sure you want to delete "${selectedProduct?.name}"?`}
      />
    </div>
  );
};

export default ProductsPage;
