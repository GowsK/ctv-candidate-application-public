const DOMAIN = 'http://discovery.hubsvc.itv.com/platform/itvonline/browser';
const ACCEPT_HEADER = 'application/vnd.itv.hubsvc.programme.v3+hal+json';

class CategoryService {
    get(category) {
        return axios({
            method: 'get',
            url: `${DOMAIN}/programmes?broadcaster=itv&category=${category}`,
            headers: {
                Accept: ACCEPT_HEADER
            }
        });
    }
}

export default CategoryService;
