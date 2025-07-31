import Body from "./components/Landing-body";
import Navbar from "./components/Navbar";
import Features from "./components/FeaturesComp";
import Footer from "./components/footer";
function App() {
  return (
    <div className=" flex flex-col min-h-screen bg-black">
      <Navbar className="mt-4"></Navbar>
      <Body />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
