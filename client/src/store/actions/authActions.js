import axios from '../../axios-users';
import jwt_decode from 'jwt-decode';

import {
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
} from './actionTypes';
import setAuthToken from '../../utils/validation/setAuthToken';

export const registerUser = (userData, history) => {
  console.log("CHECKING",userData, history )
  const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

  // const body = {email, password }

  // const res = await axios.post("/api/v1/users/login",
  //     body,
  //     config
  // )

  return dispatch => {
    axios
      .post('/users/register',JSON.stringify(userData), config)
      .then(res => {
        history.push('/');
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };
};

export const loginUser = userData => {
  const config1 = {
    headers: {
        'Content-Type': 'application/json'
    }
}
  console.log("USERS DATA", userData)
  return dispatch => {
    axios
      .post('/users/login', userData, config1)
      .then(res => {
        const { token } = res.data;
        console.log("TOKEN", token)
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        /*
                decoded =
                {email: "manish.thedarknight@gmail.com"
                exp: 1539597676
                iat: 1539561676
                userId: "5bc3c9320d57812a80da364b
                }"
                * */
        dispatch(setCurrentUser(decoded));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };
};

export const updateUser = userData => {
  const config3 = {
    headers: {
        'Content-Type': 'application/json'
    }
  }

  console.log("userData", userData)
  const id = userData.id
  delete userData.id

  return dispatch => {
    axios
      .patch(`/users/update/${id}`,JSON.stringify(userData), config3)
      .then(res => {
        // history.push('/');
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

export const logoutUser = () => {
  return dispatch => {
    // remove token from localStorage
    localStorage.removeItem('jwtToken');
    // remove auth header for future requests
    setAuthToken(false);
    // set current user to empty obj which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };
};
