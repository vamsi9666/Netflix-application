import { RESPONSE_RECEIVED } from '../constants/apiContants'

export function requestAPIResponse() {
  return dispatch => {
      fetch('https://api.myjson.com/bins/yh53i')
      .then(response=>response.json())
      .then((jsonResponse)=>{
          dispatch(apiResponseReceived(jsonResponse))
      })
  };
}

export function apiResponseReceived(response) {
  return {
    type: RESPONSE_RECEIVED,
    response
  };
}
