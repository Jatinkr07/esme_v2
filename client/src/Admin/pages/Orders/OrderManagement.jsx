import React, { useState } from "react";
import { Table, Select, Button, Modal, Input, Checkbox, message } from "antd";
import { EyeOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

export default function OrderManagement() {
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewingOrder, setViewingOrder] = useState(null);

  // Initial order data
  const [orders, setOrders] = useState([
    {
      key: "1",
      id: 1,
      orderId: "OD-38762614090",
      deliveryDate: "-",
      status: "delivered",
      user: "Mariia",
      paymentId: "pi_3PM8TbEfFHIXBhGds0rM3ZGNX",
      orderItems: [{ skuId: "ESME-BTI-001", price: 628, quantity: 1 }],
      paymentMode: "online",
      currencyCode: "AED",
      deliveryType: "International",
      totalMRP: 628,
      discount: "N/A",
      shippingCharges: "N/A",
      grandTotal: 628,
      orderSystemId: 196666,
      depoterOrderId: "O-85DE196666",
      shipperName: "FirstFlight",
      airwayBillNumber: "105252155",
      trackingURL:
        "https://fms.depoter.com/WMS/Tracking?shipper=firstflight&awb=105252155",
      billingAddress: {
        name: "Mariia Krisko",
        email: "krisko_3113@mail.ru",
        phone: "+971568152784",
        address:
          "Dubai Hills,Acacia C,apartment 317,\nDubai , Dubai , United Arab Emirates 00000",
      },
      shippingAddress: {
        name: "Mariia Krisko",
        email: "krisko_3113@mail.ru",
        phone: "+971568152784",
        address:
          "Dubai Hills,Acacia C,apartment 317,\nDubai , Dubai , United Arab Emirates 00000",
      },
    },
    {
      key: "2",
      id: 2,
      orderId: "OD-550049232694",
      deliveryDate: "-",
      status: "delivered",
      user: "John Doe",
      paymentId: "pi_3PM8TbEfFHIXBhGds0rM3ZGNX",
      orderItems: [{ skuId: "ESME-BTI-002", price: 450, quantity: 2 }],
      paymentMode: "online",
      currencyCode: "AED",
      deliveryType: "Domestic",
      totalMRP: 900,
      discount: 50,
      shippingCharges: 25,
      grandTotal: 875,
      orderSystemId: 196667,
      depoterOrderId: "O-85DE196667",
      shipperName: "DHL",
      airwayBillNumber: "105252156",
      trackingURL:
        "https://fms.depoter.com/WMS/Tracking?shipper=dhl&awb=105252156",
      billingAddress: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+971501234567",
        address:
          "Marina Walk, Building 5, Apartment 203,\nDubai Marina, Dubai, UAE 00000",
      },
      shippingAddress: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+971501234567",
        address:
          "Marina Walk, Building 5, Apartment 203,\nDubai Marina, Dubai, UAE 00000",
      },
    },
  ]);

  // Table columns
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (text) => <span className="text-gray-600">{text}.</span>,
    },
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
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      width: 200,
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      width: 150,
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (text) => (
        <span
          className={`${
            text === "delivered" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          {text}
        </span>
      ),
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
            onClick={() => handleViewOrder(record)}
            className="text-gray-400 hover:text-blue-500"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteOrder(record.key)}
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

  // Handle view order
  const handleViewOrder = (order) => {
    setViewingOrder(order);
    setIsViewModalVisible(true);
  };

  // Handle delete order
  const handleDeleteOrder = (key) => {
    setOrders(orders.filter((order) => order.key !== key));
    setSelectedRowKeys(
      selectedRowKeys.filter((selectedKey) => selectedKey !== key)
    );
    message.success("Order deleted successfully!");
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = Object.values(order).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-24"
            size="middle"
          >
            <Option value="All">All</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="pending">Pending</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <Table
          columns={columns}
          dataSource={filteredOrders}
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
          className="order-table"
        />
      </div>

      {/* View Order Modal */}
      <Modal
        title={
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-medium text-gray-800">
              Order - {viewingOrder?.orderId}
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
        width={700}
        closable={false}
        className="view-order-modal"
      >
        {viewingOrder && (
          <div className="py-4 overflow-y-auto max-h-96">
            <div className="space-y-4">
              {/* User */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  User
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.user}
                </div>
              </div>

              {/* Order Id */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Order Id
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.orderId}
                </div>
              </div>

              {/* Payment Id */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Payment Id
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.paymentId}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Order Items
                </label>
                <div className="border border-gray-200 rounded">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border-r">
                          SKU Id
                        </th>
                        <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 border-r">
                          Price
                        </th>
                        <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewingOrder.orderItems.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2 text-sm text-gray-800 border-r">
                            {item.skuId}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800 border-r">
                            {item.price}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800">
                            {item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Payment Mode
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.paymentMode}
                </div>
              </div>

              {/* Currency Code */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Currency Code
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.currencyCode}
                </div>
              </div>

              {/* Delivery Type */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Delivery Type
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.deliveryType}
                </div>
              </div>

              {/* Total MRP */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Total MRP
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.totalMRP}
                </div>
              </div>

              {/* Discount */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Discount
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.discount}
                </div>
              </div>

              {/* Shipping Charges */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Shipping Charges
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.shippingCharges}
                </div>
              </div>

              {/* Grand Total */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Grand Total
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.grandTotal}
                </div>
              </div>

              {/* Id */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Id
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.orderSystemId}
                </div>
              </div>

              {/* Depoter Order Id */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Depoter Order Id
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.depoterOrderId}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Status
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.status}
                </div>
              </div>

              {/* Shipper Name */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Shipper Name
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.shipperName}
                </div>
              </div>

              {/* Airway Bill Number */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Airway Bill Number
                </label>
                <div className="font-medium text-gray-800">
                  {viewingOrder.airwayBillNumber}
                </div>
              </div>

              {/* Tracking URL */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  tracking URL
                </label>
                <div className="font-medium text-blue-600 break-all">
                  {viewingOrder.trackingURL}
                </div>
              </div>

              {/* Delivery Date */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Delivery Date
                </label>
                <div className="font-medium text-gray-800">N/A</div>
              </div>

              {/* Billing Address */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Billing Address
                </label>
                <div className="p-3 text-sm text-gray-800 border rounded bg-gray-50">
                  <div className="font-medium">
                    {viewingOrder.billingAddress.name}
                  </div>
                  <div>
                    {viewingOrder.billingAddress.email},{" "}
                    {viewingOrder.billingAddress.phone}
                  </div>
                  <div className="mt-1 whitespace-pre-line">
                    {viewingOrder.billingAddress.address}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Shipping Address
                </label>
                <div className="p-3 text-sm text-gray-800 border rounded bg-gray-50">
                  <div className="font-medium">
                    {viewingOrder.shippingAddress.name}
                  </div>
                  <div>
                    {viewingOrder.shippingAddress.email},{" "}
                    {viewingOrder.shippingAddress.phone}
                  </div>
                  <div className="mt-1 whitespace-pre-line">
                    {viewingOrder.shippingAddress.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <style jsx global>{`
        .order-table .ant-table-thead > tr > th {
          background-color: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          font-weight: 600;
          color: #495057;
          padding: 12px 16px;
        }

        .order-table .ant-table-tbody > tr > td {
          padding: 12px 16px;
          border-bottom: 1px solid #e9ecef;
        }

        .order-table .ant-table-tbody > tr:hover > td {
          background-color: #f8f9fa;
        }

        .view-order-modal .ant-modal-header {
          border-bottom: 1px solid #e9ecef;
          padding: 16px 24px;
        }

        .view-order-modal .ant-modal-body {
          padding: 24px;
        }

        .ant-pagination {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        /* Custom scrollbar for modal content */
        .view-order-modal .ant-modal-body > div > div:first-child {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f7fafc;
        }

        .view-order-modal
          .ant-modal-body
          > div
          > div:first-child::-webkit-scrollbar {
          width: 6px;
        }

        .view-order-modal
          .ant-modal-body
          > div
          > div:first-child::-webkit-scrollbar-track {
          background: #f7fafc;
          border-radius: 3px;
        }

        .view-order-modal
          .ant-modal-body
          > div
          > div:first-child::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }

        .view-order-modal
          .ant-modal-body
          > div
          > div:first-child::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
    </div>
  );
}
