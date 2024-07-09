@isTest
public with sharing class CTRRequestChangeCreditCondControllerTest {
    
    @isTest
    public static void testOnloadCreatePage(){
        Account acc = new Account();
        acc.Name = 'test';
        acc.AccountNumber__c = '12345';
        insert acc;

        C360_FinancialInfo__c o1 = new C360_FinancialInfo__c();
        o1.CompanyCode__c = '1100';
        o1.CompanyName__c = acc.id;
        o1.Outstanding__c = 100;
        o1.CreditLimit__c = 10;
        o1.notified__c = false;
        o1.Key__c = 'o1';
        insert o1;

        C360_FinancialInfo__c o2 = new C360_FinancialInfo__c();
        o2.CompanyCode__c = '9100';
        o2.CompanyName__c = acc.id;
        o2.Outstanding__c = 100;
        o2.CreditLimit__c = 10;
        o2.notified__c = false;
        o2.Key__c = 'o2';
        insert o2;
        
        Id customerRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'TxCustomer' LIMIT 1].Id;

        List<CTRRequestChangeCreditCondController.RequestWrapper> results = CTRRequestChangeCreditCondController.onloadCreatePage(acc.Id,'TOP',customerRecordTypeId);
        results = CTRRequestChangeCreditCondController.onloadCreatePage(acc.Id,'TPX',customerRecordTypeId);
        results = CTRRequestChangeCreditCondController.onloadCreatePage(acc.Id,'TLB',customerRecordTypeId);
        results = CTRRequestChangeCreditCondController.onloadCreatePage(acc.Id,'LABIX',customerRecordTypeId);
        results = CTRRequestChangeCreditCondController.onloadCreatePage(acc.Id,'TXTH',customerRecordTypeId);
        results = CTRRequestChangeCreditCondController.onloadCreatePage(acc.Id,'TSR',customerRecordTypeId);
        results = CTRRequestChangeCreditCondController.onloadCreatePage(acc.Id,'JSKem',customerRecordTypeId);
        results = CTRRequestChangeCreditCondController.onloadCreatePage(acc.Id,'TXINDIA',customerRecordTypeId);
    }

    @isTest
    public static void testOnCreateRequest(){
        Account acc = new Account();
        acc.Name = 'test';
        acc.AccountNumber__c = '12345';
        insert acc;

        C360_SalesArea__c  isa =  new C360_SalesArea__c();
        isa.AccountNumber__c = acc.id;
        isa.SalesOrganization__c = '9100';
        insert isa;
        
        CTRRequestFormHeader__c reqHeader = new CTRRequestFormHeader__c();
        reqHeader.Name = 'Test Header';
        insert reqHeader;

        RecordType rt = [SELECT id FROM RecordType WHERE SobjectType = 'CTRRequestFormItem__c' AND DeveloperName = 'CustomerExtend' limit 1];
        CTRRequestFormItem__c reqItem = new CTRRequestFormItem__c();
        reqItem.Name = 'TestConditionTrue Item';
        reqItem.CTRRequestFormHeader__c = reqHeader.Id;
        reqItem.RecordTypeId = rt.Id;
        reqItem.EmailTo__c = 'testemailto@test.com';
        reqItem.EmailCC__c = 'testemailcc@test.com';
        reqItem.Customer__c = acc.Id;
        reqItem.SalesOrganization__c = '9100';
        reqItem.SAPNumber__c = 'test';
        reqItem.DistributionChannel__c = '10';
        reqItem.Division__c = '00';
        reqItem.CreditControlArea__c = '1300';
        insert reqItem;

        CTRPurchasingView__c  purchasingView = new CTRPurchasingView__c (
            BlockStatus__c = 'FALSE',
            PurchasingDocDate__c = Date.today().addYears(-2).addDays(-100),
            Account__c = acc.Id,
            PurchasingOrg__c = 'A000'
        );
        insert purchasingView;

        
        C360_FinancialInfo__c o1 = new C360_FinancialInfo__c();
        o1.CompanyCode__c = '1100';
        o1.CompanyName__c = acc.id;
        o1.Outstanding__c = 100;
        o1.CreditLimit__c = 10;
        o1.notified__c = false;
        o1.Key__c = 'o1';
        insert o1;

        C360_FinancialInfo__c o2 = new C360_FinancialInfo__c();
        o2.CompanyCode__c = '9100';
        o2.CompanyName__c = acc.id;
        o2.Outstanding__c = 100;
        o2.CreditLimit__c = 10;
        o2.notified__c = false;
        o2.Key__c = 'o2';
        insert o2;

        Id recordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'CustomerEditInfo' LIMIT 1].Id;
        Id editRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'SupplierEditInfo' LIMIT 1].Id;

        C360_FinancialInfo__c financialInfo = [SELECT ID FROM C360_FinancialInfo__c LIMIT 1];

        CTRRequestChangeCreditCondController.RequestWrapper request = new CTRRequestChangeCreditCondController.RequestWrapper();
        request.mSalesOrg = '9100';
        request.mCreditControlArea = '1300';
        request.mRecordId = financialInfo.Id;

        Map<String,Object> jsonData = new Map<String,Object>();
        jsonData.put('BlockedReason__c', 'reason');
        jsonData.put('OrderBlock__c', 'order');

        String formData = JSON.serialize(jsonData);

        CTRRequestChangeCreditCondController.ResponseWrapper results = CTRRequestChangeCreditCondController.createRequest(acc.Id,'TX', recordTypeId, request);
        CTRRequestChangeCreditCondController.ResponseWrapper results2 = CTRRequestChangeCreditCondController.createRequest(acc.Id,'TOP', recordTypeId, request);
        System.assertNotEquals(null, results);
        System.assertNotEquals(null, results2);
    }
}