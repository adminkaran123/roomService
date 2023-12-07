import React from "react";
import DataGrid from "../../../components/datagrid/DataGrid";
import ListLayout from "../../../components/listLayout/ListLayout";
import useStepFormListing from "./StepFormListing.hooks";
import DeleteModal from "../../../components/deleteModal/DeleteModal";
import HS_Logo from "../../../assets/hs_logo.png";
import Logo from "../../../assets/formmaker.png";
import { Stack, Typography, Button } from "@mui/material";
import useDashbaord from "../../Dashboard/Dashboard.hooks";
import EmbedBox from "../../../components/EmbedBox";
import {
  IntegrationWrapper,
  ConnectedBox,
  Wrapper,
} from "../../Dashboard/Dashboard.styles";

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
    selectedFormId,
    setSelectedFormId,
  } = useStepFormListing();

  const { handleConnect, user } = useDashbaord();
  return (
    <div>
      {user.refreshToken ? (
        <>
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
                  return item.name
                    .toLowerCase()
                    .includes(search?.toLowerCase());
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
        </>
      ) : (
        <IntegrationWrapper>
          <Typography variant="h3" marginBottom="20px">
            Connect your Hubspot Account to Start Creating Forms
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="400px"
            marginBottom="20px"
          >
            <img src={HS_Logo} width={120} />

            <span className="relation_line"></span>
            <img src={Logo} width={150} height="auto" />
          </Stack>
          <Button variant="contained" size="large" onClick={handleConnect}>
            <Typography color="#fff">Connect your HS Account</Typography>
          </Button>
        </IntegrationWrapper>
      )}
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
