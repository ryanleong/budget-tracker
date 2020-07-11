import React, {
  createContext, useContext, useReducer, useMemo, useEffect,
} from 'react';
import Router from 'next/router'

import api from '../utils/api'

export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

/**
 * Initial State
 */
export const initialState = {
  user: null,
  isLoadingUser: false,
};

/**
 * Actions
 */
export const SET_USER = 'SET_USER';
export const SET_IS_LOADING = 'SET_IS_LOADING';


/**
 * Reducer
 * @param {Object} state current state
 * @param {Object} action action to execute and its payload
 */
export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return { ...state, user: payload, isLoadingUser: false, };

    case SET_IS_LOADING:
      return { ...state, isLoadingUser: payload };

    default:
      throw new Error('no action type specified');
  }
};

/**
 * Context provider HOC
 * @param {Object} ChildComponent React child component
 */
export default (ChildComponent) => (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    const getUser = async () => {
      dispatch({ type: SET_IS_LOADING, payload: true })
      const user = await api.fetchUser();
      dispatch({ type: SET_USER, payload: !user.error ? user : NOT_AUTHENTICATED });
    }

    if (state.user === null) { getUser() }
  }, [])

  if (state.user === null) {
    return <span>Loading...</span>
  } else if (state.user === NOT_AUTHENTICATED) {
    Router.push('/');
    return null;
  } else {
    return (
      <AuthContext.Provider value={contextValue}>
        <ChildComponent {...props} />
      </AuthContext.Provider>
    );
  }
};
