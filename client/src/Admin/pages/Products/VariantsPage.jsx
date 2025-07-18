import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Tag,
  Tooltip,
  message,
  Breadcrumb,
} from "antd";
import {
  FiPlus,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiArrowLeft,
  FiHome,
} from "react-icons/fi";
import AddVariantModal from "./Modal/AddVariantModal";
import EditVariantModal from "./Modal/EditVariantModal";
import ViewVariantModal from "./Modal/ViewVariantModal";
import DeleteConfirmModal from "./Modal/DeleteConfirmModal";

const { Search } = Input;
const { Option } = Select;

const VariantsPage = ({ product, onNavigateToProducts }) => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Mock data
  useEffect(() => {
    const mockVariants = [
      {
        id: 1,
        skuId: "ESME-BT1-001",
        name: "Esmé Collagen Supplement BEAUTY THROUGH IMMUNITY, 14 vials x 15 ml",
        size: "Pack of 1",
        status: "Active",
        weight: 210,
        price: 299.99,
        currency: "AED",
        images: [],
        titleEn: "Premium collagen supplement for beauty",
        titleAr: "مكمل الكولاجين الفاخر للجمال",
      },
      {
        id: 2,
        skuId: "ESME-BT1-002",
        name: "Esmé Collagen Supplement BEAUTY THROUGH IMMUNITY, 14 vials x 15 ml",
        size: "Pack of 2",
        status: "Active",
        weight: 420,
        price: 549.99,
        currency: "AED",
        images: [],
        titleEn: "Premium collagen supplement for beauty - Double pack",
        titleAr: "مكمل الكولاجين الفاخر للجمال - عبوة مزدوجة",
      },
      {
        id: 3,
        skuId: "ESME-BT1-003",
        name: "Esmé Collagen Supplement BEAUTY THROUGH IMMUNITY, 14 vials x 15 ml",
        size: "Pack of 3",
        status: "Active",
        weight: 630,
        price: 799.99,
        currency: "AED",
        images: [],
        titleEn: "Premium collagen supplement for beauty - Triple pack",
        titleAr: "مكمل الكولاجين الفاخر للجمال - عبوة ثلاثية",
      },
    ];
    setVariants(mockVariants);
  }, []);

  const handleAdd = (variantData) => {
    const newVariant = {
      id: Date.now(),
      ...variantData,
      name: product.name,
    };
    setVariants([...variants, newVariant]);
    setIsAddModalVisible(false);
    message.success("Variant added successfully!");
  };

  const handleEdit = (variantData) => {
    setVariants(
      variants.map((v) =>
        v.id === selectedVariant.id ? { ...v, ...variantData } : v
      )
    );
    setIsEditModalVisible(false);
    message.success("Variant updated successfully!");
  };

  const handleDelete = () => {
    setVariants(variants.filter((v) => v.id !== selectedVariant.id));
    setIsDeleteModalVisible(false);
    message.success("Variant deleted successfully!");
  };

  const handleView = (variant) => {
    setSelectedVariant(variant);
    setIsViewModalVisible(true);
  };

  const handleEditClick = (variant) => {
    setSelectedVariant(variant);
    setIsEditModalVisible(true);
  };

  const handleDeleteClick = (variant) => {
    setSelectedVariant(variant);
    setIsDeleteModalVisible(true);
  };

  const filteredVariants = variants.filter(
    (variant) =>
      variant.name.toLowerCase().includes(searchText.toLowerCase()) ||
      variant.skuId.toLowerCase().includes(searchText.toLowerCase()) ||
      variant.size.toLowerCase().includes(searchText.toLowerCase())
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
      title: "Sku_id",
      dataIndex: "skuId",
      key: "skuId",
      width: 150,
      render: (text) => (
        <span style={{ fontFamily: "monospace", fontSize: "13px" }}>
          {text}
        </span>
      ),
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
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 120,
      render: (size) => <Tag color="green">{size}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
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
      <div className="breadcrumb-container">
        <Breadcrumb>
          <Breadcrumb.Item>
            <FiHome />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Button
              type="link"
              onClick={onNavigateToProducts}
              style={{ padding: 0 }}
            >
              Products
            </Button>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Variants</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="page-header">
        <Button
          type="default"
          icon={<FiArrowLeft />}
          onClick={onNavigateToProducts}
          className="back-button"
        >
          Back to Products
        </Button>
        <h1 className="page-title">Variants</h1>
        <p style={{ color: "#6b7280", margin: 0 }}>
          Managing variants for: {product?.name}
        </p>
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
          dataSource={filteredVariants}
          loading={loading}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredVariants.length,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `Page ${currentPage} of ${Math.ceil(total / pageSize)}`,
            className: "pagination-container",
          }}
        />
      </div>

      <AddVariantModal
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onSubmit={handleAdd}
        product={product}
      />

      <EditVariantModal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onSubmit={handleEdit}
        variant={selectedVariant}
        product={product}
      />

      <ViewVariantModal
        visible={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        variant={selectedVariant}
      />

      <DeleteConfirmModal
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDelete}
        title="Delete Variant"
        content={`Are you sure you want to delete variant "${selectedVariant?.skuId}"?`}
      />
    </div>
  );
};

export default VariantsPage;
