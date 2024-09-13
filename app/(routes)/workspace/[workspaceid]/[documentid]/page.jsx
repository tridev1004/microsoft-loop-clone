
import React from "react";

import SideNav from "../_components/SideNav";

const workspaceDocument = ({params}) => {
   
  return (
    <div>
        {/* Side NAV */}
      <div className="">
        <SideNav params={params}/>
      </div>
      {/* {DOcument} */}
      <div className="md:ml-72">
        Document
      </div>
    </div>
  );
};

export default workspaceDocument;
