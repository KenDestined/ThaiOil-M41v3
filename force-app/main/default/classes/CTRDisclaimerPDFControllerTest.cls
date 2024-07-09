@isTest
public with sharing class CTRDisclaimerPDFControllerTest {
    
    
    @isTest
    public static void testRenderPage(){
        Master_Map__c masterMap = new Master_Map__c();
        masterMap.Code__c ='TH';
        masterMap.Type__c = 'Country';
        insert masterMap;
        
		Account newAcc = new Account();
        newAcc.Name = 'Test Acc';
        newAcc.AccountNumber = '0001';
        newAcc.AccountNumber__c = '0001';
        newAcc.CompanyNameENF__c = 'Test Acc';
        insert newAcc;
        
        CTRRequestFormHeader__c reqFormHeader = new CTRRequestFormHeader__c();
        reqFormHeader.Name ='Test Header';
        // reqFormHeader.CountryCode__c = 'TH';
        reqFormHeader.Country__c = masterMap.Id; //TH
        reqFormHeader.Customer__c = newAcc.id;
        reqFormHeader.CEOFirstName__c = 'FName';
        reqFormHeader.CEOLastName__c = 'LName';
        insert reqFormHeader;

        CTRRequestFormItem__c  reqFormItem = new CTRRequestFormItem__c();
        reqFormItem.Name ='Test';
        reqFormItem.CTRRequestFormHeader__c = reqFormHeader.Id;
        insert reqFormItem;

        PageReference pageRef = Page.CTRDisclaimerPDF;

        Test.setCurrentPage(pageRef);


        ApexPages.currentPage().getParameters().put('selectedLanguage', 'eng');
        ApexPages.currentPage().getParameters().put('recordId',reqFormItem.id);

        CTRDisclaimerPDFController ctr = new CTRDisclaimerPDFController();
        ctr.renderPage();
    }
}