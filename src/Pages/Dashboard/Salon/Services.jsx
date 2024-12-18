import React, { useState } from "react";

const ServicesPage = () => {
  // Dummy data for services
  const servicesData = [
    {
      id: 1,
      serviceName: "Haircut",
      category: "Hair Services",
      subCategory: "Men's Haircut",
      barber: "John Doe",
    },
    {
      id: 2,
      serviceName: "Haircut",
      category: "Hair Services",
      subCategory: "Men's Haircut",
      barber: "Mike Ross",
    },
    {
      id: 3,
      serviceName: "Hair Styling",
      category: "Hair Services",
      subCategory: "Women's Hair Styling",
      barber: "Emily Brown",
    },
    {
      id: 4,
      serviceName: "Beard Trim",
      category: "Hair Services",
      subCategory: "Men's Grooming",
      barber: "John Doe",
    },
    {
      id: 5,
      serviceName: "Manicure",
      category: "Nail Services",
      subCategory: "Hand Care",
      barber: "Sarah Lee",
    },
    {
      id: 6,
      serviceName: "Pedicure",
      category: "Nail Services",
      subCategory: "Foot Care",
      barber: "Sarah Lee",
    },
    {
      id: 7,
      serviceName: "Facial",
      category: "Beauty Services",
      subCategory: "Skin Care",
      barber: "Emily Brown",
    },
    {
      id: 8,
      serviceName: "Hair Coloring",
      category: "Hair Services",
      subCategory: "Color Treatments",
      barber: "Anna Smith",
    },
    {
      id: 9,
      serviceName: "Hair Coloring",
      category: "Hair Services",
      subCategory: "Color Treatments",
      barber: "Mike Ross",
    },
    {
      id: 10,
      serviceName: "Massage Therapy",
      category: "Wellness Services",
      subCategory: "Body Massage",
      barber: "David Green",
    },
    {
      id: 11,
      serviceName: "Hot Towel Shave",
      category: "Hair Services",
      subCategory: "Men's Grooming",
      barber: "Michael Scott",
    },
    {
      id: 12,
      serviceName: "Eyebrow Threading",
      category: "Beauty Services",
      subCategory: "Facial Grooming",
      barber: "Emily Brown",
    },
    {
      id: 13,
      serviceName: "Deep Tissue Massage",
      category: "Wellness Services",
      subCategory: "Body Massage",
      barber: "David Green",
    },
    {
      id: 14,
      serviceName: "Hair Spa",
      category: "Hair Services",
      subCategory: "Spa Treatments",
      barber: "Anna Smith",
    },
    {
      id: 15,
      serviceName: "Nail Art",
      category: "Nail Services",
      subCategory: "Decorative Nails",
      barber: "Sarah Lee",
    },
    {
      id: 16,
      serviceName: "Waxing",
      category: "Beauty Services",
      subCategory: "Hair Removal",
      barber: "Emily Brown",
    },
    {
      id: 17,
      serviceName: "Hair Straightening",
      category: "Hair Services",
      subCategory: "Styling Treatments",
      barber: "Mike Ross",
    },
    {
      id: 18,
      serviceName: "Hair Straightening",
      category: "Hair Services",
      subCategory: "Styling Treatments",
      barber: "Anna Smith",
    },
    {
      id: 19,
      serviceName: "Scalp Treatment",
      category: "Hair Services",
      subCategory: "Treatment",
      barber: "John Doe",
    },
    {
      id: 20,
      serviceName: "Body Scrub",
      category: "Wellness Services",
      subCategory: "Skin Exfoliation",
      barber: "David Green",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState(servicesData);

  // Handle search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = servicesData.filter(
      (service) =>
        service.serviceName.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.subCategory.toLowerCase().includes(query) ||
        service.barber.toLowerCase().includes(query)
    );

    setFilteredServices(filtered);
  };

  return (
    <div className="p-5 px-40">
      <h1 className="text-3xl font-bold mb-5 text-start">Services</h1>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by service, category, subcategory, or barber"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto">
        <p className="my-3">
          Total Services:{" "}
          <span className="font-semibold">{servicesData.length} Items</span>{" "}
          Found
        </p>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-start">#</th>
              <th className="px-4 py-2 border border-gray-300 text-start">
                Service Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-start">
                Category
              </th>
              <th className="px-4 py-2 border border-gray-300 text-start">
                Sub-Category
              </th>
              <th className="px-4 py-2 border border-gray-300 text-start">
                Barbers
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.length > 0 ? (
              Object.entries(
                filteredServices.reduce((acc, service) => {
                  const key = `${service.serviceName}|${service.category}|${service.subCategory}`;
                  if (!acc[key]) {
                    acc[key] = { ...service, barbers: [] };
                  }
                  acc[key].barbers.push(service.barber);
                  return acc;
                }, {})
              ).map(([key, service], index) => (
                <tr key={key} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {service.serviceName}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {service.category}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {service.subCategory}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {service.barbers.join(", ")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 border border-gray-300"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesPage;
