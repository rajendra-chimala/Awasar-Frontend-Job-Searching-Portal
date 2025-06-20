import React from 'react'
import Card from './Components/Card'
import Category from './Components/Category'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Hero from './Components/Hero'
import RecentJobs from './Components/RecentJobs'
import Testimonials from './Components/Testimonials'

const HomePage = () => {
  return (
    <div>
         <Header/>
    <Hero/>
    <RecentJobs/>
    <Category/>
    <Card/>
    <Testimonials/>
    <Footer/>
    </div>
  )
}

export default HomePage