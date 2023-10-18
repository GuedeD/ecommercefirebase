import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  GiLoincloth,
  GiPayMoney,
  GiReceiveMoney,
  GiCloudUpload,
} from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import SimpleLoader from "../../components/SimpleLoader";
import { BiLoader } from "react-icons/bi";
import { toast } from "react-toastify";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const UpdateProduct = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(null);
  const [isNew, setIsNew] = useState(null);
  const [oldPrice, setOldPrice] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);

  async function getDocument() {
    const docRef = doc(db, "items", id);
    const datasnap = await getDoc(docRef);
    const data = datasnap.data();

    setTitle(data.title);
    setDescription(data.description);
    setCategory(data.category);
    setRating(data.rating);
    setIsNew(data.isNew);
    setOldPrice(data.oldPrice);
    setPrice(data.price);
    setImageAsset(data.image);
  }

  function updateProduct(e) {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !category ||
      !rating ||
      !isNew ||
      !oldPrice ||
      !price ||
      !imageAsset
    ) {
      toast.warn("Required fields can't be empty");
    } else {
      const data = {
        title: title,
        description: description,
        category: category,
        rating: rating,
        isNew: isNew === "no" ? false : true,
        oldPrice: oldPrice,
        price: price,
        image: imageAsset,
      };

      saveItem(data);
    }
  }

  async function saveItem(data) {
    setPending(true);
    const docRef = doc(db, "items", id);

    try {
      await updateDoc(docRef, data);
      toast.success("Item Edited Successfully 😊");
      setPending(false);
      clearData();
    } catch (error) {
      setPending(false);
      toast.error(error);
    }
  }

  const clearData = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setRating("");
    setIsNew("");
    setOldPrice("");
    setPrice("");
    setImageAsset(null);
  };

  useEffect(() => {
    getDocument();
  }, []);

  return (
    <div className='w-full h-auto my-10 flex flex-col items-center justify-center'>
      {pending && (
        <div className='flex w-[500px] bg-orange-500 items-center justify-center mb-2 rounded'>
          <BiLoader className='text-xl text-white' />
          <span className=' text-white text-center   p-1 text-lg font-[600]  '>
            Pending ...
          </span>
        </div>
      )}

      <form
        className=' w-[500px]  shadow-lg p-10 rounded-xl border border-slate-200 space-y-5'
        onSubmit={updateProduct}
      >
        <h1 className='text-center font-[600]  text-2xl '>Update Item</h1>

        <div className='flex items-center gap-1 w-full border-b border-slate-300'>
          <GiLoincloth className='text-xl' />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product's Title"
            className=' placeholder:text-lg  focus:outline-none  rounded p-1'
            type='text'
          />
        </div>

        <div className='flex items-center gap-1'>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description'
            rows={4}
            className='focus:outline-none w-full border border-slate-300 rounded p-1'
          ></textarea>
        </div>
        <div className='flex justify-between gap-6'>
          <select
            value={category ? category : ""}
            className='bg-gray-100 p-2 rounded flex-1 shadow focus:outline-none '
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=''>Category </option>
            <option value='women'>Women</option>
            <option value='men'>Men</option>
            <option value='kids'>Kids</option>
          </select>

          <select
            value={rating ? rating : ""}
            className='flex-1 bg-gray-100 p-2 rounded shadow focus:outline-none'
            onChange={(e) => setRating(e.target.value)}
          >
            <option value=''>Rating </option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>

          <select
            value={isNew === true ? "yes" : "no"}
            className='flex-1 bg-gray-100 p-2 rounded shadow focus:outline-none'
            onChange={(e) => setIsNew(e.target.value)}
          >
            <option value=''>Is New </option>
            <option value='no'>False</option>
            <option value='yes'>True</option>
          </select>
        </div>

        <div className='flex justify-between gap-10'>
          <div className='flex items-center gap-1  border-b border-slate-300'>
            <GiPayMoney className='text-xl' />
            <input
              value={oldPrice}
              className='w-full focus:outline-none'
              type='number'
              placeholder='Old Price'
              onChange={(e) => setOldPrice(e.target.value)}
            />
          </div>
          <div className='flex items-center gap-1 border-b border-slate-300'>
            <GiReceiveMoney className='text-xl' />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='w-full focus:outline-none'
              type='number'
              placeholder='Price'
            />
          </div>
        </div>

        {!imageAsset ? (
          <>
            <label
              htmlFor='upFile'
              className='flex justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 '
            >
              <div className='flex flex-col items-center justify-center'>
                {isLoading ? (
                  <SimpleLoader />
                ) : (
                  <>
                    <GiCloudUpload className='text-4xl' />

                    <p className='text-base text-gray-500 '>
                      <span className='font-semibold'>
                        Click here to upload
                      </span>
                    </p>
                  </>
                )}
              </div>
              <input id='upFile' type='file' className='hidden' />
            </label>
          </>
        ) : (
          <>
            <div className='relative w-full h-60 '>
              <img
                src={imageAsset}
                alt='uploaded image'
                className='w-full h-full object-cover rounded'
              />
            </div>
          </>
        )}

        <div className='flex justify-end'>
          <input
            type='submit'
            value={"Save"}
            className='border-none bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 cursor-pointer px-12 py-2 rounded-lg text-lg text-white font-semibold '
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
