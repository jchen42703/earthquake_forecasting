import Row from "./Row";
import "../styles/table.scss";

/**
 * Single row table to show the values
 * @param props
 * @returns JSX
 */
export default function DataTable(props: { [data: string]: any }) {
  const getRows = (data: { [colName: string]: any }) => {
    return Object.entries(data).map(([colName, value], _) => {
      return (
        <Row
          key={`${colName}_${value}`}
          origColName={colName}
          value={value}
          classes={["bg-light"]}
        ></Row>
      );
    });
  };

  return (
    <div className={"data-table"}>
      <Row
        origColName={"Input Features"}
        value={"Values"}
        classes={["bg-dark", "text-light"]}
      ></Row>
      {getRows(props.data)}
    </div>
  );
}
