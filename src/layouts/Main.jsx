import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
  const { error, progress, status, initialize } = useMockData();
  const handleClick = () => {
    initialize();
  };

  return (
    <div className="container mt-5">
      <h1>Главная страница</h1>
      <h3>Initialize Firebase</h3>
      <ul>
        <li>Status:{status}</li>
        <li>Progress:{progress}</li>
        {error && <li>Error:{error.message}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleClick}>
        Initializate
      </button>
    </div>
  );
};

export default Main;
