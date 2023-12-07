import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  getProfessionsStatus,
  getProfessionById,
} from "../../../store/professionsSlice.js";

const Professions = ({ id }) => {
  const professionLoading = useSelector(getProfessionsStatus());
  const professionName = useSelector(getProfessionById(id));
  return (
    <>
      {professionLoading ? <h2>Loading ...</h2> : <p>{professionName.name}</p>}
    </>
  );
};

Professions.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Professions;
