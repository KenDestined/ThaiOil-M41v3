public class CTRAccountHandler 
{

    public static void CreateFolderSharePointAfterCreate(Map<Id, Account> mAccountOldMap, Map<Id, Account> mAccountNewMap)
    {
        try
        {
            List<Account> mAccountCreateFolderList = new List<Account>();
            List<Account> mAccountReNameFolderList = new List<Account>();
            Set<Id> mAccountSetId = new Set<Id>();
            
            for(Account mAccount: mAccountNewMap.values())
            {
                if(mAccount.isMigrateData__c == false)
                {
                    if(mAccount.SubmitToCreateSharePointFolder__c == true && mAccount.SubmitToCreateSharePointFolder__c != mAccountOldMap.get(mAccount.Id).SubmitToCreateSharePointFolder__c)
                    {
                        if(mAccount.SFCode__c != null)
                        {
                            if(mAccount.LeadNo__c != null || mAccount.OriginalShipToRequestNumber__c != null)
                            {
                                mAccountReNameFolderList.add(mAccount);
                            }
                            else
                            {
                                mAccountCreateFolderList.add(mAccount);
                            }
                        }
                    } else if(mAccount.Name != mAccountOldMap.get(mAccount.Id).Name || mAccount.AccountNumber__c != mAccountOldMap.get(mAccount.Id).AccountNumber__c || mAccount.SupplierNumber__c != mAccountOldMap.get(mAccount.Id).SupplierNumber__c) {
                        mAccountCreateFolderList.add(mAccount);
                    }
                }
            }
            if(mAccountReNameFolderList.size()>0 || mAccountCreateFolderList.size()>0)
            {
                createCommonOrRenameSharePointFolder(mAccountReNameFolderList, mAccountCreateFolderList);
            }
        }
        catch(exception e)
        {
            System.debug('Error from CTRAccountHandler.CreateFolderSharePointAfterCreate Line: '+e.getLineNumber()+' || Message: '+e.getMessage());
        }
    } 

    public static void createCommonOrRenameSharePointFolder(List<Account> mAccountReNameFolderList, List<Account> mAccountCreateFolderList)
    {
        try
        {
            if(mAccountReNameFolderList.size()>0 || mAccountCreateFolderList.size()>0)
            {
                Id shipToRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('ShipTo').getRecordTypeId();

                C360Integration__c mSetting = C360Integration__c.getInstance();
                List<Map<String, String>> mSendDataList = new List<Map<String, String>>();
                Map<String, Object> mDataToSendMap = new Map<String, Object>();
                if(mAccountReNameFolderList.size()>0)
                {
                    List<CTRIntegraionList__mdt > mIntegrationList = [SELECT Id,MasterLabel, DeveloperName, Endpoint__c, Token__c, Path__c FROM CTRIntegraionList__mdt WHERE DeveloperName = 'CTRRenameFolderSharepoint'];
                    if(mIntegrationList.size()>0)
                    {
                        for(Account mAccount: mAccountReNameFolderList)
                        {
                            Map<String, String> mDataMap = new Map<String, String>();
                            if(String.isNotBlank(mSetting.SharePointMainFolderDuringCreate__c) && String.isNotBlank(mSetting.HerokuIntegrationDomain__c) && String.isNotBlank(mIntegrationList[0].Path__c))
                            {
                                String oldFolder;
                                if(mAccount.OriginalShipToRequestNumber__c != null) { // create ship-to
                                    oldFolder = mAccount.OriginalShipToRequestNumber__c;
                                } else {
                                    oldFolder = mAccount.LeadNo__c;
                                }

                                mDataMap.put('mBody','{"MainFolder": "'+mSetting.SharePointMainFolderDuringCreate__c+'","NewFolderName" : "'+mAccount.SFCode__c+'","OldFolderName" : "'+oldFolder+'"}');
                                mDataMap.put('mEndPoint',mSetting.HerokuIntegrationDomain__c+mIntegrationList[0].Path__c);
                                mDataMap.put('mGatewayId',Uuid.randomUUID());
                                mDataMap.put('mAccountId', mAccount.Id);
                                mDataMap.put('mToken', mIntegrationList[0].Token__c);
                                mDataMap.put('mSendType', 'Account Folder rename');
                            }
                            if(mDataMap.size()>0)
                            {
                                mSendDataList.add(mDataMap);
                                mDataToSendMap.put(mAccount.Id, mDataMap);
                            }

                        }
                    }
                }

                if(mAccountCreateFolderList.size()>0)
                {
                    List<CTRIntegraionList__mdt > mIntegrationList = [SELECT Id,MasterLabel, DeveloperName, Endpoint__c, Token__c, Path__c FROM CTRIntegraionList__mdt WHERE DeveloperName = 'CTRCreateFolderSharepoint'];
                    if(mIntegrationList.size()>0)
                    {
                        for(Account mAccount: mAccountCreateFolderList)
                        {
                            Map<String, String> mDataMap = new Map<String, String>();
                            if(String.isNotBlank(mSetting.SharePointMainFolderDuringCreate__c) && String.isNotBlank(mSetting.HerokuIntegrationDomain__c) && String.isNotBlank(mIntegrationList[0].Path__c))
                            {
                                String subFolder = 'Common';
                                System.debug('Debug maccount '+mAccount.RecordTypeId);
                                if(mAccount.RecordTypeId == shipToRecordTypeId) {
                                    subFolder = 'ShipTo';
                                }
                                String mBody = CTRSharePointLinkController.manageWrapperToCreateFolder(mSetting.SharePointMainFolderDuringCreate__c, mAccount.SFCode__c, subFolder, '', new List<String>(), '', mAccount);
                                if(String.isNotBlank(mBody))
                                {
                                    mDataMap.put('mBody',mBody);
                                    mDataMap.put('mEndPoint',mSetting.HerokuIntegrationDomain__c+mIntegrationList[0].Path__c);
                                    mDataMap.put('mGatewayId',Uuid.randomUUID());
                                    mDataMap.put('mAccountId', mAccount.Id);
                                    mDataMap.put('mToken', mIntegrationList[0].Token__c);
                                    mDataMap.put('mSendType', 'Account Folder creation');
                                }
                            }
                            if(mDataMap.size()>0)
                            {
                                mSendDataList.add(mDataMap);
                                mDataToSendMap.put(mAccount.Id, mDataMap);
                            }
                            //system.enqueuejob(new CTRTriggerWebServiceQueueable(mBody, mIntegrationList[0].Token__c, mEndPoint, 'Folder creation', mAccount.Id, mGatewayId));
                        }
                    }

                }
                
                if(mDataToSendMap.size()>0)
                {
                    for(Map<String, String> mDataToSend: mSendDataList)
                    {
                        CTRTriggerWebServiceQueueable.sendServiceToHeroku(mDataToSend.get('mBody'), mDataToSend.get('mToken'), mDataToSend.get('mEndPoint'), mDataToSend.get('mSendType'),mDataToSend.get('mAccountId'), mDataToSend.get('mGatewayId'));
                        //system.enqueuejob(new CTRTriggerWebServiceQueueable(mDataToSend.get('mBody'), mDataToSend.get('mToken'), mDataToSend.get('mEndPoint'), mDataToSend.get('mSendType'),mDataToSend.get('mAccountId'), mDataToSend.get('mGatewayId')));
                    }
                }
            }
        }
        catch(exception e)
        {
            System.debug('Error from CTRAccountHandler.createCommonOrRenameSharePointFolder Line: '+e.getLineNumber()+' || Message: '+e.getMessage());
        }
    }


    public static void createRequestFolderAfterSharepointFolderReady(Map<Id, Account> mAccountOldMap, Map<Id, Account> mAccountNewMap)
    {
        try
        {
            set<Id> mAccountSetId = new Set<Id>();
            for(Account mAccount: mAccountNewMap.values())
            {
                if(mAccount.CreateSharePointSubFolder__c == true && mAccount.CreateSharePointSubFolder__c != mAccountOldMap.get(mAccount.Id).CreateSharePointSubFolder__c)
                {
                    mAccountSetId.add(mAccount.Id);
                }
            }
            if(mAccountSetId.size()>0)
            {
                Map<Id, CTRRequestFormItem__c> mItemMap = new Map<Id,CTRRequestFormItem__c> ([SELECT Id, Name FROM CTRRequestFormItem__c WHERE Customer__c IN: mAccountSetId]);
                if(mItemMap.size()>0)
                {
                    CTRRequestItemHandler.createFolderDependtoSalesOrg(mItemMap.keySet());
                }
            }
        }
        catch(exception e)
        {
            System.debug('Error from CTRAccountHandler.CreateFolderSharePointAfterCreate Line: '+e.getLineNumber()+' || Message: '+e.getMessage());
        }
    }

    public static void upsertPartnerFunctionShipToAfterUpdate(Map<Id, Account> mAccountOldMap, Map<Id, Account> mAccountNewMap)
    {
        try
        {
            Id mShipToRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('ShipTo').getRecordTypeId();
            Set<Id> mShipToAccountSetId = new set<Id>();
            for(Account mAccount: mAccountNewMap.values())
            {
                if(mAccount.RecordTypeId == mShipToRecordTypeId)
                {
                    System.debug('ShipTo');
                    if(mAccount.CustomerPartner__c != null)
                    {
                        if(mAccount.AccountNumber__c != null && mAccount.AccountNumber__c != mAccountOldMap.get(mAccount.Id).AccountNumber__c)
                        {
                            mShipToAccountSetId.add(mAccount.Id);
                        }
                    }
                }
            }
            if(mShipToAccountSetId.size()>0)
            {
                //List<C360_Relationship__c> mPartnerFunctionList = [SELECT FROM C360_Relationship__c];
                List <Account> mAccountShipToList = [SELECT Id, AccountNumber__c, CustomerPartner__c, CustomerPartner__r.AccountNumber__c  FROM Account WHERE Id IN: mShipToAccountSetId];
                List<C360_Relationship__c> mPartnerFunctionUpdateList = new List<C360_Relationship__c>();
                Set<String>mKeySet = new Set<String>();
                
                for(Account mAccount: mAccountShipToList)
                {
                    if(mAccount.AccountNumber__c != null && mAccount.CustomerPartner__r.AccountNumber__c != null)
                    {
                        mKeySet.add(mAccount.AccountNumber__c+'WE-RE'+mAccount.CustomerPartner__r.AccountNumber__c);
                        mKeySet.add(mAccount.CustomerPartner__r.AccountNumber__c+'WE'+mAccount.AccountNumber__c);
                    }
                }
                System.debug('ShipTo: '+mAccountShipToList);
                Map<String, C360_Relationship__c> mPartnerKeyMap = new Map<String, C360_Relationship__c>();
                List<C360_Relationship__c> mPartnerFunctionList = [SELECT Id, Key__c FROM C360_Relationship__c WHERE Key__c IN: mKeySet];

                for(C360_Relationship__c mPartner: mPartnerFunctionList)
                {
                    mPartnerKeyMap.put(mPartner.Key__c, mPartner);
                }
                System.debug('mPartnerKeyMap: '+mPartnerKeyMap);

                for(Account mAccount: mAccountShipToList)
                {
                    if(mAccount.AccountNumber__c != null && mAccount.CustomerPartner__r.AccountNumber__c != null)
                    {
                        System.debug('mAccount: '+mAccount.AccountNumber__c);
                        String mKeyMainShipTo = mAccount.AccountNumber__c+'WE-RE'+mAccount.CustomerPartner__r.AccountNumber__c;
                        String mKeyMainSoldTo = mAccount.CustomerPartner__r.AccountNumber__c+'WE'+mAccount.AccountNumber__c;

                        if(mPartnerKeyMap.get(mKeyMainSoldTo) == null)
                        {
                            C360_Relationship__c mPartner = new C360_Relationship__c();
                            mPartner.Account__c = mAccount.CustomerPartner__c;
                            mPartner.ReverseAccount__c = mAccount.Id;
                            mPartner.RelationshipType__c = 'WE';
                            mPartner.Key__c = mKeyMainSoldTo;
                            mPartnerFunctionUpdateList.add(mPartner);
                        }
                        if(mPartnerKeyMap.get(mKeyMainShipTo) == null)
                        {
                            C360_Relationship__c mPartner = new C360_Relationship__c();
                            mPartner.Account__c = mAccount.Id;
                            mPartner.ReverseAccount__c = mAccount.CustomerPartner__c;
                            mPartner.RelationshipType__c = 'WE-RE';
                            mPartner.Key__c = mKeyMainShipTo;
                            mPartnerFunctionUpdateList.add(mPartner);
                        }
                    }
                }
                if(mPartnerFunctionUpdateList.size()>0)
                {
                    insert mPartnerFunctionUpdateList;
                }
            }
        }
        catch(exception e)
        {
            System.debug('Error from CTRAccountHandler.upsertPartnerFunctionShipToAfterUpdate Line: '+e.getLineNumber()+' || Message: '+e.getMessage());
        }
    }

    /*@future (callout = true)
    public static void getTokenAndCreateFolderToSharePoint(Set<Id> mAccountSetId)
    {
        //CTRHerokuController.TokenResultWrapper mTokenResult = CTRHerokuController.getToken();
        List<CTRIntegraionList__mdt > mIntegrationList = [SELECT Id,MasterLabel, DeveloperName, Endpoint__c, Token__c, Path__c
                                                            FROM CTRIntegraionList__mdt WHERE DeveloperName = 'CTRCreateFolderSharepoint'];
        //System.debug('Result Token: '+mTokenResult.mResult);

        //if(!mTokenResult.mResult.contains('error'))
        if(mIntegrationList.size()>0)
        {
            List<String> mAccountFields = new List<String>(Account.SObjectType.getDescribe().fields.getMap().keySet());
            String soqlItem = ''
            + ' SELECT ' + String.join(mAccountFields, ',')
            + ' FROM Account'
            + ' WHERE ID IN :mAccountSetId';
            List<Account> mAccountList = Database.query(soqlItem);
            C360Integration__c mSetting = C360Integration__c.getInstance();

            if(mAccountList.size()>0)
            {
                for(Account mAccount: mAccountList)
                {
                    String mBody = '{"MainFolder": "Account","Folder" : "'+mAccount.SFCode__c+'","SubFolder" : "Common"}';
                    String mEndPoint = mSetting.HerokuIntegrationDomain__c+mIntegrationList[0].Path__c;

                    HttpRequest request = new HttpRequest();
                    request.setMethod('POST');  
                    request.setHeader('Content-Type', 'application/json');
                    request.setBody(mBody);
                    request.setEndpoint(mEndPoint);
                    request.setHeader('Authorization', 'Bearer ' +  mIntegrationList[0].Token__c);

                    Http http = new Http();
                    HttpResponse response = http.send(request);

                    if (response.getStatusCode() == 200) 
                    {
                        // Successful response
                        System.debug('Success Response: ' + response.getBody());

                    } 
                    else 
                    {
                        // Error handling
                        System.debug('HTTP error: ' + response.getStatusCode() + ' ' + response.getBody());
                    }

                    //String mJson = JSON.serialize(mBody);
                    //System.enqueuejob(new CTRTriggerWebServiceQueueable(mBody, mTokenResult.mToken, mEndpoint));
                }
            }
        }
    }*/

    
}