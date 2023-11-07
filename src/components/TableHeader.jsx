import PropTypes from "prop-types";

const TableHeader = ({ selectedSort, onSort, columns }) => {
  const selectSort = (item) => {
    if (item === selectedSort.field) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSort({ field: item, order: "asc" });
    }
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].field
                ? () => selectSort(columns[column].field)
                : undefined
            }
            role={columns[column].field && "button"}
          >
            {columns[column].name}
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
