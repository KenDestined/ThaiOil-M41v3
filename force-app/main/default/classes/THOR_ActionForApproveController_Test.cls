@isTest
public class THOR_ActionForApproveController_Test {
    @TestSetup
    static void makeData() {
        Checked_Sheet_Pointer__mdt formType = [
            SELECT Id, MasterLabel, DeveloperName, Form_Code__c
            FROM Checked_Sheet_Pointer__mdt
            WHERE DeveloperName LIKE '%Tank%'
            LIMIT 1
        ];
        
        Checked_Sheet_Pointer__mdt enrm_002 = [
            SELECT Id, MasterLabel, DeveloperName, Form_Code__c
            FROM Checked_Sheet_Pointer__mdt
            WHERE Form_Code__c = 'EQCC-ENRM-002'
            LIMIT 1
        ];
        
        Checked_Sheet_Pointer__mdt enrm_006 = [
            SELECT Id, MasterLabel, DeveloperName, Form_Code__c
            FROM Checked_Sheet_Pointer__mdt
            WHERE Form_Code__c = 'EQCC-ENRM-006'
            LIMIT 1
        ];
        
        Master_Map_Set__c mms = new Master_Map_Set__c();
        insert mms;
        
        Master_Map__c mm = new Master_Map__c();
        mm.Name = 'ENMA-E';
        mm.Code__c = 'ENMA-E';
        mm.Description__c = 'TPX ELECTRICAL AREA-F';
        mm.Type__c = 'Main Work Center';
        mm.Master_Map_Set__c = mms.Id;
        insert mm;
        
        Master_Map__c mm2 = new Master_Map__c();
        mm2.Name = '1200';
        mm2.Code__c = '1200';
        mm2.Description__c = 'TOP Sriracha Refinery';
        mm2.Type__c = 'Plant';
        mm2.Master_Map_Set__c = mms.Id;
        insert mm2;
        
        Functional_Location__c fl = new Functional_Location__c();
        fl.Name = '1234';
        fl.PlantSection__c = 'T1';
        fl.MainWorkCenter__c = mm.Id;
        fl.Maintenance_Plant__c = mm2.Id;
        insert fl;

        Equipment__c eq = new Equipment__c();
        eq.Name = '1234';
        eq.plantSection__c = 'T1';
        eq.mainWorkCenter__c = mm.Id;
        eq.maintenancePlant__c = mm2.Id;
        insert eq;
        
        EQCC_Header__c header = new EQCC_Header__c();
        header.FunctionalLocation__c = fl.Id;
        insert header;
        
        EQCC_Header__c header1 = new EQCC_Header__c();
        header1.FunctionalLocation__c = fl.Id;
        insert header1;
        
        EQCC_Header__c header2 = new EQCC_Header__c();
        header2.Equipment__c = eq.Id;
        insert header2;

        EQCC_Checked_Sheet__c checkedSheetToSubmit = new EQCC_Checked_Sheet__c(
            Name = 'Submit for approval',
            Form_Type__c = formType.DeveloperName,
            Sheet_Code__c = formType.Form_Code__c,
            Form_Questions__c = 5
        );
        insert checkedSheetToSubmit;

        EQCC_Checked_Sheet__c checkedSheetToApprove = new EQCC_Checked_Sheet__c(
            Name = 'Approve EQCC',
            Form_Type__c = formType.DeveloperName,
            Sheet_Code__c = formType.Form_Code__c,
            Form_Questions__c = 5
        );
        insert checkedSheetToApprove;

        EQCC_Checked_Sheet__c checkedSheetToReject = new EQCC_Checked_Sheet__c(
            Name = 'Reject EQCC',
            Form_Type__c = formType.DeveloperName,
            Sheet_Code__c = formType.Form_Code__c,
            Form_Questions__c = 5
        );
        insert checkedSheetToReject;

        EQCC_Checked_Sheet__c checkedSheetToSubmit1 = new EQCC_Checked_Sheet__c(
            Name = 'Submit for approval1',
            Form_Type__c = 'EQCC-ENRM-007',
            Sheet_Code__c = 'EQCC-ENRM-007',
            Form_Questions__c = 5
        );
        insert checkedSheetToSubmit1;
        /*EQCC_Checked_Sheet__c checkedSheetToApprove1 = new EQCC_Checked_Sheet__c(
            Name = 'Approve EQCC2',
            Form_Type__c = 'EQCC-ENRM-007',
            Sheet_Code__c = 'EQCC-ENRM-007'
        );
        insert checkedSheetToApprove1;

        EQCC_Checked_Sheet__c checkedSheetToReject1 = new EQCC_Checked_Sheet__c(
            Name = 'Reject EQCC2',
            Form_Type__c = 'EQCC-ENRM-007',
            Sheet_Code__c = 'EQCC-ENRM-007'
        );
        insert checkedSheetToReject1;*/
        
        EQCC_Checked_Sheet__c checkedSheetToSubmit2 = new EQCC_Checked_Sheet__c(
            Name = 'Submit for approval2',
            Form_Type__c = enrm_002.DeveloperName,
            Sheet_Code__c = enrm_002.Form_Code__c,
            Form_Questions__c = 5
        );
        insert checkedSheetToSubmit2;
        EQCC_Checked_Sheet__c checkedSheetToApprove2 = new EQCC_Checked_Sheet__c(
            Name = 'Approve EQCC2',
            Form_Type__c = enrm_002.DeveloperName,
            Sheet_Code__c = enrm_002.Form_Code__c,
            Form_Questions__c = 5
        );
        insert checkedSheetToApprove2;

        EQCC_Checked_Sheet__c checkedSheetToReject2 = new EQCC_Checked_Sheet__c(
            Name = 'Reject EQCC2',
            Form_Type__c = enrm_002.DeveloperName,
            Sheet_Code__c = enrm_002.Form_Code__c,
            Form_Questions__c = 5
        );
        insert checkedSheetToReject2;
        
        EQCC_Checked_Sheet__c checkedSheetToSubmit9 = new EQCC_Checked_Sheet__c(
            Name = 'Submit for approval9',
            Form_Type__c = enrm_006.DeveloperName,
            Sheet_Code__c = enrm_006.Form_Code__c,
            Form_Questions__c = 5
        );
        insert checkedSheetToSubmit9;
        EQCC_Checked_Sheet__c checkedSheetToApprove9 = new EQCC_Checked_Sheet__c(
            Name = 'Approve EQCC9',
            Form_Type__c = enrm_006.DeveloperName,
            Sheet_Code__c = enrm_006.Form_Code__c,
            Form_Questions__c = 5
        );
        insert checkedSheetToApprove9;

        EQCC_Checked_Sheet__c checkedSheetToReject9 = new EQCC_Checked_Sheet__c(
            Name = 'Reject EQCC9',
            Form_Type__c = enrm_006.DeveloperName,
            Sheet_Code__c = enrm_006.Form_Code__c,
            Form_Questions__c = 5
        );
        insert checkedSheetToReject9;

		List<Header_Sheet__c> headerSheets = new List<Header_Sheet__c>{
            new Header_Sheet__c(Header__c = header.Id, Sheet__c = checkedSheetToSubmit.Id),
            new Header_Sheet__c(Header__c = header.Id, Sheet__c = checkedSheetToApprove.Id),
            new Header_Sheet__c(Header__c = header.Id, Sheet__c = checkedSheetToReject.Id),
            new Header_Sheet__c(Header__c = header1.Id, Sheet__c = checkedSheetToSubmit9.Id),
            new Header_Sheet__c(Header__c = header1.Id, Sheet__c = checkedSheetToApprove9.Id),
            new Header_Sheet__c(Header__c = header1.Id, Sheet__c = checkedSheetToReject9.Id),
            new Header_Sheet__c(Header__c = header2.Id, Sheet__c = checkedSheetToSubmit2.Id),
            new Header_Sheet__c(Header__c = header2.Id, Sheet__c = checkedSheetToApprove2.Id),
            new Header_Sheet__c(Header__c = header2.Id, Sheet__c = checkedSheetToReject2.Id)
        };
        insert headerSheets;        

        List<EQCC_Step__c> steps = new List<EQCC_Step__c>();

        EQCC_Step__c submitStep = new EQCC_Step__c();
        submitStep.Name = 'submit';
        submitStep.Header_Sheet__c = headerSheets[0].Id;
        submitStep.Step_Number__c = 1;
        submitStep.Form_Code__c = formType.Form_Code__c;
        submitStep.Is_Current__c = true;
        submitStep.Status__c = 'Pending for approval';
        steps.add(submitStep);
        
        EQCC_Step__c submitStep1 = new EQCC_Step__c();
        submitStep1.Name = 'submit1';
        submitStep1.Header_Sheet__c = headerSheets[0].Id;
        submitStep1.Step_Number__c = 1;
        submitStep1.Form_Code__c = 'EQCC-ENRM-007';
        submitStep1.Is_Current__c = true;
        submitStep1.Status__c = 'Pending for approval';
        steps.add(submitStep1);

        EQCC_Step__c submitStep2 = new EQCC_Step__c();
        submitStep2.Name = 'submit2';
        submitStep2.Header_Sheet__c = headerSheets[0].Id;
        submitStep2.Step_Number__c = 1;
        submitStep2.Form_Code__c = 'EQCC-ENRM-002';
        submitStep2.Is_Current__c = true;
        submitStep2.Status__c = 'Pending for approval';
        steps.add(submitStep2);
        
        
        EQCC_Step__c submitStep3 = new EQCC_Step__c();
        submitStep3.Name = 'submit3';
        submitStep3.Header_Sheet__c = headerSheets[0].Id;
        submitStep3.Step_Number__c = 1;
        submitStep3.Form_Code__c = 'ENIM-QFR-006';
        submitStep3.Is_Current__c = true;
        submitStep3.Status__c = 'Pending for approval';
        steps.add(submitStep3);
        EQCC_Checked_Sheet__c checkedSheetToSubmit3 = new EQCC_Checked_Sheet__c(
            Name = 'Submit for approval3',
            Form_Type__c = 'ENIM-QFR-006',
            Sheet_Code__c = 'ENIM-QFR-006',
            Form_Questions__c = 5
        );
        insert checkedSheetToSubmit3;
        
        EQCC_Step__c submitStep4 = new EQCC_Step__c();
        submitStep4.Name = 'submit4';
        submitStep4.Header_Sheet__c = headerSheets[0].Id;
        submitStep4.Step_Number__c = 1;
        submitStep4.Form_Code__c = 'EQCC-ENMM-001';
        submitStep4.Is_Current__c = true;
        submitStep4.Status__c = 'Pending for approval';
        steps.add(submitStep4);
        EQCC_Checked_Sheet__c checkedSheetToSubmit4 = new EQCC_Checked_Sheet__c(
            Name = 'Submit for approval4',
            Form_Type__c = 'EQCC-ENMM-001',
            Sheet_Code__c = 'EQCC-ENMM-001',
            Form_Questions__c = 5
        );
        insert checkedSheetToSubmit4;
        
        EQCC_Step__c submitStep5 = new EQCC_Step__c();
        submitStep5.Name = 'submit5';
        submitStep5.Header_Sheet__c = headerSheets[0].Id;
        submitStep5.Step_Number__c = 1;
        submitStep5.Form_Code__c = 'ENEM-QFR-9050-GNR';
        submitStep5.Is_Current__c = true;
        submitStep5.Status__c = 'Pending for approval';
        steps.add(submitStep5);
        EQCC_Checked_Sheet__c checkedSheetToSubmit5 = new EQCC_Checked_Sheet__c(
            Name = 'Submit for approval5',
            Form_Type__c = 'ENEM-QFR-9050-GNR',
            Sheet_Code__c = 'ENEM-QFR-9050-GNR',
            Form_Questions__c = 5
        );
        insert checkedSheetToSubmit5;
        
        EQCC_Step__c submitStep6 = new EQCC_Step__c();
        submitStep6.Name = 'submit6';
        submitStep6.Header_Sheet__c = headerSheets[0].Id;
        submitStep6.Step_Number__c = 1;
        submitStep6.Form_Code__c = 'ENSA-QFR-01';
        submitStep6.Is_Current__c = true;
        submitStep6.Status__c = 'Pending for approval';
        steps.add(submitStep6);
        EQCC_Checked_Sheet__c checkedSheetToSubmit6 = new EQCC_Checked_Sheet__c(
            Name = 'Submit for approval6',
            Form_Type__c = 'ENSA-QFR-01',
            Sheet_Code__c = 'ENSA-QFR-01',
            Form_Questions__c = 5
        );
        insert checkedSheetToSubmit6;
        
        EQCC_Step__c submitStep7 = new EQCC_Step__c();
        submitStep7.Name = 'submit7';
        submitStep7.Header_Sheet__c = headerSheets[0].Id;
        submitStep7.Step_Number__c = 1;
        submitStep7.Form_Code__c = 'ENEM-QFR-2604-REL';
        submitStep7.Is_Current__c = true;
        submitStep7.Status__c = 'Pending for approval';
        steps.add(submitStep7);
        EQCC_Checked_Sheet__c checkedSheetToSubmit7 = new EQCC_Checked_Sheet__c(
            Name = 'Submit for approval7',
            Form_Type__c = 'ENEM-QFR-2604-REL',
            Sheet_Code__c = 'ENEM-QFR-2604-REL',
            Form_Questions__c = 5
        );
        insert checkedSheetToSubmit7;
        
        EQCC_Step__c submitStep8 = new EQCC_Step__c();
        submitStep8.Name = 'submit8';
        submitStep8.Header_Sheet__c = headerSheets[0].Id;
        submitStep8.Step_Number__c = 1;
        submitStep8.Form_Code__c = 'EQCC-ENRM-001';
        submitStep8.Is_Current__c = true;
        submitStep8.Status__c = 'Pending for approval';
        steps.add(submitStep8);
        EQCC_Checked_Sheet__c checkedSheetToSubmit8 = new EQCC_Checked_Sheet__c(
            Name = 'Submit for approval8',
            Form_Type__c = 'EQCC-ENRM-001',
            Sheet_Code__c = 'EQCC-ENRM-001',
            Form_Questions__c = 5
        );
        insert checkedSheetToSubmit8;
        
        EQCC_Step__c submitStep9 = new EQCC_Step__c();
        submitStep9.Name = 'submit9';
        submitStep9.Header_Sheet__c = headerSheets[3].Id;
        submitStep9.Step_Number__c = 1;
        submitStep9.Form_Code__c = 'EQCC-ENRM-006';
        submitStep9.Is_Current__c = true;
        submitStep9.Status__c = 'Pending for approval';
        steps.add(submitStep9);

        EQCC_Step__c approveStep = new EQCC_Step__c();
        approveStep.Name = 'approve';
        approveStep.Header_Sheet__c = headerSheets[1].Id;
        approveStep.Step_Number__c = 1;
        approveStep.Form_Code__c = formType.Form_Code__c;
        approveStep.Is_Current__c = true;
        approveStep.Status__c = 'Pending for approval';
        steps.add(approveStep);

        EQCC_Step__c rejectStep = new EQCC_Step__c();
        rejectStep.Name = 'reject';
        rejectStep.Header_Sheet__c = headerSheets[2].Id;
        rejectStep.Step_Number__c = 1;
        rejectStep.Form_Code__c = formType.Form_Code__c;
        rejectStep.Is_Current__c = true;
        rejectStep.Status__c = 'Pending for approval';
        steps.add(rejectStep);

        insert steps;

        EQCC_Step__c stepToApprove = [
            SELECT Id, Header_Sheet__c, Form_Code__c
            FROM EQCC_Step__c
            WHERE Header_Sheet__r.Sheet__r.Name LIKE 'Approve EQCC'
            LIMIT 1
        ];
        
        EQCC_Step__c stepToApprove2 = [
            SELECT Id, Header_Sheet__c, Form_Code__c
            FROM EQCC_Step__c
            WHERE Form_Code__c = 'EQCC-ENRM-006'
            LIMIT 1
        ];
        EQCC_Step__c secondStep2 = new EQCC_Step__c(
            Name = 'Test Approve2',
            Step_Number__c = 1,
            Header_Sheet__c = stepToApprove2.Header_Sheet__c,
            Form_Code__c = stepToApprove2.Form_Code__c,
            Is_Current__c = false
        );
        insert secondStep2;
        
        EQCC_Step__c secondStep = new EQCC_Step__c(
            Name = 'Test Approve',
            Step_Number__c = 2,
            Header_Sheet__c = stepToApprove.Header_Sheet__c,
            Form_Code__c = stepToApprove.Form_Code__c,
            Is_Current__c = false
        );

        insert secondStep;
        
        OPP_Application__c app = new OPP_Application__c();
        app.Name = 'THOR';
        insert app;
        
        
    }

    private static void createHeirarchyUsers() {
        String orgId = UserInfo.getOrganizationId();
        String dateString = String.valueOf(Datetime.now()).replace(' ', '').replace(':', '').replace('-', '');
        Integer randomInt = Integer.valueOf(Math.rint(Math.random() * 1000000));
        String uniqueName = orgId + dateString + randomInt;

        randomInt = Integer.valueOf(Math.rint(Math.random() * 1000000));
        uniqueName = orgId + dateString + randomInt;
        User cuser = new User(
            FirstName = 'test',
            LastName = 'user',
            Email = uniqueName + '@test' + orgId + '.org',
            Username = uniqueName + '@test' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User']
            .Id,
            UserRoleId = [SELECT Id FROM UserRole WHERE Name LIKE '%APU-A%rdinat%ENMA-E%' LIMIT 1]
            .Id
        );
        insert cuser;
        
        User cuserI = new User(
            FirstName = 'testII',
            LastName = 'userII',
            Email = uniqueName + '@testII' + orgId + '.org',
            Username = uniqueName + '@testII' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User']
            .Id,
            UserRoleId = [SELECT Id FROM UserRole WHERE Name LIKE '%APU-A%rdinat%ENMA-I%' LIMIT 1]
            .Id,
            Role_Approve_process__c = 'TOP THOR APU-A Working Team-ENMA-I/TOC-1'

        );
        insert cuserI;

        randomInt = Integer.valueOf(Math.rint(Math.random() * 1000000));
        uniqueName = orgId + dateString + randomInt;
        User luser = new User(
            FirstName = 'test',
            LastName = 'user',
            Email = uniqueName + '@test' + orgId + '.org',
            Username = uniqueName + '@test' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User']
            .Id,
            UserRoleId = [SELECT Id FROM UserRole WHERE Name LIKE '%APU-A%Team Lead%-E/%TOC-1%' LIMIT 1]
            .Id
        );
        insert luser;
        
        randomInt = Integer.valueOf(Math.rint(Math.random() * 1000000));
        uniqueName = orgId + dateString + randomInt;
        User luser2 = new User(
            FirstName = 'test2',
            LastName = 'user2',
            Email = uniqueName + '@test2' + orgId + '.org',
            Username = uniqueName + '@test2' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User']
            .Id,
            UserRoleId = [SELECT Id FROM UserRole WHERE Name LIKE '%TOP THOR ENRM Manager%' LIMIT 1]
            .Id
        );
        insert luser2;
        
        User lFuser = new User(
            FirstName = 'testF',
            LastName = 'userF',
            Email = uniqueName + 'F@test' + orgId + '.org',
            Username = uniqueName + 'F@test' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = 'F'+uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User']
            .Id,
            UserRoleId = [SELECT Id FROM UserRole WHERE Name LIKE '%APU-F%Team Lead%' LIMIT 1]
            .Id
        );
        insert lFuser;
        
        User coUser = new User(
            FirstName = 'testCo',
            LastName = 'userCo',
            Email = uniqueName + 'Co@test' + orgId + '.org',
            Username = uniqueName + 'Co@test' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = 'co'+uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User']
            .Id,
            UserRoleId = [SELECT Id FROM UserRole WHERE Name LIKE '%Team-ENRM-Inspection%' LIMIT 1]
            .Id
        );
        insert coUser;
        
        User coENTSUser = new User(
            FirstName = 'testCoENTS',
            LastName = 'userCoENTS',
            Email = uniqueName + 'CoENTS@test' + orgId + '.org',
            Username = uniqueName + 'CoENTS@test' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = 'E'+uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User']
            .Id,
            UserRoleId = [SELECT Id FROM UserRole WHERE Name LIKE '%ENTS Working Team-ENTS%' LIMIT 1]
            .Id
        );
        insert coENTSUser;

        randomInt = Integer.valueOf(Math.rint(Math.random() * 1000000));
        uniqueName = orgId + dateString + randomInt;
        User muser = new User(
            FirstName = 'test',
            LastName = 'user',
            Email = uniqueName + '@test' + orgId + '.org',
            Username = uniqueName + '@test' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User']
            .Id,
            UserRoleId = [SELECT Id FROM UserRole WHERE Name LIKE '%APU-A%Working Team-ENMA-M/%TOC-1%' LIMIT 1]
            .Id
        );
        insert muser;
        
        User muser2 = new User(
            FirstName = 'test2',
            LastName = 'user2',
            Email = uniqueName + '@test2' + orgId + '.org',
            Username = uniqueName + '@test2' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User']
            .Id,
            UserRoleId = [SELECT Id FROM UserRole WHERE Name LIKE '%APU-A%Working Team-ENMA-M/TOC-2%' LIMIT 1]
            .Id
        );
        insert muser2;
        
        User iuser = new User(
            FirstName = 'testi',
            LastName = 'useri',
            Email = uniqueName + '@testi' + orgId + '.org',
            Username = uniqueName + '@testi' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User']
            .Id,
            UserRoleId = [SELECT Id FROM UserRole WHERE Name LIKE '%APU-A%Working Team-ENMA-I/%TOC-1%' LIMIT 1]
            .Id,
            Role_Approve_process__c = 'TOP THOR APU-A Working Team-ENMA-I/TOC-1'
        );
        insert iuser;
        
        User euser = new User(
            FirstName = 'teste',
            LastName = 'usere',
            Email = uniqueName + '@teste' + orgId + '.org',
            Username = uniqueName + '@teste' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User']
            .Id,
            UserRoleId = [SELECT Id FROM UserRole WHERE Name LIKE '%APU-A%Working Team-ENMA-E/%TOC-1%' LIMIT 1]
            .Id
        );
        insert euser;
        
        User leaduser = new User(
            FirstName = 'testl',
            LastName = 'userl',
            Email = uniqueName + '@testl' + orgId + '.org',
            Username = uniqueName + '@testl' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User']
            .Id,
            UserRoleId = [SELECT Id FROM UserRole WHERE Name LIKE '%APU-A%Team Lead-ENMA-M/%TOC-1%' LIMIT 1]
            .Id
        );
        insert leaduser;
        
        User leaduserI = new User(
            FirstName = 'testlI',
            LastName = 'userlI',
            Email = uniqueName + '@testlI' + orgId + '.org',
            Username = uniqueName + '@testlI' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User']
            .Id,
            UserRoleId = [SELECT Id FROM UserRole WHERE Name LIKE '%APU-A%Team Lead-ENMA-I/%TOC-1%' LIMIT 1]
            .Id
        );
        insert leaduserI;
        
        User leaduser2 = new User(
            FirstName = 'testl2',
            LastName = 'userl2',
            Email = uniqueName + '@testl2' + orgId + '.org',
            Username = uniqueName + '@testl2' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User']
            .Id,
            UserRoleId = [SELECT Id FROM UserRole WHERE Name LIKE '%APU-A%Team Lead-ENMA-M/TOC-2%' LIMIT 1]
            .Id
        );
        insert leaduser2;
    }

    /**
     * @given a EQCC_Step__c record Id
     * @when getting a list of steps for approval
     * @then a Map of Step information of steps in approval is returned
     */
    @isTest
    public static void testGetApprovalSteps() {
        EQCC_Step__c step = getMockStep('submit');

        createHeirarchyUsers();
        User me = [
            SELECT Id
            FROM User //%APU-A%Working Team-ENMA-M/%TOC-1%
            WHERE UserRole.Name LIKE '%APU-A%Working Team-ENMA-I/%TOC-1%' AND isActive = TRUE
            LIMIT 1
        ];

        Test.startTest();
        System.runAs(me) {
            THOR_ApprovalFlowService.submitForApproval(step.Id, null);
        }
        List<Map<String, String>> testData = THOR_ActionForApproveController.getApprovalSteps(step.Id);
        Test.stopTest();

        List<ProcessInstance> pis = [SELECT Id FROM ProcessInstance WHERE TargetObjectId = :step.Id];
    }

    /**
     * @given a EQCC_Step__c record Id
     * @when getting a list of steps for approval
     * @then a Map of Step information of steps in approval is returned
     */
    @isTest
    public static void testIfApproverCanApprove() {
        EQCC_Step__c theStep = getMockStep('approve');

        createHeirarchyUsers();
        User me = [
            SELECT Id
            FROM User
            WHERE UserRole.Name LIKE '%APU-A%Working Team-ENMA-I/%TOC-1%' AND isActive = TRUE
            LIMIT 1
        ];
        User teamlead = [SELECT Id FROM User WHERE UserRole.Name LIKE '%APU-A%Team Lead%ENMA-E%' AND isActive = TRUE LIMIT 1];

        System.runAs(me) {
            THOR_ApprovalFlowService.submitForApproval(theStep.Id, null);
        }

        Test.startTest();
        Boolean canApprove = false;
        System.runAs(teamlead) {
            canApprove = THOR_ActionForApproveController.canApprove(theStep.Id);
        }
        Test.stopTest();
    }

    /**
     * @given a EQCC_Step__c record Id
     * @when approving a submitted step
     * @then approve the step and return true on success
     */
    /*@isTest
    public static void testApprove() {
        EQCC_Step__c theStep = getMockStep('approve');

        createHeirarchyUsers();
        User me = [
            SELECT Id
            FROM User
            WHERE UserRole.Name LIKE '%APU-A%Working Team-ENMA-E/%TOC-1%' AND isActive = TRUE
            LIMIT 1
        ];
        User teamlead = [SELECT Id FROM User WHERE UserRole.Name LIKE '%APU-A%Team Lead%ENMA-E%' AND isActive = TRUE LIMIT 1];

        Test.startTest();
        System.runAs(me) {
            THOR_ApprovalFlowService.submitForApproval(theStep.Id, null);
        }

        
        Boolean submitted = false;
        //System.runAs(coord) {
            submitted = THOR_ActionForApproveController.approveOrReject(theStep.Id, 'Approve', 'Test Comments');
        //}
        Test.stopTest();
    }*/

    /**
     * @given a EQCC_Step__c record Id
     * @when rejecting a submitted step
     * @then reject the step and return true on success
     */
    /*@isTest
    public static void testReject() {
        EQCC_Step__c theStep = getMockStep('approve');

        createHeirarchyUsers();
        User me = [
            SELECT Id
            FROM User
            WHERE UserRole.Name LIKE '%APU-A%Working Team-ENMA-E/%TOC-1%' AND isActive = TRUE
            LIMIT 1
        ];
        User coord = [SELECT Id FROM User WHERE UserRole.Name LIKE '%APU-A%rdinat%ENMA-E%' AND isActive = TRUE LIMIT 1];

        Test.startTest();
            System.runAs(me) {
                THOR_ApprovalFlowService.submitForApproval(theStep.Id, null);
            }
        
		
            Boolean submitted = false;
            System.runAs(coord) {
                submitted = THOR_ActionForApproveController.approveOrReject(theStep.Id, 'Reject', 'Test Comments');
            }
        Test.stopTest();
        
        List<ProcessInstance> pis = [SELECT Id FROM ProcessInstance WHERE TargetObjectId = :theStep.Id];
    }*/
    
    @isTest
    static void testGetRejectedHeaderSheet() {
        EQCC_Header__c header = new EQCC_Header__c();
        insert header;
        
        Checked_Sheet_Pointer__mdt formType = [
            SELECT Id, MasterLabel, DeveloperName, Form_Code__c, Form_Questions__c, Form_Name__c
            FROM Checked_Sheet_Pointer__mdt
            WHERE DeveloperName LIKE '%Tank%'
            LIMIT 1
        ];
        
        EQCC_Checked_Sheet__c sheet = new EQCC_Checked_Sheet__c(
            Name = 'Sheet ',
            Form_Name__c = formType.Form_Name__c,
            Form_Type__c = formType.DeveloperName,
            Sheet_Code__c = formType.Form_Code__c,
            Form_Questions__c = formType.Form_Questions__c,
            Group_Task__c = 'Task',
            Group_Count__c = 'Count'
        );
        
        insert sheet;
        
        Header_Sheet__c headerSheet = new Header_Sheet__c(Header__c = header.Id, Sheet__c = sheet.Id);
        insert headerSheet;
        
        EQCC_Step__c step = new EQCC_Step__c(
            Header_Sheet__c = headerSheet.Id,
            Status__c = Constants.PROCESS.STATUS_REJECTED,
            Step_Number__c = 1,
            Form_Code__c = 'Code'
        );
        insert step;
        
        Header_Sheet__c rejectedHeaderSheet;
        Test.startTest();
        rejectedHeaderSheet = THOR_ActionForApproveController.getRejectedHeaderSheet(step.Id);
        Test.stopTest();
    }
    
    /*@isTest
    static void testGetRejectedHeaderSheetNull() {
        EQCC_Header__c header = new EQCC_Header__c();
        insert header;
        
        Checked_Sheet_Pointer__mdt formType = [
            SELECT Id, MasterLabel, DeveloperName, Form_Code__c, Form_Questions__c, Form_Name__c
            FROM Checked_Sheet_Pointer__mdt
            WHERE DeveloperName LIKE '%Tank%'
            LIMIT 1
        ];
        
        EQCC_Checked_Sheet__c sheet = new EQCC_Checked_Sheet__c(
            Name = 'Sheet ',
            Form_Name__c = formType.Form_Name__c,
            Form_Type__c = formType.DeveloperName,
            Sheet_Code__c = formType.Form_Code__c,
            Form_Questions__c = formType.Form_Questions__c,
            Group_Task__c = 'Task',
            Group_Count__c = 'Count'
        );
        
        insert sheet;
        
        Header_Sheet__c headerSheet = new Header_Sheet__c(Header__c = header.Id, Sheet__c = sheet.Id);
        insert headerSheet;
        
        EQCC_Step__c step = new EQCC_Step__c(
            Header_Sheet__c = headerSheet.Id,
            Status__c = Constants.PROCESS.STATUS_REJECTED,
            Step_Number__c = 1,
            Form_Code__c = 'Code'
        );
        insert step;
        
        Header_Sheet__c rejectedHeaderSheet;
        Test.startTest();
        rejectedHeaderSheet = THOR_ActionForApproveController.getRejectedHeaderSheet(null);
        Test.stopTest();
        
        System.assert(rejectedHeaderSheet == null, 'No Rejected Header Sheet should be retrieved');
    }*/
    
    @isTest
    static void testReassign() {
        EQCC_Step__c theStep = getMockStep('approve');

        createHeirarchyUsers();
        User me = [
            SELECT Id
            FROM User
            WHERE UserRole.Name LIKE '%APU-A%Working Team-ENMA-I/%TOC-1%' AND isActive = TRUE
            LIMIT 1
        ];
        User teamlead = [SELECT Id FROM User WHERE UserRole.Name LIKE '%APU-A%Team Lead%ENMA-I%' AND isActive = TRUE LIMIT 1];
		User coord = [SELECT Id FROM User WHERE UserRole.Name LIKE '%APU-A%rdinat%ENMA-I%' AND isActive = TRUE LIMIT 1];
        System.runAs(me) {
            THOR_ApprovalFlowService.submitForApproval(theStep.Id, null);
        }

        Test.startTest();
        Boolean reassigned = false;
        System.runAs(teamlead) {
            ProcessInstance approvalSteps = [
                    SELECT
                        Id,
                        Status,
                        CreatedDate,
                        CompletedDate,
                        TargetObjectId,
                        SubmittedBy.Name,
                        (
                            SELECT
                                Id,
                                StepStatus,
                                Actor.Id,
                                OriginalActor.Name,
                                ElapsedTimeInDays,
                                ElapsedTimeInMinutes,
                                CreatedDate,
                                ProcessNodeId,
                                ProcessNode.Name,
                                Comments
                            FROM StepsAndWorkitems
                            ORDER BY StepStatus DESC
                        )
                    FROM ProcessInstance
                    WHERE TargetObjectId = :theStep.Id
                    ORDER BY CreatedDate DESC, Status DESC LIMIT 1
                ];
        }
        
        System.runAs(coord) {
            reassigned = THOR_ActionForApproveController.reassign(theStep.Id, String.valueOf(teamlead.Id));
        }
        Test.stopTest();
        
        ProcessInstance pi = [SELECT TargetObjectId, CreatedDate FROM ProcessInstance WHERE TargetObjectId = :theStep.Id];
    }

    private static EQCC_Step__c getMockStep(String name) {
        return [SELECT Id FROM EQCC_Step__c WHERE Name = :name LIMIT 1];
    }
}