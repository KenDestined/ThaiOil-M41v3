({
    initialize : function(component, event, helper) {
        //var recordId = component.get('v.recordId');
        //var action = component.get('c.getAccountInfo');

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
                    if(result)
                    {
                        component.set('v.isCreatingFolder',(result.length > 0 ? result[0].mSendCreateFolder : false));
                        component.set('v.SharePointList', result);
                        component.set('v.loadedButtonURL', true)
                    }
                        //component.set('v.SharePointList', result);
                        console.log('2'+component.get('v.SharePointList'));

                        component.set("v.loaded", true);
                    console.log('debug loadedButtonURL ',component.get('v.loadedButtonURL'),component.get('v.isCreatingFolder'))
                    //component.set('v.spPath', res.getReturnValue());
                }
            });
            $A.enqueueAction(action);
        //helper.getLink(component, event, helper);
    },
    linkUrl : function(component, event, helper) 
    {
        console.log('Debug isCreatingFolder',component.get('v.isCreatingFolder'))
        
        if(component.get('v.isCreatingFolder')) {
            console.log('Check send create sharepoint')
            helper.checkSendCreateSharePointFolder(component, event, helper);
        } else {
            // var element = event.getSource();
            // var mLink = element.get("v.value");
            // var spPath = component.get('v.spPath');
            // window.open(mLink);
            helper.openSharepointLink(component, event, helper);
        }
    },
})