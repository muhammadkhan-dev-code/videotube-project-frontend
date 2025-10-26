import React, { useState } from "react";
import { Button } from "../../index.jsx";

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const tabs = ["videos", "about"];

  return (
    <div className="flex space-x-6 mt-8 border-b w-full max-w-4xl justify-center">
      {tabs.map((tab) => (
        <Button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 text-gray-600 font-medium capitalize ${
            activeTab === tab
              ? "border-b-2 border-blue-500 text-blue-600"
              : "hover:text-gray-800"
          }`}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};

export default TabsSection;
