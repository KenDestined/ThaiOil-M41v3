({
    doInit : function(component, event, helper) 
    {
        console.log('do init');

        var recordId = component.get("v.recordId");        
        var action = component.get("c.getDefaultData2"); 
        action.setParams({recordId: recordId});
        console.log('before apex');

        action.setCallback(this, function(response) 
        {
            var state = response.getState();
            console.log('state: '+state);

            if (state === 'SUCCESS') 
            {
                var result = response.getReturnValue();
                console.log('result:',result);
                console.log('result:'+result.mResult);

                if(result.mResult.includes('Success') && result.hasPermission)
                {
                    console.log('result success:'+result.mRecordTypeName);

                    //var mToken = result.mToken;
                    var mHeader = result.mRequestHeader;
                    var mItem = result.mRequestItem;
                    //component.set('v.mToken', mToken);
                    component.set('v.mRequestItem', mItem);
                    component.set('v.mRequestHeader', mHeader);

                    console.log('mRequestHeader:'+JSON.stringify(mHeader));

                    // helper.handleConditions(component,result)
                    console.log('Before display msg');
                    helper.handleState(component, helper, result)
                    component.set('v.loaded',true);
                    //var validatemessage = 'ByPass';
                    /*if(!mHeader.Customer__r.SAPConfirmedData__c)
                    {
                        component.set("v.isFirstTime", true);
                        var validatemessage = helper.validateRequiredFieldHelper(mHeader, mItem, component.get("v.mainComponentName"));

                        if(validatemessage[0] == 'ByPass')// && mToken != 'blank')
                        {
                            component.set('v.mDataReady', true);
                            console.log('ready');

                        }
                        else
                        {
                            component.set('v.mValidateMessageList', validatemessage);
                            console.log('data blank');

                        }
                    }
                    else
                    {
                        component.set("v.isFirstTime", false);

                    }*/
                    //helper.toastEvent('Success','Update Service Cost to SAP','success');
                } else if(result && ('hasPermission' in result) && !result.hasPermission) 
                    {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title": "Error!",
                            "message": "Do not have permission",
                            "type": "error"
                        });
                        toastEvent.fire();
    
                        $A.get("e.force:closeQuickAction").fire();
                        this.closeModal(component);
                    }
                else
                {
                    helper.toastEvent('Error','Internal Error Please contact your administrator.','error');
                }
                component.set('v.loaded', true);
                console.log('SUCCESS');
            }
            else
            {
                helper.toastEvent('Error','Internal Error Please contact your administrator.','error');
                console.log('ERROR:: ',data.message);
                helper.closeModal(component);
                component.set('v.loaded', true);

            }
        });
        $A.enqueueAction(action);

    },
    
    submit : function(component, event, helper) 
    {
        var mButtonName = component.get("v.ConfirmButtonName");
        if(mButtonName == 'Confirm')
        {
            var TypeToSend = component.get("v.mainComponentName");
            helper.SendToSAP(component);
        }
        else if (mButtonName == 'Inform CCA')
        {
            helper.SendToSAP(component);
            //helper.toastEvent('Success','MOCK successfully!','success');
            //helper.closeModal(component);
        }
    },	

    closeModal : function(component, event, helper) 
    {
        helper.closeModal(component);
    },
	donePreview: function (component) {
        
        component.set("v.isPreviewTable", false);
    },

    handleBtnClick: function(component, event, helper) {
        var action = event.getSource().get("v.name");
        console.log('Debug btn click ',action)

        if(action == 'previewTable') {
            helper.previewTable(component, event, helper)
        } else if(action == 'submitWithGeneral') {
            helper.submitWithGeneral(component, event, helper)
        } else if(action == 'submitWithOutGeneral') {
            helper.submitWithOutGeneral(component, event, helper)
        }
    }
})