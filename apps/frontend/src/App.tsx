import { Route, Routes } from "react-router";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/Signin/SignInCard";
import SignUp from "./components/Signin/SignUpCard";
import ChatNav from "./components/ChatInterface/Navbar";
import ChatBody from "./components/ChatInterface/ChatInter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/chat" element={<ChatNav />} />
        <Route path="/chatbody" element={<ChatBody />} />
      </Routes>
    </>
  );
}

export default App;
