import React, { useState } from "react";
import { Table, Select, Button, Modal, Input, Checkbox, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

export default function CouponManager() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  // Initial coupon data
  const [coupons, setCoupons] = useState([
    {
      key: "1",
      id: 1,
      user: "Mariia",
      code: "L-215827be-3168-4511-a2cd-feb34c036524",
      generatedAt: "29 May 2024",
      expiresAt: "28 Jun 2024",
      used: "No",
    },
    {
      key: "2",
      id: 2,
      user: "Mariia",
      code: "L-c19b1000-e0d0-487c-9463-c207df773f3c",
      generatedAt: "30 May 2024",
      expiresAt: "29 Jun 2024",
      used: "No",
    },
  ]);

  // Users for dropdown
  const users = [
    "Jaspreet Kaur",
    "Jurgita",
    "Chaymae Andalib",
    "Mariia",
    "Farzana",
    "Farzana Moesaheb",
    "Rose Uehara",
  ];

  // Generate random coupon code
  const generateCouponCode = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const segments = [];
    for (let i = 0; i < 5; i++) {
      let segment = "";
      const length = i === 0 ? 8 : 4;
      for (let j = 0; j < length; j++) {
        segment += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      segments.push(segment);
    }
    return `L-${segments.join("-")}`;
  };

  // Table columns
  const columns = [
    // {
    //   title: "#",
    //   dataIndex: "id",
    //   key: "id",
    //   width: 60,
    //   render: (text) => <span className="text-gray-600">{text}.</span>,
    // },
    {
      title: "S. No.",
      dataIndex: "id",
      key: "sno",
      width: 80,
      render: (text) => (
        <span className="font-medium text-blue-600">{text}.</span>
      ),
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      width: 150,
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 300,
      render: (text) => (
        <span className="font-mono text-sm text-gray-600">{text}</span>
      ),
    },
    {
      title: "Generated At",
      dataIndex: "generatedAt",
      key: "generatedAt",
      width: 120,
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Expires At",
      dataIndex: "expiresAt",
      key: "expiresAt",
      width: 120,
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Used",
      dataIndex: "used",
      key: "used",
      width: 80,
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteCoupon(record.key)}
          className="text-gray-400 hover:text-red-500"
        />
      ),
    },
  ];

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
    renderCell: (checked, record, index, originNode) => {
      return (
        <Checkbox
          checked={checked}
          onChange={(e) => {
            const newSelectedKeys = e.target.checked
              ? [...selectedRowKeys, record.key]
              : selectedRowKeys.filter((key) => key !== record.key);
            setSelectedRowKeys(newSelectedKeys);
          }}
        />
      );
    },
  };

  // Handle adding new coupon
  const handleAddCoupon = () => {
    if (!selectedUser) {
      message.error("Please select a user");
      return;
    }

    const newCoupon = {
      key: String(coupons.length + 1),
      id: coupons.length + 1,
      user: selectedUser,
      code: generateCouponCode(),
      generatedAt: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      expiresAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      used: "No",
    };

    setCoupons([...coupons, newCoupon]);
    setIsModalVisible(false);
    setSelectedUser("");
    message.success("Coupon added successfully!");
  };

  // Handle delete coupon
  const handleDeleteCoupon = (key) => {
    setCoupons(coupons.filter((coupon) => coupon.key !== key));
    setSelectedRowKeys(
      selectedRowKeys.filter((selectedKey) => selectedKey !== key)
    );
    message.success("Coupon deleted successfully!");
  };

  // Filter coupons based on search
  const filteredCoupons = coupons.filter((coupon) =>
    Object.values(coupon).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen p-6 bg-white">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Select
            value={pageSize}
            onChange={setPageSize}
            className="w-24"
            size="middle"
          >
            <Option value={5}>Show 5</Option>
            <Option value={10}>Show 10</Option>
            <Option value={20}>Show 20</Option>
            <Option value={50}>Show 50</Option>
          </Select>

          <Search
            placeholder="Search in Table"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-64"
            size="middle"
          />
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          className="h-10 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
          size="middle"
        >
          Add New
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <Table
          columns={columns}
          dataSource={filteredCoupons}
          rowSelection={rowSelection}
          bordered
          pagination={{
            pageSize: pageSize,
            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: (total, range) =>
              `Page ${Math.ceil(range[0] / pageSize)} of ${Math.ceil(
                total / pageSize
              )}`,
            className: "px-4 py-3",
          }}
          size="middle"
          className="coupon-table"
        />
      </div>

      {/* Add Coupon Modal */}
      <Modal
        title="Add Coupon"
        open={isModalVisible}
        onOk={handleAddCoupon}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedUser("");
        }}
        okText="Add Coupon"
        cancelText="Cancel"
        width={600}
        className="add-coupon-modal"
      >
        <div className="py-1">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              User
            </label>
            <Select
              placeholder="Select..."
              value={selectedUser}
              onChange={setSelectedUser}
              className="w-full"
              size="large"
              showSearch
              optionFilterProp="children"
            >
              {users.map((user, index) => (
                <Option key={index} value={user}>
                  <div className="px-1 py-2 hover:bg-blue-50">{user}</div>
                </Option>
              ))}
            </Select>
          </div>
          <p className="font-[300] tracking-wide font-narin">
            The Unique Loyalty Coupon Code will be sent to the user's registered
            email.
          </p>
        </div>
      </Modal>

      <style jsx global>{`
        .coupon-table .ant-table-thead > tr > th {
          background-color: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          font-weight: 600;
          color: #495057;
          padding: 12px 16px;
        }

        .coupon-table .ant-table-tbody > tr > td {
          padding: 12px 16px;
          border-bottom: 1px solid #e9ecef;
        }

        .coupon-table .ant-table-tbody > tr:hover > td {
          background-color: #f8f9fa;
        }

        .add-coupon-modal .ant-modal-header {
          border-bottom: 1px solid #e9ecef;
          padding: 16px 24px;
        }

        .add-coupon-modal .ant-modal-body {
          padding: 24px;
        }

        .user-select-dropdown .ant-select-item {
          padding: 0;
        }

        .user-select-dropdown .ant-select-item-option-content {
          padding: 8px 12px;
        }

        .ant-pagination {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
