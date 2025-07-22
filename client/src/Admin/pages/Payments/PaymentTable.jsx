import React from "react";
import { Table, Select, Input, Checkbox } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function PaymentsTable() {
  const columns = [
    {
      title: "#",
      dataIndex: "checkbox",
      key: "checkbox",
      width: 60,
      render: () => <Checkbox />,
    },
    {
      title: "S. No.",
      dataIndex: "sno",
      key: "sno",
      width: 100,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 400,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 150,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      align: "center",
    },
    {
      title: "Paid At",
      dataIndex: "paidAt",
      key: "paidAt",
      width: 150,
      align: "center",
    },
  ];

  const data = [
    {
      key: "1",
      sno: "1.",
      id: "pi_3PEBAEFHIXBhGdsIJDsZpDc",
      amount: "628.00",
      status: "succeeded",
      paidAt: "08 May 2024",
    },
    {
      key: "2",
      sno: "2.",
      id: "pi_3PM8TDEFHIXBhGds0rM3ZGNX",
      amount: "628.00",
      status: "succeeded",
      paidAt: "30 May 2024",
    },
    {
      key: "3",
      sno: "3.",
      id: "pi_3POCDzEFHIXBhGdsImphN6Jd",
      amount: "628.00",
      status: "succeeded",
      paidAt: "05 Jun 2024",
    },
  ];

  return (
    <div className=" bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Controls */}
        <div className="p-6 border-b border-gray-200">
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
            <div className="ml-auto">
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
          </div>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          className="payments-table"
          rowClassName="hover:bg-gray-50"
          size="middle"
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

      <style jsx>{`
        :global(.payments-table .ant-table-thead > tr > th) {
          background-color: #f1f3f4 !important;
          color: #5f6368 !important;
          font-weight: 500 !important;
          border-bottom: 1px solid #e8eaed !important;
          padding: 16px 12px !important;
        }

        :global(.payments-table .ant-table-tbody > tr > td) {
          padding: 16px 12px !important;
          border-bottom: 1px solid #f0f0f0 !important;
          color: #333 !important;
        }

        :global(.payments-table .ant-table-tbody > tr:hover > td) {
          background-color: #fafafa !important;
        }

        :global(.payments-table .ant-table) {
          border: none !important;
        }

        :global(.payments-table .ant-table-container) {
          border: none !important;
        }
      `}</style>
    </div>
  );
}
