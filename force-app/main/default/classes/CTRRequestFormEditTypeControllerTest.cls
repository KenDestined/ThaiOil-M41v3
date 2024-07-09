@isTest
public with sharing class CTRRequestFormEditTypeControllerTest {
    
    @isTest
    public static void testOnloadCreatePage(){
        Account acc = new Account();
        acc.Name = 'test';
        acc.AccountNumber__c = '12345';
        insert acc;

        Account acc2 = new Account();
        acc2.Name = 'test2';
        acc2.AccountNumber__c = '123456';
        insert acc2;

        C360_SalesArea__c  isa =  new C360_SalesArea__c();
        isa.AccountNumber__c = acc.id;
        isa.SalesOrganization__c = '1100';
        isa.Key__c = 'test11001000';
        insert isa;

        C360_SalesArea__c  isa2 =  new C360_SalesArea__c();
        isa2.AccountNumber__c = acc2.id;
        isa2.SalesOrganization__c = '1100';
        isa2.Key__c = 'test11001000';
        insert isa2;

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
        
        RecordType rt = [SELECT id FROM RecordType WHERE SobjectType = 'CTRRequestFormItem__c' AND DeveloperName = 'CustomerExtend' limit 1];
        CTRRequestFormItem__c reqItem = new CTRRequestFormItem__c();
        reqItem.Name = 'TestConditionTrue Item';
        reqItem.CTRRequestFormHeader__c = reqHeader.Id;
        reqItem.RecordTypeId = rt.Id;
        reqItem.EmailTo__c = 'testemailto@test.com';
        reqItem.EmailCC__c = 'testemailcc@test.com';
        reqItem.CommitteeOwner__c = testUser1.Id;
        reqItem.Customer__c = acc.Id;
        reqItem.SalesOrganization__c = '1100';
        reqItem.SAPNumber__c = 'test';
        reqItem.DistributionChannel__c = '10';
        reqItem.Division__c = '00';
        insert reqItem;

        CTRPurchasingView__c purchasingView = new CTRPurchasingView__c (
            BlockStatus__c = 'FALSE',
            PurchasingDocDate__c = Date.today().addYears(-2).addDays(-100),
            Account__c = acc2.Id,
            PurchasingOrg__c = '1100'
        );
        insert purchasingView;
        
        Id customerRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'TxCustomer' LIMIT 1].Id;
        Id editRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'SupplierEditInfo' LIMIT 1].Id;

        List<CTRRequestFormEditTypeController.RequestWrapper> results = CTRRequestFormEditTypeController.onloadCreatePage(acc.Id,customerRecordTypeId,'TOP');
        results = CTRRequestFormEditTypeController.onloadCreatePage(acc.Id,customerRecordTypeId,'TPX');
        results = CTRRequestFormEditTypeController.onloadCreatePage(acc.Id,customerRecordTypeId,'TLB');
        results = CTRRequestFormEditTypeController.onloadCreatePage(acc.Id,customerRecordTypeId,'TXTH');
        results = CTRRequestFormEditTypeController.onloadCreatePage(acc.Id,customerRecordTypeId,'TSV');
        results = CTRRequestFormEditTypeController.onloadCreatePage(acc.Id,customerRecordTypeId,'TSR');
        results = CTRRequestFormEditTypeController.onloadCreatePage(acc.Id,customerRecordTypeId,'JSKem');
        results = CTRRequestFormEditTypeController.onloadCreatePage(acc.Id,customerRecordTypeId,'TXINDIA');
        List<CTRRequestFormEditTypeController.RequestWrapper> results2 = CTRRequestFormEditTypeController.onloadCreatePage(acc2.Id,editRecordTypeId,'TOP');
        results2 = CTRRequestFormEditTypeController.onloadCreatePage(acc2.Id,editRecordTypeId,'TXTH');
        results2 = CTRRequestFormEditTypeController.onloadCreatePage(acc2.Id,editRecordTypeId,'TSV');
        results2 = CTRRequestFormEditTypeController.onloadCreatePage(acc2.Id,editRecordTypeId,'TSR');
        results2 = CTRRequestFormEditTypeController.onloadCreatePage(acc2.Id,editRecordTypeId,'JSKem');
        results2 = CTRRequestFormEditTypeController.onloadCreatePage(acc2.Id,editRecordTypeId,'TXINDIA');

    }

    @isTest
    public static void testOnloadCreatePage2(){
        Account acc = new Account();
        acc.Name = 'test';
        acc.AccountNumber__c = '12345';
        insert acc;

        C360_SalesArea__c  isa =  new C360_SalesArea__c();
        isa.AccountNumber__c = acc.id;
        isa.SalesOrganization__c = '1100';
        isa.Key__c = '1100';
        insert isa;

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
        
        RecordType rt = [SELECT id FROM RecordType WHERE SobjectType = 'CTRRequestFormItem__c' AND DeveloperName = 'SupplierExtend' limit 1];
        CTRRequestFormItem__c reqItem = new CTRRequestFormItem__c();
        reqItem.Name = 'TestConditionTrue Item';
        reqItem.CTRRequestFormHeader__c = reqHeader.Id;
        reqItem.RecordTypeId = rt.Id;
        reqItem.EmailTo__c = 'testemailto@test.com';
        reqItem.EmailCC__c = 'testemailcc@test.com';
        reqItem.CommitteeOwner__c = testUser1.Id;
        reqItem.Customer__c = acc.Id;
        reqItem.SalesOrganization__c = '1100';
        reqItem.SAPNumber__c = 'test';
        reqItem.DistributionChannel__c = '10';
        reqItem.Division__c = '00';
        reqItem.PurchasingOrganizationTOP__c = '1100';
        insert reqItem;
        

        CTRPurchasingView__c purchasingView = new CTRPurchasingView__c (
            BlockStatus__c = 'FALSE',
            PurchasingDocDate__c = Date.today().addYears(-2).addDays(-100),
            Account__c = acc.Id,
            PurchasingOrg__c = '1100',
            Key__c = 'test1100'
        );
        insert purchasingView;
        
        Id editRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'SupplierExtend' LIMIT 1].Id;

        List<CTRRequestFormEditTypeController.RequestWrapper> results = CTRRequestFormEditTypeController.onloadCreatePage(acc.Id,editRecordTypeId,'TOP');
    }

    @isTest
    public static void testOnCreateEditRequest(){
        Account acc = new Account();
        acc.Name = 'test';
        acc.AccountNumber__c = '12345';
        insert acc;

        Account acc2 = new Account();
        acc2.Name = 'test2';
        acc2.AccountNumber__c = '123456';
        insert acc2;

        C360_SalesArea__c  isa =  new C360_SalesArea__c();
        isa.AccountNumber__c = acc.id;
        isa.SalesOrganization__c = '1100';
        isa.CreditControlArea__c = '1100';
        isa.DistributionChannel__c = '10';
        isa.Division__c = '00';
        isa.Key__c = 'test11001000';
        insert isa;

        C360_SalesArea__c  isa2 =  new C360_SalesArea__c();
        isa2.AccountNumber__c = acc2.id;
        isa2.SalesOrganization__c = '1100';
        isa2.Key__c = 'test11001000';
        insert isa2;

        CTRAdditionalInfo__c ctrAdditionalInfo = new CTRAdditionalInfo__c();
        ctrAdditionalInfo.Key__c = '12345110010';
        insert ctrAdditionalInfo;

        C360_FinancialInfo__c o1 = new C360_FinancialInfo__c();
        o1.CompanyCode__c = '1100';
        o1.CompanyName__c = acc.id;
        o1.Outstanding__c = 100;
        o1.CreditLimit__c = 10;
        o1.notified__c = false;
        o1.Key__c = '1234511001100';
        insert o1;

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
        
        RecordType rt = [SELECT id FROM RecordType WHERE SobjectType = 'CTRRequestFormItem__c' AND DeveloperName = 'CustomerExtend' limit 1];
        CTRRequestFormItem__c reqItem = new CTRRequestFormItem__c();
        reqItem.Name = 'TestConditionTrue Item';
        reqItem.CTRRequestFormHeader__c = reqHeader.Id;
        reqItem.RecordTypeId = rt.Id;
        reqItem.EmailTo__c = 'testemailto@test.com';
        reqItem.EmailCC__c = 'testemailcc@test.com';
        reqItem.CommitteeOwner__c = testUser1.Id;
        reqItem.Customer__c = acc.Id;
        reqItem.SalesOrganization__c = '1100';
        reqItem.SAPNumber__c = 'test';
        reqItem.DistributionChannel__c = '10';
        reqItem.Division__c = '00';
        insert reqItem;

        CTRPurchasingView__c purchasingView = new CTRPurchasingView__c (
            BlockStatus__c = 'FALSE',
            PurchasingDocDate__c = Date.today().addYears(-2).addDays(-100),
            Account__c = acc2.Id,
            PurchasingOrg__c = '1100'
        );
        insert purchasingView;
        
        Id customerRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'TxCustomer' LIMIT 1].Id;
        Id editRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'SupplierEditInfo' LIMIT 1].Id;

        CTRRequestFormEditTypeController.RequestWrapper request = new CTRRequestFormEditTypeController.RequestWrapper();
        request.mRecordId = isa.Id;

        CTRRequestFormEditTypeController.RequestWrapper request2 = new CTRRequestFormEditTypeController.RequestWrapper();
        request2.mRecordId = purchasingView.Id;

        String results = CTRRequestFormEditTypeController.onCreateEditRequest(acc.Id,'TX',customerRecordTypeId,request);
        String results2 = CTRRequestFormEditTypeController.onCreateEditRequest(acc.Id,'TX',editRecordTypeId,request2);
        String results3 = CTRRequestFormEditTypeController.onCreateEditRequest(acc.Id,'TXTH',customerRecordTypeId,request);
    }

    @isTest
    public static void testOnloadCreatePage3(){
        Account acc = new Account();
        acc.Name = 'test';
        acc.AccountNumber__c = '12345';
        insert acc;

        Account acc2 = new Account();
        acc2.Name = 'test2';
        acc2.AccountNumber__c = '123456';
        insert acc2;

        C360_SalesArea__c  isa =  new C360_SalesArea__c();
        isa.AccountNumber__c = acc.id;
        isa.SalesOrganization__c = '1100';
        isa.Key__c = 'test1100100';
        insert isa;

        C360_SalesArea__c  isa2 =  new C360_SalesArea__c();
        isa2.AccountNumber__c = acc2.id;
        isa2.SalesOrganization__c = '1100';
        isa2.Key__c = 'test1100100';
        insert isa2;

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
        
        RecordType rt = [SELECT id FROM RecordType WHERE SobjectType = 'CTRRequestFormItem__c' AND DeveloperName = 'CustomerExtend' limit 1];
        CTRRequestFormItem__c reqItem = new CTRRequestFormItem__c();
        reqItem.Name = 'TestConditionTrue Item';
        reqItem.CTRRequestFormHeader__c = reqHeader.Id;
        reqItem.RecordTypeId = rt.Id;
        reqItem.EmailTo__c = 'testemailto@test.com';
        reqItem.EmailCC__c = 'testemailcc@test.com';
        reqItem.CommitteeOwner__c = testUser1.Id;
        reqItem.Customer__c = acc.Id;
        reqItem.SalesOrganization__c = '1100';
        reqItem.SAPNumber__c = 'test';
        reqItem.DistributionChannel__c = '10';
        reqItem.Division__c = '00';
        insert reqItem;

        CTRPurchasingView__c purchasingView = new CTRPurchasingView__c (
            BlockStatus__c = 'FALSE',
            PurchasingDocDate__c = Date.today().addYears(-2).addDays(-100),
            Account__c = acc2.Id,
            PurchasingOrg__c = '1100'
        );
        insert purchasingView;
        
        Id customerRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'TxCustomer' LIMIT 1].Id;
        Id editRecordTypeId = [SELECT Id, Name, DeveloperName FROM RecordType WHERE DeveloperName = 'SupplierEditInfo' LIMIT 1].Id;

        List<CTRRequestFormEditTypeController.RequestWrapper> results = CTRRequestFormEditTypeController.onloadCreatePage(acc.Id,customerRecordTypeId,'TOP');
        List<CTRRequestFormEditTypeController.RequestWrapper> results2 = CTRRequestFormEditTypeController.onloadCreatePage(acc2.Id,editRecordTypeId,'TOP');
    }

}