import React from 'react'

const CoverImage = ({image}) => {
  return (
    <div className="relative w-full h-56 bg-gray-200">
      <img src={image || "../../../assets/cover-image.jpeg"} alt="cover-image" />
    </div>
  )
}

export default CoverImage
