import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main";
import Container from "@mui/material/Container";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Container maxWidth={"xl"}>
          <Main />
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
export {store}
