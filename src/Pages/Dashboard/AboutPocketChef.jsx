import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Title from "../../components/common/Title";
import toast from "react-hot-toast";
import { Spin } from "antd";
import {
  useAboutUsQuery,
  useUpdateAboutUsMutation,
} from "../../redux/apiSlices/aboutSlice";

const AboutPocketChef = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { data: getAbout, isLoading } = useAboutUsQuery();
  const [updateAboutUs] = useUpdateAboutUsMutation();

  useEffect(() => {
    setContent(getAbout?.[0]?.document);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const data = getAbout?.[0]?.document;
  console.log(data);

  const termsDataSave = async () => {
    const data = {
      document: content,
    };

    try {
      const res = await updateAboutUs(data).unwrap();
      if (res.success) {
        toast.success("About PocketChef updated successfully");
        setContent(res.data.document);
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
      <Title className="mb-4">About PocketChef</Title>

      <JoditEditor
        ref={editor}
        value={data}
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

export default AboutPocketChef;
