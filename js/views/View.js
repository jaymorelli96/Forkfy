import icons from '../../img/icons.svg' //Parcel 1

export default class View {
    _data;

    _clear() {
        this._parentEl.innerHTML = '';
    }

    clearInsert(position, data) {
        this._clear();
        this._parentEl.insertAdjacentHTML(position, data);
    }

    render(data) {
        if(!data || (Array.isArray(data) && data.length == 0)) return this.renderError();


        this._data = data;

        const markup = this._generateMarkup();
        this.clearInsert('afterbegin', markup);
    }

    renderSpinner = function () {
        const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `;
        this.clearInsert('afterbegin', markup);
      }

    renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>        
        `;
        this.clearInsert('afterbegin', markup);
    }

    renderMessage(message = this._successMessage) {
        const markup = `
        <div class="message">
            <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>        
        `;
        this.clearInsert('afterbegin', markup);
    }
}