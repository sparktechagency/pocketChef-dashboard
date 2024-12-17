import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Title from "../../components/common/Title";
import rentMeLogo from "../../assets/navLogo.png";
import toast from "react-hot-toast";
import {
  usePrivacyPolicyQuery,
  useUpdatePricyPolicyMutation,
} from "../../redux/apiSlices/privacyPolicySlice";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [selectedTab, setSelectedTab] = useState("USER");
  const isLoading = false;

  useEffect(() => {
    setContent(content);
  }, [selectedTab]);

  // const {
  //   data: privacyPolicy,
  //   isLoading,
  //   refetch,
  // } = usePrivacyPolicyQuery(selectedTab);

  // const [updatePricyPolicy] = useUpdatePricyPolicyMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  const privacyPolicy = [];

  const privacyPolicyData = privacyPolicy?.content;

  const termsDataSave = async () => {
    const data = {
      content: content,
      userType: selectedTab,
    };

    try {
      const res = await updatePricyPolicy(data).unwrap();
      if (res.success) {
        toast.success("Privacy Policy updated successfully");
        setContent(res.data.content);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    }
  };

  const tabContent = {
    USER: privacyPolicyData,
    VENDOR: privacyPolicyData,
    CUSTOMER: privacyPolicyData,
  };

  return (
    <div>
      <Title className="mb-4">Privacy Policy</Title>

      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 rounded-2xl py-2 ${
            selectedTab === "USER" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("USER")}
        >
          Users
        </button>
        <button
          className={`px-4 rounded-2xl py-2 ${
            selectedTab === "VENDOR" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("VENDOR")}
        >
          Vendors
        </button>
        <button
          className={`px-4 rounded-2xl py-2 ${
            selectedTab === "CUSTOMER" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("CUSTOMER")}
        >
          Customers
        </button>
      </div>

      <JoditEditor
        ref={editor}
        value={tabContent[selectedTab]}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={termsDataSave}
          type="submit"
          className="bg-primary text-white w-[160px] h-[42px] rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
