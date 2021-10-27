import React, { useEffect, useState, useContext } from "react";
import "./THead.css";
import {
  TablePropertiesContext,
  CurrentTableRowContext,
  CheckedUserContext,
} from "../context/TableContextCreator.js";
export default function TableHeader() {
  const [globalChecked, setGlobalChecked] = useState(false);

  const {
    tableRowEditRequired,
    tableRowDeleteRequired,
    tableRowCheckboxRequired,
    tableRowsUniqueIdentifier,
    tableColumns,
  } = useContext(TablePropertiesContext);

  const currentPageData = useContext(CurrentTableRowContext);
  const {checkedUser} = useContext(CheckedUserContext);
  const [checkedRowIds, setCheckedRowIds] = checkedUser;

  useEffect(() => {
    if (
      currentPageData.length &&
      checkedRowIds.length === currentPageData.length
    ) {
      setGlobalChecked(true);
    } else {
      setGlobalChecked(false);
    }
  }, [checkedRowIds, currentPageData]);

  function handleGlobalChecked() {
    if (globalChecked) {
      setCheckedRowIds([]);
      setGlobalChecked((current) => !current);
    } else {
      let checkedUsers = currentPageData.map(
        (row) => row[tableRowsUniqueIdentifier]
      );
      setCheckedRowIds(checkedUsers);
    }
  }

  function createGlobalCheckbox() {
    return (
      <th key="checkbox" scope="col" className="global-checkbox">
        <input
          type="checkbox"
          id="global"
          checked={globalChecked}
          onChange={() => {
            handleGlobalChecked();
          }}
        ></input>
      </th>
    );
  }

  function createAction() {
    return (
      <th key="actions" scope="col" className="row-actions">
        Actions
      </th>
    );
  }

  function createColumnHeading(column) {
    let width = 80 / tableColumns.length;
    return (
      <th key={column.key} scope="col" style={{ width: `${width}%` }}>
        {column.title}
      </th>
    );
  }

  return (
    <thead>
      <tr>
        {tableRowCheckboxRequired && createGlobalCheckbox()}
        {tableColumns.map((column) => createColumnHeading(column))}
        {(tableRowEditRequired || tableRowDeleteRequired) && createAction()}
      </tr>
    </thead>
  );
}
