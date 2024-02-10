import React, { Component } from 'react';

const CartShow = ({order, currentUser}) => {
    const [items, ]
        this.state = {
            items: [],
        };


    // Add an item to the cart
    addItem(item) {
        this.setState((prevState) => ({
            items: [...prevState.items, item],
        }));
    }

    // Remove an item from the cart
    removeItem(itemId) {
        this.setState((prevState) => ({
            items: prevState.items.filter((item) => item.id !== itemId),
        }));
    }

    // Calculate the total price of items in the cart
    calculateTotal() {
        return this.state.items.reduce((total, item) => total + item.price, 0);
    }

    render() {
        return (
            <div>
                <h2>Shopping Cart</h2>
                <ul>
                    {this.state.items.map((item) => (
                        <li key={item.id}>
                            {item.name} - ${item.price}
                            <button onClick={() => this.removeItem(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <p>Total: ${this.calculateTotal()}</p>
            </div>
        );
    }
}

export default Cart;
