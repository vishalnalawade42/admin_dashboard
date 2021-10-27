import React, { useState } from "react";
import useAxiosGet from "../../hooks/useAxiosGet.js";
import config from "../../config.json";
import { Input } from "../input/input.js";
import Table from "../table/index.js";
import "./Home.css";
export default function Home() {
  const [searchDataEnteredByUser, setSearchDataEnteredByUser] = useState("");
  const { axiosGetResponse, isLoading, isError } =  useAxiosGet(config.SERVER_URL);

  
  return (
    <div data-testid="home-1" className="home-container">
      {isError ? (
        <h2>An error occured</h2>
      ) : isLoading ? (
        <h2>Loading....</h2>
      ) : (
        axiosGetResponse && (
          <React.Fragment>
            <h1>Admin UI</h1>
            <Input setSearchDataEnteredByUser={setSearchDataEnteredByUser} />
            <Table
              tableRowObjects={axiosGetResponse}
              tableColumns={config.TABLE_CONFIG.columns}
              tableSearch={searchDataEnteredByUser}
              tableRowCheckboxRequired={config.TABLE_CONFIG.tableRowCheckBoxRequired}
              tableRowEditRequired={config.TABLE_CONFIG.tableRowEditRequired}
              tableRowDeleteRequired={config.TABLE_CONFIG.tableRowDeleteRequired}
              tableRowsPerPage={config.TABLE_CONFIG.tableRowsPerPage}
              tableRowsUniqueIdentifier={config.TABLE_CONFIG.tableRowsUniqueIdentifier}
              maxNoOfButtonsOnPagination={config.TABLE_CONFIG.maxNoOfButtonsOnPagination}
            />
          </React.Fragment>
        )
      )}
    </div>
  );
}
