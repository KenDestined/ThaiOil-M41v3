public with sharing class CTRRequestFormEditTypeController 
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
        @auraEnabled public String mLabelDistributionChannel {get;set;}
        @auraEnabled public String mLabelDivision {get;set;}
        @auraEnabled public Boolean mSelected {get; set;}
    }

    @AuraEnabled
    public static List<RequestWrapper> onloadCreatePage(Id mAccountId, Id mRecordTypeSelectedId, String mBusinessUnit)
    {
        try 
        {
            List<RequestWrapper> mRequestWrapperList = new List<RequestWrapper>();
            List<RecordType> mRecordTypeList = [SELECT Id, Name, DeveloperName FROM RecordType WHERE Id = :mRecordTypeSelectedId LIMIT 1];
            Integer mIndex = 1;

            List<String> topSubBU = new List<String>{'TOP','TLB','TPX'};
            List<String> txSubBU = new List<String>{'TXTH','TSV','TSR','JSKem','TXINDIA'};
            String actBusinessUnit = mBusinessUnit;
            if(topSubBU.contains(mBusinessUnit)) {
                actBusinessUnit = 'TOP';
            } else if(txSubBU.contains(mBusinessUnit)) {
                actBusinessUnit = 'TX';
            }else {
                actBusinessUnit= mBusinessUnit;
            }
            
            List<CTRRequestFormItem__c> mItemList = [SELECT Id, RecordTypeId, RecordType.DeveloperName, SalesOrganizationTOP__c, SalesOrganizationTX__c, PurchasingOrganizationTOP__c, CommercialScoringResult__c,
                                                            PurchasingOrganizationTX__c, CompanyCodeTOP__c, CompanyCodeTX__c, Customer__c, InterestedProductTypeAsCustomerTOP__c,
                                                            InterestedProductTypeAsCustomerTX__c, InterestedProductTypeAsSupplierTOP__c, InterestedProductTypeAsSupplierTX__c, 
                                                            SAPNumber__c, Division__c, DistributionChannel__c, BusinessUnit__c, ProductName__c, toLabel(SalesOrganizationTX__c) salesOrgTXLabel, toLabel(SalesOrganizationTOP__c) salesOrgTOPLabel, toLabel(PurchasingOrganizationTX__c) purchaseOrgTXLabel, toLabel(PurchasingOrganizationTOP__c) purchaseOrgTOPLabel,
                                                            NonSAPSupplierCode__c, NonSAPCustomerCode__c
                                                            FROM CTRRequestFormItem__c WHERE Customer__c =: mAccountId AND BusinessUnit__c =: actBusinessUnit AND (SAPNumber__c != null OR NonSAPCustomerCode__c != null OR NonSAPSupplierCode__c != null)];
            if(mRecordTypeList[0].DeveloperName.contains('Customer'))
            {
                    List<String> mSalesOrgList = new List<String>();
                    if(mBusinessUnit == 'TOP')
                    {
                        mSalesOrgList.add('1100');
                    }
                    else if(mBusinessUnit == 'TPX') {
                        mSalesOrgList.add('1300');
                    } 
                    else if(mBusinessUnit == 'TLB') {
                        mSalesOrgList.add('1400');
                    }
                    else if(mBusinessUnit == 'LABIX')
                    {
                        mSalesOrgList.add('1700');
                    }
                    else if(mBusinessUnit == 'TXTH') 
                    {
                        mSalesOrgList.add('2000');
                    } 
                    else if(mBusinessUnit == 'TSV') 
                    {
                        mSalesOrgList.add('9100');
                    } 
                    else if(mBusinessUnit == 'TSR') 
                    {
                        mSalesOrgList.add('9200');
                    } 
                    else if(mBusinessUnit == 'JSKem') 
                    {
                        mSalesOrgList.add('9300');
                    } 
                    else if(mBusinessUnit == 'TXINDIA') 
                    {
                        mSalesOrgList.add('9400');
                    }

                    List<String> mSalesAreaFields = new List<String>(((SObject)Type.forName('C360_SalesArea__c').newInstance()).getSObjectType().getDescribe().fields.getMap().keySet());
                    String soqlText = '';
                    soqlText+= ' SELECT ' + String.join(mSalesAreaFields, ',');
                    soqlText+= ', toLabel(SalesOrganization__c) salesOrgLabel, toLabel(DistributionChannel__c) distChLabel, toLabel(Division__c) divisionLabel';
                    soqlText+= ' FROM C360_SalesArea__c';
                    soqlText+= ' WHERE AccountNumber__c = \''+mAccountId+'\'';
                    soqlText+= ' AND SalesOrganization__c IN: mSalesOrgList';
                    List<C360_SalesArea__c> mSalesAreaList = new List<C360_SalesArea__c>();
                    mSalesAreaList = Database.query(soqlText);
                    for(C360_SalesArea__c mSalesArea: mSalesAreaList)
                    {
                        Boolean isFoundItem = false;
                        for(CTRRequestFormItem__c mItem: mItemList)
                        {
                            if(mItem.RecordType.DeveloperName == 'CustomerExtend' || mItem.RecordType.DeveloperName == 'CustomerInitial')
                            {
                                String cusNumber;
                                String mProductName = mItem.ProductName__c;
                                String mSalesOrg = (txSubBU.contains(mBusinessUnit))? mItem.SalesOrganizationTX__c: mItem.SalesOrganizationTOP__c;
                                String mLabelSalesOrg = (txSubBU.contains(mBusinessUnit))? String.valueOf(mItem.get('salesOrgTXLabel')) : String.valueOf(mItem.get('salesOrgTOPLabel'));
                                if(new List<String>{'TSR','JSKem','TXINDIA'}.contains(mBusinessUnit)) {
                                    cusNumber = mItem.NonSAPCustomerCode__c;
                                } else {
                                    cusNumber = mItem.SAPNumber__c;
                                }
                                String mKey = cusNumber+mSalesOrg+mItem.DistributionChannel__c+mItem.Division__c;
                                if(mKey == mSalesArea.Key__c)
                                {
                                    isFoundItem = true;
                                    RequestWrapper mRequestWrapper = new RequestWrapper();
                                    mRequestWrapper.mRecordId = mSalesArea.Id;
                                    mRequestWrapper.mIndex = mIndex;
                                    mRequestWrapper.mProduct = mProductName;
                                    mRequestWrapper.mSalesOrg = mSalesOrg;
                                    mRequestWrapper.mDistributionChannel = mSalesArea.DistributionChannel__c;
                                    mRequestWrapper.mDivision = mSalesArea.Division__c;
                                    mRequestWrapper.mLabelSalesOrg = mLabelSalesOrg;
                                    mRequestWrapper.mLabelDistributionChannel = String.valueOf(mSalesArea.get('distChLabel'));
                                    mRequestWrapper.mLabelDivision = String.valueOf(mSalesArea.get('divisionLabel'));
                                    mRequestWrapper.mSelected = false;

                                    mRequestWrapperList.add(mRequestWrapper);
                                    mIndex++;
                                }
                            }
                        }
                        if(!isFoundItem)
                        {
                            RequestWrapper mRequestWrapper = new RequestWrapper();
                            mRequestWrapper.mRecordId = mSalesArea.Id;
                            mRequestWrapper.mIndex = mIndex;
                            mRequestWrapper.mProduct = '';
                            mRequestWrapper.mSalesOrg = mSalesArea.SalesOrganization__c;
                            mRequestWrapper.mDistributionChannel = mSalesArea.DistributionChannel__c;
                            mRequestWrapper.mDivision = mSalesArea.Division__c;
                            mRequestWrapper.mLabelSalesOrg = String.valueOf(mSalesArea.get('salesOrgLabel'));
                            mRequestWrapper.mLabelDistributionChannel = String.valueOf(mSalesArea.get('distChLabel'));
                            mRequestWrapper.mLabelDivision = String.valueOf(mSalesArea.get('divisionLabel'));
                            mRequestWrapper.mSelected = false;
                            mRequestWrapperList.add(mRequestWrapper);
                            mIndex++;
                        }
                    }

            }
            else if(mRecordTypeList[0].DeveloperName.contains('Supplier'))
            {
                //List<CTRPurchasingView__c> mPurchasingView = [SELECT Id FROM CTRPurchasingView__c WHERE Account__c =: mAccountId];
                List<String> mPurchasingList = new List<String>();
                if(mBusinessUnit == 'TOP' || mBusinessUnit == 'TLB' || mBusinessUnit == 'TPX' || mBusinessUnit == 'LABIX')
                {
                    mPurchasingList.add('1100');
                    mPurchasingList.add('1000');
                }
                else if(mBusinessUnit == 'TXTH')
                {
                    mPurchasingList.add('A000');
                }
                else if(mBusinessUnit == 'TSV')
                {
                    mPurchasingList.add('H100');
                }
                else if(mBusinessUnit == 'TSR')
                {
                    mPurchasingList.add('I100');
                }
                else if(mBusinessUnit == 'JSKem')
                {
                    mPurchasingList.add('S100');
                }
                else if(mBusinessUnit == 'TXINDIA')
                {
                    mPurchasingList.add('N100');
                }

                List<String> mPurchasingViewFields = new List<String>(((SObject)Type.forName('CTRPurchasingView__c').newInstance()).getSObjectType().getDescribe().fields.getMap().keySet());    
                
                String soqlText = '';
                    soqlText+= ' SELECT ' + String.join(mPurchasingViewFields, ',');
                    soqlText+= ' , toLabel(PurchasingOrg__c) purchaseOrgLabel';
                    soqlText+= ' FROM CTRPurchasingView__c';
                    soqlText+= ' WHERE Account__c = \''+mAccountId+'\'';
                    soqlText+= ' AND PurchasingOrg__c IN: mPurchasingList';
                    List<CTRPurchasingView__c> mPurchaseViewList = new List<CTRPurchasingView__c>();
                    mPurchaseViewList = Database.query(soqlText);
                    System.debug('CTRPurchasingView__c '+mPurchaseViewList);
                    System.debug('Debug item '+mItemList);
                    for(CTRPurchasingView__c mPurchasingView: mPurchaseViewList)
                    {
                        Boolean isFoundItem = false;
                        for(CTRRequestFormItem__c mItem: mItemList)
                        {
                            if(mItem.RecordType.DeveloperName == 'SupplierExtend' || mItem.RecordType.DeveloperName == 'SupplierInitial')
                            {
                                String supNumber;
                                if(new List<String>{'TSR','JSKem','TXINDIA'}.contains(mBusinessUnit)) {
                                    supNumber = mItem.NonSAPSupplierCode__c;
                                } else {
                                    supNumber = mItem.SAPNumber__c;
                                }
                                String mProductName = mItem.ProductName__c;
                                System.debug('ProductName__c'+mProductName);
                                String mPurchasingOrg = (txSubBU.contains(mBusinessUnit))? mItem.PurchasingOrganizationTX__c: mItem.PurchasingOrganizationTOP__c;
                                System.debug('mPurchasingOrg'+mPurchasingOrg);
                                String mLabelPurchasingOrg = (txSubBU.contains(mBusinessUnit))? String.valueOf(mItem.get('purchaseOrgTXLabel')): String.valueOf(mItem.get('purchaseOrgTOPLabel'));
                                String mKey = supNumber+mPurchasingOrg;
                                System.debug('mKey'+mKey);
                                System.debug('mPurchasingView.Key__c'+mPurchasingView.Key__c);
                                if(mKey == mPurchasingView.Key__c)
                                {
                                    isFoundItem = true;
                                    RequestWrapper mRequestWrapper = new RequestWrapper();
                                    mRequestWrapper.mRecordId = mPurchasingView.Id;
                                    mRequestWrapper.mIndex = mIndex;
                                    mRequestWrapper.mProduct = mProductName;
                                    mRequestWrapper.mSalesOrg = mPurchasingOrg;
                                    mRequestWrapper.mLabelSalesOrg = mLabelPurchasingOrg;
                                    mRequestWrapper.mSelected = false;
                                    //mRequestWrapper.mDistributionChannel = mPurchasingView.DistributionChannel__c;
                                    mRequestWrapperList.add(mRequestWrapper);
                                    mIndex++;
                                }
                            }
                        }
                        if(!isFoundItem)
                        {
                            RequestWrapper mRequestWrapper = new RequestWrapper();
                            mRequestWrapper.mRecordId = mPurchasingView.Id;
                            mRequestWrapper.mIndex = mIndex;
                            mRequestWrapper.mProduct = '';
                            mRequestWrapper.mSalesOrg = mPurchasingView.PurchasingOrg__c;
                            mRequestWrapper.mLabelSalesOrg = String.valueOf(mPurchasingView.get('purchaseOrgLabel'));
                            mRequestWrapper.mSelected = false;
                            //mRequestWrapper.mDistributionChannel = mPurchasingView.DistributionChannel__c;
                            mRequestWrapperList.add(mRequestWrapper);
                            mIndex++;
                        }
                    }
            }
            
            return mRequestWrapperList;

        } 
        catch (Exception e) 
        {
            System.debug('Error From CTRRequestFormEditTypeController.onloadCreatePage Line: '+e.getLineNumber()+' || Message:'+e.getMessage());
            return null;
        }
    }

    @AuraEnabled
    public static String onCreateEditRequest(String CustomerId, String BusinessUnit, String RecordType, RequestWrapper mRequestWrapper)
    {
        try
        {
            List<RecordType> RecordTypeList = [SELECT Id, Name, DeveloperName FROM RecordType WHERE Id = :RecordType LIMIT 1];
            Id insertedItemId;
            List<String> topSubBU = new List<String>{'TOP','TLB','TPX'};
            List<String> txSubBU = new List<String>{'TXTH','TSV','TSR','JSKem','TXINDIA'};

                if(RecordTypeList[0].DeveloperName.contains('Customer')){


                    List<String> mSalesAreaFields = new List<String>(((SObject)Type.forName('C360_SalesArea__c').newInstance()).getSObjectType().getDescribe().fields.getMap().keySet());
                    
                    String soqlText = '';
                    soqlText+= ' SELECT ' + String.join(mSalesAreaFields, ',');
                    soqlText+= ' ,AccountNumber__r.Country__c, AccountNumber__r.Country__r.Code__c, AccountNumber__r.AccountNumber__c, AccountNumber__r.NonSAPCustomerCode__c';
                    soqlText+= ' FROM C360_SalesArea__c';
                    soqlText+= ' WHERE Id = \''+mRequestWrapper.mRecordId+'\' LIMIT 1';
                    List<C360_SalesArea__c> mSalesAreaList = new List<C360_SalesArea__c>();
                    mSalesAreaList = Database.query(soqlText);

                    String cusNumber = new List<String>{'TSR','JSKem','TXINDIA'}.contains(BusinessUnit) ? mSalesAreaList[0].AccountNumber__r.NonSAPCustomerCode__c : mSalesAreaList[0].AccountNumber__r.AccountNumber__c;
                    String mFinancialKey = cusNumber+mSalesAreaList[0].SalesOrganization__c+mSalesAreaList[0].CreditControlArea__c;

                    List<String> mFinancialFields = new List<String>(((SObject)Type.forName('C360_FinancialInfo__c').newInstance()).getSObjectType().getDescribe().fields.getMap().keySet());
                    String soqlFinancialText = '';
                    soqlFinancialText+= ' SELECT ' + String.join(mFinancialFields, ',');
                    soqlFinancialText+= ' FROM C360_FinancialInfo__c';
                    soqlFinancialText+= ' WHERE Key__c = \''+mFinancialKey+'\'';
                    List<C360_FinancialInfo__c> mFinanicialList =  Database.query(soqlFinancialText);

                    String mAddInfoKey = cusNumber+mSalesAreaList[0].SalesOrganization__c+mSalesAreaList[0].DistributionChannel__c;
                    List<CTRAdditionalInfo__c> mAddInfoList = [SELECT Id, Application__c, InterGroup__c, CustomerType__c, CustomerGroup__c, Industry__c, SubIndustry__c FROM CTRAdditionalInfo__c WHERE Key__c =: mAddInfoKey LIMIT 1];


                    List<CTRRequestFormItem__c> mItemList = [SELECT Id, RecordTypeId, RecordType.DeveloperName, DistributionChannel__c, Division__c, SalesOrganization__c, Customer__c, CommercialScoringResult__c,
                                                            ProductName__c, BusinessUnit__c, SalesOrganizationTX__c, SalesOrganizationTOP__c, InterestedProductTypeAsCustomerTX__c, InterestedProductTypeAsCustomerTOP__c, Product__c,
                                                            LubeBaseProducts__c,CustomerProductIdentification__c,LABIXProducts__c
                                                            FROM CTRRequestFormItem__c 
                                                            WHERE Customer__c = :mSalesAreaList[0].AccountNumber__c  
                                                            AND SalesOrganization__c = :mSalesAreaList[0].SalesOrganization__c
                                                            AND Division__c = :mSalesAreaList[0].Division__c 
                                                            AND DistributionChannel__c = :mSalesAreaList[0].DistributionChannel__c
                                                            AND (SAPNumber__c != null OR NonSAPCustomerCode__c != null)];

                    CTRRequestFormHeader__c mRequestFormHeader = new CTRRequestFormHeader__c();
                    Id RecordTypeId = Schema.SObjectType.CTRRequestFormHeader__c.getRecordTypeInfosByDeveloperName().get('EditInformation').getRecordTypeId();
                
                    mRequestFormHeader.RecordTypeId = RecordTypeId;
                    mRequestFormHeader.Customer__c = CustomerId;
                    insert mRequestFormHeader;
                    List<CTRRequestFormItem__c> itemToInsert = new List<CTRRequestFormItem__c>();
                    for (C360_SalesArea__c salesArea : mSalesAreaList) 
                    {
                            

                                CTRRequestFormItem__c mRequestFormItem = new CTRRequestFormItem__c();
                                mRequestFormItem.CTRRequestFormHeader__c = mRequestFormHeader.Id;
                                mRequestFormItem.Customer__c = CustomerId;
                                mRequestFormItem.RecordTypeId = RecordType;
                                mRequestFormItem.Status__c = 'New';
                                mRequestFormItem.Approval_Step__c = 'Open';
                                mRequestFormItem.WHTaxCountry__c = (salesArea.AccountNumber__r.Country__c != null)?salesArea.AccountNumber__r.Country__r.Code__c: '';

                                mRequestFormItem.AccountAssignmentGroup__c = salesArea.AccountAssignmentGroup__c;
                                mRequestFormItem.Currency__c = salesArea.Currency__c;
                                mRequestFormItem.CustPriceProc__c = salesArea.CustPriceProc__c;
                                mRequestFormItem.CustStatGroup__c = salesArea.CustStatGroup__c;
                                mRequestFormItem.DeliveryPlant__c = salesArea.DeliveryPlant__c;
                                mRequestFormItem.DeliveryPriority__c = salesArea.DeliveryPriority__c;
                                mRequestFormItem.DistributionChannel__c = salesArea.DistributionChannel__c;
                                mRequestFormItem.Division__c = salesArea.Division__c;
                                mRequestFormItem.ExchangeRateType__c = salesArea.ExchangeRateType__c;
                                mRequestFormItem.Incoterms__c = salesArea.Incoterms__c;
                                mRequestFormItem.Incoterms2__c = salesArea.Incoterms2__c;
                                mRequestFormItem.MaxPartialDeliveries__c = salesArea.MaxPartialDeliveries__c;
                                mRequestFormItem.OrderCombination__c = salesArea.OrderCombination__c;
                                mRequestFormItem.OrderProbability__c = salesArea.OrderProbability__c;
                                mRequestFormItem.OverdeliveryTolerance__c = salesArea.OverdeliveryTolerance__c;
                                mRequestFormItem.PartialDeliveriesperitem__c = salesArea.PartialDeliveriesperitem__c;
                                mRequestFormItem.PaymentGuaranteeProcedure__c = salesArea.PaymentGuaranteeProcedure__c;
                                mRequestFormItem.IsPriceDetermin__c = salesArea.IsPriceDetermin__c;
                                mRequestFormItem.PriceGroup__c = salesArea.PriceGroup__c;
                                mRequestFormItem.Rebate__c = salesArea.Rebate__c;
                                mRequestFormItem.SalesDistrict__c = salesArea.SalesDistrict__c;
                                mRequestFormItem.SalesGroup__c = salesArea.SalesGroup__c;
                                mRequestFormItem.SalesOffice__c = salesArea.SalesOffice__c;
                                mRequestFormItem.SalesOrganization__c = salesArea.SalesOrganization__c;
                                mRequestFormItem.ShippingConditions__c = salesArea.ShippingCondition__c; // item ไม่ตรงกับ sales area
                                mRequestFormItem.TermofPayment__c = salesArea.TermofPayment__c;
                                mRequestFormItem.UnderdeliveryTolerance__c = salesArea.UnderdeliveryTolerance__c;
                                mRequestFormItem.PaymentGuaranteeProcedure__c = salesArea.PaymentGuaranteeProcedure__c;

                                if(mAddInfoList.size() > 0) {
                                    mRequestFormItem.Application__c = mAddInfoList[0].Application__c;
                                    mRequestFormItem.CustomerGroup__c = mAddInfoList[0].CustomerGroup__c;
                                    mRequestFormItem.CustomerType__c = mAddInfoList[0].CustomerType__c;
                                    mRequestFormItem.Industry__c = mAddInfoList[0].Industry__c;
                                    mRequestFormItem.InterGroup__c = mAddInfoList[0].InterGroup__c;
                                    mRequestFormItem.SubIndustry__c = mAddInfoList[0].SubIndustry__c;
                                }

                                if (txSubBU.contains(BusinessUnit)) {
                                    mRequestFormItem.SalesOrganizationTX__c = salesArea.SalesOrganization__c;
                                    mRequestFormItem.Liable1__c = true;
                                    mRequestFormItem.Liable2__c = true;
                                    mRequestFormItem.GRBasedInvVerif__c = true;
                                    // mRequestFormItem.Recty1__c = '53';
                                    // mRequestFormItem.Recty2__c = '53';
                                    // mRequestFormItem.Wthttype1__c = 'J1';
                                    // mRequestFormItem.Wthttype2__c = 'J2';
                                    mRequestFormItem.WHTaxCountry__c = salesArea.AccountNumber__r.Country__r.Code__c;
                                    

                                    if(mFinanicialList.size() > 0) 
                                    {
                                        // mRequestFormItem.SortKey__c = mFinanicialList[0].SortKey__c;
                                        // mRequestFormItem.ReconAccount__c = mFinanicialList[0].ReconAccount__c;
                                        // mRequestFormItem.CashManagementGroup__c = mFinanicialList[0].CashManagementGroup__c;
                                        // mRequestFormItem.PaymentHistoryRecord__c = mFinanicialList[0].PaymentHistoryRecord__c;
                                        // mRequestFormItem.Authorization__c = mFinanicialList[0].Authorization__c;
                                        
                                        // mRequestFormItem.CompanyCode__c = mFinancialInfo.CompanyCode__c; 
                                        mRequestFormItem.CreditControlArea__c = mFinanicialList[0].CreditControlArea__c;
                                        mRequestFormItem.CreditLimit__c = mFinanicialList[0].CreditLimit__c;
                                        mRequestFormItem.Currency__c = mFinanicialList[0].Currency__c;
                                        mRequestFormItem.PaymentHistoryRecord__c = mFinanicialList[0].PaymentHistoryRecord__c;
                                        mRequestFormItem.PaymentCondition__c = mFinanicialList[0].PaymentCondition__c;
                                        mRequestFormItem.CashManagementGroup__c = mFinanicialList[0].CashManagementGroup__c;
                                        mRequestFormItem.SortKey__c = mFinanicialList[0].SortKey__c;
                                        mRequestFormItem.ReconAccount__c = mFinanicialList[0].ReconAccount__c;
                                        mRequestFormItem.AccigClerk__c = mFinanicialList[0].AccigClerk__c;
                                        mRequestFormItem.Chkdoubleinv__c = mFinanicialList[0].Chkdoubleinv__c;
                                        mRequestFormItem.InternalCreditRating__c = mFinanicialList[0].InternalCreditRating__c;
                                        mRequestFormItem.PaymentMethod__c = mFinanicialList[0].PaymentMethod__c;
                                        mRequestFormItem.Credit_Condition__c = mFinanicialList[0].Credit_Condition__c;
                                        mRequestFormItem.TotalSecuredCurrency__c = mFinanicialList[0].TotalSecuredCurrency__c;
                                        mRequestFormItem.Trade_Credit_Insurance__c = mFinanicialList[0].TradeCreditInsurance__c;
                                        mRequestFormItem.TradeCreditInsuranceCurrency__c = mFinanicialList[0].TradeCreditInsuranceCurrency__c;
                                    }

                                    //mRequestFormItem.OrderProbability__c = 0;
                                    //mRequestFormItem.OrderCombination__c = false;
                                    //mRequestFormItem.Rebate__c = true;
                                    //mRequestFormItem.IsPriceDetermin__c = true;
                                } else // if (topSubBU.contains(BusinessUnit))
                                {
                                    mRequestFormItem.SalesOrganizationTOP__c = salesArea.SalesOrganization__c;
                                }
                                if(mItemList.size()>0)
                                {
                                    CTRRequestFormItem__c item = mItemList[0];
                                    if (item != null)
                                    {
                                        String mProduct = item.ProductName__c != null ? item.ProductName__c : '';
                                        if (txSubBU.contains(BusinessUnit)) {
                                            mRequestFormItem.InterestedProductTypeAsCustomerTX__c = item.InterestedProductTypeAsCustomerTX__c != null ? item.InterestedProductTypeAsCustomerTX__c : '';
                                            mRequestFormHeader.InterestedProductTypeAsCustomerTX__c = item.InterestedProductTypeAsCustomerTX__c != null ? item.InterestedProductTypeAsCustomerTX__c : '';
                                            if(mProduct.contains('Lube'))
                                            {
                                                mRequestFormItem.LubeBaseProducts__c = item.LubeBaseProducts__c;
                                            }

                                            if(mProduct.contains('Other'))
                                            {
                                                mRequestFormItem.CustomerProductIdentification__c = item.CustomerProductIdentification__c;
                                            }
                                        } else // if (topSubBU.contains(BusinessUnit))
                                        {
                                            mRequestFormItem.InterestedProductTypeAsCustomerTOP__c = item.InterestedProductTypeAsCustomerTOP__c != null ? item.InterestedProductTypeAsCustomerTOP__c : '';
                                            mRequestFormHeader.InterestedProductTypeAsCustomerTOP__c = item.InterestedProductTypeAsCustomerTOP__c != null ? item.InterestedProductTypeAsCustomerTOP__c : '';
                                            if(mProduct.contains('Lube'))
                                            {
                                                mRequestFormItem.LubeBaseProducts__c = item.LubeBaseProducts__c;
                                            }
                                            if(mProduct.contains('LABIX'))
                                            {
                                                mRequestFormItem.LABIXProducts__c = item.LABIXProducts__c;
                                            }
                                            if(mProduct.contains('Other'))
                                            {
                                                mRequestFormItem.CustomerProductIdentification__c = item.CustomerProductIdentification__c;
                                            }
                                        }
                                        mRequestFormItem.CommercialScoringResult__c = item.CommercialScoringResult__c;
                                    }
                                }
                                mRequestFormItem.ShippingConditions__c = salesArea.ShippingCondition__c;
                                //mRequestFormItem.SubIndustry__c = salesArea.SubIndustry__c;
                                mRequestFormItem.TermOfPayment__c = salesArea.TermOfPayment__c;
                                mRequestFormItem.UnderdeliveryTolerance__c = salesArea.UnderdeliveryTolerance__c;

                                // mItemList.add(mRequestFormItem);
                                itemToInsert.add(mRequestFormItem);
                        
                    }

                    if(itemToInsert.size() > 0) {
                        insert itemToInsert;
                        update mRequestFormHeader;
                        insertedItemId = itemToInsert[0].Id;
                    }
                }else if(RecordTypeList[0].DeveloperName.contains('Supplier')) 
                    {

                        List<String> mPurchasingViewFields = new List<String>(((SObject)Type.forName('CTRPurchasingView__c').newInstance()).getSObjectType().getDescribe().fields.getMap().keySet());    
                        String soqlText = '';
                            soqlText+= ' SELECT ' + String.join(mPurchasingViewFields, ',');
                            soqlText+= ' ,Account__r.SupplierNumber__c, Account__r.Country__r.Code__c, Account__r.NonSAPSupplierCode__c';
                            soqlText+= ' FROM CTRPurchasingView__c';
                            soqlText+= ' WHERE Id = \''+mRequestWrapper.mRecordId+'\'';
                            List<CTRPurchasingView__c> mPurchaseViewList = new List<CTRPurchasingView__c>();
                            mPurchaseViewList = Database.query(soqlText);

                            String mBu = BusinessUnit;
                            if(topSubBU.contains(BusinessUnit))
                            {
                                mBu = 'TOP';
                            }
                            else if (txSubBU.contains(BusinessUnit))
                            {
                                mBu = 'TX';
                            }
                            String mComCode = retrieveComCodeMapping(mBu, mPurchaseViewList[0].PurchasingOrg__c);

                            String supNumber = new List<String>{'TSR','JSKem','TXINDIA'}.contains(BusinessUnit) ? mPurchaseViewList[0].Account__r.NonSAPSupplierCode__c : mPurchaseViewList[0].Account__r.SupplierNumber__c;
                            String mFinancialKey = supNumber+mComCode;
                            

                            List<String> mFinancialFields = new List<String>(((SObject)Type.forName('C360_FinancialInfo__c').newInstance()).getSObjectType().getDescribe().fields.getMap().keySet());
                            String soqlFinancialText = '';
                            soqlFinancialText+= ' SELECT ' + String.join(mFinancialFields, ',');
                            soqlFinancialText+= ' FROM C360_FinancialInfo__c';
                            soqlFinancialText+= ' WHERE Key__c = \''+mFinancialKey+'\'';
                            List<C360_FinancialInfo__c> mFinanicialList = Database.query(soqlFinancialText);

                            List<CTRRequestFormItem__c> mItemList = [SELECT Id, RecordTypeId, RecordType.DeveloperName, AutomaticPurchaseOrder__c, GRBasedInvVerif__c, PurchasingOrganization__c, Customer__c, CommercialScoringResult__c,
                                                            ProductName__c, BusinessUnit__c, PurchasingOrganizationTOP__c, PurchasingOrganizationTX__c, InterestedProductTypeAsSupplierTX__c, InterestedProductTypeAsSupplierTOP__c, Product__c,
                                                            SupplierProductIdentification__c, PetroleumAndComponentsProducts__c
                                                            FROM CTRRequestFormItem__c 
                                                            WHERE Customer__c = :mPurchaseViewList[0].Account__c 
                                                            AND (PurchasingOrganizationTOP__c = :mPurchaseViewList[0].PurchasingOrg__c OR PurchasingOrganizationTX__c = :mPurchaseViewList[0].PurchasingOrg__c)];

                                
                                CTRRequestFormHeader__c mRequestFormHeader = new CTRRequestFormHeader__c();
                                Id RecordTypeId = Schema.SObjectType.CTRRequestFormHeader__c.getRecordTypeInfosByDeveloperName().get('EditInformation').getRecordTypeId();
                                
                                mRequestFormHeader.Customer__c = CustomerId;
                                mRequestFormHeader.RecordTypeId = RecordTypeId;
                                insert mRequestFormHeader;

                                List<CTRRequestFormItem__c> itemToInsert = new List<CTRRequestFormItem__c>();
                                    for (CTRPurchasingView__c Purchasing : mPurchaseViewList) {

                                        CTRRequestFormItem__c mRequestFormItem = new CTRRequestFormItem__c();
                                        mRequestFormItem.Status__c = 'New';
                                        mRequestFormItem.Approval_Step__c = 'Open';
                                        mRequestFormItem.CTRRequestFormHeader__c = mRequestFormHeader.Id;
                                        mRequestFormItem.Customer__c = CustomerId;
                                        mRequestFormItem.RecordTypeId = RecordType;

                                        mRequestFormItem.Chkdoubleinv__c = Purchasing.Chkdoubleinv__c;
                                        mRequestFormItem.Currency__c = Purchasing.Currency__c;
                                        mRequestFormItem.GRBasedInvVerif__c = Purchasing.GRBasedInvVerif__c;
                                        mRequestFormItem.Incoterms2__c = Purchasing.Incoterms2__c;
                                        mRequestFormItem.Incoterms__c = Purchasing.Incoterms__c;
                                        mRequestFormItem.PurchasingOrganization__c = Purchasing.PurchasingOrg__c;
                                        mRequestFormItem.ShippingConditions__c = Purchasing.ShippingConditions__c;
                                        // mRequestFormItem.TermofPayment__c = Purchasing.TermofPayment__c;
                                        mRequestFormItem.PaymentMethod__c = Purchasing.PaymentMethod__c;
                                        mRequestFormItem.AccigClerk__c = Purchasing.AcctgClerk__c;
                                        mRequestFormItem.AutomaticPurchaseOrder__c = Purchasing.AutomaticPurchaseOrder__c;
                                        
                                        if (txSubBU.contains(BusinessUnit)) {
                                            
                                            mRequestFormItem.PurchasingOrganizationTX__c = Purchasing.PurchasingOrg__c;
                                            mRequestFormItem.Liable1__c = true;
                                            mRequestFormItem.Liable2__c = true;
                                            mRequestFormItem.GRBasedInvVerif__c = true;
                                            // mRequestFormItem.Recty1__c = '53';
                                            // mRequestFormItem.Recty2__c = '53';
                                            // mRequestFormItem.Wthttype1__c = 'J1';
                                            // mRequestFormItem.Wthttype2__c = 'J2';
                                            mRequestFormItem.OrderProbability__c = 0;
                                            mRequestFormItem.OrderCombination__c = false;
                                            mRequestFormItem.Rebate__c = true;
                                            mRequestFormItem.IsPriceDetermin__c = true;
                                            mRequestFormItem.WHTaxCountry__c = Purchasing.Account__r.Country__r.Code__c;
                                            mRequestFormItem.TermofPayment__c = Purchasing.TermofPayment__c;

                                            if(mFinanicialList.size() > 0) {
                                                // mRequestFormItem.CompanyCode__c = mFinancialInfo.CompanyCode__c; 
                                                mRequestFormItem.CreditControlArea__c = mFinanicialList[0].CreditControlArea__c;
                                                mRequestFormItem.CreditLimit__c = mFinanicialList[0].CreditLimit__c;
                                                mRequestFormItem.Currency__c = mFinanicialList[0].Currency__c;
                                                mRequestFormItem.PaymentHistoryRecord__c = mFinanicialList[0].PaymentHistoryRecord__c;
                                                mRequestFormItem.PaymentCondition__c = mFinanicialList[0].PaymentCondition__c;
                                                mRequestFormItem.CashManagementGroup__c = mFinanicialList[0].CashManagementGroup__c;
                                                mRequestFormItem.SortKey__c = mFinanicialList[0].SortKey__c;
                                                mRequestFormItem.ReconAccount__c = mFinanicialList[0].ReconAccount__c;
                                                mRequestFormItem.AccigClerk__c = mFinanicialList[0].AccigClerk__c;
                                                mRequestFormItem.Chkdoubleinv__c = mFinanicialList[0].Chkdoubleinv__c;
                                                mRequestFormItem.InternalCreditRating__c = mFinanicialList[0].InternalCreditRating__c;
                                                // mRequestFormItem.Liable1__c = mFinancialInfo.Liable1__c;
                                                // mRequestFormItem.Liable2__c = mFinancialInfo.Liable2__c;
                                                mRequestFormItem.PaymentMethod__c = mFinanicialList[0].PaymentMethod__c;
                                                // mRequestFormItem.Recty1__c = mFinancialInfo.Recty1__c;
                                                // mRequestFormItem.Recty2__c = mFinancialInfo.Recty2__c;
                                                // mRequestFormItem.WHTaxCountry__c = mFinancialInfo.WHTaxCountry__c;
                                                // mRequestFormItem.Wthttype1__c = mFinancialInfo.Wthttype1__c;
                                                // mRequestFormItem.Wthttype2__c = mFinancialInfo.Wthttype2__c;
                                                mRequestFormItem.Credit_Condition__c = mFinanicialList[0].Credit_Condition__c;
                                                // itemToInsert.TotalSecuredAmount__c = mFinancialInfo.TotalSecuredAmount__c; //เป็น formula field
                                                mRequestFormItem.TotalSecuredCurrency__c = mFinanicialList[0].TotalSecuredCurrency__c;
                                                mRequestFormItem.Trade_Credit_Insurance__c = mFinanicialList[0].TradeCreditInsurance__c;
                                                mRequestFormItem.TradeCreditInsuranceCurrency__c = mFinanicialList[0].TradeCreditInsuranceCurrency__c;
                                            }

                                        } else //if (topSubBU.contains(BusinessUnit))
                                        {
                                            mRequestFormItem.PurchasingOrganizationTOP__c = Purchasing.PurchasingOrg__c;
                                        }

                                        if(mItemList.size()>0)
                                        {
                                            if (mItemList[0] != null)
                                            {
                                                CTRRequestFormItem__c item = mItemList[0];
                                                String mProduct = item.ProductName__c != null ? item.ProductName__c : '';
                                                if (txSubBU.contains(BusinessUnit)) {
                                                    mRequestFormItem.InterestedProductTypeAsSupplierTX__c = item.InterestedProductTypeAsSupplierTX__c != null ? item.InterestedProductTypeAsSupplierTX__c : '';
                                                    mRequestFormHeader.InterestedProductTypeAsSupplierTX__c = item.InterestedProductTypeAsSupplierTX__c != null ? item.InterestedProductTypeAsSupplierTX__c : '';
                                                    if(mProduct.contains('Other'))
                                                    {
                                                        mRequestFormItem.SupplierProductIdentification__c = item.SupplierProductIdentification__c;
                                                    }
                                                } else// if (topSubBU.contains(BusinessUnit)) 
                                                {
                                                    mRequestFormItem.InterestedProductTypeAsSupplierTOP__c = item.InterestedProductTypeAsSupplierTOP__c != null ? item.InterestedProductTypeAsSupplierTOP__c : '';
                                                    mRequestFormHeader.InterestedProductTypeAsSupplierTOP__c = item.InterestedProductTypeAsSupplierTOP__c != null ? item.InterestedProductTypeAsSupplierTOP__c : '';
                                                    if(mProduct.contains('Petroleum'))
                                                    {
                                                        mRequestFormItem.PetroleumAndComponentsProducts__c = item.PetroleumAndComponentsProducts__c;
                                                    }
                                                    if(mProduct.contains('Other'))
                                                    {
                                                        mRequestFormItem.SupplierProductIdentification__c = item.SupplierProductIdentification__c;
                                                    }
                                                }
                                                mRequestFormItem.CommercialScoringResult__c = item.CommercialScoringResult__c;
                                            }
                                        }
                                        

                                        itemToInsert.add(mRequestFormItem);             
                                    }
                        if(itemToInsert.size() > 0) {
                            insert itemToInsert;
                            update mRequestFormHeader;
                            insertedItemId = itemToInsert[0].Id;
                        }
                    }
            // String mResult = 'success';
            return insertedItemId;
        } 
        catch (Exception e) 
        {
            System.debug('Error From CTRRequestFormEditTypeController.onSave Line: '+e.getLineNumber()+' || Message:'+e.getMessage());
            return 'error:'+ e.getMessage();
        }
    }

    public static string retrieveComCodeMapping(String mBu, String mPurchasingOrg)
    {
        String result = '';
        String CTRRequestItemComCodeMapping = 'CTRRequestItemComCodeMapping';
                            Map<String, CTRGeneralSetting__mdt> configMap = CTRCheckDueDiligenceController.getGeneralSetting(new List<String> {CTRRequestItemComCodeMapping});
                            if(configMap != null && !configMap.isEmpty() && configMap.containsKey(CTRRequestItemComCodeMapping)) 
                            {
                                if(!String.isBlank(configMap.get(CTRRequestItemComCodeMapping)?.LongValue__c)) 
                                {
                                    Map<String, Object> buMap = (Map<String, Object>) JSON.deserializeUntyped(configMap.get(CTRRequestItemComCodeMapping).LongValue__c);
                                    if(buMap != null && !buMap.isEmpty() && buMap.containsKey(mBu)) 
                                    {
                                        Map<String, Object> productMap = (Map<String, Object>) buMap.get(mBu);
                                        if(productMap != null && !productMap.isEmpty() && productMap.containsKey(mPurchasingOrg)) 
                                        {
                                            result = (String) productMap.get(mPurchasingOrg);
                                        }
                                    }
                                }
                            }
        return result;
    }
    
    public class LogWrapper
    {
        @AuraEnabled public String Label {get;set;}
        @AuraEnabled public String Api {get;set;}
        @AuraEnabled public String Value {get;set;}

    }

}