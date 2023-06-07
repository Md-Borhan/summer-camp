import Lottie from "lottie-react";
import errorImage from "../../assets/others/error.json";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate(-1);
  };
  return (
    <div className="h-screen">
      <Lottie style={{ height: "80vh" }} animationData={errorImage} />
      <div onClick={backToHome} className="text-center">
        <Button value="Back to Home" />
      </div>
    </div>
  );
};

export default ErrorPage;
