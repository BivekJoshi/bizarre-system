import React from 'react'
import DropZoneUploadCsv from '../../../components/DropZoneUploadFIle/DropZoneUploadCsv'

const ImportItemCSV = ({onClose}) => {
  return (
    <DropZoneUploadCsv onClose={onClose}/>
  )
}

export default ImportItemCSV