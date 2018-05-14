({
    doInit: function (component, event, helper) {
        component.set("v.default", component.get("v.message"));
    },
    onFilesChange: function (component, event, helper) {
        var message = component.get("v.default");
        var extensions = component.get("v.extensions");
        var maxFileSize = component.get("v.filesize");
        
        var fileInput = component.find("fileInput").getElement();
        var file = fileInput.files[0];
        
        var valid = true;
        
        // reset validity
        $A.util.removeClass(component, "invalid");
        
        if (!file) {
            $A.util.removeClass(component, "chosen");
        }
        else {
            $A.util.addClass(component, "chosen");
            
            // check the extension of the file against the options passed in
            if (!(new RegExp("(" + extensions.join("|") + ")$", "i")).test(file.name)) {
                message = "The file type must be " + extensions.join(", ").replace(/,(?=[^,]*$)/, " or");
                valid = false;
            }
            // check the size of the file against the max size passed in
            else if (file.size > maxFileSize) {
                message = "The file must be less than " + (maxFileSize / 1024 / 1024).toFixed(1) + " MB";
                valid = false;
            }
            // all good, display just the file name without any path
            else {
                message = file.name.replace(/.*[\/\\]/, '');
                $A.util.addClass(component, "is-uploading");
            }
        }
        
        component.set("v.message", message);
        
        if (!valid) {
            setTimeout(function(){
                requestAnimationFrame(function() {
                    $A.util.addClass(component, "invalid");
                });
            }, 150);
        }
    }
})