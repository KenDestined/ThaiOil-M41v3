/* 
 * Author Softever
 
    CG_COICGAnnualSchedule COICGAnnual = new CG_COICGAnnualSchedule();
    string cronExp1 = '0 0 12 1 * ? *';  0 45 21 19 1 ? *
    system.schedule('COI CG Annual', cronExp1, COICGAnnual);
	
	Run on every day
	For Test '0 0 8 * * ? *'
	0 0/5 0 ? * * *
*/

global class CG_COICGAnnualBatchable implements Database.Batchable<sObject>, Database.AllowsCallouts {
    
    public boolean isActive = true;
    public boolean isMainPosition = true;
    public string query = 'select id, new_employee__c, User__c, ReportToUser__c, THTITLE__c, THFIRSTNAME__c, THLASTNAME__c, ' +
        					'ENFIRSTNAME__c, ENLASTNAME__c, OBJENFULLNAME__c, OBJTHFULLNAME__c from pisusers__c where Active__c =: isActive AND MainPosition__c =: isMainPosition LIMIT 1';
    
    global Database.QueryLocator start(Database.BatchableContext BC) {
       return Database.getQueryLocator(query);
    }    
    
    global void execute(Database.BatchableContext BC, List<PISUsers__c> PISUsers) {
        
        if(PISUsers.size() > 0) {
            
            CG_Batch.COICGAnnual();
                
        }
        
    }
    
    global void finish(Database.BatchableContext BC){    
    }
    
}