import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import DocumentOptions from './DocumentOptions';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { toast } from 'sonner';


const DocumentList = ({documentList,params}) => {
    const router=useRouter();

    const deleteDocument=async(docId)=>{
      await deleteDoc(doc(db,"workspaceDocuments",docId))
      toast("Document Deleted!")
    }
    
  return (
    <div>
        {documentList.map((doc,index)=>(

            <div key={index} onClick={()=>router.push('/workspace/'+params?.workspaceid+"/"+doc?.id)} className={`px-2 mt-3 rounded-lg cursor-pointer hover:bg-gray-200 flex justify-between items-center ${doc.id==params?.documentid&&'bg-white'}` }>
                   <div className='flex items-center gap-2' >
                  {!doc.emoji&&  <Image src={'/loopdocument.svg'} width={20} height={20} />}
                    <h2 className="flex gap-2" >{doc?.emoji}{doc.documentName}</h2>
                   </div>
                   <DocumentOptions doc={doc}  deleteDocument={(docId)=>deleteDocument(docId)}/>


            </div>
        ))}
    </div>
  )
}

export default DocumentList