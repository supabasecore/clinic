import React from "react";
import LeftSidebar from "./LeftSidebar";

const Container: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <div className="container">
      <LeftSidebar />
      <div
        id="content"
        className={`snippet-hidden ${className ? className : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
