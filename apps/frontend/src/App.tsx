import { Route, Routes } from "react-router";
import SignIn from "./components/Signin/SignInCard";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/Signin/SignUpCard";
import ChatNav from "./components/ChatInterface/Navbar";
function App() {
  return (
    <>
    <ChatNav/>
      {/* <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes> */}
    </>
  );
}

export default App;
