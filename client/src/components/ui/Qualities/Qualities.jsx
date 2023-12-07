import PropTypes from "prop-types";
import Quality from "../Quality/Quality";
import { useSelector } from "react-redux";
import { getQualitiesStatus } from "../../../store/qualitySlice";

const Qualities = ({ qualities }) => {
  const qualitiesLoading = useSelector(getQualitiesStatus());
  return (
    <>
      {qualitiesLoading
        ? null
        : qualities.map((item) => <Quality id={item} key={item} />)}
    </>
  );
};

Qualities.propTypes = {
  qualities: PropTypes.array,
};

export default Qualities;
