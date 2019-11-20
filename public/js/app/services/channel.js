const DOMAIN = 'http://discovery.hubsvc.itv.com/platform/itvonline/ctv/channels?broadcaster=itv&features=hls,aes';
const ACCEPT_HEADER = 'application/vnd.itv.hubsvc.channel.v2+hal+json';

class ChannelService {
    get() {
        return axios({
            method: 'get',
            url: `${DOMAIN}`,
            headers: {
                Accept: ACCEPT_HEADER
            }
        });
    }
}

export default ChannelService;
