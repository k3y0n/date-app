import professions from "../mockData/professions.json";
import users from "../mockData/users.json";
import qualities from "../mockData/qualities.json";
import httpService from "../services/http.service";
import { useEffect, useState } from "react";

const useMockData = () => {
  const statusConstants = {
    idle: "Not started",
    loading: "Loading",
    success: "Success",
    error: "Error",
  };

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConstants.idle);
  const [progress, setProgress] = useState(0);
  const [requests, setRequests] = useState(0);

  const totalRequest = users.length + qualities.length + professions.length;

  const incrementRequest = () => {
    setRequests((prev) => (prev += 1));
  };

  const updateProgress = () => {
    if (requests !== 0 && status === statusConstants.idle) {
      setStatus(statusConstants.loading);
    }
    const newProgress = Math.floor((requests / totalRequest) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusConstants.success);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [requests]);

  const initialize = async () => {
    try {
      for (const prof of professions) {
        console.log(prof);
        await httpService.put("profession/" + prof._id, prof);
        incrementRequest();
      }
      for (const user of users) {
        console.log(user);
        await httpService.put("user/" + user._id, user);
        incrementRequest();
      }
      for (const qual of qualities) {
        console.log(qual);
        await httpService.put("quality/" + qual._id, qual);
        incrementRequest();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConstants.error);
    }
  };

  return { error, progress, status, initialize };
};

export default useMockData;
