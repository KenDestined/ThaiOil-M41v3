@isTest
public without sharing class CTREmailToControllerTest {

    @testSetup
    static void setup() {

        CTRRequestFormHeader__c reqHeader = new CTRRequestFormHeader__c(
            // Status__c = 'New',
            CompanyNameENF__c = 'Test',
            FirstName__c = 'firstName',
            LastName__c = 'lastName'
        );
        insert reqHeader;

        CTRRequestFormItem__c reqItem = new CTRRequestFormItem__c(
            EmailPageSubject__c = '',
            EmailPageMessage__c = '',
            EmailPageEmailTo__c = 'testuser@test.com',
            EmailPageEmailCC__c = 'testcc@test.com',
            EmailPageAttachment__c = 'T006-P4.png',
            SalesOrganization__c = '1400',
            CTRRequestFormHeader__c = reqHeader.Id
        );
        insert reqItem;

        CTREmailTemplateMaster__c emailTemp = new CTREmailTemplateMaster__c(
            Subject__c = 'Subject',
            HTMLBody__c = 'Body',
            Type__c = 'Committee TOP'
        );
        insert emailTemp;

        String base64Data = EncodingUtil.urlDecode('YWJj', 'UTF-8');
        Blob fileBody = EncodingUtil.base64Decode(base64Data);
        ContentVersion contentVersion = new ContentVersion (
            ContentLocation = 'S',
            PathOnClient = 'T006-P4.png',
            Title = 'T006-P4.png',
            VersionData = EncodingUtil.base64Decode(base64Data)
        );
        insert contentVersion;

        ContentVersion queriedContentVersion = [
            SELECT Id, ContentDocumentId
            FROM ContentVersion
            WHERE Id = :contentVersion.Id
            LIMIT 1
        ];

        ContentDocumentLink contentLink = new ContentDocumentLink(
            ContentDocumentId = queriedContentVersion.ContentDocumentId,
            LinkedEntityId = reqItem.Id,
            ShareType = 'V',
            Visibility = 'AllUsers'
        );
        insert contentLink;
        
        Lead lrec = new Lead();
        lrec.firstname='Test';
        lrec.LastName = 'lastnameTest';
        lrec.Company = 'Testcompany';
        lrec.EmailPageAttachment__c = 'T006-P3.png';
        lrec.EmailPageEmailTo__c = 'test@test.com,test2@test.com';
        lrec.EmailPageEmailCC__c = 'test3@test.com';
        lrec.EmailPageMessage__c = '<p>Request for Approval of New Lead TX Registration: Test Test</p>';
        lrec.EmailPageSubject__c = 'Test Subject';
        lrec.RegisteredasCustomer__c = true;
        lrec.RegisteredasSupplier__c = true;
        lrec.InterestedProductTypeAsCustomerTOP__c = 'Crude';
        lrec.InterestedProductTypeasCustomer__c = 'Petroleum Products';
        lrec.InterestedProductTypeAsCustomerTX__c = 'Fuel';
        lrec.InterestedProductTypeasSupplier__c = 'Crude';
        lrec.InterestedProductTypeAsSupplierTOP__c = 'Crude';
        lrec.InterestedProductTypeAsSupplierTX__c = 'Fuel';
        insert lrec;

        contentLink = new ContentDocumentLink(
            ContentDocumentId = queriedContentVersion.ContentDocumentId,
            LinkedEntityId = lrec.Id,
            ShareType = 'V',
            Visibility = 'AllUsers'
        );
        insert contentLink;

        C360Integration__c c360Integration = new C360Integration__c(
            SharePoint_TenantName__c = 'testTenant',
            SharePoint_SiteName__c = 'testSite',
            SharePoint_Document_Folder__c = 'testFolder',
            SharePointMainFolderDuringCreate__c = 'AccountDev',
            HerokuIntegrationDomain__c = 'https://ctr-dev-dev-266ee3f00154.herokuapp.com'
        );
        insert c360Integration;

        Contact testContact = new Contact(
            FirstName = 'Test',
            LastName = 'Test',
            Email = 'test@test.com'
        );
        insert testContact;
    }

    @isTest
    static void testGetEmailToInfo() {
        Test.startTest();
        CTRRequestFormItem__c testRecord = [SELECT Id FROM CTRRequestFormItem__c LIMIT 1];
        System.debug('testRecord: ' + testRecord);
        CTREmailToController.getEmailToInfo(testRecord.Id, 'Committee TOP');
        Test.stopTest();
    }

    @isTest
    static void testUpdateListFileName() {
        Test.startTest();
        CTRRequestFormItem__c testRecord = [SELECT Id FROM CTRRequestFormItem__c LIMIT 1];
        CTREmailToController.updateListFileName(testRecord.Id, 'TestFile.txt');
        Test.stopTest();
    }

    @isTest
    static void testGetUploadedFileName() {
        Test.startTest();
        CTRRequestFormItem__c testRecord = [SELECT Id FROM CTRRequestFormItem__c LIMIT 1];
        CTREmailToController.getUploadedFileName(testRecord.Id);
        Test.stopTest();
    }

    @isTest
    static void testSaveEmailTo() {
        CTRUser__c mCTRUser = new CTRUser__c();
        mCTRUser.Username__c = 'test@gmail.com';
        mCTRUser.Email__c = 'test@gmail.com';
        mCTRUser.Password__c = 'Test';
        mCTRUser.RecordTypeId = Schema.SObjectType.CTRUser__c.getRecordTypeInfosByDeveloperName().get('Administrator').getRecordTypeId();
        insert mCTRUser;

        Account acc1 = new Account();
        acc1.Name = 'Acc1';
        acc1.AccountNumber__c = '1';
        acc1.AccountNumber__c = '1';
        acc1.CTRUser__c = mCTRUser.Id;
        insert acc1;

        CTRRequestFormHeader__c reqHeader = new CTRRequestFormHeader__c(
            // Status__c = 'New',
            CompanyNameENF__c = 'Test2',
            FirstName__c = 'firstName2',
            LastName__c = 'lastName2',
            Email__c = 'test2@email.com',
            Customer__c = acc1.Id
        );
        insert reqHeader;

        Test.startTest();
        CTRRequestFormItem__c reqItems = [SELECT Id FROM CTRRequestFormItem__c LIMIT 1];
        CTRRequestFormItem__c reqItem = new CTRRequestFormItem__c(
            Id = reqItems.Id,
            EmailPageSubject__c = 'Test Subject',
            EmailPageMessage__c = 'Test',
            EmailPageEmailTo__c = 'testuser@test.com, testuser@test.com',
            EmailPageEmailCC__c = 'testcc@test.com',
            CTRRequestFormHeader__c = reqHeader.Id
        );
        CTREmailToController.saveEmailTo(reqItem, false, 'TestFile.txt',reqItems.Id);
        CTREmailToController.saveEmailTo(reqItem, true, 'TestFile.txt',reqItems.Id);
        Test.stopTest();
    }

    @isTest
    static void testGetCurrentUserProfileName() {
        Test.startTest();
        CTREmailToController.getCurrentUserProfileName();
        Test.stopTest();
    }

    @isTest
    static void testGetRecordType() {
        Test.startTest();
        CTRRequestFormItem__c testRecord = [SELECT Id FROM CTRRequestFormItem__c LIMIT 1];
        Map<String, String> resultMap = CTREmailToController.getRecordType(testRecord.Id);
        System.assertNotEquals(null, resultMap);
        Test.stopTest();
    }
    
    @isTest
    static void testgetRecordTypeForLead() {
        Test.startTest();
        Lead testRecord = [SELECT Id FROM Lead LIMIT 1];
        String result = CTREmailToController.getRecordTypeForLead(testRecord.Id);
        //System.assertNotEquals(null, result);
        Test.stopTest();
    }
    
    @isTest
    static void testgetEmailToInfoForLead() {
        Test.startTest();
        Lead testRecord = [SELECT Id FROM Lead LIMIT 1];
        Lead result = CTREmailToController.getEmailToInfoForLead(testRecord.Id,'Committee TOP');
        //System.assertNotEquals(null, result);
        Test.stopTest();
    }
    
    @isTest
    static void testupdateListFileNameFroLead() {
        Test.startTest();
        Lead testRecord = [SELECT Id FROM Lead LIMIT 1];
        CTREmailToController.updateListFileNameFroLead(testRecord.Id,'T006-P4.png,T269-P1.png,T269-P2.png');
        Test.stopTest();
    }
    
    @isTest
    static void testgetUploadedFileNameForLead() {
        Test.startTest();
        Lead testRecord = [SELECT Id FROM Lead LIMIT 1];
        CTREmailToController.getUploadedFileNameForLead(testRecord.Id);
        Test.stopTest();
    }
    
    @isTest
    static void testsaveEmailToForLead() {
        Test.startTest();
        Lead testRecord = [SELECT Id,EmailPageMessage__c,EmailPageEmailTo__c,EmailPageEmailCC__c,EmailPageSubject__c FROM Lead LIMIT 1];
        CTREmailToController.saveEmailToForLead(testRecord,False, 'T006-P4.png,T269-P1.png,T269-P2.png',testRecord.Id);
        CTREmailToController.saveEmailToForLead(testRecord,True, 'T006-P4.png,T269-P1.png,T269-P2.png',testRecord.Id);
        //CTREmailToController.saveEmailToForLead(Lead LeadRec, Boolean isSubmit, String uploadedList,String recordId);
        Test.stopTest();
    }
    
    @isTest
    static void testsendEmailWithAttachmentForLead() {
        Test.startTest();
        Lead testRecord = [SELECT Id,EmailPageMessage__c,EmailPageEmailTo__c,EmailPageEmailCC__c,EmailPageSubject__c FROM Lead LIMIT 1];
        CTREmailToController.sendEmailWithAttachmentForLead(testRecord.Id,testRecord, 'T006-P4.png,T269-P1.png');
        Test.stopTest();
    }
    
    @isTest
    static void testsendFiletoHeroku() {
        Test.startTest();
        String docList = '[{"Id":"0691m000003OPiwAAG","Title":"T006-P2.png","IsSaved":true},{"Id":"0691m000003OPj1AAG","Title":"T006-P3.png","IsSaved":true},{"Id":"0691m000003OPj6AAG","Title":"T006-P4.png","IsSaved":true},{"Id":"0691m000003OPjBAAW","Title":"T006-P5.png","IsSaved":true}]';
        CTRRequestFormItem__c testRecord = [SELECT Id FROM CTRRequestFormItem__c LIMIT 1];
        CTREmailToController.sendFiletoHeroku(testRecord.Id, docList);
        Test.stopTest();
    }
    
}