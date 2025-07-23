import React, { useState } from "react";
import { Table, Select, Input, Checkbox, Button, Modal, message } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../../utils/api";
import { useAdmin } from "../../context/AdminContext";

const { Option } = Select;

export default function CategoryManagement() {
  const { isAuthenticated } = useAdmin();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: { en: "", ar: "" } });
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch categories
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/admin/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      return response.data;
    },
    enabled: isAuthenticated,
  });

  // Create category mutation
  const createMutation = useMutation({
    mutationFn: (data) =>
      axios.post(`${API_URL}/api/admin/categories`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }),
    onSuccess: () => {
      message.success("Category created successfully");
      queryClient.invalidateQueries(["categories"]);
      setIsModalVisible(false);
      setFormData({ name: { en: "", ar: "" } });
    },
    onError: () => message.error("Failed to create category"),
  });

  // Update category mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) =>
      axios.put(`${API_URL}/api/admin/categories/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }),
    onSuccess: () => {
      message.success("Category updated successfully");
      queryClient.invalidateQueries(["categories"]);
      setIsModalVisible(false);
      setEditingCategory(null);
      setFormData({ name: { en: "", ar: "" } });
    },
    onError: () => message.error("Failed to update category"),
  });

  // Delete category mutation
  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`${API_URL}/api/admin/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      }),
    onSuccess: () => {
      message.success("Category deleted successfully");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: () => message.error("Failed to delete category"),
  });

  const showModal = (category = null) => {
    setEditingCategory(category);
    setFormData(
      category ? { name: category.name } : { name: { en: "", ar: "" } }
    );
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (!formData.name.en || !formData.name.ar) {
      message.error("Both English and Arabic names are required");
      return;
    }
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    setFormData({ name: { en: "", ar: "" } });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      onOk: () => deleteMutation.mutate(id),
    });
  };

  const columns = [
    {
      title: "#",
      dataIndex: "checkbox",
      key: "checkbox",
      width: 80,
      render: () => <Checkbox />,
      align: "centered",
    },
    {
      title: "S. No.",
      dataIndex: "sno",
      key: "sno",
      width: 150,
      align: "center",
      render: (_, __, index) => `${index + 1}.`,
    },
    {
      title: "Category (EN)",
      dataIndex: ["name", "en"],
      key: "category_en",
      width: 300,
      align: "center",
    },
    {
      title: "Category (AR)",
      dataIndex: ["name", "ar"],
      key: "category_ar",
      width: 300,
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-3">
          <EditOutlined
            className="text-base text-gray-600 cursor-pointer hover:text-blue-600"
            onClick={() => showModal(record)}
          />
          <DeleteOutlined
            className="text-base text-red-400 cursor-pointer hover:text-red-600"
            onClick={() => handleDelete(record._id)}
          />
        </div>
      ),
    },
  ];

  // Filter categories based on search text
  const filteredCategories = categories.filter(
    (category) =>
      category.name.en.toLowerCase().includes(searchText.toLowerCase()) ||
      category.name.ar.toLowerCase().includes(searchText.toLowerCase())
  );

  // Paginate filtered categories
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-4 my-4 bg-white rounded-lg shadow-sm">
        {/* Controls */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show</span>
                <Select
                  value={pageSize.toString()}
                  onChange={(value) => setPageSize(Number(value))}
                  size="small"
                  style={{ width: 60 }}
                  className="text-sm"
                >
                  <Option value="10">10</Option>
                  <Option value="25">25</Option>
                  <Option value="50">50</Option>
                  <Option value="100">100</Option>
                </Select>
              </div>
              <Input
                placeholder="Search in Table"
                size="middle"
                className="w-64"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e9ecef",
                }}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showModal()}
              className="h-auto px-4 py-2 bg-purple-400 border-purple-400 rounded-md hover:bg-purple-500 hover:border-purple-500"
            >
              Add New
            </Button>
          </div>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={paginatedCategories}
          loading={isLoading}
          pagination={false}
          className="category-table"
          rowClassName="hover:bg-gray-50"
          size="middle"
          bordered
        />

        {/* Footer Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-end gap-2">
            <LeftOutlined
              className={`text-gray-400 cursor-pointer hover:text-gray-600 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            />
            <span className="mx-3 text-sm text-gray-600">
              Page {currentPage} of{" "}
              {Math.ceil(filteredCategories.length / pageSize) || 1}
            </span>
            <RightOutlined
              className={`text-gray-400 cursor-pointer hover:text-gray-600 ${
                currentPage >= Math.ceil(filteredCategories.length / pageSize)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() =>
                currentPage < Math.ceil(filteredCategories.length / pageSize) &&
                setCurrentPage(currentPage + 1)
              }
            />
          </div>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      <Modal
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closeIcon={
          <CloseOutlined className="text-gray-400 hover:text-gray-600" />
        }
        className="add-category-modal"
        width={600}
        centered
      >
        <div className="p-6">
          <h2 className="mb-6 text-xl font-medium text-gray-700">
            {editingCategory ? "Edit Category" : "Add Category"}
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-gray-500">
                Category in English
              </label>
              <Input
                size="large"
                value={formData.name.en}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: { ...formData.name, en: e.target.value },
                  })
                }
                className="w-full"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-right text-gray-500">
                Category in Arabic
              </label>
              <Input
                size="large"
                value={formData.name.ar}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: { ...formData.name, ar: e.target.value },
                  })
                }
                className="w-full"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "4px",
                  direction: "rtl",
                  textAlign: "right",
                }}
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button
              type="primary"
              onClick={handleOk}
              loading={createMutation.isLoading || updateMutation.isLoading}
              className="h-auto px-6 py-2 bg-blue-400 border-blue-400 rounded-md hover:bg-blue-500 hover:border-blue-500"
            >
              {editingCategory ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </Modal>

      <style jsx>{`
        :global(.category-table .ant-table-thead > tr > th) {
          background-color: #f1f3f4 !important;
          color: #5f6368 !important;
          font-weight: 500 !important;
          border-bottom: 1px solid #e8eaed !important;
          padding: 16px 12px !important;
        }

        :global(.category-table .ant-table-tbody > tr > td) {
          padding: 16px 12px !important;
          border-bottom: 1px solid #f0f0f0 !important;
          color: #333 !important;
        }

        :global(.category-table .ant-table-tbody > tr:hover > td) {
          background-color: #fafafa !important;
        }

        :global(.category-table .ant-table) {
          border: none !important;
        }

        :global(.category-table .ant-table-container) {
          border: none !important;
        }

        :global(.add-category-modal .ant-modal-content) {
          padding: 0 !important;
          border-radius: 8px !important;
        }

        :global(.add-category-modal .ant-modal-header) {
          display: none !important;
        }

        :global(.add-category-modal .ant-modal-body) {
          padding: 0 !important;
        }

        :global(.add-category-modal .ant-modal-close) {
          top: 20px !important;
          right: 20px !important;
        }
      `}</style>
    </div>
  );
}
