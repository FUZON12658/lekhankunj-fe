import Choose from "@/components/home/adventure"
import Email from "@/components/home/email"
import Hallmark from "@/components/home/hallmark"
import Footer from "@/components/home/footer"
import Header from "@/components/home/header"
import Hero from "@/components/home/hero"
import Welcome from "@/components/home/welcome"
import Featured from "@/components/home/featured"
import Spotlight from "@/components/home/spotlight"
import Latest from "@/components/home/latest"

const Home = () => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div>
        <Hero />
        <Choose />
        <Welcome />
        <Featured />
        <Hallmark />
        <Spotlight />
        <Latest />
        <Email />
      </div>
      <Footer />
    </div>
  )
}
export default Home