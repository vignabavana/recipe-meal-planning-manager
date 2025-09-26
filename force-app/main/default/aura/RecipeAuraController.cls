public with sharing class RecipeAuraController {
    @AuraEnabled(cacheable=true)
    public static List<Recipe__c> getAllRecipes() {
        return [SELECT Id, Name FROM Recipe__c];
    }
}
