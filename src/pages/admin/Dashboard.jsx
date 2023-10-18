import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Animation from "../../assets/animation.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { getItems, getUserRole } from "../../utils/hook";
import AllProducts from "./AllProducts";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { createBrowserHistory } from "history";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.bazar);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  async function checkAdmin() {
    const role = await getUserRole(userInfo._id);
    if (role !== "admin" && userInfo) {
      navigate("/");
      toast.error("Access Denied !");
    }
  }

  async function collectItems() {
    try {
      console.log("ici");
      const data = await getItems();
      console.log("ici2");
      setProducts(data);

      setLoading(false);
    } catch (error) {
      toast.error(error);
    }
  }

  async function deleteProduct(id) {
    const docRef = doc(db, "items", id);
    try {
      await deleteDoc(docRef);
      collectItems();
      toast.success("Item Successfully Removed 😊");
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    if (userInfo) {
      checkAdmin();
      collectItems();
    } else {
      navigate("/");
      toast.error("Please Sign In First !");
    }
  }, []);

  return (
    <div className=''>
      {loading ? (
        <Player
          autoplay
          loop
          src={Animation}
          style={{ height: "300px", width: "300px" }}
        ></Player>
      ) : (
        <AllProducts products={products} deleteProduct={deleteProduct} />
      )}
    </div>
  );
};

export default Dashboard;
