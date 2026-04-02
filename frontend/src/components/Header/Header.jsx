import React from 'react'
import './Header.css'
import foodVideo from '../../assets/food_video.mp4'
import { motion } from 'framer-motion'

const Header = () => {

    const handleViewMenu = () => {
        const section = document.getElementById('explore-menu')
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className='header'>
            <video autoPlay muted loop className='header-video'>
                <source src={foodVideo} type='video/mp4' />
            </video>
            <div className='header-overlay'></div>
            <div className='header-contents'>

                <motion.p
                    className="header-tag"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Cravato.
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Craving Something Delicious?
                </motion.h2>

                <motion.p
                    className="header-subtext"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    We've Got You Covered
                </motion.p>

                <motion.div
                    className="header-buttons"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <button onClick={handleViewMenu}>Explore Menu</button>
                </motion.div>

            </div>
        </div>
    )
}

export default Header