import React from "react";
import classes from "./search-form.module.css";
import Select from "react-select";
const zipcodes = [123456, 677890, 343343, 456329];

function SearchForm() {
  return (
    <form className={classes["search-form"]}>
      <div className={classes["search-fields"]}>
        <img src="search-icon.png" className={classes["search-icon"]}></img>
        <input
          type="text"
          placeholder="What service do you need?"
          className={classes["search-box"]}
        ></input>
        <span className={classes["vertical-line"]}></span>
        <select className={classes["search-zip-code"]}>
          {zipcodes.map((zipcode, index) => (
            <option className={classes["zip-code"]} value={zipcode} key={index}>
              {zipcode}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" value="search" className={classes["search-btn"]} />
    </form>
  );
}

export default SearchForm;
