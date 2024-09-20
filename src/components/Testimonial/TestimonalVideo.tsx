import React from 'react'
import VideoBox from '../VideoBox/VideoBox'
import VideoCaptions from '../Captions/VideoCaptions'

type Props = {}

const TestimonalVideo = (props: Props) => {
  return (
    <div className="">
        <VideoBox />
        <div className="mt-10">

        <VideoCaptions />
        </div>
    </div>
  )
}

export default TestimonalVideo