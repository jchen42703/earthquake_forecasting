import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

/**
 * Single row table to show the values
 * @param props
 * @returns JSX
 */
export default function DataTable(props: any) {
  const getTableHead = (data: any) => {
    return Object.keys(data).map((key) => {
      return <Th key={key}>{key}</Th>;
    });
  };

  const getDataRowValues = (data: any) => {
    return Object.values(data).map((value: any) => {
      return <Td key={value}>{value}</Td>;
    });
  };

  return (
    <Table>
      <Thead>
        <Tr>{getTableHead(props.data)}</Tr>
      </Thead>
      <Tbody>
        <Tr>{getDataRowValues(props.data)}</Tr>
      </Tbody>
    </Table>
  );
}
