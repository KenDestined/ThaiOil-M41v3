@isTest
public class CTRBlockSupplierBatchTest {

    public class CTRIntegraionListMock implements HttpCalloutMock {
        // Implement the respond method to return a mock HTTP response
        public HttpResponse respond(HttpRequest request) {
            HttpResponse response = new HttpResponse();
            response.setHeader('Content-Type', 'application/json');
            response.setBody('{"records": [{"MasterLabel": "CTRSupplier", "DeveloperName": "CTRSupplier", /* Populate necessary fields */}]}');
            response.setStatusCode(200);
            return response;
        }
    }

    @isTest
    static void testBatchExecution() {

        // Create test data
        C360Integration__c integration = new C360Integration__c(
            iRPA_Supplier_Endpoint__c = 'https://spa-api-gateway-bpi-ap-prod.cfapps.ap10.hana.ondemand.com/public/irpa/runtime/v1/apiTriggers/36c7a47c-f704-4f7c-b9d8-b96ea1f28df8/runs',
            iRPA_API_Key_Header__c = 'irpa-api-key',
            iRPA_API_Key__c = 'x16_dITMsehvuKJyJJ47wIvF540s6Awl',
            HerokuIntegrationDomain__c = 'https://ctr-dev-dev-266ee3f00154.herokuapp.com'
        );
        insert integration;

        // Create a mock CTRIntegraionList__mdt record
        CTRIntegraionList__mdt mIntegrationList = new CTRIntegraionList__mdt(
            MasterLabel = 'CTRSupplier',
            DeveloperName = 'CTRSupplier',
            Endpoint__c ='https://ctr-dev-dev-266ee3f00154.herokuapp.com/outbound/irpa/supplier',
            Token__c = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEzWjFtMDAwMDAwUlhWTUVBNCIsInVzZXJuYW1lIjoic2ZpbnRlZ3JhdGlvbkByb3VuZHR3b3NvbHV0aW9ucy5jb20iLCJhY2NvdW50cyI6W10sImlhdCI6MTcxMjkxNDgwNCwiZXhwIjoxNzEyOTE4NDA0fQ.xpqQOomRYxQbVTtXXXt7EiY3fE5q4tnXZGwqQKuiL-o',
            Path__c = '/outbound/irpa/supplier'
        );

        Test.setMock(HttpCalloutMock.class, new CTRBlockSupplierBatchTest.CTRIntegraionListMock());

        Account customer = new Account(
            Name='test',
            SupplierNumber__c='7777'
        );
        insert customer;

        CTRPurchasingView__c  purchasingView = new CTRPurchasingView__c (
            BlockStatus__c = 'FALSE',
            PurchasingDocDate__c = Date.today().addYears(-2).addDays(-100),
            Account__c = customer.Id,
            PurchasingOrg__c = 'A000'
        );
        insert purchasingView;
        // Set up test data for C360Integration__c and CTRIntegraionList__mdt (optional)

        // Start the batch job
        Test.startTest();
        Database.executeBatch(new CTRBlockSupplierBatch());
        Test.stopTest();
    }
    
}