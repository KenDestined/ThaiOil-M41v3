@isTest
public class CTRAccountHandlerTest {
    @TestSetup
    public static void setup(){
        Id accRecordTypeId = [select id from RecordType where DeveloperName = 'SoldTo'].Id;

        Account acc = new Account(
            AccountNumber__c='1',
            Name='A2', 
            RecordTypeId = accRecordTypeId
        );
        insert acc;

        C360Integration__c c360Integration = new C360Integration__c(
            SharePoint_TenantName__c = 'testTenant',
            SharePoint_SiteName__c = 'testSite',
            SharePoint_Document_Folder__c = 'testFolder',
            SharePointMainFolderDuringCreate__c = 'AccountDev',
            HerokuIntegrationDomain__c = 'https://ctr-dev-dev-266ee3f00154.herokuapp.com'
        );
        insert c360Integration;
    }

    private class MyMock implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            HTTPResponse res = new HTTPResponse();
            res.setStatusCode(200);
            res.setBody('{"example": "response"}');
            return res;
        }
    }
    @isTest
    public static void testCreateFolderSharePointAfterCreate(){
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new MyMock());
        Id accRecordTypeId = [select id from RecordType where DeveloperName = 'SoldTo'].Id;

        Account acc = [SELECT ID FROM Account LIMIT 1];
        acc.LeadNo__c = 'L-00663';
        acc.SubmitToCreateSharePointFolder__c = true;

        update acc;

        acc.LeadNo__c = null;
        update acc;
        Test.stopTest();
    }

    @isTest
    public static void testCreateFolderSharePointAfterCreate2(){
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new MyMock());
        Id accRecordTypeId = [select id from RecordType where DeveloperName = 'SoldTo'].Id;

        Account acc = new Account(
            AccountNumber__c='12',
            Name='A3', 
            RecordTypeId = accRecordTypeId,
            LeadNo__c = 'L-00663'
        );
        insert acc;

        acc.Name = 'Edit A3';

        update acc;
        Test.stopTest();
    }

    
    @isTest
    public static void testUpsertPartnerFunctionShipToAfterUpdate(){
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new MyMock());
        List<Account> accList = [SELECT ID FROM Account];
        Account acc = new Account(
            AccountNumber__c='12',
            Name='A3', 
            RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('ShipTo').getRecordTypeId(),
            LeadNo__c = 'L-00663',
            CustomerPartner__c = accList[0].Id
        );
        insert acc;

        acc.AccountNumber__c = 'Edit 12';

        update acc;
        Test.stopTest();
    }
/*
    @isTest
    public static void testCreateFolderSharePointAfterCreate(){

        List<Account> accList = [SELECT ID,SFCode__c FROM Account];
        Test.setMock(HttpCalloutMock.class, new MyMock());
        
        Test.startTest();
        CTRAccountHandler.CreateFolderSharePointAfterCreate(accList);
        Test.stopTest();
    }

    @isTest
    public static void testUpdateAndDelete(){

        List<Account> accList = [SELECT ID,SFCode__c FROM Account];
        Test.setMock(HttpCalloutMock.class, new MyMock());
        
        Test.startTest();
        Account acc = accList[0];
        acc.name = 'A3';
        update acc;

        CTRAccountHandler.CreateFolderSharePointAfterCreate(accList);

        delete acc;
        Test.stopTest();
    }*/
}