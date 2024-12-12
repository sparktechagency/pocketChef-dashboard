import BestShortsChart from "../../components/ui/Analytics/BestShortsChart";
import RunningOrderTable from "../../components/ui/Analytics/RunningOrderTable";
import TotalEarning from "../../components/ui/Analytics/TotalEarning";
import UserStatistics from "../../components/ui/Analytics/UserStatistics";

const Analytics = () => {
  return (
    <div>
      <div>
        <TotalEarning />
      </div>
      <div className="flex w-full gap-6 mt-5">
        <div className="w-9/12">
          <UserStatistics />
        </div>
        <div className="w-3/12">
          <BestShortsChart />
        </div>
      </div>
      <div className="mt-5">
        {" "}
        <RunningOrderTable />
      </div>
    </div>
  );
};

export default Analytics;
