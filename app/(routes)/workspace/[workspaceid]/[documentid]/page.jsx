
import React from "react";

import SideNav from "../_components/SideNav";
import DocumentEditorSection from "../_components/DocumentEditorSection";
import { Room } from "@/app/Room";

const workspaceDocument = ({params}) => {
   
  return (
    <Room params={params} >
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
    </Room>
  );
};

export default workspaceDocument;
