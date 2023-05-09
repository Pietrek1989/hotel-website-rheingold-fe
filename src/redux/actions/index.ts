import { Offer, ReservationSave, User } from "../../types and interfaces";

export const UPDATE_TOTAL_PRICE = "UPDATE_TOTAL_PRICE";
export const UPDATE_SELECTED_OFFER = "UPDATE_SELECTED_OFFER";
export const UPDATE_NEW_RESERVATION = "UPDATE_NEW_RESERVATION";
export const GET_USER_DATA_REQUEST = "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_FAILURE = "GET_USER_DATA_FAILURE";
export const REFRESH_ACCESS_TOKEN = "REFRESH_ACCESS_TOKEN";

export const updateTotalPrice = (price: number) => {
  return {
    type: "UPDATE_TOTAL_PRICE",
    payload: price,
  };
};

export const updateSelectedOffer = (offer: Offer) => {
  return {
    type: "UPDATE_SELECTED_OFFER",
    payload: offer,
  };
};
export const updateNewReservation = (reservation: ReservationSave) => {
  return {
    type: "UPDATE_NEW_RESERVATION",
    payload: reservation,
  };
};





export const getUserDataRequest = () => ({
  type: GET_USER_DATA_REQUEST,
});

export const getUserDataSuccess = (userData: User) => ({
  type: GET_USER_DATA_SUCCESS,
  payload: userData,
});

export const getUserDataFailure = (error: Error) => ({
  type: GET_USER_DATA_FAILURE,
  payload: error,
});


export const getUserData = () => async (dispatch: any) => {
  dispatch(getUserDataRequest());
  try {
    const res = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    });

    if (res.ok) {
      const userData = (await res.json()) as User;
      dispatch(getUserDataSuccess(userData));
    } else if (res.status === 401) {
      // access token has expired or is invalid, refresh access token
      await refreshAccessToken();

      // try to get user data again
      const newAccessToken = localStorage.getItem("accessToken");
      console.log("the updated access", newAccessToken);
      if (newAccessToken) {
        const response = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          }
        );
        if (response.ok) {
          const userData = (await response.json()) as User;
          dispatch(getUserDataSuccess(userData));
        }
      }
      // if we still can't get user data, redirect to login page
      dispatch(getUserDataFailure(new Error("Failed to get user data")));
    } else {
      dispatch(getUserDataFailure(new Error("Failed to get user data")));
    }
  } catch (error) {
    dispatch(getUserDataFailure(error as Error));
  }
};



export const refreshAccessToken = () => async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  console.log("refresh in func", refreshToken);
  const response = await fetch("http://localhost:3001/users/session/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentRefreshToken: refreshToken,
    }),
  });
  console.log(response.status);
  if (response.ok) {
    console.log("response", response);
    const { accessToken, refreshToken } = await response.json();
    console.log("the new refresh token", refreshToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } else if (response.status === 401) {
    // refresh token has expired, log user out and redirect to login page
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    window.location.href = "/";
  } else {
    console.log("last error");
  }
};