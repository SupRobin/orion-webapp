const OrderIndex = ({ orders }) => {
    return (
            <h1>Hello</h1>
    );
};

//TODO: Fix this backend for some odd reason 'api/orders isn't working.
// OrderIndex.getInitialProps = async (context, client) => {
//  const { data } = await client.get('/api/orders');
//
//  return { orders: data };
// };

export default OrderIndex;
