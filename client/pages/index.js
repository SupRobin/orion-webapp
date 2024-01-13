import Link from 'next/link';

const LandingPage = ({ currentUser, items }) => {
    const itemList = items.map((item) => {
        return (
            <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                    <Link href="/items/[itemId]" as={`/items/${item.id}`}>
                        View
                    </Link>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <h1>items</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Link</th>
                </tr>
                </thead>
                <tbody>{itemList}</tbody>
            </table>
        </div>
    );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/items');

    return { items: data };
};

export default LandingPage;
