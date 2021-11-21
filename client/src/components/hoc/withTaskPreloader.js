import { connect } from "react-redux";
import React from "react";
import { actionRequestAllTasksAsync } from "../../store/task_reducer";
import Preloader from "../UI/Preloader";


const mapStatetoProps = (state) => ({
  isFetching: state.taskReducer.isFetchingPage
});


function withTaskPreloader(Component) {
  class Redirect extends React.Component {

    componentDidMount() {
        this.props.actionRequestAllTasksAsync()
    }

    render() {
      return (
        this.props.isFetching?<Preloader />:<Component {...this.props}/>
      )
    }
  }

  return connect(mapStatetoProps, { actionRequestAllTasksAsync })(Redirect);
}

export default withTaskPreloader;
