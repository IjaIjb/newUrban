/* This component accepts props data as an array of objects and an array of objects for the
   table header columns */
import "./main-table.scss";
import "./misc.scss";
import "./vars.module.scss";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { Typography, capitalize } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import "./button.scss";
import OutlinedButton from "./buttons/OutlinedButton";
import "./inputs.scss";
import { MainTableProps } from "./portal";
// import EmptyState from "../../empty-state/EmptyState";
import EmptyState from "./EmptyState/Index";
import { getStatusClass } from "./helperFunction";

const MainTable: React.FC<MainTableProps> = ({
  identifier,
  data,
  columns,
  handleSearch,
  handleFilter,
  actionObject,
  searchBy,
  onExport,
  filterMenu,
  hideSearch,
  apiSearch,
  hideExport = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [optionValue, setOptionValue] = useState("");
  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setSearchTerm(value);
    handleSearch(value);
    setSelectedRows([]);
    setOptionValue("");
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setOptionValue(event.target.value);
    setSearchTerm("");
    console.log(
      "🚀 ~ handleFilterChange ~ event.target.value:",
      event.target.value
    );
    handleFilter(event.target.value);
  };

  const onSearch = () => {
    if (optionValue !== "") {
      apiSearch(optionValue, "status");
    } else if (searchTerm !== "") {
      apiSearch(searchTerm, "search");
    } else {
      apiSearch();
    }
  };
  const handleChangePage = (_: any, newPage: any) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = paginatedData.map((row: any) => row);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };
  const renderFilteredMenu = () => {
    if (filterMenu) {
      return filterMenu.map((item: any, index: number) => {
        return (
          <MenuItem key={index} value={item}>
            {capitalize(item)}
          </MenuItem>
        );
      });
    }
  };
  const handleSelectRow = (event: any, item: any) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedRows((prevSelected) => [...prevSelected, item]);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((row) => row !== item)
      );
    }
  };
  const renderTableHeaderCell = (headerColumns: any[]) => {
    return headerColumns.map((column, index) => {
      return (
        <TableCell
          key={column.key}
          className={index === 0 ? "flex items-center" : ""}
        >
          {index === 0 ? (
            <div className="flex items-center">
              <Checkbox
                checked={selectedRows.length === paginatedData.length}
                indeterminate={
                  selectedRows.length > 0 &&
                  selectedRows.length < paginatedData.length
                }
                onChange={handleSelectAll}
                className="text-green-600 dark:text-green-500 rounded focus:ring focus:ring-green-200 focus:ring-opacity-50"
              />
              {column.header}
            </div>
          ) : (
            column.header
          )}
        </TableCell>
      );
    });
  };

  const renderRowSpan = (row: any, column: any) => {
    if (row[column.key] !== undefined) {
      if (column.key == "status") {
        return (
          <span className={`status ${getStatusClass(row[column.key])}`}>
            {row[column.key]}
          </span>
        );
      } else if (column.key !== "status") {
        return (
          <span>{row[column.key] !== null ? row[column.key] : "---"}</span>
        );
      }
    }
  };
  const exportedText = () => {
    const text =
      selectedRows.length == paginatedData?.length
        ? "All"
        : selectedRows.length > 0
        ? selectedRows.length
        : "";
    return text;
  };
  const exportData = () => {
    onExport.callExport(selectedRows);
  };

  const filteredData = data;

  const paginatedData = filteredData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const CustomTableRow: React.FC<any> = ({ row, columns, actionObject }) => {
    const { anchorEl, openActionMenu, handleActionMenuClose, handleClick } =
      useActionMenu();

    const renderActionBlock = () => {
      if (typeof actionObject == "object") {
        return actionObject.map((item: any, index: number) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.function(row);
            }}
          >
            <Typography variant="caption" mb={0} gutterBottom>
              {row?.status === "inactive" && item?.label === "Deactivate"
                ? "Activate"
                : item.label}
            </Typography>
          </MenuItem>
        ));
      } else if (typeof actionObject == "function") {
        const actObj = actionObject(row);
        if (actObj && actObj.length) {
          return actObj.map((item: any, index: number) => (
            <MenuItem
              key={index}
              onClick={() => {
                item.function(row);
              }}
            >
              <Typography variant="caption" mb={0} gutterBottom>
                {item.label}
              </Typography>
            </MenuItem>
          ));
        }
      }
    };

    const isSelected = (item: any) => selectedRows.indexOf(item) !== -1;
    const isItemSelected = isSelected(row);
    return (
      <>
        <TableRow key={row.id} selected={isItemSelected}>
          {columns.map((column: any, index: any) => {
            if (actionObject && index === columns.length - 1) {
              return (
                <TableCell key={column.key}>
                  <div
                    className="flex items-center action_dropdown cursor-pointer"
                    onClick={handleClick}
                  >
                    Action
                    <ArrowDropDownIcon className="ml-1" />
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    open={openActionMenu}
                    onClose={handleActionMenuClose}
                  >
                    {renderActionBlock()}
                  </Menu>
                </TableCell>
              );
            } else if (index === 0) {
              return (
                <TableCell key={column.key} className="flex items-center">
                  <Checkbox
                    checked={selectedRows.includes(row)}
                    onChange={(event) => handleSelectRow(event, row)}
                    sx={{
                      color: "#223040",
                      "&.Mui-checked": {
                        color: "#19733b",
                      },
                    }}
                  />
                  {row[column.key]}
                </TableCell>
              );
            } else {
              return (
                <TableCell key={column.key}>
                  {renderRowSpan(row, column)}
                </TableCell>
              );
            }
          })}
        </TableRow>
      </>
    );
  };
  return (
    <div>
      <TableContainer className="tbl-wrap">
        <div className="toolbar mb-5 adjust-wrap flex justify-between items-center mx-5">
          <div className="flex items-center justify-start adjust-flex">
            {!hideSearch && (
              <div className="search-input w-500 m-0 me-2">
                <span>
                  <SearchIcon />
                </span>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder={`Search by ${searchBy}`}
                  className="w-400"
                />
              </div>
            )}

            {filterMenu && (
              <div className="status-select">
                <Select
                  value={optionValue}
                  onChange={handleFilterChange}
                  displayEmpty
                  className="flex align-center"
                >
                  <MenuItem value="" disabled>
                    Filter by status
                  </MenuItem>
                  <MenuItem value="">All</MenuItem>
                  {renderFilteredMenu()}
                </Select>
              </div>
            )}

            {/* <div className="flex items-center ms-5">
              <DefaultButton
                title="Apply"
                handleSubmit={onSearch}
                isLoading={false}
                width="128px"
              />
            </div> */}
          </div>
          {!hideExport && (
            <OutlinedButton
              title={`Export ${exportedText()}`}
              isDisabled={!selectedRows.length}
              handleSubmit={exportData}
            />
          )}
        </div>
        {paginatedData?.length > 0 ? (
          <Table className="table custom-table w-100">
            <TableHead>
              <TableRow>{renderTableHeaderCell(columns)}</TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row: any) => (
                <CustomTableRow
                  key={row.id}
                  row={row}
                  columns={columns}
                  identifier={identifier}
                  actionObject={actionObject}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>
            <EmptyState />
          </div>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={filteredData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default MainTable;

const useActionMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openActionMenu = Boolean(anchorEl);
  const handleActionMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  return {
    anchorEl,
    setAnchorEl,
    openActionMenu,
    handleActionMenuClose,
    handleClick,
  };
};
