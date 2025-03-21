import React from "react";
import SalesTrackingChart from "../../components/ui/Home/SalesTrackingChart";
import RunningOrdersTable from "../../components/ui/Home/RunningOrdersTable";
import logo from "../../assets/logo.png";
import UserEngagement from "../../components/ui/Home/UserEngagement";
import GeneralStateSection from "../../components/ui/Home/GeneralStateSection";
import Professionals from "../../components/ui/Home/Professionals";

const Home = () => {
  const orderSummary = {
    doneByProfessionals: 65,
    doneByFreelancers: 35,
  };

  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  return (
    <div>
      <GeneralStateSection />
      {/* <div className="md:flex w-full items-center gap-6 mt-6"> */}
      {/* <div className="md:w-6/12 md:flex gap-4">
          <Professionals />
        </div> */}
      {/* </div> */}
      <div className="w-full md:flex gap-6">
        <div className="md:w-6/12 my-6 ">
          {" "}
          <RunningOrdersTable />
        </div>
        <div className="md:w-6/12 my-6 ">
          <UserEngagement />
        </div>
      </div>
      <div className="w-full bg-white border rounded-2xl py-3 flex flex-col justify-center">
        <SalesTrackingChart />
      </div>
    </div>
  );
};

export default Home;
