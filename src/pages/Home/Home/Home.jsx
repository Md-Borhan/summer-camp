import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>United Champions | Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Banner />
      <PopularClass />
      <PopularInstructor />
      <Reviews />
    </div>
  );
};

export default Home;
