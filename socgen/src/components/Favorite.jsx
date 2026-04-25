import React, { useState, useEffect, useCallback } from "react";
import { Button, Input, message, Empty, Spin } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import TableComponent from "./tableComponent";
import PayeeModal from "./PayeeModal";
import { Tooltip } from "antd";
import useDebounce from "../hooks/useDebounce";
const Favorite = () => {
  const [payees, setPayees] = useState([]);
  const [filteredPayees, setFilteredPayees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayee, setEditingPayee] = useState(null);
  const [loading, setLoading] = useState(false);
  const isLimitReached = payees.length >= 20;


  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchPayees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/payees");
      if (!response.ok) throw new Error("Failed to fetch payees");
      const data = await response.json();
      setPayees(data);
      setFilteredPayees(data);
    } catch (error) {
      message.error("Failed to load payees: " + error.message);
      setPayees([]);
      setFilteredPayees([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayees();
  }, [fetchPayees]);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredPayees(payees);
      return;
    }

    const searchLower = debouncedSearchTerm.toLowerCase();
    const filtered = payees.filter(
      (payee) =>
        payee.name.toLowerCase().includes(searchLower) ||
        payee.account.toLowerCase().includes(searchLower),
    );

    setFilteredPayees(filtered);
  }, [debouncedSearchTerm, payees]);

  const handleAddPayee = async (values) => {
    try {
      const newPayee = {
        ...values,
        id: Date.now(),
      };
      const response = await fetch("http://localhost:3000/payees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPayee),
      });

      if (!response.ok) throw new Error("Failed to add payee");
      await fetchPayees();
    } catch (error) {
      throw error;
    }
  };

  const handleEditPayee = (payee) => {
    setEditingPayee(payee);
    setIsModalOpen(true);
  };

  const handleUpdatePayee = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:3000/payees/${editingPayee.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, id: editingPayee.id }),
        },
      );

      if (!response.ok) throw new Error("Failed to update payee");
      await fetchPayees();
      setEditingPayee(null);
    } catch (error) {
      throw error;
    }
  };

  const handleDeletePayee = async (id) => {
    console.log("Deleting payee with ID:", id);
    try {
      if (req.url.origin === "http://localhost:3001") {
        const response = await fetch(`http://localhost:3001/payees/${id}`, {
          method: "DELETE",
        });
      }

      if (!response.ok) throw new Error("Failed to delete payee");
      await fetchPayees();
      message.success("Payee deleted successfully!");
    } catch (error) {
      message.error("Failed to delete payee: " + error.message);
    }
  };

  const handleModalSubmit = (values) => {
    if (editingPayee) {
      return handleUpdatePayee(values);
    } else {
      return handleAddPayee(values);
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="ml-4 text-3xl font-bold text-white mb-2">
        Favourite payees
      </div>
      <div className="ml-4 text-sm text-gray-500 mb-4">
        Manage your most frequently used payees for quick access during
        transfers.
      </div>
      <div className="px-4 md:px-10 py-6">
        <div className="w-full">
          <div className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center -mt-6 relative z-10">
            <Input
              placeholder="Search by payee name or account number..."
              prefix={<SearchOutlined className="text-blue-500" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 h-12 rounded-xl border border-gray-300 shadow-sm focus:shadow-md focus:border-blue-400 transition-all bg-white"
              allowClear
            />

            <Tooltip
              title={
                isLimitReached
                  ? "Maximum limit reached (20 payees allowed)"
                  : "Add a new payee"
              }
            >
              <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                disabled={isLimitReached}
                onClick={() => {
                  if (!isLimitReached) {
                    setEditingPayee(null);
                    setIsModalOpen(true);
                  }
                }}
                className={`sm:w-auto w-full h-12 font-semibold rounded-xl border-0 shadow-md transition-all text-white 
      ${
        isLimitReached
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
              >
                Add Payee
              </Button>
            </Tooltip>
          </div>

          {searchTerm && (
            <div className="mb-5 text-sm text-gray-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg inline-block shadow-sm">
              Found{" "}
              <span className="font-semibold text-blue-600">
                {filteredPayees.length}
              </span>{" "}
              result{filteredPayees.length !== 1 ? "s" : ""} for{" "}
              <span className="font-medium text-blue-700">"{searchTerm}"</span>
            </div>
          )}

          <Spin spinning={loading}>
            {filteredPayees.length > 0 ? (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-2">
                <TableComponent
                  payees={filteredPayees}
                  onEdit={handleEditPayee}
                  onDelete={handleDeletePayee}
                  loading={loading}
                />
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 flex justify-center items-center min-h-96 border border-gray-200">
                <Empty
                  description={
                    <span className="text-gray-600 text-lg font-medium">
                      {searchTerm
                        ? "No payees found matching your search"
                        : "No payees available"}
                    </span>
                  }
                >
                  <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 h-11 px-8 bg-blue-600 hover:bg-blue-700 border-0 font-semibold rounded-lg"
                  >
                    Add First Payee
                  </Button>
                </Empty>
              </div>
            )}
          </Spin>

          <PayeeModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingPayee(null);
            }}
            onSubmit={handleModalSubmit}
            editingPayee={editingPayee}
          />
        </div>
      </div>
    </div>
  );
};

export default Favorite;
