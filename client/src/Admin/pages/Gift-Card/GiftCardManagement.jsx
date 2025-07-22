import React, { useState } from "react";
import { Table, Select, Button, Modal, Input, Checkbox, message } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Search, TextArea } = Input;

export default function GiftCardManagement() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [giftCardAmount, setGiftCardAmount] = useState("628");
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [viewingGiftCard, setViewingGiftCard] = useState(null);

  // Initial gift card data
  const [giftCards, setGiftCards] = useState([
    {
      key: "1",
      id: 1,
      code: "G-67480722-683b-4a5c-aff2-91e6651ac002",
      recipient: "mkmkmk",
      amount: "628",
      used: "No",
      paymentId: "N/A",
      user: "Jurgita",
      email: "test@gmail.com",
      message: "test",
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

  // Generate random gift card code
  const generateGiftCardCode = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const segments = [];

    // Generate first segment (8 chars)
    let segment1 = "";
    for (let i = 0; i < 8; i++) {
      segment1 += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Generate remaining segments (4 chars each)
    for (let i = 0; i < 4; i++) {
      let segment = "";
      for (let j = 0; j < 4; j++) {
        segment += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      segments.push(segment);
    }

    return `G-${segment1}-${segments.join("-")}`;
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
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 300,
      render: (text) => (
        <span className="font-mono text-sm text-gray-600">{text}</span>
      ),
    },
    {
      title: "Recipient",
      dataIndex: "recipient",
      key: "recipient",
      width: 150,
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: "Amount (AED)",
      dataIndex: "amount",
      key: "amount",
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
        <div className="flex gap-2">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewGiftCard(record)}
            className="text-gray-400 hover:text-blue-500"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteGiftCard(record.key)}
            className="text-gray-400 hover:text-red-500"
          />
        </div>
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

  // Handle adding new gift card
  const handleAddGiftCard = () => {
    if (!selectedUser || !recipientName || !email) {
      message.error("Please fill in all required fields");
      return;
    }

    const newGiftCard = {
      key: String(giftCards.length + 1),
      id: giftCards.length + 1,
      code: generateGiftCardCode(),
      recipient: recipientName,
      amount: giftCardAmount,
      used: "No",
      paymentId: "N/A",
      user: selectedUser,
      email: email,
      message: message,
    };

    setGiftCards([...giftCards, newGiftCard]);
    setIsAddModalVisible(false);
    resetForm();
    message.success("Gift card added successfully!");
  };

  // Handle view gift card
  const handleViewGiftCard = (giftCard) => {
    setViewingGiftCard(giftCard);
    setIsViewModalVisible(true);
  };

  // Handle delete gift card
  const handleDeleteGiftCard = (key) => {
    setGiftCards(giftCards.filter((giftCard) => giftCard.key !== key));
    setSelectedRowKeys(
      selectedRowKeys.filter((selectedKey) => selectedKey !== key)
    );
    message.success("Gift card deleted successfully!");
  };

  // Reset form
  const resetForm = () => {
    setSelectedUser("");
    setRecipientName("");
    setEmail("");
    setMessage("");
    setGiftCardAmount("628");
  };

  // Filter gift cards based on search
  const filteredGiftCards = giftCards.filter((giftCard) =>
    Object.values(giftCard).some((value) =>
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
          onClick={() => setIsAddModalVisible(true)}
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
          dataSource={filteredGiftCards}
          rowSelection={rowSelection}
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
          className="gift-card-table"
        />
      </div>

      {/* Add Gift Card Modal */}
      <Modal
        title={
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-medium text-gray-800">
              Add Gift Card
            </span>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => {
                setIsAddModalVisible(false);
                resetForm();
              }}
              className="text-gray-400 hover:text-gray-600"
            />
          </div>
        }
        open={isAddModalVisible}
        onOk={handleAddGiftCard}
        onCancel={() => {
          setIsAddModalVisible(false);
          resetForm();
        }}
        okText="Save"
        cancelText="Cancel"
        width={600}
        closable={false}
        className="add-gift-card-modal"
        okButtonProps={{
          className:
            "bg-purple-400 hover:bg-purple-500 border-purple-400 hover:border-purple-500 rounded-md h-10 px-8",
        }}
      >
        <div className="py-4 space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Gift Card Amount (in AED)
            </label>
            <Select
              value={giftCardAmount}
              onChange={setGiftCardAmount}
              className="w-full"
              size="large"
            >
              <Option value="100">100</Option>
              <Option value="200">200</Option>
              <Option value="300">300</Option>
              <Option value="500">500</Option>
              <Option value="628">628</Option>
              <Option value="1000">1000</Option>
            </Select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
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
                  {user}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Recipient Name
            </label>
            <Input
              placeholder=""
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              size="large"
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <Input
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="large"
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Message
            </label>
            <TextArea
              placeholder=""
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>
        </div>
      </Modal>

      {/* View Gift Card Modal */}
      <Modal
        title={
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-medium text-gray-800">
              View Gift Card
            </span>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setIsViewModalVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            />
          </div>
        }
        open={isViewModalVisible}
        footer={null}
        onCancel={() => setIsViewModalVisible(false)}
        width={600}
        closable={false}
        className="view-gift-card-modal"
      >
        {viewingGiftCard && (
          <div className="py-4 space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Gift Card Amount (in AED)
              </label>
              <Select
                value={viewingGiftCard.amount}
                disabled
                className="w-full"
                size="large"
              >
                <Option value={viewingGiftCard.amount}>
                  {viewingGiftCard.amount}
                </Option>
              </Select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Code
              </label>
              <Input
                value={viewingGiftCard.code}
                disabled
                size="large"
                className="w-full font-mono text-sm"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Payment Id
              </label>
              <Input
                value={viewingGiftCard.paymentId}
                disabled
                size="large"
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                User
              </label>
              <Select
                value={viewingGiftCard.user}
                disabled
                className="w-full"
                size="large"
              >
                <Option value={viewingGiftCard.user}>
                  {viewingGiftCard.user}
                </Option>
              </Select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Recipient Name
              </label>
              <Input
                value={viewingGiftCard.recipient}
                disabled
                size="large"
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Email
              </label>
              <Input
                value={viewingGiftCard.email}
                disabled
                size="large"
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Message
              </label>
              <TextArea
                value={viewingGiftCard.message}
                disabled
                rows={4}
                className="w-full"
              />
            </div>
          </div>
        )}
      </Modal>

      <style jsx global>{`
        .gift-card-table .ant-table-thead > tr > th {
          background-color: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          font-weight: 600;
          color: #495057;
          padding: 12px 16px;
        }

        .gift-card-table .ant-table-tbody > tr > td {
          padding: 12px 16px;
          border-bottom: 1px solid #e9ecef;
        }

        .gift-card-table .ant-table-tbody > tr:hover > td {
          background-color: #f8f9fa;
        }

        .add-gift-card-modal .ant-modal-header,
        .view-gift-card-modal .ant-modal-header {
          border-bottom: 1px solid #e9ecef;
          padding: 16px 24px;
        }

        .add-gift-card-modal .ant-modal-body,
        .view-gift-card-modal .ant-modal-body {
          padding: 24px;
        }

        .ant-pagination {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .ant-select-disabled .ant-select-selector {
          background-color: #f5f5f5 !important;
          color: #666 !important;
        }

        .ant-input:disabled,
        .ant-input[disabled] {
          background-color: #f5f5f5 !important;
          color: #666 !important;
        }
      `}</style>
    </div>
  );
}
