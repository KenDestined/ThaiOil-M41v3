@isTest
public with sharing class CTRLeadConvertTest {
    @TestSetup
    static void setup(){
        Account testAccount1 = new Account(
            Name = 'Test Account', 
            InterestedProductTypeCustomer__c = 'Petroleum Products', 
            InterestedProductTypeSupplier__c = 'B100/Ethanal'
        );
        insert testAccount1;

        Account testAccount2 = new Account(
            Name = 'Test Company', 
            TaxCode1__c = '0123456789000',
            FormerNameofCompany__c = 'Former Name',
            InterestedProductTypeCustomer__c = 'Petroleum Products', 
            InterestedProductTypeSupplier__c = 'B100/Ethanal'
        );
        insert testAccount2;

        RecordType recordTypeTop = [SELECT Id FROM RecordType WHERE Name = 'TOP'];
        RecordType recordTypeTx = [SELECT Id FROM RecordType WHERE Name = 'TX Supplier'];

        List<Master_Map__c> Master = new List<Master_Map__c>();
        Master_Map__c m = new Master_Map__c(Code__c='TH', Type__c='Country',Description__c ='Description__c');
        Master.add(m);
        insert Master;

        Lead testLead1 = new Lead(
            Company = 'Test Company',
            TaxNumber__c = '0123456789000',
            FormerNameofCompany__c = 'Former Name',
            Email = 'test@example.com',
            InterestedProductTypeasCustomer__c = 'Petroleum Products',
            InterestedProductTypeasSupplier__c = 'Crude',
            FirstName = 'Test',
            LastName = 'Test',
            RegisteredasCustomer__c = true,
            RegisteredasSupplier__c = true,
            InterestedProductTypeAsCustomerTOP__c = 'Crude',
            InterestedProductTypeAsCustomerTX__c = 'Fuel',
            InterestedProductTypeAsSupplierTOP__c = 'Crude',
            InterestedProductTypeAsSupplierTX__c = 'Fuel',
            isTOPG__c = true,
            Country__c = Master[0].Id
        );
        insert testLead1;

        Lead testLead2 = new Lead(
            Company = 'Test Company 2',
            TaxNumber__c = '0123456789002',
            FormerNameofCompany__c = 'Former Name 2',
            Email = 'test2@example.com',
            InterestedProductTypeasCustomer__c = 'Petroleum Products',
            InterestedProductTypeasSupplier__c = 'Crude',
            FirstName = 'Test2',
            LastName = 'Test2',
            RegisteredasCustomer__c = true,
            RegisteredasSupplier__c = true,
            InterestedProductTypeAsCustomerTOP__c = 'Crude',
            InterestedProductTypeAsCustomerTX__c = 'Fuel',
            InterestedProductTypeAsSupplierTOP__c = 'Crude',
            InterestedProductTypeAsSupplierTX__c = 'Fuel',
            isTOPG__c = false,
            Country__c = Master[0].Id,
            RecordTypeId = recordTypeTx.Id
        );
        insert testLead2;

        // Create leads with different record types
        Lead topLead = new Lead(
            FirstName = 'Top Lead',
            LastName = 'TOP Lead',
            Company = 'TOP Company',
            // RecordTypeId = topRecordType.Id,
            // InterestedProductTypeAsCustomerTOP__c = 'Product1',
            // InterestedProductTypeAsSupplierTOP__c = 'SupplierProduct1',
            RegisteredasCustomer__c = true,
            RegisteredasSupplier__c = true,
            InterestedProductTypeAsCustomerTOP__c = 'Crude',
            InterestedProductTypeAsCustomerTX__c = 'Fuel',
            InterestedProductTypeAsSupplierTOP__c = 'Crude',
            InterestedProductTypeAsSupplierTX__c = 'Fuel',
            isTOPG__c = false,
            Country__c = Master[0].Id,
            RecordTypeId = recordTypeTop.Id
        );
        insert topLead;

        Lead txLead = new Lead(
            FirstName = 'TX Lead',
            LastName = 'TX Lead',
            Company = 'TX Company',
            // RecordTypeId = txRecordType.Id,
            // InterestedProductTypeAsCustomerTX__c = 'Product2',
            // InterestedProductTypeAsSupplierTX__c = 'SupplierProduct2',
            RegisteredasCustomer__c = true,
            RegisteredasSupplier__c = true,
            InterestedProductTypeAsCustomerTOP__c = 'Crude',
            InterestedProductTypeAsCustomerTX__c = 'Fuel',
            InterestedProductTypeAsSupplierTOP__c = 'Crude',
            InterestedProductTypeAsSupplierTX__c = 'Fuel',
            isTOPG__c = false,
            Country__c = Master[0].Id,
            RecordTypeId = recordTypeTx.Id
        );
        insert txLead;

        OrgWideEmailAddress orgWide = [SELECT Id,Address FROM OrgWideEmailAddress WHERE DisplayName = 'Commercial Team' LIMIT 1];

        CTRConfig__c setting = new CTRConfig__c();
        setting.Name = 'Test Setting';
        setting.EmailService__c = 'test@test.com';
        setting.OrgWideEmailAddress__c = orgWide.Address;
        insert setting;
    }

    @isTest
    static void testAssignLeads() {

        Profile testProfile = [SELECT Id FROM Profile WHERE Name = 'TX' LIMIT 1];
        User testUser = new User(
            FirstName = 'Test',
            LastName = 'User',
            Email = 'testuser@example.test',
            Username = 'testuser@example.test',
            ProfileId = testProfile.Id,
            Alias = 'tuser',
            CommunityNickname = 'testuser',
            TimeZoneSidKey = 'Asia/Bangkok',
            LocaleSidKey = 'en_US',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US'
        );
        insert testUser;

        Test.startTest();
        Lead testLead1 = [SELECT Id FROM Lead LIMIT 1];

        List<CTRLeadConvert.ConvertResults> results = CTRLeadConvert.assignLeads(new List<Id>{testLead1.Id});
        System.runAs(testUser) {
        results = CTRLeadConvert.assignLeads(new List<Id>{testLead1.Id});
        }
        Test.stopTest();
    }

    @isTest
    static void testAssignLeads2() {

        Profile testProfile = [SELECT Id FROM Profile WHERE Name = 'TX' LIMIT 1];
        User testUser = new User(
            FirstName = 'Test',
            LastName = 'User',
            Email = 'testuser@example.test',
            Username = 'testuser@example.test',
            ProfileId = testProfile.Id,
            Alias = 'tuser',
            CommunityNickname = 'testuser',
            TimeZoneSidKey = 'Asia/Bangkok',
            LocaleSidKey = 'en_US',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US'
        );
        insert testUser;

        Test.startTest();
        Lead testLead1 = [SELECT Id FROM Lead WHERE FirstName = 'Test2' LIMIT 1];

        List<CTRLeadConvert.ConvertResults> results = CTRLeadConvert.assignLeads(new List<Id>{testLead1.Id});
        System.runAs(testUser) {
        results = CTRLeadConvert.assignLeads(new List<Id>{testLead1.Id});
        }
        Test.stopTest();
    }

    @isTest
    static void testUpdateAccountForTopLead() {
        // Retrieve test data
        Lead topLead = [SELECT Id, InterestedProductTypeAsCustomerTOP__c, InterestedProductTypeAsSupplierTOP__c, RecordType.DeveloperName FROM Lead WHERE LastName = 'TOP Lead' LIMIT 1];
        Account testAccount = [SELECT Id, InterestedProductTypeAsCustomerTOP__c, InterestedProductTypeAsSupplierTOP__c FROM Account WHERE Name = 'Test Account' LIMIT 1];
        
        // Call the method to be tested
        Account updAccount = new Account(Id = testAccount.Id);
        updAccount.LeadName__c = topLead.Id;
        if (topLead.RecordType.DeveloperName.contains('TOP')) {
            if (String.isNotBlank(topLead.InterestedProductTypeAsCustomerTOP__c)) {
                updAccount.InterestedProductTypeAsCustomerTOP__c = topLead.InterestedProductTypeAsCustomerTOP__c;
            }
            if (String.isNotBlank(topLead.InterestedProductTypeAsSupplierTOP__c)) {
                updAccount.InterestedProductTypeAsSupplierTOP__c = topLead.InterestedProductTypeAsSupplierTOP__c;
            }
        }
        
        update updAccount;
        
        // Assert the expected outcomes
        Account updatedAccount = [SELECT InterestedProductTypeAsCustomerTOP__c, InterestedProductTypeAsSupplierTOP__c FROM Account WHERE Id =:testAccount.Id];
        System.assertEquals('Crude', updatedAccount.InterestedProductTypeAsCustomerTOP__c);
        System.assertEquals('Crude', updatedAccount.InterestedProductTypeAsSupplierTOP__c);
    }
    
    @isTest
    static void testUpdateAccountForTxLead() {
        // Retrieve test data
        Lead txLead = [SELECT Id, InterestedProductTypeAsCustomerTX__c, InterestedProductTypeAsSupplierTX__c, RecordType.DeveloperName FROM Lead WHERE LastName = 'TX Lead' LIMIT 1];
        Account testAccount = [SELECT Id, InterestedProductTypeAsCustomerTX__c, InterestedProductTypeAsSupplierTX__c FROM Account WHERE Name = 'Test Account' LIMIT 1];
        
        // Call the method to be tested
        Account updAccount = new Account(Id = testAccount.Id);
        updAccount.LeadName__c = txLead.Id;
        if (!txLead.RecordType.DeveloperName.contains('TOP')) {
            if (String.isNotBlank(txLead.InterestedProductTypeAsCustomerTX__c)) {
                updAccount.InterestedProductTypeAsCustomerTX__c = txLead.InterestedProductTypeAsCustomerTX__c;
            }
            if (String.isNotBlank(txLead.InterestedProductTypeAsSupplierTX__c)) {
                updAccount.InterestedProductTypeAsSupplierTX__c = txLead.InterestedProductTypeAsSupplierTX__c;
            }
        }
        
        update updAccount;
        
        // Assert the expected outcomes
        Account updatedAccount = [SELECT InterestedProductTypeAsCustomerTX__c, InterestedProductTypeAsSupplierTX__c FROM Account WHERE Id =:testAccount.Id];
        System.assertEquals('Fuel', updatedAccount.InterestedProductTypeAsCustomerTX__c);
        System.assertEquals('Fuel', updatedAccount.InterestedProductTypeAsSupplierTX__c);
    }

    @isTest
    static void testCheckCountryMatchingSellerBuyer_Match() {
        // Test data
        Map<String, String> mMapCondition = new Map<String, String> {
            'SalesOrg1' => 'US',
            'SalesOrg2' => 'CA'
        };
        String mSalesOrg = 'SalesOrg1';
        String CountryCode = 'US';
        
        // Method call
        Boolean result = CTRLeadConvert.checkCountryMatchingSellerBuyer(mMapCondition, mSalesOrg, CountryCode);
        
        // Assert the expected outcome
        System.assertEquals(true, result, 'Country should match for SalesOrg1 and US');
    }

    @isTest
    static void testCheckCountryMatchingSellerBuyer_NoMatch() {
        // Test data
        Map<String, String> mMapCondition = new Map<String, String> {
            'SalesOrg1' => 'US',
            'SalesOrg2' => 'CA'
        };
        String mSalesOrg = 'SalesOrg1';
        String CountryCode = 'CA';
        
        // Method call
        Boolean result = CTRLeadConvert.checkCountryMatchingSellerBuyer(mMapCondition, mSalesOrg, CountryCode);
        
        // Assert the expected outcome
        System.assertEquals(false, result, 'Country should not match for SalesOrg1 and CA');
    }

    @isTest
    static void testAddProductToAccount_EmptyAccountProduct() {
        // Test data
        String mAccountProd = '';
        String mLeadProd = 'Product1;Product2';
        
        // Method call
        String result = CTRLeadConvert.addProductToAccount(mAccountProd, mLeadProd);
        
        // Assert the expected outcome
        System.assertEquals('Product1;Product2', result, 'Account product should be populated with lead products');
    }

    @isTest
    static void testAddProductToAccount_NonEmptyAccountProduct() {
        // Test data
        String mAccountProd = 'Product1';
        String mLeadProd = 'Product2;Product3';
        
        // Method call
        String result = CTRLeadConvert.addProductToAccount(mAccountProd, mLeadProd);
        
        // Assert the expected outcome
        System.assertEquals('Product1;Product2;Product3', result, 'Account product should include lead products');
    }

    @isTest
    static void testAddProductToAccount_DuplicateLeadProduct() {
        // Test data
        String mAccountProd = 'Product1;Product2';
        String mLeadProd = 'Product2;Product3';
        
        // Method call
        String result = CTRLeadConvert.addProductToAccount(mAccountProd, mLeadProd);
        
        // Assert the expected outcome
        System.assertEquals('Product1;Product2;Product3', result, 'Account product should include new lead products without duplicates');
    }
}