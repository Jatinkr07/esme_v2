import React from "react";
import { Modal, Button } from "antd";
import { FiAlertTriangle } from "react-icons/fi";

const DeleteConfirmModal = ({
  visible,
  onCancel,
  onConfirm,
  title,
  content,
}) => {
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FiAlertTriangle style={{ color: "#f59e0b" }} />
          {title}
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel} className="btn-cancel">
          Cancel
        </Button>,
        <Button key="confirm" type="primary" danger onClick={onConfirm}>
          Delete
        </Button>,
      ]}
    >
      <p>{content}</p>
      <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "12px" }}>
        This action cannot be undone.
      </p>
    </Modal>
  );
};

export default DeleteConfirmModal;
