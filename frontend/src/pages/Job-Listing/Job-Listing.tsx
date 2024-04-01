import React from 'react'
import JobSidebar from '../../components/Job-Listing/Sidebar'

const JobListing = () => {
  return (
    <div className="bg-slate-50 h-[90vh]">
      <div className="w-11/12 mx-auto">
        <JobSidebar />
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default JobListing