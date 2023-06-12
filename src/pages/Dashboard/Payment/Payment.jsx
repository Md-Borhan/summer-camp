import SectionTitle from "../../../components/SectionTitle";
import { Helmet } from "react-helmet";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_payment_pk);

const Payment = () => {
  const bookedClass = useLoaderData();
  const price = parseFloat(bookedClass?.price.toFixed(2));
  console.log(price);

  return (
    <div className="">
      <Helmet>
        <meta charSet="utf-8" />
        <title>United Champions | Payment</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <SectionTitle title="Payment"></SectionTitle>
      <Elements stripe={stripePromise}>
        <CheckoutForm bookedClass={bookedClass} price={price} />
      </Elements>
    </div>
  );
};

export default Payment;
