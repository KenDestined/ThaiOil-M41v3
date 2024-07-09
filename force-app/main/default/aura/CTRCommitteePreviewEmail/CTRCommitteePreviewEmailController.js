({
    doInit: function (component, event, helper) {
        var emailTo = component.get('v.email.EmailTo__c');

        component.set('v.formattedEmailTo', emailTo);
        if (emailTo && emailTo.includes(',')) {
            let formattedEmailTo = emailTo.replace(/,/g, ",\n");
            component.set('v.formattedEmailTo', formattedEmailTo);
            // component.set('v.formattedEmailTo', 'Multiple Recipients cannot be displayed, Please check email from previous page');
        }

        var emailMsg = component.get('v.email.Message__c');
        console.log('Oninit prview email',emailMsg)
        if(emailMsg) {
            if(emailMsg.includes('<img ') && !emailMsg.includes('<img style')) {
                emailMsg = emailMsg.replaceAll('<img ','<img style="max-width:100%; height:auto" ');
                component.set('v.email.Message__c',emailMsg)
            }
        }
        console.log('Debug emailmsg',emailMsg)
    },

    closeModal: function (component, event, helper) {
        component.set("v.isModalOpen", false);
    },
})