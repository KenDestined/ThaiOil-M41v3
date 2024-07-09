public class CTRCustomerMasterFormController {

    public String recordId {get; set;}
    public String RecordType {get; set;}
    public CTRRequestFormItem__c requestItem {get; set;}

    public CTRCustomerMasterFormController() {
        renderPage();

    }

    public void renderPage() {
        recordId = apexpages.currentpage().getparameters().get('recordId');

        if(recordId != null) {
            getInitialData(recordId);
       }
    }

    public void getInitialData(String recordId){
        try 
        {
            System.debug('Record id = '+recordId);
            requestItem = [SELECT Id, Name, CTRRequestFormHeader__c, RecordTypeName__c, RecordType.DeveloperName, SubBU__c, Customer__r.AccountNumber__c, Customer__r.SupplierNumber__c,
                            CTRRequestFormHeader__r.AccountGroup__c, CTRRequestFormHeader__r.CustomerNameLocal1__c, CTRRequestFormHeader__r.CustomerNameLocal2__c, CTRRequestFormHeader__r.CustomerSearchTermLocal__c, 
                            CTRRequestFormHeader__r.PostalCodeLocalText__c, CTRRequestFormHeader__r.Street2Local__c, CTRRequestFormHeader__r.Street3Local__c, CTRRequestFormHeader__r.StreetLocal__c, 
                            CTRRequestFormHeader__r.Street4Local__c, CTRRequestFormHeader__r.Street5Local__c, CTRRequestFormHeader__r.DistrictLocalText__c, CTRRequestFormHeader__r.CityStateLocal__r.SearchTerm3__c, 
                            CTRRequestFormHeader__r.Country__r.Code__c, CTRRequestFormHeader__r.CustomerNameEN1__c, CTRRequestFormHeader__r.CustomerNameEN2__c, CTRRequestFormHeader__r.CustomerSearchTermEN__c,
                            CTRRequestFormHeader__r.Street2EN__c, CTRRequestFormHeader__r.Street3EN__c, CTRRequestFormHeader__r.StreetEN__c, CTRRequestFormHeader__r.Street4EN__c, CTRRequestFormHeader__r.Street5EN__c,
                            CTRRequestFormHeader__r.DistrictENText__c, CTRRequestFormHeader__r.CityStateLocal__r.Description__c, CTRRequestFormHeader__r.Phone__c, CTRRequestFormHeader__r.PhoneExtension__c,
                            CTRRequestFormHeader__r.Fax__c, CTRRequestFormHeader__r.FaxCountryCode__c, CTRRequestFormHeader__r.TradingPartner__r.Code__c, CTRRequestFormHeader__r.TaxCode1__c, CTRRequestFormHeader__r.HousenoLocal__c,
                            ReconAccount__c, CashManagementGroup__c, SalesOrganization__c, DistributionChannel__c, PriceGroup__c, AccountAssignmentGroup__c, TaxClassification__c,
                            CustPriceProc__c, Incoterms__c, CreditControlArea__c, RiskCategory__c, TermOfPayment__r.Code__c, CTRRequestFormHeader__r.Language__c, CTRRequestFormHeader__r.FaxExtension__c,
                            CTRRequestFormHeader__r.Email__c, CTRRequestFormHeader__r.TransportationZone__r.Code__c, CTRRequestFormHeader__r.TypeOfBusinessBranch__c, TermOfPayment__r.Name, AccigClerk__c
                           FROM CTRRequestFormItem__c WHERE Id =: recordId];
        }
        catch(Exception e)
        {
            System.debug('CTRCustomerMasterFormController---'+e.getmessage()+' line:'+e.getLineNumber());
        }
}
}