import React from "react";
import DataGrid from "../../../components/datagrid/DataGrid";
import ListLayout from "../../../components/listLayout/ListLayout";
import useStepFormListing from "./StepFormListing.hooks";
import DeleteModal from "../../../components/deleteModal/DeleteModal";

function StepFormListing() {
  const {
    handleOnSearch,
    handleOnAddNewElement,
    moreOptions,
    handleMoreOptionsClick,
    columns,
    search,
    stepForms,
    handleOnCloseConfirmationDialog,
    handleOnDeleteCourse,
    showDeleteConfirmationDialog,
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
          rows={stepForms.filter((item: any) => {
            if (search !== "") {
              return item.name.toLowerCase().includes(search?.toLowerCase());
            }
            return item;
          })}
          columns={columns}
          rowSelection={false}
          rowHeight={80}
          moreOptions={moreOptions}
          moreOptionsHandler={handleMoreOptionsClick}
          getRowId={(row) => row?._id}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </ListLayout>
      <DeleteModal
        open={showDeleteConfirmationDialog}
        confirmButtonText="Delete Instance"
        handleConfirm={handleOnDeleteCourse}
        title="You want to delete this form ."
        handleClose={handleOnCloseConfirmationDialog}
      />
    </div>
  );
}

export default StepFormListing;
