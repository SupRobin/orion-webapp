import React, { Component } from 'react'

const CartShow = ({ order, currentUser }) => {
    const [cartItems, setCartItems] = useState([
        { id: '1', name: 'Fake Item', quantity: 1, price: 100 },
        { id: '2', name: 'Fake Item 2', quantity: 2, price: 200 },
    ])

    const addItem = (id) => {
        const newCartItems = cartItems.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item
        })
        setCartItems(newCartItems)
    }

    const removeItem = (itemId) => {
        const newCartItems = cartItems.filter((item) => item.id !== itemId)
        setCartItems(newCartItems)
    }

    const calculateTotal = () => {
        return this.state.items.reduce((total, cartItems) => total + cartItems.price, 0)
    }

    return (
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {this.state.items.map((item) => (
                    <li key={item.title}>
                        {item.title} - ${item.price} - ${item.quantity}
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                        <button onClick={() => addItem(item.id)}>+</button>
                    </li>
                ))}
            </ul>
            <p>Total: ${calculateTotal()}</p>
        </div>
    )
}

export default CartShow
