import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";
import { actionAuthUserAsync } from "../../store/user_reducer";
import Preloader from "../UI/Preloader";


const mapStatetoProps = (state) => ({
  isAuth: state.userReducer.isAuth,
  isFetching: state.userReducer.isFetchingPage,
});


function withAuthRedirect(Component,redirect) {
  class Redirect extends React.Component {
    componentDidMount() {
        if(!this.props.isAuth) { 
            this.props.actionAuthUserAsync();  
        }
    }

    render() {

      if(redirect && !this.props.isAuth) {
        return null
      }

      if(this.props.isFetching) {
        return <Preloader/>
      } else if (this.props.isAuth) {
        return <Component {...this.props}/>
      } else if (!this.props.isAuth) {
        return <Navigate to="/signin" />
      }
    }
  }

  return connect(mapStatetoProps, { actionAuthUserAsync })(Redirect);
}

export default withAuthRedirect;
