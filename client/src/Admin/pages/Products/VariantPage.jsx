import { useState } from "react";
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
import DOMPurify from "dompurify";
import VariantForm from "../../components/Product/Form/VariantForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../../utils/api";
import { useAdmin } from "../../context/AdminContext";

const { Option } = Select;
const { Search } = Input;

const VariantPage = ({ productId, onNavigateBack }) => {
  const { isAuthenticated } = useAdmin();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  // Fetch product with variants
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}/api/admin/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      return response.data;
    },
    enabled: isAuthenticated && !!productId,
    onError: (err) => {
      if (err.response?.status === 404) {
        message.error("Product not found");
        onNavigateBack();
      } else {
        message.error("Failed to fetch product");
      }
    },
  });

  // Add variant mutation
  const addVariantMutation = useMutation({
    mutationFn: (data) =>
      axios.post(`${API_URL}/api/admin/products/${productId}/variants`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }),
    onSuccess: () => {
      message.success("Variant added successfully");
      queryClient.invalidateQueries(["product", productId]);
      setIsModalVisible(false);
    },
    onError: (err) => {
      console.error("Add variant error:", err.response?.data);
      message.error(err.response?.data?.message || "Failed to add variant");
    },
  });

  // Update variant mutation
  const updateVariantMutation = useMutation({
    mutationFn: ({ variantId, data }) => {
      const formData = new FormData();
      // If data is a FormData object (from VariantForm), use it directly
      if (data instanceof FormData) {
        return axios.put(
          `${API_URL}/api/admin/products/${productId}/variants/${variantId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );
      }
      // For status toggle, include all required fields
      const variant = product.variants.find((v) => v._id === variantId);
      formData.append("skuId", variant.skuId);
      formData.append("weight", variant.weight);
      formData.append("title", JSON.stringify(variant.title));
      formData.append("price", variant.price);
      formData.append("priceArabic", variant.priceArabic);
      formData.append("currency", variant.currency);
      formData.append("status", data.status);
      formData.append("size", variant.size);
      formData.append("imagesToDelete", JSON.stringify([]));
      console.log("Status toggle FormData:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      return axios.put(
        `${API_URL}/api/admin/products/${productId}/variants/${variantId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
    },
    onSuccess: () => {
      message.success("Variant updated successfully");
      queryClient.invalidateQueries(["product", productId]);
    },
    onError: (err) => {
      console.error("Update variant error:", err.response?.data);
      message.error(err.response?.data?.message || "Failed to update variant");
    },
  });

  // Delete variant mutation
  const deleteVariantMutation = useMutation({
    mutationFn: (variantId) =>
      axios.delete(
        `${API_URL}/api/admin/products/${productId}/variants/${variantId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      ),
    onSuccess: () => {
      message.success("Variant deleted successfully");
      queryClient.invalidateQueries(["product", productId]);
    },
    onError: () => message.error("Failed to delete variant"),
  });

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleAdd = () => {
    setEditingVariant(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingVariant(record);
    setIsModalVisible(true);
  };

  const handleDelete = (variantId) => {
    deleteVariantMutation.mutate(variantId);
  };

  const handleSave = (variantData) => {
    if (editingVariant) {
      updateVariantMutation.mutate({
        variantId: editingVariant._id,
        data: variantData,
      });
    } else {
      addVariantMutation.mutate(variantData);
    }
  };

  const filteredVariants = (product?.variants || []).filter(
    (variant) =>
      variant.title.en.toLowerCase().includes(searchText.toLowerCase()) ||
      variant.title.ar.toLowerCase().includes(searchText.toLowerCase()) ||
      variant.skuId.toLowerCase().includes(searchText.toLowerCase()) ||
      variant.size.toLowerCase().includes(searchText.toLowerCase())
  );

  if (error?.response?.status === 404) {
    return null; // Redirect handled in onError
  }

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
            <h1 className="text-2xl font-medium text-gray-600">
              Variants for {product?.name?.en || "Product"}
            </h1>
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
                  <Option value={35}>35</Option>
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
          columns={[
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
              title: "SKU ID",
              dataIndex: "skuId",
              key: "skuId",
              width: 150,
            },
            {
              title: "Title (EN)",
              key: "title_en",
              width: 200,
              render: (_, record) => (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(record.title.en),
                  }}
                />
              ),
              ellipsis: true,
            },
            {
              title: "Title (AR)",
              key: "title_ar",
              width: 200,
              render: (_, record) => (
                <div
                  dir="rtl"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(record.title.ar),
                  }}
                />
              ),
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
                  onChange={(checked) =>
                    updateVariantMutation.mutate({
                      variantId: record._id,
                      data: { status: checked },
                    })
                  }
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
              ),
            },
          ]}
          dataSource={filteredVariants}
          rowKey="_id"
          loading={isLoading}
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
