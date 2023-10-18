import { signInWithPopup, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../redux/bazarSlice";
import { useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../config/firebase";
import { getDoc, setDoc } from "firebase/firestore";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleGoogleLogin() {
    await signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;

        dispatch(
          loginUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );

        const docRef = doc(db, "users", user.uid);
        const doc = await getDoc(docRef);

        if (doc.exists()) {
          return;
        } else {
          await setDoc(docRef, {
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
            role: "client",
          });
        }
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })

      .catch((error) => {
        toast.error(error);
      });
  }

  async function handleSignOut() {
    await signOut(auth)
      .then(() => {
        toast.success("Log Out Successfully");
        dispatch(logoutUser());
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  return (
    <div className='mt-[80px] flex flex-col items-center justify-center gap-10 py-20 '>
      <div className='w-full flex items-center justify-center gap-10  '>
        <div className='text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300 '>
          <img
            className='w-8'
            src='https://bazar.reactbd.com/static/media/googleLogo.7dbc7ea39eb97007c7f4.png'
            alt='googleLogo'
          />
          <span className='text-sm text-gray-900' onClick={handleGoogleLogin}>
            Sign in with Google
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className='bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300 '
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Login;
