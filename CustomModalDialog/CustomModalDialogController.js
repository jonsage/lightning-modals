({
    handleClickModal: function(component, evt, helper) {
        var appEvent = $A.get("e.s2cor:OpenCustomModal");
        
        appEvent.setParams({
            size: "medium", // "medium" "large" ("small" is default)
            title: 'Modal Pattern',
            tagline: 'Here&rsquo;s a tagline if you need it. It is allowed to extend across mulitple lines, so I&rsquo;m making up content to show that to you. It is allowed to <a href="#">contain links or be a link</a>.',
            body: 's2cor:CustomModalDialogContent',
            bodyClass: 'slds-p-around_medium',
            footer: 's2cor:CustomModalDialogFooterStandard',
            footerClass: 'slds-grid slds-grid_align-end',
            isFixedHeight: false
        });
        
		appEvent.fire();
    },
    handleClickWizard: function(component, evt, helper) {
        var appEvent = $A.get("e.s2cor:OpenCustomModal");
        
        appEvent.setParams({
            title: 'Wizard Pattern',
            tagline: 'Here&rsquo;s a tagline if you need it. It is allowed to extend across mulitple lines, so I&rsquo;m making up content to show that to you. It is allowed to <a href="#">contain links or be a link</a>.',
            body: 's2cor:CustomModalDialogSuccess',
            bodyClass: 'slds-p-around_medium slds-text-align_center sage-align-center',
            footer: 's2cor:CustomWizardFooterStart', // 's2cor:CustomWizardFooterDone' 's2cor:CustomWizardFooterStep'
            footerClass: 'slds-grid slds-grid_align-spread',
            footerParams: { progressStep: 2 },
            isFixedHeight: true
        });
        
		appEvent.fire();
    },
    handleShowModal: function(component, evt, helper) {
        var cmpName = component.getName(),
        	cmpType = component.getType(),
            evtParams = evt.getParams();

        $A.createComponents([
            	[cmpType + "Header", { title: evtParams.title, tagline: evtParams.tagline }],
            	[cmpType + "Footer", { class: evtParams.footerClass, component: evtParams.footer, params: evtParams.footerParams }],
            	[cmpType + "Body", { class: evtParams.bodyClass, component: evtParams.body, params: evtParams.bodyParams }]
            ], function(components, status) {
            if (status === "SUCCESS") {
                component.find("overlayLib").showCustomModal({
                    header: components[0],
                    footer: components[1],
                    body: components[2],
                    showCloseButton: true,
                    cssClass: "uiModal--" + evtParams.size + (evtParams.isFixedHeight ? " sage-modal_fixed-height " : " ") + cmpName + " " + evtParams.class,
                    closeCallback: function() {
                        //alert("You closed the alert!");
                    }
                })  
            }
        });
    }
})