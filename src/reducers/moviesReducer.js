const defaultState = {
    mylist: [],
    recommendations: []
}

function moviesReducer(previousState = defaultState, action) {
    switch (action.type) {
        case 'RESPONSE_RECEIVED': {
            const nextState = Object.assign({}, previousState, action.response)
            console.log(nextState)
            return nextState
        }

        case 'ADD_TO_MY_LIST': {
            const currentRecommendations = previousState.recommendations
            const newRecommendations = []
            currentRecommendations.forEach(eachMovie => {
                if (eachMovie.id !== action.movie.id) {
                    newRecommendations.push(eachMovie)
                }
            })
            return Object.assign({},
                previousState,
                {
                    recommendations: newRecommendations,
                    mylist: [...previousState.mylist, action.movie]
                }
            )
        }

        case 'REMOVE_FROM_MY_LIST': {
            const currentMylist = previousState.mylist
            const newMylist = []
            currentMylist.forEach(eachMovie => {
                if (eachMovie.id !== action.movie.id) {
                    newMylist.push(eachMovie)
                }
            })

            return Object.assign({},
                previousState,
                {
                    recommendations: [...previousState.recommendations, action.movie],
                    mylist: newMylist
                }
            )
        }

        default:
            return previousState
    }
}

module.exports = moviesReducer
