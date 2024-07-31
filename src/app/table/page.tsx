import React from "react";
import Table from "../components/Table/Table";
import { TableColumn } from "../components/Table/types";

const Page: React.FC = () => {
  const columns: TableColumn[] = [
    { key: "lotNumber", label: "Lot Number" },
    { key: "materialName", label: "Material Name" },
    { key: "customer", label: "Customer" },
    { key: "weight", label: "Weight" },
    { key: "price", label: "Price" },
    { key: "margin", label: "Margin" },
    { key: "elapsedTime", label: "Elapsed Time" },
  ];

  const data = [
    {
      lotNumber: "12345",
      materialName: "Steel",
      customer: "ABC Corp",
      weight: "1000kg",
      price: "$5000",
      margin: "20%",
      elapsedTime: "10:00",
    },
    {
      lotNumber: "12346",
      materialName: "Aluminum",
      customer: "XYZ Inc",
      weight: "500kg",
      price: "$2500",
      margin: "25%",
      elapsedTime: "15:30",
    },
    // Add more rows as needed
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">My Table</h1>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Page;
