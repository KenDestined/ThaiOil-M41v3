@isTest
public class CTRBlockRequestFormItemModelDataTest {

    @isTest
    static void testSetupJsonForBlockDataModel() {
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
            CTRRequestFormHeader__c = reqHeader.Id,
            Customer__c = customer.Id
        );
        insert reqItem;

        String viewName = 'Sample View Name';
        String businessUnit = 'TOP';
        String gatewayId = 'Gateway ID';

        Test.startTest();
        
        CTRBlockRequestFormItemModelData result = CTRBlockRequestFormItemModelData.SetupJsonForBlockDataModel(reqHeader, reqItem, viewName, businessUnit, gatewayId);
        
        System.assertEquals(result.input.input.GatewayId, 'Gateway ID');
        Test.stopTest();
    }

    @isTest
    static void testSetupJsonForBlockDataModelCustomer() {
        Account customer = new Account(
            Name='test',
            AccountNumber__c='510001'
        );
        insert customer;

        C360_SalesArea__c  salesArea = new C360_SalesArea__c (
            BlockStatus__c = '',
            BillingDate__c = Date.today().addYears(-2).addDays(-100),
            PODate__c = Date.today().addYears(-2).addDays(-120),
            AccountNumber__c = customer.Id,
            // CompanyNumber__c = '',
            SalesOrganization__c = '2000',
            DistributionChannel__c = '16',
            Division__c = '00', 
            CreditControlArea__c = '20ZC'
        );
        insert salesArea;

        Test.startTest();
        String uuid = Uuid.randomUUID();
        String result = CTRBlockRequestFormItemModelData.SetupJsonForBlockDataModelCustomer(salesArea,uuid);
        
        System.assert(JSON.serialize(result) != null);
        Test.stopTest();
    }
}