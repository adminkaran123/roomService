import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
];

const rows = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 25 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 30 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 28 },
];

function StepFormListing() {
  return (
    <div>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}

export default StepFormListing;
