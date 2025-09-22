import React from 'react'
import HeroSection from '../components/HeroSection'
import BrowseTheRange from '../components/BrowseTheRange'
import ProductList from '../components/Products'
import RoomSlider from '../components/RoomSlider'
import FurnitureGallery from '../components/Furniture'
import ProductForHome from '../components/ProductForHome'

const Home = () => {
  return (
   <>
     <HeroSection/>
     <BrowseTheRange/>
     {/* <ProductList/> */}
     <ProductForHome/>
     <RoomSlider/>
     <FurnitureGallery/>
   </>
  )
}

export default Home
