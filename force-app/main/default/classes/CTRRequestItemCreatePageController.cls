public class CTRRequestItemCreatePageController {

    private static final String CTRREQUESTITEMRECORDTYPESFOR_PREFIX = 'CTRRequestItemRecordTypesFor';

    public class resultOnLoadRecordTypePage
    {
        @AuraEnabled public Id mRecordId{get;set;}
        @AuraEnabled public Account mAccount{get;set;}
        @AuraEnabled public List<recordTypeWrapper> mRecordTypeList{get;set;}
        @AuraEnabled public CTRBuProfile__mdt mBuProfile{get;set;}
        @AuraEnabled public String mResultMessage{get;set;}
    }

    public class recordTypeWrapper
    {
        @AuraEnabled public Id mId{get;set;}
        @AuraEnabled public String mName{get;set;}
        @AuraEnabled public String mDeveloperName{get;set;}
        @AuraEnabled public Boolean mSelected{get;set;}
        @AuraEnabled public String value{get;set;}
        @AuraEnabled public String label{get;set;}
    }
    
    @AuraEnabled
    public static resultOnLoadRecordTypePage getAllRecordTypeList(Id recordId, String selectedBU) {
        resultOnLoadRecordTypePage mResult = new resultOnLoadRecordTypePage();
        try {
            if(!String.isBlank(recordId)) {
                List<Account> accountList = [SELECT Id, RecordTypeId, RecordType.DeveloperName, ThaiOil__c, ThaiParaxylene__c, ThaiLubeBase__c, LABIX__c, TOPSOLVENTTH__c, TOPSOLVENTVN__c, TOPSOLVENTTSR__c, TOPSOLVENTJSKem__c, TOPSOLVENTTSChem__c FROM Account WHERE Id =: recordId LIMIT 1];
                String recordTypeDeveloperName = '';
                if(!accountList.isEmpty()) {
                    mResult.mAccount = accountList[0];
                    if(!String.isBlank(accountList[0].RecordTypeId)) {
                        recordTypeDeveloperName = accountList[0].RecordType.DeveloperName;
                    }
                }
                Id userId = UserInfo.getUserId();
                User currentUser = [SELECT Id,Employee_Id__c, ProfileId, Profile.Name FROM User WHERE Id =: userId];
                //List<RecordType>mRecordTypeList = [SELECT Id, Name, DeveloperName FROM RecordType WHERE sobjectType = 'CTRRequestFormItem__c' AND IsActive = true];
                //System.debug('mRecordTypeList:'+mRecordTypeList);
                // Map<String, String> mapBUProductAPI = {
                    
                // }
                Map<String, String> mapBUProductAPI = new Map<String, String>{
                    'TOP'=>'ThaiOil__c',
                    'TPX'=>'ThaiParaxylene__c',
                    'TLB'=>'ThaiLubeBase__c',
                    'LABIX'=>'LABIX__c',
                    'TXTH'=>'TOPSOLVENTTH__c',
                    'TSV'=>'TOPSOLVENTVN__c',
                    'TSR'=>'TOPSOLVENTTSR__c',
                    'JSKem'=>'TOPSOLVENTJSKem__c',
                    'TXINDIA'=>'TOPSOLVENTTSChem__c'
                };
                
                List<CTRActorInProcess__mdt> actorProcessList = [SELECT Id,SalesOrg__c FROM CTRActorInProcess__mdt WHERE EmployeeId__c =: currentUser.Employee_Id__c AND SalesOrg__c =: selectedBU LIMIT 1]; // check actor
                Boolean isActorHasPermission = false;
                if(actorProcessList.size() > 0) {
                    // check account
                    String productAPI = mapBUProductAPI.get(selectedBU);
                    System.debug('Debug productAPI'+productAPI);
                    System.debug('Debug accountList[0].get(productAPI)'+accountList[0].get(productAPI));
                    isActorHasPermission = (Boolean)accountList[0].get(productAPI);
                }
                if(currentUser.Profile.Name.contains('Admin'))
                {
                    isActorHasPermission = true;
                }
                System.debug('Debug isActorHasPermission'+isActorHasPermission);
                List<String> sensitiveReqType = new List<String>{'CustomerEditInfo','SupplierEditInfo','ShipToCreate','ShipToEdit','CustomerChangeCrCond','SupplierChangeCrCond','CustomerBlock','SupplierBlock'};

                selectedBU = selectedBU != null ? selectedBU.left(5) : selectedBU;


                // retrieve config for recordtypes
                List<String> recordTypes = new List<String>();
                if(!String.isBlank(recordTypeDeveloperName) && !String.isBlank(selectedBU)) {
                    String configKey = CTRREQUESTITEMRECORDTYPESFOR_PREFIX + selectedBU + recordTypeDeveloperName;
                    System.debug('configKey -----' + configKey);
                    Map<String, CTRGeneralSetting__mdt> configMap = CTRCheckDueDiligenceController.getGeneralSetting(new List<String> {configKey});
                    if(configMap != null && !configMap.isEmpty() && configMap.containsKey(configKey)) {
                        recordTypes = configMap.get(configKey)?.LongValue__c?.split(';');
                        System.debug('recordTypes -----' + recordTypes);
                    }
                }
    
                List<recordTypeWrapper> mRecordTypeWrapList = new List<recordTypeWrapper>();
                for (RecordTypeInfo info: CTRRequestFormItem__c.SObjectType.getDescribe().getRecordTypeInfos()) {
                    if(info.isAvailable() && (((recordTypes == null || recordTypes.isEmpty()) && info.getDeveloperName() != 'Master') || (recordTypes != null && !recordTypes.isEmpty() && recordTypes.contains(info.getDeveloperName())))) {
                        if(sensitiveReqType.contains(info.getDeveloperName()) && !isActorHasPermission) {
                            continue; //actor no permission in request types => skip
                        }
                        recordTypeWrapper mRecordTypeWrap = new recordTypeWrapper();
                        mRecordTypeWrap.value = mRecordTypeWrap.mId = info.getRecordTypeId();
                        mRecordTypeWrap.label = mRecordTypeWrap.mName = info.getName();
                        mRecordTypeWrap.mDeveloperName = info.getDeveloperName();
                        mRecordTypeWrap.mSelected = false;
                        mRecordTypeWrapList.add(mRecordTypeWrap);
                    }
                }
    
                System.debug('recordId:'+recordId);
                System.debug('userId:'+userId);
                System.debug('mRecordTypeWrapList:'+mRecordTypeWrapList);
    
                mResult.mRecordTypeList = mRecordTypeWrapList;
                mResult.mBuProfile = CTRBuProfileController.checkBusinessUnitFromProfile(userId, null);
                mResult.mResultMessage = 'Success';
            } else {
                mResult.mResultMessage = 'Failed';
            }
        } catch(Exception e) {
            System.debug('Error from CTRRequestItemCreatePageController.getAllRecordTypeList LINE:'+e.getLineNumber()+' || Message: '+e.getMessage() );
            mResult.mResultMessage = 'Failed';
        }
        return mResult;
    }

    @AuraEnabled
    public static void getRequestItemRecordType() {
        List<SelectOption> recordTypes = new List<SelectOption>();
        for (RecordTypeInfo info: CTRRequestFormItem__c.SObjectType.getDescribe().getRecordTypeInfos()) {
            if(info.isAvailable()) {
                recordTypes.add(new SelectOption(info.getRecordTypeId(), info.getName()));
            }
        }

        // Include these next 3 lines to output the results during development and debugging
        for( SelectOption selopt: recordTypes ) {
            System.debug( selopt.getLabel() + ',' + selopt.getValue() );
        }
    }
}