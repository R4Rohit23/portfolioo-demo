import { useState } from "react";
import { JobData } from "../../interfaces/Job";
import { JobCreationForm } from "../../components/Onboarding/Artist-Onboarding/OnboardingForm";

const Create_Job = () => {
    const [formData, setFormData] = useState<JobData>();
  return (
    <div className='bg-slate-50 h-[90vh] pt-10'>
        <div className='w-11/12 mx-auto divide-y-2 border px-10 pt-10 bg-white shadow-lg'>
            <div className="pb-5">
                <h1 className="text-xl font-semibold">Create a job with 5 easy steps</h1>
                <p className="text-sm">Effortlessly create and post your job listing in just five easy steps.</p>
            </div>
            <div>
                <JobCreationForm data={formData} setData={setFormData}/>
            </div>
        </div>
    </div>
  )
}

export default Create_Job