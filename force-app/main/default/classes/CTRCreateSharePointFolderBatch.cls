public class CTRCreateSharePointFolderBatch implements Database.Batchable<sObject>, Database.stateful, Database.AllowsCallouts {
    private String query;
    private CTRIntegraionList__mdt mIntegration;
    private C360Integration__c mSetting;

    public CTRCreateSharePointFolderBatch() {
    }

    public Database.QueryLocator start(Database.BatchableContext BC){
        List<CTRIntegraionList__mdt> mIntegrationList = [SELECT Id,MasterLabel, DeveloperName, Endpoint__c, Token__c, Path__c FROM CTRIntegraionList__mdt WHERE DeveloperName = 'CTRCreateFolderSharepoint' LIMIT 1];
        if(mIntegrationList.size() > 0) {
            this.mIntegration = mIntegrationList[0];
        }
        this.mSetting = C360Integration__c.getInstance();

        Datetime lastThreeHours = datetime.now().addhours(-3);
        // Datetime lastThreeHours = datetime.now().addhours(-30); // for debugging
        // System.debug('Debug last 3 hours '+lastThreeHours);
        this.query = 'SELECT Id, Name, AccountNumber__c, SupplierNumber__c, SubmitToCreateSharePointFolder__c, SFCode__c, RecordTypeId, RecordType.DeveloperName, AccountGroup__c FROM Account WHERE isMigrateData__c = TRUE AND SubmitToCreateSharePointFolder__c = FALSE AND SFCode__c != NULL';
        //this.query +=' AND CreatedDate > :lastThreeHours';
        return Database.getQueryLocator(this.query);
    }

    public void execute(Database.BatchableContext bc, List<Account> scope){
        System.debug('Execute batch SendCreateSharePointFolderBatch size = '+scope.size());

        List<Map<String, String>> mSendDataList = new List<Map<String, String>>();
        Map<String, Object> mDataToSendMap = new Map<String, Object>();
        if(this.mIntegration != null) {
            for(Account mAccount: scope) {

                
                Map<String, String> mDataMap = new Map<String, String>();
                if(String.isNotBlank(this.mSetting.SharePointMainFolderDuringCreate__c) && String.isNotBlank(this.mSetting.HerokuIntegrationDomain__c) && String.isNotBlank(this.mIntegration.Path__c)) {
                    String subFolder = 'Common';
                    if(mAccount.RecordType.DeveloperName.contains('ShipTo') || mAccount.AccountGroup__c == 'ZSHP') {
                        subFolder = 'ShipTo';
                    }
                    String mBody = CTRSharePointLinkController.manageWrapperToCreateFolder(this.mSetting.SharePointMainFolderDuringCreate__c, mAccount.SFCode__c, subFolder, '', new List<String>(), '', mAccount);
                    if(String.isNotBlank(mBody))
                    {
                        mDataMap.put('mBody',mBody);
                        mDataMap.put('mEndPoint',this.mSetting.HerokuIntegrationDomain__c+this.mIntegration.Path__c);
                        mDataMap.put('mGatewayId',Uuid.randomUUID());
                        mDataMap.put('mAccountId', mAccount.Id);
                        mDataMap.put('mToken', this.mIntegration.Token__c);
                        mDataMap.put('mSendType', 'Account Folder creation');
                    }
                }
                if(mDataMap.size()>0) {
                    mSendDataList.add(mDataMap);
                    mDataToSendMap.put(mAccount.Id, mDataMap);
                }
                
            }
        }

        if(mDataToSendMap.size()>0) {
            System.debug('List to call out '+mDataToSendMap.size());
            for(Map<String, String> mDataToSend: mSendDataList) {
                sendServiceToHeroku(mDataToSend.get('mBody'), mDataToSend.get('mToken'), mDataToSend.get('mEndPoint'), mDataToSend.get('mSendType'),mDataToSend.get('mAccountId'), mDataToSend.get('mGatewayId'));
            }
            sleep(3);
        }
        
        if(scope.size() > 0){
            System.debug('::::::::: Finish SendCreateSharePointFolderBatch ::::::::::::::::');
            Database.SaveResult[] logUpsertResult = Database.update(scope);
            for (Database.SaveResult logUpsert : logUpsertResult) {
                List<Database.Error> errors = logUpsert.getErrors();
                for(Database.Error theError:Errors) {
                    System.debug(theError);
                }
            } 
        }
    }

    public void finish(Database.BatchableContext bc){

    }

    public static void sleep(Integer secs ) {
        datetime myStartDateTime = datetime.now();
        DateTime newDateTime = myStartDateTime.addSeconds(secs);
        while (datetime.now() < newDateTime ) {
        // sleeping here...sort of
        }
        datetime myEndDateTime = datetime.now();
        System.debug('start:  ' + myStartDateTime ) ;
        System.debug('end:  ' + myEndDateTime) ;
    }

    // @future(callout = true) 
    private static void sendServiceToHeroku(String mJson, String mToken, String mEndPoint, String mInputSendType, Id mRecordId, String mGatewayId)
    {
        System.debug('Send Service to heroku '+mEndPoint+':'+mInputSendType+':'+mRecordId);
        HttpRequest request = new HttpRequest();
        request.setMethod('POST');  
        request.setHeader('Content-Type', 'application/json');
        request.setBody(mJson);
        request.setTimeout(120000); 
        request.setEndpoint(mEndPoint);
        request.setHeader('Authorization', 'Bearer ' + mToken);
            
        // Make the HTTP request
        Http http = new Http();
        HttpResponse response = http.send(request);

        // Parse and handle the response
        if(mRecordId!= null)
        {
            System.debug(response.getStatusCode());
            String sObjName = mRecordId.getSObjectType().getDescribe().getName();
            if (response.getStatusCode() == 200) 
            {
                System.debug('mRecordId:'+mRecordId);
                System.debug('mInputSendType:'+mInputSendType);
                if(sObjName == 'Account')
                {
                    Account mAccountQ = [SELECT Id,SubmitToSharepointDateTime__c FROM Account WHERE Id=:mRecordId];
                    if(mInputSendType.contains('Folder'))
                    {
                        Account mAccount = new Account(Id = mRecordId);
                        mAccount.SharePointFolderIsReady__c = true;
                        mAccount.SubmitToCreateSharePointFolder__c = true; // update flag
                        if(mAccountQ.SubmitToSharepointDateTime__c == null)
                        {
                            mAccount.SubmitToSharepointDateTime__c = System.now();
                        }
                        update mAccount;
                    }
                }
                
                // Successful response
                System.debug('Success Response3: ' + response.getBody());

            } 
            else 
            {

                // Error handling
                System.debug('HTTP error: ' + response.getStatusCode() + ' ' + response.getBody());
            }
        }
        else
        {
            if (response.getStatusCode() == 200) 
            {
                System.debug('Success Response no update: ' + response.getBody());
            }
            else
            {
                System.debug('HTTP noupdate error: ' + response.getStatusCode() + ' ' + response.getBody());
            }
        }
    }
}