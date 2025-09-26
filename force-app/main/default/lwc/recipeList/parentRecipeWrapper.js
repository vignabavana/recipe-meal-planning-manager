import { LightningElement, track } from 'lwc';

export default class ParentRecipeWrapper extends LightningElement {
    @track recipeCount;

    handleRecipesLoaded(event) {
        this.recipeCount = event.detail.count;
    }
}
