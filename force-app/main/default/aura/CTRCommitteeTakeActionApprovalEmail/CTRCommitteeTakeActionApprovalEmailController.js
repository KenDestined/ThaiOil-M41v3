({
    doInit : function(component, event, helper) {
        // debugger;
        
        var recordId = component.get('v.recordId');
        var actionFromSFDC = component.get('v.actionFromSFDC');
        var recordTypeName = component.get('v.recordTypeName');
        
        console.log('recordId : '+ recordId);
        console.log('actionFromSFDC : '+ actionFromSFDC);
        console.log('recordTypeName :  '+ recordTypeName);
        
        if (!actionFromSFDC) {
            helper.getRecordTypeName(component, event, helper)
            .then($A.getCallback(function(recordTypeName) {
                    var actionButton = component.get('v.actionButton');
                    if ((recordTypeName == 'CustomerInitial' || recordTypeName == 'SupplierInitial') || recordTypeName.includes('Extend'))  {
                        component.set('v.conditionApprove', 'Approve the Registration request');
                    }
                    
                    if ((recordTypeName == 'CustomerChangeCrCond' || recordTypeName == 'SupplierChangeCrCond' || recordTypeName == 'HedgingChangeCrCond'))  {
                        component.set('v.conditionApprove', 'Approve the change Credit Condition request');
                    }
                    
                    if (actionButton == 'Rejected' && (recordTypeName == 'CustomerInitial' || recordTypeName == 'SupplierInitial'))  {
                        component.set('v.conditionApprove', 'Reject the Registration request');
                    }
                    
                    if (actionButton == 'Rejected' && (recordTypeName == 'CustomerChangeCrCond' || recordTypeName == 'SupplierChangeCrCond' || recordTypeName == 'HedgingChangeCrCond'))  {
                        component.set('v.conditionApprove', 'Reject the change Credit Condition request');
                    }
                    
                    if (actionButton == 'ReplyTRCR')  {
                        component.set('v.conditionApprove', 'Reply to TRCR');
                    }
                    
                    if (actionButton == 'ReplyFA')  {
                        component.set('v.conditionApprove', 'Reply to FA');
                    }
                    
                    if (actionButton == 'ReplyFALB')  {
                        component.set('v.conditionApprove', 'Reply to FALB');
                    }
                }));
        }

        if (actionFromSFDC == 'ApproveFormSFDC' && (recordTypeName == 'CustomerInitial' || recordTypeName == 'SupplierInitial' || recordTypeName.includes('Extend')))  {
            component.set('v.conditionApprove', 'Approve the Registration request');
            console.log('conditionApprove');
        }
        
        if (actionFromSFDC == 'ApproveFormSFDC' && (recordTypeName == 'CustomerChangeCrCond' || recordTypeName == 'SupplierChangeCrCond' || recordTypeName == 'HedgingChangeCrCond'))  {
            component.set('v.conditionApprove', 'Approve the change Credit Condition request');
            console.log('conditionApprove');
        }
        
        if (actionFromSFDC == 'ApproveWithConditionFormSFDC' && (recordTypeName == 'CustomerInitial' || recordTypeName == 'SupplierInitial'))  {
            component.set('v.conditionApprove', 'Approve the Registration request');
            console.log('conditionApproveWithCondition');
        }
        
        if (actionFromSFDC == 'ApproveWithConditionFormSFDC' && (recordTypeName == 'CustomerChangeCrCond' || recordTypeName == 'SupplierChangeCrCond' || recordTypeName == 'HedgingChangeCrCond'))  {
            component.set('v.conditionApprove', 'Approve the change Credit Condition request');
            console.log('conditionApproveWithCondition');
        }
        
        if (recordTypeName == "Type Null")  {
            component.set('v.conditionApprove', 'RecordType Null');
            console.log('ApproveRecordType Null');
        }
        
        if (actionFromSFDC == 'RejectFormSFDC' && (recordTypeName == 'CustomerInitial' || recordTypeName == 'SupplierInitial'))  {
            component.set('v.conditionApprove', 'Reject the Registration request');
            console.log('conditionReject');
        }
        
        if (actionFromSFDC == 'RejectFormSFDC' && (recordTypeName == 'CustomerChangeCrCond' || recordTypeName == 'SupplierChangeCrCond' || recordTypeName == 'HedgingChangeCrCond'))  {
            component.set('v.conditionApprove', 'Reject the change Credit Condition request');
            console.log('conditionReject');
        }
        
        if (recordTypeName == "RejectRecordTypeNull")  {
            component.set('v.conditionApprove', 'RejectRecordType Null');
            console.log('RejectRecordType Null');
        }
        
      var actionButton = component.get('v.actionButton');
        console.log('actionButton doinit '+ actionButton);
        
        //action from sfdc
        if(component.get('v.sendFromSFDC')){
            
            var action = component.get("c.checkPermissionBeforeShowModal");
            action.setParams({
                recordId: recordId
            });
            action.setCallback(this, function (data) {
                // if (data.getState() === 'SUCCESS') {
                //     var returnValue = data.getReturnValue();
                //     console.log('data-->',data);
                //     if(!returnValue){
                //         helper.closeModal(component);
                //         helper.toastEvent('Error','Do not have permission','error');
                //     }
                //     else{
                //         component.set('v.isModalOpen',true);
                //     }
                // }else if(data.getState() === 'ERROR'){
                //     console.log('ERROR: ',data.message);
                // }
                if (data.getState() === 'SUCCESS') {
                    var returnValue = data.getReturnValue();
                    console.log('data-->',data);
                    console.log('data.getReturnValue-->',data.getReturnValue());
                    if(returnValue === 'DoNotHavePermission'){
                        helper.closeModal(component);
                        helper.toastEvent('Error','Do not have permission','error');
                    }
                    else if(returnValue === 'RepliedAgain' && actionFromSFDC === 'ReplyToCreditTeam'){
                        helper.closeModal(component);
                        helper.toastEvent('Error','You have already taken action on the specified process','error');
                    }
                    else if(returnValue === 'ApprovedAgain'){
                        helper.closeModal(component);
                        helper.toastEvent('Error','You have already taken action on the specified process','error');
                    }
                    else{
                        component.set('v.isModalOpen',true);
                    }
                }else if(data.getState() === 'ERROR'){
                    console.log('ERROR: ',data.message);
                }
            });
            $A.enqueueAction(action);
            
        }
        //action from email
        else{
            var action = component.get("c.checkPermissionBeforeShowModalEmail");
            console.log('else recordId : '+ recordId);
            action.setParams({
                recordId: recordId
            });
            action.setCallback(this, function (data) {
                if (data.getState() === 'SUCCESS') {
                    var returnValue = data.getReturnValue();
                    console.log('else data.getReturnValue-->',data.getReturnValue());
                    if(returnValue === 'DoNotHavePermission'){
                        component.set('v.showToast', true);
                        component.set('v.messageType', "error");
                        component.set('v.message', "Do not have permission");
                        component.set('v.showToast', true);
                        setTimeout(() => {
                            window.parent.close();
                        }, 2000); // 2000 milliseconds (2 seconds)
                        // helper.closeModal(component);
                        // helper.toastEvent('Error','Do not have permission','error');
                    }
                    else if(returnValue === 'RepliedAgain' && (actionButton === 'ReplyTRCR' || actionButton === 'ReplyFA' || actionButton === 'ReplyFALB')){
                        component.set('v.showToast', true);
                        component.set('v.messageType', "error");
                        component.set('v.message', "You have already taken action on the specified process");
                        component.set('v.showToast', true);
                        setTimeout(() => {
                            window.parent.close();
                        }, 2000); // 2000 milliseconds (2 seconds)
                    }
                    else if(returnValue === 'ApprovedAgain'){
                        component.set('v.showToast', true);
                        component.set('v.messageType', "error");
                        component.set('v.message', "You have already taken action on the specified process");
                        component.set('v.showToast', true);
                        setTimeout(() => {
                            window.parent.close();
                        }, 2000); // 2000 milliseconds (2 seconds)
                        // helper.closeModal(component);
                        // helper.toastEvent('Error','You have already taken action on the specified process','error');
                    }
                    else{
                        component.set('v.isModalOpen',true);
                    }
                }else if(data.getState() === 'ERROR'){
                    console.log('ERROR: ',data.message);
                    component.set('v.showToast', true);
                    component.set('v.messageType', "error");
                    component.set('v.message', data.getError().message);
                    component.set('v.showToast', true);
                    setTimeout(() => {
                        window.parent.close();
                    }, 2000); // 2000 milliseconds (2 seconds)
                }
            });
            $A.enqueueAction(action);
        }

    },
    buttonConfirm: function (component, event, helper) {
        // debugger;
        //alert('confirm?');
        const actionButton = component.get('v.actionButton');
        console.log('actionButton '+ actionButton);
        // Check action form email btn.

        const input = component.find("input1");
        if(input) {
            if ($A.util.isArray(input)) {
                input[0].reportValidity();
            } else {
                input.reportValidity();
            }
        }

        if(actionButton == 'Approved'){
            component.set('v.actionApproved','Approved');
            helper.approveModal(component, event, helper);
        }
        if(actionButton == 'ApproveWithCondition' || actionButton == 'Rejected' || actionButton == 'ReplyTRCR' || actionButton == 'ReplyFA' || actionButton == 'ReplyFALB'){
            component.set('v.requestField',true);
            var checkInput = component.get('v.input');
            // Check input value null.
            //alert('checkInput ? ' +checkInput);
            component.set('v.commonError', false);
            if(checkInput == '' || checkInput == undefined){
                component.set('v.commonError', true);
                return
            }
            // Do check value equal 'ApproveWithCondition' 
            else if(actionButton == 'ApproveWithCondition'){
                component.set('v.actionApproved','Approved');
                helper.approveModal(component, event, helper);
            }
            // Do check value equal 'Rejected' 
            else if(actionButton == 'Rejected'){
                component.set('v.actionApproved','Rejected');
                helper.approveModal(component, event, helper);
            }
            // Do check value equal 'Reply To TRCR'
            else if(actionButton == 'ReplyTRCR'){
                helper.replyTo(component, event, helper);
            }
            // Do check value equal 'Reply To FA'
            else if(actionButton == 'ReplyFA'){
                //alert('fa');
                helper.replyTo(component, event, helper);
            }
            
            else if(actionButton == 'ReplyFALB'){
                //alert('fa');
                helper.replyTo(component, event, helper);
            }
        } 

        // From SFDC Action
        var actionFromSFDC = component.get('v.actionFromSFDC');
        if(actionFromSFDC == 'ApproveFormSFDC'){
            component.set('v.actionApproved','Approved');
            helper.approveModal(component, event, helper);
        }else if(actionFromSFDC == 'ApproveWithConditionFormSFDC'){
            if(component.get('v.inputCondition')){
                component.set('v.actionApproved','Approved');
                helper.approveModal(component, event, helper);
            }else{
                helper.toastEvent('Error','Please complete Approval Condition','error');
            }
        }else if(actionFromSFDC == 'RejectFormSFDC'){
            if(component.get('v.inputCondition')){
                component.set('v.actionApproved','Rejected');
                helper.approveModal(component, event, helper);
            }else{
                helper.toastEvent('Error','Please complete Reject Reason','error');
            }
        }
     
    },

    buttonClose: function (component, event, helper) {
        const sendFromSFDC = component.get('v.sendFromSFDC')
        if (sendFromSFDC) {
            helper.closeModal(component);
        } else {
            window.parent.close();
        }
    },

    showToast : function(component, event, helper) {
        var params = event.getParam( 'arguments' );  
        try {
          component.find('notifLib').showToast({
                "variant": params.messageType,
                "message": params.message,
                "mode": "dismissable"
            });
        }
        catch(err) {
            component.set("v.message", params.message);
            component.set("v.messageType", params.messageType);
            
            $A.util.removeClass( component.find( 'toastModel' ), 'slds-hide' );
            $A.util.addClass( component.find( 'toastModel' ), 'slds-show' );
            
            var closeTime =  component.get("v.autoCloseTime");
            var autoClose =  component.get("v.autoClose");
            var autoCloseErrorWarning =  component.get("v.autoCloseErrorWarning");
            
            if(autoClose)
                if( (autoCloseErrorWarning && params.messageType != 'success') || params.messageType == 'success') {
                setTimeout(function(){ 
                    $A.util.addClass( component.find( 'toastModel' ), 'slds-hide' ); 
                    component.set("v.message", "");
                    component.set("v.messageType", "");
                }, closeTime);
            }
        }
       
	},
	closeModal : function(component, event, helper) {
        console.log('closeModal comtroller?');
        helper.closeModal(component);
	},
})