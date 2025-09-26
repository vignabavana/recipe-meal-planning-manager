public with sharing class RecipeController {
    @AuraEnabled(cacheable=true)
    public static List<Recipe__c> getAllRecipes() {
        return [SELECT Id, Name FROM Recipe__c];
    }
}
