import { useState } from "react";
import "../home/Home.css";
export const Input = ({ setSearchDataEnteredByUser }) => {
  const [intervalId, setIntervalId] = useState(0);
  const debounceSearch = (input) => {
    if (intervalId) {
      clearInterval(intervalId);
      updateIntervalAndSerachString(input.toLowerCase());
    } else {
      updateIntervalAndSerachString(input.toLowerCase());
    }
  };

  const updateIntervalAndSerachString = (inputString) => {
    setIntervalId(
      setTimeout(() => {
        setSearchDataEnteredByUser(inputString);
      }, 300)
    );
  };
  
  return (
    <input
      id="search"
      name="search"
      type="text"
      placeholder="Search by name, email or role"
      className="user-filter"
      onChange={(e) => {
        debounceSearch(e.target.value);
      }}
    />
  );
};
