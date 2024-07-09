({
    generatePDF: function (component, event, helper) {
        console.log('Print pdf ');
        component.set('v.showLoading', true);
        event.preventDefault();
        var action = component.get('c.generatePDF');
        action.setParams({
            mRecordId: component.get('v.recordId'),
            mLanguage: component.get("v.selectedLanguage")
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            console.log('State',state)
            if (state === 'SUCCESS') {
                var resp = response.getReturnValue();
                console.log('Respons ',resp)
                if (resp.Success) {
                    var a = document.createElement("a");
                    a.href = 'data:application/pdf;base64,'+encodeURI(resp.PDFContent);
                    a.download = 'Disclaimer.pdf';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    helper.closeModal(component);
                } else {
                    helper.toastEvent('error', resp.Message, 'error');
                }
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors && errors[0] && errors[0].message) {
                    helper.toastEvent('error', errors[0].message, 'error');
                }
            }
            component.set('v.showLoading', false);
        });
        $A.enqueueAction(action);
    },

    closeModal: function (component) {
        component.set('v.isModalOpen', false);
        $A.get("e.force:closeQuickAction").fire();
    },

    toastEvent: function (Title, Message, Type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": Title,
            "message": Message,
            "type": Type
        });
        toastEvent.fire();
    },

})