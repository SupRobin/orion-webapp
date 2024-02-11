import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../components/header'
import CartShow from '../components/cart'

const AppComponent = ({ Component, pageProps, currentUser, order }) => {
    return (
        <div>
            <CartShow order={order} currentUser={currentUser} />
            <Header currentUser={currentUser} />
            <div className='container'>
                <Component currentUser={currentUser} {...pageProps} />
            </div>
        </div>
    )
}

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx)
    const { data } = await client.get('/api/users/currentuser')

    let pageProps = {}
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser)
    }

    return {
        pageProps,
        ...data,
    }
}

export default AppComponent
