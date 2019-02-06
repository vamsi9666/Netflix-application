import { ADD_TO_MY_LIST, REMOVE_FROM_MY_LIST } from '../constants/userContants'

export function addToMylist(movie) {
  return {
    type: ADD_TO_MY_LIST,
    movie
  };
}
export function removeFromMylist(movie) {
  return {
    type: REMOVE_FROM_MY_LIST,
    movie
  };
}
