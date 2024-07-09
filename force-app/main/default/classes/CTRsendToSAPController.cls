public with sharing class CTRsendToSAPController 
{
    public class wrapperResultData
    {
        @AuraEnabled public String mRecordId{ get; set; }
        @AuraEnabled public CTRRequestFormHeader__c mRequestHeader{ get; set; }
        @AuraEnabled public CTRRequestFormItem__c mRequestItem{ get; set; }
        @AuraEnabled public String mRecordTypeName{ get; set; }
        @AuraEnabled public String mAccountNumber{ get; set; }
        @AuraEnabled public String mSupplierNumber{ get; set; }
        @AuraEnabled public Integer mQueue{ get; set; }
        @AuraEnabled public List<CTRSapInformationController.options> mPicklist{ get; set; }
        //@AuraEnabled public boolean mGeneralViewCreated{ get; set; }

        //@AuraEnabled public String mToken{ get; set;}
        @AuraEnabled public String mResult{ get; set;}
    }

    public class wrapperCCAEmailData {
        public Contact contact{ get; set; }
        public EmailTemplate emailTemplate { get; set; }
        public List<String> attachmentIds { get; set; }
        public CTRRequestFormItem__c requestItemObj { get; set; }
        public List<String> emailTo { get; set; }
        public List<String> emailCC { get; set; }
    }

    public Static List<CTRRequestFormItem__c> getRequestItemForSendToSAP(Set<Id> mSetId)
    {
        List<String> mRequestItemFields = new List<String>(CTRRequestFormItem__c.SObjectType.getDescribe().fields.getMap().keySet());
            String soqlItem = ''
            + ' SELECT ' + String.join(mRequestItemFields, ',')
            + ' ,CTRRequestFormHeader__r.Country__r.Code__c'
            + ' ,Customer__r.AccountNumber__c, RecordType.Name'
			+ ' ,Customer__r.SupplierNumber__c'
            + ' ,Partner__r.SupplierNumber__c, Partner__r.AccountNumber__c'
            + ' ,Owner.ProfileId, Owner.Profile.Name, Owner.Email, Owner.Name'
            + ' ,RecordType.DeveloperName ,TermofPayment__r.Code__c'
            + ' ,CustomerType__r.Code__c ,CustomerGroup__r.Code__c'
            + ' ,Industry__r.Code__c ,SubIndustry__r.Code__c'
            + ' ,Application__r.Code__c ,InterGroup__r.Code__c'
            + ' ,CTRRequestFormHeader__r.CompanyNameENF__c'
            + ' ,CTRRequestFormHeader__r.CustomerSearchTermEN__c'
            + ' FROM CTRRequestFormItem__c'
            + ' WHERE ID IN :mSetId';
            List<CTRRequestFormItem__c> mRequestItemList = Database.query(soqlItem);
            return mRequestItemList;
    }

    public Static List<CTRRequestFormHeader__c> getRequestHeaderForSendToSAP(Set<Id> mSetId)
    {
        List<String> mRequestHeaderFields = new List<String>(CTRRequestFormHeader__c.SObjectType.getDescribe().fields.getMap().keySet());            
                String soqlHeader = ''
                    + ' SELECT ' + String.join(mRequestHeaderFields, ',')
                    + ' ,Country__r.Code__c'
                    + ' ,TransportationZone__r.Code__c'
                    + ' ,TradingPartner__r.Code__c'
                    + ' ,CityStateLocal__r.Description__c'
                    + ' ,Customer__r.AccountNumber__c'
                    + ' ,Customer__r.SupplierNumber__c'
                    + ' ,RecordType.DeveloperName'
                    + ' FROM CTRRequestFormHeader__c'
                    + ' WHERE ID IN :mSetId';
                List<CTRRequestFormHeader__c> mHeaderList = Database.query(soqlHeader);
            return mHeaderList;
    }

    @AuraEnabled 
    public Static wrapperResultData getDefaultData2(String recordId)
    {
        try
        {
            CTRRequestFormItem__c mRequestItem;
            CTRRequestFormHeader__c mHeader;
            Integer mQueue = 0;
            String mDiffGeneralJson = '[]';

            //Ship to process and populate required data 
            User mUser = [SELECT Id, Name, Email FROM User WHERE ID = :UserInfo.getUserId() LIMIT 1];
            mRequestItem = [SELECT Id, Name, RecordTypeId, RecordType.DeveloperName, CTRRequestFormHeader__c, CTRRequestFormHeader__r.Name ,CTRRequestFormHeader__r.CompanyNameENF__c, BusinessUnit__c,
                                    Customer__c, Customer__r.AccountNumber__c, Customer__r.SupplierNumber__c, Partner__c  FROM CTRRequestFormItem__c WHERE Id =: recordId];
            CTRRequestFormItem__c mRequestItemUpdate = new CTRRequestFormItem__c(id= recordId);
            if(mRequestItem.RecordType.DeveloperName == 'ShipToCreate')
            {
                List<Account> mAccountList = [SELECT ID FROM Account WHERE Id =:mRequestItem.Partner__c AND RecordType.DeveloperName = 'ShipTo'];
                if(mAccountList.size() == 0)
                {
                    Id mOrinalAccountId = mRequestItem.Customer__c;
                    Id mShipToRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('ShipTo').getRecordTypeId();
                    Account mAccount = new Account();
                    mAccount.RecordTypeId = mShipToRecordTypeId;
                    mAccount.Name = mRequestItem.CTRRequestFormHeader__r.Name;
                    // mAccount.OriginalShipToRequestNumber__c = mRequestItem.Name;
                    mAccount.CustomerPartner__c = mOrinalAccountId;
                    insert mAccount;

                    mHeader = new CTRRequestFormHeader__c(Id = mRequestItem.CTRRequestFormHeader__c);
                    mHeader.Partner__c = mAccount.Id;
                    update mHeader;

                    mRequestItemUpdate.Partner__c = mAccount.Id;
                }
            }
            mRequestItemUpdate.SubmitToSAPUser__c = UserInfo.getUserId();
            mRequestItemUpdate.SubmitToSAPUserName__c = mUser.Name;
            mRequestItemUpdate.SubmitToSAPUserEmail__c = mUser.Email;
            
            // if(mRequestItem.RecordType.DeveloperName != 'ShipToCreate' && mRequestItem.Customer__c != null)
            // {
            //     system.debug('mRequestItem cust'+mRequestItem.Customer__r.AccountNumber__c+' - '+mRequestItem.Customer__r.SupplierNumber__c);
            //     if(mRequestItem.Customer__r.AccountNumber__c != null || mRequestItem.Customer__r.SupplierNumber__c != null)
            //     {
            //         Set<Id> mCustomerSetId = new set<Id>();
            //         Set<Id> mHeaderSetId = new set<Id>();
            //         mCustomerSetId.add(mRequestItem.Customer__c);
            //         mHeaderSetId.add(mRequestItem.CTRRequestFormHeader__c);
    
            //         Map<Id, String> mAccountJsonMapResult = new Map<Id, String>();
            //         Map<Id, String> mHeaderJsonMapResult = new Map<Id, String>();
            //         Map<String, String> mCounterPartyFieldListMap = CTRRequestEditLogFieldController.getMetadataFieldListFromSource('Counter party');
            //         Map<String, String> mSAPInfoFieldListMap = CTRRequestEditLogFieldController.getMetadataFieldListFromSource('SAP Information');
    
            //         // if(mCounterPartyFieldListMap.size()>0)
            //         // {
            //         //     //Account To Json
            //         //     String mAccountObjName = 'Account';
            //         //     List<String> mAccountFieldList = CTRRequestEditLogFieldController.getFieldListFromJsonFiltered(mCounterPartyFieldListMap.get(mAccountObjName), mAccountObjName,'');
            //         //     if(mAccountFieldList.size()>0)
            //         //     {
            //         //         mAccountJsonMapResult = CTRRequestEditLogFieldController.manageQueryObjToJson(mAccountFieldList, mAccountObjName, mCustomerSetId);
            //         //     }
            //         // }
                    
            //         Map<String, String> mGeneralChangedFieldMap = new Map<String, String>();
            //         String mHeaderObjName = 'CTRRequestFormHeader__c';
            //         String mBu = (mRequestItem.BusinessUnit__c == 'TX')?'TX':'TOP';
            //         String mRecordType = (mRequestItem.RecordType.DeveloperName.contains('Supplier'))?'Supplier':'Customer';
            //         String mBuType = mBu+mRecordType;

            //         if(mSAPInfoFieldListMap.size()>0)
            //         {
            //             String mAccountObjName = 'Account';
            //             List<String> mAccountFieldList = CTRRequestEditLogFieldController.getFieldListFromJsonFiltered(mSAPInfoFieldListMap.get(mAccountObjName), mAccountObjName,'');
            //             if(mAccountFieldList.size()>0)
            //             {
            //                 //mAccountJsonMapResult = CTRRequestEditLogFieldController.manageQueryObjToJson(mAccountFieldList, mAccountObjName, mCustomerSetId);
            //             }

            //             List<String> mHeaderFieldList = CTRRequestEditLogFieldController.getFieldListFromJsonFiltered(mSAPInfoFieldListMap.get(mHeaderObjName), mHeaderObjName, mBuType);
            //             if(mHeaderFieldList.size()>0)
            //             {
            //                 //mHeaderJsonMapResult = CTRRequestEditLogFieldController.manageQueryObjToJson(mHeaderFieldList, mHeaderObjName, mHeaderSetId);
            //             }
            //             System.debug('mAccountFieldList: '+mAccountFieldList.size());
            //             System.debug('mHeaderFieldList: '+mHeaderFieldList.size());
            //         }
            //         System.debug('mAccountJsonMapResult: '+mAccountJsonMapResult.get(mRequestItem.Customer__c));
            //         System.debug('mHeaderJsonMapResult: '+mHeaderJsonMapResult.get(mRequestItem.CTRRequestFormHeader__c));
    
            //         //Map<String, Object> mHeaderFieldDataMap = CTRRequestEditLogFieldController.getFieldMapFromJsonFiltered(mSAPInfoFieldListMap.get(mHeaderObjName), mHeaderObjName, mBuType);
            //         //mDiffGeneralJson = CTRRequestEditLogFieldController.filteredCompareAccountAndHeaderJson(recordId,mAccountJsonMapResult.get(mRequestItem.Customer__c), mHeaderJsonMapResult.get(mRequestItem.CTRRequestFormHeader__c), mHeaderFieldDataMap, mBuType);
            //     }
            // }
            mRequestItemUpdate.InternalGeneralChangedField__c = mDiffGeneralJson;
            update mRequestItemUpdate;
            System.debug('mDiffGeneralJson: '+mDiffGeneralJson);

            // Query data in CTRRequest Form Item Object...
            Set<Id> mItemSetId = new Set<Id>();
            mItemSetId.add(recordId);

            List<CTRRequestFormItem__c> mRequestItemList = getRequestItemForSendToSAP(mItemSetId);
            if(mRequestItemList.size()>0)
            {
                mRequestItem = mRequestItemList[0];
                if(mRequestItem.RecordType.DeveloperName.contains('Customer'))
                {
                    List<CTRRequestFormItem__c> mRelatedItemList = [SELECT Id, SalesOrganization__c, Customer__c, Customer__r.AccountNumber__c FROM CTRRequestFormItem__c 
                                                                    WHERE Customer__c =: mRequestItem.Customer__c AND SalesOrganization__c = :mRequestItem.SalesOrganization__c 
                                                                    AND (SAPStatus__c = 'Pending CCA' OR (SAPStatus__c = 'Queue CCA' AND SAPSubmitTime__c != null))];

                    if(mRequestItem.SAPStatus__c == 'SAP Confirmed General View')
                    {
                        mQueue = mRelatedItemList.size();
                    }
                    
                }

                if(mRequestItem.CTRRequestFormHeader__c != null)
                {
                    Set<Id> mHeaderSetId = new Set<Id>();
                    mHeaderSetId.add(mRequestItem.CTRRequestFormHeader__c);
                    List<CTRRequestFormHeader__c>mHeaderList = getRequestHeaderForSendToSAP(mHeaderSetId);
                    mHeader=mHeaderList[0];
                }
            }

            wrapperResultData mResultData = ManageReturnResultData(recordId, mHeader, mRequestItem, mQueue, 'Success');//, mTokenResult.mToken, mTokenResult.mResult);
            return mResultData;
        }
        catch(exception e)
        {
            String mResult = 'Apex Error: Get Token Error line:'+e.getLineNumber()+' Message: '+ e.getMessage();
            System.debug('Exception: ' + mResult);
            wrapperResultData mResultData = ManageReturnResultData(recordId, null, null, 0, 'error');//, 'blank', mResult);
            return mResultData;        
        }
    }
   

   public Static wrapperResultData ManageReturnResultData(Id nRecordId, CTRRequestFormHeader__c mRequestHeader, CTRRequestFormItem__c mRequestItem, Integer mQueue, String mResult)//, String mToken, String mResult)
   {
       wrapperResultData mResultData = new wrapperResultData();
       mResultData.mRecordId = nRecordId;
       mResultData.mRequestHeader = mRequestHeader;
       mResultData.mRequestItem = mRequestItem;
       mResultData.mRecordTypeName = mRequestItem.RecordType.DeveloperName;
       //mResultData.mGeneralViewCreated = mRequestItem.Customer__r.SAPConfirmedData__c;
       mResultData.mAccountNumber = mRequestItem.Customer__r.AccountNumber__c;
       mResultData.mSupplierNumber = mRequestItem.Customer__r.SupplierNumber__c;
       mResultData.mPicklist = CTRSapInformationController.convertedDropdownToOptions('CTRRequestFormHeader__c','PhoneCountryCode__c');
       mResultData.mQueue = mQueue;
       mResultData.mResult = mResult;
       return mResultData;
   }

       //Onload Table
       @AuraEnabled
       public Static CTRRequestEditLogFieldController.editLevelWrapper onloadTable(CTRRequestFormItem__c mItem)
       {
           try
           {
               List<CTRRequestEditLogFieldController.editChangeFieldWrapper> mEditItemList = new List<CTRRequestEditLogFieldController.editChangeFieldWrapper>();
               List<CTRRequestEditLogFieldController.editChangeFieldWrapper> mEditHeaderList = new List<CTRRequestEditLogFieldController.editChangeFieldWrapper>();
               List<CTRRequestEditLogFieldController.editChangeFieldWrapper> mAllDataList = new List<CTRRequestEditLogFieldController.editChangeFieldWrapper>();
               
                String mAccountOriginalValue = '[]';

                Boolean mEnabledNewFunction = false;

                    if(mItem.Customer__r.AccountNumber__c != null || mItem.Customer__r.SupplierNumber__c != null)
                    {
                        mEnabledNewFunction = true;
                    }

                       if(mEnabledNewFunction)
                       {
                           Set<Id>mCustomerSetId= new Set<Id>();
                           mCustomerSetId.add(mItem.Customer__c);
                           //Map<String, String> mCounterPartyFieldListMap = new Map<String, String>();
                           Map<Id, String> mAccountJsonMapResult = new Map<Id, String>();
                           Map<String, String> mCounterPartyFieldListMap = CTRRequestEditLogFieldController.getMetadataFieldListFromSource('SAP Information');
                           if(mCounterPartyFieldListMap.size()>0)
                           {
                               //Account To Json
                               String mAccountObjName = 'Account';
                               List<String> mAccountFieldList = CTRRequestEditLogFieldController.getFieldListFromJsonFiltered(mCounterPartyFieldListMap.get(mAccountObjName), mAccountObjName,'');
                               if(mAccountFieldList.size()>0)
                               {
                                   mAccountJsonMapResult = CTRRequestEditLogFieldController.manageQueryObjToJson(mAccountFieldList, mAccountObjName, mCustomerSetId);
                               }
                           }
                           if(mAccountJsonMapResult.size()>0)
                           {
                               mAccountOriginalValue = mAccountJsonMapResult.values()[0];
                           }
                        
   
                            //Header Json
                            String mHeaderLatestValue = (String.isNotBlank(mItem.InternalGeneralChangedField__c))?mItem.InternalGeneralChangedField__c:'[]';
        
                            //Convert Header Json To Obj
                            //List<Object> mHeaderOriginalList = convertJsonToObject(mAccountOriginalValue);
                            List<Object> mHeaderOriginalList = CTRRequestEditLogFieldController.convertJsonToObject(mAccountOriginalValue);
                            List<Object> mHeaderLatestList = CTRRequestEditLogFieldController.convertJsonToObject(mHeaderLatestValue);

                            mEditHeaderList = CTRRequestEditLogFieldController.manageRequestWrapperForTable(mHeaderOriginalList,mHeaderLatestList, true);
                            mAllDataList.addAll(mEditHeaderList);
                                Boolean mEnabledItemHistory = false;
                            if(mEnabledItemHistory)
                            {
                                //Item Json
                                String mItemOriginalValue = (String.isNotBlank(mItem.InternalOriginalField__c))?mItem.InternalOriginalField__c:'[]';
                                String mItemLatestValue = (String.isNotBlank(mItem.InternalEditField__c))?mItem.InternalEditField__c:'[]';
        
                                //Convert Item Json To Obj
                                List<Object> mItemOriginalList = CTRRequestEditLogFieldController.convertJsonToObject(mItemOriginalValue);
                                List<Object> mItemLatestList = CTRRequestEditLogFieldController.convertJsonToObject(mItemLatestValue);
        
                                mEditItemList = CTRRequestEditLogFieldController.manageRequestWrapperForTable(mItemOriginalList,mItemLatestList, false);
                                mAllDataList.addAll(mEditItemList);
                            }
                    }
                       String jsonStr = JSON.serialize(mAllDataList);
                       jsonStr = jsonStr.replace('null', '""');
                       //System.debug('jsonStr all'+jsonStr);
                   
   
               
   
               List<CTRRequestEditLogFieldController.editChangeFieldWrapper> mAllEditList = new List<CTRRequestEditLogFieldController.editChangeFieldWrapper>();
               mAllEditList.addAll(mEditHeaderList);
               mAllEditList.addAll(mEditItemList);

               CTRRequestEditLogFieldController.editLevelWrapper mLevelWrapper = new CTRRequestEditLogFieldController.editLevelWrapper();
               mLevelWrapper.mItemEditList =mEditItemList;
               mLevelWrapper.mHeaderEditList = mEditHeaderList;
               mLevelWrapper.mAllEditList = mAllEditList;
               //mLevelWrapper.mRelatedEditList = mResultRelatedList;
   
               return mLevelWrapper;
           }
           catch(exception e)
           {
               System.debug('error from editlog line: '+e.getLineNumber()+' || message: '+e.getmessage());
               return new CTRRequestEditLogFieldController.editLevelWrapper();
           }
       }

   @AuraEnabled 
   public Static String SubmitToSAP(CTRRequestFormHeader__c mRequestHeader, CTRRequestFormItem__c mRequestItem, Id mRecordId, Boolean isIncludeGeneral)
   {
        try
        {
            C360Integration__c mSetting = C360Integration__c.getInstance();
            String mResult = '';
            String mEndPoint = mSetting.HerokuIntegrationDomain__c;
            String mPath = '';
            Id mOwnerId = mRequestItem.OwnerId;
            CTRBuProfile__mdt mBuProfile = CTRBuProfileController.checkBusinessUnitFromProfile(mOwnerId, mRequestItem.Id);
            String mBusinessUnit = mBuProfile.BusinessUnit__c;

            // CTRHerokuController.TokenResultWrapper mTokenResult = CTRHerokuController.getToken();
            CTRIntegraionList__mdt mIntegrationInitialCustomer = CTRIntegraionList__mdt.getInstance('CTRCustomer');
            CTRIntegraionList__mdt mIntegrationInintialSupplier = CTRIntegraionList__mdt.getInstance('CTRSupplier');
            CTRIntegraionList__mdt mIntegrationAdditionalInfo = CTRIntegraionList__mdt.getInstance('CTRCustomerAdditionalInfo');

            String mDataTypeGeneralView = '';
            String mDataTypeSalesPurchaseView = '';
            System.debug('add:'+mIntegrationAdditionalInfo);

            Boolean mProcessCCA =false;
            Boolean mProcessQueueCCA =false;
            if(mIntegrationInitialCustomer != null || mIntegrationInintialSupplier != null || mIntegrationAdditionalInfo != null)
            {
                String mToken = (mIntegrationInitialCustomer!= null)?mIntegrationInitialCustomer.Token__c: mIntegrationInintialSupplier.Token__c;
                String mIntegrationName = '';
                String mGatewayId = (mRequestItem.GatewayId__c != null)?mRequestItem.GatewayId__c: Uuid.randomUUID();
                String mRecordTypeName = (mRequestItem.RecordType.DeveloperName.contains('Supplier'))?'Supplier':'Customer';
                if(mRequestItem.RecordType.DeveloperName.contains('ShipTo'))
                {
                    mRecordTypeName = 'ShipTo';
                }
                //CTRCustomerRequestFormItemModelData mCustomerData = new CTRCustomerRequestFormItemModelData();
                //CTRSupplierRequestFormItemModelData mSupplierData = new CTRSupplierRequestFormItemModelData();
                CTRShipToRequestFormItemModelData mShipToData = new CTRShipToRequestFormItemModelData();
                CTRBlockRequestFormItemModelData mBlockData = new CTRBlockRequestFormItemModelData();
                CTRBlockSupplierRequestFormItemModelData mBlockSupplier = new CTRBlockSupplierRequestFormItemModelData();

                CTRRequestItemIntegrationEditController.mapLv1 mEditData = new CTRRequestItemIntegrationEditController.mapLv1();

                List<CTRIntegrationMapping__mdt> mAllMappingList = [SELECT Id, BusinessUnit__c, IntegrationType__c, JsonMapping__c, RecordType__c, ViewName__c,SupportIntegrationType__c FROM CTRIntegrationMapping__mdt];

                String jsonInput = '';
                String mSendType = '';
                if(mRequestItem.RecordType.DeveloperName.contains('Customer'))
                {
                    mPath = mIntegrationInitialCustomer.Path__c;
                    if(mRequestItem.RecordType.DeveloperName.contains('Initial') || mRequestItem.RecordType.DeveloperName.contains('Extend'))
                    {
                        System.debug('mRequestItem.RecordType.DeveloperName'+mRequestItem.RecordType.DeveloperName);
                        
                        if(mRequestItem.Customer__r.AccountNumber__c != null)
                        {
                            System.debug('accnum found');
                            // has customer number waiting for mapping cca
                            if(mRequestItem.SAPCCAMapped__c == false)
                            {
                                System.debug('not mapping cca yet');
                                if(isIncludeGeneral)
                                {
                                    System.debug('Dynamic general');
                                    mDataTypeGeneralView = 'Dynamic';
                                    mDataTypeSalesPurchaseView = '';
                                    mSendType = 'General';
                                    mIntegrationName = 'Initial Customer General View';
                                }
                                else
                                {
                                    System.debug('no Dynamic general');
                                    //has customer number & cca not mapped -> send mail noti for CCA
                                    List<CTRRequestFormItem__c> mRelatedItemList = [SELECT Id FROM CTRRequestFormItem__c 
                                    WHERE Customer__c =:mRequestItem.Customer__c AND SAPStatus__c = 'Pending CCA' AND SalesOrganization__c = :mRequestItem.SalesOrganization__c];

                                    if(mRelatedItemList.size() == 0)
                                    {
                                        System.debug('cca found');
                                        // Set<Id> mUserSetId = new Set<Id>();
                                        // mUserSetId.add(UserInfo.getUserId());
                                        List<CTRRequestFormItem__c> mRequestItemList = new List<CTRRequestFormItem__c>();
                                        mRequestItemList.add(mRequestItem);
                                        EmailInformCCA(mRequestItemList);
                                        mProcessCCA = true;
                                    }
                                    else
                                    {
                                        CTRRequestFormItem__c mRequestItemUpdate = new CTRRequestFormItem__c(Id = mRequestItem.Id);
                                        mRequestItemUpdate.SAPStatus__c = 'Queue CCA';
                                        mRequestItemUpdate.SAPSubmitTime__c = DateTime.Now();                
                                        update mRequestItemUpdate;
                                        mProcessQueueCCA = true;
                                    }
                                }

                            }
                            else
                            {
                                if(mRequestItem.SAPStatus__c == '' || 
                                mRequestItem.SAPStatus__c == 'Unsuccessful Send General view to SAP' ||
                                mRequestItem.SAPStatus__c == 'SAP Confirmed General View')
                                {
                                    System.debug('Change General view');
                                        mDataTypeGeneralView = 'Dynamic';
                                        mDataTypeSalesPurchaseView = '';
                                        mSendType = 'General';
                                        mIntegrationName = 'Initial Customer General View';
                                }
                                else if(mRequestItem.SAPStatus__c == 'Unsuccessful Send Sales/Purchasing view to SAP')
                                {
                                    System.debug('Sales view unsuccess after mapping cca ');
                                        mDataTypeGeneralView = '';
                                        mDataTypeSalesPurchaseView = 'Static';
                                        mSendType = 'Sales';
                                        mIntegrationName = 'Initial Customer Sales View';
                                }
                                // else
                                // {
                                //     System.debug('general view after mapping cca ');
                                //     //has customer number & cca mapped -> Dynamic general + Static sales view(Manual if unsuccess)
                                //     if(isIncludeGeneral) {
                                //         mDataTypeGeneralView = 'Dynamic';
                                //     }
                                //     mDataTypeSalesPurchaseView = '';
                                //     mSendType = 'General';
                                //     mIntegrationName = 'Initial Customer General View';
                                // }
                            }
                        }
                        else
                        {
                           //if(mRequestItem.RecordType.DeveloperName.contains('Initial')) {
                                //Initial: no customer number -> Static general + Static Sales view all(Auto)
                                mDataTypeGeneralView = 'Static';
                                mDataTypeSalesPurchaseView = '';
                            //}
                            //Extend: no customer number -> code เก่า
                            mSendType = 'General';
                            mIntegrationName = 'Initial Customer General View';
                        }

                        if(mRequestItem.SAPStatus__c != 'SAP Confirmed Sales/Purchasing View')
                        {
                            if(mIntegrationInitialCustomer != null && mSendType != '')
                            {
                                if(mDataTypeGeneralView != null || mDataTypeSalesPurchaseView != null) 
                                {
                                    // use new function
                                    mEditData = CTRRequestItemIntegrationEditController.SetupJsonForCTRDataModelv2(mAllMappingList, mRequestHeader,mRequestItem, mRecordTypeName, mRequestItem.BusinessUnit__c, mGatewayId, mDataTypeGeneralView, mDataTypeSalesPurchaseView ,'',  true);
                                } 
                                else {
                                    // code เก่า
                                    mEditData = CTRRequestItemIntegrationEditController.SetupJsonForCTRDataModelv2(mAllMappingList, mRequestHeader,mRequestItem, mRecordTypeName, mRequestItem.BusinessUnit__c, mGatewayId, mDataTypeGeneralView, mDataTypeSalesPurchaseView ,'',  true);
                                    //mCustomerData = CTRCustomerRequestFormItemModelData.SetupJsonForCustomerDataModel(mRequestHeader,mRequestItem, mSendType, mBusinessUnit, mGatewayId);
                                }   
                                
                                mEndPoint += mIntegrationInitialCustomer.Path__c != null ? mIntegrationInitialCustomer.Path__c : '';
                                jsonInput = JSON.serialize(mEditData);
                                //mGatewayId = mCustomerData.input.input.GatewayId;
                            }             
                        }
                        else 
                        {
                            if (mRequestItem.LatestIntegrationName__c == 'Initial Customer Additional Information' && mRequestItem.IntegrationStatus__c == 'Fail')
                            {
                                mIntegrationName= 'Initial Customer Additional Information';
                                CTRAdditionalInfoModelData mAdditionalData = CTRAdditionalInfoModelData.SetupJsonForAdditionalInfoDataModel(mRequestHeader, mRequestItem, mSendType, mBusinessUnit, mGatewayId);
                                mPath = mIntegrationAdditionalInfo.Path__c;
                                mEndPoint += mIntegrationAdditionalInfo.Path__c != null ? mIntegrationAdditionalInfo.Path__c : '';
                                jsonInput = JSON.serialize(mAdditionalData);
                                //mGatewayId = mAdditionalData.input.input.GatewayId;
                            }
                        }
                    } 
                    else if(mRequestItem.RecordType.DeveloperName.contains('Edit')) 
                    {
                        if(mRequestItem.Customer__r.AccountNumber__c != null)
                        {
                            // has customer number -> Dynamic general + Dynamic sales view
                            mDataTypeGeneralView = 'Dynamic';
                            mDataTypeSalesPurchaseView = 'Dynamic';
                         	if(mRequestItem.SAPStatus__c != 'SAP Confirmed Sales/Purchasing View')
                            {
								mIntegrationName= 'Edit Customer General+Sales View';
                                mEditData = CTRRequestItemIntegrationEditController.SetupJsonForCTRDataModelv2(mAllMappingList, mRequestHeader,mRequestItem, mRecordTypeName, mRequestItem.BusinessUnit__c, mGatewayId, 'Dynamic', 'Dynamic' ,'',  true);
                            	//mEditData = CTRRequestItemIntegrationEditController.SetupJsonForCTRDataModel(mAllMappingList, mRequestHeader,mRequestItem, 'Customer', mBusinessUnit, mGatewayId);
                                mEndPoint += mIntegrationInitialCustomer.Path__c != null ? mIntegrationInitialCustomer.Path__c : '';
                            	jsonInput = JSON.serialize(mEditData);
                            }
                            else if(mRequestItem.SAPStatus__c == 'SAP Confirmed Sales/Purchasing View' && 
                                mRequestItem.LatestIntegrationName__c == 'Initial Customer Additional Information' &&
                                mRequestItem.IntegrationStatus__c == 'Fail')
                            {
                                mIntegrationName= 'Initial Customer Additional Information';
                                CTRAdditionalInfoModelData mAdditionalData = CTRAdditionalInfoModelData.SetupJsonForAdditionalInfoDataModel(mRequestHeader, mRequestItem, 'AdditionalInfo', mBusinessUnit, mGatewayId);
                                mEndPoint += mIntegrationAdditionalInfo.Path__c != null ? mIntegrationAdditionalInfo.Path__c : '';
                                jsonInput = JSON.serialize(mAdditionalData);
                                mGatewayId = mAdditionalData.input.input.GatewayId;
                            }

                            //mGatewayId = mEditData.input.input.get('GatewayId');
                        }
                    } else if(mRequestItem.RecordType.DeveloperName.contains('Block')) {
                    } 
                } 
                else if(mRequestItem.RecordType.DeveloperName.contains('Supplier'))
                {
                    mPath = mIntegrationInintialSupplier.Path__c;
                    if(mRequestItem.RecordType.DeveloperName.contains('Initial') || mRequestItem.RecordType.DeveloperName.contains('Extend')) 
                    {
                        if(mRequestItem.BusinessUnit__c == 'TOP' || mRequestItem.BusinessUnit__c == 'LABIX') 
                        {
                            System.debug('Supplier TOP LABIX');
                            // special case for 1100 supplier TOP
                            String mKey = mRequestItem.Customer__r.SupplierNumber__c+mRequestItem.PurchasingOrganizationTOP__c;
                            List<CTRPurchasingView__c> checkPurchasingView = [SELECT Id FROM CTRPurchasingView__c WHERE Account__c =: mRequestItem.Customer__c AND Key__c =: mKey LIMIT 1];
                            if(mRequestItem.Customer__r.SupplierNumber__c != null) 
                            {
                                if(checkPurchasingView.size() > 0) 
                                {
                                    System.debug('Supplier number = '+mRequestItem.Customer__r.SupplierNumber__c);

                                    // has purchasing view & has supplier number -> Dynamic general + Dynamic Purchasing view
                                    mDataTypeGeneralView = 'Dynamic';
                                    mDataTypeSalesPurchaseView = 'Dynamic';
                                    mIntegrationName = 'Initial Supplier General+Purchasing View';
                                    mSendType = 'General';
                                    System.debug('Purchasing view duplicate General = '+mDataTypeGeneralView+' || view = '+mDataTypeSalesPurchaseView);
                                }
                                else 
                                {
                                    // no purchasing view & has supplier number -> Dynamic general + All Purchasing view
                                    mIntegrationName = 'Initial Supplier Only Purchasing View';
                                    mDataTypeSalesPurchaseView = 'Static';

                                    if(isIncludeGeneral)
                                    {
                                        mDataTypeGeneralView = 'Dynamic';
                                        mIntegrationName = 'Initial Supplier General+Purchasing View';
                                    }
                                    System.debug('No Purchasing view dup General = '+mDataTypeGeneralView+' || view = '+mDataTypeSalesPurchaseView);
                                    mSendType = 'General';
                                }
                            } 
                            else 
                            {
                                
                                    // no purchasing view & no supplier number -> code เก่า
                                    mIntegrationName = 'Initial Supplier General+Purchasing View';
                                    mDataTypeGeneralView = 'Static';
                                    mDataTypeSalesPurchaseView = 'Static';
                                    mSendType = 'General';
                                    System.debug(' none Supplier number General = '+mDataTypeGeneralView+' || view = '+mDataTypeSalesPurchaseView);
                                
                            }
                        } 
                        else 
                        {
                            // for other BU
                            System.debug('Supplier TX');
                            if(mRequestItem.Customer__r.SupplierNumber__c != null)
                            {
                                // has supplier number -> Dynamic general + All Purchasing view
                                mIntegrationName = 'Initial Supplier Only Purchasing View';
                                mDataTypeSalesPurchaseView = 'Static';
                                if(isIncludeGeneral) 
                                {
                                    mDataTypeGeneralView = 'Dynamic';
                                    mIntegrationName = 'Initial Supplier General+Purchasing View';
                                    mSendType = 'General';
                                }
                                System.debug('Supplier number General = '+mDataTypeGeneralView+' || view = '+mDataTypeSalesPurchaseView);
                            }
                            else
                            {
                                // no supplier number -> code เก่า
                                mIntegrationName = 'Initial Supplier General+Purchasing View';
                                mDataTypeGeneralView = 'Static';
                                mDataTypeSalesPurchaseView = 'Static';
                                mSendType = 'General';
                                System.debug('no Supplier number General = '+mDataTypeGeneralView+' || view = '+mDataTypeSalesPurchaseView);
                            }
                        }

                        if(mIntegrationInintialSupplier != null)
                        {
                            if(mDataTypeGeneralView != null || mDataTypeSalesPurchaseView != null) 
                            {
                                // use new function
                                mEditData = CTRRequestItemIntegrationEditController.SetupJsonForCTRDataModelv2(mAllMappingList, mRequestHeader,mRequestItem, mRecordTypeName, mRequestItem.BusinessUnit__c, mGatewayId, mDataTypeGeneralView, mDataTypeSalesPurchaseView ,'',  true);
                            } 
                            else 
                            {
                                // code เก่า
                                mEditData = CTRRequestItemIntegrationEditController.SetupJsonForCTRDataModelv2(mAllMappingList, mRequestHeader,mRequestItem, mRecordTypeName, mRequestItem.BusinessUnit__c, mGatewayId, mDataTypeGeneralView, mDataTypeSalesPurchaseView ,'',  true);
                                //mSupplierData = CTRSupplierRequestFormItemModelData.SetupJsonForSupplierDataModel(mRequestHeader,mRequestItem, mSendType, mBusinessUnit, mGatewayId);
                            }
                            mEndPoint += mIntegrationInintialSupplier.Path__c != null ? mIntegrationInintialSupplier.Path__c : '';
                            jsonInput = JSON.serialize(mEditData); 
                            //mGatewayId = mSupplierData.input.input.GatewayId;
                        }
                    } else if(mRequestItem.RecordType.DeveloperName.contains('Edit')) {
                        if(mRequestItem.Customer__r.SupplierNumber__c != null)
                        {
                            // has supplier number -> Dynamic general + Dynamic Purchasing view
                            mIntegrationName= 'Edit Supplier General+Purchasing View';
                            mEditData = CTRRequestItemIntegrationEditController.SetupJsonForCTRDataModelv2(mAllMappingList, mRequestHeader,mRequestItem, mRecordTypeName, mRequestItem.BusinessUnit__c, mGatewayId, 'Dynamic', 'Dynamic' ,'',  true);
                            //mEditData = CTRRequestItemIntegrationEditController.SetupJsonForCTRDataModel(mAllMappingList, mRequestHeader,mRequestItem, 'Supplier', mBusinessUnit, mGatewayId);
                            mEndPoint += mIntegrationInintialSupplier.Path__c != null ? mIntegrationInintialSupplier.Path__c : '';
                            jsonInput = JSON.serialize(mEditData);
                            //mGatewayId = mEditData.input.input.get('GatewayId');
                        }
                    } else if(mRequestItem.RecordType.DeveloperName.contains('Block')) {

                    }
                } 
                else if(mRequestItem.RecordType.DeveloperName == 'ShipToEdit')
                {
                    mPath = mIntegrationInitialCustomer.Path__c;
                    if(mRequestItem.Customer__r.AccountNumber__c != null)
                    {
                        if(mRequestItem.SAPStatus__c != 'SAP Confirmed Sales/Purchasing View')
                        {
                            mIntegrationName= 'Edit Ship to General+Sales View';
                            mEditData = CTRRequestItemIntegrationEditController.SetupJsonForCTRDataModelv2(mAllMappingList, mRequestHeader,mRequestItem, mRecordTypeName, mRequestItem.BusinessUnit__c, mGatewayId, 'Dynamic', 'Dynamic' ,'',  true);
                            //mEditData = CTRRequestItemIntegrationEditController.SetupJsonForCTRDataModel(mAllMappingList, mRequestHeader,mRequestItem, 'ShipTo', mBusinessUnit, mGatewayId);
                            mEndPoint += mIntegrationInitialCustomer.Path__c != null ? mIntegrationInitialCustomer.Path__c : '';
                            jsonInput = JSON.serialize(mEditData);
                        }
                    }  
                } 
                else if(mRequestItem.RecordType.DeveloperName == 'ShipToCreate')
                {
                    mPath = mIntegrationInitialCustomer.Path__c;
                    if(mIntegrationInitialCustomer != null)
                    {
                        mIntegrationName= 'Create Ship to General+Sales View';
                        // use new function for Dynamic data
                        mShipToData = CTRShipToRequestFormItemModelData.SetupJsonForShipToDataModel(mRequestHeader,mRequestItem, '', mBusinessUnit, mGatewayId);
                        mEndPoint += mIntegrationInitialCustomer.Path__c != null ? mIntegrationInitialCustomer.Path__c : '';
                        jsonInput = JSON.serialize(mShipToData);
                        mGatewayId = mShipToData.input.input.GatewayId;
                    }
                }

                jsonInput = jsonInput.replace('null', '""');
                System.debug('mDataTypeGeneralView: '+mDataTypeGeneralView);
                System.debug('mDataTypeSalesPurchaseView: '+mDataTypeSalesPurchaseView);

                System.debug('mPath:'+mPath);
                System.debug('mEndPoint:'+mEndPoint);

                System.debug('Result:'+jsonInput);

                if(String.isNotBlank(mPath) && String.isNotBlank(mEndPoint) && String.isNotBlank(jsonInput))
                {
                    System.debug('Send callout to sap mock');
                    
                    CTRRequestFormItem__c mItemUpdate = new CTRRequestFormItem__c(Id = mRecordId);
                    mItemUpdate.EmailHTML__c = jsonInput;
                    //update mItemUpdate;
                    mResult = handleCallout(mRequestItem, mIntegrationName, jsonInput, mPath, mEndPoint, mGatewayId, mToken);
                    mResult = 'Success';
                } 
                else 
                {
                    if(!mProcessCCA && !mProcessQueueCCA)
                    {
                        mResult = 'Error: Endpoint is not found';
                    }
                    else if(mProcessCCA)
                    {
                        mResult = 'Request Success: Inform CCA';
                    }
                    else if(mProcessQueueCCA)
                    {
                        mResult = 'Request Success: Queue CCA';
                    }
                }
            } 
            else {
                mResult = 'Error: Couldn\'t found custom metadata';
            }
            return mResult;
        }
        catch(exception e)
        {
            // Exception handling
            System.debug('Exception: ' + 'Apex Error: SubmitToSAP Error line:'+e.getLineNumber()+' Message: '+ e.getMessage());
            return 'Apex Error: SubmitToSAP Error line:'+e.getLineNumber()+' Message: '+ e.getMessage();
        }
   }

   public Static HttpRequest PostRequestSetup(String mJson, String mEndPoint)
    {
        HttpRequest request = new HttpRequest();
        request.setMethod('POST');  
        request.setHeader('Content-Type', 'application/json');
        request.setBody(mJson);
        request.setEndpoint(mEndPoint);
        return request;
    }

   private Static String handleCallout(CTRRequestFormItem__c mRequestItem, String mIntegrationName, String jsonInput, String mPath, String mEndPoint, String mGatewayId, String mToken) {
        String mResult = '';
        jsonInput = jsonInput.replace('null', '""');
        System.debug('Test JSON:::'+jsonInput);

        HttpRequest request = PostRequestSetup(jsonInput, mEndPoint);
        request.setHeader('Authorization', 'Bearer ' + mToken);

        // Make the HTTP request
        Http http = new Http();
        HttpResponse response = http.send(request);

        // Parse and handle the response
        if (response.getStatusCode() == 200) 
        {
            CTRRequestFormItem__c mRequestItemUpdate = new CTRRequestFormItem__c(Id = mRequestItem.Id);
            mRequestItemUpdate.IntegrationStatus__c = 'In Progress';

            // Successful response
            String SAPStatus = mRequestItem.SAPStatus__c;
            if(mIntegrationName == 'Initial Customer General View')
            {
                SAPStatus = 'Send General View To SAP';
                mRequestItemUpdate.SAPGeneralSent__c = true;
            }
            else if (mIntegrationName == 'Initial Customer Sales View' || 
                mIntegrationName== 'Create Ship to General+Sales View' || 
                mIntegrationName== 'Edit Ship to General+Sales View' || 
                mIntegrationName == 'Block Purchasing View' || 
                mIntegrationName == 'Block Sales View' || 
                mIntegrationName == 'Edit Supplier General+Purchasing View' ||
                mIntegrationName == 'Edit Customer General+Sales View')
            {
                SAPStatus = 'Send Sales/Purchasing View To SAP';
            }
            else if(mIntegrationName.contains('Initial Supplier'))
            {
                SAPStatus = 'Send Sales/Purchasing View To SAP';
                mRequestItemUpdate.SAPGeneralSent__c = true;
            }

            System.debug('Success Response: ' + response.getBody());
            mResult = 'Request Success: Sending Data to SAP';
            
            mRequestItemUpdate.SAPStatus__c = SAPStatus;
            mRequestItemUpdate.GatewayId__c = mGatewayId;
            mRequestItemUpdate.SAPSubmitTime__c = DateTime.Now();
            mRequestItemUpdate.LatestIntegrationName__c = mIntegrationName;
            
            update mRequestItemUpdate;
            System.debug('SAPStatus : ' + SAPStatus);
            System.debug('mGatewayId : ' + mGatewayId);
            System.debug('mIntegrationName : ' + mIntegrationName);

        } 
        else 
        {
            // Error handling
            String SAPStatus = mRequestItem.SAPStatus__c;
            if(mIntegrationName == 'Initial Customer General View')
            {
                SAPStatus = 'Unsuccessful Send General view to SAP';
            }
            else if(mIntegrationName.contains('Initial Supplier'))
            {
                SAPStatus = 'Unsuccessful Send Sales/Purchasing view to SAP';
            }
            else if (mIntegrationName == 'Initial Customer Sales View' || 
                mIntegrationName == 'Create Ship to General+Sales View' || 
                mIntegrationName == 'Edit Ship to General+Sales View' || 
                mIntegrationName == 'Block Purchasing View' || 
                mIntegrationName == 'Block Sales View' || 
                mIntegrationName == 'Edit Supplier General+Purchasing View' ||
                mIntegrationName == 'Edit Customer General+Sales View')
            {
                SAPStatus= 'Unsuccessful Send Sales/Purchasing view to SAP';
            }
            CTRRequestFormItem__c mRequestItemUpdate = new CTRRequestFormItem__c(Id = mRequestItem.Id);
            mRequestItemUpdate.SAPStatus__c = SAPStatus;
            mRequestItemUpdate.GatewayId__c = mGatewayId;
            mRequestItemUpdate.LatestIntegrationName__c = mIntegrationName;
            mRequestItemUpdate.SAPSubmitTime__c = DateTime.Now();
            mRequestItemUpdate.IntegrationStatus__c = 'Fail';

            update mRequestItemUpdate;
            System.debug('HTTP error: ' + response.getStatusCode() + ' ' + response.getBody());
            mResult = 'Request Error: Request Status = '+response.getStatusCode()+' ';
            
        }
        return mResult;
   }

   //CCA Function
   public Static void EmailInformCCA(List<CTRRequestFormItem__c> mRequestItemList)
   {
       try
       {
           List<Messaging.SingleEmailMessage> mEmailMessageList = new List<Messaging.SingleEmailMessage>();
           // List<User> mUserList = [SELECT Id, Email, Name FROM User WHERE Id IN: mUserId];

           // for(CTRRequestFormItem__c mRequestItem: mRequestItemList)
           // {
           Map<Id, wrapperCCAEmailData> mapCCAEmailData = getCCAEmailData(mRequestItemList);
           System.debug('EmailInformCCA '+mapCCAEmailData);
           for(Id key : mapCCAEmailData.keySet() ) {
               Messaging.SingleEmailMessage mail = setupCCAEmail(mapCCAEmailData.get(key));
               mEmailMessageList.add(mail);
           }
               
               // Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
               // List<String> sendTo = new List<String>();
               // sendTo.add(mUser.Email);
               // mail.setToAddresses(sendTo);
               // mail.setSenderDisplayName('Thaioil Salesforce Support');
               // mail.setSubject('Request to review Sales Area for Account Number: '+ mRequestItem.Customer__r.AccountNumber__c);
               // mail.setBccSender(false);
               // mail.setUseSignature(false);
               // mail.setHtmlBody('Dear ' + mUser.Name + '<br> &nbsp;&nbsp; <br>Please review Sales view in SAP for Account Number: '+ mRequestItem.Customer__r.AccountNumber__c+' <br> Sales Organization: '+mRequestItem.SalesOrganization__c+' <br> Thank you');
               
           // }
           if(mEmailMessageList.size()>0)
           {
               List<CTRRequestFormItem__c> mRequestItemListUpdate = new List<CTRRequestFormItem__c>();
               for(CTRRequestFormItem__c mRequestItem : mRequestItemList) {
                   if(mRequestItem.RecordType.DeveloperName.contains('Customer'))
                   {
                       System.debug('inupdate lopp');
                       CTRRequestFormItem__c mRequestItemUpdate = new CTRRequestFormItem__c(Id = mRequestItem.Id);
                       mRequestItemUpdate.SAPStatus__c = 'Pending CCA';
                       if(mRequestItem.SAPStatus__c != 'Queue CCA')
                       {
                           mRequestItemUpdate.SAPSubmitTime__c = DateTime.Now();
                       }
                       mRequestItemListUpdate.add(mRequestItemUpdate);
                   }
               }

               if(mRequestItemListUpdate.size() > 0) {
                   update mRequestItemListUpdate;
               }

               Messaging.sendEmail(mEmailMessageList);
           }

       }
       catch(exception e)
       {
           System.debug('Error submit to SAP line:'+e.getLineNumber()+' || Message:'+e.getmessage());
       }
   }

   public Static Messaging.SingleEmailMessage setupCCAEmail (wrapperCCAEmailData CCAEmailData)
   {
    //    List<EmailTemplate> mEmailTemplateList = [SELECT Id,Subject,Description,HtmlValue,DeveloperName,Body FROM EmailTemplate WHERE DeveloperName = 'CTR_Initial_customer_Inform_SAP_to_Mapping_CCA' LIMIT 1]; 
       // Contact mContact = [SELECT ID FROM Contact LIMIT 1];
       // List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
       // for(Id key : mapCCAEmailData.keySet()){
           Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
           if(CCAEmailData.emailTemplate != null)
           {
                List<String> sendTo = new List<String>(CCAEmailData.emailTo);
                String emailSubject = CCAEmailData.emailTemplate.Subject
                                .replace('{$SubBU__c$}', CCAEmailData?.requestItemObj?.SubBU__c)
                                .replace('{$CompanyNameENF__c$}', CCAEmailData?.requestItemObj?.CTRRequestFormHeader__r.CompanyNameENF__c);

                String emailBody = CCAEmailData.emailTemplate.HtmlValue
                            .replace('{$CompanyNameENF__c$}',CCAEmailData?.requestItemObj?.CTRRequestFormHeader__r.CompanyNameENF__c)
                            .replace('{$ProductName__c$}',CCAEmailData?.requestItemObj?.ProductName__c)
                            .replace('{$SalesOrganization__c$}',CCAEmailData?.requestItemObj?.SalesOrganization__c)
                            .replace('{$AccountNumber__c$}',CCAEmailData?.requestItemObj?.Customer__r.AccountNumber__c)
                            .replace('{$Owner.Name$}',CCAEmailData?.requestItemObj?.Owner.Name)
                            .replace('{$CustomerSearchTermEN__c$}',CCAEmailData?.requestItemObj?.CTRRequestFormHeader__r.CustomerSearchTermEN__c)
                            .replace(']]>','');

                // sendTo.add(mRequestItem.Owner.Email);
                // mail.setToAddresses(sendTo);
                mail.setToAddresses(new List<String>{'manatpong.t@roundtwosolutions.com'});
                mail.setSenderDisplayName('Thaioil Salesforce Support');
                //    mail.setSubject('Request to review Sales Area for Account Number: '+ mRequestItem.Customer__r.AccountNumber__c);
                mail.setSubject(emailSubject);
                mail.setEntityAttachments(CCAEmailData.attachmentIds);
                mail.setCcAddresses(CCAEmailData.emailCC);
                mail.setBccSender(false);
                mail.setUseSignature(false);
                mail.setTargetObjectId(CCAEmailData.contact.Id); 
                //    mail.setTemplateID(CCAEmailData.emailTemplate.Id); 
                mail.setWhatId(CCAEmailData.requestItemObj.Id);
                mail.setTreatTargetObjectAsRecipient(false);
                mail.setCharset('UTF-8');
                mail.setSaveAsActivity(false);
                mail.setHtmlBody(emailBody);
                //mail.setHtmlBody('Dear ' + mRequestItem.Owner.Name + '<br> &nbsp;&nbsp; <br>Please review Sales view in SAP for Account Number: '+ mRequestItem.Customer__r.AccountNumber__c+' <br> Sales Organization: '+mRequestItem.SalesOrganization__c+' <br> Thank you');
           }
           // emailList.add(mail);
       // }

        return mail;
   }

   public Static Map<Id,wrapperCCAEmailData> getCCAEmailData(List<CTRRequestFormItem__c> mRequestItemList) 
   {
    Map<Id,wrapperCCAEmailData> mapCCAEmailData = new Map<Id,wrapperCCAEmailData>();

    List<EmailTemplate> mEmailTemplateList = [SELECT Id,Subject,Description,HtmlValue,DeveloperName,Body FROM EmailTemplate WHERE DeveloperName = 'CTR_Initial_customer_Inform_SAP_to_Mapping_CCA' LIMIT 1]; 
    EmailTemplate emailTemplate = new EmailTemplate();
    if(mEmailTemplateList.size() > 0) {
        emailTemplate = mEmailTemplateList[0];
    }

    List<Contact> getContact = [SELECT ID FROM Contact LIMIT 1];
    Contact contact = new Contact();
    if(getContact.size() > 0) {
        contact = getContact[0];
    }

    List<String> topEmailGroupList = new List<String>{'ACCO','TRSS','TRLQ'};
    List<String> tpxEmailGroupList = new List<String>{'ACCP','TRSS','TRLQ'};
    List<String> topEmailList = new List<String>();
    List<String> tpxEmailList = new List<String>();
    Map<String, CTRExternalEmailGroup__mdt> mapExtMailGroup = new Map<String, CTRExternalEmailGroup__mdt>();
    for(CTRExternalEmailGroup__mdt emailGroup : [SELECT DeveloperName, Email__c FROM CTRExternalEmailGroup__mdt]) {
        mapExtMailGroup.put(emailGroup.DeveloperName, emailGroup);
        if(topEmailGroupList.contains(emailGroup.DeveloperName)) {
            topEmailList.add(emailGroup.Email__c);
        }

        if(tpxEmailGroupList.contains(emailGroup.DeveloperName)) {
            tpxEmailList.add(emailGroup.Email__c);
        }
    }

    List<String> attachmentNameList = new List<String>{'FS1','FS2','COI','MOA','VAT'};
    String fileConditionStr = '';
    Boolean isFirst = true;
    for(String fileName : attachmentNameList) {
        if(!isFirst) {
            fileConditionStr += ' OR ';
        }
        fileConditionStr += ' Name Like \''+fileName+'%\' '; // to ignore file extension
        isFirst = false;
    }

    Set<Id> setAccId = new Set<Id>();
    for(CTRRequestFormItem__c item : mRequestItemList) {
        setAccId.add(item.Customer__c);
    }
    String getFileAttachmentSQL = 'SELECT Id, LastModifiedDate, Name, ParentId FROM Attachment WHERE ParentId IN :setAccId AND ('+fileConditionStr+') ORDER BY LastModifiedDate DESC';
    List<Attachment> mAttachment = Database.query(getFileAttachmentSQL);
    Map<String, Map<String,Id>> mapAttachmentIdsByAccId = new Map<String, Map<String,Id>>();
    for(Attachment file : mAttachment) {
        String fileName = file.name.contains('.') ? file.name.substringBefore('.') : file.name;
        if(mapAttachmentIdsByAccId.containsKey(file.ParentId)) {
            Map<String, Id> mapAttachments = mapAttachmentIdsByAccId.get(file.ParentId);
            if(!mapAttachments.containsKey(fileName)) { // file is not duplicated
                mapAttachments.put(fileName,file.Id);
            }
            mapAttachmentIdsByAccId.put(file.parentId,mapAttachments);
        } else {
            Map<String, Id> mapAttachments = new Map<String, Id>();
            mapAttachments.put(fileName,file.Id);
            mapAttachmentIdsByAccId.put(file.parentId,mapAttachments);
        }
    }

    for(CTRRequestFormItem__c item : mRequestItemList) {
        wrapperCCAEmailData CCAEmailData = new wrapperCCAEmailData();
        // Add Email Template
        CCAEmailData.emailTemplate = emailTemplate;

        // Add Contact
        CCAEmailData.contact = contact;

        // Add Request Item
        CCAEmailData.requestItemObj = item;

        // Add Email To
        if(item.BusinessUnit__c == 'TOP') {
            CCAEmailData.emailTo = topEmailList;
        } else if(item.BusinessUnit__c == 'TX') {
            CCAEmailData.emailTo = tpxEmailList;
        }

        // Add Email CC
        CCAEmailData.emailCC = new List<String>();
        if(item.CreditOwner__c != null && item.CreditOwner__r.Email != null) {
            CCAEmailData.emailCC.add(item.CreditOwner__r.Email);
        }
        if(item.CreditOwnerSectionHead__c != null && item.CreditOwnerSectionHead__r.Email != null) {
            CCAEmailData.emailCC.add(item.CreditOwnerSectionHead__r.Email);
        }
        if(mapExtMailGroup.containsKey('TRCR')) {
            CCAEmailData.emailCC.add(mapExtMailGroup.get('TRCR').Email__c);
        }

        // Add Attachments
        if(mapAttachmentIdsByAccId.containsKey(item.Customer__c)) {
            CCAEmailData.attachmentIds = mapAttachmentIdsByAccId.get(item.Customer__c).values(); // add attachments
        }

        mapCCAEmailData.put(item.Id,CCAEmailData);
    }

    return mapCCAEmailData;
}

}