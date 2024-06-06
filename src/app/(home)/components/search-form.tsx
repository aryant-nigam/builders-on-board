"use client";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import classes from "./search-form.module.css";
import useHttp from "@/hooks/use-http";
const services = ["electronics", "pest control", "painting", "flooring"];

function SearchForm() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");

  const { get } = useHttp(
    `https://builders-on-board-be-2.onrender.com/filter-services?pincode=${pincode}&service_type=${selectedService}`
  );

  const pincodeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 6) setPincode(event.target.value);
  };

  const serviceChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(event.target.value);
  };

  const fetchData = async () => {
    const data = await get();

    if (data["pincode"].length !== 0) {
      setMessage(
        "Service is available in your area SIGN IN / SIGN UP to book a service"
      );
    } else {
      setMessage("Sorry 😔 service is unavailable !");
    }
  };

  const searchHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pincode.length != 6) {
      setMessage("Pincode must be of 6 digits !");
    } else {
      fetchData();
    }
  };

  return (
    <>
      <form className={classes["search-form"]} onSubmit={searchHandler}>
        <div className={classes["search-fields"]}>
          <img src="search-icon.png" className={classes["search-icon"]}></img>
          <input
            type="number"
            placeholder="Your pincode"
            className={classes["pincode-search-box"]}
            onChange={pincodeChangeHandler}
            value={pincode}
          ></input>
          <span className={classes["vertical-line"]}></span>
          <select
            className={classes["services"]}
            onChange={serviceChangeHandler}
            defaultValue={selectedService}
          >
            {services.map((service, index) => (
              <option
                className={classes["service"]}
                value={service}
                key={index}
              >
                {service}
              </option>
            ))}
          </select>
        </div>
        <input type="submit" value="search" className={classes["search-btn"]} />
      </form>
      {message && <p className={classes["response"]}>{message}</p>}
    </>
  );
}

export default SearchForm;
