
import "../style/Home.css"
import Header from "../components/Header/Header"
import Main from "../components/Main/Main"
import Footer from "../components/Footer/Footer"
import Carousel from "../components/Carousel/Carousel"

const Home = () => {
    return(
        <>
        <Header />
        <Carousel />
        <Main />
        <Footer />
        </>
    )
}

export default Home