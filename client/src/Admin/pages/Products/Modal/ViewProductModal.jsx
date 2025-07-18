import React from "react";
import { Modal, Descriptions, Tag, Divider } from "antd";

const ViewProductModal = ({ visible, onCancel, product }) => {
  if (!product) return null;

  return (
    <Modal
      title="Product Details"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Product Name">
          {product.name}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          <Tag color="blue">{product.category}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Number of Variants">
          <Tag color="green">{product.variants}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {product.description || "No description available"}
        </Descriptions.Item>
        <Descriptions.Item label="Benefits">
          {product.benefits || "No benefits information available"}
        </Descriptions.Item>
        <Descriptions.Item label="Methods of Use">
          {product.methods || "No methods information available"}
        </Descriptions.Item>
        <Descriptions.Item label="Composition">
          {product.composition || "No composition information available"}
        </Descriptions.Item>
      </Descriptions>

      {product.ingredients && product.ingredients.length > 0 && (
        <>
          <Divider>Ingredients</Divider>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {product.ingredients.map((ingredient, index) => (
              <Tag key={index} color="purple">
                {ingredient}
              </Tag>
            ))}
          </div>
        </>
      )}
    </Modal>
  );
};

export default ViewProductModal;
