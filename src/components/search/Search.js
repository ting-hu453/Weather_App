import React, { useState } from "react";
import { GEO_API_URL, getAPIOptions } from "../../api";
import { AsyncPaginate } from "react-select-async-paginate";
import "./search.css";

const Search = ({ onSearchChange }) => {
  const [userInput, setUserInput] = useState(null);

  const handleOnChange = (searchData) => {
    setUserInput(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    //console.log("inputvalue", inputValue);
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`,
      getAPIOptions
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        return {
          options: response.data.map((city) => {
            return {
              value: {
                lat: `${city.latitude.toFixed(2)}`,
                lon: `${city.longitude.toFixed(2)}`,
              },

              //`${city.latitude} ${city.longitude}`
              label: `${city.name},${city.region},${city.countryCode}`,
            };
          }),
        };
      });
  };

  return (
    <AsyncPaginate
      placeholder="Search for City"
      debounceTimeout={600}
      value={userInput}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
