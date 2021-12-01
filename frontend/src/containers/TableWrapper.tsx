import React, { useState } from "react";
import fetchData, { defaultData, FetchDataResp } from "../services/data";
import DataTable from "./DataTable";
import Predictions from "./Predictions";
import Button from "react-bootstrap/Button";
import NavHeader from "./NavHeader";
import Container from "react-bootstrap/Container";
import "../styles/headers.scss";
import "../styles/spacing.scss";

const TableWrapper = () => {
  const [data, setData] = useState<FetchDataResp>(defaultData);

  const handleClick = async (isTrainData: boolean) => {
    const newData = await fetchData(isTrainData);
    setData(newData!);
  };

  const displayLabelTable = () => {
    if (data.label_row !== null) {
      return (
        <DataTable
          data={data.label_row}
          header={{
            leftColName: "Label Features",
            rightColName: "Values",
          }}
        ></DataTable>
      );
    } else {
      return (
        <p className={"text-align-left mlr-5p mb-3p"}>No Labels Available.</p>
      );
    }
  };

  return (
    <React.Fragment>
      <NavHeader></NavHeader>
      <Container fluid className={"mt-3 overflow-hidden"}>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            handleClick(true);
          }}
          className={"mb-3"}
        >
          Sample and predict training data
        </Button>{" "}
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            handleClick(false);
          }}
          className={"mb-3"}
        >
          Sample and predict test data
        </Button>
        {/* <p className={"small-header mlr-5p"}>Input Data</p> */}
        <DataTable
          data={data.input_row}
          header={{
            leftColName: "Input Data Features",
            rightColName: "Values",
          }}
        ></DataTable>
        {/* <p className={"small-header mlr-5p"}>Labels</p> */}
        {displayLabelTable()}
        <Predictions inputData={data.input_row!}></Predictions>
      </Container>
    </React.Fragment>
  );
};

export default TableWrapper;
