import React from "react";
import { Collapse, Typography } from "antd";
const { Panel } = Collapse;

const Category = () => {
  // Updated dummy data for salon categories
  const categories = [
    {
      id: 1,
      name: "Hair Services",
      subCategories: [
        {
          id: 101,
          name: "Haircuts",
          subCategories: [
            { id: 1011, name: "Men's Haircut" },
            { id: 1012, name: "Women's Haircut" },
          ],
        },
        {
          id: 102,
          name: "Hair Treatments",
          subCategories: [
            { id: 1021, name: "Coloring" },
            { id: 1022, name: "Straightening" },
          ],
        },
        {
          id: 103,
          name: "Hair Styling",
          subCategories: [
            { id: 1031, name: "Braids" },
            { id: 1032, name: "Updos" },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Nail Services",
      subCategories: [
        {
          id: 201,
          name: "Manicures",
          subCategories: [
            { id: 2011, name: "Basic Manicure" },
            { id: 2012, name: "Gel Manicure" },
          ],
        },
        {
          id: 202,
          name: "Pedicures",
          subCategories: [
            { id: 2021, name: "Basic Pedicure" },
            { id: 2022, name: "Spa Pedicure" },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Beauty Services",
      subCategories: [
        {
          id: 301,
          name: "Facial Treatments",
          subCategories: [
            { id: 3011, name: "Hydrating Facial" },
            { id: 3012, name: "Anti-Aging Facial" },
          ],
        },
        {
          id: 302,
          name: "Makeup Services",
          subCategories: [
            { id: 3021, name: "Natural Makeup" },
            { id: 3022, name: "Bridal Makeup" },
          ],
        },
        {
          id: 303,
          name: "Waxing",
          subCategories: [
            { id: 3031, name: "Leg Waxing" },
            { id: 3032, name: "Facial Waxing" },
          ],
        },
      ],
    },
  ];

  const renderSubCategories = (subCategories) => {
    return (
      <Collapse>
        {subCategories.map((sub) => (
          <Panel header={sub.name} key={sub.id}>
            {sub.subCategories && sub.subCategories.length > 0
              ? renderSubCategories(sub.subCategories)
              : null}
          </Panel>
        ))}
      </Collapse>
    );
  };

  return (
    <div className="category-page w-[70%] mx-auto">
      {categories.map((category) => (
        <div key={category.id} className="category">
          <Typography.Title level={3}>{category.name}</Typography.Title>
          {renderSubCategories(category.subCategories)}
        </div>
      ))}
    </div>
  );
};

export default Category;
