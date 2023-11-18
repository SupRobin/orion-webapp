import buildClient from "../api/build-client";
import homepage from "./frontend/homepage";

const LandingPage = ({currentUser}) => {
    return currentUser ? (
        homepage()
    ) : (
        homepage()
    );
}
//specific to next js fetching data during the showing of the component
LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const {data} = await client.get('/api/users/currentuser');

    return data;
};

export default LandingPage;
