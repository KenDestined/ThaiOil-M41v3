@isTest
public with sharing class CTRCreateSharePointFolderBatchTest {
    private class MockHttpResponse implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setStatusCode(200);
            res.setBody('{"status":"success"}');
            return res;
        }
    }
    @isTest
    static void testCTRCreateSharePointFolderBatch(){
        Test.setMock(HttpCalloutMock.class, new MockHttpResponse());

        Account customer = new Account(
            Name='test',
            AccountNumber__c='510001',
            SupplierNumber__c='510001',
            SubmitToCreateSharePointFolder__c = false,
            RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('ShipTo').getRecordTypeId(),
            AccountGroup__c = 'ZSHP',
            isMigrateData__c = true
        );
        insert customer;

        C360Integration__c c360Integration = new C360Integration__c(
            SharePoint_TenantName__c = 'testTenant',
            SharePoint_SiteName__c = 'testSite',
            SharePoint_Document_Folder__c = 'testFolder',
            SharePointMainFolderDuringCreate__c = 'AccountDev',
            HerokuIntegrationDomain__c = 'https://ctr-dev-dev-266ee3f00154.herokuapp.com'
        );
        insert c360Integration;

        Database.executeBatch(new CTRCreateSharePointFolderBatch());
    }
}