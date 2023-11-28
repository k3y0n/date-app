import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";

const QualityContext = React.createContext();

export const useQuality = () => useContext(QualityContext);

const QualityProvider = ({ children }) => {
  const [quality, setQuality] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getQualities = async () => {
    try {
      const { content } = await qualityService.get();
      setQuality(content);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const getQualityById = (id) => {
    return quality.find((qual) => qual._id === id);
  };

  useEffect(() => {
    getQualities();
  }, []);

  useEffect(() => {
    if (!error) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <QualityContext.Provider value={{ quality, loading, getQualityById }}>
      {children}
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QualityProvider;
