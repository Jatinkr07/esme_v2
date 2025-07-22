import React, { useState } from "react";
import { Table, Select, Input, Checkbox, Button, Modal } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Option } = Select;

export default function CategoryManagement() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: "#",
      dataIndex: "checkbox",
      key: "checkbox",
      width: 80,
      render: () => <Checkbox />,
      align: "center",
    },
    {
      title: "S. No.",
      dataIndex: "sno",
      key: "sno",
      width: 150,
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 300,
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      align: "center",
      render: () => (
        <div className="flex items-center justify-center gap-3">
          <EditOutlined className="text-base text-gray-600 cursor-pointer hover:text-blue-600" />
          <DeleteOutlined className="text-base text-red-400 cursor-pointer hover:text-red-600" />
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      sno: "1.",
      category: "Skin Beauty",
    },
    {
      key: "2",
      sno: "2.",
      category: "Wellness",
    },
    {
      key: "3",
      sno: "3.",
      category: "Nutrition",
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
                  defaultValue="10"
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
              />
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showModal}
              className="h-auto px-4 py-2 bg-purple-400 border-purple-400 rounded-md hover:bg-purple-500 hover:border-purple-500"
            >
              Add New
            </Button>
          </div>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className="category-table"
          rowClassName="hover:bg-gray-50"
          size="middle"
          bordered
        />

        {/* Footer Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-end gap-2">
            <LeftOutlined className="text-gray-400 cursor-pointer hover:text-gray-600" />
            <span className="mx-3 text-sm text-gray-600">Page 1 of 1</span>
            <RightOutlined className="text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
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
            Add Category
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-gray-500">
                Category in english
              </label>
              <Input
                size="large"
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
                Category in arabic
              </label>
              <Input
                size="large"
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
              className="h-auto px-6 py-2 bg-blue-400 border-blue-400 rounded-md hover:bg-blue-500 hover:border-blue-500"
            >
              Save
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
