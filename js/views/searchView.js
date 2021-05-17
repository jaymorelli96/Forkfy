import icons from '../../img/icons.svg' //Parcel 1
// import icons from 'url:../img/icons.svg' //Parcel 1


class SearchView {
    _parentEl = document.querySelector('.search');

    getQuery() {
        const query = this._parentEl.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }

    _clearInput() {
        return this._parentEl.querySelector('.search__field').value = '';
    }
 
    addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', function(e) {
            e.preventDefault();
            handler();
        })
    }
}

export default new SearchView();