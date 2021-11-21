import { connect } from "react-redux";
import ErrorPage from "../ErrorPage/ErrorPage"
import ButtonReload from "../ErrorPage/ButtonReload"

const mapDispatchToProps = ({appReducer}) => ({
    error : appReducer.error
})

const withErrorApp = (Component) => connect(mapDispatchToProps)((props) => {

    return (
        props.error?
        <ErrorPage text={"INTERNAL SERVER ERROR"} error={"ERROR 500"}>
            <ButtonReload/>
        </ErrorPage>:
        <Component {...props}/>
    )

})

export default withErrorApp