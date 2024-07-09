public class CTRTriggerGenerateFileQueueable implements Queueable {
    private List<CTRRequestFormItem__c> reqItemList;
    // private List<Attachment> masterDocList;

    public CTRTriggerGenerateFileQueueable(List<CTRRequestFormItem__c> reqItemList) {
        this.reqItemList = reqItemList;
        // this.masterDocList = masterDocList;
    }

    public void execute(QueueableContext context) {
        // for (Integer i = 0; i < this.filename.size(); i++) {
            generateMasterDoc(this.reqItemList);
        // }
    }

    public static void generateMasterDoc(List<CTRRequestFormItem__c> reqItemList) {
        //...
        try
        {
            // List<CTRRequestFormItem__c> toUpdateItems = new List<CTRRequestFormItem__c>();
            List<Attachment> masterDocList = new List<Attachment>();
            for(CTRRequestFormItem__c mItem : reqItemList) {
                PageReference pageRef = Page.CTRCustomerMasterForm;
                pageRef.getParameters().put('recordId',mItem.Id);
        
                Attachment cusMasterDoc = new Attachment();
                cusMasterDoc.ParentId = mItem.Id;
                cusMasterDoc.Name = 'CustomerMasterForm.doc';
                cusMasterDoc.Description = 'Customer Master Form ';
                cusMasterDoc.ContentType = 'application/msword';
                cusMasterDoc.Body = pageRef.getContent(); // converting your binary string to Blog
                masterDocList.add(cusMasterDoc);
        
                mItem.MasterDocumentGenerateStatus__c = 'Document Generated'; //after file generated
                // toUpdateItems.add(updateItem);
            }

            if(masterDocList.size() > 0) {
                insert masterDocList;
                update reqItemList;
            }
        }
        catch(exception e)
        {
            System.debug('Error CTRTriggerGenerateFileQueueable  line:'+e.getLineNumber()+' || Message:'+e.getmessage());
        }
    }
}