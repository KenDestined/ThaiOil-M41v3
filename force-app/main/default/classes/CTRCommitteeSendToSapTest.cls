@isTest
public class CTRCommitteeSendToSapTest 
{

    public class ResponseFailedMock implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest request) {
            HttpResponse response = new HttpResponse();
            response.setHeader('Content-Type', 'text/json');
            response.setBody('{"status": "error", "token": null}');
            response.setStatusCode(400);
            return response; 
        }
    }

    public class ResponseSuccessMock implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest request) {
            HttpResponse response = new HttpResponse();
            response.setHeader('Content-Type', 'text/json');
            response.setBody('{"status": "error", "token": null}');
            response.setStatusCode(200);
            return response; 
        }
    }


    @testSetup static void setupData()
    {
        Account mAccount = new Account();
        mAccount.Name = 'Test Initial Account';
        mAccount.AccountNumber__c = '0001';
        mAccount.SupplierNumber__c = '1001';
        mAccount.RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('Initial').getRecordTypeId();
        insert mAccount;

        Account mAccount2 = new Account();
        mAccount2.Name = 'Test Initial Account2';
        mAccount2.RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('Initial').getRecordTypeId();
        insert mAccount2;

        Attachment attach1 = new Attachment();       
        attach1.Name = 'FS2';
        Blob bodyBlob = Blob.valueOf('Unit Test Attachment Body');
        attach1.body = bodyBlob;
        attach1.parentId = mAccount.id;
        insert attach1;

        Account mAccountShipTo = new Account();
        mAccountShipTo.Name = 'Test Ship To Account';
        mAccountShipTo.AccountNumber__c = '0002';
        mAccountShipTo.SupplierNumber__c = '1002';
        mAccountShipTo.RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('ShipTo').getRecordTypeId();
        insert mAccountShipTo;

        Attachment attach2 = new Attachment();       
        attach2.Name = 'FS1';
        bodyBlob = Blob.valueOf('Unit Test Attachment Body');
        attach2.body = bodyBlob;
        attach2.parentId = mAccountShipTo.id;
        insert attach2;

        
        Attachment attach3 = new Attachment();       
        attach3.Name = 'FS1';
        bodyBlob = Blob.valueOf('Unit Test Attachment Body');
        attach3.body = bodyBlob;
        attach3.parentId = mAccountShipTo.id;
        insert attach3;


        CTRRequestFormHeader__c mRequestHeader = new CTRRequestFormHeader__c();
        mRequestHeader.Name = 'Initial Account Request Header';
        // mRequestHeader.Status__c = 'New';
        mRequestHeader.Customer__c = mAccount.Id;
        mRequestHeader.CompanyNameENF__c = 'testCompanyNameENF__c';
        mRequestHeader.CustomerSearchTermEN__c = 'test';

        insert mRequestHeader;

        List<CTRRequestFormItem__c> mRequestItemList = new List<CTRRequestFormItem__c>();
        CTRRequestFormItem__c mRequestItem = new CTRRequestFormItem__c();
        mRequestItem.Name = 'Initial Account Request Item - 1';
        mRequestItem.Status__c = 'New';
        mRequestItem.CTRRequestFormHeader__c = mRequestHeader.Id;
        mRequestItem.Customer__c = mAccount.Id;
        mRequestItem.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('CustomerInitial').getRecordTypeId();
        mRequestItemList.add(mRequestItem);
                
        User testUser = new User(
        ProfileId = [SELECT Id FROM Profile WHERE Name = 'Non Operation'].Id,
            LastName = 'Test',
            Email = 'test@thaioilgroup.com',
            Username = 'test@thaioilgroup.com.icr',
            CompanyName = 'TOP',
            Alias = 'test',
            TimeZoneSidKey = 'America/Los_Angeles',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US'
            );
        insert(testUser);

        CTRRequestFormItem__c mRequestItemCustomerInitial = new CTRRequestFormItem__c();
        mRequestItemCustomerInitial.Name = 'Initial Account Request Item - 1';
        mRequestItemCustomerInitial.Status__c = 'New';
        mRequestItemCustomerInitial.CTRRequestFormHeader__c = mRequestHeader.Id;
        mRequestItemCustomerInitial.Customer__c = mAccount.Id;
        mRequestItemCustomerInitial.LatestIntegrationName__c = 'Initial Customer Additional Information';
        mRequestItemCustomerInitial.IntegrationStatus__c = 'Fail';
        mRequestItemCustomerInitial.SalesOrganization__c = '1100';
        mRequestItemCustomerInitial.ProductName__c = 'B100/Ethanol';
        mRequestItemCustomerInitial.SAPStatus__c = 'Unsuccessful Send Sales/Purchasing view to SAP';
        mRequestItemCustomerInitial.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('CustomerInitial').getRecordTypeId();
        mRequestItemCustomerInitial.OwnerId  = testUser.Id;
        mRequestItemList.add(mRequestItemCustomerInitial);
        
        CTRRequestFormItem__c mRequestItemCustomerInitial2 = new CTRRequestFormItem__c();
        mRequestItemCustomerInitial2.Name = 'Initial Account Request Item - 2';
        mRequestItemCustomerInitial2.Status__c = 'New';
        mRequestItemCustomerInitial2.CTRRequestFormHeader__c = mRequestHeader.Id;
        mRequestItemCustomerInitial2.Customer__c = mAccount.Id;
        mRequestItemCustomerInitial2.SAPStatus__c = 'Send General View To SAP';
        mRequestItemCustomerInitial2.LatestIntegrationName__c = 'Initial Customer Additional Information';
        mRequestItemCustomerInitial2.SalesOrganization__c = '1100';
        mRequestItemCustomerInitial2.ProductName__c = 'B100/Ethanol';
        mRequestItemCustomerInitial2.OwnerId  = testUser.Id;
        mRequestItemCustomerInitial2.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('CustomerInitial').getRecordTypeId();
        mRequestItemList.add(mRequestItemCustomerInitial2);

        CTRRequestFormItem__c mRequestItemCustomerInitial3 = new CTRRequestFormItem__c();
        mRequestItemCustomerInitial3.Name = 'Initial Account Request Item - 3';
        mRequestItemCustomerInitial3.Status__c = 'New';
        mRequestItemCustomerInitial3.CTRRequestFormHeader__c = mRequestHeader.Id;
        mRequestItemCustomerInitial3.Customer__c = mAccount2.Id;
        mRequestItemCustomerInitial3.SAPStatus__c = 'Send General View To SAP';
        mRequestItemCustomerInitial3.LatestIntegrationName__c = 'Initial Customer Additional Information';
        mRequestItemCustomerInitial3.SalesOrganization__c = '1100';
        mRequestItemCustomerInitial3.ProductName__c = 'B100/Ethanol';
        mRequestItemCustomerInitial3.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('CustomerInitial').getRecordTypeId();
        mRequestItemCustomerInitial3.OwnerId  = testUser.Id;
        mRequestItemList.add(mRequestItemCustomerInitial3);

        CTRRequestFormItem__c mRequestItemCustomerBlock = new CTRRequestFormItem__c();
        mRequestItemCustomerBlock.Name = 'Initial Account Request Item - Block';
        mRequestItemCustomerBlock.Status__c = 'New';
        mRequestItemCustomerBlock.CTRRequestFormHeader__c = mRequestHeader.Id;
        mRequestItemCustomerBlock.Customer__c = mAccount.Id;
        mRequestItemCustomerBlock.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('CustomerBlock').getRecordTypeId();
        mRequestItemList.add(mRequestItemCustomerBlock);

        CTRRequestFormItem__c mRequestItemSupplierBlock = new CTRRequestFormItem__c();
        mRequestItemSupplierBlock.Name = 'Initial Account Request Item - Block';
        mRequestItemSupplierBlock.Status__c = 'New';
        mRequestItemSupplierBlock.CTRRequestFormHeader__c = mRequestHeader.Id;
        mRequestItemSupplierBlock.Customer__c = mAccount.Id;
        mRequestItemSupplierBlock.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('SupplierBlock').getRecordTypeId();
        mRequestItemList.add(mRequestItemSupplierBlock);

        CTRRequestFormItem__c mRequestItemCustomerEditInfo = new CTRRequestFormItem__c();
        mRequestItemCustomerEditInfo.Name = 'Initial Account Request Item - Edit';
        mRequestItemCustomerEditInfo.Status__c = 'New';
        mRequestItemCustomerEditInfo.CTRRequestFormHeader__c = mRequestHeader.Id;
        mRequestItemCustomerEditInfo.Customer__c = mAccount.Id;
        mRequestItemCustomerEditInfo.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('CustomerEditInfo').getRecordTypeId();
        mRequestItemList.add(mRequestItemCustomerEditInfo);

        CTRRequestFormItem__c mRequestItemCustomerEditInfo2 = new CTRRequestFormItem__c();
        mRequestItemCustomerEditInfo2.Name = 'Initial Account Request Item - Edit';
        mRequestItemCustomerEditInfo2.Status__c = 'New';
        mRequestItemCustomerEditInfo2.CTRRequestFormHeader__c = mRequestHeader.Id;
        mRequestItemCustomerEditInfo2.Customer__c = mAccount.Id;
        mRequestItemCustomerEditInfo2.SAPStatus__c = 'SAP Confirmed Sales/Purchasing View';
        mRequestItemCustomerEditInfo2.LatestIntegrationName__c = 'Initial Customer Additional Information';
        mRequestItemCustomerEditInfo2.IntegrationStatus__c = 'Fail';
        mRequestItemCustomerEditInfo2.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('CustomerEditInfo').getRecordTypeId();
        mRequestItemList.add(mRequestItemCustomerEditInfo2);

        CTRRequestFormItem__c mRequestItemSupplierEditInfo = new CTRRequestFormItem__c();
        mRequestItemSupplierEditInfo.Name = 'Initial Account Request Item - 1';
        mRequestItemSupplierEditInfo.Status__c = 'New';
        mRequestItemSupplierEditInfo.CTRRequestFormHeader__c = mRequestHeader.Id;
        mRequestItemSupplierEditInfo.Customer__c = mAccount.Id;
        mRequestItemSupplierEditInfo.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('SupplierEditInfo').getRecordTypeId();
        mRequestItemList.add(mRequestItemSupplierEditInfo);

        CTRRequestFormItem__c mRequestItemSupplierInitial = new CTRRequestFormItem__c();
        mRequestItemSupplierInitial.Name = 'Initial Account Request Item - SupplierInitial';
        mRequestItemSupplierInitial.Status__c = 'New';
        mRequestItemSupplierInitial.CTRRequestFormHeader__c = mRequestHeader.Id;
        mRequestItemSupplierInitial.Customer__c = mAccount.Id;
        mRequestItemSupplierInitial.CompanyCodeTX__c = '2000';
        mRequestItemSupplierInitial.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('SupplierInitial').getRecordTypeId();
        mRequestItemList.add(mRequestItemSupplierInitial);

        CTRRequestFormItem__c mRequestItemShipToEdit = new CTRRequestFormItem__c();
        mRequestItemShipToEdit.Name = 'Initial Account Request Item - ShipToEdit';
        mRequestItemShipToEdit.Status__c = 'New';
        mRequestItemShipToEdit.CTRRequestFormHeader__c = mRequestHeader.Id;
        mRequestItemShipToEdit.Customer__c = mAccount.Id;
        mRequestItemShipToEdit.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('ShipToEdit').getRecordTypeId();
        mRequestItemList.add(mRequestItemShipToEdit);

        CTRRequestFormItem__c mRequestItemShipToCreate = new CTRRequestFormItem__c();
        mRequestItemShipToCreate.Name = 'Initial Account Request Item - ShipToCreate';
        mRequestItemShipToCreate.Status__c = 'New';
        mRequestItemShipToCreate.CTRRequestFormHeader__c = mRequestHeader.Id;
        mRequestItemShipToCreate.Customer__c = mAccountShipTo.Id;
        // mRequestItemShipToCreate.Partner__c = mAccount.Id;
        mRequestItemShipToCreate.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('ShipToCreate').getRecordTypeId();
        mRequestItemList.add(mRequestItemShipToCreate);
        insert mRequestItemList;

        CTRUser__c mCTRUser = new CTRUser__c();
        mCTRUser.Username__c = 'test@gmail.com';
        mCTRUser.Email__c = 'test@gmail.com';
        mCTRUser.Password__c = 'Test';
        mCTRUser.RecordTypeId = Schema.SObjectType.CTRUser__c.getRecordTypeInfosByDeveloperName().get('Administrator').getRecordTypeId();
        insert mCTRUser;

        CTRConfig__c mCTRConfig = new CTRConfig__c();
        mCTRConfig.Heroku_Authen_Endpoint__c = 'https://ctr-api-dev-00b55ca925a8.herokuapp.com/c360/m4-1/api/user/login';
        mCTRConfig.HerokuDomain__c = 'https://ctr-front-dev-3ee5b7960f48.herokuapp.com';
        insert mCTRConfig;

        Profile profile = [SELECT Id FROM Profile WHERE Name = 'System Administrator'];

        User mUser = new User();
        mUser.ProfileId = profile.Id;
        mUser.Username = 'testuseradmin@example.com';
        mUser.Email = 'testuseradmin@example.com';
        mUser.Alias = 'tuadmin';
        mUser.EmailEncodingKey = 'UTF-8';
        mUser.LastName = 'TestUser';
        mUser.LanguageLocaleKey = 'en_US';
        mUser.LocaleSidKey = 'en_US';
        mUser.TimeZoneSidKey = 'America/Los_Angeles';
        insert mUser;

    }

    @isTest static void testSubmitToSAP() 
    {
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());
        CTRRequestFormHeader__c mRequestHeader = [SELECT Id FROM CTRRequestFormHeader__c LIMIT 1];
        CTRRequestFormItem__c mRequestItem = [SELECT Id FROM CTRRequestFormItem__c WHERE recordType.DeveloperName = 'CustomerEditInfo' LIMIT 1];
        CTRCommitteeSendToSap.wrapperResultData mResultLogin = CTRCommitteeSendToSap.getDefaultData(mRequestItem.Id);
        String mSendResult = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin.mRequestHeader, mResultLogin.mRequestItem, mRequestItem.Id , true);
        String mSendResult2 = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin.mRequestHeader, mResultLogin.mRequestItem, mRequestItem.Id , false);
        Test.stopTest();
    }

    @isTest static void testSubmitToSAP2() 
    {
        Test.startTest();
        CTRRequestFormHeader__c mRequestHeader = [SELECT Id FROM CTRRequestFormHeader__c LIMIT 1];
        CTRRequestFormItem__c mRequestItem = [SELECT Id FROM CTRRequestFormItem__c LIMIT 1];
        CTRCommitteeSendToSap.wrapperResultData mResultLogin = CTRCommitteeSendToSap.getDefaultData2(mRequestItem.Id);
        String mSendResult = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin.mRequestHeader, mResultLogin.mRequestItem, mRequestItem.Id , true);
        String mSendResult2 = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin.mRequestHeader, mResultLogin.mRequestItem, mRequestItem.Id , false);

        mRequestItem = mResultLogin.mRequestItem;
        mRequestItem.SAPCCAMapped__c = true;
        mSendResult = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin.mRequestHeader, mRequestItem, mRequestItem.Id , true);

        Test.stopTest();
    }

    
    @isTest static void testSubmitToSAP3() 
    {
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());
        CTRRequestFormHeader__c mRequestHeader = [SELECT Id FROM CTRRequestFormHeader__c LIMIT 1];
        CTRRequestFormItem__c mRequestItem = [SELECT Id FROM CTRRequestFormItem__c WHERE recordType.DeveloperName = 'CustomerInitial' LIMIT 1];
        CTRCommitteeSendToSap.wrapperResultData mResultLogin = CTRCommitteeSendToSap.getDefaultData(mRequestItem.Id);
        String mSendResult = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin.mRequestHeader, mResultLogin.mRequestItem, mRequestItem.Id , true);
        String mSendResult2 = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin.mRequestHeader, mResultLogin.mRequestItem, mRequestItem.Id , false);
        Test.stopTest();
    }

    @isTest static void testSubmitToSAP4() 
    {
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());
        CTRRequestFormHeader__c mRequestHeader = [SELECT Id FROM CTRRequestFormHeader__c LIMIT 1];
        CTRRequestFormItem__c mRequestItem = [SELECT Id,IntegrationStatus__c,recordType.DeveloperName,SAPStatus__c FROM CTRRequestFormItem__c WHERE recordType.DeveloperName = 'CustomerEditInfo' AND IntegrationStatus__c = 'Fail' LIMIT 1];
        CTRCommitteeSendToSap.wrapperResultData mResultLogin = CTRCommitteeSendToSap.getDefaultData(mRequestItem.Id);
        String mSendResult = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin.mRequestHeader, mResultLogin.mRequestItem, mRequestItem.Id , true);
        String mSendResult2 = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin.mRequestHeader, mResultLogin.mRequestItem, mRequestItem.Id , false);
        Test.stopTest();
    }


    @isTest static void testSubmitToSAPSupplier() 
    {
        CTRRequestFormHeader__c mRequestHeader = [SELECT Id FROM CTRRequestFormHeader__c LIMIT 1];
        CTRRequestFormItem__c mRequestItem = [SELECT Id,OwnerId FROM CTRRequestFormItem__c WHERE recordType.DeveloperName = 'SupplierInitial' LIMIT 1];
        CTRRequestFormItem__c mRequestItemEdit = [SELECT Id FROM CTRRequestFormItem__c WHERE recordType.DeveloperName = 'SupplierEditInfo' LIMIT 1];
        CTRRequestFormItem__c mRequestItemBlock = [SELECT Id FROM CTRRequestFormItem__c WHERE recordType.DeveloperName = 'SupplierBlock' LIMIT 1];
        
        CTRCommitteeSendToSap.wrapperResultData mResultLogin = CTRCommitteeSendToSap.getDefaultData(mRequestItem.Id);
        CTRCommitteeSendToSap.wrapperResultData mResultEditLogin = CTRCommitteeSendToSap.getDefaultData(mRequestItemEdit.Id);
        CTRCommitteeSendToSap.wrapperResultData mResultBlockLogin = CTRCommitteeSendToSap.getDefaultData(mRequestItemBlock.Id);
        
        Test.startTest();
        String mSendResult = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin.mRequestHeader, mResultLogin.mRequestItem, mRequestItem.Id , true);
        String mSendResult2 = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin.mRequestHeader, mResultEditLogin.mRequestItem, mRequestItem.Id , true);
        String mSendResult3 = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin.mRequestHeader, mResultBlockLogin.mRequestItem, mRequestItem.Id , true);
        Test.stopTest();
    }

    @isTest static void testSubmitToSAPSupplier2()
    {
        Account mAccount2 = new Account();
        mAccount2.Name = 'Test Initial Account2';
        mAccount2.RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName().get('Initial').getRecordTypeId();
        insert mAccount2;

        CTRRequestFormHeader__c mRequestHeader = [SELECT Id FROM CTRRequestFormHeader__c LIMIT 1];
        CTRRequestFormItem__c mRequestItem = [SELECT Id,Customer__c,OwnerId FROM CTRRequestFormItem__c WHERE recordType.DeveloperName = 'SupplierInitial' LIMIT 1];
        mRequestItem.Customer__c = mAccount2.Id;
        update mRequestItem;

        CTRCommitteeSendToSap.wrapperResultData mResultLogin = CTRCommitteeSendToSap.getDefaultData(mRequestItem.Id);
        
        Test.startTest();
        String mSendResult = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin.mRequestHeader, mResultLogin.mRequestItem, mRequestItem.Id , true);
        Test.stopTest();
    }
    
    @isTest static void testSubmitToSAPShipToEdit() 
    {
        CTRRequestFormHeader__c mRequestHeader = [SELECT Id FROM CTRRequestFormHeader__c LIMIT 1];
        CTRRequestFormItem__c mRequestItem = [SELECT Id FROM CTRRequestFormItem__c WHERE RecordType.DeveloperName = 'ShipToEdit' LIMIT 1];
        CTRCommitteeSendToSap.wrapperResultData mResultLogin = CTRCommitteeSendToSap.getDefaultData(mRequestItem.Id);
        Test.startTest();
        String mSendResult = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin.mRequestHeader, mResultLogin.mRequestItem, mRequestItem.Id , true);
        Test.stopTest();
    }

    @isTest static void testSubmitToSAPShipToCreate() 
    {
        CTRRequestFormHeader__c mRequestHeader = [SELECT Id FROM CTRRequestFormHeader__c LIMIT 1];
        CTRRequestFormItem__c mRequestItem = [SELECT Id FROM CTRRequestFormItem__c WHERE RecordType.DeveloperName = 'ShipToCreate' LIMIT 1];
        Test.startTest();
        CTRCommitteeSendToSap.wrapperResultData mResultLogin1 = CTRCommitteeSendToSap.getDefaultData(mRequestItem.Id);
        CTRCommitteeSendToSap.wrapperResultData mResultLogin2 = CTRCommitteeSendToSap.getDefaultData2(mRequestItem.Id);
        String mSendResult = CTRCommitteeSendToSap.SubmitToSAP(mResultLogin2.mRequestHeader, mResultLogin2.mRequestItem, mRequestItem.Id , true);
        Test.stopTest();
    }

    @isTest static void testOnloadTable() 
    {
        Test.startTest();
        CTRRequestFormItem__c mRequestItem = [SELECT Id,InternalGeneralChangedField__c,InternalOriginalField__c,InternalEditField__c,Customer__c,Customer__r.AccountNumber__c,Customer__r.SupplierNumber__c FROM CTRRequestFormItem__c LIMIT 1];
        CTRRequestEditLogFieldController.editLevelWrapper result = CTRCommitteeSendToSap.onloadTable(mRequestItem);
        Test.stopTest();
    }

    @isTest static void testEmailInformCCA() 
    {
        Test.startTest();
        List<CTRRequestFormItem__c> mRequestItemList = [SELECT Id,InternalGeneralChangedField__c,ProductName__c,SalesOrganization__c,Owner.Name,CTRRequestFormHeader__r.CustomerSearchTermEN__c,InternalOriginalField__c,InternalEditField__c,Customer__c,Customer__r.AccountNumber__c,Customer__r.SupplierNumber__c,
        BusinessUnit__c,CreditOwner__c,CreditOwnerSectionHead__c,CreditOwnerSectionHead__r.Email,SubmitToSAPUserEmail__c,SubBU__c,CTRRequestFormHeader__r.CompanyNameENF__c FROM CTRRequestFormItem__c WHERE ProductName__c != null];
        CTRCommitteeSendToSap.EmailInformCCA(mRequestItemList);
        Test.stopTest();
    }

    @isTest static void testHandleCallout() 
    {
        Test.startTest();
        List<CTRRequestFormItem__c> mRequestItemList = [SELECT Id,InternalGeneralChangedField__c,ProductName__c,SalesOrganization__c,Owner.Name,CTRRequestFormHeader__r.CustomerSearchTermEN__c,InternalOriginalField__c,InternalEditField__c,Customer__c,Customer__r.AccountNumber__c,Customer__r.SupplierNumber__c,
        BusinessUnit__c,CreditOwner__c,CreditOwnerSectionHead__c,CreditOwnerSectionHead__r.Email,SubmitToSAPUserEmail__c,SubBU__c,CTRRequestFormHeader__r.CompanyNameENF__c,SAPStatus__c FROM CTRRequestFormItem__c WHERE ProductName__c != null];
        CTRCommitteeSendToSap.handleCallout(mRequestItemList[0],'Create Ship to General+Sales View','','','','','');
        Test.stopTest();
    }
}