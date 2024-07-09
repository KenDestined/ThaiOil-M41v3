public with sharing class CTRRequestHeaderHandler 
{
    public static Boolean firstRunComplete = false;

    public static void prepopulateValueBeforeInsert ( List<CTRRequestFormHeader__c> mHeaderList)
    {
        try
        {
            Set<Id> mCustomerSetId = new Set<Id>();
            for(CTRRequestFormHeader__c mHeader: mHeaderList)
            {
                if(mHeader.Customer__c != null)
                {

                    mCustomerSetId.add(mHeader.Customer__c);
                }
                
            }
            if(mCustomerSetId.size()>0)
            {
                List<String> mAccountFields = new List<String>(((SObject)Type.forName('Account').newInstance()).getSObjectType().getDescribe().fields.getMap().keySet());
                String soqlAccount = '';
                soqlAccount+= ' SELECT ' + String.join(mAccountFields, ',');
                soqlAccount+= ' ,LeadName__r.Buyer__c, LeadName__r.Seller__c';
                soqlAccount+= ' FROM Account';
                soqlAccount+= ' WHERE ID IN: mCustomerSetId';
                system.debug('soqlAccount '+ soqlAccount);
                List<Account> mCustomerList = Database.query(soqlAccount);
                Map<Id,Account> mCustomerMap = new Map<Id,Account>();
                for(Account mCustomer: mCustomerList)
                {
                    mCustomerMap.put(mCustomer.Id, mCustomer);
                }

                
                for(CTRRequestFormHeader__c mHeader: mHeaderList)
                {
                    if(mHeader.Customer__c != null)
                    {
                        Account mAccount = mCustomerMap.get(mHeader.Customer__c);
                        if(mAccount != null)
                        {
                            mHeader.TypeOfBusinessBranch__c = (mHeader.TypeOfBusinessBranch__c!= null)?mHeader.TypeOfBusinessBranch__c:mAccount.TypeOfBusinessBranch__c;
                            mHeader.CompanyNameENF__c = (mHeader.CompanyNameENF__c != null)?mHeader.CompanyNameENF__c: mAccount.CompanyNameENF__c;
                            mHeader.CompanyNameLocal__c = (mHeader.CompanyNameLocal__c != null)?mHeader.CompanyNameLocal__c: mAccount.CompanyNameLocal__c;
                            mHeader.FormerNameofCompany__c = (mHeader.FormerNameofCompany__c != null)?mHeader.FormerNameofCompany__c: mAccount.FormerNameofCompany__c;
                            mHeader.CustomerType__c = (mHeader.CustomerType__c != null)?mHeader.CustomerType__c: mAccount.CustomerType__c;
                            mHeader.TypeOfBusinessCommercialEvaluation__c = (mHeader.TypeOfBusinessCommercialEvaluation__c != null)?mHeader.TypeOfBusinessCommercialEvaluation__c: mAccount.TypeOfBusinessCommercialEvaluation__c;
                            //mHeader.TypeOfBusiness__c = (mHeader.TypeOfBusiness__c != null)?mHeader.TypeOfBusiness__c: mAccount.TypeOfBusiness__c;
                            mHeader.LegalEntity__c = (mHeader.LegalEntity__c != null)?mHeader.LegalEntity__c: mAccount.LegalEntity__c;
                            mHeader.IncoperationDate__c = (mHeader.IncoperationDate__c != null)?mHeader.IncoperationDate__c: mAccount.IncoperationDate__c;
                            mHeader.TaxCode1__c = (mHeader.TaxCode1__c != null)?mHeader.TaxCode1__c: mAccount.TaxCode1__c;
                            mHeader.Language__c = (mHeader.Language__c != null)?mHeader.Language__c: mAccount.Language__c;
                            mHeader.SpecifyLanguagesOfCompanyName__c = (mHeader.SpecifyLanguagesOfCompanyName__c != null)?mHeader.SpecifyLanguagesOfCompanyName__c: mAccount.SpecifyLanguagesOfCompanyName__c;
                            mHeader.SupplierType__c = (mHeader.SupplierType__c != null)?mHeader.SupplierType__c: mAccount.SupplierType__c;
                            mHeader.Country__c = (mHeader.Country__c != null)?mHeader.Country__c: mAccount.Country__c;
                            mHeader.TypeOfBusinessOthers__c = (mHeader.TypeOfBusinessOthers__c != null)?mHeader.TypeOfBusinessOthers__c: mAccount.TypeOfBusinessOthers__c;
                            mHeader.LegalEntityOthers__c = (mHeader.LegalEntityOthers__c != null)?mHeader.LegalEntityOthers__c: mAccount.LegalEntityOthers__c;
                            mHeader.YearsofExperience__c = (mHeader.YearsofExperience__c != null)?mHeader.YearsofExperience__c: mAccount.YearsofExperience__c;
                            mHeader.CompanyWebsite__c = (mHeader.CompanyWebsite__c != null)?mHeader.CompanyWebsite__c: mAccount.CompanyWebsite__c;
                            mHeader.NoOfRegistrationMinistryEnergy__c = (mHeader.NoOfRegistrationMinistryEnergy__c != null)?mHeader.NoOfRegistrationMinistryEnergy__c: mAccount.NoOfRegistrationMinistryEnergy__c;
                            mHeader.CustomerSearchTermLocal__c = (mHeader.CustomerSearchTermLocal__c != null)?mHeader.CustomerSearchTermLocal__c: mAccount.CustomerSearchTermLocal__c;
                            mHeader.CustomerSearchTermEN__c = (mHeader.CustomerSearchTermEN__c != null)?mHeader.CustomerSearchTermEN__c: mAccount.CustomerSearchTermEN__c;
                            mHeader.SupplierSearchTermLocal__c = (mHeader.SupplierSearchTermLocal__c != null)?mHeader.SupplierSearchTermLocal__c: mAccount.SupplierSearchTermLocal__c;
                            mHeader.SupplierSearchTermEN__c = (mHeader.SupplierSearchTermEN__c != null)?mHeader.SupplierSearchTermEN__c: mAccount.SupplierSearchTermEN__c;
                            mHeader.CoName__c = (mHeader.CoName__c != null)?mHeader.CoName__c: mAccount.CoName__c;
                            mHeader.HousenoLocal__c = (mHeader.HousenoLocal__c != null)?mHeader.HousenoLocal__c: mAccount.HousenoLocal__c;
                            mHeader.RoomLocal__c = (mHeader.RoomLocal__c != null)?mHeader.RoomLocal__c: mAccount.RoomLocal__c;
                            mHeader.BuildingCodeLocal__c = (mHeader.BuildingCodeLocal__c != null)?mHeader.BuildingCodeLocal__c: mAccount.BuildingCodeLocal__c;
                            mHeader.FloorLocal__c = (mHeader.FloorLocal__c != null)?mHeader.FloorLocal__c: mAccount.FloorLocal__c;
                            mHeader.StreetLocal__c = (mHeader.StreetLocal__c != null)?mHeader.StreetLocal__c: mAccount.StreetLocal__c;
                            mHeader.SubDistrictLocalText__c = (mHeader.SubDistrictLocalText__c != null)?mHeader.SubDistrictLocalText__c: mAccount.SubDistrictLocalText__c;
                            mHeader.CityStateLocal__c = (mHeader.CityStateLocal__c != null)?mHeader.CityStateLocal__c: mAccount.CityStateLocal__c;
                            mHeader.DistrictLocalText__c = (mHeader.DistrictLocalText__c != null)?mHeader.DistrictLocalText__c: mAccount.DistrictLocalText__c;
                            mHeader.PostalCodeLocalText__c = (mHeader.PostalCodeLocalText__c != null)?mHeader.PostalCodeLocalText__c: mAccount.PostalCodeLocalText__c;
                            mHeader.LocationInGoogleMapsLinks__c = (mHeader.LocationInGoogleMapsLinks__c != null)?mHeader.LocationInGoogleMapsLinks__c: mAccount.LocationInGoogleMapsLinks__c;

                            mHeader.SameRegisteredAddress__c = (mHeader.SameRegisteredAddress__c == true)?mHeader.SameRegisteredAddress__c: mAccount.SameRegisteredAddress__c;
                            if(mHeader.SameRegisteredAddress__c == true)
                            {
                                mHeader.MailingCoName__c = (mHeader.CoName__c != null)?mHeader.CoName__c: mAccount.CoName__c;
                                mHeader.MailingHousenoLocal__c = (mHeader.HousenoLocal__c != null)?mHeader.HousenoLocal__c: mAccount.HousenoLocal__c;
                                mHeader.MailingRoom__c = (mHeader.RoomLocal__c != null)?mHeader.RoomLocal__c: mAccount.RoomLocal__c;
                                mHeader.MailingBuildingCode__c = (mHeader.BuildingCodeLocal__c != null)?mHeader.BuildingCodeLocal__c: mAccount.BuildingCodeLocal__c;
                                mHeader.MailingFloor__c = (mHeader.FloorLocal__c != null)?mHeader.FloorLocal__c: mAccount.FloorLocal__c;
                                mHeader.MailingStreet__c = (mHeader.StreetLocal__c != null)?mHeader.StreetLocal__c: mAccount.StreetLocal__c;
                                mHeader.MailingSubDistrict__c = (mHeader.SubDistrictLocalText__c != null)?mHeader.SubDistrictLocalText__c: mAccount.SubDistrictLocalText__c;
                                mHeader.MailingCity__c = (mHeader.CityStateLocal__c != null)?mHeader.CityStateLocal__c: mAccount.CityStateLocal__c;
                                mHeader.MailingDistrict__c = (mHeader.DistrictLocalText__c != null)?mHeader.DistrictLocalText__c: mAccount.DistrictLocalText__c;
                                mHeader.MailingPostalCode__c = (mHeader.PostalCodeLocalText__c != null)?mHeader.PostalCodeLocalText__c: mAccount.PostalCodeLocalText__c;
                            }
                            else 
                            {
                                mHeader.MailingCoName__c = (mHeader.MailingCoName__c != null)?mHeader.MailingCoName__c: mAccount.MailingCoName__c;
                                mHeader.MailingHousenoLocal__c = (mHeader.MailingHousenoLocal__c != null)?mHeader.MailingHousenoLocal__c: mAccount.MailingHousenoLocal__c;
                                mHeader.MailingRoom__c = (mHeader.MailingRoom__c != null)?mHeader.MailingRoom__c: mAccount.MailingRoom__c;
                                mHeader.MailingBuildingCode__c = (mHeader.MailingBuildingCode__c != null)?mHeader.MailingBuildingCode__c: mAccount.MailingBuildingCode__c;
                                mHeader.MailingFloor__c = (mHeader.MailingFloor__c != null)?mHeader.MailingFloor__c: mAccount.MailingFloor__c;
                                mHeader.MailingStreet__c = (mHeader.MailingStreet__c != null)?mHeader.MailingStreet__c: mAccount.MailingStreet__c;
                                mHeader.MailingSubDistrict__c = (mHeader.MailingSubDistrict__c != null)?mHeader.MailingSubDistrict__c: mAccount.MailingSubDistrict__c;
                                mHeader.MailingCity__c = (mHeader.MailingCity__c != null)?mHeader.MailingCity__c: mAccount.MailingCity__c;
                                mHeader.MailingDistrict__c = (mHeader.MailingDistrict__c != null)?mHeader.MailingDistrict__c: mAccount.MailingDistrict__c;
                                mHeader.MailingPostalCode__c = (mHeader.MailingPostalCode__c != null)?mHeader.MailingPostalCode__c: mAccount.MailingPostalCode__c;       

                            }

                            mHeader.ContactSalutation__c = (mHeader.ContactSalutation__c != null)?mHeader.ContactSalutation__c: mAccount.ContactSalutation__c;
                            mHeader.FirstName__c = (mHeader.FirstName__c != null)?mHeader.FirstName__c: mAccount.FirstName__c;
                            mHeader.Position__c = (mHeader.Position__c != null)?mHeader.Position__c: mAccount.Position__c;
                            mHeader.MobileCountryCode__c = (mHeader.MobileCountryCode__c != null)?mHeader.MobileCountryCode__c: mAccount.MobileCountryCode__c;
                            mHeader.PhoneCountryCode__c = (mHeader.PhoneCountryCode__c != null)?mHeader.PhoneCountryCode__c: mAccount.PhoneCountryCode__c;
                            mHeader.Phone__c = (mHeader.Phone__c != null)?mHeader.Phone__c: mAccount.Phone;
                            mHeader.PhoneExtension__c = (mHeader.PhoneExtension__c != null)?mHeader.PhoneExtension__c: mAccount.PhoneExtension__c;
                            mHeader.FaxCountryCode__c = (mHeader.FaxCountryCode__c != null)?mHeader.FaxCountryCode__c: mAccount.FaxCountryCode__c;
                            mHeader.FaxExtension__c = (mHeader.FaxExtension__c != null)?mHeader.FaxExtension__c: mAccount.FaxExtension__c;
                            mHeader.Nickname__c = (mHeader.Nickname__c != null)?mHeader.Nickname__c: mAccount.Nickname__c;
                            mHeader.LastName__c = (mHeader.LastName__c != null)?mHeader.LastName__c: mAccount.LastName__c;
                            mHeader.Email__c = (mHeader.Email__c != null)?mHeader.Email__c: mAccount.Email__c;
                            mHeader.MobilePhone__c = (mHeader.MobilePhone__c != null)?mHeader.MobilePhone__c: mAccount.MobilePhone__c;
                            mHeader.TimeZone__c = (mHeader.TimeZone__c != null)?mHeader.TimeZone__c: mAccount.TimeZone__c;
                            mHeader.UltimateParentCompany__c = (mHeader.UltimateParentCompany__c != null)?mHeader.UltimateParentCompany__c: mAccount.UltimateParentCompany__c;
                            
                            mHeader.LubeBaseProduct__c = (mHeader.LubeBaseProduct__c != null)?mHeader.LubeBaseProduct__c: mAccount.LubeBaseProduct__c;
                            mHeader.LABIXProduct__c = (mHeader.LABIXProduct__c != null)?mHeader.LABIXProduct__c: mAccount.LABIXProduct__c;
                            mHeader.PetroleumAndComponentsProducts__c = (mHeader.PetroleumAndComponentsProducts__c != null)?mHeader.PetroleumAndComponentsProducts__c: mAccount.PetroleumAndComponentsProducts__c;
                            mHeader.CustomerProductIdentification__c = (mHeader.CustomerProductIdentification__c != null)?mHeader.CustomerProductIdentification__c: mAccount.CustomerProductIdentification__c;
                            mHeader.SupplierProductIdentification__c = (mHeader.SupplierProductIdentification__c != null)?mHeader.SupplierProductIdentification__c: mAccount.SupplierProductIdentification__c;
                            mHeader.CompanyPurchasingVolumnperGrade__c = (mHeader.CompanyPurchasingVolumnperGrade__c != null)?mHeader.CompanyPurchasingVolumnperGrade__c: mAccount.CompanyPurchasingVolumnperGrade__c;
                            mHeader.EstimatedMonthlyPurchaseUnit__c = (mHeader.EstimatedMonthlyPurchaseUnit__c != null)?mHeader.EstimatedMonthlyPurchaseUnit__c: mAccount.EstimatedMonthlyPurchaseUnit__c;
                            mHeader.StartTradingDate__c = (mHeader.StartTradingDate__c != null)?mHeader.StartTradingDate__c: mAccount.StartTradingDate__c;
                            mHeader.CustomerPurchaseProductFrom__c = (mHeader.CustomerPurchaseProductFrom__c != null)?mHeader.CustomerPurchaseProductFrom__c: mAccount.CustomerPurchaseProductFrom__c;
                            mHeader.CustomersFacilityTankAndStorage__c = (mHeader.CustomersFacilityTankAndStorage__c != null)?mHeader.CustomersFacilityTankAndStorage__c: mAccount.CustomersFacilityTankAndStorage__c;
                            mHeader.CustomersFacilityTransportation__c = (mHeader.CustomersFacilityTransportation__c != null)?mHeader.CustomersFacilityTransportation__c: mAccount.CustomersFacilityTransportation__c;
                            mHeader.SupplierSupplyProductTo__c = (mHeader.SupplierSupplyProductTo__c != null)?mHeader.SupplierSupplyProductTo__c: mAccount.SupplierSupplyProductTo__c;
                            mHeader.SuppliersFacilityTankAndStorage__c = (mHeader.SuppliersFacilityTankAndStorage__c != null)?mHeader.SuppliersFacilityTankAndStorage__c: mAccount.SuppliersFacilityTankAndStorage__c;
                            mHeader.SuppliersFacilityTransportation__c = (mHeader.SuppliersFacilityTransportation__c != null)?mHeader.SuppliersFacilityTransportation__c: mAccount.SuppliersFacilityTransportation__c;
                            mHeader.EnvironmentPolicy__c = (mHeader.EnvironmentPolicy__c != null)?mHeader.EnvironmentPolicy__c: mAccount.EnvironmentPolicy__c;
                            mHeader.SocialResponsibilityPolicy__c = (mHeader.SocialResponsibilityPolicy__c != null)?mHeader.SocialResponsibilityPolicy__c: mAccount.SocialResponsibilityPolicy__c;
                            mHeader.CorporateGovernancePolicy__c = (mHeader.CorporateGovernancePolicy__c != null)?mHeader.CorporateGovernancePolicy__c: mAccount.CorporateGovernancePolicy__c;
                            mHeader.OccupationalHealthAndSafetyPolicy__c = (mHeader.OccupationalHealthAndSafetyPolicy__c != null)?mHeader.OccupationalHealthAndSafetyPolicy__c: mAccount.OccupationalHealthAndSafetyPolicy__c;
                            mHeader.HumanRightsPolicy__c = (mHeader.HumanRightsPolicy__c != null)?mHeader.HumanRightsPolicy__c: mAccount.HumanRightsPolicy__c;
                            mHeader.HasIssuesDuringThePast5Years__c = (mHeader.HasIssuesDuringThePast5Years__c != null)?mHeader.HasIssuesDuringThePast5Years__c: mAccount.HasIssuesDuringThePast5Years__c;
                            mHeader.SpecifyIssuesDuringThePast5Years__c = (mHeader.SpecifyIssuesDuringThePast5Years__c != null)?mHeader.SpecifyIssuesDuringThePast5Years__c: mAccount.SpecifyIssuesDuringThePast5Years__c;
                            mHeader.PaymentOverTheAmountOfUSD__c = (mHeader.PaymentOverTheAmountOfUSD__c != null)?mHeader.PaymentOverTheAmountOfUSD__c: mAccount.PaymentOverTheAmountOfUSD__c;
                            mHeader.ReasonOfTheDefault__c = (mHeader.ReasonOfTheDefault__c != null)?mHeader.ReasonOfTheDefault__c: mAccount.ReasonOfTheDefault__c;
                            mHeader.HasFailedSupplyInLast3Years__c = (mHeader.HasFailedSupplyInLast3Years__c != null)?mHeader.HasFailedSupplyInLast3Years__c: mAccount.HasFailedSupplyInLast3Years__c;
                            mHeader.SpecifyFailedSupplyInLast3Years__c = (mHeader.SpecifyFailedSupplyInLast3Years__c != null)?mHeader.SpecifyFailedSupplyInLast3Years__c: mAccount.SpecifyFailedSupplyInLast3Years__c;
                            mHeader.HasSanctionedTarget__c = (mHeader.HasSanctionedTarget__c != null)?mHeader.HasSanctionedTarget__c: mAccount.HasSanctionedTarget__c;
                            mHeader.SpecifySanctionedTarget__c = (mHeader.SpecifySanctionedTarget__c != null)?mHeader.SpecifySanctionedTarget__c: mAccount.SpecifySanctionedTarget__c;
                            mHeader.CEOFirstName__c = (mHeader.CEOFirstName__c != null)?mHeader.CEOFirstName__c: mAccount.CEOFirstName__c;
                            mHeader.CEOLastName__c = (mHeader.CEOLastName__c != null)?mHeader.CEOLastName__c: mAccount.CEOLastName__c;
                            mHeader.ImmidiateParentCompany__c = (mHeader.ImmidiateParentCompany__c != null)?mHeader.ImmidiateParentCompany__c: mAccount.ImmidiateParentCompany__c;
                            mHeader.MainService__c = (mHeader.MainService__c != null)?mHeader.MainService__c: mAccount.MainService__c;
                            mHeader.OtherMainService__c = (mHeader.OtherMainService__c != null)?mHeader.OtherMainService__c: mAccount.OtherMainService__c;
                            mHeader.MainProduct__c = (mHeader.MainProduct__c != null)?mHeader.MainProduct__c: mAccount.MainProduct__c;
                            mHeader.OtherMainProduct__c = (mHeader.OtherMainProduct__c != null)?mHeader.OtherMainProduct__c: mAccount.OtherMainProduct__c;
                            mHeader.CompanyLatestCreditRating__c = (mHeader.CompanyLatestCreditRating__c != null)?mHeader.CompanyLatestCreditRating__c: mAccount.CompanyLatestCreditRating__c;

                            mHeader.TradingPartner__c = (mHeader.TradingPartner__c != null)?mHeader.TradingPartner__c: mAccount.TradingPartner__c;
                            mHeader.GroupKeyAccountKeyofBank__c = (mHeader.GroupKeyAccountKeyofBank__c != null)?mHeader.GroupKeyAccountKeyofBank__c: mAccount.GroupKeyAccountKeyofBank__c;
                            mHeader.AccountGroup__c = (mHeader.AccountGroup__c != null)?mHeader.AccountGroup__c: mAccount.AccountGroup__c;
                            mHeader.TransportationZone__c = (mHeader.TransportationZone__c != null)?mHeader.TransportationZone__c: mAccount.TransportationZone__c;
                            mHeader.RegionSAP__c = (mHeader.RegionSAP__c != null)?mHeader.RegionSAP__c: mAccount.RegionSAP__c;

                            mHeader.CustomerNameEN1__c = (mHeader.CustomerNameEN1__c != null)?mHeader.CustomerNameEN1__c: mAccount.CustomerNameEN1__c;
                            mHeader.CustomerNameEN2__c = (mHeader.CustomerNameEN2__c != null)?mHeader.CustomerNameEN2__c: mAccount.CustomerNameEN2__c;
                            mHeader.CustomerNameLocal1__c = (mHeader.CustomerNameLocal1__c != null)?mHeader.CustomerNameLocal1__c: mAccount.CustomerNameLocal1__c;
                            mHeader.CustomerNameLocal2__c = (mHeader.CustomerNameLocal2__c != null)?mHeader.CustomerNameLocal2__c: mAccount.CustomerNameLocal2__c;
                            
                            mHeader.Street2Local__c = (mHeader.Street2Local__c != null)?mHeader.Street2Local__c: mAccount.Street2Local__c;
                            mHeader.Street3Local__c = (mHeader.Street3Local__c != null)?mHeader.Street3Local__c: mAccount.Street3Local__c;
                            mHeader.Street4Local__c = (mHeader.Street4Local__c != null)?mHeader.Street4Local__c: mAccount.Street4Local__c;
                            mHeader.Street5Local__c = (mHeader.Street5Local__c != null)?mHeader.Street5Local__c: mAccount.Street5Local__c;
                            mHeader.StreetEN__c = (mHeader.StreetEN__c != null)?mHeader.StreetEN__c: mAccount.StreetEN__c;
                            mHeader.Street2EN__c = (mHeader.Street2EN__c != null)?mHeader.Street2EN__c: mAccount.Street2EN__c;
                            mHeader.Street3EN__c = (mHeader.Street3EN__c != null)?mHeader.Street3EN__c: mAccount.Street3EN__c;
                            mHeader.Street4EN__c = (mHeader.Street4EN__c != null)?mHeader.Street4EN__c: mAccount.Street4EN__c;
                            mHeader.Street5EN__c = (mHeader.Street5EN__c != null)?mHeader.Street5EN__c: mAccount.Street5EN__c;

                            
                            mHeader.DistrictENText__c = (mHeader.DistrictENText__c != null)?mHeader.DistrictENText__c: mAccount.DistrictENText__c;
                            //mHeader.SubDistrictENText__c = (mHeader.SubDistrictENText__c != null)?mHeader.SubDistrictENText__c: mAccount.SubDistrictENText__c;
                            mHeader.DistrictLocalText__c = (mHeader.DistrictLocalText__c != null)?mHeader.DistrictLocalText__c: mAccount.DistrictLocalText__c;
                            mHeader.SubDistrictLocalText__c = (mHeader.SubDistrictLocalText__c != null)?mHeader.SubDistrictLocalText__c: mAccount.SubDistrictLocalText__c;
                        
                            mHeader.TaxClassification__c = (mHeader.TaxClassification__c != null)?mHeader.TaxClassification__c: mAccount.TaxClassification__c;
                            
                            
                            //mHeader.RecordTypeId = (mHeader.RecordTypeId != null)?mHeader.RecordTypeId: mAccount.RecordTypeId;
                        }
                    }
                
                }
            }
        }
        catch(exception e)
        {
            System.debug('Error RequestHeaderHandler.prepopulateValueBeforeInsert line:'+e.getLineNumber()+' || Message:'+e.getmessage());
        }
    }
    
    public static void createShareholderAfterInsert(List<CTRRequestFormHeader__c> mHeaderList)
    {
        try
        {
            Set<Id> mCustomerSetId = new Set<Id>();
            List<CTRRequestFormHeader__c> mHeaderFilteredList = new List<CTRRequestFormHeader__c>();
            for(CTRRequestFormHeader__c mHeader: mHeaderList)
            {
                if(mHeader.RecordTypeName__c.contains('Edit') || mHeader.RecordTypeName__c.contains('Exten'))
                {
                    if(mHeader.Customer__c != null)
                    {
                        mCustomerSetId.add(mHeader.Customer__c);
                        mHeaderFilteredList.add(mHeader);
                    }
                }
            }
            if(mCustomerSetId.size()>0)
            {
                List<CTRShareholder__c> mShareholderNewList = new List<CTRShareholder__c>();
                List<CTRShareholder__c> mShareholderList = [SELECT Id, Name ,CTRRequestFormHeader__c,of_Shareholder__c, Customer__c 
                FROM CTRShareholder__c WHERE Customer__c IN: mCustomerSetId AND Status__c = 'Active'];
                if(mShareholderList.size()>0)
                {
                    for(CTRRequestFormHeader__c mHeader: mHeaderFilteredList)
                    {
                        for(CTRShareholder__c mShareHolder: mShareholderList)
                        {
                            if(mShareHolder.Customer__c == mHeader.Customer__c)
                            {
                                CTRShareholder__c mShareHolderNew = new CTRShareholder__c();
                                mShareHolderNew.Customer__c = mHeader.Customer__c;
                                mShareHolderNew.CTRRequestFormHeader__c = mHeader.Id;
                                mShareHolderNew.Name = mShareHolder.Name;
                                mShareHolderNew.of_Shareholder__c = mShareHolder.of_Shareholder__c;
                                mShareholderNewList.add(mShareHolderNew);
                            }
                        }
                    }
                    if(mShareholderNewList.size()>0)
                    {
                        insert mShareholderNewList;
                    }
                }
            }
        }
        catch(exception e)
        {
            System.debug('Error RequestHeaderHandler.createShareholderAfterInser line:'+e.getLineNumber()+' || Message:'+e.getmessage());
        }
    }

    public class ChangeFieldWrapper
    {
        public string Label {get;set;}
        public string Api {get;set;}
        public string Value{get;set;}
        public string Source{get;set;}
        public string Transform{get;set;}
        public string User{get;set;}

    }

    private static Boolean didFieldChange(Object v1, Object v2) 
    {
        Boolean mChange = false;
        if (v1 == null && v2 == null) 
        {
            mChange= false;
        }
        System.debug(v1 + ':' + v2);
        if (v1 != v2) 
        {
            mChange = true;
        }
        return mChange;
    }

    //modify id to name for any change data
    public static void AddJsonEditInfoBeforeUpdate(Map<Id,CTRRequestFormHeader__c> mHeaderOldMap, Map<Id,CTRRequestFormHeader__c> mHeaderNewMap)
    {
        try
        {
            Map<String, Schema.SObjectField> mRequestHeaderMap = Schema.getGlobalDescribe().get('CTRRequestFormHeader__c').getDescribe().fields.getMap();
            Map<Id,Map<String, ChangeFieldWrapper>> mChangeFieldMapWithId = new Map<Id,Map<String ,ChangeFieldWrapper>>();
            Set<String> mObjectNameList = new Set<String>();
            Set<Id> mAllIdSet = new Set<Id>();

            for(CTRRequestFormHeader__c mNewHeader: mHeaderNewMap.values())
            {
                if(mNewHeader.RecordTypeName__c.contains('Edit'))
                {
                    Map<String, ChangeFieldWrapper> mChangeFieldMap = new Map<String ,ChangeFieldWrapper>();

                    if(mNewHeader.InternalEditField__c == mHeaderOldMap.get(mNewHeader.Id).InternalEditField__c)
                    {
                        SObject mObj1 = mHeaderOldMap.get(mNewHeader.Id);
                        SObject mObj2 = mHeaderNewMap.get(mNewHeader.Id);
                        for (Schema.sObjectField mField : mRequestHeaderMap.values()) 
                        {
                            Object mDataV1 = mObj1.get(mField);
                            Object mDataV2 = mObj2.get(mField);
                            if (didFieldChange(mDataV1, mDataV2)) 
                            {
                                Schema.DescribeFieldResult mFieldResult = mField.getDescribe();
                                ChangeFieldWrapper mChangeFieldWrapper = new ChangeFieldWrapper();
                                mChangeFieldWrapper.Label = String.valueOf(mFieldResult.getLabel());
                                mChangeFieldWrapper.Api = String.valueOf(mField);
                                mChangeFieldWrapper.Value = (mDataV2 != null)?String.valueOf(mDataV2):'';
                                mChangeFieldWrapper.User ='';
                                mChangeFieldMap.put(String.valueOf(mField),mChangeFieldWrapper);

                                String objectName = 'CTRRequestFormHeader__c';
                                String fieldName =  String.valueOf(mField);

                                Schema.DisplayType mFieldDataType;
                                String mDataType = 'STRING';
                                if(!Test.isRunningTest())
                                {
                                    mFieldDataType = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap().get(fieldName).getDescribe().getType(); 
                                    mDataType = String.valueOf(mFieldDataType);
                                }
                                System.debug('mDataType: '+mDataType);
                                
                                if(mDataType == 'REFERENCE' && mDataV2 != null)
                                {
                                    String mNewValue = String.valueOf(mDataV2);
                                    System.debug('mNewValue: '+mNewValue);
                                    if (mNewValue instanceOf Id) 
                                    {
                                        System.debug('valid id');
                                        Id mId = (Id)mNewValue;
                                        mAllIdSet.add(mId);
                                        System.debug('mId:'+mId);

                                        System.debug('mNewValue:'+mNewValue);
                                        String mObjectName = mId.getSObjectType().getDescribe().getName();
                                        System.debug('mObjectName'+mObjectName);
                                        mObjectNameList.add(mObjectName);
                                    }
                                }
                            }
                        }
                    }
                        if(mNewHeader.InternalEditField__c !=null)
                        {
                            List<Object> mFieldList = (List<Object>)JSON.deserializeUntyped(mNewHeader.InternalEditField__c);
                            
                            for(Object mFieldData : mFieldList)
                            {    
                                Map<String,Object> mField = (Map<String,Object>)mFieldData;
                                String mSource = (String.isNotBlank((String)mField.get('Source')))?(String)mField.get('Source'):'';
                                String mLabel = (String)mField.get('Label');
                                String mValue = (String)mField.get('Value');
                                String mApi = (String)mField.get('Api');
                                String mUser = (String.isNotBlank((String)mField.get('User')))?(String)mField.get('User'):'';

                                ChangeFieldWrapper mChangeFieldWrapper = new ChangeFieldWrapper();
                                    mChangeFieldWrapper.Label = mLabel;
                                    mChangeFieldWrapper.Api = mApi;
                                    mChangeFieldWrapper.Value = mValue;
                                    mChangeFieldWrapper.Source = mSource;
                                    mChangeFieldWrapper.User =mUser;
                                    if(mChangeFieldWrapper.Api != null)
                                    {
                                        ChangeFieldWrapper mNewFieldChanged = mChangeFieldMap.get(mChangeFieldWrapper.Api);
                                        if(mNewFieldChanged != null)
                                        {
                                            mNewFieldChanged.Label = mChangeFieldWrapper.Label;
                                            mNewFieldChanged.Source = mChangeFieldWrapper.Source;
                                        }
                                        else
                                        {
                                            mChangeFieldMap.put(mChangeFieldWrapper.Api,mChangeFieldWrapper);
                                        }
                                    }

                                String objectName = 'CTRRequestFormHeader__c';
                                String fieldName =  mApi;

                                Schema.DisplayType mFieldDataType;
                                String mDataType = 'REFERENCE';
                                if(!Test.isRunningTest())
                                {
                                    mFieldDataType = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap().get(fieldName).getDescribe().getType(); 
                                    mDataType = String.valueOf(mFieldDataType);
                                }
                                
                                if(mDataType == 'REFERENCE' && mValue != null)
                                {
                                    String mNewValue = String.valueOf(mValue);
                                    if (mNewValue instanceOf Id) 
                                    {
                                        Id mId = (Id)mNewValue;
                                        mAllIdSet.add(mId);

                                        String mObjectName = mId.getSObjectType().getDescribe().getName();
                                        mObjectNameList.add(mObjectName);
                                    }
                                }
                            }
                        }
                        if(mChangeFieldMap.size()>0)
                        {
                            mChangeFieldMapWithId.put(mNewHeader.Id, mChangeFieldMap);
                        }
                }
            }
            if(mChangeFieldMapWithId.size()>0)
            {
                Map<String, Map<Id, sObject>> mObjMap = new Map<String, Map<Id, sObject>>();
                if(mObjectNameList.size()>0 && mAllIdSet.size()>0)
                {
                    for(String mObjectName: mObjectNameList)
                    {
                        String mQuery = 'SELECT ID, Name';
                        if(mObjectName == 'Master_Map__c')
                        {
                            mQuery+= ', Code__c, Description__c';
                        }
                        mQuery+= ' FROM '+mObjectName;
                        mQuery+= ' WHERE Id IN: mAllIdSet';
                        Map<Id, sObject> sObjectMap = new Map<Id, sObject>((List<sObject>)Database.query(mQuery));
                        mObjMap.put(mObjectName, sObjectMap);
                    }
                }
                //Map<Id,Map<String, ChangeFieldWrapper>> mChangeFieldMapWithId = new Map<Id,Map<String ,ChangeFieldWrapper>>();
                for(CTRRequestFormHeader__c mNewHeader: mHeaderNewMap.values())
                {
                    Map<String, ChangeFieldWrapper> mChangedFieldMap = mChangeFieldMapWithId.get(mNewHeader.Id);
                    if(mChangedFieldMap.size()>0 || mChangedFieldMap != null)
                    {
                            // if(mNewHeader.InternalEditField__c !=null)
                            // {
                            //     List<Object> mFieldList = (List<Object>)JSON.deserializeUntyped(mNewHeader.InternalEditField__c);
                                
                            //     for(Object mFieldData : mFieldList)
                            //     {    
                            //         Map<String,Object> mField = (Map<String,Object>)mFieldData;
                            //         String mSource = (String)mField.get('Source');
                            //         String mLabel = (String)mField.get('Label');
                            //         String mValue = (String)mField.get('Value');
                            //         String mApi = (String)mField.get('Api');

                            //         ChangeFieldWrapper mChangeFieldWrapper = new ChangeFieldWrapper();
                            //         mChangeFieldWrapper.Label = mLabel;
                            //         mChangeFieldWrapper.Api = mApi;
                            //         mChangeFieldWrapper.Value = mValue;
                            //         mChangeFieldWrapper.Source = mSource;

                            //         if(mChangeFieldWrapper.Api != null)
                            //         {
                            //             ChangeFieldWrapper mNewFieldChanged = mChangedFieldMap.get(mChangeFieldWrapper.Api);
                            //             if(mNewFieldChanged != null)
                            //             {
                            //                 mNewFieldChanged.Label = mChangeFieldWrapper.Label;
                            //                 mNewFieldChanged.Source = mChangeFieldWrapper.Source;
                            //             }
                            //             else
                            //             {
                            //                 mChangedFieldMap.put(mChangeFieldWrapper.Label,mChangeFieldWrapper);
                            //             }
                            //         }
                            //     }
                            // }

                            List<ChangeFieldWrapper> mChangeFieldList = mChangedFieldMap.values();

                            if(mObjMap.size()>0 && mChangeFieldList.size()>0)
                            {
                                for(ChangeFieldWrapper mHeaderEdit: mChangeFieldList)
                                {
                                    if(mHeaderEdit.Value instanceOf Id)
                                    {
                                        Id mId = (Id)mHeaderEdit.Value;
                                        String mObjectName = mId.getSObjectType().getDescribe().getName();
                                        System.debug('mId:'+mId);
                                        System.debug('mObjectName:'+mObjectName);
                                        System.debug('mHeaderEdit.Value:'+mHeaderEdit.Value);

                                        Map<Id, sObject> mObjMapHeader = mObjMap.get(mObjectName);
                                        if(mObjMapHeader.size()>0)
                                        {
                                            System.debug('mApi:'+mHeaderEdit.Api);
                                            sObject mChangeObj = mObjMapHeader.get(mHeaderEdit.Value);
                                            System.debug('Header mChangeObj:'+mChangeObj);
                                            if(mChangeObj != null)
                                            {
                                                if(mObjectName == 'Master_Map__c')
                                                {
                                                    if(mHeaderEdit.Api == 'CityStateLocal__c')
                                                    {
                                                        mHeaderEdit.Value = (mChangeObj.get('Description__c') != null)?(String)mChangeObj.get('SearchTerm3__c'): '';
                                                    }
                                                    else if(mHeaderEdit.Api == 'CityStateEN__c')
                                                    {
                                                        mHeaderEdit.Value = (mChangeObj.get('Name') != null)?(String)mChangeObj.get('Description__c'): '';
                                                    }
                                                    else
                                                    {
                                                        mHeaderEdit.Value = (mChangeObj.get('Code__c') != null)?(String)mChangeObj.get('Code__c'): '';
                                                    }
                                                    
                                                }
                                                else
                                                {
                                                    mHeaderEdit.Value = (mChangeObj.get('Name') != null)?(String)mChangeObj.get('Name'): '';
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            
                                String jsonStr = JSON.serialize(mChangeFieldList);
                                jsonStr = jsonStr.replace('null', '""');
                                mNewHeader.InternalEditField__c= jsonStr;
                                System.debug('jsonStr'+jsonStr);
                    }

                }

            }
        }
        catch(exception e)
        {
            System.debug('Error testedt v2 line:'+e.getLineNumber()+' || Message:'+e.getmessage());

        }
    }

        //json change modify id to name
        public static void modifyJsonIdToNameBeforeUpdatev2(Map<Id,CTRRequestFormHeader__c> mHeaderOldMap, Map<Id,CTRRequestFormHeader__c> mHeaderNewMap)
        {
            try
            {
                Map<String, String> mChangeDataJsonMap = new Map<String, String>();
                for(CTRRequestFormHeader__c mNewHeader: mHeaderNewMap.values())
                {
                    if(mNewHeader.InternalEditField__c != mHeaderOldMap.get(mNewHeader.Id).InternalEditField__c)
                    {
                        mChangeDataJsonMap.put(mNewHeader.Id, mNewHeader.InternalEditField__c);
                    }
                }
                if(mChangeDataJsonMap.size()>0)
                {
                    Map<String, String> mConvertedLabelJsonMap = CTRRequestEditLogFieldController.modifyChangeDataJsonIdToLabel(mChangeDataJsonMap, 'CTRRequestFormHeader__c');
                    for(CTRRequestFormHeader__c mNewHeader: mHeaderNewMap.values())
                    {
                        String mResultDataChange = mConvertedLabelJsonMap.get(mNewHeader.Id);
                        if(String.isNotBlank(mResultDataChange))
                        {
                            mNewHeader.InternalEditField__c = mResultDataChange;
                        }
                    }
                }
            }
            catch(exception e)
            {
                System.debug('Error modifyJsonIdToNameBeforeUpdatev2  line:'+e.getLineNumber()+' || Message:'+e.getmessage());
    
            }
        }
}