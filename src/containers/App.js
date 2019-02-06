import React, { Component } from 'react';

//redux
import { connect } from 'react-redux'

//styles
import '../styles/App.css';

//Actions
import { requestAPIResponse } from '../actions/apiActions'
import { removeFromMylist, addToMylist } from '../actions/userActions'

class App extends Component {

    componentDidMount() {
        this.props.requestAPIResponse();
        this.hoverMessage = 'Remove';
    }

    handleRemoveFromMyList(removeItem) {
        let newMyList = []
        let { recommendations, mylist } = this.props;
        mylist.forEach((eachItem) => {
            if (removeItem.id !== eachItem.id) {
                newMyList.push(eachItem)
            } else {
                recommendations.push(eachItem)
            }
        })

        this.setState({
            mylist: newMyList
        })
    }

    handleAddItemToMyList(addItem) {
        let newRecommendation = []
        let { recommendations, mylist } = this.props
        recommendations.forEach((eachItem) => {
            if (addItem.id !== eachItem.id) {
                newRecommendation.push(eachItem)
            } else {
                mylist.push(eachItem)
            }

            this.setState({
                recommendations: newRecommendation,
                mylist
            })
        })
    }

    getList(listType) {
        switch (listType) {
            case 'my_list':
                if (this.props.mylist) {
                    return this.props.mylist.map((eachItem, i) => {
                        return (
                            <div className='list-cont' key={eachItem.id}>
                                <div className='thumbnail-cont'>
                                    <img src={eachItem.img}  alt="movie icon" className='thumbnail' />
                                    <button className='btn' onClick={() => this.props.removeFromMylist(eachItem)}> Remove </button>
                                </div>
                            </div>
                        )
                    });
                } else {
                    return <div>
                        {
                            <span className='no-items-text'>Try adding few items to show up on list</span>
                        }
                    </div>
                }
            case 'recommend':
                if (this.props.mylist) {
                    return this.props.recommendations.map((eachItem, i) => {
                        return (
                            <div className='list-cont' key={eachItem.id}>
                                <div className='thumbnail-cont'>
                                    <img src={eachItem.img}  alt="movie icon" className='thumbnail' />
                                    <button className='btn' onClick={() => this.props.addToMylist(eachItem)}> Add </button>
                                </div>
                            </div>
                        )
                    })
                } else {
                    return <div>
                        {
                            <span className='no-items-text'> That is all the recommendations we have for you</span>
                        }
                    </div>
                }
            default:
                break;
        }
    }


    render() {
        return (
            <div className="App">
                <div>
                    <img className='netflix-txt' alt="Application Logo" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2000px-Netflix_2015_logo.svg.png"} />
                </div>
                <div className='mylistMargin'>
                    <span className='header-text'>My List</span>
                </div>
                <div className='main-list-cont'>
                    {

                        this.getList('my_list')
                    }
                </div>

                <div className='header-text'>
                    <span className='header-text'>Recommendations</span>
                </div>
                <div className='main-list-cont'>
                    {
                        this.getList('recommend')
                    }
                </div>
                <div className='list-titles'>
                <ul>
                {this.props.mylist.map((item) => <li>{item.title}</li>)}
                </ul>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        requestAPIResponse: () => dispatch(requestAPIResponse()),
        addToMylist: (addMovie) => dispatch(addToMylist(addMovie)),
        removeFromMylist: (removeMovie) => dispatch(removeFromMylist(removeMovie)),
    }
}

function mapStateToProps(state) {
    return {
        mylist: state.moviesReducer.mylist,
        recommendations: state.moviesReducer.recommendations
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
