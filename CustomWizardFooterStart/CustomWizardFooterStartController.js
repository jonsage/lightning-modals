({
    doInit : function(component) {
        $A.createComponents([
            ["lightning:progressIndicator", { currentStep: component.getReference('v.progressStep'), variant: "shaded", hasError: component.getReference('v.progressError') }],
            ["lightning:progressStep", { label: "Step One", value: 1 }],
            ["lightning:progressStep", { label: "Step Two", value: 2 }],
            ["lightning:progressStep", { label: "Step Three", value: 3 }],
            ["lightning:progressStep", { label: "Step Four", value: 4 }]
        ], function(components, status) {
            if (status === "SUCCESS") {
                components[0].set("v.body", components.slice(1));
                component.set('v.progressIndicator', components[0]);
            }
        });
    },
    handleNext : function(component) {
        component.set('v.progressStep', Math.min(4, component.get('v.progressStep') + 1));
    },
    handleBack : function(component) {
        component.set('v.progressStep', Math.max(1, component.get('v.progressStep') - 1));
    }
})