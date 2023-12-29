const OrderIndex = ({ orders }) => {
    return (
        <h1> Hellooooo lol</h1>
        // <ul>
        //     <h1>Hello</h1>
        //     {orders.map((order) => {
        //         return (
        //             <li key={order.id}>
        //                 {order.ticket.title} - {order.status}
        //             </li>
        //         );
        //     })}
        // </ul>
    );
};
//
// OrderIndex.getInitialProps = async (context, client) => {
//     const { data } = await client.get('/api/orders');
//
//     return { orders: data };
// };

export default OrderIndex;
