import Categories from './categories.js';
import CategoryService from '../services/category.js';
import ProgrammeService from '../services/programme.js';

class Programmes {
    constructor(parentElement) {
        this.parentElement = parentElement;
    }
    show(channel, category) {
        const element = this.createContainer(channel);
        this.createTitle(element, channel, category);
        this.loadProgrammes(element, channel, category);
    }
    createContainer(channel) {
        this.disposeContainer();
        const container = document.createElement('div');
        container.classList.add('programmes');
        container.classList.add(`programmes__${channel}`);
        this.parentElement.appendChild(container);
        return container;
    }
    createTitle(element, channel, category) {
        const title = document.createElement('h1');
        const text = typeof category === 'undefined' ? `${channel.toUpperCase()} Channel` : category;

        title.classList.add('programmes__channel-title');
        title.textContent = text;
        element.appendChild(title);
    }
    disposeContainer() {
        const element = this.parentElement.querySelector('.programmes');
        if (element) {
            this.parentElement.removeChild(element);
        }
    }
    loadProgrammes(element, channel, category) {
        const service = typeof category === 'undefined' ? new ProgrammeService : new CategoryService;
        const asset = typeof category === 'undefined' ? channel : encodeURIComponent(category);

        service.get(asset)
            .then((response) => {
                this.createList(element, response.data._embedded.programmes);
            })
            .catch((err) => {
                console.log('Error loading a programme', err);
            });

    }
    createList(element, list) {
        const ul = document.createElement('ul');
        ul.classList.add('list-group');

        const fragment = document.createDocumentFragment();
        list.forEach((item) => {
            this.appendItem(fragment, item);
        });
        ul.appendChild(fragment);
        element.appendChild(ul);

        const categories = new Categories(this.parentElement);
        categories.listenForCategoryClick();
    }
    appendImage(parent, item) {
        const img = document.createElement('img');
        let url = item._embedded.latestProduction._links.image.href;
        url = url.replace('{quality}', 80);
        url = url.replace('{width}', 400);
        img.setAttribute('src', url);
        parent.appendChild(img);
    }
    appendItem(parent, item) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        this.appendImage(li, item);
        this.appendText(li, item);
        this.appendCategories(li, item);
        this.appendBroadcastDateTime(li, item);
        parent.appendChild(li);
    }
    appendText(parent, item) {
        const title = document.createElement('div');
        let str = '';
        str += `<h3>${item.title}</h3>`;
        str += `<p>${item.synopses.ninety}</p>`;
        str += `<p><b>Duration</b>: ${item._embedded.latestProduction.duration.display}</p>`;
        title.innerHTML = str;
        parent.appendChild(title);
    }
    appendBroadcastDateTime(parent, item) {
        const timestamp = item._embedded.latestProduction.broadcastDateTime.original;
        const date = moment(timestamp).format('Do MMMM YYzY');
        const time = moment(timestamp).format('hA');
        const dateContainer = document.createElement('div');
        let str = `<p><b>Original Broadcast Date</b>: ${date}</p><p><b>Original Broadcast TIme</b>: ${time}</p>`;
        dateContainer.innerHTML = str;
        parent.appendChild(dateContainer);
    }
    appendCategories(parent, item) {
        const categoryContainer = document.createElement('div');
        const categories = item._embedded.latestProduction._embedded.categories;
        
        let str = '';
        str += '<p><b>Category</b>: ';
        categories.forEach(category => {
            str += `<button class="list-group__btn" value="${category.name}">${category.name}</button>`;
        });
        categoryContainer.innerHTML = str;
        parent.appendChild(categoryContainer);
    }
}

export default Programmes;
