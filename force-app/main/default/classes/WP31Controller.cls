public class WP31Controller {

    @InvocableMethod
    public static void UpdateWorkProcess32FromWaitingForPreviousStep(List<Id> ProjectId) {
        
        boolean IsDisable1011 = false;
        boolean IsDisable1819 = false;
        
        Project__c Proj = [select id, BE_WP1_ID__c, BE_WP2_ID__c, BE_WP3_ID__c, BE_WP4_ID__c, BE_WP5_ID__c, BE_WP6_ID__c,
                           BE_WP7_ID__c, BE_WP8_ID__c, BE_WP9_ID__c, BE_WP10_ID__c, BE_WP11_ID__c, BE_WP12_ID__c, BE_WP13_ID__c,
                           BE_WP14_ID__c, BE_WP15_ID__c, BE_WP16_ID__c, BE_WP17_ID__c, BE_WP18_ID__c, BE_WP19_ID__c, BE_WP20_ID__c,
                           BE_WP21_ID__c, BE_WP22_ID__c, BE_WP23_ID__c, BE_WP24_ID__c, BE_WP25_ID__c, BE_WP26_ID__c, BE_WP27_ID__c,
                           BE_WP28_ID__c, BE_WP29_ID__c, BE_WP30_ID__c, BE_WP31_ID__c, BE_WP32_ID__c from Project__c where Id =: ProjectId];
        
        Id WP1Id = Proj.BE_WP1_ID__c;
        Id WP2Id = Proj.BE_WP2_ID__c;
        Id WP3Id = Proj.BE_WP3_ID__c;
        Id WP4Id = Proj.BE_WP4_ID__c;
        Id WP5Id = Proj.BE_WP5_ID__c;
        Id WP6Id = Proj.BE_WP6_ID__c;
        Id WP7Id = Proj.BE_WP7_ID__c;
        Id WP8Id = Proj.BE_WP8_ID__c;
        Id WP9Id = Proj.BE_WP9_ID__c;
        Id WP10Id = Proj.BE_WP10_ID__c;
        Id WP11Id = Proj.BE_WP11_ID__c;
        Id WP12Id = Proj.BE_WP12_ID__c;
        Id WP13Id = Proj.BE_WP13_ID__c;
        Id WP14Id = Proj.BE_WP14_ID__c;
        Id WP15Id = Proj.BE_WP15_ID__c;
        Id WP16Id = Proj.BE_WP16_ID__c;
        Id WP17Id = Proj.BE_WP17_ID__c;
        Id WP18Id = Proj.BE_WP18_ID__c;
        Id WP19Id = Proj.BE_WP19_ID__c;
        Id WP20Id = Proj.BE_WP20_ID__c;
        Id WP21Id = Proj.BE_WP21_ID__c;
        Id WP22Id = Proj.BE_WP22_ID__c;
        Id WP23Id = Proj.BE_WP23_ID__c;
        Id WP24Id = Proj.BE_WP24_ID__c;
        Id WP25Id = Proj.BE_WP25_ID__c;
        Id WP26Id = Proj.BE_WP26_ID__c;
        Id WP27Id = Proj.BE_WP27_ID__c;
        Id WP28Id = Proj.BE_WP28_ID__c;
        Id WP29Id = Proj.BE_WP29_ID__c;
        Id WP30Id = Proj.BE_WP30_ID__c;
        Id WP31Id = Proj.BE_WP31_ID__c;
        Id WP32Id = Proj.BE_WP32_ID__c;
        
        Close_Out_Database__c NextWP31;
        Close_Out_Database__c CurrentWP31;
        CR_Completion_Report__c NextWP32;
        
        //Service Requisition
        Project_Execution_Plan__c WP4 = [select id, Project__c, Service_Requisition__c from Project_Execution_Plan__c where Id =: WP4Id];
        
        if(WP4.Service_Requisition__c == 'EP (Owner)') {
            IsDisable1011 = true;
            IsDisable1819 = false;
        }
        else if(WP4.Service_Requisition__c == 'EPC') {
            IsDisable1819 = true;
            IsDisable1011 = false;
        }
        else {
            IsDisable1011 = false;
            IsDisable1819 = false;
        }
        
        CurrentWP31 = [select id, Project__c, Work_Process_Status__c, No__c from Close_Out_Database__c where Id =: WP31Id];
        NextWP32 = [select id, Project__c, Work_Process_Status__c, No__c from CR_Completion_Report__c where Id =: WP32Id];
        
        if(CurrentWP31.Work_Process_Status__c == 'Completed' && NextWP32.Work_Process_Status__c == 'Waiting for Previous Step') {
            
            NextWP32.Work_Process_Status__c = 'Completed';
            update(NextWP32);  
            
        }
    }
    
}