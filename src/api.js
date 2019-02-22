import axios from 'axios';

const BASE_URL = 'https://api.suits.org.au'

class Api {
    constructor() {
        this.token = '';
        this.headers = {};
        this.loggedIn = false;
    }

    get(url, params) {
        return axios.get(BASE_URL + url, {
            headers: this.headers,
            params: params
        })
    }

    post(url, data) {
        return axios.post(BASE_URL + url, data, {
            headers: this.headers
        })
    }

    login(user, pass) {
        console.log('Logging in...');
        return this.post('/token', { user: user, pass: pass })
            .then((response) => {
                switch (response.status) {
                    case 403:
                        throw new Error("Invalid username/password");
                    default:
                        break;
                }
                if (response.status >= 400) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`)
                }
                this.token = response.data.token;
                console.log("Logged in successfully.")
                this.headers = {
                    'Authorization': 'Bearer ' + this.token
                }
                this.loggedIn = true;
                this.getMembers();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getMembers() {
        console.log('Getting members')
        return this.get('/members')
            .then((response) => {
                return response.data;
            });
    }
}

export { Api }