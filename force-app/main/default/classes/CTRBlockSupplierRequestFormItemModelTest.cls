@isTest
private class CTRBlockSupplierRequestFormItemModelTest {

    @isTest
    static void testSetupJsonForBlockDataModel() {
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
        CTRRequestFormItem__c requestItem = new CTRRequestFormItem__c();
        requestItem.Name = 'TestConditionTrue Item';
        requestItem.CTRRequestFormHeader__c = reqHeader.Id;
        requestItem.RecordTypeId = rt.Id;
        requestItem.EmailTo__c = 'testemailto@test.com';
        requestItem.EmailCC__c = 'testemailcc@test.com';
        requestItem.CommitteeOwner__c = testUser1.Id;
        insert requestItem;

        Test.startTest();
        CTRBlockSupplierRequestFormItemModelData result = CTRBlockSupplierRequestFormItemModelData.SetupJsonForBlockDataModel(reqHeader, requestItem, 'Customer', 'TX', 'GatewayId');
        Test.stopTest();
        
    }

    @isTest
    static void testSetupJsonForBlockDataModelSupplier() {
        Account customer = new Account(
            Name='test',
            SupplierNumber__c='7'
        );
        insert customer;

        CTRPurchasingView__c  purchasingView = new CTRPurchasingView__c (
            BlockStatus__c = 'FALSE',
            PurchasingDocDate__c = Date.today().addYears(-2).addDays(-100),
            Account__c = customer.Id,
            PurchasingOrg__c = 'A000'
        );
        insert purchasingView;

        Test.startTest();
        String uuid = Uuid.randomUUID();
        String result = CTRBlockSupplierRequestFormItemModelData.SetupJsonForBlockDataModelSupplier(purchasingView,uuid);
        
        System.assert(JSON.serialize(result) != null);
        Test.stopTest();
    }

}