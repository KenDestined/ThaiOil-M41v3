public with sharing class CTRRequestBlockController 
{
    public class RequestWrapper
    {
        @auraEnabled public Id mRecordId {get; set;}
        @auraEnabled public Integer mIndex {get; set;}
        @auraEnabled public String mProduct {get;set;}
        @auraEnabled public String mSalesOrg {get; set;}
        @auraEnabled public String mDistributionChannel {get;set;}
        @auraEnabled public String mDivision {get;set;}
        @auraEnabled public String mLabelSalesOrg {get; set;}
        @auraEnabled public String mLabelDivision {get;set;}
        @auraEnabled public String mLabelDistributionChannel {get;set;}
        @auraEnabled public Boolean mSelected {get; set;}
    }

    public class ResponseWrapper {
        @AuraEnabled public Boolean result {get; set;}
        @AuraEnabled public String message {get; set;} 
        @AuraEnabled public Id resRecordId {get; set;}
    }

    @AuraEnabled
    public static List<RequestWrapper> onloadCreatePage(Id mAccountId, Id mRecordTypeSelectedId)
    {
        try 
        {
            List<RecordType> mRecordTypeList = [SELECT Id, Name, DeveloperName FROM RecordType WHERE Id = :mRecordTypeSelectedId LIMIT 1];
            //List<Account> currAccount = [SELECT Id/*, SalesOrganization__c*/ FROM Account WHERE Id =: mAccountId];

            List<RequestWrapper> mRequestWrapperList = new List<RequestWrapper>();
            Integer mIndex = 1;
            if(mRecordTypeList[0].DeveloperName.contains('Customer')) {
                Set<String> setSalesOrg = new Set<String>{'2000','9100','9200','9300','9400'};
                List<C360_SalesArea__c> mSalesAreaList = new List<C360_SalesArea__c>([SELECT Id, CreditControlArea__c, SalesOrganization__c, Division__c, DistributionChannel__c, toLabel(SalesOrganization__c) salesOrgLabel, toLabel(Division__c) divisionLabel, toLabel(DistributionChannel__c) distChLabel FROM C360_SalesArea__c WHERE AccountNumber__c = :mAccountId AND SalesOrganization__c IN :setSalesOrg]);
                
                for(C360_SalesArea__c mSalesArea: mSalesAreaList)
                {
                    RequestWrapper mRequestWrapper = new RequestWrapper();
                    mRequestWrapper.mRecordId = mSalesArea.Id;
                    mRequestWrapper.mIndex = mIndex;
                    mRequestWrapper.mSalesOrg = mSalesArea.SalesOrganization__c;
                    mRequestWrapper.mDivision = mSalesArea.Division__c;
                    mRequestWrapper.mDistributionChannel = mSalesArea.DistributionChannel__c;
                    mRequestWrapper.mLabelSalesOrg = String.valueOf(mSalesArea.get('salesOrgLabel'));
                    mRequestWrapper.mLabelDivision = String.valueOf(mSalesArea.get('divisionLabel'));
                    mRequestWrapper.mLabelDistributionChannel = String.valueOf(mSalesArea.get('distChLabel'));
                    // if(currAccount[0].SalesOrganization__c == mSalesArea.SalesOrganization__c) {
                    //     mRequestWrapper.mSelected = true; // default as selected customer
                    // }
                    mRequestWrapperList.add(mRequestWrapper);
                    mIndex++;
                }
            } else if(mRecordTypeList[0].DeveloperName.contains('Supplier')) {
                Set<String> setPurchseList = new Set<String>{'A000','H100','I100','S100','N100'};
                List<CTRPurchasingView__c> mPurchaseViewList = new List<CTRPurchasingView__c>([SELECT Id, PurchasingOrg__c, toLabel(PurchasingOrg__c) purchasingOrgLabel FROM CTRPurchasingView__c WHERE Account__c = :mAccountId AND PurchasingOrg__c IN :setPurchseList]);
                for(CTRPurchasingView__c mPurchasingView: mPurchaseViewList) {
                    RequestWrapper mRequestWrapper = new RequestWrapper();
                    mRequestWrapper.mRecordId = mPurchasingView.Id;
                    mRequestWrapper.mIndex = mIndex;
                    mRequestWrapper.mSalesOrg = mPurchasingView.PurchasingOrg__c;
                    mRequestWrapper.mLabelSalesOrg = String.valueOf(mPurchasingView.get('purchasingOrgLabel'));
                    mRequestWrapperList.add(mRequestWrapper);
                    mIndex++;
                }
            }
            
            return mRequestWrapperList;
        } 
        catch (Exception e) 
        {
            System.debug('Error From CTRRequestBlockController.onloadCreatePage Line: '+e.getLineNumber()+' || Message:'+e.getMessage());
            return null;
        }
    }

    @AuraEnabled
    public static ResponseWrapper onCreateRequest(String formData, String customerId, String itemRecordTypeId, RequestWrapper requestWrapper ){
        ResponseWrapper responseResult = new ResponseWrapper();
        responseResult.result = false;
        try
        {
            if(requestWrapper == null) {
                responseResult.message = 'Not found selected item';
                return responseResult;
            }
            Map<String, Object> cObjMap = (Map<String, Object>) JSON.deserializeUntyped(formData);
            String cObjJson = JSON.serialize(cObjMap);
            Map<String, Object> cObjMapFurious = (Map<String, Object>) JSON.deserializeUntyped(cObjJson);
            String cObjJsonDrunk = JSON.serialize(cObjMapFurious);
            
            CTRRequestFormItem__c convertFormData = (CTRRequestFormItem__c)JSON.deserialize(cObjJsonDrunk, CTRRequestFormItem__c.class);
            System.debug(' Accomplished: '+convertFormData);

            List<RecordType> RecordTypeList = [SELECT Id, Name, DeveloperName FROM RecordType WHERE Id = :itemRecordTypeId LIMIT 1];
            Id headerRecordTypeId = Schema.SObjectType.CTRRequestFormHeader__c.getRecordTypeInfosByDeveloperName().get('Blocking').getRecordTypeId();
            if(RecordTypeList[0].DeveloperName.contains('Customer')){
                // C360_SalesArea__c mSalesArea = [SELECT Id, SalesOrganization__c, Division__c, DistributionChannel__c, CreditControlArea__c, AccountAssignmentGroup__c, Currency__c, CustPriceProc__c, DeliveryPlant__c, DeliveryPriority__c, ExchangeRateType__c, Incoterms__c, Incoterms2__c, MaxPartialDeliveries__c, OrderCombination__c, OrderProbability__c, OverdeliveryTolerance__c, PartialDeliveriesperitem__c, PaymentGuaranteeProcedure__c, IsPriceDetermin__c, PriceGroup__c FROM C360_SalesArea__c WHERE Id =: requestWrapper.mRecordId LIMIT 1];
                List<String> mSalesAreaFields = new List<String>(Schema.getGlobalDescribe().get('C360_SalesArea__c').getDescribe().fields.getMap().keySet());    
                String soqlSalesAreaText = '';
                soqlSalesAreaText+= ' SELECT ' + String.join(mSalesAreaFields, ',');
                soqlSalesAreaText+= ' FROM C360_SalesArea__c';
                soqlSalesAreaText+= ' WHERE Id = \''+requestWrapper.mRecordId+'\' LIMIT 1';
                C360_SalesArea__c mSalesArea = Database.query(soqlSalesAreaText);

                CTRRequestFormHeader__c mRequestFormHeader = new CTRRequestFormHeader__c();
                mRequestFormHeader.RecordTypeId = headerRecordTypeId;
                mRequestFormHeader.Customer__c = CustomerId;
                insert mRequestFormHeader;

                CTRRequestFormItem__c mRequestFormItem = new CTRRequestFormItem__c();
                mRequestFormItem.CTRRequestFormHeader__c = mRequestFormHeader.Id;
                mRequestFormItem.Customer__c = CustomerId;
                mRequestFormItem.RecordTypeId = itemRecordTypeId;

                mRequestFormItem.AccountAssignmentGroup__c = mSalesArea.AccountAssignmentGroup__c;
                mRequestFormItem.Currency__c = mSalesArea.Currency__c;
                mRequestFormItem.CustPriceProc__c = mSalesArea.CustPriceProc__c;
                mRequestFormItem.CustStatGroup__c = mSalesArea.CustStatGroup__c;
                mRequestFormItem.DeliveryPlant__c = mSalesArea.DeliveryPlant__c;
                mRequestFormItem.DeliveryPriority__c = mSalesArea.DeliveryPriority__c;
                mRequestFormItem.DistributionChannel__c = mSalesArea.DistributionChannel__c;
                mRequestFormItem.Division__c = mSalesArea.Division__c;
                mRequestFormItem.ExchangeRateType__c = mSalesArea.ExchangeRateType__c;
                mRequestFormItem.Incoterms__c = mSalesArea.Incoterms__c;
                mRequestFormItem.Incoterms2__c = mSalesArea.Incoterms2__c;
                mRequestFormItem.MaxPartialDeliveries__c = mSalesArea.MaxPartialDeliveries__c;
                mRequestFormItem.OrderCombination__c = mSalesArea.OrderCombination__c;
                mRequestFormItem.OrderProbability__c = mSalesArea.OrderProbability__c;
                mRequestFormItem.OverdeliveryTolerance__c = mSalesArea.OverdeliveryTolerance__c;
                mRequestFormItem.PartialDeliveriesperitem__c = mSalesArea.PartialDeliveriesperitem__c;
                mRequestFormItem.PaymentGuaranteeProcedure__c = mSalesArea.PaymentGuaranteeProcedure__c;
                mRequestFormItem.IsPriceDetermin__c = mSalesArea.IsPriceDetermin__c;
                mRequestFormItem.PriceGroup__c = mSalesArea.PriceGroup__c;
                mRequestFormItem.Rebate__c = mSalesArea.Rebate__c;
                mRequestFormItem.SalesDistrict__c = mSalesArea.SalesDistrict__c;
                mRequestFormItem.SalesGroup__c = mSalesArea.SalesGroup__c;
                mRequestFormItem.SalesOffice__c = mSalesArea.SalesOffice__c;
                mRequestFormItem.SalesOrganization__c = mSalesArea.SalesOrganization__c;
                mRequestFormItem.SalesOrganizationTX__c = mSalesArea.SalesOrganization__c;
                mRequestFormItem.ShippingConditions__c = mSalesArea.ShippingCondition__c; // item ไม่ตรงกับ sales area
                mRequestFormItem.TermofPayment__c = mSalesArea.TermofPayment__c;
                mRequestFormItem.UnderdeliveryTolerance__c = mSalesArea.UnderdeliveryTolerance__c;
                mRequestFormItem.PaymentGuaranteeProcedure__c = mSalesArea.PaymentGuaranteeProcedure__c;


                mRequestFormItem.CreditControlArea__c = mSalesArea.CreditControlArea__c;
                mRequestFormItem.BlockedReason__c = convertFormData.BlockedReason__c;
                mRequestFormItem.OrderBlock__c = convertFormData.OrderBlock__c;
                mRequestFormItem.CreditOwner__c = UserInfo.getUserId();
                mRequestFormItem.Status__c = 'New';
                insert mRequestFormItem;

                responseResult.result = true;
                responseResult.message = 'Success';
                responseResult.resRecordId = mRequestFormItem.Id;
            } else if(RecordTypeList[0].DeveloperName.contains('Supplier')) {
                // CTRPurchasingView__c mPurchasingView = [SELECT Id, PurchasingOrg__c FROM CTRPurchasingView__c WHERE Id =: requestWrapper.mRecordId LIMIT 1];
                List<String> mPurchasingViewFields = new List<String>(Schema.getGlobalDescribe().get('CTRPurchasingView__c').getDescribe().fields.getMap().keySet());    
                String soqlPurchasingViewText = '';
                soqlPurchasingViewText+= ' SELECT ' + String.join(mPurchasingViewFields, ',');
                soqlPurchasingViewText+= ' FROM CTRPurchasingView__c';
                soqlPurchasingViewText+= ' WHERE Id = \''+requestWrapper.mRecordId+'\' LIMIT 1';
                CTRPurchasingView__c mPurchasingView = Database.query(soqlPurchasingViewText);

                CTRRequestFormHeader__c mRequestFormHeader = new CTRRequestFormHeader__c();
                mRequestFormHeader.RecordTypeId = headerRecordTypeId;
                mRequestFormHeader.Customer__c = CustomerId;
                insert mRequestFormHeader;

                CTRRequestFormItem__c mRequestFormItem = new CTRRequestFormItem__c();
                mRequestFormItem.CTRRequestFormHeader__c = mRequestFormHeader.Id;
                mRequestFormItem.Customer__c = CustomerId;
                mRequestFormItem.RecordTypeId = itemRecordTypeId;

                // mRequestFormItem.Name = mPurchasingView.Name;
                mRequestFormItem.Chkdoubleinv__c = mPurchasingView.Chkdoubleinv__c;
                mRequestFormItem.Currency__c = mPurchasingView.Currency__c;
                mRequestFormItem.GRBasedInvVerif__c = mPurchasingView.GRBasedInvVerif__c;
                mRequestFormItem.Incoterms2__c = mPurchasingView.Incoterms2__c;
                mRequestFormItem.Incoterms__c = mPurchasingView.Incoterms__c;
                mRequestFormItem.PurchasingOrganization__c = mPurchasingView.PurchasingOrg__c;
                mRequestFormItem.PurchasingOrganizationTX__c = mPurchasingView.PurchasingOrg__c;
                mRequestFormItem.ShippingConditions__c = mPurchasingView.ShippingConditions__c;
                mRequestFormItem.TermofPayment__c = mPurchasingView.TermofPayment__c;
                mRequestFormItem.PaymentMethod__c = mPurchasingView.PaymentMethod__c;
                mRequestFormItem.AccigClerk__c = mPurchasingView.AcctgClerk__c;
                mRequestFormItem.AutomaticPurchaseOrder__c = mPurchasingView.AutomaticPurchaseOrder__c;


                mRequestFormItem.BlockedReason__c = convertFormData.BlockedReason__c;
                mRequestFormItem.SelectedPurchasingOrg__c = convertFormData.SelectedPurchasingOrg__c;
                mRequestFormItem.CreditOwner__c = UserInfo.getUserId();
                mRequestFormItem.Status__c = 'New';
                insert mRequestFormItem;

                responseResult.result = true;
                responseResult.message = 'Success';
                responseResult.resRecordId = mRequestFormItem.Id;
            }
            return responseResult;
        }
        catch(Exception e)
        {
            System.debug('CTRRequestBlockController---'+e.getmessage()+' line:'+e.getLineNumber());      
            responseResult.message = e.getmessage();      
            return responseResult;
        }
    }

}