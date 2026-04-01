import React from 'react'
import './Header.css'
import foodVideo from '../../assets/food_video.mp4'
import { motion } from 'framer-motion'

const Header = () => {

    const handleViewMenu = () => {
        document.getElementById('explore-menu').scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className='header'>
            <video autoPlay muted loop className='header-video'>
                <source src={foodVideo} type='video/mp4' />
            </video>
            <div className='header-overlay'></div>
            <div className='header-contents'>
                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Order your favourite food here
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    Choose from a diverse menu featuring a delectable array of dishes crafted 
                    with the finest ingredients and culinary expertise. Our mission is to satisfy 
                    your cravings and elevate your dining experience, one delicious meal at a time.
                </motion.p>
                <motion.button
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleViewMenu}
                >
                    View Menu
                </motion.button>
            </div>
        </div>
    )
}

export default Header