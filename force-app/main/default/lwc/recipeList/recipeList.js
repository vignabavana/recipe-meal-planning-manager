import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getRecipes from '@salesforce/apex/RecipeController.getRecipes';

export default class RecipeList extends NavigationMixin(LightningElement) {
    @track recipes;
    @track error;

    columns = [
        { label: 'Recipe Name', fieldName: 'Name' },
        { label: 'Recipe Id', fieldName: 'Id' }
    ];

    @wire(getRecipes)
    wiredRecipes({ error, data }) {
        if (data) {
            this.recipes = data;
            this.error = undefined;
            this.fireRecipesLoadedEvent(data.length);
        } else if (error) {
            this.error = error.body ? error.body.message : error;
            this.recipes = undefined;
        }
    }

    loadRecipes() {
        getRecipes()
            .then(result => {
                this.recipes = result;
                this.error = undefined;
                this.fireRecipesLoadedEvent(result.length);
            })
            .catch(error => {
                this.error = error.body ? error.body.message : error;
                this.recipes = undefined;
            });
    }

    fireRecipesLoadedEvent(count) {
        const event = new CustomEvent('recipesloaded', {
            detail: { count }
        });
        this.dispatchEvent(event);
    }

    viewRecipe(event) {
        const recipeId = event.target.dataset.id;
        // Navigate to the recipe record page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recipeId,
                objectApiName: 'Recipe__c', // Your object API name
                actionName: 'view'
            }
        });
    }
}
