import React, { useState } from "react";
import { Collapse, Input } from "antd";

const { Panel } = Collapse;
const { Search } = Input;

const SubCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const subCategoriesData = [
    {
      id: 1,
      name: "Men's Haircut",
      description: "Classic and modern haircuts for men.",
      category: "Hair Services",
      services: ["Classic Cut", "Fade Cut", "Buzz Cut"],
    },
    {
      id: 2,
      name: "Women's Hair Styling",
      description: "Customized hair styles for women.",
      category: "Hair Services",
      services: ["Blow Dry", "Updo", "Curling", "Braiding"],
    },
    {
      id: 3,
      name: "Color Treatments",
      description: "Hair coloring and highlights services.",
      category: "Hair Services",
      services: ["Single Process Color", "Highlights", "Balayage"],
    },
    {
      id: 4,
      name: "Spa Treatments",
      description:
        "Relaxing treatments like scalp massage and deep conditioning.",
      category: "Hair Services",
      services: ["Scalp Massage", "Deep Conditioning Treatment"],
    },
    {
      id: 5,
      name: "Hand Care",
      description: "Moisturizing and therapeutic hand treatments.",
      category: "Nail Services",
      services: ["Manicure", "Paraffin Treatment", "Nail Art"],
    },
    {
      id: 6,
      name: "Foot Care",
      description: "Includes pedicure and foot massage.",
      category: "Nail Services",
      services: ["Pedicure", "Foot Massage", "Callus Removal"],
    },
    {
      id: 7,
      name: "Decorative Nails",
      description: "Nail art, embellishments, and gels.",
      category: "Nail Services",
      services: ["Nail Art", "Gel Extensions", "French Tips"],
    },
    {
      id: 8,
      name: "Skin Care",
      description: "Facials, masks, and skin treatments.",
      category: "Beauty Services",
      services: ["Deep Clean Facial", "Exfoliation", "Anti-Aging Treatments"],
    },
    {
      id: 9,
      name: "Hair Removal",
      description: "Waxing and threading for unwanted hair.",
      category: "Beauty Services",
      services: ["Waxing", "Threading", "Laser Hair Removal"],
    },
    {
      id: 10,
      name: "Facial Grooming",
      description: "Eyebrow shaping, facial threading, and grooming.",
      category: "Beauty Services",
      services: ["Eyebrow Shaping", "Facial Threading", "Beard Grooming"],
    },
    {
      id: 11,
      name: "Body Massage",
      description: "Various massage techniques for relaxation.",
      category: "Wellness Services",
      services: ["Swedish Massage", "Deep Tissue Massage", "Hot Stone Massage"],
    },
    {
      id: 12,
      name: "Skin Exfoliation",
      description: "Exfoliating treatments for smoother skin.",
      category: "Wellness Services",
      services: ["Body Scrub", "Chemical Peel", "Microdermabrasion"],
    },
  ];

  const filteredSubCategories = subCategoriesData.filter(
    (subCategory) =>
      subCategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subCategory.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-40">
      <h1 className="text-4xl text-center font-semibold my-10">
        Subcategories
      </h1>
      <Search
        placeholder="Search subcategories or categories"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <p className="my-3">
        Total Services:{" "}
        <span className="font-semibold">{subCategoriesData.length} Items</span>{" "}
        Found
      </p>
      <Collapse accordion>
        {filteredSubCategories.map((subCategory) => (
          <Panel header={subCategory.name} key={subCategory.id}>
            <p className="text-xl font-semibold border-b-2 pb-2">
              {subCategory.description}
            </p>
            <p className=" font-semibold">Category: {subCategory.category}</p>
            <ul className="my-5 bg-[#f8eeee] p-5 rounded-2xl">
              <h1 className="text-lg font-semibold border-b-2 w-[20%] mb-2">
                Services
              </h1>
              {subCategory.services.map((service, index) => (
                <ul key={index} className="list-disc ml-5">
                  <li>
                    <span className="font-semibold">{service}</span>
                  </li>
                </ul>
              ))}
            </ul>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default SubCategory;
