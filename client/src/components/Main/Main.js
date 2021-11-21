import Auth from "../Auth/Auth";
import ErrorPage from "../ErrorPage/ErrorPage";
import { Routes, Route } from "react-router-dom";
import withErrorApp from "../hoc/withErrorApp";
import TasksContainer from "../Task/TasksContainer";
import ButtonGoBack from "../ErrorPage/ButtonGoBack";
import ButtonGoHome from "../ErrorPage/ButtonGoHome";
import EditUser from "../User/EditUser"

function Main() {
  return (
      <Routes>
        <Route path="/" element={<TasksContainer />} />
        <Route path="/change-password" element={<EditUser pass />} />
        <Route path="/delete-user" element={<EditUser />} />
        <Route path="/signin" element={<Auth sign />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="*" element={<ErrorPage error={"ERROR 404"} text={"PAGE NOT FOUND"}>
            <ButtonGoBack/>
            <ButtonGoHome/>
          </ErrorPage>
      
      } />
      </Routes>
  );
}

export default withErrorApp(Main);
