public with sharing class CTRRequestItemTriggerHandler implements ITriggerHandler {
    public static Boolean TriggerDisabled = false;
    public Boolean isDisabled() {
        return TriggerDisabled;
    }
    public void beforeInsert(List<SObject> newItems) 
    {
        CTRRequestItemHandler.CheckRunningNumber((List<CTRRequestFormItem__c>)newItems);
        CTRRequestItemHandler.populateDataBeforeInsert((List<CTRRequestFormItem__c>)newItems);
    }
    public void beforeUpdate(Map<Id, SObject> newItems, Map<Id, SObject> oldItems) 
    {
        CTRRequestItemHandler.validateProductAndAddSalesOrgBeforeUpdate((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
        CTRRequestItemHandler.modifyJsonIdToNameBeforeUpdatev2((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);

        //CTRRequestItemHandler.testPreventApprovedRejectedApprovalProcessBeforeupdate((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
    }
    public void beforeDelete(Map<Id, SObject> oldItems) {

    }
    public void afterInsert(Map<Id, SObject> newItems) {
        System.debug('CTRRequestItemTriggerHandler afterInsert');
        CTRCalloutComXCtrl.organizeData((Map<Id,CTRRequestFormItem__c>)newItems);
        CTRRequestItemHandler.CreateMainFolderSharePointAfterCreate((List<CTRRequestFormItem__c>) newItems.values());
        CTRRequestItemHandler.CreateFolderSharePointAfterCreate((List<CTRRequestFormItem__c>) newItems.values());
        CTRRequestItemHandler.createDestinationCountryAfterInsert((List<CTRRequestFormItem__c>)newItems.values());
        CTRRequestItemHandler.savepointOriginalValueForEditTypeAfterInsert((List<CTRRequestFormItem__c>)newItems.values());
        CTRRequestItemHandler.checkEditSensitiveFieldAfterUpdate(null, (Map<Id,CTRRequestFormItem__c>)newItems);

    }
    public void afterUpdate(Map<Id, SObject> newItems, Map<Id, SObject> oldItems) 
    {
        CTRRequestItemHandler.generateMasterDocResponseSendToSAPAfterUpdate((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
        CTRRequestItemHandler.CreateSharePointForInitialAfterUpdate((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
        CTRRequestItemHandler.AddNewOwnerPermissionToSharePointAfterUpdate((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
        CTRRequestItemHandler.savepointCounterPartyJsonInitialAfterUpdate((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
        CTRRequestItemHandler.setQueueToPendingCcaAfterUpdate((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
        CTRRequestItemHandler.updateHeaderToAccountAfterUpdate((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
        CTRRequestItemHandler.checkEditSensitiveFieldAfterUpdate((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
        //CTRRequestItemHandler.onChangeJsonForEditAfterUpdate((Map<Id, CTRRequestFormItem__c>) oldItems, (Map<Id, CTRRequestFormItem__c>) newItems); 
        CTRRequestItemHandler.SendSalesView_AfterUpdate((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
        CTRRequestItemHandler.SendAdditionalInfo_AfterUpdate((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
        CTRRequestItemHandler.CalloutCDDAndNewsAfterUpdate((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
        CTRRequestItemHandler.approvedEditRecordAfterUpdate((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
        CTRRequestItemHandler.IntegrationToMaintenDataToSAPAfterUpdate((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
        CTRCalloutComXCtrl.pickOutData((Map<Id,CTRRequestFormItem__c>)oldItems, (Map<Id,CTRRequestFormItem__c>)newItems);
    }
    public void afterDelete(Map<Id, SObject> oldItems) {
    }
    public void afterUndelete(Map<Id, SObject> oldItems) {
    }
}