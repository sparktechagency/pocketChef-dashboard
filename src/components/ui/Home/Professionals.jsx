import randomImg from "../../../assets/randomProfile2.jpg";
import salongoLogo from "../../../assets/salon-go-logo.png";

// Dummy data for Professionals Component

const Professionals = () => {
  // Simulate loading state
  const dummyProfessionalsData = {
    data: [
      {
        name: "Spaghetti Carbonara",
        conversionRate: 85,
        profileImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0QZECLItrlrbZ2hsCiznqGTg_1z8eYbqhsA&s",
      },
      {
        name: "Chicken Tikka Masala",
        conversionRate: 78,
        profileImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDmdMSSPxj66_a1ASxRdtZeB07Lbub8S8Q8Q&s",
      },
      {
        name: "Beef Tacos",
        conversionRate: 92,
        profileImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEhqk5cA7Wt2k7w4RFIdi97vrRAXDVNbhgsQ&s",
      },
      {
        name: "Vegetable Stir Fry",
        conversionRate: 65,
        profileImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDaVcll19kN9w5p2AKqn33CtJYOzzUQiWb0A&s",
      },
      {
        name: "Caesar Salad",
        conversionRate: 73,
        profileImg:
          "https://itsavegworldafterall.com/wp-content/uploads/2023/04/Avocado-Caesar-Salad-FI.jpg",
      },
      {
        name: "Chocolate Cake",
        conversionRate: 80,
        profileImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWJ6APTq4uFZaqBYDDKhwdw_wDcBhpjjVwlw&s",
      },
    ],
  };
  const isLoading = false;
  const professionalsData = dummyProfessionalsData;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={salongoLogo} alt="" />
      </div>
    );
  }

  const professionals = professionalsData?.data;

  const topProfessionals = [...(professionals || [])]
    .sort((a, b) => b.conversionRate - a.conversionRate)
    .slice(0, 5);

  return (
    <div className="w-full border h-[290px] bg-white rounded-2xl pb-5 md:flex flex-col justify-center">
      <p className="text-base font-semibold px-10 py-4">Most Viewed Recipes</p>
      <div className="md:flex flex-col px-10 gap-4">
        {topProfessionals?.map((value, index) => (
          <div key={index} className="flex items-center gap-4">
            <img
              className="w-7 h-7 rounded-full"
              src={value?.profileImg || randomImg}
              alt={value?.name}
            />

            <h1 className="text-sm font-medium w-32 truncate">{value?.name}</h1>

            <div className="flex items-center flex-1">
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${value.conversionRate}%` }}
                ></div>
              </div>
            </div>

            <p className="text-sm font-medium">{value?.conversionRate}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Professionals;
