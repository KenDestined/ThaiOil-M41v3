@isTest
public class ESS_FixAndGeneralNotification_Test {

    @testSetup
    public static void setup() {
        
        //Create user here
        User AdminPMSVUser = new User(
        ProfileId = [SELECT Id FROM Profile WHERE Name = 'Operation'].Id,
            LastName = 'PASSARAWAN',
            Email = 'testpassarawan@thaioilgroup.com',
            Username = 'testpassarawan@thaioilgroup.com' + System.currentTimeMillis(),
            CompanyName = 'Thaioil',
            Alias = 'PA',
            TimeZoneSidKey = 'America/Los_Angeles',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            FirstName_EN__c = 'Test',
            LastName_EN__c = 'Test',
            Position__c = 'Test'
            );
        insert(AdminPMSVUser);
        
        User AdminFixAndGeneralUser = new User(
        ProfileId = [SELECT Id FROM Profile WHERE Name = 'Operation'].Id,
            LastName = 'KIRANA',
            Email = 'testkirana@thaioilgroup.com',
            Username = 'testkirana@thaioilgroup.com' + System.currentTimeMillis(),
            CompanyName = 'Thaioil',
            Alias = 'KI',
            TimeZoneSidKey = 'America/Los_Angeles',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            FirstName_EN__c = 'Test',
            LastName_EN__c = 'Test',
            Position__c = 'Test'
            );
        insert(AdminFixAndGeneralUser);
        
        //Project Base (Employee PM Under Section Head)
        User EmployeeUser = new User(
        ProfileId = [SELECT Id FROM Profile WHERE Name = 'Operation'].Id,
            LastName = 'RAMON',
            Email = 'testramon@thaioilgroup.com',
            Username = 'testremon@thaioilgroup.com' + System.currentTimeMillis(),
            CompanyName = 'Thaioil',
            Alias = 'RA',
            TimeZoneSidKey = 'America/Los_Angeles',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            FirstName_EN__c = 'Test',
            LastName_EN__c = 'Test',
            Position__c = 'Test'
            );
        insert(EmployeeUser);
        
        User SectionHeadUser = new User(
        ProfileId = [SELECT Id FROM Profile WHERE Name = 'Operation'].Id,
            LastName = 'DAMRONG',
            Email = 'testdamrong@thaioilgroup.com',
            Username = 'testdamrong@thaioilgroup.com' + System.currentTimeMillis(),
            CompanyName = 'Thaioil',
            Alias = 'DA',
            TimeZoneSidKey = 'America/Los_Angeles',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            FirstName_EN__c = 'Test',
            LastName_EN__c = 'Test',
            Position__c = 'Test',
            Employee_Id__c = '00000001'
            );
        insert(SectionHeadUser);
        
        //Project Base (Employee PM Under Section Head) (On behalf of)
		User EmployeeUser2 = new User(
        ProfileId = [SELECT Id FROM Profile WHERE Name = 'Operation'].Id,
            LastName = 'RATRI',
            Email = 'testratri@thaioilgroup.com',
            Username = 'testratri@thaioilgroup.com' + System.currentTimeMillis(),
            CompanyName = 'Thaioil',
            Alias = 'RAT',
            TimeZoneSidKey = 'America/Los_Angeles',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            FirstName_EN__c = 'Test',
            LastName_EN__c = 'Test',
            Position__c = 'Test',
            Employee_Id__c = '00000002'
            );
        insert(EmployeeUser2);
        
        //Project Base (Employee PM Section Head Upward) (ปกติ)
        User SectionHeadUser2 = new User(
        ProfileId = [SELECT Id FROM Profile WHERE Name = 'Operation'].Id,
            LastName = 'SURAPHAN',
            Email = 'testsuraphan@thaioilgroup.com',
            Username = 'testsuraphan@thaioilgroup.com' + System.currentTimeMillis(),
            CompanyName = 'Thaioil',
            Alias = 'SU',
            TimeZoneSidKey = 'America/Los_Angeles',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            FirstName_EN__c = 'Test',
            LastName_EN__c = 'Test',
            Position__c = 'Test'
            );
        insert(SectionHeadUser2);
        
        User VPUser = new User(
        ProfileId = [SELECT Id FROM Profile WHERE Name = 'Operation'].Id,
            LastName = 'NARONGSAK',
            Email = 'testnarongsak@thaioilgroup.com',
            Username = 'testnarongsak@thaioilgroup.com' + System.currentTimeMillis(),
            CompanyName = 'Thaioil',
            Alias = 'NA',
            TimeZoneSidKey = 'America/Los_Angeles',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            FirstName_EN__c = 'Test',
            LastName_EN__c = 'Test',
            Position__c = 'Test'
            );
        insert(VPUser);
        
        //Insert PISUser
        insertPISUsers();
        
        //Insert Public Group
        insertPublicGroup();
        
        //Insert ESS_Config
        ESS_Config__c Config = new ESS_Config__c();
        Config.FixAndGeneral_Running_No__c = '0';
        insert(Config);
    }
    
    @future
    public static void insertPISUsers() {
        
        List<User> Users = [select id, alias, FirstName_EN__c, LastName_EN__c from User];
        
        Id RamonId; //Employee
        Id DamrongId; //Section Head
        Id RatriId; //
        Id SuraphanId;
        Id NarongsakId;
        Id AdminPEOCId;
        
        for(User U : Users) {
            if(U.alias == 'RA') {
                RamonId = U.Id;
            }
            else if(U.alias == 'DA') {
                DamrongId = U.Id;
            }
            else if(U.alias == 'RAT') {
                RatriId = U.Id;
            }
            else if(U.alias == 'SU') {
                SuraphanId = U.Id;
            }
            else if(U.alias == 'NA') {
                NarongsakId = U.Id;
            }
            else if(U.alias == 'KI') {
                AdminPEOCId = U.Id;
            }
        }
        
        PISUsers__c ramon = new PISUsers__c();
        ramon.Active__c = true;
        ramon.MAINPOSITION__c = true;
        ramon.EMPLOYEEID__c = '00000001';
        ramon.HOME_COMP__c = '1100';
        ramon.Name = 'Test Ramon';
        ramon.LEVEL__c = 'Junior';
        ramon.ORGID__c = '00000001';
        ramon.POSID__c = '00000001';
        ramon.ENFIRSTNAME__c = 'Test';
        ramon.ENLASTNAME__c = 'Test Ramon';
        ramon.HOLDERPOSITION__c = '00000001';
        ramon.EMAIL__c = 'testramon@thaioilgroup.com';
        ramon.User__c = RamonId;
        ramon.FUNCTION__c = 'AAAA';
        ramon.DEPARTMENT__c = 'BBBB';
        ramon.SECTIONS__c = 'CCCC';
        ramon.UNITS__c = 'DDDD';
        ramon.ReportToPOS__c = '00000002';
        ramon.ReportToID__c = '00000002';
        ramon.ReportToEmail__c = 'testdamrong@thaioilgroup.com';
        ramon.ReportToUser__c = DamrongId;
        ramon.SectHeadUpUser__c = DamrongId;
        ramon.SectHeadUpPosID__c = '00000002';
        ramon.Subcordinate__c = '[""]';
        insert(ramon);
        
        PISUsers__c damrong = new PISUsers__c();
        damrong.Active__c = true;
        damrong.MAINPOSITION__c = true;
        damrong.EMPLOYEEID__c = '00000002';
        damrong.HOME_COMP__c = '1600';
        damrong.Name = 'Test Damrong';
        damrong.LEVEL__c = 'Section Head';
        damrong.ORGID__c = '00000002';
        damrong.POSID__c = '00000002';
        damrong.ENFIRSTNAME__c = 'Test';
        damrong.ENLASTNAME__c = 'Test Damrong';
        damrong.HOLDERPOSITION__c = '00000002';
        damrong.EMAIL__c = 'testdamrong@thaioilgroup.com';
        damrong.User__c = DamrongId;
        damrong.ReportToPOS__c = '00000002';
        damrong.ReportToID__c = '00000002';
        damrong.ReportToEmail__c = 'testdamrong@thaioilgroup.com';
        damrong.ReportToUser__c = DamrongId;
        damrong.SectHeadUpUser__c = DamrongId;
        damrong.SectHeadUpPosID__c = '00000002';
        damrong.Subcordinate__c = '[""]';
        insert(damrong);
        
        PISUsers__c ratri = new PISUsers__c();
        ratri.Active__c = true;
        ratri.MAINPOSITION__c = true;
        ratri.EMPLOYEEID__c = '00000003';
        ratri.HOME_COMP__c = '1100';
        ratri.Name = 'Test Ratri';
        ratri.LEVEL__c = 'Section Head';
        ratri.ORGID__c = '00000003';
        ratri.POSID__c = '00000003';
        ratri.ENFIRSTNAME__c = 'Test';
        ratri.ENLASTNAME__c = 'Test Ratri';
        ratri.HOLDERPOSITION__c = '00000003';
        ratri.EMAIL__c = 'testratri@thaioilgroup.com';
        ratri.User__c = RatriId;
        ratri.ReportToPOS__c = '00000001';
        ratri.ReportToID__c = '00000001';
        ratri.ReportToEmail__c = 'testramon@thaioilgroup.com';
        ratri.ReportToUser__c = RamonId;
        ratri.SectHeadUpUser__c = RamonId;
        ratri.SectHeadUpPosID__c = '00000001';
        ratri.Subcordinate__c = '[""]';
        insert(ratri);
        
        PISUsers__c suraphan = new PISUsers__c();
        suraphan.Active__c = true;
        suraphan.MAINPOSITION__c = true;
        suraphan.EMPLOYEEID__c = '00000004';
        suraphan.HOME_COMP__c = '1100';
        suraphan.Name = 'Test Ratri';
        suraphan.LEVEL__c = 'Section Head';
        suraphan.ORGID__c = '00000004';
        suraphan.POSID__c = '00000004';
        suraphan.ENFIRSTNAME__c = 'Test';
        suraphan.ENLASTNAME__c = 'Test Suraphan';
        suraphan.HOLDERPOSITION__c = '00000004';
        suraphan.EMAIL__c = 'testsuraphan@thaioilgroup.com';
        suraphan.User__c = SuraphanId;
        suraphan.ReportToPOS__c = '00000001';
        suraphan.ReportToID__c = '00000001';
        suraphan.ReportToEmail__c = 'testramon@thaioilgroup.com';
        suraphan.ReportToUser__c = RamonId;
        suraphan.SectHeadUpUser__c = RamonId;
        suraphan.SectHeadUpPosID__c = '00000001';
        suraphan.Subcordinate__c = '[""]';
        insert(suraphan);
        
        PISUsers__c narongsak = new PISUsers__c();
        narongsak.Active__c = true;
        narongsak.MAINPOSITION__c = true;
        narongsak.EMPLOYEEID__c = '00000005';
        narongsak.HOME_COMP__c = '1100';
        narongsak.Name = 'Test Narongsak';
        narongsak.LEVEL__c = 'VP';
        narongsak.ORGID__c = '00000005';
        narongsak.POSID__c = '00000005';
        narongsak.ENFIRSTNAME__c = 'Test';
        narongsak.ENLASTNAME__c = 'Test Narongsak';
        narongsak.HOLDERPOSITION__c = '00000005';
        narongsak.EMAIL__c = 'testnarongsak@thaioilgroup.com';
        narongsak.User__c = NarongsakId;
        //suraphan.ReportToPOS__c = '00000001';
        //suraphan.ReportToID__c = '00000001';
        //suraphan.ReportToEmail__c = 'testramon@thaioilgroup.com';
        //suraphan.ReportToUser__c = EmployeeUser.Id;
        //suraphan.Subcordinate__c = '[""]';
        insert(narongsak);
        
        PISUsers__c adminPEOC = new PISUsers__c();
        adminPEOC.Active__c = true;
        adminPEOC.MAINPOSITION__c = true;
        adminPEOC.EMPLOYEEID__c = '00000000';
        adminPEOC.HOME_COMP__c = '1100';
        adminPEOC.Name = 'Test AdminPEOC';
        adminPEOC.LEVEL__c = 'VP';
        adminPEOC.ORGID__c = '00000000';
        adminPEOC.POSID__c = '00000000';
        adminPEOC.ENFIRSTNAME__c = 'Test';
        adminPEOC.ENLASTNAME__c = 'Test AdminPEOC';
        adminPEOC.HOLDERPOSITION__c = '00000000';
        adminPEOC.EMAIL__c = 'adminpeoc@thaioilgroup.com';
        adminPEOC.User__c = AdminPEOCId;
        insert(adminPEOC);
    }
    
    @future
    public static void insertPublicGroup() {
        
        List<User> Users = [select id, alias from User];
        
        Id AdminPMSVId;
        Id AdminFixAndGeneralId;
        Id AdminTransportationId;
        
        for(User U : Users) {
            if(U.alias == 'PA') {
                AdminPMSVId = U.Id;
            }
            else if(U.alias == 'KI') {
                AdminFixAndGeneralId = U.Id;
                AdminTransportationId = U.Id;
            }
        }
        
        //Create PMSVFixAndGeneral Group
        Group pmsvFAGAdminGroup = [select id from Group where developername = 'ESS_PMSV_FixAndGeneral'];
        GroupMember pmsvFAGAdmin = new GroupMember();
        pmsvFAGAdmin.UserOrGroupId = AdminFixAndGeneralId;
        pmsvFAGAdmin.GroupId = pmsvFAGAdminGroup.Id;
        insert(pmsvFAGAdmin);
        //Create PMSVTransportation Group
        Group pmsvTAdminGroup = [select id from Group where developername = 'ESS_PMSV_Transportation'];
        GroupMember pmsvTAdmin = new GroupMember();
        pmsvTAdmin.UserOrGroupId = AdminTransportationId;
        pmsvTAdmin.GroupId = pmsvTAdminGroup.Id;
        insert(pmsvTAdmin);
        //Create PMSV Group
        Group pmsvAdminGroup = [select id from Group where developername = 'ESS_PMSV'];
        GroupMember pmsvAdmin = new GroupMember();
        pmsvAdmin.UserOrGroupId = AdminPMSVId;
        pmsvAdmin.GroupId = pmsvAdminGroup.Id;
        insert(pmsvAdmin);
        
    }
    
    public static ESS_FixAndGeneral_DTO.FixAndGeneralDetailDTO initialHousingDetail(User runAsUser) {
        
        ESS_FixAndGeneral_DTO.FixAndGeneralDetailDTO Detail = new ESS_FixAndGeneral_DTO.FixAndGeneralDetailDTO();
        Detail.onBehalfFlow = false;
        Detail.status = new ESS_Global.EnumValue('FixAndGeneralDocumentStatus');
        Detail.status.key = ESS_Enum.FixAndGeneralDocumentStatus.Draft.name();
        Detail.status.value = 'Draft';
        Detail.isPRTRUser = false;
        Detail.typeOfService = new ESS_Global.EnumValue('FixTypeOfService');
        Detail.typeOfService.key = ESS_Enum.FixTypeOfService.Housing.name();
        Detail.typeOfService.value = 'Housing';
        
        Detail.housingTypeOfService = new ESS_Global.EnumValue('HousingTypeOfService');
        Detail.housingTypeOfService.key = ESS_Enum.HousingTypeOfService.ElectricalAndLightingSystem.name();
        Detail.housingTypeOfService.value = 'ElectricalAndLightingSystem';
        Detail.housingTypeOfServiceOther = '';
        Detail.housingCost = 1000;
        Detail.housingDetail = '';
        Detail.housingInternalDetail = '';
        
        Detail.repairDate = system.Datetime.now();
        Detail.houseNo = '111';
        Detail.period = new ESS_Global.EnumValue('HousingPeriod');
        Detail.period.key = ESS_Enum.HousingPeriod.DayWork.name();
        Detail.period.value = 'Day Work';
        Detail.houseType = new ESS_Global.EnumValue('HousingType');
        Detail.houseType.key = ESS_Enum.HousingType.SiteHouse.name();
        Detail.houseType.value = 'Site House';
        Detail.mobileNo = '081-123-4567';
        Detail.topic = 'Test';
        Detail.detail = 'Test';
        Detail.expectedDueDate = date.today();
        Detail.requesterId = runAsUser.Id;
        Detail.requesterEmployeeId = '00000002';
        Detail.requesterEmployeeName = 'Test';
        Detail.requesterEmployeeNameEN = 'Test';
        Detail.requesterEmail = 'testratri@thaioilgroup.com';
        Detail.requesterPosition = 'Test';
        Detail.requesterFunction = 'AAAA';
        Detail.requesterDepartment = 'BBBB';
        Detail.requesterSection = 'CCCC';
        Detail.requesterUnit = 'DDDD';
        
        return Detail;
    }
    
    public static ESS_FixAndGeneral_DTO.FixAndGeneralDetailDTO initialOnBehalfHousingDetail(User runAsUser, string onBehalfId) {
        
        ESS_FixAndGeneral_DTO.FixAndGeneralDetailDTO Detail = new ESS_FixAndGeneral_DTO.FixAndGeneralDetailDTO();
        Detail.status = new ESS_Global.EnumValue('FixAndGeneralDocumentStatus');
        Detail.status.key = ESS_Enum.FixAndGeneralDocumentStatus.Draft.name();
        Detail.status.value = 'Draft';
        Detail.isPRTRUser = false;
        Detail.typeOfService = new ESS_Global.EnumValue('FixTypeOfService');
        Detail.typeOfService.key = ESS_Enum.FixTypeOfService.Housing.name();
        Detail.typeOfService.value = 'Housing';
        Detail.repairDate = system.Datetime.now();
        Detail.houseNo = '111';
        Detail.period = new ESS_Global.EnumValue('HousingPeriod');
        Detail.period.key = ESS_Enum.HousingPeriod.DayWork.name();
        Detail.period.value = 'Day Work';
        Detail.houseType = new ESS_Global.EnumValue('HousingType');
        Detail.houseType.key = ESS_Enum.HousingType.SiteHouse.name();
        Detail.houseType.value = 'Site House';
        Detail.mobileNo = '081-123-4567';
        Detail.topic = 'Test';
        Detail.detail = 'Test';
        Detail.expectedDueDate = date.today();
        Detail.requesterId = runAsUser.Id;
        Detail.requesterEmployeeId = '00000002';
        Detail.requesterEmployeeName = 'Test';
        Detail.requesterEmployeeNameEN = 'Test';
        Detail.requesterEmail = 'testratri@thaioilgroup.com';
        Detail.requesterPosition = 'Test';
        Detail.requesterFunction = 'AAAA';
        Detail.requesterDepartment = 'BBBB';
        Detail.requesterSection = 'CCCC';
        Detail.requesterUnit = 'DDDD';
        
        Detail.onBehalfFlow = true;
        Detail.onBehalfOfId = OnBehalfId;
        Detail.onBehalfOfEmployeeId = '00000001';
        Detail.onBehalfOfEmployeeName = 'Test';
        Detail.onBehalfOfEmployeeNameEN = 'Test';
        Detail.onBehalfOfEmail = 'testUser@thaioilgroup.com';
        Detail.onBehalfOfPosition = 'Test';
        Detail.onBehalfOfUnit = 'AAAA';
        Detail.onBehalfOfSection = 'BBBB';
        Detail.onBehalfOfDepartment = 'CCCC';
        Detail.onBehalfOfFunction = 'DDDD';
        
        return Detail;
    }
        
    @isTest
    public static void ESSFixAndGeneralNotiTest() {
        
        Test.startTest();
        
        List<User> Users = [select id, alias, username, firstname_en__c, lastname_en__c, position__c from User];
        Id UserId;
        Id AdminPMSVId;
        string Username;
        string EmployeeId;
        User runAsUser;
        for(User U : Users) {
            if(U.alias == 'RAT') {
                UserId = U.Id;
                Username = U.Username;
                runAsUser = U;
            }
            else if(U.alias == 'KI') {
                AdminPMSVId = U.Id;
            }
        }
        
        List<PISUsers__c> PISUsers = [select id, user__c from PISUsers__c];
        Id PISUserId;
        for(PISUsers__c PISUser : PISUsers) {
            if(PISUser.User__c == UserId) {
                PISUserId = PISUser.Id;
            }
        }
        
        System.runAs(runAsUser) {
            
            ESS_FixAndGeneral__c Model = new ESS_FixAndGeneral__c();
            Model.Document_No__c = 'GS-2023-06-0001';
            Model.Status__c = ESS_Enum.StationaryServiceStatus.Draft.name();
            Model.Detail__c = 'Detail';
            Model.Type_of_Service__c = ESS_Enum.FixTypeOfService.Housing.name();
            Model.Topic__c = 'Topic';
            Model.Submitted_Date__c = date.today();
            Model.On_Behalf_Flow__c = true;
            Model.Requester_Id__c = runAsUser.Id;
            Model.Requester_Name_EN__c = 'Test';
            Model.Requester_Name__c = 'Test';
            Model.Requester_Email__c = 'test@softever.co.th';
            Model.On_Behalf_Of_Id__c = runAsUser.Id;
            Model.On_Behalf_Of__c = 'Test';
            Model.On_Behalf_Of_EN__c = 'Test';
            Model.On_Behalf_Of_Email__c = 'test@softever.co.th';
            Model.Reject_Comment__c = 'Reject';
            Model.Expected_Due_Date__c = date.today();
            Model.Cancelled_By__c = 'Cancelled';
            Model.Cancel_Comment__c = 'Cancel';
            Model.PMSV_Id__c = runAsUser.Id;
            Model.PMSV__c = 'PMSV';
            insert(Model);
            
            ESS_FixAndGeneralNotification.SendToEmployeeAndAdminPMSVWhenCancel(Model); 
            ESS_FixAndGeneralNotification.SendToEmployeeAndCCAdminWhenAdminCancel(Model);
            ESS_FixAndGeneralNotification.SendToAdminPMSVWhenRequested(Model);
            ESS_FixAndGeneralNotification.SendToAdminPMSVWhenAccepted(Model);
            ESS_FixAndGeneralNotification.SendToEmployeeAndAdminWhenCompleted(Model);
        }
        
		Test.stopTest();
        
    }
         
    @isTest
    public static void ESSFixAndGeneralNotiVerifyTest() {
        
        Test.startTest();
        
        List<User> Users = [select id, alias, username, firstname_en__c, lastname_en__c, position__c from User];
        Id UserId;
        Id AdminPMSVId;
        string Username;
        string EmployeeId;
        User runAsUser;
        for(User U : Users) {
            if(U.alias == 'RAT') {
                UserId = U.Id;
                Username = U.Username;
                runAsUser = U;
            }
            else if(U.alias == 'KI') {
                AdminPMSVId = U.Id;
            }
        }
        
        List<PISUsers__c> PISUsers = [select id, user__c from PISUsers__c];
        Id PISUserId;
        for(PISUsers__c PISUser : PISUsers) {
            if(PISUser.User__c == UserId) {
                PISUserId = PISUser.Id;
            }
        }
        
        System.runAs(runAsUser) {
            
            ESS_FixAndGeneral__c Model = new ESS_FixAndGeneral__c();
            Model.Document_No__c = 'GS-2023-06-0001';
            Model.Status__c = ESS_Enum.StationaryServiceStatus.Draft.name();
            Model.Detail__c = 'Detail';
            Model.Type_of_Service__c = ESS_Enum.FixTypeOfService.Housing.name();
            Model.Topic__c = 'Topic';
            Model.Submitted_Date__c = date.today();
            Model.On_Behalf_Flow__c = true;
            Model.Requester_Id__c = runAsUser.Id;
            Model.Requester_Name_EN__c = 'Test';
            Model.Requester_Name__c = 'Test';
            Model.Requester_Email__c = 'test@softever.co.th';
            Model.On_Behalf_Of_Id__c = runAsUser.Id;
            Model.On_Behalf_Of__c = 'Test';
            Model.On_Behalf_Of_EN__c = 'Test';
            Model.On_Behalf_Of_Email__c = 'test@softever.co.th';
            Model.Reject_Comment__c = 'Reject';
            Model.Expected_Due_Date__c = date.today();
            Model.Cancelled_By__c = 'Cancelled';
            Model.Cancel_Comment__c = 'Cancel';
            Model.PMSV_Id__c = runAsUser.Id;
            Model.PMSV__c = 'PMSV';
            insert(Model);
            
            ESS_FixAndGeneralNotification.SendEmailWhenVerifyMultiple(Model);
            
            List<ESS_FixAndGeneral__c> Models = new List<ESS_FixAndGeneral__c>();
            Models.add(Model);
            ESS_FixAndGeneralNotification.SendEmailWhenVerifyMultiple(Models);
        }
        
		Test.stopTest();
        
    }
     
    @isTest
    public static void ESSFixAndGeneralOBHNotiTest() {
        
        Test.startTest();
        
        List<User> Users = [select id, alias, username, firstname_en__c, lastname_en__c, position__c from User];
        Id UserId;
        Id AdminPMSVId;
        string Username;
        string EmployeeId;
        User runAsUser;
        for(User U : Users) {
            if(U.alias == 'RAT') {
                UserId = U.Id;
                Username = U.Username;
                runAsUser = U;
            }
            else if(U.alias == 'KI') {
                AdminPMSVId = U.Id;
            }
        }
        
        List<PISUsers__c> PISUsers = [select id, user__c from PISUsers__c];
        Id PISUserId;
        for(PISUsers__c PISUser : PISUsers) {
            if(PISUser.User__c == UserId) {
                PISUserId = PISUser.Id;
            }
        }
        
        System.runAs(runAsUser) {
            
            ESS_FixAndGeneral__c Model = new ESS_FixAndGeneral__c();
            Model.Document_No__c = 'GS-2023-06-0001';
            Model.Status__c = ESS_Enum.StationaryServiceStatus.Draft.name();
            Model.Detail__c = 'Detail';
            Model.Type_of_Service__c = ESS_Enum.FixTypeOfService.Housing.name();
            Model.Topic__c = 'Topic';
            Model.Submitted_Date__c = date.today();
            Model.On_Behalf_Flow__c = true;
            Model.Requester_Id__c = runAsUser.Id;
            Model.Requester_Name_EN__c = 'Test';
            Model.Requester_Name__c = 'Test';
            Model.Requester_Email__c = 'test@softever.co.th';
            Model.On_Behalf_Of_Id__c = runAsUser.Id;
            Model.On_Behalf_Of__c = 'Test';
            Model.On_Behalf_Of_EN__c = 'Test';
            Model.On_Behalf_Of_Email__c = 'test@softever.co.th';
            Model.Reject_Comment__c = 'Reject';
            Model.Expected_Due_Date__c = date.today();
            Model.Cancelled_By__c = 'Cancelled';
            Model.Cancel_Comment__c = 'Cancel';
            Model.PMSV_Id__c = runAsUser.Id;
            Model.PMSV__c = 'PMSV';
            insert(Model);
            
            ESS_FixAndGeneralNotification.SendToEmployeeWhenRequesterSubmitOnBehalf(Model); 
            ESS_FixAndGeneralNotification.SendToEmployeeAdminWhenEmployeeReject(Model);
            ESS_FixAndGeneralNotification.SendToEmployeeAdminWhenEmployeeVerify(Model); 
            
        }
        
		Test.stopTest();
        
    }
    
}