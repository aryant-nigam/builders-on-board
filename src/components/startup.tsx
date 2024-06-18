"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCookies } from "react-cookie";
import {
  setAuthenticatedUserDetails,
  setAuthenticatedUserPersonalDetails,
  removeAuthenticatedUserDetails,
} from "@/store/features/auth-slice";
import { initialiseServices } from "@/store/features/services-slice";
import { decodeToken, isExpired } from "react-jwt";
import { DecodedToken } from "@/store/features/auth-slice";
import useHttp from "@/hooks/use-http";
import { useEffect } from "react";
import Backdrop from "./backdrop";
import Loader from "./loader";

const transformDate = (date: Date) => {
  const day = date.toLocaleString("en-IN", { day: "2-digit" });
  const month = date.toLocaleString("en-IN", { month: "long" });
  const year = date.getFullYear();
  return `${day} - ${month} - ${year}`;
};

const StartUp = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const userPersonalInformation = useAppSelector(
    (state) => state.auth.userPersonalInformation
  );
  const id = user?.id;
  const jwt_token = useAppSelector((state) => state.auth.accessToken);
  console.log("user", user);
  const {
    refresh,
    isLoading: isLoadingOnRefresh,
    errorMsg: errorMessageOnRefresh,
  } = useHttp("https://builders-on-board-be-2.onrender.com/refresh");

  const {
    get: getCustomerDetails,
    isLoading: isLoadingOnGetCustomerDetails,
    errorMsg: errorMessageOnGetCustomerDetails,
  } = useHttp(`https://builders-on-board-be-2.onrender.com/customer?id=${id}`);

  const {
    get: getServices,
    isLoading: isLoadingOnGetServices,
    successMsg: successMsgOnGetServices,
    errorMsg: errorMsgOnGetServices,
  } = useHttp(
    `https://builders-on-board-be-2.onrender.com/services?customer_id=${id}`
  );

  //simply fetch data in cookies or refresh token login
  useEffect(() => {
    const loginWithRefreshToken = async (refreshToken: string) => {
      console.log(refreshToken);
      const token = await refresh(refreshToken);
      console.log("with refresh", token);

      if (token) {
        setCookie(
          "user",
          JSON.stringify({
            accessToken: token.access_token,
            refreshToken: null,
          }),
          {
            path: "/",
            sameSite: true,
            secure: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          }
        );

        const userAccessToken: DecodedToken = decodeToken(token.access_token)!;

        dispatch(
          setAuthenticatedUserDetails({
            user: userAccessToken.sub,
            accessToken: token.access_token,
            refreshToken: null,
          })
        );
      } else if (errorMessageOnRefresh) {
        removeCookie("user");
      }
    };

    /*if auth state user is not ininitalised  */
    if (cookie.user && !user) {
      console.log("screen is refreshed or token expired: triggering re-login");
      // first fetch the cookies from the browser
      console.log("fetching user from cookies", cookie);
      const userAccessToken: DecodedToken = decodeToken(
        cookie.user.accessToken
      )!;

      if (!isExpired(cookie.user.accessToken)) {
        //if browser cookie's access token has not expired the ininitalise the auth slice
        console.log("not expired");
        dispatch(
          setAuthenticatedUserDetails({
            user: userAccessToken.sub,
            accessToken: cookie.user.accessToken,
            refreshToken: cookie.user.refreshToken,
          })
        );
      } else if (
        cookie.user.refreshToken &&
        !isExpired(cookie.user.refreshToken)
      ) {
        // if browser cookie's refresh token has not expired then regain the access with refresh token and
        // initialise the auth slice
        console.log("expired");
        loginWithRefreshToken(cookie.user.refreshToken);
      } else {
        //if neither access token and refresh token is valid then cookies should be removed and so does the user details
        removeCookie("user");
        dispatch(removeAuthenticatedUserDetails());
        console.log("expired login again");
      }
    } else {
      console.log("no cookies found or user exists in auth slice");
    }
  }, [user]);

  useEffect(() => {
    // this effect will only be triggered when there exists a user in auth slice
    if (id && jwt_token) {
      const fetchUserData = async () => {
        const personal_data = await getCustomerDetails(jwt_token);
        console.log("personal details", personal_data);
        if (personal_data) {
          dispatch(
            setAuthenticatedUserPersonalDetails({
              firstname: personal_data.firstname,
              lastname: personal_data.lastname,
              email: personal_data.email,
              address: personal_data.address,
              landmark: personal_data.landmark,
              phoneNumber: personal_data.phn_no,
              pincode: personal_data.pincode,
            })
          );
        }
      };
      if (isExpired(jwt_token)) dispatch(removeAuthenticatedUserDetails());
      else fetchUserData();
    }

    if (id && jwt_token) {
      const fetchServiceList = async () => {
        const services = await getServices(jwt_token);
        console.log("services", services);
        if (services.length > 0) {
          const extractedServiceList = services.map((service: any) => {
            return {
              serviceId: service.service_id,
              serviceType: service.service_type,
              bookingDate: transformDate(new Date(service.timestamp * 1000)),
              description: service.description,
              address: service.customer_address,
              fee: service.builder_fee,
              isActive: service.is_active,
              isCancelled: service.is_cancelled,
              builderName: `${service.builder_first_name} ${service.builder_last_name}`,
              builderPhnNo: service.builder_phn_no,
              builderEmail: service.builders_email,
              customerFeedback: service.customer_feedback,
              customerStarRating: service.customer_star_rating,
            };
          });
          dispatch(
            initialiseServices({
              servicesList: services.length > 0 ? extractedServiceList : [],
            })
          );
        }
      };
      if (isExpired(jwt_token)) dispatch(removeAuthenticatedUserDetails());
      else {
        fetchServiceList();
      }
    }
  }, [user, id, jwt_token]);

  return (
    <>
      {(isLoadingOnRefresh || isLoadingOnGetCustomerDetails) && (
        <Backdrop>
          <Loader />
        </Backdrop>
      )}
    </>
  );
};

export default StartUp;
