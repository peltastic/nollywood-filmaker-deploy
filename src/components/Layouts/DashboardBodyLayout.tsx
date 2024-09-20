import React from 'react'

interface Props extends React.PropsWithChildren {}

const DashboardBodyLayout = ({children}: Props) => {
  return (
    <div className='min-h-screen bg-gray-bg-2 px-10 py-10'>{children}</div>
  )
}

export default DashboardBodyLayout