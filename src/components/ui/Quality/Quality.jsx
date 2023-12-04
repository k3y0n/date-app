import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectQualityById } from "../../../store/qualitySlice";

const Quality = ({ id }) => {
  const quality = useSelector((state) => selectQualityById(state, id));
  const { name, color } = quality;
  return <span className={`badge text-bg-${color} m-2`}>{name}</span>;
};

Quality.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Quality;
