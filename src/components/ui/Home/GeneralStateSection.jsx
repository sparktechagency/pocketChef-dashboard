import { FaUsers } from "react-icons/fa6";
import salongoLogo from "../../../assets/salon-go-logo.png";
import { useGeneralStatsQuery } from "../../../redux/apiSlices/dashboardSlice";
import { Spin } from "antd";

const GeneralStateSection = () => {
  const { data: generalState, isLoading } = useGeneralStatsQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const state = generalState?.data;
  console.log(state);

  return (
    <div className="grid md:grid-cols-3 gap-6 md:h-[100px]">
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">Total User</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalUsers}
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">New Sign Ups</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.newUsersThisMonth}
          </h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">Total Recipe</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalRecipes}
          </h3>
        </div>
      </div>
      {/* <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">Total Likes</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalLikes}
          </h3>
        </div>
      </div> */}
    </div>
  );
};

export default GeneralStateSection;
