import React, { useState, JSX } from "react";

interface Tab {
  id: string;
  title: string | JSX.Element;
  content: JSX.Element;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  style?: "default" | "box";
  className?: {
    container?: string;
    tab?: string;
    content?: string;
  };
}

export default function Tabs({
  tabs,
  style = "default",
  className,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  return (
    <>
      <ul className={`nav nav-tabs style-${style}`} id="myTab" role="tablist">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className="nav-item"
            role="presentation"
            title={tab.title.toString()}
          >
            <button
              className={`nav-link ${tab.disabled ? "disabled" : ""} ${
                activeTab === tab.id ? "active" : ""
              }`}
              id={`tab-${tab.id}`}
              data-bs-toggle="tab"
              data-bs-target={`#tab-pane-${tab.id}`}
              type="button"
              role="tab"
              aria-controls={`tab-pane-${tab.id}`}
              aria-selected={activeTab === tab.id}
              onClick={() => !tab.disabled && setActiveTab(tab.id)}
            >
              {tab.title.toString().length > 35
                ? `${tab.title.toString().slice(0, 35)}...`
                : tab.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content mt-3" id="myTabContent">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-pane fade ${
              activeTab === tab.id ? "show active" : ""
            } ${className?.content}`}
            id={`tab-pane-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </>
  );
}
