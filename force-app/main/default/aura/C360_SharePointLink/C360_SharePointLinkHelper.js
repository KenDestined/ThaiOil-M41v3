({
	getLink : function(component, event, helper) 
	{
        var spFolder = component.get('v.spFolder');
        var recordId = component.get('v.recordId');
        console.log(spFolder);
        var action = component.get('c.getLink');
        action.setParams({'folderName' : spFolder , 'recordId' : recordId});
            action.setCallback(this,function(res)
            {
                var state = res.getState();
                if(state==='SUCCESS')
                {
                    var result = res.getReturnValue();
                    console.log(result);

                        component.set('v.SharePointList', result);
                        console.log('2'+result);

                        component.set("v.loaded", true);

                    //component.set('v.spPath', res.getReturnValue());
                }
            });
            $A.enqueueAction(action);
    },

    checkSendCreateSharePointFolder : function(component, event, helper) 
	{
        component.set('v.loaded',false)
        var recordId = component.get('v.recordId');
        var action = component.get('c.checkSendCreateSharePointFolder');
        console.log('Send check create');
        action.setParams({'recordId' : recordId});
        action.setCallback(this,function(res)
        {
            var state = res.getState();
            console.log('state',state)
            if(state ==='SUCCESS')
            {
                var result = res.getReturnValue();
                console.log('Debug result ',result)
                component.set('v.loaded', true);
                if(result && !result.isCreateSuccess) {
                    helper.showToast(result.message, 'warning');
                } else {
                    helper.openSharepointLink(component, event, helper);
                }
                console.log('Debug loaded',component.get('v.loaded'))
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors && errors[0] && errors[0].message) {
                    helper.showToast(errors[0].message, 'error');
                    console.log("Error message: " + errors[0].message);
                }
            }
        });
        $A.enqueueAction(action);
    },

    showToast: function (message, type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": type,
            "message": message
        });
        toastEvent.fire();
    },

    openSharepointLink: function (component, event, helper) {
        var element = event.getSource();
        var mLink = element.get("v.value");
        var spPath = component.get('v.spPath');
        window.open(mLink);
    }
})