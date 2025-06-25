import React from 'react'
import useAuth from '../../Hooks/useAuth'
import BannerSlider from '../../Components/BannerSlider/BannerSlider'
import PlatformInsights from '../../Components/PlatformInsights/PlatformInsights'
import WhyUseFoodExpiry from '../../Components/FoodExpiry/FoodExpiry'
import QuickTips from '../../Components/QuickTips/QuickTips'
import ExpiringSoon from '../../Components/ExpiringSoon/ExpiringSoon'
import ExpiredItems from '../../Components/ExpiredItems/ExpiredItems'
import { Helmet } from 'react-helmet'

const Home = () => {
  const info = useAuth()
  return (
    <div className='w-4/5 mx-auto'>
       <Helmet>
        <meta charSet="utf-8" />
        <title>Food Expiry</title>
      </Helmet>
      <BannerSlider />
      <PlatformInsights />
      <ExpiringSoon />
      <ExpiredItems />
      <WhyUseFoodExpiry />
      <QuickTips />
    </div>
  )
}

export default Home
