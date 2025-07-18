import { useMemo, useState } from "react";
import { Table, Button, Modal, Input, message, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const initialCategories = [
  { id: 1, name: "Skin Beauty" },
  { id: 2, name: "Wellness" },
  { id: 3, name: "Nutrition" },
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [modal, setModal] = useState({ visible: false, category: null });
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // For dropdown options
  const categoryOptions = useMemo(
    () => categories.map((c) => ({ label: c.name, value: c.name })),
    [categories]
  );

  // Filtered & searched categories, recomputed only as needed
  const filteredCategories = useMemo(() => {
    let data = categories;
    if (filter) data = data.filter((c) => c.name === filter);
    if (search.trim())
      data = data.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    return data;
  }, [categories, filter, search]);

  const columns = [
    {
      title: (
        <input
          type="checkbox"
          checked={
            selectedRowKeys.length === filteredCategories.length &&
            filteredCategories.length
          }
          indeterminate={
            selectedRowKeys.length &&
            selectedRowKeys.length < filteredCategories.length
          }
          onChange={(e) => {
            if (e.target.checked)
              setSelectedRowKeys(filteredCategories.map((row) => row.id));
            else setSelectedRowKeys([]);
          }}
        />
      ),
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <input
          type="checkbox"
          checked={selectedRowKeys.includes(record.id)}
          onChange={(e) => {
            if (e.target.checked)
              setSelectedRowKeys((keys) => [...keys, record.id]);
            else
              setSelectedRowKeys((keys) =>
                keys.filter((id) => id !== record.id)
              );
          }}
        />
      ),
      width: 40,
      align: "center",
    },
    {
      title: "S. No.",
      dataIndex: "id",
      key: "sno",
      render: (_, __, idx) => idx + 1,
      width: 60,
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
      width: 180,
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      width: 90,
      align: "center",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => {
              setModal({ visible: true, category: record });
              setInput(record.name);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => handleDelete(record.id)}
          />
        </>
      ),
    },
  ];

  const handleDelete = (id) =>
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      onOk: () => {
        setCategories((cats) => cats.filter((cat) => cat.id !== id));
        setSelectedRowKeys((keys) => keys.filter((key) => key !== id));
        message.success("Category deleted successfully!");
      },
    });

  const handleModalOk = () => {
    const name = input.trim();
    if (!name) return message.error("Category name cannot be empty!");
    setCategories((cats) => {
      if (modal.category) {
        return cats.map((cat) =>
          cat.id === modal.category.id ? { ...cat, name } : cat
        );
      } else {
        const newId = cats.length ? Math.max(...cats.map((c) => c.id)) + 1 : 1;
        return [...cats, { id: newId, name }];
      }
    });
    message.success(
      modal.category
        ? "Category updated successfully!"
        : "Category added successfully!"
    );
    setModal({ visible: false, category: null });
    setInput("");
  };

  return (
    <div style={{ margin: "0 auto", padding: 16 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 16,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="space-x-6">
          <Select
            placeholder="Filter Category"
            allowClear
            style={{ width: 180 }}
            options={categoryOptions}
            value={filter}
            onChange={setFilter}
          />
          <Input.Search
            allowClear
            placeholder="Search category"
            style={{ width: 220 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          style={{ minWidth: 120 }}
          onClick={() => {
            setModal({ visible: true, category: null });
            setInput("");
          }}
        >
          Add Category
        </Button>
      </div>
      <Table
        dataSource={filteredCategories}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5, showSizeChanger: false }}
        scroll={{ x: true }}
        size="middle"
        bordered
        rowClassName="category-row"
      />
      <Modal
        open={modal.visible}
        onOk={handleModalOk}
        onCancel={() => {
          setModal({ visible: false, category: null });
          setInput("");
        }}
        title={modal.category ? "Edit Category" : "Add Category"}
        okText="Save"
        cancelText="Cancel"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Category name"
          maxLength={100}
          autoFocus
        />
      </Modal>
    </div>
  );
};

export default Categories;
