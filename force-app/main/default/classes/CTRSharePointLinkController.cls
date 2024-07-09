public class CTRSharePointLinkController 
{
    private static String spSiteName = '';
    private static String spTenantName = '';
    private static String spFolderName = '';
    private static String spMainFolder = '';
    
    public class wrapperPath
    {
        @AuraEnabled public String mLabel { get; set; }
        @AuraEnabled public String mLink { get; set; }
        @AuraEnabled public Boolean mSendCreateFolder { get; set; }
    }

    public class mCreateFolderWrapper
    {
        @AuraEnabled public String MainFolder { get; set; }
        @AuraEnabled public String SubFolder { get; set; }
        @AuraEnabled public String AccFolder { get; set; }
        @AuraEnabled public String Type { get; set; }
        //@AuraEnabled public List<String> Users { get; set; }
        //@AuraEnabled public String Role { get; set; }
        @AuraEnabled public mUpdateFieldToSharePoint fieldsUpdate { get; set; }
    }

    public class mUpdateFieldToSharePoint
    {
        @AuraEnabled public String AccountName { get; set; }
        @AuraEnabled public String CustomerCode { get; set; }
        @AuraEnabled public String SupplierCode { get; set; }
        @AuraEnabled public String SalesforceCode { get; set; }
    }

    public static String manageWrapperToCreateFolder(String mMainFolder, String mAccFolder, String mSubFolder, String mType, List<String> mUserList, String mRole, Account mAccount)
                                                    //,Account mAccount)
    {
        try
        {
            mCreateFolderWrapper mCreateFolder = new mCreateFolderWrapper();
            mCreateFolder.MainFolder = mMainFolder;
            mCreateFolder.AccFolder = mAccFolder;
            mCreateFolder.SubFolder = mSubFolder;
            mCreateFolder.Type = mType;
            //mCreateFolder.Users = (mUserList.size()>0)?mUserList: new List<String>();
            //mCreateFolder.Role = mRole;

            if(mAccount != null) {
                mUpdateFieldToSharePoint mUpdateField = new mUpdateFieldToSharePoint();
                mUpdateField.AccountName = mAccount.Name; //mAccount.Name;
                mUpdateField.CustomerCode = mAccount.AccountNumber__c;//mAccount.AccountNumber__c;
                mUpdateField.SupplierCode = mAccount.SupplierNumber__c;//mAccount.SupplierNumber__c;
                mUpdateField.SalesforceCode = mAccount.SFCode__c;//mAccount.SFCode__c;
                mCreateFolder.fieldsUpdate = mUpdateField;
            }
            String mJson = JSON.serialize(mCreateFolder);
            mJson = mJson.replace('null', '""');
            System.debug('Create folder json '+mJson);
            Return mJson;
        }
        catch(exception e)
        {
            System.debug('Error from CTRSharePointLinkController.manageWrapperToCreateFolder Line: '+e.getLineNumber()+' || Message: '+e.getMessage());
            return '';
        }
    }

    public static void initialize(){
        C360Integration__c c360Integration = C360Integration__c.getInstance();
        spTenantName = c360Integration.SharePoint_TenantName__c;
        spSiteName = c360Integration.SharePoint_SiteName__c;
        spFolderName = c360Integration.SharePoint_Document_Folder__c;
        spMainFolder = c360Integration.SharePointMainFolderDuringCreate__c;
    }
    
    @AuraEnabled
    public static List<CTRSharePointFolder__mdt> getFolderPath(String mainFolder,String mObjName, String subFolderName)
    {
        String conditionStr;
        if(mObjName == 'Account' || mObjName == 'Lead') {
            conditionStr = ' AND Folder__c = \'Common\' AND Path__c = null ';
        } else if(mObjName == 'CTRRequestFormItem__c') {
            conditionStr = ' AND Folder__c =: subFolderName AND Path__c = null ';
        }
        String sqlStr = 'SELECT Id ,QualifiedApiName, Label, Main__c, Path__c, Button_Name__c, Folder__c, SubFolder__c FROM CTRSharePointFolder__mdt WHERE Main__c =: mainFolder AND Salesforce_Object_Name__c Like \'%'+mObjName+'%\' AND Active__c = true '+conditionStr+' ORDER BY Button_Name__c ASC';
        // List<CTRSharePointFolder__mdt> mSharePointFolderList = [SELECT Id ,QualifiedApiName, Label, Main__c, Path__c, Button_Name__c, Folder__c, SubFolder__c  
        // FROM CTRSharePointFolder__mdt WHERE Salesforce_Object_Name__c Like :mObjName AND Button_Name__c IN: folderName AND Active__c = true ORDER BY Button_Name__c ASC];
        System.debug(sqlStr);
        List<CTRSharePointFolder__mdt> mSharePointFolderList = Database.query(sqlStr);
        return mSharePointFolderList;
    }
    
    @AuraEnabled
    public static List<wrapperPath> getLink(string folderName,Id recordId)
    {
        try 
        {
            system.debug('folderName'+folderName);
            initialize();
            String sObjName = recordId.getSObjectType().getDescribe().getName();
            system.debug('sObjName'+sObjName+': '+recordId.getSObjectType());
            // List<String> folderNameList = folderName.split(';');

            List<Account> mAccount = new List<Account>();
            List<Lead> mLead = new List<Lead>();
            List<CTRRequestFormItem__c> mItem = new List<CTRRequestFormItem__c>();
            String subFolderName;
            String itemCounterPartyType;
            String mainFolder = spMainFolder.contains('Account') ? 'Account' : spMainFolder;

            if(sObjName == 'Account')
            {
                mAccount = [SELECT Id, AccountNumber__c, SFCode__c, isMigrateData__c, SubmitToCreateSharePointFolder__c, MinutesSinceSubmitSharePoint__c FROM Account WHERE Id =: recordId LIMIT 1];
            }
            if(sObjName == 'Lead') {
                mLead = [SELECT Id, LeadNo__c FROM Lead WHERE Id =: recordId LIMIT 1];
            }
            if(sObjName == 'CTRRequestFormItem__c')
            {
                mItem = [SELECT Id, Name, Customer__c ,Customer__r.AccountNumber__c, Customer__r.SFCode__c, Partner__r.SFCode__c, recordTypeId, RecordType.DeveloperName, SharePointSubFolderName__c, Partner__c
                FROM CTRRequestFormItem__c WHERE Id =: recordId LIMIT 1];
                if(mItem.size() > 0) {
                    subFolderName = mItem[0].SharePointSubFolderName__c;
                    if(mItem[0].RecordType.DeveloperName.contains('Edit')) {
                        mainFolder = 'Account';
                        // mainFolder = 'Request';
                    }
                }
            }

            List<CTRSharePointFolder__mdt> mSharePointFolderList = getFolderPath(mainFolder, sObjName, subFolderName);
            List<wrapperPath> mWrapperPathList = new List<wrapperPath>();
            if(mSharePointFolderList.size()>0)
            {
                
                for(CTRSharePointFolder__mdt mShareFolder: mSharePointFolderList)
                {
                    Boolean mFoundPath = false;
                    String actMainFolder = mShareFolder.Main__c == 'Account' ? spMainFolder : mShareFolder.Main__c;
                    string mLinkPath = 'https://'+spTenantName+'.sharepoint.com/sites/'+ spSiteName+'/'+spFolderName+'/';
                    if(mAccount.size()>0)
                    {
                        if(mShareFolder.SubFolder__c.contains('CTR')) {
                            // mLinkPath += mShareFolder.Main__c+'/';
                            // mLinkPath += mAccount[0].SFCode__c;
                            // mLinkPath += mShareFolder.Folder__c != null ? '/'+mShareFolder.Folder__c : '';
                            // mLinkPath += mShareFolder.SubFolder__c != null ? '/'+mShareFolder.SubFolder__c : '';
                            // mLinkPath += mShareFolder.Path__c != null ? '/'+mShareFolder.Path__c : '';
                            mLinkPath += actMainFolder+'/';
                            mLinkPath += mAccount[0].SFCode__c;

                            mShareFolder.Button_Name__c = mAccount[0].SFCode__c;
                            mFoundPath = true;
                        }
                    }
                    if(mLead.size() > 0) {
                        if(mShareFolder.SubFolder__c.contains('Lead')) {
                            mLinkPath += actMainFolder+'/';
                            mLinkPath += mLead[0].LeadNo__c;
                            mFoundPath = true;
                        }
                    }
                    if(mItem.size()>0)
                    { 
                        // System.debug('mItem[0].RecordType.DeveloperName:'+mItem[0].RecordType.DeveloperName);

                        // System.debug('mShareFolder.QualifiedApiName:'+mShareFolder.QualifiedApiName);
                        String mType = mItem[0].RecordType.DeveloperName.contains('Customer') ? 'Customer' : 'Supplier';
                        // if(mItem[0].RecordType.DeveloperName.contains('Initial') && mShareFolder.QualifiedApiName.contains('Account'))
                        // {
                        if(mShareFolder.SubFolder__c.contains(mType)) {
                            mLinkPath += actMainFolder+'/';
                            if(mItem[0].RecordType.DeveloperName.contains('ShipTo')) {
                                if(mItem[0].RecordType.DeveloperName.contains('Create')) {
                                    if(mItem[0].Partner__c == null) {
                                        mLinkPath += mItem[0].Name;
                                    } else {
                                        mLinkPath += mItem[0].Partner__r.SFCode__c;
                                    }
                                } else {
                                    mLinkPath += mItem[0].Customer__r.SFCode__c;
                                }
                            } else {
                                mLinkPath += mItem[0].Customer__r.SFCode__c;
                                mLinkPath += mShareFolder.Folder__c != null ? '/'+mShareFolder.Folder__c : '';
                                mLinkPath += mShareFolder.SubFolder__c != null ? '/'+mShareFolder.SubFolder__c : '';
                                mLinkPath += mShareFolder.Path__c != null ? '/'+mShareFolder.Path__c : '';
                            }
                            mFoundPath = true;
                        }
                        // }
                        // if(mItem[0].RecordType.DeveloperName.contains('Edit') && mShareFolder.QualifiedApiName.contains('Request'))
                        // {
                            // if(mShareFolder.SubFolder__c.contains(mType)) {
                            //     mLinkPath += mShareFolder.Main__c+'/';
                            //     mLinkPath += mItem[0].Customer__r.SFCode__c;
                            //     mLinkPath += mShareFolder.Folder__c != null ? '/'+mShareFolder.Folder__c : '';
                            //     mLinkPath += mShareFolder.SubFolder__c != null ? '/'+mShareFolder.SubFolder__c : '';
                            //     mLinkPath += mShareFolder.Path__c != null ? '/'+mShareFolder.Path__c : '';
                            //     mFoundPath = true;
                            // }
                        // }

                    }
                    
                    if(mFoundPath)
                    {
                        wrapperPath mWrapper = new wrapperPath();
                        mWrapper.mLabel = mShareFolder.Button_Name__c;
                        mWrapper.mLink = mLinkPath;
                        mWrapper.mSendCreateFolder = false;

                        if(sObjName == 'Account' && mAccount.size() > 0) {
                            //create-sharepoint
                            if(mAccount[0].MinutesSinceSubmitSharePoint__c == null) {
                                // send create sharepoint
                                mWrapper.mSendCreateFolder = true;
                            } else if(mAccount[0].MinutesSinceSubmitSharePoint__c < 0.1) {
                                // create sharepoint has been sent less than 0.1 mins
                                mWrapper.mSendCreateFolder = true;
                            }
                        }
                        //mLinkPathList.add(mLinkPath);
                        mWrapperPathList.add(mWrapper);
                    }
                }
            }
            if(mItem.size()>0 && !mItem[0].RecordType.DeveloperName.contains('ShipTo'))
            { 
                // String actMainFolder = mShareFolder.Main__c == 'Account' ? spMainFolder : mShareFolder.Main__c;
                string mLinkPath = 'https://'+spTenantName+'.sharepoint.com/sites/'+ spSiteName+'/'+spFolderName+'/';
                mLinkPath += spMainFolder+'/';
                mLinkPath += mItem[0].Customer__r.SFCode__c;
                mLinkPath += '/Common/02 CTR';

                wrapperPath mWrapper = new wrapperPath();
                mWrapper.mLabel = 'CTR Document';
                mWrapper.mLink = mLinkPath;
                //mLinkPathList.add(mLinkPath);
                mWrapperPathList.add(mWrapper);
            }
            //string link = 'https://'+spTenantName+'.sharepoint.com/sites/'+ spSiteName+'/'+spFolderName+'/'+folderPath.Main__c+'/'+acc.Id +folderPath.Path__c;
            //return [select Id ,QualifiedApiName, Path__c from C360_SharePointFolder__mdt where QualifiedApiName =: folderName];
            return mWrapperPathList;

        } 
        catch (Exception e) 
        {
            return new List<wrapperPath>();
        }

    }

    @AuraEnabled
    public static List<String> getSharepointPath(Id recordId, String mPath){ 
        try 
        {
            // Id recordId = '00Q1m000004YF7XEAW'; //input Lead
            // Id recordId = '0011m00000qRoUSAA0'; //input Account
            // Id recordId = 'a3c1m000000MPcNAAW'; //input Item
            // String mPath = '01'; //input
            
            List<String> mLinkPathList = new List<String>();
            initialize();
            string mDomain = 'https://'+spTenantName+'.sharepoint.com/sites/'+ spSiteName+'/'+spFolderName+'/';
            List<String> mPartList = getSharepointActualPath(recordId, mPath);
            for(String mPart : mPartList)
            {
                mLinkPathList.add(mDomain+mPart);
            }
            return mLinkPathList;
        } 
        catch (Exception e) 
        {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<String> getSharepointActualPath (Id recordId, String mPath){
        try 
        {
            initialize();
            String mainFolder = spMainFolder.contains('Account') ? 'Account' : spMainFolder;
            String folder;
            String sObjName = recordId.getSObjectType().getDescribe().getName();

            List<Account> mAccount = new List<Account>();
            List<CTRRequestFormItem__c> mItem = new List<CTRRequestFormItem__c>();
            List<Lead> mLead = new List<Lead>();
            String mSubFolder;
            if(sObjName == 'Account') {
                mAccount = [SELECT Id, AccountNumber__c, SFCode__c FROM Account WHERE Id =: recordId LIMIT 1];
                folder = 'Common';
                mSubFolder = 'CTR';
            }
            if(sObjName == 'Lead') {
                mLead = [SELECT Id, LeadNo__c FROM Lead WHERE Id =: recordId LIMIT 1];
                folder = 'Common';
                mSubFolder = 'Lead';
            }
            if(sObjName == 'CTRRequestFormItem__c') {
                mItem = [SELECT Id, Customer__c ,Customer__r.AccountNumber__c, Customer__r.SFCode__c, recordTypeId, RecordType.DeveloperName, SharePointSubFolderName__c
                FROM CTRRequestFormItem__c WHERE Id =: recordId LIMIT 1];
                if(mItem.size() > 0) {
                    folder = mItem[0].SharePointSubFolderName__c;
                    mSubFolder = (mItem[0].RecordType.DeveloperName.contains('Customer')) ? 'Customer':'Supplier';
                    // if(mItem[0].RecordType.DeveloperName.contains('Edit')) {
                    //     mainFolder = 'Request';
                    // }
                }
            }

            List<CTRSharePointFolder__mdt> mSharePointFolderList = [SELECT Id ,QualifiedApiName, Label, Main__c, Path__c, Button_Name__c, Folder__c, SubFolder__c 
            FROM CTRSharePointFolder__mdt WHERE Main__c = :mainFolder AND Active__c = true AND Folder__c =: folder ORDER BY Button_Name__c ASC];
            System.debug('Debug msharepoint '+mSharePointFolderList+spMainFolder);
            List<String> mLinkPathList = new List<String>();
            for(CTRSharePointFolder__mdt mShareFolder : mSharePointFolderList) {
                Boolean mFoundPath = false;
                String actMainFolder = mShareFolder.Main__c == 'Account' ? spMainFolder : mShareFolder.Main__c;
                string mLinkPath = '';
                if(mShareFolder.SubFolder__c != null && mShareFolder.SubFolder__c.contains(mSubFolder) && mShareFolder.Path__c != null && mShareFolder.Path__c.contains(mPath)) {
                    if(mAccount.size() > 0)
                    {
                        mLinkPath += actMainFolder+'/';
                        mLinkPath += mAccount[0].SFCode__c;
                        mLinkPath += mShareFolder.Folder__c != null ? '/'+mShareFolder.Folder__c : '';
                        mLinkPath += mShareFolder.SubFolder__c != null ? '/'+mShareFolder.SubFolder__c : '';
                        mLinkPath += mShareFolder.Path__c != null ? '/'+mShareFolder.Path__c : '';
                        mFoundPath = true;
                    }
                    if(mLead.size() > 0) {
                        mLinkPath += actMainFolder+'/';
                        mLinkPath += mLead[0].LeadNo__c;
                        mLinkPath += mShareFolder.Folder__c != null ? '/'+mShareFolder.Folder__c : '';
                        mLinkPath += mShareFolder.SubFolder__c != null ? '/'+mShareFolder.SubFolder__c : '';
                        mLinkPath += mShareFolder.Path__c != null ? '/'+mShareFolder.Path__c : '';
                        mFoundPath = true;
                    }
                    if(mItem.size() > 0)
                    { 
                        mLinkPath += actMainFolder+'/';
                        mLinkPath += mItem[0].Customer__r.SFCode__c;
                        if(!mItem[0].RecordType.DeveloperName.contains('ShipTo')) {
                            mLinkPath += mShareFolder.Folder__c != null ? '/'+mShareFolder.Folder__c : '';
                            mLinkPath += mShareFolder.SubFolder__c != null ? '/'+mShareFolder.SubFolder__c : '';
                        }
                        mLinkPath += mShareFolder.Path__c != null ? '/'+mShareFolder.Path__c : '';
                        mFoundPath = true;
                    }
                }

                if(mFoundPath)
                {
                    mLinkPathList.add(mLinkPath);
                }
            }
            System.debug('--mLinkPathList--'+mLinkPathList);
            return mLinkPathList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class wrapperCheckCreateFolder
    {
        @AuraEnabled public Boolean isCreateSuccess { get; set; }
        @AuraEnabled public String message { get; set; }
    }

    @AuraEnabled
    public static wrapperCheckCreateFolder checkSendCreateSharePointFolder(Id recordId){
        try {
            wrapperCheckCreateFolder response = new wrapperCheckCreateFolder();
            response.isCreateSuccess = true;
            response.message = 'Sharepoint folder has been created.';
            String sObjName = recordId.getSObjectType().getDescribe().getName();

            // if(sObjName == 'CTRRequestFormItem__c') {
            //     Set<Id> mItemSetId = new Set<Id>{recordId};
            //     CTRRequestItemHandler.createFolderDependtoSalesOrg(mItemSetId);
            // } else 
            if(sObjName == 'Account') {
                Account mAccount = [SELECT Id, isMigrateData__c, SubmitToCreateSharePointFolder__c, MinutesSinceSubmitSharePoint__c FROM Account WHERE Id =: recordId LIMIT 1];
                if(mAccount.MinutesSinceSubmitSharePoint__c == null) {
                    Account updateAccount = new Account(); // to trigger create sharepoint folder
                    updateAccount.Id = recordId;
                    updateAccount.isMigrateData__c = false;
                    updateAccount.SubmitToCreateSharePointFolder__c = true;
                    update updateAccount;

                    response.isCreateSuccess = false;
                    response.message = 'Creating sharepoint folder is in-progress, please try again later.';
                } else if(mAccount.MinutesSinceSubmitSharePoint__c < 0.1) {
                    response.isCreateSuccess = false;
                    response.message = 'Creating sharepoint folder is in-progress, please try again later.';
                }
            }
            return response;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}