@isTest
public class CTRBlockCustomerBatchTest {

    public class CTRIntegraionListMock implements HttpCalloutMock {
        // Implement the respond method to return a mock HTTP response
        public HttpResponse respond(HttpRequest request) {
            HttpResponse response = new HttpResponse();
            response.setHeader('Content-Type', 'application/json');
            response.setBody('{"records": [{"MasterLabel": "CTRCustomer", "DeveloperName": "CTRCustomer", /* Populate necessary fields */}]}');
            response.setStatusCode(200);
            return response;
        }
    }

    @isTest
    static void testBatchExecution() {

        // Create test data
        C360Integration__c integration = new C360Integration__c(
            iRPA_Customer_Endpoint__c = 'https://spa-api-gateway-bpi-ap-prod.cfapps.ap10.hana.ondemand.com/public/irpa/runtime/v1/apiTriggers/d150122b-44cd-456f-8781-2452457894cb/runs',
            iRPA_API_Key_Header__c = 'irpa-api-key',
            iRPA_API_Key__c = 'x16_dITMsehvuKJyJJ47wIvF540s6Awl',
            HerokuIntegrationDomain__c = 'https://ctr-dev-dev-266ee3f00154.herokuapp.com'
        );
        insert integration;

        // Create a mock CTRIntegraionList__mdt record
        CTRIntegraionList__mdt mIntegrationList = new CTRIntegraionList__mdt(
            MasterLabel = 'CTRCustomer',
            DeveloperName = 'CTRCustomer',
            Endpoint__c ='https://ctr-dev-dev-266ee3f00154.herokuapp.com/outbound/irpa/customer',
            Token__c = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEzWjFtMDAwMDAwUlhWTUVBNCIsInVzZXJuYW1lIjoic2ZpbnRlZ3JhdGlvbkByb3VuZHR3b3NvbHV0aW9ucy5jb20iLCJhY2NvdW50cyI6W10sImlhdCI6MTcxMjkxMTIwNiwiZXhwIjoxNzEyOTE0ODA2fQ.NzKnUDCrKTKukjxy_f0k-k_S3VYEHc9nBc0Jg-TBTRo',
            Path__c = '/outbound/irpa/customer'
        );

        Test.setMock(HttpCalloutMock.class, new CTRBlockCustomerBatchTest.CTRIntegraionListMock());

        Account customer = new Account(
            Name='test',
            AccountNumber__c='510001'
        );
        insert customer;

        C360_SalesArea__c  salesAreas  = new C360_SalesArea__c (
            BlockStatus__c = null,
            BillingDate__c = Date.today().addYears(-2).addDays(-100),
            PODate__c = Date.today().addYears(-2).addDays(-120),
            AccountNumber__c = customer.Id,
            // CompanyNumber__c = '',
            SalesOrganization__c = '2000',
            DistributionChannel__c = '16',
            Division__c = '00', 
            CreditControlArea__c = '20ZC'
        );
        insert salesAreas ;
        // Set up test data for C360Integration__c and CTRIntegraionList__mdt (optional)

        // Start the batch job
        Test.startTest();
        Database.executeBatch(new CTRBlockCustomerBatch());
        Test.stopTest();
    }
    
}