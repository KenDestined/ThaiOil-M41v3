public class CTRDisclaimerPDFController {
        public String recordId {get; set;}
        public String selectedLanguage {get; set;}
        public String formattedDateTime {get; set;}
        public String formattedIncorporationDate { get; set; }
        public Boolean IsCustomer {get; set;}
        public List<CTRShareholder__c> shareholderList {get; set;}
        public List<CTRShippingCountry__c> spList {get; set;}
        public CTRRequestFormItem__c requestItem {get; set;}
        public CTRRequestFormHeader__c accountObj {get; set;}
        
        public CTRDisclaimerPDFController() {
                renderPage();
        }
    
        public void renderPage() {
        //    requestdate = string.valueof(Datetime.now().format('dd/MM/YYYY'));
           selectedLanguage = apexpages.currentpage().getparameters().get('selectedLanguage');
           recordId = apexpages.currentpage().getparameters().get('recordId');
           String fileName = 'Disclaimer.pdf';
           Apexpages.currentPage().getHeaders().put('content-disposition', 'inline; filename='+fileName);

           Datetime now = Datetime.now();
           formattedDateTime = now.format('dd-MMM-yyyy HH:mm:ss');
           
           if(recordId != null) {
                getInitialData(recordId);
           }
           
        }

        public void getInitialData(String recordId){
                try 
                {
                        System.debug('Record id = '+recordId);
                        requestItem = [SELECT Id, Name, CTRRequestFormHeader__c, Customer__c, ProductName__c, CustomerProductIdentification__c, SupplierProductIdentification__c, RecordType.DeveloperName
                                        FROM CTRRequestFormItem__c WHERE Id =: recordId];

                        accountObj = [SELECT Id, Name, CompanyNameENF__c, CompanyNameLocal__c, SpecifyLanguagesOfCompanyName__c, FormerNameofCompany__c, Country__c, Country__r.Code__c, 
                                        Country__r.Description__c, CustomerType__c, SupplierType__c, TypeOfBusinessCommercialEvaluation__c, TypeOfBusinessOthers__c, LegalEntity__c, LegalEntityOthers__c, IncoperationDate__c, 
                                        YearsofExperience__c, TaxCode1__c, CompanyWebsite__c, CEOFirstName__c, CEOLastName__c, ImmidiateParentCompany__c, BuildingCodeLocal__c, RoomLocal__c, FloorLocal__c, 
                                        HousenoLocal__c, StreetLocal__c, SubDistrictLocalText__c, DistrictLocalText__c, PostalCodeLocalText__c, LocationInGoogleMapsLinks__c, LocationInGoogleMapsGeolocation__Latitude__s,
                                        LocationInGoogleMapsGeolocation__Longitude__s, CityStateLocal__r.SearchTerm3__c, CityStateLocal__r.Description__c, CityStateLocal__r.Name, ContactSalutation__c, Nickname__c, FirstName__c,
                                        LastName__c, Position__c, Email__c, Language__c, PhoneCountryCode__c, Phone__c, FaxCountryCode__c, Fax__c, EstimatedMonthlyPurchaseUnit__c, CustomersFacilityTankAndStorage__c,
                                        CustomersFacilityTransportation__c, SupplierSupplyProductTo__c, SuppliersFacilityTankAndStorage__c, SuppliersFacilityTransportation__c, MainService__c, OtherMainService__c,
                                        MainProduct__c, OtherMainProduct__c, CompanyLatestCreditRating__c, EnvironmentPolicy__c, SocialResponsibilityPolicy__c, CorporateGovernancePolicy__c, OccupationalHealthAndSafetyPolicy__c,
                                        HumanRightsPolicy__c, HasIssuesDuringThePast5Years__c, PaymentOverTheAmountOfUSD__c, HasFailedSupplyInLast3Years__c, HasSanctionedTarget__c, StreetEN__c, SameRegisteredAddress__c, CoName__c,CompanyPurchasingVolumnperGrade__c, 
                                        MobileCountryCode__c, MobilePhone__c, CustomerPurchaseProductFrom__c, PhoneExtension__c, FaxExtension__c, toLabel(Language__c) LanguageLabel, toLabel(SpecifyLanguagesOfCompanyName__c) SpecifyLanguagesLabel
                                        FROM CTRRequestFormHeader__c WHERE Id =: requestItem.CTRRequestFormHeader__c];
                        
                                if(accountObj.IncoperationDate__c != null) {
                                        DateTime incorporationDateTime = DateTime.newInstance(accountObj.IncoperationDate__c.year(), accountObj.IncoperationDate__c.month(), accountObj.IncoperationDate__c.day());
                                        formattedIncorporationDate = incorporationDateTime.format('dd/MM/yyyy');
                                }

                                accountObj.Language__c = accountObj.Language__c + ' : ' + accountObj.get('LanguageLabel');
                                accountObj.SpecifyLanguagesOfCompanyName__c = (String) accountObj.get('SpecifyLanguagesLabel');

                                IsCustomer = requestItem.RecordType.DeveloperName.contains('Customer');

                        shareholderList = [SELECT Name,of_Shareholder__c FROM CTRShareholder__c WHERE CTRRequestFormHeader__c =: requestItem.CTRRequestFormHeader__c];
                        System.debug(shareholderList);

                        spList = [SELECT ShippingCountry__c,LocationType__c FROM CTRShippingCountry__c WHERE CTRRequestFormItem__c =: recordId];
                        System.debug(spList);
                }
                catch(Exception e)
                {
                    System.debug('CTRDisclaimerPDFController---'+e.getmessage()+' line:'+e.getLineNumber());
                }
        }
        
        
}