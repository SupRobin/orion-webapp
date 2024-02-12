import React, { Component } from 'react'
import useRequest from '../hooks/use-request'
import Router from 'next/router'

const CartShow = ({ order, currentUser }) => {
    const [cartItems, setCartItems] = useState([
        { id: '1', name: 'Fake Item', quantity: 1, price: 100 },
        { id: '2', name: 'Fake Item 2', quantity: 2, price: 200 },
    ])
    const { doRequest, errors } = useRequest({
        url: '/api/cart',
        method: 'post',
        body: {
            title,
            price,
        },
        onSuccess: () => Router.push('/'),
    })

    const onSubmit = (event) => {
        event.preventDefault()

        doRequest()
    }

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
        return this.state.items.reduce(
            (total, cartItems) => total + cartItems.price,
            0
        )
    }

    return (
        <div class={'w-50 p-3'}>
            <h2>Shopping Cart</h2>
            <ul>
                {this.state.items.map((item) => (
                    <div key={item.title} class={'card w-50'}>
                        <div class={'card-body'}>
                            <h5 class={'card-title'}>{item.title}</h5>
                            <p class={'card-text'}>
                                ${item.price} - ${item.quantity}{' '}
                            </p>
                            <button
                                class='btn btn-danger'
                                onClick={() => removeItem(item.id)}
                            >
                                Remove
                            </button>
                            <button
                                class='btn btn-primary'
                                onClick={() => addItem(item.id)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
            <p>Total: ${calculateTotal()}</p>
            <button
                class={'btn btn-primary btn-lg btn-block'}
                onclick={() => checkOut(order)}
            >
                Check out
            </button>
        </div>
    )
}

export default CartShow
