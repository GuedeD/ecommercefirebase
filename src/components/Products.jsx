import ProductsCard from "./ProductsCard";
import Animation from "../assets/animation.json";
import { Player } from "@lottiefiles/react-lottie-player";

const Products = ({ products, loading }) => {
  return (
    <div className='py-[80px]'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-[24px] bg-black text-white py-2 w-[340px] text-center'>
          Shopping everyday
        </h1>
        <span className='w-20 h-[3px] bg-black'></span>
        <p className='max-w-[700px] text-gray-600 text-center '>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo,
          quos fugit inventore, cumque quae corporis ratione tenetur eos
          voluptates neque magnam soluta aperiam omnis perspiciatis reiciendis
          asperiores repudiandae assumenda quidem.
        </p>
      </div>
      <div>
        {loading && (
          <Player
            autoplay
            loop
            src={Animation}
            style={{ height: "300px", width: "300px" }}
          ></Player>
        )}
      </div>
      <div className='max-w-[1200px] mx-auto py-10 grid grid-cols-4 gap-10'>
        {products &&
          products.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Products;
