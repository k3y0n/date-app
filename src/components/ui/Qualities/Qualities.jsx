import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Qualities = ({ qualities }) => {
  const { getQualitiesById } = useQuality();
  const qualitiData = getQualitiesById(qualities);
  return (
    <>
      {qualitiData
        ? qualitiData.map((item) => (
            <span key={item.name} className={`badge text-bg-${item.color} m-2`}>
              {item.name}
            </span>
          ))
        : null}
    </>
  );
};

Qualities.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Qualities;
