import { Link, useLocation } from "react-router-dom";
import { cartImg, logoDark, userImg } from "../assets";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
// import { toast } from "react-toastify";
import { getUserRole } from "../utils/hook";
// import { getAuth } from "firebase/auth";
// import { auth } from "../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const { userInfo, products } = useSelector((state) => state.bazar);
  const [visible, setVisible] = useState(false);
  const [userRole, setUserRole] = useState("");
  const location = useLocation();

  // async function emailFn() {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log(user);
  //       // ...
  //     } else {
  //       // User is signed out
  //       // ...
  //       console.log("sign out");
  //     }
  //   });
  // }

  async function accessUserRole() {
    const role = await getUserRole(userInfo._id);
    setUserRole(role);
  }

  useEffect(() => {
    // emailFn();
    setVisible(false);

    if (userInfo) {
      accessUserRole();
    }
  }, [location, userInfo]);

  return (
    <div className='w-full h-[80px] bg-white border-b-[1px] border-b-gray-800 font-titleFont fixed top-0 z-50 left-0 right-0'>
      <div className='max-w-[1200px] h-full mx-auto flex items-center justify-between relative '>
        <Link to='/'>
          <div>
            <img src={logoDark} className='w-[110px]' alt='logoDark' />
          </div>
        </Link>
        <div className='flex items-center gap-[32px]'>
          <ul className='flex items-center gap-[32px]'>
            <li className='liStyle'>Home</li>
            <li className='liStyle'>Pages</li>
            <li className='liStyle'>Shop</li>
            <li className='liStyle'>Element</li>
            <li className='liStyle'>Blog</li>
          </ul>
          <Link to='/cart'>
            <div className='relative'>
              <img className='w-[24px]' src={cartImg} alt='cartImg' />
              <span className='absolute w-[24px] top-2 left-0 text-[14px] flex items-center justify-center font-semibold'>
                {products.length}
              </span>
            </div>
          </Link>

          <img
            className='w-[32px] h-[32px] rounded-full'
            src={userInfo ? userInfo?.image : userImg}
            alt='userLogo'
          />

          {userInfo && (
            <p className='text-base font-titleFont font-semibold underline underline-offset-2'>
              {userInfo.name.substring(0, 4).toUpperCase()}
            </p>
          )}

          <div>
            {visible ? (
              <BiSolidUpArrow
                className='cursor-pointer'
                onClick={() => {
                  setVisible(!visible);
                }}
              />
            ) : (
              <BiSolidDownArrow
                className='cursor-pointer'
                onClick={() => {
                  setVisible(!visible);
                }}
              />
            )}
          </div>

          {visible && (
            <div className='absolute right-0 top-16 bg-white shadow-xl  space-y-2 rounded-lg flex flex-col overflow-hidden'>
              <Link
                to='/login'
                className=' font-[600] hover:bg-blue-100 px-8 py-2 '
              >
                Login Page
              </Link>{" "}
              <Link
                to={"/dashboard"}
                className={
                  userInfo && userRole === "admin"
                    ? "  font-[600] hover:bg-blue-100  px-8 py-2 "
                    : "hidden"
                }
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
