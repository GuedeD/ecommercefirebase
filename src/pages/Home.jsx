import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";
import { getItems } from "../utils/hook";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const data = await getItems();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      toast(`Erreur: ${error.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className='mt-[80px]'>
      <Banner />
      <Products products={products} loading={loading} />
    </div>
  );
};

export default Home;
