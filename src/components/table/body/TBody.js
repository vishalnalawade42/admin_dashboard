import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import "./TBody.css";
import ACTION_TYPES from "../../../reducer/actions.js";
import Checkbox from "./Checkbox";

import {
  UpdateTableRowsContext,
  TablePropertiesContext,
  CurrentTableRowContext,
  CheckedUserContext,
} from "../context/TableContextCreator";

export default function TBody() {
  const [rowSelectedForEdit, setRowSelectedForEdit] = useState({});
  const dispatch = useContext(UpdateTableRowsContext);

  const {
    tableRowEditRequired,
    tableRowDeleteRequired,
    tableRowCheckboxRequired,
    tableRowsUniqueIdentifier,
    tableSearch,
    tableColumns,
    currentPageValue,
  } = useContext(TablePropertiesContext);

  const currentPageTableRows = useContext(CurrentTableRowContext);
  const { checkedUser } = useContext(CheckedUserContext);
  const [checkedRowIds, setCheckedRowIds] = checkedUser;

  useEffect(() => {
    setRowSelectedForEdit({});
    setCheckedRowIds([]);
  }, [tableSearch, currentPageValue, setCheckedRowIds]);

  const handleRowCheckedEvent = useCallback(
    (rowId) => {
      if (checkedRowIds.includes(rowId)) {
        setCheckedRowIds((currentCheckedRowIds) =>
          currentCheckedRowIds.filter(
            (currentCheckedRowId) => currentCheckedRowId !== rowId
          )
        );
      } else {
        setCheckedRowIds((currentCheckedRowId) => [
          ...currentCheckedRowId,
          rowId,
        ]);
      }
    },
    [checkedRowIds, setCheckedRowIds]
  );

  const handleRowEditEvent = useCallback(
    (row) => {
      if (!rowSelectedForEdit[tableRowsUniqueIdentifier]) {
        setRowSelectedForEdit(row);
      }
    },
    [rowSelectedForEdit, tableRowsUniqueIdentifier]
  );

  const handleSingleDeleteEvent = useCallback(
    (rowId) => {
      dispatch({
        type: ACTION_TYPES.SINGLE_DELETE,
        payload: { [tableRowsUniqueIdentifier]: rowId },
        uniqueIdentifier: tableRowsUniqueIdentifier,
      });
      setCheckedRowIds((currentCheckedRowIds) =>
        currentCheckedRowIds.filter(
          (currentCheckedRowId) => currentCheckedRowId !== rowId
        )
      );
      if (rowId === rowSelectedForEdit[tableRowsUniqueIdentifier]) {
        setRowSelectedForEdit({});
      }
    },
    [dispatch, rowSelectedForEdit, setCheckedRowIds, tableRowsUniqueIdentifier]
  );

  const capitalizeFirstLetter = useCallback((string) => {
    if (string) {
      return string[0].toUpperCase() + string.slice(1);
    } else {
      return string;
    }
  }, []);

  const handleSaveEvent = useCallback(
    (rowId) => {
      if (rowId === rowSelectedForEdit[tableRowsUniqueIdentifier]) {
        let validationResult = tableColumns.filter((column) => {
          return rowSelectedForEdit[column.dataIndex];
        });
        if (validationResult.length === tableColumns.length) {
          dispatch({
            type: ACTION_TYPES.SINGLE_UPDATE,
            payload: { ...rowSelectedForEdit },
            uniqueIdentifier: tableRowsUniqueIdentifier,
          });
          setRowSelectedForEdit({});
        }
      }
    },
    [dispatch, rowSelectedForEdit, tableColumns, tableRowsUniqueIdentifier]
  );

  const handleEditEvent = useCallback(
    (e, column) => {
      let value = e.target.value;
      let updateEditedUser = { ...rowSelectedForEdit };
      updateEditedUser[column] = value;
      setRowSelectedForEdit(updateEditedUser);
    },
    [rowSelectedForEdit]
  );

  const generateEditedInputField = useCallback(
    (row) => {
      return (
        <React.Fragment>
          {tableColumns.map((column) => (
            <td key={row[tableRowsUniqueIdentifier] + column.dataIndex}>
              {column.dataIndex === tableRowsUniqueIdentifier ? (
                rowSelectedForEdit[column.dataIndex]
              ) : (
                <input
                  value={capitalizeFirstLetter(
                    rowSelectedForEdit[column.dataIndex]
                  )}
                  className="row-edit"
                  onChange={(e) => handleEditEvent(e, column.dataIndex)}
                  style={{ width: "100%" }}
                ></input>
              )}
            </td>
          ))}
        </React.Fragment>
      );
    },
    [
      capitalizeFirstLetter,
      handleEditEvent,
      rowSelectedForEdit,
      tableColumns,
      tableRowsUniqueIdentifier,
    ]
  );

  const generateTableRowField = useCallback(
    (row) => {
      return (
        <React.Fragment>
          {tableColumns.map((column) => (
            <td key={row[tableRowsUniqueIdentifier] + column.dataIndex}>
              {row[column.dataIndex]
                ? column.dataIndex === "email"
                  ? row[column.dataIndex]
                  : capitalizeFirstLetter(row[column.dataIndex])
                : "NA"}
            </td>
          ))}
        </React.Fragment>
      );
    },
    [tableColumns, capitalizeFirstLetter, tableRowsUniqueIdentifier]
  );

  const generateActionButtonEditOrSave = useCallback(
    (rowData) => {
      return (
        <React.Fragment>
          {rowSelectedForEdit[tableRowsUniqueIdentifier] ===
          rowData[tableRowsUniqueIdentifier] ? (
            <span
              className="btn btn-sm material-icons"
              onClick={() =>
                handleSaveEvent(rowData[tableRowsUniqueIdentifier])
              }
            >
              save
            </span>
          ) : (
            <span
              className="btn btn-sm btn-action material-icons"
              onClick={() => handleRowEditEvent(rowData)}
            >
              mode_edit
            </span>
          )}
        </React.Fragment>
      );
    },
    [
      handleRowEditEvent,
      handleSaveEvent,
      rowSelectedForEdit,
      tableRowsUniqueIdentifier,
    ]
  );

  const generateActionButtonDelete = useCallback(
    (rowId) => {
      return (
        <span
          className="btn btn-sm material-icons"
          onClick={() => {
            handleSingleDeleteEvent(rowId);
          }}
        >
          delete
        </span>
      );
    },
    [handleSingleDeleteEvent]
  );

  const calculateColSpan = useMemo(() => {
    let colSpan = 0;
    if (tableRowCheckboxRequired) {
      // eslint-disable-next-line no-unused-vars
      colSpan = colSpan + 1;
    }
    if (tableRowEditRequired || tableRowDeleteRequired) {
      colSpan = colSpan + 1;
    }

    return colSpan + tableColumns.length;
  }, [
    tableRowCheckboxRequired,
    tableRowEditRequired,
    tableRowDeleteRequired,
    tableColumns.length,
  ]);

  return (
    <tbody>
      {currentPageTableRows.length > 0 ? (
        currentPageTableRows.map((row) => (
          <tr
            key={row[tableRowsUniqueIdentifier]}
            id={row[tableRowsUniqueIdentifier]}
            className={
              checkedRowIds.includes(row[tableRowsUniqueIdentifier])
                ? "row-gray row-data"
                : "row-data"
            }
          >
            {tableRowCheckboxRequired && (
              <Checkbox
                value={
                  checkedRowIds.includes(row[tableRowsUniqueIdentifier])
                    ? true
                    : false
                }
                row={row}
                onChange={() =>
                  handleRowCheckedEvent(row[tableRowsUniqueIdentifier])
                }
              />
            )}

            {rowSelectedForEdit[tableRowsUniqueIdentifier] ===
            row[tableRowsUniqueIdentifier]
              ? generateEditedInputField(row)
              : generateTableRowField(row)}

            {tableRowEditRequired || tableRowDeleteRequired ? (
              <td
                key={row[tableRowsUniqueIdentifier] + "rw"}
                className="btn-action"
              >
                {tableRowEditRequired && generateActionButtonEditOrSave(row)}
                {tableRowDeleteRequired &&
                  generateActionButtonDelete(row[tableRowsUniqueIdentifier])}
              </td>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={calculateColSpan}>No data found.</td>
        </tr>
      )}
    </tbody>
  );
}
