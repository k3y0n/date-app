import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Quality = ({ id }) => {
  const { getQualityById } = useQuality();
  const { name, color, _id } = getQualityById(id);
  return (
    <span key={_id} className={`badge text-bg-${color} m-2`}>
      {name}
    </span>
  );
};

Quality.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Quality;
