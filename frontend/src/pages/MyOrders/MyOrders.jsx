import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion'
import { io } from 'socket.io-client'

const MyOrders = () => {

    const [data, setData] = useState([]);
    const { url, token, currency } = useContext(StoreContext);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data)
        return response.data.data
    }

    useEffect(() => {
        if (token) {
            fetchOrders().then((orders) => {
                // connect to socket
                const socket = io(url)

                // join each order's room
                orders.forEach(order => {
                    socket.emit('join_order', order._id)
                })

                // listen for status updates
                socket.on('order_status_update', ({ orderId, status }) => {
                    setData(prev => prev.map(order =>
                        order._id === orderId ? { ...order, status } : order
                    ))
                })

                return () => socket.disconnect()
            })
        }
    }, [token])

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Food Processing':
                return { backgroundColor: '#FFF3E0', color: '#E65100', border: '1px solid #E65100' }
            case 'Out for Delivery':
                return { backgroundColor: '#E3F2FD', color: '#1565C0', border: '1px solid #1565C0' }
            case 'Delivered':
                return { backgroundColor: '#E8F5E9', color: '#2E7D32', border: '1px solid #2E7D32' }
            default:
                return { backgroundColor: '#FFF3E0', color: '#E65100', border: '1px solid #E65100' }
        }
    }

    const getStatusStep = (status) => {
        switch (status) {
            case 'Food Processing': return 1
            case 'Out for Delivery': return 2
            case 'Delivered': return 3
            default: return 1
        }
    }

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <motion.div
                        key={index}
                        className='my-orders-order'
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <div className='order-left'>
                            <img src={assets.parcel_icon} alt="" />
                            <div className='order-info'>
                                <p className='order-items'>
                                    {order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        } else {
                                            return item.name + " x " + item.quantity + ", "
                                        }
                                    })}
                                </p>
                                <p className='order-meta'>📦 {order.items.length} items · {currency}{order.amount}.00</p>
                            </div>
                        </div>

                        <div className='order-divider'></div>

                        {/* Status Timeline */}
                        <div className='order-timeline'>
                            {['Food Processing', 'Out for Delivery', 'Delivered'].map((step, i) => (
                                <div key={i} className={`timeline-step ${getStatusStep(order.status) >= i + 1 ? 'active' : ''}`}>
                                    <div className='timeline-dot'>
                                        {getStatusStep(order.status) >= i + 1 ? '✓' : i + 1}
                                    </div>
                                    <p>{step}</p>
                                    {i < 2 && <div className={`timeline-line ${getStatusStep(order.status) >= i + 2 ? 'active' : ''}`}></div>}
                                </div>
                            ))}
                        </div>

                        <div className='order-divider'></div>

                        <div className='order-right'>
                            <p className='order-amount'>{currency}{order.amount}.00</p>
                            <motion.span
                                className='order-status'
                                style={getStatusStyle(order.status)}
                                key={order.status}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                ● {order.status}
                            </motion.span>
                            <button onClick={fetchOrders}>Refresh</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default MyOrders