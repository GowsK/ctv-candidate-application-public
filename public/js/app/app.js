import Programmes from './sections/programmes.js';
import Channels from './sections/channels.js';
class Application {
    create(element) {
        const select = document.querySelector('.select');
        const defaultChannel = 'itv';

        this.programmes = new Programmes(element);
        this.programmes.show(defaultChannel);

        this.channels = new Channels(element, select);
        this.channels.getStrapLine(defaultChannel);
        this.channels.listenForSelectChange();
    }
}

export default Application;
