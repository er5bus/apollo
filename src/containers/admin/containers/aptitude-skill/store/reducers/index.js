import { ACTIONS } from "./../constants"


const initialState = { 
  aptitudeSkills: [], 
  aptitudeSkill: {}, 
  totalSize: 0,
  isFetching: false, 
  isLoading: false,
  hasMore: true, 
  success: {
    isDeactivated: false,
    isActivated: false,
    isCreated: false,
    isUpdated: false,
  },
  error: null
}


export default (state = initialState , action) => {
  const { payload, type } = action
  switch (type) {

    case ACTIONS.CLEAR_APTITUDE_SKILL : {
      return { ...state, success: initialState.success, error: null, isFetching: false, isLoading: false }
    }

    case ACTIONS.FETCH_APTITUDE_SKILLS_INIT : {
      return { ...state, isFetching: true, error: null }
    }
    case ACTIONS.FETCH_APTITUDE_SKILLS_SUCCEDED : {
      const { count, results } = payload
      return { ...state, totalSize: count, aptitudeSkills: results, isFetching: false, error: null }
    }
    case ACTIONS.FETCH_APTITUDE_SKILLS_FAILED : {
      return { ...state, isFetching: false, error: payload }
    }

    case ACTIONS.CREATE_APTITUDE_SKILL_INIT : {
      return { ...state, isLoading: true, error: null, success: initialState.success }
    }
    case ACTIONS.CREATE_APTITUDE_SKILL_SUCCEDED : {
      return { ...state, success: { ...state.success, isCreated: true }, isLoading: false, error: null }
    }
    case ACTIONS.CREATE_APTITUDE_SKILL_FAILED : {
      return { ...state, error: payload, isLoading: false }
    }

    case ACTIONS.EDIT_APTITUDE_SKILL_INIT : {      
      return { ...state, isLoading: true, error: null, success: initialState.success }
    }
    case ACTIONS.EDIT_APTITUDE_SKILL_SUCCEDED : {
      return { ...state, success: { ...state.success, isUpdated: true }, isLoading: false, error: null }
    }
    case ACTIONS.EDIT_APTITUDE_SKILL_FAILED : {
      return { ...state, error: payload, isLoading: false }
    }
 
    case ACTIONS.FETCH_APTITUDE_SKILL_INIT : {
      return { ...state, isLoading: true, success: initialState.success, aptitudeSkill: null, error: null }
    }
    case ACTIONS.FETCH_APTITUDE_SKILL_SUCCEDED : {
      return { ...state, aptitudeSkill: payload, isLoading: false, error: null }
    }
    case ACTIONS.FETCH_APTITUDE_SKILL_FAILED : {
      return { ...state, isLoading: false, error: payload }
    }

    case ACTIONS.DEACTIVATE_APTITUDE_SKILL_INIT : {
      return { ...state, isLoading: true, success: initialState.success, error: null }
    }
    case ACTIONS.DEACTIVATE_APTITUDE_SKILL_SUCCEDED : {
      return { ...state, success: { ...state.success, isDeactivated: true }, isLoading: false, error: null }
    }
    case ACTIONS.DEACTIVATE_APTITUDE_SKILL_FAILED : {
      return { ...state, isLoading: false, error: payload }
    }

    case ACTIONS.ACTIVATE_APTITUDE_SKILL_INIT : { 
      return { ...state, isLoading: true, success: initialState.success, error: null }
    }
    case ACTIONS.ACTIVATE_APTITUDE_SKILL_SUCCEDED : {
      return { ...state, success: { ...state.success, isActivated: true }, isLoading: false, error: null }
    }
    case ACTIONS.ACTIVATE_APTITUDE_SKILL_FAILED : {
      return { ...state, isLoading: false, error: payload }
    }
    default: {
      return state
    }
  }
}
