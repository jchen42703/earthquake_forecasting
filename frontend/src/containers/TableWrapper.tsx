import React, { useState } from "react";
import fetchData, { defaultData, FetchDataResp } from "../services/data";
import DataTable from "./DataTable";
import Predictions from "./Predictions";

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
      <p>Table component</p>
      <button
        onClick={() => {
          handleClick(true);
        }}
      >
        Sample training data
      </button>

      <button
        onClick={() => {
          handleClick(false);
        }}
      >
        Sample test data
      </button>

      <DataTable data={data.input_row}></DataTable>
      {data.label_row !== null && <DataTable data={data.label_row}></DataTable>}

      <Predictions
        modelType={"lightgbm"}
        inputData={data.input_row!}
      ></Predictions>
    </React.Fragment>
  );
};

export default TableWrapper;
