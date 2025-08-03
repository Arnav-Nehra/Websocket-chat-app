import Features from "./FeaturesComp";
import Footer from "./FooterPage";
import Body from "./Landing-body";
import Navbar from "./Navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar className="mt-4" />
      <Body />
      <Features />
      <Footer />
    </>
  );
}
