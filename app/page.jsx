import Adventure from "@/components/home/adventure";
import Email from "@/components/home/email";
import Hallmark from "@/components/home/hallmark";
import Hero from "@/components/home/hero";
import Welcome from "@/components/home/welcome";
import Featured from "@/components/home/featured";
import Spotlight from "@/components/home/spotlight";
import Latest from "@/components/home/latest";

const Home = () => {
  return (
    <>
      <Hero />
      <Adventure />
      <Welcome />
      <Featured />
      <Hallmark />
      <Spotlight />
      <Latest />
      <Email />
    </>
  );
};
export default Home;
