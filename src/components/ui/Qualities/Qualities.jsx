import PropTypes from "prop-types";
import Quality from "../Quality/Quality";
import { useQuality } from "../../../hooks/useQuality";

const Qualities = ({ qualities }) => {
  const { loading } = useQuality();
  return (
    <>
      {!loading
        ? qualities.map((item) => <Quality id={item} key={item} />)
        : null}
    </>
  );
};

Qualities.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Qualities;
