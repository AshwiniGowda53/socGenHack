import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";

const PayeeModal = ({ isOpen, onClose, onSubmit, editingPayee }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingPayee) {
      form.setFieldsValue({
        name: editingPayee.name,
        account: editingPayee.account,
        bank: editingPayee.bank,
      });
    } else {
      form.resetFields();
    }
  }, [editingPayee, isOpen, form]);

  const handleSubmit = async (values) => {
    try {
      await onSubmit(values);
      form.resetFields();
      onClose();
      message.success(
        editingPayee ? "Payee updated successfully! ✅" : "Payee added successfully! ✅"
      );
    } catch (error) {
      message.error("Failed to save payee ❌");
    }
  };

  return (
    <Modal
      title={
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {editingPayee ? "📝 Edit Payee Details" : "➕ Add New Payee"}
        </div>
      }
      open={isOpen}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      width={500}
      bodyStyle={{ padding: "24px" }}
      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <Form.Item
          name="name"
          label={<span className="font-bold text-gray-800 text-base">👤 Payee Name</span>}
          rules={[
            { required: true, message: "Please enter payee name" },
            { min: 2, message: "Name must be at least 2 characters" },
          ]}
        >
          <Input 
            placeholder="Enter payee name" 
            className="h-10 rounded-lg border-2 border-blue-200 focus:border-blue-500"
            maxLength={100}
          />
        </Form.Item>

        <Form.Item
          name="account"
          label={<span className="font-bold text-gray-800 text-base">💳 Account Number</span>}
          rules={[
            { required: true, message: "Please enter account number" },
            { min: 10, message: "Account number must be valid" },
          ]}
        >
          <Input 
            placeholder="Enter account number" 
            className="h-10 rounded-lg border-2 border-blue-200 focus:border-blue-500 font-mono"
            maxLength={50}
          />
        </Form.Item>

        <Form.Item
          name="bank"
          label={<span className="font-bold text-gray-800 text-base">🏦 Bank Name</span>}
          rules={[{ required: true, message: "Please select a bank" }]}
        >
          <Select
            placeholder="Select a bank"
            options={[
              { label: "🏦 BBVA", value: "BBVA" },
              { label: "🏦 ING", value: "ING" },
              { label: "🏦 BNP", value: "BNP" },
              { label: "🏦 Santander", value: "Santander" },
              { label: "🏦 CaixaBank", value: "CaixaBank" },
              { label: "🏦 Sabadell", value: "Sabadell" },
            ]}
          />
        </Form.Item>

        <div className="flex gap-3 justify-end mt-8">
          <Button
            onClick={() => {
              form.resetFields();
              onClose();
            }}
            className="rounded-lg h-10 font-semibold text-gray-700 border-2 border-gray-300 hover:border-gray-400"
          >
            ✕ Cancel
          </Button>
          <Button 
            type="primary" 
            htmlType="submit"
            className="rounded-lg h-10 font-semibold bg-gradient-to-r from-green-500 to-emerald-600 border-0 text-white"
          >
            ✓ {editingPayee ? "Update" : "Add"} Payee
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default PayeeModal;
