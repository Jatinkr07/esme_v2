import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
  Popconfirm,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Column } = Table;

const UserTable = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      sNo: 1,
      username: "Test",
      email: "text@gmail.com",
      phone: "123-456-7890",
      newsletter: true,
    },
  ]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleEdit = (record) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => item.key === editingKey);
      if (index > -1) {
        newData[index] = { ...newData[index], ...values };
        setDataSource(newData);
        setEditingKey(null);
        setIsModalVisible(false);
      }
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingKey(null);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filteredData = dataSource.filter(
      (item) =>
        item.username.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase())
    );
    setDataSource(filteredData);
  };

  const columns = [
    { title: "#", dataIndex: "sNo", key: "sNo", width: 100 },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      editable: true,
    },
    { title: "Email", dataIndex: "email", key: "email", editable: true },
    { title: "Phone Number", dataIndex: "phone", key: "phone", editable: true },
    {
      title: "Newsletter",
      dataIndex: "newsletter",
      key: "newsletter",
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="container p-4 mx-auto">
      <div className="flex justify-between mb-4">
        <Select
          defaultValue="10"
          className="border rounded "
          onChange={(value) => console.log(value)}
        >
          <Option value="10">Show 10</Option>
          <Option value="20">Show 20</Option>
          <Option value="50">Show 50</Option>
        </Select>
        <Input
          placeholder="Search in Table"
          allowClear
          onChange={(e) => handleSearch(e.target.value)}
          className="w-64"
          prefix={<SearchOutlined />}
        />
      </div>
      <Table
        rowSelection={rowSelection}
        dataSource={dataSource}
        pagination={{ pageSize: 10 }}
        className="shadow-md"
      >
        {columns.map((col) => (
          <Column {...col} />
        ))}
      </Table>
      <Modal
        title="Edit User"
        open={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserTable;
