({
    helperMethod : function() {

    },
    changeStatus : function (component,value) {
        if(value == 'Unqualified'){
            component.set('v.showUnqualifiedReason',true);
        }else{
            component.set('v.showUnqualifiedReason',false);
            component.set('v.showOtherUnqualifiedReason',false);
        }        
    },
    closedTeb : function(component){
        var workspaceAPI = component.find("workspace");
        workspaceAPI.getFocusedTabInfo().then(function(response) {
            var focusedTabId = response.tabId;
            workspaceAPI.closeTab({tabId: focusedTabId});
        })
        .catch(function(error) {
            console.log(error);
        });
    },
    changeUnqualifiedReason : function (component,value) {
        if(value == 'Other (reason not listed)'){
            component.set('v.showOtherUnqualifiedReason',true);
        }else{
            component.set('v.showOtherUnqualifiedReason',false);
        }        
    },
    showToast: function (message, isSuccess) {
        const toastType = isSuccess ? "success" : "error";
        const toastParams = {
            type: toastType,
            message: message
        };

        const toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams(toastParams);
        toastEvent.fire();
    },
})