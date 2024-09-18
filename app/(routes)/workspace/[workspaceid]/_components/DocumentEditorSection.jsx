import React from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import RichDocumetEditor from './RichDocumetEditor'

const DocumentEditorSection = ({params}) => {
  return (
    <div>
        {/* <here is header */}
        <DocumentHeader/>


        {/* Document INfo */}

        <DocumentInfo   params={params}/>





        {/* Rich text editor */}
        <RichDocumetEditor  params={params}/>



    </div>
  )
}

export default DocumentEditorSection