({
    /**
     * initialize Function used to Fetch the value as soon as the component is started.
     * call helper method named showModal
     */
    doInit: function (component, event, helper) {
        let formFactor = component.get('v.formFactor');

        if (formFactor === 'DESKTOP') {
            helper.showModal(component, event, helper)
        }
    },
})