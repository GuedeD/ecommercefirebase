import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const { products, userInfo } = useSelector((state) => state.bazar);
  const [totalAmt, setTotalAmt] = useState("");

  async function handleCheckOut() {
    if (userInfo) {
      console.log("ici");
      const stripe = await loadStripe(
        "pk_test_51Jr1G2ARCBFsDeLfkg5hGtn3zXStVRwi4LEaZ84OjTK871mYdKbpYwmXjYhttYUmtgo2WHc6JAvNCKZk8xhv1f8900dW46oT0E"
      );
      const response = await axios.post(
        "http://localhost:8000/api/create-checkout-session",
        {
          products,
        }
      );

      stripe.redirectToCheckout({ sessionId: response.data.id });
    } else {
      toast.error("Please sign in to Checkout");
    }
  }

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;

      return price;
    });
    setTotalAmt(Math.round(price));
  }, [products]);

  return (
    <div className='mt-[80px]'>
      <img
        src='https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        alt='cartImg'
        className='w-full h-60 object-cover'
      />

      {products.length > 0 ? (
        <div className='max-w-[1200px] mx-auto py-20 flex'>
          <CartItem />
          <div className='w-1/3 bg-[#fafafa] py-6 px-4'>
            <div className='flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6'>
              <h2 className='text-2xl font-medium'>cart totals</h2>
              <p className='flex items-center gap-4 text-base'>
                Subtotal{" "}
                <span className='font-titleFont font-bold text-lg'>
                  $ {totalAmt}
                </span>
              </p>
              <p className='flex items-start gap-4 text-base'>
                Shipping{" "}
                <span>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quos, veritatis.
                </span>
              </p>
            </div>
            <p className='font-titleFont font-semibold flex justify-between mt-6 '>
              Total <span className='text-xl font-bold'>$ {totalAmt}</span>
            </p>

            <button
              onClick={handleCheckOut}
              className='text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300'
            >
              proceed to checkout
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-y-4 my-6 '>
          <p className='text-orange-500 font-[500] text-lg'>
            Your Cart is Empty. Please go back to Shopping and add Products to
            Cart
          </p>
          <Link to='/'>
            <button className='ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300 '>
              <span>
                <HiOutlineArrowLeft />
              </span>
              go shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
