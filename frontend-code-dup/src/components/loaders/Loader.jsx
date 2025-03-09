import React from "react";
import { Skeleton } from "antd";
const Loader = ({ loading }) => {
  return (
    <div className="flex gap-5 flex-wrap p-3">
      {new Array(20).fill("card").map((data, index) => (
        <div className="w-64 bg-white p-3 rounded-sm" key={index}>
          <Skeleton loading={loading} />
        </div>
      ))}
    </div>
  );
};

export default Loader;