import { Link, Stack, Tooltip, Typography, Box } from "@mui/material";
import {
  DataGridProps,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { memo, useMemo } from "react";

import {
  ACTION_PARAM_NAME,
  STATUS_TEXT_PARAM_NAME,
} from "../../utils/constants/constants";

import ArrowPopover from "../arrowPopover/ArrowPopover";
import MoreOptionsButton from "../buttons/moreOptionsButton/MoreOptionsButton";
import ListItem from "../listItems/listItem/ListItem";
import useDataGrid from "./DataGrid.hooks";
import NoData from "../../assets/icons/no-data.svg";
import { styled } from "@mui/material/styles";

import {
  CustomTextField,
  CustomTypography,
  OptionsBox,
  StyledDataGrid,
} from "./DataGrid.styles";

interface Props extends Omit<DataGridProps, "rows,columns"> {
  rows: any[];
  columns: GridColDef[];
  moreOptions?: any[];
  moreOptionsHandler?: Function;
  onLinkClick?: Function;
  onSort?: Function;
  selectedId?: string;
  customSpacing?: number;
  noMaxWidth?: boolean;
}

function DataGrid(props: Props) {
  const {
    rows,
    columns,
    onLinkClick,
    moreOptions,
    moreOptionsHandler,
    onSort,
    customSpacing = 0,
    noMaxWidth = false,

    ...other
  } = props;

  const {
    anchorEl,
    onMoreOptionsClick,
    showArrowPopover,
    onArrowPopoverClose,
  } = useDataGrid(moreOptionsHandler);
  interface GridCol extends Omit<GridColDef, ""> {
    selectedId?: string;
    editMode?: boolean;
    editData?: object;
    handleEditValue?: Function;
    handleSubmit?: Function;
    handleClick?: Function;
  }
  const formattedColumns: GridCol[] = useMemo(() => {
    return (
      columns?.map((item: GridCol) => {
        return {
          flex: item.type !== "action" ? 1 : 0,
          width: item?.width ?? 0,
          name: item.headerName,
          sortable: item.type !== "action",
          autoHeight: true,
          renderCell: (params: GridRenderCellParams) => {
            const selectedId = params.row.id;
            const LinkText =
              params.row.name ||
              params.row.nickName ||
              params.row.shortName ||
              params.row.firstName + " " + (params.row.lastName || "");
            switch (item.type) {
              case ACTION_PARAM_NAME:
                return (
                  <>
                    <MoreOptionsButton
                      disabled={moreOptions?.length === 0}
                      id={`btn_more_option_${selectedId}`}
                      name="More options"
                      data-id="more-options"
                      style={{ color: "#000" }}
                      onClick={(event) =>
                        onMoreOptionsClick(event, params?.row?._id)
                      }
                    />
                  </>
                );

              case STATUS_TEXT_PARAM_NAME:
                return (
                  <Typography color={params.row.active ? "success" : "divider"}>
                    {params.row.active ? "Active" : "Inactive"}
                  </Typography>
                );

              case "feeStatus":
                return (
                  <Typography
                    color={params?.formattedValue ? "#FFFFFF" : "#FF3061"}
                  >
                    {params?.formattedValue
                      ? "Paid"
                      : !params?.row?.hasLab && params.field === "isLabFeePaid"
                      ? "N/A"
                      : "Not Paid"}{" "}
                    {params?.formattedValue}
                  </Typography>
                );

              case "module":
                return (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <Link
                    component="button"
                    onClick={
                      onLinkClick
                        ? () => {
                            onLinkClick(selectedId + "/modules");
                          }
                        : () => {}
                    }
                  >
                    <Typography variant="h6">Linked Modules</Typography>
                  </Link>
                );

              case "editable":
                return (
                  <>
                    {(item?.editMode && selectedId === item?.selectedId) ||
                    params.row.id.includes("adding") ? (
                      <CustomTextField
                        value={
                          !params.row.id.includes("adding")
                            ? // @ts-ignore
                              item?.editData[item?.field]
                            : params.row[item?.field]
                        }
                        placeholder={item.headerName}
                        error={
                          params.row?.error && params.row[item?.field] == ""
                        }
                        onChange={(e) => {
                          if (item?.handleEditValue) {
                            item?.handleEditValue(
                              e.target.value,
                              item?.field,
                              params.row.id
                            );
                          }
                        }}
                      />
                    ) : (
                      <Tooltip
                        title={params?.formattedValue}
                        placement="top-start"
                      >
                        <CustomTypography>
                          {params?.formattedValue}
                        </CustomTypography>
                      </Tooltip>
                    )}
                  </>
                );

              case "Ellipsis":
                return (
                  <Tooltip title={params?.formattedValue} placement="top-start">
                    <div className="MuiDataGrid-cellContent">
                      {params?.formattedValue}
                    </div>
                  </Tooltip>
                );
            }
          },

          ...item,
        };
      }) || []
    );
  }, [columns]);

  const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    paddingTop: "20px",
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <img src={NoData} alt="No data" height="300px" />
        <Typography textAlign="center">No Result Found</Typography>
      </StyledGridOverlay>
    );
  }

  return (
    <>
      <StyledDataGrid
        autoHeight
        rows={rows}
        // @ts-ignore
        customSpacing={customSpacing}
        columns={formattedColumns}
        disableSelectionOnClick
        disableColumnMenu
        onSortModelChange={(item: any[]) => {
          if (onSort) {
            let updatedValue =
              item.length > 0 ? item[0]?.field + "_" + item[0]?.sort : "";

            onSort(updatedValue);
          }
        }}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        {...other}
      />

      {moreOptions && (
        <ArrowPopover
          id={"more_options"}
          anchorEl={anchorEl}
          open={showArrowPopover}
          handleOnPopoverClose={onArrowPopoverClose}
          content={
            <OptionsBox>
              {moreOptions
                .filter((item) => !item.hide)
                .map((item, index) => (
                  <ListItem
                    key={index}
                    item={item}
                    onClickAction={onArrowPopoverClose}
                  />
                ))}
            </OptionsBox>
          }
        />
      )}
    </>
  );
}

export default memo(DataGrid);
