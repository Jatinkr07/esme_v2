import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Checkbox,
  Modal,
  Switch,
  message,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import VariantForm from "../../components/Product/Form/VariantForm";

const { Option } = Select;
const { Search } = Input;

const VariantPage = ({ productId, onNavigateBack }) => {
  const [variants, setVariants] = useState([
    {
      id: 1,
      productId: 1,
      skuId: "ESME-BTI-001",
      name: "Esmé Collagen Supplement BEAUTY THROUGH IMMUNITY, 14 vials x 15 ml",
      size: "Pack of 1",
      status: true,
    },
    {
      id: 2,
      productId: 1,
      skuId: "ESME-BTI-002",
      name: "Esmé Collagen Supplement BEAUTY THROUGH IMMUNITY, 14 vials x 15 ml",
      size: "Pack of 2",
      status: true,
    },
    {
      id: 3,
      productId: 1,
      skuId: "ESME-BTI-003",
      name: "Esmé Collagen Supplement BEAUTY THROUGH IMMUNITY, 14 vials x 15 ml",
      size: "Pack of 3",
      status: true,
    },
  ]);

  const [filteredVariants, setFilteredVariants] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const productVariants = variants.filter(
      (variant) => variant.productId === productId
    );
    setFilteredVariants(productVariants);
  }, [variants, productId]);

  const handleSearch = (value) => {
    setSearchText(value);
    const productVariants = variants.filter(
      (variant) => variant.productId === productId
    );
    const filtered = productVariants.filter(
      (variant) =>
        variant.name.toLowerCase().includes(value.toLowerCase()) ||
        variant.skuId.toLowerCase().includes(value.toLowerCase()) ||
        variant.size.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredVariants(filtered);
  };

  const handleAdd = () => {
    setEditingVariant(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingVariant(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setVariants(variants.filter((variant) => variant.id !== id));
    message.success("Variant deleted successfully");
  };

  const handleStatusChange = (id, status) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id ? { ...variant, status } : variant
      )
    );
  };

  const handleSave = (variantData) => {
    if (editingVariant) {
      setVariants(
        variants.map((variant) =>
          variant.id === editingVariant.id
            ? { ...variant, ...variantData }
            : variant
        )
      );
      message.success("Variant updated successfully");
    } else {
      const newVariant = {
        id: Date.now(),
        productId: productId,
        ...variantData,
      };
      setVariants([...variants, newVariant]);
      message.success("Variant added successfully");
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "#",
      key: "checkbox",
      width: 50,
      render: () => <Checkbox />,
    },
    {
      title: "S.No.",
      key: "serialNumber",
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Sku_id",
      dataIndex: "skuId",
      key: "skuId",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 150,
    },
    {
      title: "Status",
      key: "status",
      width: 100,
      render: (_, record) => (
        <Switch
          checked={record.status}
          onChange={(checked) => handleStatusChange(record.id, checked)}
          className="bg-gray-300"
        />
      ),
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
            title="Are you sure you want to delete this variant?"
            onConfirm={() => handleDelete(record.id)}
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
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center mb-6">
            <Button
              type="link"
              icon={<ArrowLeftOutlined />}
              onClick={onNavigateBack}
              className="p-0 mr-4"
            />
            <h1 className="text-2xl font-medium text-gray-600">Variants</h1>
          </div>

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
          dataSource={filteredVariants}
          rowKey="id"
          pagination={{
            pageSize: pageSize,
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `Page ${Math.ceil(range[0] / pageSize)} of ${Math.ceil(
                total / pageSize
              )}`,
          }}
          className="border-0"
        />
      </div>

      <Modal
        title={editingVariant ? "Edit Variant" : "Add Variant"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <VariantForm
          initialData={editingVariant}
          onSave={handleSave}
          onCancel={() => setIsModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default VariantPage;
