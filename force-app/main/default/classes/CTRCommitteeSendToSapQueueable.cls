public with sharing class CTRCommitteeSendToSapQueueable implements  Queueable{
    CTRRequestFormHeader__c mRequestHeader;
    CTRRequestFormItem__c mRequestItem;
    Boolean isIncludeGeneral;

    public CTRCommitteeSendToSapQueueable(CTRRequestFormHeader__c mRequestHeader, CTRRequestFormItem__c mRequestItem, Boolean isIncludeGeneral){
        this.mRequestHeader = mRequestHeader;
        this.mRequestItem = mRequestItem;
        this.isIncludeGeneral = isIncludeGeneral;
    }

    public void execute(QueueableContext context) {
        CTRCommitteeSendToSap.SubmitToSAP(mRequestHeader,mRequestItem,mRequestItem.Id, isIncludeGeneral);
    }
}