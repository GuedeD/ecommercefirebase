import { NavLink, Outlet } from "react-router-dom";

import { RiDashboardFill, RiAddCircleFill } from "react-icons/ri";
const DashboardLayout = () => {
  return (
    <div className='mt-[80px] flex  '>
      {/* LEFT SIDE */}
      <div className=' border-r border-black sticky  w-[15%]  '>
        <h1 className='font-[700] ml-[18px] text-[30px] my-[20px] text-red- '>
          Dashboard
        </h1>
        <NavLink
          to={"/dashboard"}
          end
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1  p-4 bg-slate-200 border-r-4 border-slate-600 font-[500]"
              : "flex items-center gap-1  p-4"
          }
        >
          <RiDashboardFill className='text-2xl' />
          <p className=''>All Products </p>
        </NavLink>

        <NavLink
          to={"/dashboard/add-product"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1  p-4 bg-slate-200 border-r-4 border-slate-600 font-[500]"
              : "flex items-center gap-1  p-4"
          }
        >
          <RiAddCircleFill className='text-2xl' />
          <p className=''>Add Product </p>
        </NavLink>
        <NavLink
          to={"/dashboard/purchases"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-1  p-4 bg-slate-200 border-r-4 border-slate-600 font-[500]"
              : "flex items-center gap-1  p-4"
          }
        >
          <RiAddCircleFill className='text-2xl' />
          <p className=''>Purchases</p>
        </NavLink>
      </div>
      {/* RIGHT SIDE */}
      <div className='w-[85%]'>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
