import { Table, Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const BlogsTable = ({ data, onDelete }) => {
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      render: () => <input type="checkbox" />,
    },
    { title: "S. No.", dataIndex: "sno", key: "sno" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: () => <div className="w-12 h-12 bg-gray-200" />,
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button icon={<EyeOutlined />} />
          <Button icon={<EditOutlined />} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col justify-between gap-4 mb-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <Select defaultValue="Show 10" className="w-32">
            <Option value="5">Show 5</Option>
            <Option value="10">Show 10</Option>
            <Option value="15">Show 15</Option>
          </Select>
          <Input
            placeholder="Search in Table"
            prefix={<SearchOutlined />}
            className="w-64"
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        className="rounded-lg shadow-md"
        bordered
      />
    </div>
  );
};

export default BlogsTable;
