const DOMAIN = 'http://discovery.hubsvc.itv.com/platform/itvonline/browser';
const ACCEPT_HEADER = 'application/vnd.itv.hubsvc.programme.v3+hal+json';

class ProgrammeService {
    get(channel) {
        return axios({
            method: 'get',
            url: `${DOMAIN}/programmes?channelId=${channel}&broadcaster=itv`,
            headers: {
                Accept: ACCEPT_HEADER
            }
        });
    }
}

export default ProgrammeService;
