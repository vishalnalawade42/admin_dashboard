import React, { useEffect, useReducer, useMemo } from "react";
import reducer from "../../../reducer/reducer.js";
import ACTION_TYPES from "../../../reducer/actions.js";

import {
  TableRowsContext,
  CheckedUserContext,
  TablePropertiesContext,
  UpdateTableRowsContext,
  FilteredRowsContext,
  CurrentTableRowContext,
} from "./TableContextCreator";

export default function TableContextProvider({ children, ...props }) {
  const [tableRows, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.INITIAL_LOAD,
      payload: props.tableRows,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTableRows = useMemo(() => {
    let filterResult = tableRows.filter((data) => {
      let rowFilter = props.tableProperties.tableColumns.map((column) => {
        return data[column.dataIndex].includes(
          props.tableProperties.tableSearch
        );
      });

      if (rowFilter.includes(true)) {
        return true;
      } else {
        return false;
      }
    });

    return filterResult;
  }, [
    props.tableProperties.tableSearch,
    props.tableProperties.tableColumns,
    tableRows,
  ]);

  const currentTablePageRows = useMemo(() => {
    return filteredTableRows.slice(
      props.tableProperties.currentPageValue *
        props.tableProperties.tableRowsPerPage,
      props.tableProperties.tableRowsPerPage *
        props.tableProperties.currentPageValue +
        props.tableProperties.tableRowsPerPage
    );
  }, [
    props.tableProperties.currentPageValue,
    props.tableProperties.tableRowsPerPage,
    filteredTableRows,
  ]);

  return (
    <React.Fragment>
      <TableRowsContext.Provider value={tableRows}>
        <FilteredRowsContext.Provider value={filteredTableRows.length}>
          <CurrentTableRowContext.Provider value={currentTablePageRows}>
            <UpdateTableRowsContext.Provider value={dispatch}>
              <CheckedUserContext.Provider
                value={{
                  checkedUser: [props.checkedRowIds, props.setCheckedRowIds],
                }}
              >
                <TablePropertiesContext.Provider value={props.tableProperties}>
                  {children}
                </TablePropertiesContext.Provider>
              </CheckedUserContext.Provider>
            </UpdateTableRowsContext.Provider>
          </CurrentTableRowContext.Provider>
        </FilteredRowsContext.Provider>
      </TableRowsContext.Provider>
    </React.Fragment>
  );
}
