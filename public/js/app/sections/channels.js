import ChannelService from '../services/channel.js';
import Programmes from './programmes.js';

class Channels {
    constructor(element, selectElement) {
        this.element = element;
        this.selectElement = selectElement;
    }
    listenForSelectChange() {
        this.selectElement.addEventListener('change', this.getChosenChannel.bind(this));
    }
    getChosenChannel() {
        const chosenChannel = this.selectElement.value;
        this.getProgrammesFromNewChannel(chosenChannel);
        this.getStrapLine(chosenChannel);
    }
    getProgrammesFromNewChannel(chosenChannel) {
        this.programmes = new Programmes(this.element);
        this.programmes.show(chosenChannel);
    }
    getStrapLine(chosenChannel) {
        const service = new ChannelService();
        service.get()
            .then((response) => {
                const channelsArr = response.data._embedded.channels;
                const chosenChannelData = channelsArr.find(channelObj => {
                    return channelObj.name.toLowerCase() === chosenChannel;
                });

                this.appendStrapLine(chosenChannelData.strapline);
            })
            .catch((err) => {
                console.log('Error loading channels', err);
            });
    }
    appendStrapLine(strapline) {
        const channelTitle = this.element.getElementsByTagName('h1')[0];
        const strapLineTitle = document.createElement('h2');
        strapLineTitle.textContent = strapline;
        channelTitle.parentNode.insertBefore(strapLineTitle, channelTitle.nextSibling);
    }
}

export default Channels;
