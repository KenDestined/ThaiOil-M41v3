@isTest
public with sharing class CTRCheckDueDiligenceControllerTest {

    @TestSetup
    static void makeData(){
        
 	    Master_Map__c masterMap = new Master_Map__c();
        masterMap.Code__c ='TH';
        masterMap.Type__c = 'Country';
        insert masterMap;
        
		Account newAcc = new Account();
        newAcc.Name = 'Test Acc';
        newAcc.AccountNumber = '0001';
        newAcc.AccountNumber__c = '0001';
        newAcc.CompanyNameENF__c = 'Test Acc';
        insert newAcc;
        
        CTRRequestFormHeader__c reqFormHeader = new CTRRequestFormHeader__c();
        reqFormHeader.Name ='Test Header';
        // reqFormHeader.CountryCode__c = 'TH';
        reqFormHeader.Country__c = masterMap.Id; //TH
        reqFormHeader.Customer__c = newAcc.id;
        reqFormHeader.CEOFirstName__c = 'FName';
        reqFormHeader.CEOLastName__c = 'LName';
        insert reqFormHeader;

        CTRCDDSanction__c codSanction = new CTRCDDSanction__c();
        codSanction.Account__c = newAcc.Id;
        codSanction.RequestFormHeader__c = reqFormHeader.Id;
        codSanction.Type__c = 'GProcurement';
        codSanction.FindingWeb__c = 'Found';
        codSanction.IntegrationStatus__c = 'Success';
        codSanction.IntegrationMessage__c = 'Success';
        insert codSanction;

        CTRShareholder__c shareHolder = new CTRShareholder__c();
        shareHolder.Name = 'Test';
        shareHolder.of_Shareholder__c = 10;
        shareHolder.Customer__c = newAcc.Id;
        shareHolder.CTRRequestFormHeader__c = reqFormHeader.Id;
        insert shareHolder;
        
        List<CTRRequestFormItem__c> reqList = new List<CTRRequestFormItem__c>();
 	    CTRRequestFormItem__c  reqFormItem = new CTRRequestFormItem__c();
        reqFormItem.Name ='Test';
        reqFormItem.CTRRequestFormHeader__c = reqFormHeader.Id;
        reqList.add(reqFormItem);
        
 	    CTRRequestFormItem__c  reqFormItem4 = new CTRRequestFormItem__c();
        reqFormItem4.Name ='Test4';
        reqFormItem4.CTRRequestFormHeader__c = reqFormHeader.Id;
        reqList.add(reqFormItem4);
        
 	    // CTRRequestFormItem__c  reqFormItem11 = new CTRRequestFormItem__c();
        // reqFormItem11.Name ='Test11';
        // reqFormItem11.CTRRequestFormHeader__c = reqFormHeader.Id;
        // reqList.add(reqFormItem11);
        
 	    // CTRRequestFormItem__c  reqFormItem5 = new CTRRequestFormItem__c();
        // reqFormItem5.Name ='Test5';
        // reqFormItem5.CTRRequestFormHeader__c = reqFormHeader.Id;
        // reqList.add(reqFormItem5);

        CTRRequestFormItem__c  reqFormItem6 = new CTRRequestFormItem__c();
        reqFormItem6.Name ='Test6';
        reqFormItem6.CTRRequestFormHeader__c = reqFormHeader.Id;
        reqFormItem6.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('CustomerExtend').getRecordTypeId();
        reqFormItem6.SalesOrganization__c = '1100';
        reqFormItem6.RiskLevelbySystem__c = 'Low Risk';
        reqFormItem6.RiskLevelbyTRCR__c = 'Medium Risk';
        reqFormItem6.RiskLevelbyCPXX__c = 'Low Risk';
        reqList.add(reqFormItem6);

        CTRRequestFormItem__c  reqFormItem7 = new CTRRequestFormItem__c();
        reqFormItem7.Name ='Test7';
        reqFormItem7.CTRRequestFormHeader__c = reqFormHeader.Id;
        reqFormItem7.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('CustomerInitial').getRecordTypeId();
        reqFormItem7.SalesOrganization__c = '1100';
        reqFormItem7.RiskLevelbySystem__c = 'Low Risk';
        reqFormItem7.RiskLevelbyTRCR__c = 'Medium Risk';
        reqFormItem7.RiskLevelbyCPXX__c = 'Low Risk';
        reqList.add(reqFormItem7);

        CTRRequestFormItem__c  reqFormItem8 = new CTRRequestFormItem__c();
        reqFormItem8.Name ='Test8';
        reqFormItem8.CTRRequestFormHeader__c = reqFormHeader.Id;
        reqFormItem8.RecordTypeId = Schema.SObjectType.CTRRequestFormItem__c.getRecordTypeInfosByDeveloperName().get('ShipToCreate').getRecordTypeId();
        reqFormItem8.SalesOrganization__c = '1100';
        reqFormItem8.RiskLevelbySystem__c = 'Low Risk';
        reqFormItem8.RiskLevelbyTRCR__c = 'Medium Risk';
        reqFormItem8.RiskLevelbyCPXX__c = 'Low Risk';
        reqList.add(reqFormItem8);
        insert reqList;

        
 	    CTR_RiskCountry__c  riskCountry = new CTR_RiskCountry__c();
        riskCountry.CountryCode__c ='TH';
        riskCountry.Version__c = 'Oct2566';
        riskCountry.CountryName__c = '';
        riskCountry.Level__c = '3';
        riskCountry.LevelText__c = 'Test';
        riskCountry.Key__c = 'THOct2566';
        insert riskCountry;
        
        
        CTRDueDiligenceTemplate__c testDueDiligenceParent = new CTRDueDiligenceTemplate__c(
        	Name  = 'LEVEL3_2_2',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,
			AnswerCode__c  = 'AC06'
		);
        insert testDueDiligenceParent;

                
        CTRDueDiligenceTemplate__c testDueDiligenceChild = new CTRDueDiligenceTemplate__c(
        	Name  = 'LEVEL3_2_2',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,
			AnswerCode__c  = 'AC06',
            RecordTypes__c = 'CustomerInitial;CustomerExtend',
            Actor__c = 'NONE',
            Active__c =  true,
			Parent__c  = testDueDiligenceParent.Id
		);
        insert testDueDiligenceChild;

        CTRDueDiligenceTemplate__c testDueDiligenceChild2 = new CTRDueDiligenceTemplate__c(
        	Name  = 'LEVEL3_2_2',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,
			AnswerCode__c  = 'AC06',
            RecordTypes__c = 'CustomerInitial;CustomerExtend',
            Actor__c = 'NONE',
            Active__c =  true,
			Parent__c  = testDueDiligenceParent.Id
		);
        insert testDueDiligenceChild2;

        CTRDueDiligenceTemplate__c testDueDiligenceChild3 = new CTRDueDiligenceTemplate__c(
        	Name  = 'LEVEL3_2_2',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,
			AnswerCode__c  = 'AC06',
            RecordTypes__c = 'CustomerExtend',
            Actor__c = 'NONE',
            Active__c =  true
		);
        insert testDueDiligenceChild3;
        

        CTRDueDiligenceTemplate__c testDueDiligence6 = new CTRDueDiligenceTemplate__c(
			Name  = 'LEVEL3_2_2.6',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,	
			Position__c  = 2,
			HidePosition__c  = false,
			Parent__c  = testDueDiligenceParent.Id,
			ValueTH__c  = '<p>Test</p>',
			ValueEN__c  = '<p>Test</p>',
			LinkToNEWS__c  = false,
			AnswerCode__c  = 'AC06'
        );
        insert testDueDiligence6;
        
        CTRDueDiligenceTemplate__c testDueDiligence4 = new CTRDueDiligenceTemplate__c(
			Name  = 'LEVEL3_2_2.4',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,	
			Position__c  = 2,
			HidePosition__c  = false,
			Parent__c  = testDueDiligenceParent.Id,
			ValueTH__c  = '<p>Test</p>',
			ValueEN__c  = '<p>Test</p>',
			LinkToNEWS__c  = false,
			AnswerCode__c  = 'AC04'
        );
        insert testDueDiligence4;
        
        CTRDueDiligenceTemplate__c testDueDiligence5 = new CTRDueDiligenceTemplate__c(
			Name  = 'LEVEL3_2_2.5',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,	
			Position__c  = 2,
			HidePosition__c  = false,
			Parent__c  = testDueDiligenceParent.Id,
			ValueTH__c  = '<p>Test</p>',
			ValueEN__c  = '<p>Test</p>',
			LinkToNEWS__c  = false,
			AnswerCode__c  = 'AC05'
        );
        insert testDueDiligence5;
        
        CTRDueDiligenceTemplate__c testDueDiligence7 = new CTRDueDiligenceTemplate__c(
			Name  = 'LEVEL3_2_2.5',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,	
			Position__c  = 2,
			HidePosition__c  = false,
			Parent__c  = testDueDiligenceParent.Id,
			ValueTH__c  = '<p>Test</p>',
			ValueEN__c  = '<p>Test</p>',
			LinkToNEWS__c  = false,
			AnswerCode__c  = 'AC01'
        );
        insert testDueDiligence7;
        
        CTRDueDiligenceTemplate__c testDueDiligence8 = new CTRDueDiligenceTemplate__c(
			Name  = 'LEVEL3_2_2.5',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,	
			Position__c  = 2,
			HidePosition__c  = false,
			Parent__c  = testDueDiligenceParent.Id,
			ValueTH__c  = '<p>Test</p>',
			ValueEN__c  = '<p>Test</p>',
			LinkToNEWS__c  = false,
			AnswerCode__c  = 'AC02'
        );
        insert testDueDiligence8;
        
        CTRDueDiligenceTemplate__c testDueDiligence9 = new CTRDueDiligenceTemplate__c(
			Name  = 'LEVEL3_2_2.5',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,	
			Position__c  = 2,
			HidePosition__c  = false,
			Parent__c  = testDueDiligenceParent.Id,
			ValueTH__c  = '<p>Test</p>',
			ValueEN__c  = '<p>Test</p>',
			LinkToNEWS__c  = false,
			AnswerCode__c  = 'AC03'
        );
        insert testDueDiligence9;
        
        CTRDueDiligenceTemplate__c testDueDiligence10 = new CTRDueDiligenceTemplate__c(
			Name  = 'LEVEL3_2_2.5',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,	
			Position__c  = 2,
			HidePosition__c  = false,
			Parent__c  = testDueDiligenceParent.Id,
			ValueTH__c  = '<p>Test</p>',
			ValueEN__c  = '<p>Test</p>',
			LinkToNEWS__c  = false,
			AnswerCode__c  = 'AC07'
        );
        insert testDueDiligence10;
        
        CTRDueDiligenceTemplate__c testDueDiligence11 = new CTRDueDiligenceTemplate__c(
			Name  = 'LEVEL3_2_2.5',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,	
			Position__c  = 2,
			HidePosition__c  = false,
			Parent__c  = testDueDiligenceParent.Id,
			ValueTH__c  = '<p>Test</p>',
			ValueEN__c  = '<p>Test</p>',
			LinkToNEWS__c  = false,
			AnswerCode__c  = 'AC08'
        );
        insert testDueDiligence11;
        
        CTRDueDiligenceTemplate__c testDueDiligence12 = new CTRDueDiligenceTemplate__c(
			Name  = 'LEVEL3_2_2.5',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,	
			Position__c  = 2,
			HidePosition__c  = false,
			Parent__c  = testDueDiligenceParent.Id,
			ValueTH__c  = '<p>Test</p>',
			ValueEN__c  = '<p>Test</p>',
			LinkToNEWS__c  = false,
			AnswerCode__c  = 'AC09'
        );
        insert testDueDiligence12;
        
        CTRDueDiligenceTemplate__c testDueDiligence13 = new CTRDueDiligenceTemplate__c(
			Name  = 'LEVEL3_2_2.5',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,	
			Position__c  = 2,
			HidePosition__c  = false,
			Parent__c  = testDueDiligenceParent.Id,
			ValueTH__c  = '<p>Test</p>',
			ValueEN__c  = '<p>Test</p>',
			LinkToNEWS__c  = false,
			AnswerCode__c  = 'AC10'
        );
        insert testDueDiligence13;
        
        CTRDueDiligenceTemplate__c testDueDiligence14 = new CTRDueDiligenceTemplate__c(
			Name  = 'LEVEL3_2_2.5',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,	
			Position__c  = 2,
			HidePosition__c  = false,
			Parent__c  = testDueDiligenceParent.Id,
			ValueTH__c  = '<p>Test</p>',
			ValueEN__c  = '<p>Test</p>',
			LinkToNEWS__c  = false,
			AnswerCode__c  = 'AC11'
        );
        insert testDueDiligence14;
        
        CTRDueDiligenceTemplate__c testDueDiligence15 = new CTRDueDiligenceTemplate__c(
			Name  = 'LEVEL3_2_2.5',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,	
			Position__c  = 2,
			HidePosition__c  = false,
			Parent__c  = testDueDiligenceParent.Id,
			ValueTH__c  = '<p>Test</p>',
			ValueEN__c  = '<p>Test</p>',
			LinkToNEWS__c  = false,
			AnswerCode__c  = 'AC99'
        );
        insert testDueDiligence15;
        
        CTRDueDiligenceTemplate__c testDueDiligence16 = new CTRDueDiligenceTemplate__c(
			Name  = 'LEVEL3_2_2.11',
			BusinessUnit__c  = 'TOP',
			Level__c  = 3,	
			Position__c  = 2,
			HidePosition__c  = false,
			Parent__c  = testDueDiligenceParent.Id,
			ValueTH__c  = '<p>Test</p>',
			ValueEN__c  = '<p>Test</p>',
			LinkToNEWS__c  = false,
			AnswerCode__c  = 'AC04'
        );
        insert testDueDiligence16;
    }
    
	@isTest
    public static void testretrieveRiskLevel() {

		List<CTRRequestFormItem__c> testRecord =  [SELECT Id FROM CTRRequestFormItem__c WHERE recordType.name = 'New Customer'];
    
		Test.startTest();
        CTRCheckDueDiligenceController.retrieveRiskLevel(testRecord[0].Id);
        Test.stopTest();
    }

    @isTest
    public static void testretrieveRiskLevel2() {

		List<CTRRequestFormItem__c> testRecord =  [SELECT Id FROM CTRRequestFormItem__c WHERE recordType.developerName = 'ShipToCreate'];
    
		Test.startTest();
        CTRCheckDueDiligenceController.retrieveRiskLevel(testRecord[0].Id);
        Test.stopTest();
    }
	
	@isTest
    public static void testretrieveDueDiligenceResult() {
		List<CTRRequestFormItem__c> recIdRecord =  [SELECT Id FROM CTRRequestFormItem__c];

        CTR_RiskCountry__c  riskCountry = new CTR_RiskCountry__c();
        riskCountry.CountryCode__c ='TH';
        riskCountry.Version__c = 'Oct2566';
        riskCountry.CountryName__c = '';
        riskCountry.Level__c = '3';
        riskCountry.LevelText__c = 'Test';
        riskCountry.Key__c = 'THOct2566';
        insert riskCountry;
        
        Profile testProfile = [SELECT Id FROM Profile WHERE Name = 'System Administrator' LIMIT 1];
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
            Employee_Id__c = '08000288',
            LanguageLocaleKey = 'en_US'
        );
        insert testUser;

        Test.startTest();
        System.runAs(testUser) {
            for(CTRRequestFormItem__c eachItem : recIdRecord) {
                CTRCheckDueDiligenceController.retrieveDueDiligenceResult(eachItem.Id, true);
                // CTRCheckDueDiligenceController.retrieveDueDiligenceResult(eachItem.Id, false);
            }
        	// CTRCheckDueDiligenceController.retrieveDueDiligenceResult(recIdRecord[0].Id, true);
        	// CTRCheckDueDiligenceController.retrieveDueDiligenceResult(recIdRecord[1].Id, true);
        	// CTRCheckDueDiligenceController.retrieveDueDiligenceResult(recIdRecord[2].Id, true);
        	// CTRCheckDueDiligenceController.retrieveDueDiligenceResult(recIdRecord[3].Id, true);

        	// CTRCheckDueDiligenceController.retrieveDueDiligenceResult(recIdRecord[0].Id, false);
        	// CTRCheckDueDiligenceController.retrieveDueDiligenceResult(recIdRecord[1].Id, false);
        	// CTRCheckDueDiligenceController.retrieveDueDiligenceResult(recIdRecord[2].Id, false);
        	// CTRCheckDueDiligenceController.retrieveDueDiligenceResult(recIdRecord[3].Id, false);
        }
        Test.stopTest();
	}
	
	@isTest
    public static void testretrieveBusinessUnitFromProfile() {
		List<CTRRequestFormItem__c> recIdRecord =  [SELECT Id,Name FROM CTRRequestFormItem__c];
        System.Debug('document ---->'+ recIdRecord);
		        
		Test.startTest();
        CTRCheckDueDiligenceController.retrieveBusinessUnitFromProfile(recIdRecord[0].Id);
        Test.stopTest();
	}
	
	@isTest
    public static void testupdateDueDiligence() {
		List<CTRRequestFormItem__c> recIdRecordList =  [SELECT Id FROM CTRRequestFormItem__c];

        Map<String,Object> mapReqItem = new Map<String,Object>();
        mapReqItem.put('Id',recIdRecordList[0].Id);
        mapReqItem.put('Name','TestUpdate');

        String riskLevelInfo = JSON.serialize(mapReqItem);
        System.Debug('riskLevelInfo ---->'+ riskLevelInfo);	
 		
		Test.startTest();                                                               
		String JsonString = riskLevelInfo;
        System.debug('reqItem2 -----' + JsonString);
        CTRCheckDueDiligenceController.updateDueDiligence(JsonString);
         Test.stopTest();
	}
	
	@isTest
    public static void testretrieveDueDiligenceReviewSection() {
		List<CTRRequestFormItem__c> recIdRecord =  [SELECT Id FROM CTRRequestFormItem__c];
        System.Debug('document ---->'+ recIdRecord);
		        
		Test.startTest();
        CTRCheckDueDiligenceController.retrieveDueDiligenceReviewSection(recIdRecord[0].Id);
        Test.stopTest();
	}

    @isTest
    public static void testIsEnhancedDueDiligenceValid() {
        List<CTRRequestFormItem__c> recIdRecordList =  [SELECT Id FROM CTRRequestFormItem__c];
        CTRRequestFormItem__c recIdRecord = recIdRecordList[0];
        Boolean result = CTRCheckDueDiligenceController.isEnhancedDueDiligenceValid(recIdRecord.Id, 'CEO');

        System.assertEquals(true, result);

        recIdRecord.ApproveDueDiligenceResult__c = 'Approved';
        update recIdRecord;
        result = CTRCheckDueDiligenceController.isEnhancedDueDiligenceValid(recIdRecord.Id, 'CEO');
        System.assertEquals(false, result);
    }

    @isTest
    public static void testSaveActionViaEmail() {
        List<CTRRequestFormItem__c> recIdRecordList = [SELECT Id FROM CTRRequestFormItem__c];
        CTRRequestFormItem__c recIdRecord = recIdRecordList[0];
        Profile testProfile = [SELECT Id FROM Profile WHERE Name = 'System Administrator' LIMIT 1];
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
            LanguageLocaleKey = 'en_US',
            Employee_Id__c = '08000288'
        );
        insert testUser;

        String actionResult = 'Approved';
        String dueDiligenceComment = 'Due diligence passed';
        String actionBy = 'CEO';
        String result = CTRCheckDueDiligenceController.saveActionViaEmail(recIdRecord.Id, actionResult, dueDiligenceComment, actionBy, testUser.Id);
        System.assertEquals('success', result);
        
        recIdRecord = [SELECT ApproveDueDiligenceResult__c, ApproveDueDiligenceComment__c FROM CTRRequestFormItem__c WHERE Id = :recIdRecord.Id];
        System.assertEquals(actionResult, recIdRecord.ApproveDueDiligenceResult__c);
        System.assertEquals(dueDiligenceComment, recIdRecord.ApproveDueDiligenceComment__c);

        actionResult = 'Endorsed';
        dueDiligenceComment = 'Due diligence passed';
        actionBy = 'Endorsed';
        result = CTRCheckDueDiligenceController.saveActionViaEmail(recIdRecord.Id, actionResult, dueDiligenceComment, actionBy, testUser.Id);
        System.assertEquals('success', result);

        recIdRecord = [SELECT EVPCReviewEDDResult__c, EVPCReviewEDDComment__c FROM CTRRequestFormItem__c WHERE Id = :recIdRecord.Id];
        System.assertEquals(actionResult, recIdRecord.EVPCReviewEDDResult__c);
        System.assertEquals(dueDiligenceComment, recIdRecord.EVPCReviewEDDComment__c);
    }
	
	@isTest
    public static void testValidateActor() {
		List<CTRRequestFormItem__c> recIdRecord =  [SELECT Id FROM CTRRequestFormItem__c];
		
        Test.startTest();

 	    CTR_RiskCountry__c  riskCountry = new CTR_RiskCountry__c();
        riskCountry.CountryCode__c ='TH';
        riskCountry.Version__c = 'Oct2566';
        riskCountry.CountryName__c = '';
        riskCountry.Level__c = '3';
        riskCountry.LevelText__c = 'Test';
        riskCountry.Key__c = 'THOct2566';
        insert riskCountry;
        
        Profile testProfile = [SELECT Id FROM Profile WHERE Name = 'System Administrator' LIMIT 1];
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
            LanguageLocaleKey = 'en_US',
            Employee_Id__c = '08000288'
        );
        insert testUser;

        System.runAs(testUser) {
            for(CTRRequestFormItem__c eachItem : recIdRecord) {
                CTRCheckDueDiligenceController.validateActor(eachItem.Id, 'Trader', testUser.Id,'SubmitRegistration');
                CTRCheckDueDiligenceController.validateActor(eachItem.Id, 'Other', testUser.Id,'SubmitRegistration');
            }
        }
        Test.stopTest();
	}
}