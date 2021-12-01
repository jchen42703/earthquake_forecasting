import React, { useState } from "react";
import fetchData, { defaultData, FetchDataResp } from "../services/data";
import DataTable from "./DataTable";
import Predictions from "./Predictions";
import Button from "react-bootstrap/Button";
import NavHeader from "./NavHeader";

const TableWrapper = () => {
  const [data, setData] = useState<FetchDataResp>(defaultData);

  const handleClick = async (isTrainData: boolean) => {
    const newData = await fetchData(isTrainData);
    // console.log("New data: ", newData);
    setData(newData!);
    // console.log("New state: ", data);
  };

  return (
    <React.Fragment>
      <NavHeader></NavHeader>
      <Button
        variant="primary"
        size="sm"
        onClick={() => {
          handleClick(true);
        }}
      >
        Sample training data
      </Button>{" "}
      <Button
        variant="primary"
        size="sm"
        onClick={() => {
          handleClick(false);
        }}
      >
        Sample test data
      </Button>
      <DataTable data={data.input_row}></DataTable>
      {data.label_row !== null && <DataTable data={data.label_row}></DataTable>}
      <Predictions inputData={data.input_row!}></Predictions>
    </React.Fragment>
  );
};

export default TableWrapper;
