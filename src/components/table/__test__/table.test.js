import React from "react";
import Table from "../index.js";
import Enzyme, { mount } from "enzyme";
import { cleanup } from "@testing-library/react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

afterEach(() => {
  cleanup();
});

describe("renders in table rows based on provided columns and table data", () => {
  const tableColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  const tableData = [
    {
      id: 1,
      name: "John",
      email: "john@test.com",
    },
    {
      id: 5,
      name: "Kevin",
      email: "kevin@test.com",
    },
    {
      id: 7,
      name: "Rahat",
      email: "rajat@test.com",
    },
  ];

  const container = mount(
    <Table
      tableRowObjects={tableData}
      tableColumns={tableColumns}
      tableRowCheckboxRequired={false}
      tableRowEditRequired={false}
      tableRowDeleteRequired={false}
    />
  );

  const table = container.find("table");
  const thead = table.find("thead");
  const tbody = table.find("tbody");
  const headers = thead.find("th");

  it("contains 1 table element", () => {
    expect(table).toHaveLength(1);
  });

  it("contains 1 thead element", () => {
    expect(thead).toHaveLength(1);
  });

  it("contains 1 tbody element", () => {
    expect(tbody).toHaveLength(1);
  });

  it("contains number of th tags should be equal to number of columns", () => {
    expect(headers).toHaveLength(tableColumns.length);
  });

  it("th tag text eaquals to the column header", () => {
    headers.forEach((th, idx) => {
      expect(th.text()).toEqual(tableColumns[idx].title);
    });
  });

  it("tbody tag should have the same number of tr tags as input rows", () => {
    const rows = tbody.find("tr");

    expect(rows).toHaveLength(tableData.length);
  });

  it("row content is eaquals to the input data content", () => {
    const rows = tbody.find("tr");

    rows.forEach((tr, rowIndex) => {
      const cells = tr.find("td");

      expect(cells).toHaveLength(tableColumns.length);
      expect(cells.at(0).text()).toEqual(tableData[rowIndex].name);
      expect(cells.at(1).text()).toEqual(tableData[rowIndex].email);
    });
  });
});

describe("renders empty table if there is no table data provided", () => {
  const tableColumns = [
    { title: "Name", dataIndex: "name", key: "nam" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  const tableData = [];

  const container = mount(
    <Table
      tableRowObjects={tableData}
      tableColumns={tableColumns}
      tableRowCheckboxRequired={false}
      tableRowEditRequired={false}
      tableRowDeleteRequired={false}
    />
  );
  const table = container.find("table");
  const thead = table.find("thead");
  const headers = thead.find("th");
  const tbody = table.find("tbody");
  const rows = tbody.find("tr");

  it("contains 1 table element", () => {
    expect(table).toHaveLength(1);
  });

  it("contains 1 thead element", () => {
    expect(thead).toHaveLength(1);
  });

  it("contains 1 tbody element", () => {
    expect(tbody).toHaveLength(1);
  });

  it("contains number of th tags should be equal to number of columns", () => {
    expect(headers).toHaveLength(tableColumns.length);
  });

  it("contains only one table row", () => {
    expect(rows).toHaveLength(1);
  });
  it("contains only one cell in a row", () => {
    const cell = rows.find("td");
    expect(cell).toHaveLength(1);
  });
  it("contains colSpan equals to the number of columns and checks cell text", () => {
    const cell = rows.find("td");
    expect(cell.prop("colSpan")).toEqual(tableColumns.length);
    expect(cell.text()).toEqual("No data found.");
  });
});
