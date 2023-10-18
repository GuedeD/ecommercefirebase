import { TbTrashXFilled } from "react-icons/tb";
import { CgDanger } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AllProducts = ({ products, deleteProduct }) => {
  const [popUp, setPopUp] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const navigate = useNavigate();

  return (
    <div className=' px-20 py-10 grid grid-cols-3 gap-8 relative'>
      {products &&
        products.map((product) => (
          <div
            key={product.id}
            className='border rounded-lg overflow-hidden shadow'
          >
            <table className='w-full '>
              <thead>
                <tr className='text-[13px] uppercase p-1 text-blue-900 '>
                  <th className='p-2 '>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th className='p-2'>Price</th>
                  <th>Rating</th>
                  <th className='p-2'>Update</th>
                  <th className='p-2'>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-t-[1.5px] border-blue-900 text-sm  capitalize font-[500]  hover:bg-slate-100 duration-300 transition-all '>
                  <td className='w-18 h-20'>
                    <img
                      src={product.image}
                      className='w-full h-full object-cover'
                      alt=''
                    />
                  </td>
                  <td>
                    <p>{product.title.substring(0, 9)}.</p>
                  </td>
                  <td>
                    <p>{product.category}</p>
                  </td>
                  <td>
                    <p>${product.price}</p>
                  </td>
                  <td>
                    <p>{product.rating}</p>
                  </td>
                  <td>
                    <FaEdit
                      className='text-2xl text-yellow-600  cursor-pointer'
                      onClick={() =>
                        navigate(`/dashboard/update-product/${product.id}`)
                      }
                    />
                  </td>
                  <td>
                    <TbTrashXFilled
                      className='text-2xl text-red-600  cursor-pointer'
                      onClick={() => {
                        setPopUp(true);
                        setIdProduct(product.id);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      {popUp && (
        <div
          className='flex items-center justify-center absolute w-full h-full before:absolute before:bg-black before:top-0 before:left-0 before:bottom-0 before:right-0 before:opacity-80 -z-5 transition-all duration-900 cursor-pointer  '
          onClick={() => {
            setPopUp(false);
            setIdProduct("");
          }}
        >
          {/* z-20 */}
          <div className='w-[450px] h-auto bg-white shadow-lg rounded-lg opacity-100 flex flex-col items-center gap-y-2 p-5 -mt-[200px] z-20 '>
            <CgDanger className='text-5xl text-gray-500 ' />
            <p className='text-gray-500 text-lg'>
              Are you sure you want to delete this product?
            </p>
            <div className='flex gap-2'>
              <button
                className='text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm  px-5 py-2.5 text-center'
                onClick={() => {
                  deleteProduct(idProduct);
                  setPopUp(false);
                  setIdProduct("");
                }}
              >
                Yes, I&apos;m sure
              </button>
              <button
                className='text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10   '
                onClick={() => {
                  setPopUp(false);
                  setIdProduct("");
                }}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
