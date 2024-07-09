@isTest
public with sharing class CTRCreateSharePointFolderScheduleTest {
    
    @isTest
    static void testCTRCreateSharePointFolderSchedule(){
        Test.StartTest();

        CTRCreateSharePointFolderSchedule spfSchedule = new CTRCreateSharePointFolderSchedule();

        String scheduleTime = '0 0 23 * * ?'; 

        system.schedule('Testing Reassign Class.', scheduleTime, spfSchedule); 

        Test.stopTest(); 
    }
}