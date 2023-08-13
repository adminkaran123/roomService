import React from "react";
import DataGrid from "../../../components/datagrid/DataGrid";
import ListLayout from "../../../components/listLayout/ListLayout";
import useStepFormListing from "./StepFormListing.hooks";

function StepFormListing() {
  const {
    handleOnSearch,
    handleOnAddNewElement,
    moreOptions,
    handleMoreOptionsClick,
    columns,
    stepForms,
  } = useStepFormListing();
  return (
    <div>
      <ListLayout
        title="Step Forms"
        addButtonText="Create New Form"
        searchLabel="Search Forms..."
        onSearchChange={handleOnSearch}
        onAddNew={handleOnAddNewElement}
      >
        <DataGrid
          rows={stepForms}
          columns={columns}
          rowSelection={false}
          rowHeight={80}
          moreOptions={moreOptions}
          moreOptionsHandler={handleMoreOptionsClick}
          getRowId={(row) => row._id}
        />
      </ListLayout>
    </div>
  );
}

export default StepFormListing;
