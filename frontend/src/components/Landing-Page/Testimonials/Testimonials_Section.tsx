import React from 'react'
import Testimonials_Card from './Testimonials_Card'

const Testimonials_Section = () => {
  return (
    <main>
        <h1 className='heading1 capitalize'>What our clients are saying</h1>
        <div className='flex my-10 gap-10'>
            <Testimonials_Card/>
            <Testimonials_Card/>
            <Testimonials_Card/>
        </div>
    </main>
  )
}

export default Testimonials_Section