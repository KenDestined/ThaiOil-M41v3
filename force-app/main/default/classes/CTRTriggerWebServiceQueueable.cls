public with sharing class CTRTriggerWebServiceQueueable implements Queueable
{
    String mJson;
    String mToken;
    String mEndPoint;
    String mSendType;
    Id mRecordId;
    String mGatewayId;
    String mockResponse;


    public CTRTriggerWebServiceQueueable(String mInputJson, String mCurrentToken, String mInputEndpoint, String mInputSendType, Id mInputItemId, String mInputGatewayId) 
    {
        this.mJson = mInputJson;
        this.mToken = mCurrentToken;
        this.mEndPoint = mInputEndpoint;
        this.mSendType = mInputSendType;
        this.mRecordId = mInputItemId;
        this.mGatewayId = mInputGatewayId;
    }

    public CTRTriggerWebServiceQueueable(String mInputJson, String mCurrentToken, String mInputEndpoint, String mInputSendType, Id mInputItemId, String mInputGatewayId, String mInputMockResponse) 
    {
        this.mJson = mInputJson;
        this.mToken = mCurrentToken;
        this.mEndPoint = mInputEndpoint;
        this.mSendType = mInputSendType;
        this.mRecordId = mInputItemId;
        this.mGatewayId = mInputGatewayId;
        this.mockResponse = mInputMockResponse;
    }

    public void execute(QueueableContext context) 
    {
        sendServiceToHeroku(mJson, mToken, mEndPoint,mSendType, mRecordId, mGatewayId, mockResponse);
    }

    public static void sendServiceToHeroku(String mJson, String mToken, String mEndPoint, String mInputSendType, Id mRecordId, String mGatewayId)
    {
        sendServiceToHeroku(mJson, mToken, mEndPoint, mInputSendType, mRecordId, mGatewayId, '');
    }

    @future (callout = true)
    public static void sendServiceToHeroku(String mJson, String mToken, String mEndPoint, String mInputSendType, Id mRecordId, String mGatewayId, String mockResponse)
    {
        HttpRequest request = new HttpRequest();
        request.setMethod('POST');  
        request.setHeader('Content-Type', 'application/json');
        request.setBody(mJson);
        request.setTimeout(120000);
        request.setEndpoint(mEndPoint);
        request.setHeader('Authorization', 'Bearer ' + mToken);
            
        // Make the HTTP request
        Http http = new Http();
        HttpResponse response = new HttpResponse();
        if (!Test.isRunningTest()) {
            response = http.send(request);
        }else{
            // mock data for testing
            if(String.isNotBlank(mockResponse)){
                Map<String,Object> mapResponse = (Map<String,Object>)JSON.deserializeUntyped(mockResponse);
                if(mapResponse.size() > 0){
                    response.setStatusCode(Integer.valueOf(mapResponse.get('status_code')));
                    response.setBody(String.valueOf(mapResponse.get('body')));
                }
            }
        }

        // Parse and handle the response
        if(mRecordId!= null && response != null)
        {
            System.debug(response.getStatusCode());
            String sObjName = mRecordId.getSObjectType().getDescribe().getName();
            if (response.getStatusCode() == 200) 
            {
                System.debug('mRecordId:'+mRecordId);
                System.debug('mInputSendType:'+mInputSendType);
                if(sObjName == 'CTRRequestFormItem__c')
                {
                    System.debug('Success Response1: ' + response.getBody());
                    System.debug('mInputSendType+ '+mInputSendType);
                    if(mInputSendType == 'Sale')
                    {
                        System.debug('Success Response2: ' + response.getBody());
                        CTRRequestFormItem__c mRequestItemUpdate = new CTRRequestFormItem__c(Id = mRecordId);
                        mRequestItemUpdate.IntegrationStatus__c = 'In Progress';
                        mRequestItemUpdate.GatewayId__c = mGatewayId;
                        mRequestItemUpdate.SAPSubmitTime__c = DateTime.now();
                        mRequestItemUpdate.LatestIntegrationName__c = 'Initial Customer Sales View';
                        update mRequestItemUpdate;
                    }
                    else if(mInputSendType == 'AdditionalInfo')
                    {
                        CTRRequestFormItem__c mRequestItemUpdate = new CTRRequestFormItem__c(Id = mRecordId);
                        mRequestItemUpdate.IntegrationStatus__c = 'In Progress';
                        mRequestItemUpdate.GatewayId__c = mGatewayId;
                        mRequestItemUpdate.SAPSubmitTime__c = DateTime.now();
                        mRequestItemUpdate.LatestIntegrationName__c = 'Initial Customer Additional Information';
                        update mRequestItemUpdate;
                    }
                    else if(mInputSendType.contains('Block'))
                    {
                        
                        String mIntegrationName = '';
                        if(mInputSendType.contains('Customer'))
                        {
                            mIntegrationName = 'Block Sales View';
                        }
                        else if(mInputSendType.contains('Supplier'))
                        {
                            mIntegrationName = 'Block Purchasing View';
                        }
                        CTRRequestFormItem__c mRequestItemUpdate = new CTRRequestFormItem__c(Id = mRecordId);
                        mRequestItemUpdate.IntegrationStatus__c = 'In Progress';
                        mRequestItemUpdate.GatewayId__c = mGatewayId;
                        mRequestItemUpdate.SAPSubmitTime__c = DateTime.now();
                        mRequestItemUpdate.LatestIntegrationName__c = mIntegrationName;
                        update mRequestItemUpdate;
                    }
                    else if(mInputSendType.contains('Edit'))
                    {
                        String mIntegrationName = '';
                        if(mInputSendType.contains('Customer'))
                        {
                            mIntegrationName = 'Edit Customer General+Sales View';
                        }
                        else if(mInputSendType.contains('Supplier'))
                        {
                            mIntegrationName = 'Edit Supplier General+Purchasing View';
                        }
                        CTRRequestFormItem__c mRequestItemUpdate = new CTRRequestFormItem__c(Id = mRecordId);
                        mRequestItemUpdate.IntegrationStatus__c = 'In Progress';
                        mRequestItemUpdate.GatewayId__c = mGatewayId;
                        mRequestItemUpdate.SAPSubmitTime__c = DateTime.now();

                        mRequestItemUpdate.LatestIntegrationName__c = mIntegrationName;
                        update mRequestItemUpdate;
                    }
                }
                else if(sObjName == 'Lead')
                {
                    if(mInputSendType == 'NewsSharedHolder')
                    {
                        Lead mLeadUpdate = new Lead(Id = mRecordId);
                        mLeadUpdate.GatewayId__c = mGatewayId;
                        update mLeadUpdate;
                    }
                }
                else if(sObjName == 'Account')
                {

                    if(mInputSendType.contains('Folder'))
                    {
                        Account mAccount = new Account(Id = mRecordId);
                        mAccount.SharePointFolderIsReady__c = true;

                            mAccount.SubmitToSharepointDateTime__c = System.now();
                        
                        update mAccount;
                        // List<CTRRequestFormItem__c> mItemList = [SELECT Id FROM CTRRequestFormItem__c WHERE Customer__c =: mRecordId];
                        // List<CTRRequestFormItem__c> mItemUpdateList = new List<CTRRequestFormItem__c>();
                        // for(CTRRequestFormItem__c mItem: mItemList)
                        // {
                        //     CTRRequestFormItem__c mItemUpdate = new CTRRequestFormItem__c(Id = mItem.Id);
                        //     //mItemUpdate.CreateSharePointSubFolderForInitial__c =true;
                        //     mItemUpdateList.add(mItemUpdate);
                        // }
                        // update mItemUpdateList;
                    }
                }
                
                // Successful response
                System.debug('Success Response3: ' + response.getBody());

            } 
            else 
            {
                if(sObjName == 'CTRRequestFormItem__c')
                {
                    if(mInputSendType == 'Sale')
                    {
                        CTRRequestFormItem__c mRequestItemUpdate = new CTRRequestFormItem__c(Id = mRecordId);
                        mRequestItemUpdate.IntegrationStatus__c = 'Fail';
                        mRequestItemUpdate.SAPStatus__c = 'Pending CCA';
                        mRequestItemUpdate.GatewayId__c = mGatewayId;
                        mRequestItemUpdate.SAPSubmitTime__c = DateTime.now();
                        mRequestItemUpdate.LatestIntegrationName__c = 'Initial Customer Sales View';
                        update mRequestItemUpdate;
                    }
                    else if(mInputSendType == 'AdditionalInfo')
                    {
                        CTRRequestFormItem__c mRequestItemUpdate = new CTRRequestFormItem__c(Id = mRecordId);
                        mRequestItemUpdate.IntegrationStatus__c = 'Fail';
                        mRequestItemUpdate.GatewayId__c = mGatewayId;
                        mRequestItemUpdate.SAPSubmitTime__c = DateTime.now();
                        mRequestItemUpdate.LatestIntegrationName__c = 'Initial Customer Additional Information';
                        update mRequestItemUpdate;
                    }
                    else if(mInputSendType.contains('Block'))
                    {
                        String mIntegrationName = '';
                        if(mInputSendType.contains('Customer'))
                        {
                            mIntegrationName = 'Block Sales View';
                        }
                        else if(mInputSendType.contains('Supplier'))
                        {
                            mIntegrationName = 'Block Purchasing View';
                        }
                        CTRRequestFormItem__c mRequestItemUpdate = new CTRRequestFormItem__c(Id = mRecordId);
                        mRequestItemUpdate.IntegrationStatus__c = 'Fail';
                        mRequestItemUpdate.GatewayId__c = mGatewayId;
                        mRequestItemUpdate.SAPSubmitTime__c = DateTime.now();
                        mRequestItemUpdate.LatestIntegrationName__c = mIntegrationName;
                        update mRequestItemUpdate;
                    }
                    else if(mInputSendType.contains('Edit'))
                    {
                        String mIntegrationName = '';
                        if(mInputSendType.contains('Customer'))
                        {
                            mIntegrationName = 'Edit Customer General+Sales View';
                        }
                        else if(mInputSendType.contains('Supplier'))
                        {
                            mIntegrationName = 'Edit Supplier General+Purchasing View';
                        }
                        CTRRequestFormItem__c mRequestItemUpdate = new CTRRequestFormItem__c(Id = mRecordId);
                        mRequestItemUpdate.IntegrationStatus__c = 'Fail';
                        mRequestItemUpdate.GatewayId__c = mGatewayId;
                        mRequestItemUpdate.SAPSubmitTime__c = DateTime.now();

                        mRequestItemUpdate.LatestIntegrationName__c = mIntegrationName;
                        update mRequestItemUpdate;
                    }
                    
                }
                else if(sObjName == 'Lead')
                {
                    if(mInputSendType == 'NewsSharedHolder')
                    {
                        Lead mLeadUpdate = new Lead(Id = mRecordId);
                        mLeadUpdate.GatewayId__c = mGatewayId;
                        //update mLeadUpdate;
                    }
                }
                else if(sObjName == 'Account')
                {

                    if(mInputSendType.contains('Folder'))
                    {
                        Account mAccount = new Account(Id = mRecordId);
                        mAccount.SubmitToCreateSharePointFolder__c = false;
                        update mAccount;
                    }
                }
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