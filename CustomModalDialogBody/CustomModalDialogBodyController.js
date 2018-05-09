({
    doInit : function(cmp) {
        var cmpType = cmp.get("v.component");
        
        $A.util.removeClass(cmp.find("spinner"), "slds-hide");
        
        $A.createComponent(
            cmpType, cmp.get("v.params") || {},
            function(component, status, errorMessage){
                if (status === "SUCCESS") {
                    var body = cmp.get("v.body");
                    body.push(component);
                    cmp.set("v.body", body);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
    onRender : function(cmp) {
        //$A.util.addClass(cmp.find("spinner"), "slds-hide");
    }
})