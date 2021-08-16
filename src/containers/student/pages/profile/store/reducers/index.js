import { ACTIONS } from './../constants'

const initialState = { 
  account: null, 
  isLoading: false, 
  isFetching: false, 
  success: false,
  appointment: null,
  appointments: [],
  appointmentFilterTerm: {},
  error: null 
}


export default (state = initialState, action) => {
  
  const { payload, type } = action
  
  switch (type) {

    case ACTIONS.CLEAR_ERROR : {
      return { ...state, isLoading: false, isFetching: false, success: false, error: null }
    }

    case ACTIONS.FETCH_USER_INIT : {
      return { ...state, isFetching: true, success: false, error: null }
    }
    case ACTIONS.FETCH_USER_SUCCEDED : {
      return { ...state, isFetching: false, account: payload, error: null }
    }
    case ACTIONS.FETCH_USER_FAILED : {
      return { ...state, isFetching: false, success: false, error: payload }
    }
    
    case ACTIONS.CHANGE_PASSWORD_INIT : {
      return { ...state, isLoading: true, error: null, success:false }
    }
    case ACTIONS.CHANGE_PASSWORD_SUCCEDED : {
      return { ...state, isLoading: false, success: true, error: null }
    }
    case ACTIONS.CHANGE_PASSWORD_FAILED : {
      return { ...state, isLoading: false, success: false, error: payload }
    }

    case ACTIONS.UPDATE_ACCOUNT_INFORMATION_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.UPDATE_ACCOUNT_INFORMATION_SUCCEDED : {
      return { ...state, isLoading: false, success: true, account: payload, error: null }
    }
    case ACTIONS.UPDATE_ACCOUNT_INFORMATION_FAILED : {
      return { ...state, isLoading: false, success: false, error: payload }
    }

    case ACTIONS.UPDATE_PERSONAL_INFORMATION_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.UPDATE_PERSONAL_INFORMATION_SUCCEDED : {
      return { ...state, isLoading: false, success: true, account: payload, error: null }
    }
    case ACTIONS.UPDATE_PERSONAL_INFORMATION_FAILED : {
      return { ...state, isLoading: false, success: false, error: payload }
    }

    case ACTIONS.FETCH_APPOINTMENT_INIT: {
      return { ...state, isFetching: true, success: false, appointment: null, error: null }
    }
    case ACTIONS.FETCH_APPOINTMENT_SUCCEDED: {
      return { ...state, appointment: payload, isFetching: false, error: null }
    }
    case ACTIONS.FETCH_APPOINTMENT_FAILED: {
      return { ...state, isFetching: false, error: payload }
    }

    case ACTIONS.FETCH_APPOINTMENTS_INIT: {
      return { ...state, isFetching: true, appointments: [], error: null }
    }
    case ACTIONS.FETCH_APPOINTMENTS_SUCCEDED: {
      return { ...state, appointments: payload, isFetching: false, error: null }
    }
    case ACTIONS.FETCH_APPOINTMENTS_FAILED: {
      return { ...state, isFetching: false, error: payload }
    }

    case ACTIONS.FILTER_APPOINTMENT : {
      return { ...state, appointmentFilterTerm: { ...state.appointmentFilterTerm, ...payload } }
    }
   
    default: {
      return state
    }
  }
}
