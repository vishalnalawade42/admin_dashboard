import { useEffect, useState } from "react";
import TableContextProvider from "./context/TableContextProvider.js";
import THead from "./head/THead.js";
import TBody from "./body/TBody.js";
import GlobalDelete from "./globalDelete/GlobalDelete.js";
import TablePagination from "./pagination/TPagination.js";
import "./index.css";
export default function Table({
  tableRowObjects = [],
  tableColumns = [],
  tableSearch = "",
  tableRowCheckboxRequired = true,
  tableRowEditRequired = true,
  tableRowDeleteRequired = true,
  tableRowsPerPage = 10,
  tableRowsUniqueIdentifier = "id",
  maxNoOfButtonsOnPagination = 5,
}) {
  const [rowColumnValidationSuccess, setRowColumnValidationSuccess] = useState(
    false
  );
  const [checkedRowIds, setCheckedRowIds] = useState([]);
  const [currentPageValue, setCurrentPageValue] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (tableRowObjects.length === 0) {
      setRowColumnValidationSuccess(true);
    } else {
      //verify the first object properties - should contain column dataIndex
      let validationObjectArray = tableColumns.filter((columnObject) => {
        return tableRowObjects[0][columnObject.dataIndex] ? true : false;
      });

      if (!(validationObjectArray.length === tableColumns.length)) {
        setRowColumnValidationSuccess(false);
        setMessage(
          "Provided Column dataIndex is not matching with Row Objects"
        );
      } else if (!tableRowObjects[0][tableRowsUniqueIdentifier]) {
        setRowColumnValidationSuccess(false);
        setMessage(
          "Provided Table Rows Unique Identifier is not available in dataset."
        );
      } else {
        setRowColumnValidationSuccess(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCheckedRowIds([]);
  }, [tableSearch]);

  let givenTableProperties = {
    tableRowCheckboxRequired,
    tableRowEditRequired,
    tableRowDeleteRequired,
    tableRowsPerPage,
    currentPageValue,
    tableRowsUniqueIdentifier,
    tableSearch,
    tableColumns,
    maxNoOfButtonsOnPagination,
  };

  return (
    <div>
      {rowColumnValidationSuccess ? (
        <div className="table-container" data-testid="table-1">
          <TableContextProvider
            tableRows={tableRowObjects}
            tableProperties={givenTableProperties}
            checkedRowIds={checkedRowIds}
            setCheckedRowIds={setCheckedRowIds}
          >
            <table className="table table-data">
              <THead />
              <TBody />
            </table>
            <div className="inline-delete-pagination">
              {tableRowCheckboxRequired && <GlobalDelete />}
              <TablePagination setCurrentPageValue={setCurrentPageValue} />
            </div>
          </TableContextProvider>
        </div>
      ) : (
        <div>{message}</div>
      )}
    </div>
  );
}
