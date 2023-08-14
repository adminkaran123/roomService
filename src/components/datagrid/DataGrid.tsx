import {
  Badge,
  Button,
  Icon,
  Link,
  Stack,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {
  DataGridProps,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { memo, useMemo } from "react";

import IconFileDownload from "../../assets/icons/icon_file_download_small.svg";
import IconGreen from "../../assets/icons/icon_green_circle.svg";
import IconLink from "../../assets/icons/icon_link_small.svg";
import IconRed from "../../assets/icons/icon_red_circle.svg";
import RemoveIcon from "../../assets/icons/icon_remove.svg";
import PlaceholderImage from "../../assets/images/image-placeholder.png";

import {
  ACTION_PARAM_NAME,
  FILE_SIZE_PARAM_NAME,
  STATUS_TEXT_PARAM_NAME,
} from "../../utils/constants/constants";

import ArrowPopover from "../arrowPopover/ArrowPopover";
import MoreOptionsButton from "../buttons/moreOptionsButton/MoreOptionsButton";
import ListItem from "../listItems/listItem/ListItem";
import useDataGrid from "./DataGrid.hooks";
import {
  CustomTextField,
  CustomTypography,
  DownloadIcon,
  IconTextBox,
  InstitutionName,
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
let theme = createTheme();

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
                    {(item?.editMode && selectedId === item?.selectedId) ||
                    params?.row?.id?.includes("adding") ? (
                      // @ts-ignore
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (item?.handleSubmit) {
                            item?.handleSubmit(params.row.id);
                          }
                        }}
                      ></Button>
                    ) : (
                      <MoreOptionsButton
                        disabled={moreOptions?.length === 0}
                        id={`btn_more_option_${selectedId}`}
                        name="More options"
                        data-id="more-options"
                        onClick={(event) =>
                          onMoreOptionsClick(event, selectedId)
                        }
                      />
                    )}
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
        components={{
          NoRowsOverlay: () => (
            <Stack
              height="100%"
              alignItems="center"
              justifyContent="center"
              data-id="no-results-found-label"
            >
              No Results Found
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack
              height="100%"
              alignItems="center"
              justifyContent="center"
              data-id="no-results-found-label"
            >
              No Results Found
            </Stack>
          ),
        }}
        onSortModelChange={(item: any[]) => {
          if (onSort) {
            let updatedValue =
              item.length > 0 ? item[0]?.field + "_" + item[0]?.sort : "";

            onSort(updatedValue);
          }
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
              {moreOptions.map((item, index) => (
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
