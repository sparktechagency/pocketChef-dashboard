import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Title from "../../components/common/Title";
import {
  useTermsAndConditionQuery,
  useUpdateTermsAndConditionsMutation,
} from "../../redux/apiSlices/termsAndConditionSlice";
import toast from "react-hot-toast";
import rentMeLogo from "../../assets/navLogo.png";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // const {
  //   data: termsAndCondition,
  //   isLoading,
  //   refetch,
  // } = useTermsAndConditionQuery();

  // const [updateTermsAndConditions] = useUpdateTermsAndConditionsMutation();

  const termsAndCondition = [];

  const isLoading = false;

  useEffect(() => {
    setContent(termsAndCondition?.content);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  const termsDataSave = async () => {
    const data = {
      content: content,
      userType: "USER",
    };

    try {
      const res = await updateTermsAndConditions(data).unwrap();
      if (res.success) {
        toast.success("Terms and Conditions updated successfully");
        setContent(res.data.content);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      throw new Error("Something Is wrong at try");
    }
  };

  return (
    <div>
      <Title className="mb-4">Terms and Conditions</Title>

      <JoditEditor
        ref={editor}
        value={content}
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

export default TermsAndCondition;
