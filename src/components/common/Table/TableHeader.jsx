import PropTypes from "prop-types";
import Caret from "../Caret/Caret";

const TableHeader = ({ selectedSort, onSort, columns }) => {
  const selectSort = (item) => {
    if (item === selectedSort.path) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => selectSort(columns[column].path)
                : undefined
            }
            role={columns[column].path && "button"}
          >
            {columns[column].name}
            {selectedSort.path === columns[column].path && (
              <Caret order={selectedSort.order} />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableHeader;
