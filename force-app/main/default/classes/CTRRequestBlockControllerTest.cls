@isTest
public with sharing class CTRRequestBlockControllerTest {
   
    @isTest
    public static void testOnloadCreatePage(){
        Account acc = new Account();
        acc.Name = 'test';
        acc.AccountNumber__c = '12345';
        insert acc;

        C360_SalesArea__c  isa =  new C360_SalesArea__c();
        isa.AccountNumber__c = acc.id;
        isa.SalesOrganization__c = '9100';
        insert isa;

        CTRPurchasingView__c  purchasingView = new CTRPurchasingView__c (
            BlockStatus__c = 'FALSE',
            PurchasingDocDate__c = Date.today().addYears(-2).addDays(-100),
            Account__c = acc.Id,
            PurchasingOrg__c = 'A000'
        );
        insert purchasingView;

        Id customerRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'TxCustomer' LIMIT 1].Id;
        Id supplierRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'TxSupplier' LIMIT 1].Id;
        
        List<CTRRequestBlockController.RequestWrapper> results = CTRRequestBlockController.onloadCreatePage(acc.Id, customerRecordTypeId);
        List<CTRRequestBlockController.RequestWrapper> results2 = CTRRequestBlockController.onloadCreatePage(acc.Id, supplierRecordTypeId);
        System.assertNotEquals(0, results.size());
        System.assertNotEquals(0, results2.size());
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

        CTRPurchasingView__c  purchasingView = new CTRPurchasingView__c (
            BlockStatus__c = 'FALSE',
            PurchasingDocDate__c = Date.today().addYears(-2).addDays(-100),
            Account__c = acc.Id,
            PurchasingOrg__c = 'A000'
        );
        insert purchasingView;

        Id recordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'CustomerEditInfo' LIMIT 1].Id;
        Id editRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'SupplierEditInfo' LIMIT 1].Id;

        CTRRequestBlockController.RequestWrapper request = new CTRRequestBlockController.RequestWrapper();
        request.mRecordId = isa.Id;

        CTRRequestBlockController.RequestWrapper request2 = new CTRRequestBlockController.RequestWrapper();
        request2.mRecordId = purchasingView.Id;

        Map<String,Object> jsonData = new Map<String,Object>();
        jsonData.put('BlockedReason__c', 'reason');
        jsonData.put('OrderBlock__c', 'order');

        String formData = JSON.serialize(jsonData);

        CTRRequestBlockController.ResponseWrapper results = CTRRequestBlockController.onCreateRequest(formData, acc.Id, recordTypeId, request);
        CTRRequestBlockController.ResponseWrapper results2 = CTRRequestBlockController.onCreateRequest(formData, acc.Id, editRecordTypeId, request2);
        CTRRequestBlockController.ResponseWrapper results3 = CTRRequestBlockController.onCreateRequest(formData, acc.Id, recordTypeId, null);
        System.assertNotEquals(null, results);
        System.assertNotEquals(null, results2);
        System.assertNotEquals(null, results3);
    }
}