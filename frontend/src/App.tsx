import Body from "./components/Landing-body";
import Navbar from "./components/Navbar";
import Features from "./components/FeaturesComp";
import Footer from "./components/footer";
import SignIn from "./components/Signin/SignInCard";
function App() {
  return (
    <div className=" flex flex-col min-h-screen bg-black">
      <SignIn />
    </div>
  );
}

export default App;
