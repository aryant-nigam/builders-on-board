"use client";
import React, { ChangeEvent, useState } from "react";
import classes from "./page.module.css";
import CategorySegment from "./components/category-segment";
import VerticalStepper from "./components/vertical-stepper";
import useInput from "@/hooks/use-input";
import Input from "@/components/input";
import ServiceDetails from "./components/service-details";
import { Iworker } from "./components/category-segment";
import { useRouter } from "next/navigation";

const categories: string[] = [
  "painting",
  "pest cleaning",
  "carpentry",
  "electrical work",
];

const steps = [
  {
    label: "Provide your details",
    description: `For our experienced professionals to reach out to you effectively we need your personal and address
    details.`,
  },
  {
    label: "Select expert of your choice",
    description:
      "Choose the expert of your choice from the available list. In case you don't select we deploy our best.",
  },
];

function ServicesPage() {
  const router = useRouter();

  const fetchValues = (details: any) => {
    setDetails((prevState) => {
      return { ...prevState, ...details };
    });
  };

  const firstnameValidator = (firstname: string): boolean => {
    return firstname.trim().length > 2;
  };

  const lastnameValidator = (lastname: string): boolean => {
    return lastname.trim().length > 0;
  };

  const phoneNumberValidator = (phnNo: string): boolean => {
    return (
      phnNo.trim().length === 10 && ["9", "8", "7", "6"].includes(phnNo[0])
    );
  };

  const emailValidator = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addressValidator = (address: string): boolean => {
    return address.trim().length > 10;
  };

  const pincodeValidator = (pincode: string): boolean => {
    return pincode.trim().length == 6;
  };

  const landmarkValidator = (landmark: string): boolean => {
    return landmark.trim().length >= 0;
  };

  const {
    value: firstname,
    isValid: isFirstnameValid,
    hasError: firstnameHasError,
    updateValueOnKeyStroke: updateFirstnameOnKeystroke,
    updateIsTouched: updateIsFirstnameTouched,
    reset: resetFirstname,
  } = useInput({ validator: firstnameValidator });

  const {
    value: lastname,
    isValid: isLastnameValid,
    hasError: lastnameHasError,
    updateValueOnKeyStroke: updateLastnameOnKeystroke,
    updateIsTouched: updateIsLastnameTouched,
    reset: resetLastname,
  } = useInput({ validator: lastnameValidator });

  const {
    value: phoneNumber,
    isValid: isPhoneNumberValid,
    hasError: phoneNumberHasError,
    updateValueOnKeyStroke: updatePhoneNumberOnKeystroke,
    updateIsTouched: updateIsPhoneNumberTouched,
    reset: resetPhoneNumber,
  } = useInput({ validator: phoneNumberValidator });

  const {
    value: email,
    isValid: isEmailValid,
    hasError: emailHasError,
    updateValueOnKeyStroke: updateEmailOnKeystroke,
    updateIsTouched: updateIsEmailTouched,
    reset: resetEmail,
  } = useInput({ validator: emailValidator });

  const {
    value: address,
    isValid: isAddressValid,
    hasError: addressHasError,
    updateValueOnKeyStroke: updateAddressOnKeystroke,
    updateIsTouched: updateIsAddressTouched,
    reset: resetAddress,
  } = useInput({ validator: addressValidator });

  const {
    value: pincode,
    isValid: isPincodeValid,
    hasError: pincodeHasError,
    updateValueOnKeyStroke: updatePincodeOnKeystroke,
    updateIsTouched: updateIsPincodeTouched,
    reset: resetPincode,
  } = useInput({ validator: pincodeValidator });

  const {
    value: landmark,
    isValid: isLandmarkValid,
    hasError: landmarkHasError,
    updateValueOnKeyStroke: updateLandmarkOnKeystroke,
    updateIsTouched: updateIsLandmarkTouched,
    reset: resetLandmark,
  } = useInput({ validator: landmarkValidator });

  const [activeStep, setActiveStep] = useState(1);
  const [description, setDescription] = useState<string>("");
  const [serviceType, setServiceType] = useState<string>("painting");
  const [hasSaved, setHasSaved] = useState<boolean>(false);
  const [workerSelected, setWorkerSelected] = useState<Iworker | null>(null);
  const [serviceDetails, setServiceDetails] = useState({});
  const [totalSteps, setTotalSteps] = useState<number>(steps.length);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep != totalSteps) {
        return prevActiveStep + 1;
      } else {
        return prevActiveStep;
      }
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep != 1) {
        if (prevActiveStep - 1 == 1) {
          setHasSaved(false);
          setWorkerSelected(null);
          setTotalSteps(steps.length);
        }
        return prevActiveStep - 1;
      } else {
        return prevActiveStep;
      }
    });
  };

  const serviceChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setServiceType(event.target.value);
  };

  const descriptionChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const saveWorker = (worker: Iworker) => {
    if (workerSelected == null) setTotalSteps(steps.length + 1);
    setWorkerSelected(worker);
  };

  const saveCustomerDetails = (event: React.FormEvent) => {
    event.preventDefault();

    setServiceDetails({
      firstname,
      lastname,
      phoneNumber,
      email,
      address,
      pincode,
      landmark,
      description,
      serviceType,
    });

    setHasSaved(true);
    handleNext();
  };

  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    //send the details to database after creating an object from customer and worker details
    console.log(workerSelected);
    console.log(serviceDetails);
    router.replace("/home");
  };

  return (
    <div className={classes["service-page"]}>
      <div className={classes["service-page-left-section"]}>
        <h1 className={classes["service-page-heading"]}>
          Lets get you
          <span className={classes["highlighted-text"]}>
            &nbsp;the best service
          </span>
        </h1>
        <VerticalStepper
          steps={steps}
          totalSteps={totalSteps}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          hasSaved={hasSaved}
          shouldRenderSubmissionStep={workerSelected !== null}
          submitHandler={submitHandler}
        />
      </div>
      <div className={classes["service-page-right-section"]}>
        {activeStep === 1 && (
          <form
            className={classes["service-form"]}
            onSubmit={saveCustomerDetails}
          >
            <div className={classes["details"]}>
              <h1>Personal information</h1>
              <div className={classes["fields-container"]}>
                <div className={classes.container}>
                  <label className={classes.label}>
                    First name <span className={classes.mandatory}>*</span>
                  </label>
                  <Input
                    type="text"
                    value={firstname}
                    valueHasError={firstnameHasError}
                    placeholder="First Name"
                    errorMsg="First Name cannot contain spaces"
                    updateValueOnKeyStroke={updateFirstnameOnKeystroke}
                    updateIsTouched={updateIsFirstnameTouched}
                    className={classes.input}
                  ></Input>
                </div>
                <div className={classes.container}>
                  <label className={classes.label}>
                    Last Name <span className={classes.mandatory}>*</span>
                  </label>
                  <Input
                    type="text"
                    value={lastname}
                    valueHasError={lastnameHasError}
                    placeholder="Last Name"
                    errorMsg="Last Name cannot contain spaces"
                    updateValueOnKeyStroke={updateLastnameOnKeystroke}
                    updateIsTouched={updateIsLastnameTouched}
                    className={classes.input}
                  ></Input>
                </div>
              </div>
              <div className={classes["fields-container"]}>
                <div className={classes.container}>
                  <label className={classes.label}>
                    Phone number <span className={classes.mandatory}>*</span>
                  </label>
                  <Input
                    type="text"
                    value={phoneNumber}
                    valueHasError={phoneNumberHasError}
                    placeholder="Phone Number"
                    errorMsg="Invalid phone number"
                    updateValueOnKeyStroke={updatePhoneNumberOnKeystroke}
                    updateIsTouched={updateIsPhoneNumberTouched}
                    className={classes.input}
                  ></Input>
                </div>
                <div className={classes.container}>
                  <label className={classes.label}>
                    Email <span className={classes.mandatory}>*</span>
                  </label>
                  <Input
                    type="text"
                    value={email}
                    valueHasError={emailHasError}
                    placeholder="Email"
                    errorMsg="Invalid email address"
                    updateValueOnKeyStroke={updateEmailOnKeystroke}
                    updateIsTouched={updateIsEmailTouched}
                    className={classes.input}
                  ></Input>
                </div>
              </div>
            </div>
            <div className={classes["details"]}>
              <h1>Address details</h1>
              <div className={classes["fields-container"]}>
                <div className={classes.container}>
                  <label className={classes.label}>
                    Address <span className={classes.mandatory}>*</span>
                  </label>
                  <Input
                    type="text"
                    value={address}
                    valueHasError={addressHasError}
                    placeholder="Address"
                    errorMsg="Address cannot be empty"
                    updateValueOnKeyStroke={updateAddressOnKeystroke}
                    updateIsTouched={updateIsAddressTouched}
                    className={classes.input}
                  ></Input>
                </div>
                <div className={classes.container}>
                  <label className={classes.label}>
                    Pin code <span className={classes.mandatory}>*</span>
                  </label>
                  <Input
                    type="text"
                    value={pincode}
                    valueHasError={pincodeHasError}
                    placeholder="Pincode"
                    errorMsg="Invalid pincode"
                    updateValueOnKeyStroke={updatePincodeOnKeystroke}
                    updateIsTouched={updateIsPincodeTouched}
                    className={classes.input}
                  ></Input>
                </div>
              </div>
              <div className={classes["fields-container"]}>
                <div className={classes["container-large"]}>
                  <label className={classes.label}>Landmark</label>
                  <Input
                    type="text"
                    value={landmark}
                    valueHasError={landmarkHasError}
                    placeholder="Landmark"
                    errorMsg="Landmark cannot be empty"
                    updateValueOnKeyStroke={updateLandmarkOnKeystroke}
                    updateIsTouched={updateIsLandmarkTouched}
                    className={classes.input}
                  ></Input>
                </div>
              </div>
            </div>

            <h1>Description *</h1>
            <textarea
              className={classes["issue-description"]}
              placeholder="Description of the issue (Required)"
              onChange={descriptionChangeHandler}
              value={description}
            ></textarea>
            <h1>Service type *</h1>
            <select
              className={classes["service-name"]}
              onChange={serviceChangeHandler}
              defaultValue={serviceType}
            >
              {categories.map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </select>
            <input
              type="submit"
              value="Save"
              className={classes["save-btn"]}
              disabled={
                firstnameHasError ||
                lastnameHasError ||
                phoneNumberHasError ||
                emailHasError ||
                addressHasError ||
                pincodeHasError ||
                landmarkHasError ||
                description.trim().length == 0
              }
            ></input>
          </form>
        )}

        {activeStep === 2 && (
          <CategorySegment
            category={serviceType}
            pincode={pincode}
            selectedWorker={workerSelected}
            saveWorker={saveWorker}
          />
        )}

        {activeStep === 3 && (
          <ServiceDetails details={{ serviceDetails, workerSelected }} />
        )}
      </div>
    </div>
  );
}

export default ServicesPage;
