@isTest
public class CTRBlockCustomerBatchSchedulerTest {
    @isTest
    static void testScheduler() {
        Test.startTest();
        
        // Schedule the job to run every day at midnight
        String jobName = 'Schedule CTRBlockCustomerBatchScheduler Job';
        String cronExp = '0 0 0 * * ?'; // Cron expression for midnight every day
        System.Schedule(jobName, cronExp, new CTRBlockCustomerBatchScheduler());
        
        Test.stopTest();
        
        // Query CronTrigger to check if the job is scheduled
        Integer scheduledJobsCount = [SELECT COUNT() FROM CronTrigger WHERE CronJobDetail.Name = :jobName];
        
        // Assert that at least one job is scheduled
        System.assertNotEquals(0, scheduledJobsCount, 'Job is not scheduled');
    }
}