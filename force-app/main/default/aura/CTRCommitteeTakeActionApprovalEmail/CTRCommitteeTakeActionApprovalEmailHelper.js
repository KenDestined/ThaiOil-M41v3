({
    helperMethod : function() {

    },
    getRecordTypeName: function(component, event, helper) {
        return new Promise($A.getCallback(function(resolve, reject) {
            const action = component.get("c.getRecordTypeName");
            action.setParams({
                committeeId: component.get("v.recordId"),
            });
            action.setCallback(this, function (data) {
                if (data.getState() === 'SUCCESS') {
                    component.set("v.recordTypeName", data.getReturnValue());
                    resolve(data.getReturnValue());
                } else if (data.getState() === 'ERROR') {
                    console.log('ERROR: 222', data.message);
                    reject(data.getError());
                }
            });
            $A.enqueueAction(action);
        }));
    },
    approveModal: function (component) {
        component.set('v.showLoading',true);
        var recordId = component.get("v.recordId");
        var actionApproved = component.get('v.actionApproved');
        var actionButton = component.get('v.actionButton');
        var sendFromSFDC = component.get('v.sendFromSFDC')
        if(sendFromSFDC){
            var remark = component.get('v.inputCondition');
        }else{
            var remark = component.get('v.input');
        }
        // Process to apex class.
        console.log('recordId: 222',recordId);
        console.log('actionApproved: 222',actionApproved);
        console.log('remark: 222',remark);
        console.log('sendFromSFDC 222',sendFromSFDC);
        var action = component.get("c.submitProcrssApprovalRequest");
        action.setParams({
            recordId: recordId,
            appreovalAction: actionApproved,
            remark: remark,
            sendFromSFDC: sendFromSFDC
        });
        action.setCallback(this, function (data) {
            if (data.getState() === 'SUCCESS') {
                if(sendFromSFDC){
                    if(actionApproved == 'Approved'){
                        this.toastEvent('Success','Approved success','success');
                    }else{
                        this.toastEvent('Success','The request has been rejected!','success');
                    }
                    this.closeModal(component);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }else{
                    component.set('v.messageType','success');
                    component.set('v.message',actionButton+' success.');
                    component.set('v.showToast',true);
                    setTimeout(() => {
                        window.parent.close();
                    }, 2000); // 2000 milliseconds (2 seconds)
                }
                component.set('v.showLoading',false);
            }else if(data.getState() === 'ERROR'){
                console.log('ERROR: 222',data.message);
                component.set('v.showToast', true);
                component.set('v.messageType', "error");
                component.set('v.message', data.getError().message);
            }
                        this.closeModal(component);
        });
        $A.enqueueAction(action);
    },
    replyTo: function (component) {
        component.set('v.showLoading',true);
        console.log('component.get("v.recordId" ',component.get("v.recordId"));
        var recordId = component.get("v.recordId");
        var remark = component.get('v.input');
        // Process to apex class.
        var action = component.get("c.submitReplyTo");
        var actionButton = component.get('v.actionButton');
        var sendFromSFDC = component.get('v.sendFromSFDC');
        action.setParams({
            recordId: recordId,
            message: remark,
            actionButton: actionButton
        });
        action.setCallback(this, function (data) {
            if (data.getState() === 'SUCCESS') {
                component.set('v.messageType','success');
                component.set('v.message',actionButton+' success.');
                if (sendFromSFDC) {
                    if (actionButton == 'ReplyFALB') {
                        this.toastEvent('Success','A message to reply to FALB has been sent!','success');
                    } else if (actionButton == 'ReplyFA') {
                        this.toastEvent('Success','A message to reply to FA has been sent!','success');
                    } else {
                        this.toastEvent('Success','A message to reply to TRCR has been sent!','success');
                    }
                    this.closeModal(component);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } else {
                    component.set('v.showToast', true);
                    setTimeout(() => {
                        window.parent.close();
                    }, 2000); // 2000 milliseconds (2 seconds)
                }
            }else if(data.getState() === 'ERROR'){
                console.log('ERROR: ',data.message);
                component.set('v.showToast', true);
                component.set('v.messageType', "error");
                component.set('v.message', "Cannot process, the request already approve or reject.");
            }
            component.set('v.showLoading',false);
            this.closeModal(component);
        });
        $A.enqueueAction(action);
    },
    showToast: function (component, type, message) {
        var callByVFPage = component.get("v.callByVFPage");
        if (callByVFPage == true) {
            this.showCustomToast(component, type, message);
        } else {
            var toastEvent = $A.get("e.force:showToast");
            if (toastEvent) {
                toastEvent.setParams({
                    type: type,
                    message: message,
                });
                toastEvent.fire();
            }
        }
    },
    closeModal: function (component) {
        // $A.get("e.force:closeQuickAction").fire();
        const closeQuickAction = $A.get("e.force:closeQuickAction");
        if (closeQuickAction) {
            closeQuickAction.fire();
        }
        component.set("v.isModalOpen", false);
    },
    toastEvent : function(Title, Message, Type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": Title,
            "message": Message,
            "type": Type
        });
        toastEvent.fire();
    },
})