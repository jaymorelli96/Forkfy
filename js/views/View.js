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

    update(data)
    {

        this._data = data;
        const newMarkup = this._generateMarkup();

        //Create a new dom from the new markup so it can be compared with the current dom obj
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentEl.querySelectorAll('*'));
        

        //Compare and change the content
        newElements.forEach((newEl, i) => {
            const curElement = curElements[i]; 
            if(!newEl.isEqualNode(curElement) && newEl.firstChild.nodeValue.trim() !== '')
            {
                curElement.textContent = newEl.textContent;
            }
            
            
            //Change attr
            if(!newEl.isEqualNode(curElement))
            {
                Array.from(newEl.attributes).forEach(attr => curElement.setAttribute(attr.name, attr.value))
            }
        });


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