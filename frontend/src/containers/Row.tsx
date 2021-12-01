import "../styles/table.scss";

interface RowProps {
  origColName: string;
  value: any;
  classes?: string[];
}

const Row = (props: RowProps) => {
  // Dynamically handles styles
  const rowStyling = () => {
    let style = "row";
    if (props.classes !== undefined) {
      for (let i = 0; i < props.classes!.length; i++) {
        style = style.concat(` ${props.classes![i]}`);
      }
    }

    return style;
  };

  return (
    <div className={rowStyling()}>
      <div>{props.origColName}</div>
      <div>{props.value}</div>
    </div>
  );
};

export default Row;
