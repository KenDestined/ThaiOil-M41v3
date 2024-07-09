({
    doInit: function (component, event, helper) {
        console.log('recordId: ', component.get('v.recordId'));
        component.set("v.showLoading", false);

        var languageList = [
            {
                label: 'Thai',
                value: 'Thai',
            },
            {
                label: 'Vietnamese',
                value: 'Vietnamese',
            },
            {
                label: 'Bahasa',
                value: 'Bahasa',
            },
        ]
        component.set('v.languageList', languageList)
    },

    handleCancel: function (component, event, helper) {
        helper.closeModal(component);
    },

    handleDownload: function (component, event, helper) {
        console.log('Handle next')
        helper.generatePDF(component, event, helper);
    },

    handleSelect: function (component, event, helper) {
        var selectCmp = event.getSource();
        var selectValue = event.getSource().get("v.value");
        var selectName = event.getSource().get("v.name");
        // var selectIdx = selectName.split('_')[1];

        var languageList = component.get('v.languageList');
        languageList.forEach(language => {
            language['selected'] = false;
            if (language.value == selectValue) {
                language['selected'] = true;
                // selectedLanguage = language;
            }
        });
        console.log('Selected language', selectValue);
        component.set('v.selectedLanguage', selectValue);
        component.set('v.languageList', languageList);
    },

})