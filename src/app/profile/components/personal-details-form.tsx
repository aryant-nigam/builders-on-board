import classes from "./personal-details-form.module.css";
import detailsFieldClasses from "./details-field.module.css";
import DetailsField from "./details-field";
import useInput from "@/hooks/use-input";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  removeAuthenticatedUserDetails,
  setAuthenticatedUserDetails,
  setAuthenticatedUserPersonalDetails,
} from "@/store/features/auth-slice";
import { useEffect, useState } from "react";
import useHttp from "@/hooks/use-http";
import { isExpired } from "react-jwt";
import Loader from "@/components/loader";
import Snackbar from "@/components/snackbar";
import { serviceTypesList } from "@/utils";
import { useRouter } from "next/navigation";
import Backdrop from "@/components/backdrop";

const PersonalDetailsForm = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);
  const customerId = useAppSelector((state) => state.auth.user?.id);
  const isBuilder = useAppSelector((state) => state.auth.user?.is_builder);
  const [isEditButtonClicked, setIsEditButtonClicked] =
    useState<boolean>(false);

  const firstnameInitVal = useAppSelector(
    (state) => state.auth.userPersonalInformation?.firstname
  );
  const lastnameInitVal = useAppSelector(
    (state) => state.auth.userPersonalInformation?.lastname
  );
  const phnNoInitVal = useAppSelector(
    (state) => state.auth.userPersonalInformation?.phoneNumber
  );
  const addressInitVal = useAppSelector(
    (state) => state.auth.userPersonalInformation?.address
  );

  const pincodeInitVal = useAppSelector(
    (state) => state.auth.userPersonalInformation?.pincode
  );

  const landmarkInitVal = useAppSelector(
    (state) => state.auth.userPersonalInformation?.landmark
  );

  const feeInitVal = useAppSelector(
    (state) => state.auth.userPersonalInformation?.fee
  );

  const serviceTypeInitVal = useAppSelector(
    (state) => state.auth.userPersonalInformation?.serviceType
  );

  const [serviceType, setServiceType] = useState(serviceTypeInitVal);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (firstnameInitVal) initializeFirstname(firstnameInitVal);
    if (lastnameInitVal) initializeLastname(lastnameInitVal);
    if (phnNoInitVal) initializePhoneNumber(phnNoInitVal);
    if (addressInitVal) initializeAddress(addressInitVal);
    if (pincodeInitVal) initializePincode(pincodeInitVal);
    if (landmarkInitVal) initializeLandmark(landmarkInitVal);
    if (feeInitVal) initializeFee(feeInitVal);
    if (serviceTypeInitVal) setServiceType(serviceTypeInitVal);
  }, [
    firstnameInitVal,
    lastnameInitVal,
    phnNoInitVal,
    addressInitVal,
    pincodeInitVal,
    landmarkInitVal,
    feeInitVal,
    serviceTypeInitVal,
  ]);

  const firstnameValidator = (firstname: string): boolean => {
    const pattern = /^[a-zA-Z]+$/;
    return pattern.test(firstname);
  };

  const lastnameValidator = (lastname: string): boolean => {
    const pattern = /^[a-zA-Z]*$/;
    return pattern.test(lastname);
  };

  const phoneNumberValidator = (phnNo: string): boolean => {
    return (
      phnNo.trim().length === 10 && ["9", "8", "7", "6"].includes(phnNo[0])
    );
  };

  const pincodeValidator = (pincode: string): boolean => {
    return pincode.trim().length == 6;
  };

  const addressValidator = (address: string): boolean => {
    return address.trim().length > 10;
  };

  const landmarkValidator = (landmark: string): boolean => {
    return landmark.trim().length >= 0;
  };

  const feeValidator = (fee: number) => {
    return fee > 0;
  };

  const {
    value: firstname,
    isValid: isFirstnameValid,
    hasError: firstnameHasError,
    updateValueOnKeyStroke: updateFirstnameOnKeystroke,
    updateIsTouched: updateIsFirstnameTouched,
    reset: resetFirstname,
    initialize: initializeFirstname,
  } = useInput({
    validator: firstnameValidator,
  });

  const {
    value: lastname,
    isValid: isLastnameValid,
    hasError: lastnameHasError,
    updateValueOnKeyStroke: updateLastnameOnKeystroke,
    updateIsTouched: updateIsLastnameTouched,
    reset: resetLastname,
    initialize: initializeLastname,
  } = useInput({
    validator: lastnameValidator,
  });

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
    value: pincode,
    isValid: isPincodeValid,
    hasError: pincodeHasError,
    updateValueOnKeyStroke: updatePincodeOnKeystroke,
    updateIsTouched: updateIsPincodeTouched,
    reset: resetPincode,
    initialize: initializePincode,
  } = useInput({
    validator: pincodeValidator,
  });

  const {
    value: address,
    isValid: isAddressValid,
    hasError: addressHasError,
    updateValueOnKeyStroke: updateAddressOnKeystroke,
    updateIsTouched: updateIsAddressTouched,
    reset: resetAddress,
    initialize: initializeAddress,
  } = useInput({
    validator: addressValidator,
  });

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

  const {
    value: fee,
    isValid: isFeeValid,
    hasError: feeHasError,
    updateValueOnKeyStroke: updateFeeOnKeystroke,
    updateIsTouched: updateIsFeeTouched,
    reset: resetFee,
    initialize: initializeFee,
  } = useInput({
    validator: feeValidator,
  });

  const {
    put: putCustomer,
    isLoading: isLoadingOnCustomerUpdate,
    errorMsg: errorMsgOnCustomerUpdate,
    successMsg: successMsgOnCustomerUpdate,
    responseCode,
  } = useHttp(`https://builders-on-board-be-2.onrender.com/customer`);

  const {
    put: putBuilder,
    isLoading: isLoadingOnBuilderUpdate,
    errorMsg: errorMsgOnBuilderUpdate,
    successMsg: successMsgOnBuilderUpdate,
    // responseCode,
  } = useHttp(`https://builders-on-board-be-2.onrender.com/builder?`);

  const serviceChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setServiceType(event.target.value);
  };

  const saveChangesHandler = async () => {
    let body = {};
    let personalDetails = {};
    if (firstname !== firstnameInitVal) {
      body = { ...body, firstname: firstname };
      personalDetails = { ...personalDetails, firstname: firstname };
    }
    if (lastname !== lastnameInitVal) {
      body = { ...body, lastname: lastname };
      personalDetails = { ...personalDetails, lastname: lastname };
    }
    if (phoneNumber !== phnNoInitVal) {
      body = { ...body, phn_no: phoneNumber };
      personalDetails = { ...personalDetails, phoneNumber: phoneNumber };
    }
    if (pincode !== pincodeInitVal) {
      body = { ...body, pincode: pincode };
      personalDetails = { ...personalDetails, pincode: pincode };
    }
    if (!isBuilder) {
      if (address !== addressInitVal) {
        body = { ...body, address: address };
        personalDetails = { ...personalDetails, address: address };
      }
      if (landmark !== landmarkInitVal) {
        body = { ...body, landmark: landmark };
        personalDetails = { ...personalDetails, landmark: landmark };
      }
    } else {
      if (parseInt(fee) != feeInitVal) {
        body = { ...body, fee: fee };
        personalDetails = { ...personalDetails, fee: fee };
      }
      if (serviceType != serviceTypeInitVal) {
        body = { ...body, service_type: serviceType };
        personalDetails = { ...personalDetails, serviceType: serviceType };
      }
    }

    if (Object.keys(body).length !== 0) {
      let response;
      if (isBuilder) {
        response = await putBuilder(body, accessToken);
      } else {
        response = await putCustomer(body, accessToken);
      }

      if (response === 200) {
        console.log("updating personal details");
        if (Object.keys(personalDetails).length !== 0)
          dispatch(setAuthenticatedUserPersonalDetails({ ...personalDetails }));
      }
    }

    // if (accessToken && isExpired(accessToken)) {
    //   dispatch(removeAuthenticatedUserDetails());
    // } else {
    //   const response = await putCustomer(body, accessToken);
    //   console.log("done in be", response);
    //   if (response === 200) {
    //     console.log("updating personal details");
    //     if (Object.keys(personalDetails).length !== 0)
    //       dispatch(setAuthenticatedUserPersonalDetails({ ...personalDetails }));
    //   }
    // }
  };

  const router = useRouter();
  const onSaveChanges = () => {
    if (!isExpired(accessToken!)) {
      saveChangesHandler();
    } else if (
      isExpired(accessToken!) &&
      refreshToken &&
      !isExpired(refreshToken)
    ) {
      router.replace("/session-expired");
    } else {
      dispatch(removeAuthenticatedUserDetails());
    }
  };

  return (
    <div className={classes["personal-details-form"]}>
      {(isLoadingOnCustomerUpdate || isLoadingOnBuilderUpdate) && (
        <Backdrop>
          <Loader />
        </Backdrop>
      )}
      {(successMsgOnCustomerUpdate || successMsgOnBuilderUpdate) && (
        <Snackbar
          message={successMsgOnCustomerUpdate || successMsgOnBuilderUpdate}
        ></Snackbar>
      )}
      {(errorMsgOnCustomerUpdate || errorMsgOnBuilderUpdate) && (
        <Snackbar
          message={errorMsgOnCustomerUpdate || errorMsgOnBuilderUpdate}
        ></Snackbar>
      )}
      <DetailsField
        label="First name"
        type="text"
        value={firstname}
        valueHasError={firstnameHasError}
        placeholder="First Name"
        errorMsg="Invalid first name"
        updateValueOnKeyStroke={updateFirstnameOnKeystroke}
        updateIsTouched={updateIsFirstnameTouched}
        className={classes.input}
      ></DetailsField>
      <DetailsField
        label="Last name"
        type="text"
        value={lastname}
        valueHasError={lastnameHasError}
        placeholder="Last Name"
        errorMsg="Invalid last name"
        updateValueOnKeyStroke={updateLastnameOnKeystroke}
        updateIsTouched={updateIsLastnameTouched}
        className={classes.input}
      ></DetailsField>
      <DetailsField
        label="Phone no"
        type="text"
        value={phoneNumber}
        valueHasError={phoneNumberHasError}
        placeholder="Phone Number"
        errorMsg="Invalid phone number"
        updateValueOnKeyStroke={updatePhoneNumberOnKeystroke}
        updateIsTouched={updateIsPhoneNumberTouched}
        className={classes.input}
      ></DetailsField>
      <DetailsField
        label="Pincode"
        type="text"
        value={pincode}
        valueHasError={pincodeHasError}
        placeholder="Pincode"
        errorMsg="Invalid pincode"
        updateValueOnKeyStroke={updatePincodeOnKeystroke}
        updateIsTouched={updateIsPincodeTouched}
        className={classes.input}
      ></DetailsField>
      {!isBuilder && (
        <DetailsField
          label="Address"
          type="text"
          value={address}
          valueHasError={addressHasError}
          placeholder="Address"
          errorMsg="Invalid address"
          updateValueOnKeyStroke={updateAddressOnKeystroke}
          updateIsTouched={updateIsAddressTouched}
          className={classes.input}
        ></DetailsField>
      )}
      {!isBuilder && (
        <DetailsField
          label="Landmark"
          type="text"
          value={landmark}
          valueHasError={landmarkHasError}
          placeholder="Landmark"
          errorMsg="Invalid landmark"
          updateValueOnKeyStroke={updateLandmarkOnKeystroke}
          updateIsTouched={updateIsLandmarkTouched}
          className={classes.input}
        ></DetailsField>
      )}

      {isBuilder && (
        <DetailsField
          label="Fee"
          type="number"
          value={fee}
          valueHasError={feeHasError}
          placeholder="Fee"
          errorMsg="Invalid fee"
          updateValueOnKeyStroke={updateFeeOnKeystroke}
          updateIsTouched={updateIsFeeTouched}
          className={classes.input}
        ></DetailsField>
      )}

      {isBuilder && (
        <div className={classes["fields-container"]}>
          <h2 className={classes["services-label"]}>Service Type</h2>
          <select
            className={classes["services"]}
            onChange={serviceChangeHandler}
            defaultValue={serviceType || ""}
            disabled={!isEditButtonClicked}
          >
            {serviceTypesList.map((service, index) => (
              <option
                className={classes["service"]}
                value={service}
                key={index}
              >
                {service}
              </option>
            ))}
          </select>
          <button
            className={classes["edit-btn"]}
            onClick={() => {
              setIsEditButtonClicked(true);
            }}
          >
            <img
              src="edit.png"
              className={detailsFieldClasses["edit-icon"]}
            ></img>
          </button>
        </div>
      )}

      <button className={classes["save-changes-btn"]} onClick={onSaveChanges}>
        Save changes
      </button>
    </div>
  );
};

export default PersonalDetailsForm;
