import { useEffect } from "react";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/bazarSlice";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const PaymentDone = () => {
  const dispatch = useDispatch();
  const height = window.screen.height;
  const width = window.screen.width;

  const purchasesCollectionRef = collection(db, "purchases");
  const { products, userInfo } = useSelector((state) => state.bazar);
  const location = useLocation();
  const navigate = useNavigate();

  async function sentPurchases() {
    try {
      if (products.length > 0) {
        await addDoc(purchasesCollectionRef, {
          products: products,
          buyer: userInfo,
          timestamp: serverTimestamp(),
        });
      } else {
        return;
      }
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    if (location.search) {
      sentPurchases();
      dispatch(resetCart());
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className='mt-[80px] h-[700px] flex items-center justify-center'>
        <h1 className='text-[40px] font-[600] text-red-400 animate-bounce'>
          Thank You for your purchases !! 🙏😊
        </h1>
        <Confetti width={width} height={height} />
      </div>
    </>
  );
};

export default PaymentDone;
