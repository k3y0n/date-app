import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";

const QualityContext = React.createContext();

export const useQuality = () => useContext(QualityContext);

export const QualityProvider = ({ children }) => {
  const [qualities, setQuality] = useState([]);
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
    return qualities.find((qual) => qual._id === id);
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
    <QualityContext.Provider value={{ qualities, loading, getQualityById }}>
      {children}
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
])
};
