({
    getRecipes : function(component) {
        var action = component.get("c.getAllRecipes"); // Apex method
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.recipes", response.getReturnValue());
            } else {
                console.error('Error fetching recipes: ', response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})
