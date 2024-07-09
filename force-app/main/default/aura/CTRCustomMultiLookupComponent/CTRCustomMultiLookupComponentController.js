({
    doInit: function (component, event, helper) {
        // helper.getEmailUsers(component);
    },

    scriptsLoaded: function (component, event, helper) {
        helper.jQuery = $;
        helper.getEmailUsers(component, event, helper);
    },

    isDisable: function (component, event, helper) {
        helper.jQuery('.select2Class').select2({
            placeholder: '',
            minimumInputLength: 3,
            disabled: component.get('v.disabled')
        });
    },

    handleChange: function (component, event, helper) {
        console.log('handleChange');
    },

    getSelectedValue: function (component, event, helper) {
        var selectedValuesString = component.get('v.selectedValuesString');
        console.log('getSelectedValue in? ' + selectedValuesString);
        /*
        if(selectedValuesString == null || selectedValuesString == ''){
            selectedValuesString = 'ccemailcommitteetestuser@278tumlkpac10g9kik3znxpnfa13iz7hj9w1rudnbh2cj8m2pw.1m-2nh5eam.cs117.apex.sandbox.salesforce.com';
            component.set('v.selectedValuesString', selectedValuesString);
        }*/
        // console.log('selectedValuesString: ' + selectedValuesString);
        if (selectedValuesString) {
            var selectedValuesList = selectedValuesString.split(', ');

            /*
            if (selectedValuesList.includes('ccemailcommitteetestuser@278tumlkpac10g9kik3znxpnfa13iz7hj9w1rudnbh2cj8m2pw.1m-2nh5eam.cs117.apex.sandbox.salesforce.com')) {
                console.log('selectedValuesList contains email service');
            } else {
                console.log('selectedValuesList does not contain email service');
                selectedValuesList.push('ccemailcommitteetestuser@278tumlkpac10g9kik3znxpnfa13iz7hj9w1rudnbh2cj8m2pw.1m-2nh5eam.cs117.apex.sandbox.salesforce.com');
                alert('add if not contain');
            }
            */
            component.set('v.selectedValuesList', selectedValuesList);
            // Set the selected values
            helper.jQuery(".select2Class").val(selectedValuesList);
            helper.jQuery(".select2Class").trigger("change");
        }
    }

})