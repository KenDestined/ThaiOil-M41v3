@isTest
public class CTRSharepointUploadQueueableTest {

    public class ResponseSuccessMock implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest request) {
            HttpResponse response = new HttpResponse();
            response.setHeader('Content-Type', 'text/json');
            response.setBody('{"status": "success", "message": "Mocked response"}');
            response.setStatusCode(200);
            return response; 
        }
    }

    public class ResponseFailedMock implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest request) {
            HttpResponse response = new HttpResponse();
            response.setHeader('Content-Type', 'text/json');
            response.setBody('{"status": "error", "message": "Mocked error response"}');
            response.setStatusCode(400);
            return response; 
        }
    }
    @testSetup
    static void setup() {

        Account customer = new Account(
            Name='test',
            AccountNumber__c='510001'
        );
        insert customer;

        CTRRequestFormHeader__c reqHeader = new CTRRequestFormHeader__c(
            // Status__c = 'New'
            Customer__c = customer.Id
        );
        insert reqHeader;

        CTRRequestFormItem__c reqItem = new CTRRequestFormItem__c(
            CustomerSubject__c = '',
            CustomerMessage__c = '',
            CustomerEmailTo__c = 'testuser@test.com',
            CustomerEmailCC__c = 'testcc@test.com',
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
            PathOnClient = 'TestFile.txt',
            Title = 'TestFile.txt',
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

        insert new Lead(
            FirstName='Mock', 
            LastName='Test', 
            Company='Test Company',
            RegisteredasCustomer__c = true,
            RegisteredasSupplier__c = true,
            InterestedProductTypeAsCustomerTOP__c = 'Crude',
        	InterestedProductTypeasCustomer__c = 'Petroleum Products',
            InterestedProductTypeAsCustomerTX__c = 'Fuel',
            InterestedProductTypeasSupplier__c = 'Crude',
            InterestedProductTypeAsSupplierTOP__c = 'Crude',
            InterestedProductTypeAsSupplierTX__c = 'Fuel');
        
        C360Integration__c setting = new C360Integration__c();
        setting.Name = 'Test Setting';
        setting.HerokuIntegrationDomain__c = 'test@test.com';
        insert setting;
    }
    
    @isTest
    static void testQueueableExecutionSaleSuccess() {
        Test.setMock(HttpCalloutMock.class, new CTRTriggerWebServiceQueueableTest.ResponseSuccessMock());
        
        CTRRequestFormItem__c reqItem = [SELECT Id FROM CTRRequestFormItem__c LIMIT 1];

        // Simulate queueable execution
        Test.startTest();
        String mFolderName = 'Test';
        String mPath = '/Account/Test';
        String title = 'File Name';
        Blob mFileBody = Blob.valueOf('Test Content');
        
        CTRSharepointUploadQueueable queueable = new CTRSharepointUploadQueueable(mFolderName, mPath, title, mFileBody, 'token');
        System.enqueueJob(queueable);
        Test.stopTest();
    }
    
    @isTest
    static void testQueueableExecutionSaleFail() {
        Test.setMock(HttpCalloutMock.class, new CTRTriggerWebServiceQueueableTest.ResponseFailedMock());
        
        CTRRequestFormItem__c reqItem = [SELECT Id FROM CTRRequestFormItem__c LIMIT 1];

        // Simulate queueable execution
        Test.startTest();
        String mFolderName = 'Test';
        String mPath = '/Account/Test';
        String title = 'File Name';
        Blob mFileBody = Blob.valueOf('Test Content');
        
        CTRSharepointUploadQueueable queueable = new CTRSharepointUploadQueueable(mFolderName, mPath, title, mFileBody, 'token');
        System.enqueueJob(queueable);
        Test.stopTest();
    }
}