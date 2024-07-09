@isTest
public with sharing class CTRCustomerMasterFormControllerTest {
 
    @isTest
    static void testRenderPage(){
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
        List<CTRRequestFormItem__c> reqItemList = new List<CTRRequestFormItem__c>();
        CTRRequestFormItem__c reqItemConditionTrue = new CTRRequestFormItem__c();
        reqItemConditionTrue.Name = 'TestConditionTrue Item';
        reqItemConditionTrue.CTRRequestFormHeader__c = reqHeader.Id;
        reqItemConditionTrue.RecordTypeId = rt.Id;
        reqItemConditionTrue.EmailTo__c = 'testemailto@test.com';
        reqItemConditionTrue.EmailCC__c = 'testemailcc@test.com';
        reqItemConditionTrue.CommitteeOwner__c = testUser1.Id;
        reqItemList.add(reqItemConditionTrue);
        insert reqItemList;

        PageReference pageRef = Page.CTRCustomerMasterForm;
        Test.setCurrentPage(pageRef);
        ApexPages.currentPage().getParameters().put('recordId',reqItemList[0].id);

        Test.startTest();
        CTRCustomerMasterFormController ctr = new CTRCustomerMasterFormController();
        ctr.renderPage();
        Test.stopTest();
    }
}