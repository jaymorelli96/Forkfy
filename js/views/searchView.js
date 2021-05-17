import icons from '../../img/icons.svg' //Parcel 1
// import icons from 'url:../img/icons.svg' //Parcel 1
import {Fraction} from 'fractional'


class SearchView {
    #parentEl = document.querySelector('.search');

    getQuery() {
        const query = this.#parentEl.querySelector('.search__field').value;
        this.#clearInput();
        return query;
    }

    #clearInput() {
        return this.#parentEl.querySelector('.search__field').value = '';
    }
 
    addHandlerSearch(handler) {
        this.#parentEl.addEventListener('submit', function(e) {
            e.preventDefault();
            handler();
        })
    }
}

export default new SearchView();