@isTest
public with sharing class CTRRequestShipToControllerTest {
    
    @isTest
    public static void testGetActorUserMap(){
        Map<String, User> results = CTRRequestShipToController.getActorUserMap('TXTH','Domestic');
        System.assertNotEquals(null, results);
    }

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

        C360_Relationship__c r1 = new C360_Relationship__c();
        r1.Account__c = acc.id ;
        r1.ReverseAccount__c = acc.id ;
        r1.RelationshipType__c = 'WE';
        insert r1;

        Id customerRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'TxCustomer' LIMIT 1].Id;
        Id CustomerEditInfoRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'CustomerEditInfo' LIMIT 1].Id;
        
        List<CTRRequestShipToController.RequestWrapper> results = CTRRequestShipToController.onloadCreatePage(acc.Id, customerRecordTypeId,'TSV');
        List<CTRRequestShipToController.RequestWrapper> results2 = CTRRequestShipToController.onloadCreatePage(acc.Id, CustomerEditInfoRecordTypeId,'TSV');
        System.assertNotEquals(0, results.size());
        System.assertNotEquals(0, results2.size());
    }

    @isTest
    public static void testSaveRequestShipTo(){
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
        
        Id recordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'ShipToCreate' LIMIT 1].Id;
        Id editRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'SupplierEditInfo' LIMIT 1].Id;

        CTRRequestShipToController.RequestWrapper request = new CTRRequestShipToController.RequestWrapper();
        request.mRecordId = isa.Id;
        request.mAccountId = acc.Id;

        CTRRequestShipToController.RequestWrapper request2 = new CTRRequestShipToController.RequestWrapper();
        request2.mRecordId = purchasingView.Id;

        Map<String,Object> jsonData = new Map<String,Object>();
        jsonData.put('BlockedReason__c', 'reason');
        jsonData.put('OrderBlock__c', 'order');
        jsonData.put('UnderdeliveryTolerance__c', '10.5');
        jsonData.put('OverdeliveryTolerance__c', '10.5');

        String formData = JSON.serialize(jsonData);

        Profile testProfile = [SELECT Id FROM Profile WHERE Name = 'Standard User' LIMIT 1];
        User testUser1 = new User(
            FirstName = 'Test',
            LastName = 'User 1',
            Email = 'testuser1@example.test',
            Username = 'testuser1@example.test',
            ProfileId = testProfile.Id,
            Alias = 'tuser1',
            CommunityNickname = 'testuser1',
            TimeZoneSidKey = 'Asia/Bangkok',
            LocaleSidKey = 'en_US',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US'
        );
        insert testUser1;

        CTRRequestFormHeader__c reqHeader = new CTRRequestFormHeader__c();
        reqHeader.Name = 'Test Header';
        insert reqHeader;
        
        RecordType rt = [SELECT id FROM RecordType WHERE SobjectType = 'CTRRequestFormItem__c' AND DeveloperName = 'ShipToEdit' limit 1];
        CTRRequestFormItem__c reqItem = new CTRRequestFormItem__c();
        reqItem.Name = 'TestConditionTrue Item';
        reqItem.CTRRequestFormHeader__c = reqHeader.Id;
        reqItem.RecordTypeId = rt.Id;
        reqItem.EmailTo__c = 'testemailto@test.com';
        reqItem.EmailCC__c = 'testemailcc@test.com';
        reqItem.CommitteeOwner__c = testUser1.Id;
        insert reqItem;

        CTRRequestShipToController.ResponseWrapper results = CTRRequestShipToController.saveRequestShipTo(reqItem.Id, formData, acc.Id, recordTypeId, request);
        CTRRequestShipToController.ResponseWrapper results2 = CTRRequestShipToController.saveRequestShipTo(null, formData, acc.Id, recordTypeId, request);
        CTRRequestShipToController.ResponseWrapper results3 = CTRRequestShipToController.saveRequestShipTo(reqItem.Id, formData, acc.Id, recordTypeId, null);
    }
}