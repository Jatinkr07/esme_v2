// import { useState, useEffect } from "react";
// import {
//   Table,
//   Button,
//   Input,
//   Select,
//   Space,
//   Checkbox,
//   Modal,
//   message,
//   Popconfirm,
// } from "antd";
// import {
//   PlusOutlined,
//   EyeOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   SettingOutlined,
//   SearchOutlined,
// } from "@ant-design/icons";
// import ProductForm from "../../components/Product/Form/ProductForm";

// const { Option } = Select;
// const { Search } = Input;

// const ProductPage = ({ onNavigateToVariants }) => {
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       name: "Esmé Collagen Supplement BEAUTY THROUGH IMMUNITY, 14 vials x 15 ml",
//       category: "Skin Beauty",
//       variants: 3,
//       status: "active",
//     },
//   ]);

//   const [filteredProducts, setFilteredProducts] = useState(products);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [pageSize, setPageSize] = useState(10);
//   const [searchText, setSearchText] = useState("");

//   useEffect(() => {
//     setFilteredProducts(products);
//   }, [products]);

//   const handleSearch = (value) => {
//     setSearchText(value);
//     const filtered = products.filter(
//       (product) =>
//         product.name.toLowerCase().includes(value.toLowerCase()) ||
//         product.category.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   const handleAdd = () => {
//     setEditingProduct(null);
//     setIsModalVisible(true);
//   };

//   const handleEdit = (record) => {
//     setEditingProduct(record);
//     setIsModalVisible(true);
//   };

//   const handleDelete = (id) => {
//     setProducts(products.filter((product) => product.id !== id));
//     message.success("Product deleted successfully");
//   };

//   const handleSave = (productData) => {
//     if (editingProduct) {
//       setProducts(
//         products.map((product) =>
//           product.id === editingProduct.id
//             ? { ...product, ...productData }
//             : product
//         )
//       );
//       message.success("Product updated successfully");
//     } else {
//       const newProduct = {
//         id: Date.now(),
//         ...productData,
//         variants: 0,
//       };
//       setProducts([...products, newProduct]);
//       message.success("Product added successfully");
//     }
//     setIsModalVisible(false);
//   };

//   const columns = [
//     {
//       title: "#",
//       key: "checkbox",
//       width: 50,
//       render: () => <Checkbox />,
//     },
//     {
//       title: "S.No.",
//       key: "serialNumber",
//       width: 80,
//       render: (_, __, index) => index + 1,
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       ellipsis: true,
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//       key: "category",
//       width: 150,
//     },
//     {
//       title: "Variants",
//       key: "variants",
//       width: 100,
//       render: (_, record) => (
//         <Button
//           type="link"
//           icon={<SettingOutlined />}
//           onClick={() => onNavigateToVariants(record.id)}
//           className="p-0"
//         />
//       ),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       width: 150,
//       render: (_, record) => (
//         <Space>
//           <Button
//             type="link"
//             icon={<EyeOutlined />}
//             onClick={() => handleEdit(record)}
//             className="p-0"
//           />
//           <Button
//             type="link"
//             icon={<EditOutlined />}
//             onClick={() => handleEdit(record)}
//             className="p-0"
//           />
//           <Popconfirm
//             title="Are you sure you want to delete this product?"
//             onConfirm={() => handleDelete(record.id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button
//               type="link"
//               icon={<DeleteOutlined />}
//               danger
//               className="p-0"
//             />
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="p-6">
//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="p-6 border-b border-gray-200">
//           <h1 className="mb-6 text-2xl font-medium text-gray-600">Products</h1>

//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm text-gray-600">Show</span>
//                 <Select
//                   value={pageSize}
//                   onChange={setPageSize}
//                   className="w-20"
//                 >
//                   <Option value={10}>10</Option>
//                   <Option value={25}>25</Option>
//                   <Option value={50}>50</Option>
//                 </Select>
//               </div>

//               <Search
//                 placeholder="Search in Table"
//                 allowClear
//                 onSearch={handleSearch}
//                 onChange={(e) => handleSearch(e.target.value)}
//                 className="w-64"
//                 prefix={<SearchOutlined />}
//               />
//             </div>

//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={handleAdd}
//               className="px-6 bg-purple-500 border-purple-500 rounded-full hover:bg-purple-600"
//             >
//               Add New
//             </Button>
//           </div>
//         </div>

//         <Table
//           columns={columns}
//           dataSource={filteredProducts}
//           rowKey="id"
//           pagination={{
//             pageSize: pageSize,
//             showSizeChanger: false,
//             showQuickJumper: true,
//             showTotal: (total, range) =>
//               `Page ${Math.ceil(range[0] / pageSize)} of ${Math.ceil(
//                 total / pageSize
//               )}`,
//           }}
//           className="border-0"
//         />
//       </div>

//       <Modal
//         title={editingProduct ? "Edit Product" : "Add Product"}
//         open={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         destroyOnHidden={true} // Updated from destroyOnClose
//         footer={null}
//         width={800}
//       >
//         <ProductForm
//           initialData={editingProduct}
//           onSave={handleSave}
//           onCancel={() => setIsModalVisible(false)}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default ProductPage;

import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Checkbox,
  Modal,
  message,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ProductForm from "../../components/Product/Form/ProductForm";

const { Option } = Select;
const { Search } = Input;

const ProductPage = ({ onNavigateToVariants }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Esmé Collagen Supplement BEAUTY THROUGH IMMUNITY, 14 vials x 15 ml",
      category: "Skin Beauty",
      variants: 3,
      status: "active",
    },
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    message.success("Product deleted successfully");
  };

  const handleSave = (productData) => {
    if (editingProduct) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...productData }
            : product
        )
      );
      message.success("Product updated successfully");
    } else {
      const newProduct = {
        id: Date.now(),
        ...productData,
        variants: 0,
      };
      setProducts([...products, newProduct]);
      message.success("Product added successfully");
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "#",
      key: "checkbox",
      width: 50,
      render: () => <Checkbox />,
    },
    {
      title: "S.No.",
      key: "serialNumber",
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
    },
    {
      title: "Variants",
      key: "variants",
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          icon={<SettingOutlined />}
          onClick={() => onNavigateToVariants(record.id)}
          className="p-0"
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleEdit(record)}
            className="p-0"
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="p-0"
          />
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              danger
              className="p-0"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h1 className="mb-6 text-2xl font-medium text-gray-600">Products</h1>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show</span>
                <Select
                  value={pageSize}
                  onChange={setPageSize}
                  className="w-20"
                >
                  <Option value={10}>10</Option>
                  <Option value={25}>25</Option>
                  <Option value={50}>50</Option>
                </Select>
              </div>

              <Search
                placeholder="Search in Table"
                allowClear
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-64"
                prefix={<SearchOutlined />}
              />
            </div>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              className="px-6 bg-purple-500 border-purple-500 rounded-full hover:bg-purple-600"
            >
              Add New
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          pagination={{
            pageSize: pageSize,
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `Page ${Math.ceil(range[0] / pageSize)} of ${Math.ceil(
                total / pageSize
              )}`,
          }}
          className="border-0"
        />
      </div>

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose={true}
        footer={null}
        width={800}
      >
        <ProductForm
          initialData={editingProduct}
          onSave={handleSave}
          onCancel={() => setIsModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductPage;
