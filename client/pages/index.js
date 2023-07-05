import buildClient from "../api/build-client";

const LandingPage = ({currentUser}) => {
    return currentUser ? (
        <h1> You are signed in </h1>
    ) : (
        <h1> You are not signed in</h1>
    );
}
//specific to next js fetching data during the showing of the component
LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const {data} = client.get('/api/users/currentuser');

    return data;
};

export default LandingPage;
