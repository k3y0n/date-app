import Card from "../../hoc/Card/Card";
import Qualities from "../Qualities/Qualities";
import PropTypes from "prop-types";

const QualitiesCard = ({ qualities }) => {
  return (
    <Card className={'card mb-3'}>
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <p className="card-text">
          <Qualities qualities={qualities} />
        </p>
      </div>
    </Card>
  );
};

QualitiesCard.proptTypes = {
  qualities: PropTypes.array.isRequired,
};

export default QualitiesCard;
