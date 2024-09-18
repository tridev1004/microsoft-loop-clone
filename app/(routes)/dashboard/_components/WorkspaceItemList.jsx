import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const WorkspaceItemList = ({workspaceList}) => {
  const router=useRouter();
  const onClickWorkspaceItem=(workspaceId)=>{
    router.push('/workspace/'+workspaceId)

  }
  return (
    <div className="grid grid-cols-2 gap-6 mt-6 md:grid-cols-3 lg:grid-cols-4 ">
        {workspaceList&&workspaceList.map((workspace,index)=>{
            return (
            <div key={index} className='transition-all border shadow-xl cursor-pointer rounded-xl hover:scale-105 ' onClick={()=>onClickWorkspaceItem(workspace.id)}>
                <Image src={workspace?.coverImage} height={200} width={400} alt="cover"  
                
                
                className="h-[150px] object-cover rounded-t-xl"/>
                <div className='p-4 rounded-b-xl'>
                <h2 className="flex gap-2">{workspace?.emoji}{workspace.workspaceName}</h2>
                </div>
            </div>

            )
        })}



    </div>
  )
}

export default WorkspaceItemList