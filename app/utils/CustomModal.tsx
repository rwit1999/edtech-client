import React, { FC } from 'react'
import { Box, Modal } from '@mui/material'

type Props = {
    open:boolean,
    setOpen:(open:boolean)=>void,
    activeItem:any,
    component:any,
    setRoute?:(route:string)=>void
}

const CustomModal:FC<Props> = ({open,setOpen,activeItem,component:Component,setRoute}) => {
  return (
    <Modal open={open} onClose={()=>setOpen(false)}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 24 }}>
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  )
}

export default CustomModal