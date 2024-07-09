({
    getEmailUsers: function (component, event, helper) {
        var multiPicklist = component.get("v.multiPicklist");

        if (!multiPicklist || multiPicklist.length === 0) {
            var action = component.get("c.getEmailUsers");

            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log('fetching users SUCCESS ' +response.getReturnValue());
                    component.set("v.multiPicklist", response.getReturnValue());
                    helper.initializeSelect2(component, event, helper);
                } else {
                    console.error("Error fetching users");
                }
            });

            $A.enqueueAction(action);
        }
    },

    initializeSelect2: function(component, event, helper) {
        var selectedValuesString = component.get('v.selectedValuesString');
        console.log('selectedValuesString: ' + selectedValuesString);
        setTimeout(function () {
            if (selectedValuesString) {
                var selectedValuesList = selectedValuesString.split(', ');
                component.set('v.selectedValuesList', selectedValuesList);

                // Set the selected values
                helper.jQuery(".select2Class").val(selectedValuesList);
                helper.jQuery(".select2Class").trigger("change");
            }

            helper.jQuery('.select2Class').select2({
                placeholder: '',
                minimumInputLength: 3,
                disabled: component.get('v.disabled')
            });
        }, 300);

        helper.jQuery(".select2Class").on("change", function (e) {
            console.log('selectedValues: ' + $(this).val());
            var selectedValues = helper.jQuery(this).val();
            var selectedValuesString = selectedValues ? selectedValues.join(', ') : '';
            console.log('selectedValuesString: ' + selectedValuesString);
            //if (selectedValuesString) {
            console.log('in?');
            component.set("v.selectedValuesString", selectedValuesString);
            //}
        });
    }

})