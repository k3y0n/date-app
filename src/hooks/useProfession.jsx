import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import professionService from "../services/profession.service";

const ProfessionContext = React.createContext();

export const useProfessions = () => useContext(ProfessionContext);

const PorfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfessions = async () => {
    try {
      const { content } = await professionService.get();
      setProfessions(content);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const getProfessionById = (id) => {
    return professions.find((profession) => profession._id === id);
  };

  useEffect(() => {
    getProfessions();
  }, []);

  useEffect(() => {
    if (!error) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <ProfessionContext.Provider
      value={{ loading, getProfessionById }}
    >
      {children}
    </ProfessionContext.Provider>
  );
};

PorfessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PorfessionProvider;
