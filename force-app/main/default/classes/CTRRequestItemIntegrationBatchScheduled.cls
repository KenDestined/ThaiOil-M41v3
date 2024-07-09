public with sharing class CTRRequestItemIntegrationBatchScheduled implements Schedulable 
{
    public void execute(SchedulableContext sc) 
    {
        CTRRequestItemIntegrationBatchController mRefreshToken = new CTRRequestItemIntegrationBatchController(); 
        Database.executeBatch(mRefreshToken,1);
    }
}