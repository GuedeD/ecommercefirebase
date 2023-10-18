import { useEffect, useState } from "react";
import { getPurchases } from "../../utils/hook";
import { toast } from "react-toastify";
import NotFound from "../../assets/notFound.json";
import Animation from "../../assets/animation.json";
import { Player } from "@lottiefiles/react-lottie-player";
import PurchasesCard from "../../components/PurchasesCard";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  async function collectPurchases() {
    try {
      const data = await getPurchases();
      setPurchases(data);
      setLoading(false);
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    collectPurchases();
  }, []);
  return (
    <div>
      {loading ? (
        <Player
          autoplay
          loop
          src={Animation}
          style={{ height: "400px", width: "400px" }}
        ></Player>
      ) : (
        <>
          {purchases.length > 0 ? (
            <PurchasesCard purchases={purchases} />
          ) : (
            <div>
              <h1 className='text-center mt-20 font-[700] text-3xl text-blue-950 '>
                No Purchase Found !!
              </h1>
              <Player
                autoplay
                loop
                src={NotFound}
                style={{ height: "400px", width: "400px" }}
              ></Player>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Purchases;
