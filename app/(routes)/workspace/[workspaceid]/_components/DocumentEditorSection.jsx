"use client"
import React from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import RichDocumetEditor from './RichDocumetEditor'
import { Button } from '@/components/ui/button'
import { MessageCircle, X } from 'lucide-react'
import { Room } from '@/app/Room'
import CommentBox from './CommentBox'
import { useState } from 'react'

const DocumentEditorSection = ({params}) => {
  const[openComment,setOpenComment]=useState(false);
  return (
    <div>
        {/* <here is header */}
        <DocumentHeader/>


        {/* Document INfo */}

        <DocumentInfo   params={params}/>


 <div className="grid grid-cols-4">

      <div className="col-span-3">
        {/* Rich text editor */}
        <RichDocumetEditor  params={params}/>
        </div>
        <div className="fixed right-5 bottom-5">
          <Button onClick={()=>setOpenComment(!openComment)}>{openComment? <X/>: <MessageCircle/>}</Button>
         {openComment&& <CommentBox/>}
        </div>
        </div>

    </div>
  )
}

export default DocumentEditorSection