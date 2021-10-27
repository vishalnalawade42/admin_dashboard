import React, { useCallback, useEffect, useContext } from "react";
import PaginationButton from "./PaginationButton";
import "./TPagination.css";
import {
  TablePropertiesContext,
  FilteredRowsContext,
} from "../context/TableContextCreator";


export default function TablePagination({ setCurrentPageValue }) {
  const { currentPageValue, tableRowsPerPage,maxNoOfButtonsOnPagination } = useContext(
    TablePropertiesContext
  );

  const noOfFilteredRows = useContext(FilteredRowsContext);

  const totalPages = Number.isInteger(noOfFilteredRows / tableRowsPerPage)
    ? noOfFilteredRows / tableRowsPerPage
    : Math.ceil(noOfFilteredRows / tableRowsPerPage);
  
  
  //add 1 to the currentPageNumber to make starting point as 1 as currentPageValue has been initialize as 0 ;
  const currentPageNumber = currentPageValue + 1;
 
 
  const generatePageNumbers = useCallback(() => {
    let pageNumbers = [];
    if (currentPageNumber > maxNoOfButtonsOnPagination) {
      for (
        let i = currentPageNumber - maxNoOfButtonsOnPagination;
        i < currentPageNumber;
        i++
      ) {
        pageNumbers.push(i + 1);
      }
    } else {
      if (maxNoOfButtonsOnPagination <= totalPages) {
        for (let i = 1; i <= maxNoOfButtonsOnPagination; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
    }
    

    return pageNumbers;
  }, [currentPageNumber, totalPages,maxNoOfButtonsOnPagination]);

  useEffect(() => {
    if (currentPageNumber > totalPages && noOfFilteredRows !== 0) {
      setCurrentPageValue(totalPages - 1);
    }
  }, [totalPages, currentPageNumber, noOfFilteredRows, setCurrentPageValue]);

  const  handleOnClick = useCallback((e) =>{
    e.preventDefault();
    let value = e.target.value;
    if (value === "next") {
      setCurrentPageValue((current) => current + 1);
    } else if (value === "prev") {
      setCurrentPageValue((current) => current - 1);
    } else if (value === "first") {
      setCurrentPageValue(0);
    } else if (value === "last") {
      setCurrentPageValue(Math.floor(noOfFilteredRows / tableRowsPerPage));
    } else {
      setCurrentPageValue(Number(value));
    }
  },[noOfFilteredRows,tableRowsPerPage,setCurrentPageValue]);

  const  getPaginationButton = useCallback(({
    id,
    displayName,
    value,
    onClick,
    disable,
    key,
  }) => {
    return (
      <PaginationButton
        id={id}
        name={displayName}
        value={value}
        onClick={onClick}
        className={"btn btn-secondary btn-circle btn-sm  btn-pagination"}
        disabled={disable}
        key={key}
      />
    );
  },[]);

  
  return (
    <div className="table-pagination">
      {getPaginationButton({
        id: "first",
        displayName: "<<",
        value: "first",
        onClick: handleOnClick,
        disable: currentPageNumber === 1 || totalPages===0,
      })}
      {getPaginationButton({
        id: "prev",
        displayName: "<",
        value: "prev",
        onClick: handleOnClick,
        disable: currentPageNumber === 1||totalPages===0,
      })}

      {totalPages > 0 ? (
        generatePageNumbers().map((pageNumber, index) => {
          return getPaginationButton({
            id: index,
            displayName: pageNumber,
            value: pageNumber - 1,
            onClick: handleOnClick,
            disable: currentPageNumber === pageNumber,
            key: index,
          });
        })
      ) : (
        <React.Fragment></React.Fragment>
      )}

      {getPaginationButton({
        id: "next",
        displayName: ">",
        value: "next",
        onClick: handleOnClick,
        disable:
          currentPageNumber ===
            Math.ceil(noOfFilteredRows / tableRowsPerPage) ||
          totalPages === 0,
      })}

      {getPaginationButton({
        id: "last",
        displayName: ">>",
        value: "last",
        onClick: handleOnClick,
        disable:
          currentPageNumber ===
            Math.ceil(noOfFilteredRows / tableRowsPerPage) ||
          totalPages === 0,
      })}
    </div>
  );
}
