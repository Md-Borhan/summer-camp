import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import Reviews from "../Reviews/Reviews";
import ScrollToTop from "react-scroll-to-top";

const Home = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>United Champions | Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <ScrollToTop />
      <Banner />
      <PopularClass />
      <PopularInstructor />
      <Reviews />
    </div>
  );
};

export default Home;
