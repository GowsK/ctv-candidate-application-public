import Programmes from './programmes.js';

class Categories {
    constructor(element) {
        this.element = element;
    }
    listenForCategoryClick() {
        const categoryBtns = document.querySelectorAll('.list-group__btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', this.getProgrammesFromCategory.bind(this, btn));
        });
    }
    getProgrammesFromCategory(btn) {
        const chosenCategory = btn.value;
        this.programmes = new Programmes(this.element);
        this.programmes.show('itv', chosenCategory);
    }
}

export default Categories;
