"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import classes from "./page.module.css";
import CategorySegment from "./components/category-segment";
import VerticalStepper from "./components/vertical-stepper";
import useInput from "@/hooks/use-input";
import Input from "@/components/input";
import ServiceDetails from "./components/service-details";
import { Builder } from "./components/category-segment";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import useHttp from "@/hooks/use-http";
import Backdrop from "@/components/backdrop";
import Loader from "@/components/loader";
import Snackbar from "@/components/snackbar";
import { useAppDispatch } from "@/store/hooks";
import { removeAuthenticatedUserDetails } from "@/store/features/auth-slice";
import { isExpired } from "react-jwt";
import { setIsServiceUpdated } from "@/store/features/services-slice";
import UnAuth from "@/components/unauth";

const categories: string[] = [
  "electronics",
  "pest control",
  "painting",
  "flooring",
  "automobile washing",
  "gardening",
];

interface ICustomer {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  address: string;
  pincode: string;
  landmark?: string; // Optional property
}

interface IService {
  timestamp: number; // Assuming timestamp is in milliseconds since epoch
  description: string;
}

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
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);
  const customerId = useAppSelector((state) => state.auth.user?.id);
  const firstname =
    useAppSelector((state) => state.auth.userPersonalInformation?.firstname) ||
    " ";
  const lastname =
    useAppSelector((state) => state.auth.userPersonalInformation?.lastname) ||
    " ";
  const email =
    useAppSelector((state) => state.auth.userPersonalInformation?.email) || " ";
  const addressInitVal = useAppSelector(
    (state) => state.auth.userPersonalInformation?.address
  );
  const phnNoInitVal = useAppSelector(
    (state) => state.auth.userPersonalInformation?.phoneNumber
  );
  const pincodeInitVal = useAppSelector(
    (state) => state.auth.userPersonalInformation?.pincode
  );
  const landmarkInitVal = useAppSelector(
    (state) => state.auth.userPersonalInformation?.landmark
  );

  const router = useRouter();
  const dispatch = useAppDispatch();

  const phoneNumberValidator = (phnNo: string): boolean => {
    return (
      phnNo.trim().length === 10 && ["9", "8", "7", "6"].includes(phnNo[0])
    );
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
    value: phoneNumber,
    isValid: isPhoneNumberValid,
    hasError: phoneNumberHasError,
    updateValueOnKeyStroke: updatePhoneNumberOnKeystroke,
    updateIsTouched: updateIsPhoneNumberTouched,
    reset: resetPhoneNumber,
    initialize: initializePhoneNumber,
  } = useInput({
    validator: phoneNumberValidator,
  });

  const {
    value: address,
    isValid: isAddressValid,
    hasError: addressHasError,
    updateValueOnKeyStroke: updateAddressOnKeystroke,
    updateIsTouched: updateIsAddressTouched,
    reset: resetAddress,
    initialize: initializeAddress,
  } = useInput({ validator: addressValidator });

  const {
    value: pincode,
    isValid: isPincodeValid,
    hasError: pincodeHasError,
    updateValueOnKeyStroke: updatePincodeOnKeystroke,
    updateIsTouched: updateIsPincodeTouched,
    reset: resetPincode,
    initialize: initializePincode,
  } = useInput({ validator: pincodeValidator });

  const {
    value: landmark,
    isValid: isLandmarkValid,
    hasError: landmarkHasError,
    updateValueOnKeyStroke: updateLandmarkOnKeystroke,
    updateIsTouched: updateIsLandmarkTouched,
    reset: resetLandmark,
    initialize: initializeLandmark,
  } = useInput({
    validator: landmarkValidator,
  });

  useEffect(() => {
    if (landmarkInitVal) initializeLandmark(landmarkInitVal);
    if (phnNoInitVal) initializePhoneNumber(phnNoInitVal);
    if (addressInitVal) initializeAddress(addressInitVal);
    if (pincodeInitVal) initializePincode(pincodeInitVal);
  }, [phnNoInitVal, addressInitVal, pincodeInitVal, landmarkInitVal]);

  const [totalSteps, setTotalSteps] = useState<number>(steps.length);
  const [activeStep, setActiveStep] = useState(1);
  const [description, setDescription] = useState<string>("");
  const [serviceType, setServiceType] = useState<string>("painting");
  const [
    hasSavedCustomerAndServiceDetails,
    setHasSavedCustomerAndServiceDetails,
  ] = useState<boolean>(false);
  const [builderSelected, setBuilderSelected] = useState<Builder | null>(null);
  const [serviceDetails, setServiceDetails] = useState<IService | null>(null);
  const [customerDetails, setCustomerDetails] = useState<ICustomer | null>(
    null
  );

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
          setHasSavedCustomerAndServiceDetails(false);
          setBuilderSelected(null);
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

  const saveBuilder = (worker: Builder) => {
    if (builderSelected == null) setTotalSteps(steps.length + 1);
    setBuilderSelected(worker);
  };

  const saveCustomerAndServiceDetails = (event: React.FormEvent) => {
    event.preventDefault();
    setCustomerDetails({
      firstname,
      lastname,
      email,
      phoneNumber,
      address,
      pincode,
      landmark,
    });
    setServiceDetails({
      timestamp: new Date().getTime(),
      description,
    });

    setHasSavedCustomerAndServiceDetails(true);
    handleNext();
  };

  const {
    put,
    isLoading: isLoadingOnCustomerUpdate,
    errorMsg: errorMsgOnCustomerUpdate,
    successMsg: successMsgOnCustomerUpdate,
    responseCode,
  } = useHttp(`https://builders-on-board-be-2.onrender.com/customer`);

  const {
    post,
    isLoading: isLoadingOnCreateService,
    errorMsg: errorMsgOnCreateService,
    successMsg: successMsgOnCreateService,
  } = useHttp(`https://builders-on-board-be-2.onrender.com/services`);

  const createService = async () => {
    const body = {
      timestamp: `${Math.floor(serviceDetails?.timestamp! / 1000)}`,
      description: serviceDetails?.description,
      builder_id: builderSelected?.builder_id,
    };
    const response = await post(body, accessToken);
  };

  const updateCustomerDetails = async () => {
    let body = {};
    if (phoneNumber !== phnNoInitVal) {
      body = { ...body, phn_no: customerDetails!.phoneNumber };
    }
    if (address !== addressInitVal) {
      body = { ...body, address: customerDetails!.address };
    }
    if (pincode !== pincodeInitVal) {
      body = { ...body, pincode: customerDetails!.pincode };
    }
    if (landmark !== landmarkInitVal) {
      body = { ...body, landmark: customerDetails!.landmark };
    }
    if (Object.keys(body).length !== 0) {
      await put(body, accessToken);
      if (responseCode === 200) {
        await createService();
        dispatch(setIsServiceUpdated());
      }
    } else {
      await createService();
      dispatch(setIsServiceUpdated());
    }
  };

  // useEffect(() => {
  //   if (
  //     errorMsgOnCustomerUpdate === "Token has expired" ||
  //     errorMsgOnCreateService === "Token has expired"
  //   ) {
  //     dispatch(removeAuthenticatedUserDetails());
  //   }
  // }, [errorMsgOnCustomerUpdate, errorMsgOnCreateService]);

  useEffect(() => {
    if (successMsgOnCreateService) {
      setTimeout(function () {
        router.replace("/profile");
      }, 3000);
    }
  }, [successMsgOnCreateService]);

  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    //send the details to database after creating an object from customer and worker details
    // console.log(builderSelected);
    // console.log(serviceDetails);
    if (!isExpired(accessToken!)) {
      updateCustomerDetails();
    } else if (refreshToken && !isExpired(refreshToken)) {
      router.replace("/session-expired");
    } else {
      dispatch(removeAuthenticatedUserDetails());
    }
  };

  return (
    <div className={classes["service-page"]}>
      {<UnAuth />}
      {isLoadingOnCustomerUpdate ||
        (isLoadingOnCreateService && (
          <Backdrop>
            <Loader />
          </Backdrop>
        ))}

      {successMsgOnCustomerUpdate && (
        <Snackbar message={successMsgOnCustomerUpdate} />
      )}

      {errorMsgOnCustomerUpdate &&
        errorMsgOnCustomerUpdate !== "Token has expired" && (
          <Snackbar message={errorMsgOnCustomerUpdate} />
        )}

      {successMsgOnCreateService && (
        <Snackbar message={successMsgOnCreateService} />
      )}

      {errorMsgOnCreateService &&
        errorMsgOnCreateService !== "Token has expired" && (
          <Snackbar message={errorMsgOnCreateService} />
        )}

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
          hasSaved={hasSavedCustomerAndServiceDetails}
          shouldRenderSubmissionStep={builderSelected !== null}
          submitHandler={submitHandler}
        />
      </div>
      <div className={classes["service-page-right-section"]}>
        {activeStep === 1 && (
          <form
            className={classes["service-form"]}
            onSubmit={saveCustomerAndServiceDetails}
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
                    value={firstname!}
                    isDiabled={true}
                  ></Input>
                </div>
                <div className={classes.container}>
                  <label className={classes.label}>
                    Last Name <span className={classes.mandatory}>*</span>
                  </label>
                  <Input type="text" value={lastname!} isDiabled={true}></Input>
                </div>
              </div>
              <div className={classes["fields-container"]}>
                <div className={classes.container}>
                  <label className={classes.label}>
                    Email <span className={classes.mandatory}>*</span>
                  </label>
                  <Input type="text" value={email!} isDiabled={true}></Input>
                </div>
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
                phoneNumberHasError ||
                addressHasError ||
                pincodeHasError ||
                landmarkHasError ||
                description.trim().length < 20
              }
            ></input>
          </form>
        )}

        {activeStep === 2 && (
          <CategorySegment
            serviceType={serviceType}
            pincode={pincode}
            selectedBuilder={builderSelected}
            saveBuilder={saveBuilder}
          />
        )}

        {activeStep === 3 && (
          <ServiceDetails
            details={{ customerDetails, serviceDetails, builderSelected }}
          />
        )}
      </div>
    </div>
  );
}

export default ServicesPage;
