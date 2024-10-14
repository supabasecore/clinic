import React from "react";

const Loading: React.FC<{ size?: string; className?: string }> = ({
  size,
  className,
}) => {
  return (
    <div className={className ?? "d-flex jc-center ai-center ta-center pt8"}>
      <svg
        width={size ? size : "32"}
        height={size ? size : "32"}
        viewBox="0 0 16 16"
        fill="none"
        data-view-component="true"
        className="anim-rotate"
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        ></circle>
        <path
          d="M15 8a7.002 7.002 0 00-7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        ></path>
      </svg>
    </div>
  );
};

export default Loading;
