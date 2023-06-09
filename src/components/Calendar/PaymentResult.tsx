import { useDispatch, useSelector } from "react-redux";
import { updatePaymentResult } from "../../redux/actions";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsExclamationCircle, BsX } from "react-icons/bs";

const PaymentResult = () => {
  const paymentResult = useSelector(
    (state: any) => state.paymentResult.paymentResult
  );
  const dispatch = useDispatch();

  const closeMessage = () => {
    dispatch(updatePaymentResult(""));
    window.location.reload();
  };

  const renderIcon = () => {
    if (paymentResult === "Payment successful") {
      return <AiOutlineCheckCircle className="text-green-500 h-6 w-6" />;
    } else if (paymentResult === "Payment failed") {
      return <BsExclamationCircle className="text-red-500 h-6 w-6" />;
    }
    return null;
  };

  return (
    <>
      {paymentResult && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="rounded-md p-4 bg-gray-200">
            <div className="flex items-center">
              {renderIcon()}
              <p className="ml-2">{paymentResult}</p>
              <button
                className="ml-auto focus:outline-none"
                onClick={closeMessage}
              >
                <BsX className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentResult;
