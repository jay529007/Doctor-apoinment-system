import { useSelector } from "react-redux";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const GlobalStatus = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.users);
  const doctorState = useSelector((state) => state.doctors);

  const isLoading = userState.loading || doctorState.loading;
  const error = userState.error || doctorState.error;

  useEffect(() => {
    if (error) {
      console.error("Error occurred:", error);
      navigate("/nouserfound");
    }
  }, [error, navigate]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <AiOutlineLoading className="size-9 text-indigo-600 animate-spin" />
          <p className="text-indigo-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default GlobalStatus;
