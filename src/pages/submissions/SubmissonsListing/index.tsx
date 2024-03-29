import React from "react";
import DataGrid from "../../../components/datagrid/DataGrid";
import ListLayout from "../../../components/listLayout/ListLayout";
import useStepFormListing from "./SubmissonsListing.hooks";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import HS_Logo from "../../../assets/hs_logo.png";
import Logo from "../../../assets/formmaker.png";
import { Stack, Typography, Button } from "@mui/material";
import useDashbaord from "../../Dashboard/Dashboard.hooks";
import EmbedBox from "../../../components/EmbedBox";
import { IntegrationWrapper } from "../../Dashboard/Dashboard.styles";

function StepFormListing() {
  const {
    handleOnSearch,
    moreOptions,
    handleMoreOptionsClick,
    columns,
    search,
    submissons,
    handleOnCloseConfirmationDialog,
    handleOnDeleteCourse,
    showDeleteConfirmationDialog,
    selectedFormId,
    setSelectedFormId,
  } = useStepFormListing();

  const { handleConnect, user } = useDashbaord();
  return (
    <div>
      <>
        <ListLayout
          title="Submissons"
          searchLabel="Search submissons witn form name id and contact id... "
          onSearchChange={handleOnSearch}
        >
          <DataGrid
            rows={
              submissons?.filter((item: any) => {
                if (search !== "") {
                  const searchLower = search.toLowerCase();

                  // Check if any of the relevant fields contains the search term
                  return (
                    item?.form?.name.toLowerCase().includes(searchLower) ||
                    item?.contact_id.toLowerCase().includes(searchLower) ||
                    item?.form?._id.toLowerCase().includes(searchLower)
                  );
                }
                return item;
              }) || []
            }
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
          title="You want to delete this submisson."
          handleClose={handleOnCloseConfirmationDialog}
        />
      </>

      <EmbedBox
        open={selectedFormId !== ""}
        handleClose={() => {
          setSelectedFormId("");
        }}
        formId={selectedFormId}
      />
    </div>
  );
}

export default StepFormListing;
