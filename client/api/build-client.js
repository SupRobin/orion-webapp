import axios from 'axios'

export default ({ req }) => {
    if (typeof window === 'undefined') {
        // We are on the server
        // TODO: get url name then remove the bottom create method and add it to the baseURL field
        // return axios.create({
        //     baseURL:
        //         '',
        //     headers: req.headers,
        // });

        return axios.create({
            baseURL:
                'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers,
        })
    } else {
        // We must be on the browser
        return axios.create({
            baseUrl: '/',
        })
    }
}
