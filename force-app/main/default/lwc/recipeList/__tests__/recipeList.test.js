import { createElement } from 'lwc';
import RecipeList from 'c/recipeList';

describe('c-recipe-list', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders lightning card', () => {
        const element = createElement('c-recipe-list', {
            is: RecipeList
        });
        document.body.appendChild(element);

        const card = element.shadowRoot.querySelector('lightning-card');
        expect(card).not.toBeNull();
    });
});
