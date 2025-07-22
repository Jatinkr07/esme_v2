import { Table, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const Inventory = () => {
  const columns = [
    { title: "S. No.", dataIndex: "sno", key: "sno" },
    { title: "SKU ID", dataIndex: "skuId", key: "skuId" },
    { title: "In Stock", dataIndex: "inStock", key: "inStock" },
  ];

  const data = [
    { key: "1", sno: "1.", skuId: "ESME-BTI-001", inStock: "879" },
    { key: "2", sno: "2.", skuId: "ESME-BTI-002", inStock: "439" },
    { key: "3", sno: "3.", skuId: "ESME-BTI-003", inStock: "295" },
  ];

  const handleSearch = (value) => {
    console.log("Search value:", value);
  };

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-semibold text-gray-600">Inventory</h2>
      <div className="flex flex-col justify-between gap-4 mb-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Show</span>
            <Select defaultValue="5" className="w-28" onChange={handleSearch}>
              <Option value="5">Show 5</Option>
              <Option value="10">Show 10</Option>
              <Option value="15">Show 15</Option>
            </Select>
          </div>
          <Input
            placeholder="Search in Table"
            allowClear
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-64"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="flex justify-end">
          <span className="text-gray-500">Page 1 of 1</span>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="overflow-hidden rounded-lg shadow-md"
        bordered
      />
    </div>
  );
};

export default Inventory;
