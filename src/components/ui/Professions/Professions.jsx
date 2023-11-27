import { useProfessions } from "../../../hooks/useProfession";
import PropTypes from "prop-types";

const Professions = ({ id }) => {
  const { loading, getProfessionById } = useProfessions();
  const profession = getProfessionById(id);
  return <>{loading ? <h2>Loading ...</h2> : <p>{profession.name}</p>}</>;
};

Professions.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Professions;
