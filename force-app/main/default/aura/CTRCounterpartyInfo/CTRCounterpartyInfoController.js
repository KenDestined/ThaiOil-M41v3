({
    doInit: function (component, event, helper) {
        //   
    },
    handleRecordUpdated: function (component, event, helper) {
        // component.set('v.HeadReqItemRecordId',component.get('v.record').CTRRequestFormHeader__c)
        //alert(component.get('v.record')); 
        //alert(component.get('v.record').CTRRequestFormHeader__c); 
        var record = component.get('v.record');
        console.log('On Init recordtype ',record);
        if(record) {
            console.log('recordtype',record.RecordType.DeveloperName)
            component.set('v.isChangeCr',record.RecordType.DeveloperName.includes('ChangeCr'))
        }
    },
})