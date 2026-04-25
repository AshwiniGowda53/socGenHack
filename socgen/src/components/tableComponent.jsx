import React, { useMemo } from "react";
import { Table, Button, Space, Tooltip, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const getBankColor = (bank) => {
  const colors = {
    BBVA: "bg-blue-500",
    ING: "bg-orange-500",
    BNP: "bg-green-500",
    Santander: "bg-red-500",
    CaixaBank: "bg-purple-500",
    Sabadell: "bg-indigo-500",
  };
  return colors[bank] || "bg-gray-500";
};

const TableComponent = ({ payees, onEdit, onDelete, loading }) => {

  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Delete Payee?",
      content: "Are you sure you want to delete this payee?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        onDelete(id);
      },
    });
  };

  const columns = useMemo(
    () => [
      {
        title: "Payee Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text) => (
          <Tooltip title={text}>
            <span className="font-semibold text-gray-800 truncate block">
              {text}
            </span>
          </Tooltip>
        ),
      },
      {
        title: "Account Number",
        dataIndex: "account",
        sorter: (a, b) => a.account.localeCompare(b.account),
        render: (text) => (
          <Tooltip title={text}>
            <span className="font-mono text-gray-600">{text}</span>
          </Tooltip>
        ),
      },
      {
        title: "Bank",
        dataIndex: "bank",
        sorter: (a, b) => a.bank.localeCompare(b.bank),
        render: (text) => (
          <span
            className={`px-3 py-1 text-white text-xs rounded-full ${getBankColor(
              text
            )}`}
          >
            {text}
          </span>
        ),
      },
      {
        title: "Actions",
        render: (_, record) => (
          <Space>
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => onEdit(record)}
            />

            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              type="primary"
              onClick={() => confirmDelete(record.id)}
            />
          </Space>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200">
      <Table
        columns={columns}
        dataSource={payees}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} records`,
        }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default TableComponent;