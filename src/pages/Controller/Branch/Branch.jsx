import React from 'react'
import { useGetBranch } from '../../../hooks/branch/useBranch'

const Branch = () => {
  const {data}=useGetBranch();
  console.log("🚀 ~ Branch ~ data:", data)
  
  return (
    <div>Branch</div>
  )
}

export default Branch