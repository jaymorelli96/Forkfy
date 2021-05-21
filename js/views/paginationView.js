import View from './View'
import icons from '../../img/icons.svg' //Parcel 1

class PaginationView extends View 
{
    _parentEl = document.querySelector('.pagination');


    addHandlerClick(handler) 
    {
        this._parentEl.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;


            const gotoPage = +btn.dataset.goto;
            handler(gotoPage);
        })
    }

    _generateMarkup() 
    {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        //Page 1, and there other pages
        if(this._data.page == 1 && numPages > 1)
        {
            return this._generateButton('next');
        }      
        //Last page
        else if(this._data.page == numPages && numPages > 1)
        {
            return this._generateButton('prev');
        }
        //Other page
        else if (this._data.page < numPages){
            return this._generateButton('prev') + this._generateButton('next');;
        }
        
        //Page 1 and there are no other pages
        return '';
    }

    _generateButton(type) 
    {
        if(type === 'next')
        {
            return `
                <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
                <span>Page ${this._data.page + 1}</span>
              </button>
                `;
        }
        else 
        {
            return `
            <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>
            `; 
        }
    }
}

export default new PaginationView();