import React, { useState } from "react";
import DataGrid from "../../../components/datagrid/DataGrid";
import ListLayout from "../../../components/listLayout/ListLayout";
import useStepFormListing from "./StepFormListing.hooks";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import UpgradeModal from "../../../components/upgradeModal/UpgradeModal";
import HS_Logo from "../../../assets/hs_logo.png";
import Logo from "../../../assets/formmaker.png";
import { Stack, Typography, Button } from "@mui/material";
import useDashbaord from "../../Dashboard/Dashboard.hooks";
import EmbedBox from "../../../components/EmbedBox";
import CustomTour from "../../../components/CustomTour";
import { IntegrationWrapper } from "../../Dashboard/Dashboard.styles";

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
    setShowUpgradeDialog,
    selectedFormId,
    showUpgradeDialog,
    setSelectedFormId,

    steps,
    tourOpen,
    closeTour,
  } = useStepFormListing();

  const { handleConnect, user } = useDashbaord();

  return (
    <div>
      <>
        <ListLayout
          title="Step Forms"
          addButtonText="Create New Form"
          searchLabel="Search Forms..."
          onSearchChange={handleOnSearch}
          onAddNew={() => handleOnAddNewElement(user)}
        >
          <DataGrid
            rows={stepForms.filter((item: any) => {
              if (search !== "") {
                return item.name.toLowerCase().includes(search?.toLowerCase());
              }
              return item;
            })}
            //rows={[]}
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
        <UpgradeModal
          open={showUpgradeDialog}
          confirmButtonText="Upgrade Now"
          title="You can create only 2 forms in the Free plan. Upgrade to create more."
          handleClose={() => {
            setShowUpgradeDialog(false);
          }}
        />
      </>

      <EmbedBox
        open={selectedFormId !== ""}
        handleClose={() => {
          setSelectedFormId("");
        }}
        formId={selectedFormId}
      />
      <CustomTour steps={steps} isOpen={tourOpen} onRequestClose={closeTour} />
    </div>
  );
}

export default StepFormListing;
