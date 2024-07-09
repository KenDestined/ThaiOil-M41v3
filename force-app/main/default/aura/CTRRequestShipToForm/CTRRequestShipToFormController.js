({
    doInit: function (component, event, helper) {
        console.log('Do init', component.get('v.recordId'), JSON.stringify(component.get('v.recordHeader')), component.get('v.sObjectName'));
        if (component.get('v.recordHeader')) {
            component.set('v.recordHeaderId', component.get('v.recordHeader').Id);
        }
        console.log('sObjectName:'+ component.get('v.sObjectName'));

        if(component.get('v.sObjectName') == 'Account') { // edit from item detail screen
            helper.handleDefaultId(component, event, helper);
            console.log('selectedRequest:'+ JSON.stringify(component.get('v.selectedRequest')));

        } else {
            helper.getDefaultData(component, event, helper);
        }
    },

    handleRecordUpdated: function (component, event, helper) {
        const loadRecord = component.get("v.targetRecord");
        component.set("v.recordOwner", loadRecord != null ? loadRecord.Owner.Name : null);
    },

    handleLoadShipping0: function (component, event, helper) {
        var prepopulateObj;
         if(component.get('v.sObjectName') == 'Account') 
        {
            if(component.get('v.selectedRequest').mSalesArea)
            {
                var SalesArea = component.get('v.selectedRequest').mSalesArea
                prepopulateObj = {
                    SalesDistrict__c: SalesArea.SalesDistrict__c
                }
            }
        }

        if(prepopulateObj)
        {
            helper.prepopulateData(component,prepopulateObj);
        }
    },

    handleLoadShipping1: function (component, event, helper) {
        var prepopulateObj;
         if(component.get('v.sObjectName') == 'Account') 
        {
            if(component.get('v.selectedRequest').mSalesArea)
            {
                var SalesArea = component.get('v.selectedRequest').mSalesArea
                prepopulateObj = {
                    ShippingConditions__c: SalesArea.ShippingCondition__c,
                    MaxPartialDeliveries__c: '1',
                    //PartialDeliveriesperitem__c: SalesArea.PartialDeliveriesperitem__c,
                    DeliveryPriority__c: '02',
                    DeliveryPlant__c: SalesArea.DeliveryPlant__c
                }
            }
        }
        else{
            prepopulateObj = {
                ShippingConditions__c: '02',
                MaxPartialDeliveries__c: '1',
                PartialDeliveriesperitem__c: 'B',
                DeliveryPriority__c: '02',
            }
        }
        if(prepopulateObj)
        {
            helper.prepopulateData(component,prepopulateObj);
        }

    },

    handleLoadShipping2: function (component, event, helper) {
        var prepopulateObj = {
            UnderdeliveryTolerance__c: '5',
            OverdeliveryTolerance__c: '5',
        }
        helper.prepopulateData(component,prepopulateObj);
    },

    handleLoadShipping3: function (component, event, helper) {
        var prepopulateObj;
        if(component.get('v.sObjectName') == 'Account') 
            {
                if(component.get('v.selectedRequest').mSalesArea)
                {
                    var SalesArea = component.get('v.selectedRequest').mSalesArea
                    prepopulateObj = {
                        AccountAssignmentGroup__c: SalesArea.AccountAssignmentGroup__c,
                    }
                }
            }
            if(prepopulateObj)
            {
                helper.prepopulateData(component,prepopulateObj);
            }
    },

    handleLoadMain : function (component, event, helper) {
        component.set('v.showSpinner', false);
    },

    handleSuccess: function (component, event, helper) {
        event.preventDefault();
        const formData = event.getParam('fields');
    },

    handleError: function (component, event, helper) {
    },

    handleSubmit: function (component, event, helper) {
        helper.submitRequestShipTo(component, event, helper);
    },

    toggleSection: function (component, event, helper) {
        var sectionAuraId = event.target.getAttribute("data-auraId");
        // get section Div element using aura:id
        var sectionDiv = component.find(sectionAuraId).getElement();

        var sectionState = sectionDiv.getAttribute('class').search('slds-is-open');

        // -1 open/close section
        if (sectionState == -1) {
            sectionDiv.setAttribute('class', 'slds-section slds-is-open');
        } else {
            sectionDiv.setAttribute('class', 'slds-section slds-is-close');
        }
    },

    closeModal: function (component, event, helper) {
        helper.closeModal(component);
    },

    handleAddJsonHeader: function(component, event, helper) 
    {
        helper.validateField(component, event, helper);
        if(component.get('v.requestType').includes('Edit'))
        {
            helper.addFieldChangeToJson(component,event,'Header');
        }
    },
    handleAddJsonItem: function(component, event, helper) 
    {
        helper.validateField(component, event, helper);
        if(component.get('v.requestType').includes('Edit'))
        {
            helper.addFieldChangeToJson(component,event,'Item');
        }
    },
})