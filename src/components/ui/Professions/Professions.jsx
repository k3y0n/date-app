import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  selectProfessionById,
  getProfessionsStatus,
} from "../../../store/professionsSlice.js";

const Professions = ({ id }) => {
  const professionLoading = useSelector(getProfessionsStatus());
  const profession = useSelector((state) => selectProfessionById(state, id));
  return (
    <>{professionLoading ? <h2>Loading ...</h2> : <p>{profession.name}</p>}</>
  );
};

Professions.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Professions;
