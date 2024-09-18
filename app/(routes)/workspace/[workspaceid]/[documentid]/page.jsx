
import React from "react";

import SideNav from "../_components/SideNav";
import DocumentEditorSection from "../_components/DocumentEditorSection";

const workspaceDocument = ({params}) => {
   
  return (
    <div>
        {/* Side Nav */}
      <div className="">
        <SideNav params={params}/>
      </div>
      {/* {DOcument} */}
      <div className="md:ml-72">
        <DocumentEditorSection params={params}/>
      </div>
    </div>
  );
};

export default workspaceDocument;
