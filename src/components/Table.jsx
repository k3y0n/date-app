import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ data, columns, selectedSort, onSort }) => {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        selectedSort={selectedSort}
        onSort={onSort}
      />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Table;
