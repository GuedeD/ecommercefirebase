import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import {
  GiLoincloth,
  GiPayMoney,
  GiReceiveMoney,
  GiCloudUpload,
} from "react-icons/gi";
import { BiLoader } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { db, storage } from "../../config/firebase";
import { toast } from "react-toastify";
import SimpleLoader from "../../components/SimpleLoader";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";

const AddProduct = () => {
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

  const { userInfo } = useSelector((state) => state.bazar);

  function handleSubmit(e) {
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
        userOwner: userInfo._id,
      };

      saveItem(data);
    }
  }

  async function saveItem(data) {
    setPending(true);
    const itemsCollectionRef = collection(db, "items");

    try {
      await addDoc(itemsCollectionRef, data);
      toast.success("Item Added Successfully 😊");
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
  function uploadImage(e) {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        toast.error(error);
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
        });
      }
    );
  }

  const deleteImage = () => {
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
    });
  };
  //  h-auto my-10
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
        onSubmit={handleSubmit}
      >
        <h1 className='text-center font-[600]  text-2xl '>Add New Item</h1>

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
            className='bg-gray-100 p-2 rounded flex-1 shadow focus:outline-none '
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=''>Category </option>
            <option value='women'>Women</option>
            <option value='men'>Men</option>
            <option value='kids'>Kids</option>
          </select>

          <select
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

        {/* <div className='flex items-center justify-center w-full'> */}

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
              <input
                id='upFile'
                type='file'
                className='hidden'
                onChange={uploadImage}
              />
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
              <button
                type='button'
                className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out   '
                onClick={deleteImage}
              >
                <MdDelete className='text-white' />
              </button>
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

export default AddProduct;
