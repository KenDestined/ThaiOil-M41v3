public without sharing class CommitteeTakeActionApprove {

    @AuraEnabled
    public static String getRecordTypeName(String committeeId) {
        List<CTRCommitteeApproval__c> committees = [SELECT CTRRequestFormItem__r.RecordType.DeveloperName FROM CTRCommitteeApproval__c WHERE Id = :committeeId];
        if (!(committees.size() > 0)) {
            return '';
        }
        return committees[0].CTRRequestFormItem__r.RecordType.DeveloperName;
    }

    @AuraEnabled
    public static void submitProcrssApprovalRequest(Id recordId, String appreovalAction, String remark, Boolean sendFromSFDC){
        List<CTRCommitteeApproval__c> committeeToUpdates = new List<CTRCommitteeApproval__c>();
        // try {
            // Send Approve form SFDC
            if (sendFromSFDC) {
                // get user Id
                String userId = UserInfo.getUserId();
                List<CTRCommitteeApproval__c> ctrCommitteeList =
                [   SELECT Id,CTRRequestFormItem__c,ApprovalResult__c,Remark__c, CTRRequestFormItem__r.RecordTypeName__c
                    FROM CTRCommitteeApproval__c
                    WHERE ApprovalResult__c IN ('Submit to Committee', 'Reply to TRCR', 'Reply to FA', 'Reply to FALB')
                    AND CTRRequestFormItem__c  =:recordId
                    AND ApproverName__c =:userId
                ];
                for(CTRCommitteeApproval__c ctrCommittee: ctrCommitteeList){
                    CTRCommitteeApproval__c committeeToUpdate = new CTRCommitteeApproval__c();
                    committeeToUpdate.Id = ctrCommittee.Id;
                    committeeToUpdate.ApprovalResult__c = appreovalAction;
                    committeeToUpdate.ApprovalDate__c = Date.today();
                    committeeToUpdate.Remark__c = remark;
                    committeeToUpdates.add(committeeToUpdate);
                }
                update committeeToUpdates;

                List<CTRCommitteeApproval__c> cmapList = [
                    SELECT Id,ApprovalResult__c
                    FROM CTRCommitteeApproval__c
                    WHERE CTRRequestFormItem__c  =:recordId
                ];
                Boolean allDone = true;
                Boolean hasRejected = false;
                for (CTRCommitteeApproval__c cmap : cmapList) {
                    if (cmap.ApprovalResult__c != 'Approved' && cmap.ApprovalResult__c != 'Rejected') {
                        allDone = false;
                    }
                    if (cmap.ApprovalResult__c == 'Rejected') {
                        hasRejected = true;
                    }
                }
                if (hasRejected == true) {
                    CTRRequestFormItem__c rqit = new CTRRequestFormItem__c();
                    rqit.Id = recordId;
                    rqit.Status__c = 'Rejected';
                    rqit.Approval_Step__c = 'Rejected';
                    rqit.NotifyCustomAction__c = 'Committee Rejected';
                    update rqit;

                    deleteCommitteeAttachments(recordId);
                    return;
                }
                if (allDone && hasRejected != true) {
                    CTRRequestFormItem__c rqit = new CTRRequestFormItem__c();
                    rqit.Id = recordId;
                    rqit.Status__c = 'Approved';
                    rqit.Approval_Step__c = 'Approved';
                    rqit.NotifyCustomAction__c = 'Committee Approved';
                    update rqit;

                    deleteCommitteeAttachments(recordId);
                    updateChangeCreditFinancialInfo(rqit.Id);
                    return;
                }
            } else {
                // Send Approve form email
                // CTRCommitteeApproval__c committeeToUpdate = new CTRCommitteeApproval__c();
                // committeeToUpdate.Id = recordId;
                // committeeToUpdate.ApprovalResult__c = appreovalAction;
                // committeeToUpdate.ApprovalDate__c = Date.today();
                // committeeToUpdate.Remark__c = remark;
                // update committeeToUpdate;
                // CTRCommitteeApproval__c committeeToUpdate = [SELECT Id, CTRRequestFormItem__c FROM CTRCommitteeApproval__c WHERE Id = :recordId];
                // // committeeToUpdate.Id = recordId;
                // committeeToUpdate.ApprovalResult__c = appreovalAction;
                // committeeToUpdate.ApprovalDate__c = Date.today();
                // committeeToUpdate.Remark__c = remark;
                // update committeeToUpdate;

                List<CTRCommitteeApproval__c> ctrCommitteeList =
                [   SELECT Id,CTRRequestFormItem__c,ApprovalResult__c,Remark__c, CTRRequestFormItem__r.RecordTypeName__c
                    FROM CTRCommitteeApproval__c
                    WHERE ApprovalResult__c IN ('Submit to Committee', 'Reply to TRCR', 'Reply to FA', 'Reply to FALB')
                    AND Id = :recordId
                ];
                if (ctrCommitteeList.size() > 0) {
                    for(CTRCommitteeApproval__c ctrCommittee: ctrCommitteeList){
                        CTRCommitteeApproval__c committeeToUpdate = new CTRCommitteeApproval__c();
                        ctrCommittee.ApprovalResult__c = appreovalAction;
                        ctrCommittee.ApprovalDate__c = Date.today();
                        ctrCommittee.Remark__c = remark;
                        committeeToUpdates.add(ctrCommittee);
                    }
                    update committeeToUpdates;

                    List<CTRCommitteeApproval__c> cmapList = [
                        SELECT Id,ApprovalResult__c
                        FROM CTRCommitteeApproval__c
                        WHERE CTRRequestFormItem__c  = :committeeToUpdates[0].CTRRequestFormItem__c
                    ];
                    Boolean allDone = true;
                    Boolean hasRejected = false;
                    for (CTRCommitteeApproval__c cmap : cmapList) {
                        if (cmap.ApprovalResult__c != 'Approved' && cmap.ApprovalResult__c != 'Rejected') {
                            allDone = false;
                        }
                        if (cmap.ApprovalResult__c == 'Rejected') {
                            hasRejected = true;
                        }
                    }
                    if (hasRejected == true) {
                        CTRRequestFormItem__c rqit = new CTRRequestFormItem__c();
                        rqit.Id = committeeToUpdates[0].CTRRequestFormItem__c;
                        rqit.Status__c = 'Rejected';
                        rqit.Approval_Step__c = 'Rejected';
                        rqit.NotifyCustomAction__c = 'Committee Rejected';
                        update rqit;

                        deleteCommitteeAttachments(committeeToUpdates[0].CTRRequestFormItem__c);
                        return;
                    }
                    if (allDone && hasRejected != true) {
                        CTRRequestFormItem__c rqit = new CTRRequestFormItem__c();
                        rqit.Id = committeeToUpdates[0].CTRRequestFormItem__c;
                        rqit.Status__c = 'Approved';
                        rqit.Approval_Step__c = 'Approved';
                        rqit.NotifyCustomAction__c = 'Committee Approved';
                        update rqit;

                        deleteCommitteeAttachments(committeeToUpdates[0].CTRRequestFormItem__c);
                        updateChangeCreditFinancialInfo(rqit.Id);
                        return;
                    }
                }
            }

        // } catch(Exception e){
        //     throw new AuraHandledException(e.getMessage());
        // }
    }

    private static void deleteCommitteeAttachments(String recordId) {
        CTRRequestFormItem__c reqattachment = [SELECT CommitteeAttachment__c FROM CTRRequestFormItem__c WHERE Id = :recordId LIMIT 1];

        List<Object> jsonList = (List<Object>) JSON.deserializeUntyped(reqattachment.CommitteeAttachment__c);

        // List to store ContentDocID values
        List<String> condocIdValues = new List<String>();

        // Iterate through the list to extract and add Title values to the list
        for (Object record : jsonList) {
            Map<String, Object> recordMap = (Map<String, Object>) record;
            // Map<String, Object> recordIdMap = (Map<String, Object>) record;
            String condocIdValue = (String) recordMap.get('Id'); //(Boolean)recordMap.get('IsSaved') ? (String) recordMap.get('Id') : null;

            // Add the id value to the list
            condocIdValues.add(condocIdValue);
        }

        delete [SELECT Id FROM ContentDocument WHERE Id IN :condocIdValues ];
    }

    // @AuraEnabled
    // public static void submitProcrssApprovalRequest_V2(Id recordId, String appreovalAction, String remark, Boolean sendFromSFDC){
    //     List<CTRCommitteeApproval__c> committeeToUpdates = new List<CTRCommitteeApproval__c>();
    //     List<CTRRequestFormItem__c> rqItemList = new List<CTRRequestFormItem__c>();
    //     Boolean isUpdateChangeCreditFin = false;
    //     // try {
    //         // Send Approve form SFDC
    //         if (sendFromSFDC) {
    //             // get user Id
    //             String userId = UserInfo.getUserId();
    //             List<CTRCommitteeApproval__c> ctrCommitteeList =
    //             [   SELECT Id,CTRRequestFormItem__c,ApprovalResult__c,Remark__c, CTRRequestFormItem__r.RecordTypeName__c
    //                 FROM CTRCommitteeApproval__c
    //                 WHERE ApprovalResult__c IN ('Submit to Committee', 'Reply to TRCR', 'Reply to FA', 'Reply to FALB')
    //                 AND CTRRequestFormItem__c  =:recordId
    //                 AND ApproverName__c =:userId
    //             ];
    //             for(CTRCommitteeApproval__c ctrCommittee: ctrCommitteeList){
    //                 CTRCommitteeApproval__c committeeToUpdate = new CTRCommitteeApproval__c();
    //                 committeeToUpdate.Id = ctrCommittee.Id;
    //                 committeeToUpdate.ApprovalResult__c = appreovalAction;
    //                 committeeToUpdate.ApprovalDate__c = Date.today();
    //                 committeeToUpdate.Remark__c = remark;
    //                 committeeToUpdates.add(committeeToUpdate);
    //             }
    //             update committeeToUpdates;

    //             List<CTRCommitteeApproval__c> cmapList = [
    //                 SELECT Id,ApprovalResult__c
    //                 FROM CTRCommitteeApproval__c
    //                 WHERE CTRRequestFormItem__c  =:recordId
    //             ];
    //             Boolean allDone = true;
    //             Boolean hasRejected = false;
    //             for (CTRCommitteeApproval__c cmap : cmapList) {
    //                 if (cmap.ApprovalResult__c != 'Approved' && cmap.ApprovalResult__c != 'Rejected') {
    //                     allDone = false;
    //                 }
    //                 if (cmap.ApprovalResult__c == 'Rejected') {
    //                     hasRejected = true;
    //                 }
    //             }
    //             if (hasRejected == true) {
    //                 CTRRequestFormItem__c rqit = new CTRRequestFormItem__c();
    //                 rqit.Id = recordId;
    //                 rqit.Status__c = 'Rejected';
    //                 rqit.Approval_Step__c = 'Rejected';
    //                 rqit.NotifyCustomAction__c = 'Committee Rejected';
    //                 rqItemList.add(rqit);
    //                 // update rqit;
    //                 // return;
    //             }
    //             if (allDone && hasRejected != true) {
    //                 CTRRequestFormItem__c rqit = new CTRRequestFormItem__c();
    //                 rqit.Id = recordId;
    //                 rqit.Status__c = 'Approved';
    //                 rqit.Approval_Step__c = 'Approved';
    //                 rqit.NotifyCustomAction__c = 'Committee Approved';
    //                 rqItemList.add(rqit);

    //                 isUpdateChangeCreditFin = true;
    //                 // update rqit;

    //                 // updateChangeCreditFinancialInfo(rqit.Id);
    //                 // return;
    //             }
    //         } else {
    //             // Send Approve form email
    //             // CTRCommitteeApproval__c committeeToUpdate = new CTRCommitteeApproval__c();
    //             // committeeToUpdate.Id = recordId;
    //             // committeeToUpdate.ApprovalResult__c = appreovalAction;
    //             // committeeToUpdate.ApprovalDate__c = Date.today();
    //             // committeeToUpdate.Remark__c = remark;
    //             // update committeeToUpdate;
    //             // CTRCommitteeApproval__c committeeToUpdate = [SELECT Id, CTRRequestFormItem__c FROM CTRCommitteeApproval__c WHERE Id = :recordId];
    //             // // committeeToUpdate.Id = recordId;
    //             // committeeToUpdate.ApprovalResult__c = appreovalAction;
    //             // committeeToUpdate.ApprovalDate__c = Date.today();
    //             // committeeToUpdate.Remark__c = remark;
    //             // update committeeToUpdate;

    //             List<CTRCommitteeApproval__c> ctrCommitteeList =
    //             [   SELECT Id,CTRRequestFormItem__c,ApprovalResult__c,Remark__c, CTRRequestFormItem__r.RecordTypeName__c
    //                 FROM CTRCommitteeApproval__c
    //                 WHERE ApprovalResult__c IN ('Submit to Committee', 'Reply to TRCR', 'Reply to FA', 'Reply to FALB')
    //                 AND Id = :recordId
    //             ];
    //             if (ctrCommitteeList.size() > 0) {
    //                 for(CTRCommitteeApproval__c ctrCommittee: ctrCommitteeList){
    //                     CTRCommitteeApproval__c committeeToUpdate = new CTRCommitteeApproval__c();
    //                     ctrCommittee.ApprovalResult__c = appreovalAction;
    //                     ctrCommittee.ApprovalDate__c = Date.today();
    //                     ctrCommittee.Remark__c = remark;
    //                     committeeToUpdates.add(ctrCommittee);
    //                 }
    //                 update committeeToUpdates;

    //                 List<CTRCommitteeApproval__c> cmapList = [
    //                     SELECT Id,ApprovalResult__c
    //                     FROM CTRCommitteeApproval__c
    //                     WHERE CTRRequestFormItem__c  = :committeeToUpdates[0].CTRRequestFormItem__c
    //                 ];
    //                 Boolean allDone = true;
    //                 Boolean hasRejected = false;
    //                 for (CTRCommitteeApproval__c cmap : cmapList) {
    //                     if (cmap.ApprovalResult__c != 'Approved' && cmap.ApprovalResult__c != 'Rejected') {
    //                         allDone = false;
    //                     }
    //                     if (cmap.ApprovalResult__c == 'Rejected') {
    //                         hasRejected = true;
    //                     }
    //                 }
    //                 if (hasRejected == true) {
    //                     CTRRequestFormItem__c rqit = new CTRRequestFormItem__c();
    //                     rqit.Id = committeeToUpdates[0].CTRRequestFormItem__c;
    //                     rqit.Status__c = 'Rejected';
    //                     rqit.Approval_Step__c = 'Rejected';
    //                     rqit.NotifyCustomAction__c = 'Committee Rejected';
    //                     // update rqit;
    //                     // return;
    //                     rqItemList.add(rqit);
    //                 }
    //                 if (allDone && hasRejected != true) {
    //                     CTRRequestFormItem__c rqit = new CTRRequestFormItem__c();
    //                     rqit.Id = committeeToUpdates[0].CTRRequestFormItem__c;
    //                     rqit.Status__c = 'Approved';
    //                     rqit.Approval_Step__c = 'Approved';
    //                     rqit.NotifyCustomAction__c = 'Committee Approved';
    //                     // update rqit;

    //                     // updateChangeCreditFinancialInfo(rqit.Id);
    //                     // return;
    //                     rqItemList.add(rqit);
    //                     isUpdateChangeCreditFin = true;
    //                 }
    //             }
    //         }

    //         if(rqItemList.size() > 0) {
    //             update rqItemList;

    //             if(isUpdateChangeCreditFin) {
    //                 updateChangeCreditFinancialInfo(rqItemList[0].Id);
    //             }
    //         }
    //     // } catch(Exception e){
    //     //     throw new AuraHandledException(e.getMessage());
    //     // }
    // }

    @AuraEnabled
	public static String getRecordType(Id recordId) {
    CTRRequestFormItem__c recordTypeCTRRequestFormItem = [SELECT Id, RecordTypeId, RecordTypeName__c, ServiceArea__c FROM CTRRequestFormItem__c WHERE Id = :recordId];

    String recordTypeRequestFormItem = recordTypeCTRRequestFormItem.RecordTypeName__c;

    return recordTypeRequestFormItem;
}

    @AuraEnabled
    public static void submitReplyTo(String recordId, String message, String actionButton){
        // try{
            // User submitter = [SELECT Id, Email FROM User WHERE Id =: UserInfo.getUserId()];
            system.debug('recordId ---'+recordId);
            // Get the ID of the organization-wide email address
            OrgWideEmailAddress orgWideEmail = [SELECT Id FROM OrgWideEmailAddress WHERE DisplayName = 'Commercial Team'];
            // query requestItem Id
            CTRCommitteeApproval__c  rqForm = [
                SELECT
                    CTRRequestFormItem__c,
                    CTRRequestFormItem__r.Message__c,
                    CTRRequestFormItem__r.EmailTo__c,
                    CTRRequestFormItem__r.EmailCC__c,
                    CTRRequestFormItem__r.Subject__c,
                    ApproverName__r.Name,
                    CTRRequestFormItem__r.CreditOwner__r.Email,
                    CTRRequestFormItem__r.CreditOwnerName__c,
                    CTRRequestFormItem__r.CreditOwnerSectionHead__c,
                    CTRRequestFormItem__r.CreditOwnerSectionHead__r.Name,
                    CTRRequestFormItem__r.CreditOwnerSectionHead__r.Email,
                    CTRRequestFormItem__r.fmlAccountTypeName__c,
                    CTRRequestFormItem__r.CompanyNameSubject__c,
                    CTRRequestFormItem__r.BusinessUnit__c,
                    CTRRequestFormItem__r.SubBU__c,
                    CTRRequestFormItem__r.Name,
                    CTRRequestFormItem__r.fmlPositionNameOfFinancial__c,
                    Owner.Name,
                    ApproverName__r.Email
                FROM CTRCommitteeApproval__c
                WHERE id =:recordId];

            CTRConfig__c customSetting = CTRConfig__c.getInstance();
            String valueURL = customSetting.EmailService__c;

            if (rqForm.CTRRequestFormItem__r.EmailCC__c == null ||rqForm.CTRRequestFormItem__r.EmailCC__c == '') {
            	rqForm.CTRRequestFormItem__r.EmailCC__c = valueURL;
            } else if (rqForm.CTRRequestFormItem__r.EmailCC__c.indexOf(valueURL) == -1) {
        		rqForm.CTRRequestFormItem__r.EmailCC__c = rqForm.CTRRequestFormItem__r.EmailCC__c+', '+valueURL;
			}

            //String[] splitEmailTo = rqForm.CTRRequestFormItem__r.EmailTo__c.split(',');
            String[] splitEmailTo = new List <String>();
            if (rqForm.CTRRequestFormItem__r.BusinessUnit__c == 'TX') {
                splitEmailTo.add(rqForm.CTRRequestFormItem__r.CreditOwner__r.Email);
            } else {
                splitEmailTo.add(rqForm.CTRRequestFormItem__r.CreditOwnerSectionHead__r.Email); // CC Section Head
            }

            // String[] splitEmailCC = rqForm.CTRRequestFormItem__r.EmailCC__c.split(',');
            // Email CC Replace 'space', usage query where Email IN emailCC
            String[] emailCC = rqForm.CTRRequestFormItem__r.EmailCC__c?.split(',');
            if (emailCC != null) {
                for (Integer i = 0; i < emailCC.size(); i++) {
                    emailCC[i] = CTRCommitteeSelectionController.extractEmailAddress(emailCC[i]);
                    //emailCC[i] = emailCC[i].replace('\\s', '').trim();
                }
            }

            //TODO Query user from EmailTo, Use show 'User Name' in content message.
            // List<User> users = [SELECT Id, Name FROM User WHERE Email IN :emailCC];
            // List<User> users = [SELECT Name FROM User WHERE Email='woraporn.l@roundtwosolutions.com']; //TODO mockup value //use Name in email message.
            // System.debug('result::'+users);
            // Add emailCC in list<String> param0
            List<String> eCC = new list<String>();
            if (emailCC != null) {
                for (Integer i = 0; i < emailCC.size(); i++) {
                    eCC.add(emailCC[i]); // CC
                }
            }
            eCC.add(rqForm.ApproverName__r.Email); // CC Committee
            List<User> trcr = getTRCR(recordId);
            if (trcr != null) {
                for (Integer i = 0; i < trcr.size(); i++) {
                    eCC.add(trcr[i].Email);
                }
            }
            // List<CTRExternalEmailGroup__mdt> mailGroup = [SELECT Email__c FROM CTRExternalEmailGroup__mdt WHERE DeveloperName IN ('TRCR')];
            // if (mailGroup.size() > 0) {
            //     for (Integer i = 0; i < mailGroup.size(); i++) {
            //         eCC.add(mailGroup[i].Email__c);
            //     }
            // }

            String subjecttemp = rqForm.CTRRequestFormItem__r.Subject__c;

            if(rqForm.CTRRequestFormItem__r.Subject__c != null) {
                if(!subjecttemp.contains('[RequestNo.:')) {
                    subjecttemp = '[RequestNo.:'+rqForm.CTRRequestFormItem__c+']'+subjecttemp;
                }
                subjecttemp = 'Re:' + subjecttemp;
            }

            //Messaging.SingleEmailMessage emailTosend = emailTemplateFormSend(rqForm.CTRRequestFormItem__c,subjecttemp,recordId, orgWideEmail.Id, rqForm.ApproverName__r.Name, message, users[0].Name, eCC, splitEmailTo, actionButton);
            // Messaging.SingleEmailMessage emailTosend = emailTemplateFormSend(rqForm.CTRRequestFormItem__c,subjecttemp,recordId, orgWideEmail.Id, rqForm.ApproverName__r.Name, message, users[0].Name, splitEmailTo, eCC, actionButton);
            // Messaging.SingleEmailMessage emailTosend = emailTemplateFormSend(rqForm.CTRRequestFormItem__c,subjecttemp,recordId, orgWideEmail.Id, rqForm.ApproverName__r.Name, message, rqForm.CTRRequestFormItem__r.CreditOwner__r.Name, splitEmailTo, eCC, actionButton);
            Messaging.SingleEmailMessage emailTosend = emailTemplateFormSend(recordId, orgWideEmail.Id, rqForm.CTRRequestFormItem__r.SubBU__c, subjecttemp, rqForm.CTRRequestFormItem__r.Name, rqForm.CTRRequestFormItem__r.fmlAccountTypeName__c, rqForm.CTRRequestFormItem__r.CompanyNameSubject__c,rqForm.ApproverName__r.Name, rqForm.CTRRequestFormItem__r.CreditOwnerSectionHead__r.Name, message, splitEmailTo, eCC, actionButton, rqForm.CTRRequestFormItem__c, rqForm.CTRRequestFormItem__r.fmlPositionNameOfFinancial__c);
            try {
                Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[]{emailTosend});
            } catch(Exception ex) {
                System.debug(ex.getMessage());
            }

            // Send Reply form email and save field Message in CTRCommitteeApprovalObj
            CTRCommitteeApproval__c committeeToUpdate = new CTRCommitteeApproval__c();
            committeeToUpdate.Id = recordId;
            committeeToUpdate.Remark__c = message;
            committeeToUpdate.ReplytoTRCR__c = message;
            if (actionButton == 'ReplyFA') {
                committeeToUpdate.ApprovalResult__c = 'Reply to FA';
            } else if (actionButton == 'ReplyFALB') {
                committeeToUpdate.ApprovalResult__c = 'Reply to FALB';
            } else {
                committeeToUpdate.ApprovalResult__c = 'Reply to TRCR';
            }

            //if(actionButton == 'ReplyTRCR'){
            //    committeeToUpdate.ReplytoTRCR__c = message;
            //}else if(actionButton == 'ReplyFA'){
            //    committeeToUpdate.ReplytoFA__c = message;
            //}
            update committeeToUpdate;

            CTRRequestFormItem__c CTRReqItem = [SELECT id,CCEmail__c, Status__c, Approval_Step__c, ServiceArea__c from CTRRequestFormItem__c where id =:rqForm.CTRRequestFormItem__c];
            // CTRReqItem.CCEmail__c = '['+CTRReqItem.CCEmail__c + emailTosend.HtmlBody+']';
            // CTRReqItem.Status__c = 'In Review';
            // CTRReqItem.Approval_Step__c = 'Select Committee';
            CTRReqItem.ReplyToTRCRHistory__c = '['+CTRReqItem.CCEmail__c + emailTosend.HtmlBody+']';
            update CTRReqItem;


        // }catch (Exception e) {
        //     system.debug('committeetakeactionapprove ---'+e.getMessage()+' line:'+e.getlinenumber());
        //     throw new AuraHandledException(e.getMessage());
        // }
    }

    // public static Messaging.SingleEmailMessage emailTemplateFormSend(string reqItemId,string reqItemSubject,String recordId,String orgWideEmailId, String approveName, String message, String emailName, String[] emailToAddresses, String[] emailCCAddresses, String actionButton){
    public static Messaging.SingleEmailMessage emailTemplateFormSend(String recordId,String orgWideEmailId, String subBU, String emailSubject, String formItemName, String accountType, String companyName, String approveName, String emailName, String message, String[] emailToAddresses, String[] emailCCAddresses, String actionButton, String reqFormId, String financialPositionName){
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        // set HTML body in emal Reply
        // String subProfile;
        // String subText;
        // if(actionButton == 'ReplyTRCR'){
        //     subProfile = '[TOP]';
        //     subText = 'Supplier Registration';
        // }else{
        //     subProfile = '[TX]';
        //     subText = 'Customer Registration';
        // }

        String url = URL.getOrgDomainUrl().toExternalForm() + '/' + reqFormId;
        EmailTemplate emailTemplate = [SELECT Id,Subject,Description,HtmlValue,DeveloperName,Body FROM EmailTemplate WHERE developername = 'CTRCommitteeReplytoTRCR' AND IsActive = true];
        String emailContentMessage = emailTemplate.HtmlValue.replace('{!CTRRequestFormItem__c.CreditOwnerName__c}',emailName != null ? emailName : '');
        emailContentMessage = emailContentMessage.replace('{!CTRCommitteeApproval__c.ApproverName__c}',approveName != null ? approveName : '');
        emailContentMessage = emailContentMessage.replace('{!CTRCommitteeApproval__c.ReplytoTRCR__c}',message != null ? message : '');
        emailContentMessage = emailContentMessage.replace('{!CTRRequestFormItem__c.fmlPositionNameOfFinancial__c}',financialPositionName != null ? financialPositionName : '');
        emailContentMessage = emailContentMessage.replace('{$url$}', '<a href="' + url + '" target="_blank">this link</a>');

        if(emailSubject == null) {
            emailSubject = emailTemplate.Subject;
        }
        emailSubject = emailSubject.replace('{!CTRRequestFormItem__c.fmlAccountTypeName__c}',accountType != null ? accountType : '');
        emailSubject = emailSubject.replace('{!CTRRequestFormItem__c.CompanyNameSubject__c}',companyName != null ? companyName : '');
        emailSubject = emailSubject.replace('{!CTRRequestFormItem__c.SubBU__c}',subBU != null ? subBU : '');
        emailSubject = emailSubject.replace('{!CTRRequestFormItem__c.Name}',formItemName != null ? formItemName : '');


        // String emailContentMessage = '<p> Dear ' + emailName + '</p>'+'<br> <p>You received a comment from the committee. ' + approveName + ', on the approval request. Please see the message below and reply to the commmittee.</p>';
        // String emailContentMessageReply = message;
        // String footerOfEmail = '<p> Best Regards,</p><p>Counterparties Registration Automated System</p>';
        email.setToAddresses(emailToAddresses);

        if(!emailCCAddresses.contains('ccemailcommitteetestuser@278tumlkpac10g9kik3znxpnfa13iz7hj9w1rudnbh2cj8m2pw.1m-2nh5eam.cs117.apex.sandbox.salesforce.com')){
            	emailCCAddresses.add('ccemailcommitteetestuser@278tumlkpac10g9kik3znxpnfa13iz7hj9w1rudnbh2cj8m2pw.1m-2nh5eam.cs117.apex.sandbox.salesforce.com');
            //emailCCAddresses.add('an.t@roundtwosolutions.com');
		}
        email.setCcAddresses(emailCCAddresses);
        email.setWhatId(recordId);
        email.setSubject(emailSubject);
        // email.setSubject(reqItemSubject);
        //email.setSubject('[FYA]'+subProfile+' : Request for Approval of New '+subText+': P. General Group Co.,LTD.');
        // email.setHtmlBody(emailContentMessage+'<br>'+emailContentMessageReply+'<br><br>'+footerOfEmail);
        email.setHtmlBody(emailContentMessage);
        email.setSaveAsActivity(false);
        email.setOrgWideEmailAddressId(orgWideEmailId);
        email.setCharset('UTF-8');
        return email;
    }

    @AuraEnabled
    public static String checkPermissionBeforeShowModal(String recordId){
        String userId = UserInfo.getUserId();
        String ctrCommittee = 'DoNotHavePermission' ;
        //action on salesforce

        if (isCTRRequestFormItemId(recordId)) {
            List<CTRCommitteeApproval__c> ctrCommitteeList =
            [   SELECT Id,CTRRequestFormItem__c,ApprovalResult__c,Remark__c, CTRRequestFormItem__r.RecordTypeName__c
                FROM CTRCommitteeApproval__c
                WHERE CTRRequestFormItem__c  =:recordId
                AND ApproverName__c =:userId
            ];

            List<CTRCommitteeApproval__c> ctrCommitteeListReply =
            [   SELECT Id,CTRRequestFormItem__c,ApprovalResult__c,Remark__c, CTRRequestFormItem__r.RecordTypeName__c
                FROM CTRCommitteeApproval__c
                WHERE ApprovalResult__c IN ('Reply to TRCR', 'Reply to FA', 'Reply to FALB')
                AND CTRRequestFormItem__c  =:recordId
                AND ApproverName__c =:userId
            ];

            List<CTRCommitteeApproval__c> ctrCommitteeListAppName =
            [   SELECT Id,CTRRequestFormItem__c,ApprovalResult__c,Remark__c, CTRRequestFormItem__r.RecordTypeName__c
                FROM CTRCommitteeApproval__c
                WHERE ApprovalResult__c IN ('Approved', 'Rejected')
                AND CTRRequestFormItem__c  =:recordId
                AND ApproverName__c =:userId
            ];

            if (ctrCommitteeListReply != null && ctrCommitteeListReply.size() > 0) {
                ctrCommittee='RepliedAgain';
            }
            else if (ctrCommitteeListAppName != null && ctrCommitteeListAppName.size() > 0) {
                ctrCommittee='ApprovedAgain';
            }
            else if(ctrCommitteeList != null && ctrCommitteeList.size() > 0) {
                ctrCommittee='Approved';
            }
            else {
                ctrCommittee='DoNotHavePermission';
            }

            return ctrCommittee ;
        } else if (isCTRCommitteeApprovalId(recordId)) {
            return checkPermissionBeforeShowModalEmail(recordId);
        }

        return ctrCommittee;
    }

    @AuraEnabled
    public static String checkPermissionBeforeShowModalEmail(String recordId){
        String userId = UserInfo.getUserId();
        String ctrCommittee = null;

        //action on email
        List<CTRCommitteeApproval__c> ctrCommitteeListEmail =
        [   SELECT Id,CTRRequestFormItem__c,ApprovalResult__c,Remark__c, CTRRequestFormItem__r.RecordTypeName__c
            FROM CTRCommitteeApproval__c
            WHERE Id  =:recordId
            // AND ApproverName__c =:userId
        ];

        List<CTRCommitteeApproval__c> ctrCommitteeListReply =
        [   SELECT Id,CTRRequestFormItem__c,ApprovalResult__c,Remark__c, CTRRequestFormItem__r.RecordTypeName__c
            FROM CTRCommitteeApproval__c
            WHERE ApprovalResult__c IN ('Reply to TRCR', 'Reply to FA', 'Reply to FALB')
            AND Id  =:recordId
            // AND ApproverName__c =:userId
        ];

        List<CTRCommitteeApproval__c> ctrCommitteeListAppNameEmail =
        [   SELECT Id,CTRRequestFormItem__c,ApprovalResult__c,Remark__c, CTRRequestFormItem__r.RecordTypeName__c
            FROM CTRCommitteeApproval__c
            WHERE ApprovalResult__c IN ('Approved', 'Rejected')
            AND Id  =:recordId
            // AND ApproverName__c =:userId
        ];

        if (ctrCommitteeListReply != null && ctrCommitteeListReply.size() > 0) {
            ctrCommittee='RepliedAgain';
        } else if (ctrCommitteeListAppNameEmail != null && ctrCommitteeListAppNameEmail.size() > 0) {
            ctrCommittee='ApprovedAgain';
        } else if(ctrCommitteeListEmail != null && ctrCommitteeListEmail.size() > 0) {
            ctrCommittee='Approved';
        } else {
            ctrCommittee='DoNotHavePermission';
        }

        return ctrCommittee ;
    }

    private static Boolean isCTRCommitteeApprovalId(string recordId) {
        String recordIdPrefix = String.valueOf(recordId).substring(0,3);
        String prefixCTRCommitteeApproval = Schema.SObjectType.CTRCommitteeApproval__c.getKeyPrefix();
        return recordIdPrefix == prefixCTRCommitteeApproval;
    }

    private static Boolean isCTRRequestFormItemId(string recordId) {
        String recordIdPrefix = String.valueOf(recordId).substring(0,3);
        String prefixCTRRequestFormItem = Schema.SObjectType.CTRRequestFormItem__c.getKeyPrefix();
        return recordIdPrefix == prefixCTRRequestFormItem;
    }

    @AuraEnabled
    public static string getCTRCommitteeApprovalId(String recordId){
        String userId = UserInfo.getUserId();
        List<CTRCommitteeApproval__c> ctrCommitteeList =
        [   SELECT Id,CTRRequestFormItem__c,ApprovalResult__c, CTRRequestFormItem__r.RecordTypeName__c
            FROM CTRCommitteeApproval__c
            WHERE ApprovalResult__c IN ('Submit to Committee', 'Reply to TRCR', 'Reply to FA', 'Reply to FALB')
            AND CTRRequestFormItem__c  =:recordId
            AND ApproverName__c =:userId
        ];

        List<CTRCommitteeApproval__c> ctrCommitteeListApproved =
        [   SELECT Id,CTRRequestFormItem__c,ApprovalResult__c,Remark__c, CTRRequestFormItem__r.RecordTypeName__c
            FROM CTRCommitteeApproval__c
            WHERE ApprovalResult__c IN ('Approved')
            AND CTRRequestFormItem__c  =:recordId
            AND ApproverName__c =:userId
        ];

        string CTRCommitteeApprovaId = null;

        if(ctrCommitteeListApproved != null && ctrCommitteeListApproved.size() > 0){
            CTRCommitteeApprovaId = 'ApprovedAgain';
        } else if(ctrCommitteeList != null && ctrCommitteeList.size() > 0){
            CTRCommitteeApprovaId = ctrCommitteeList[0].Id;
        }

        system.debug('CTRCommitteeApprovaId----'+CTRCommitteeApprovaId);
        return CTRCommitteeApprovaId;
    }
    @AuraEnabled
    public static string getActionButton(String recordId){
        String userId = UserInfo.getUserId();
        string BuProfile = CTRBuProfileController.checkBusinessUnitFromProfile(userId,recordId).BusinessUnit__c;
        String result;
         switch on BuProfile {
            when 'TOP' {
                result = 'ReplyTRCR';
            }
            when 'TX' {
                result = 'ReplyFA';
            }
            when 'LABIX' {
                result = 'ReplyFALB';
            }
            when else {
                result = 'Other';
            }
        }

        return result;
    }

    private static void updateChangeCreditFinancialInfo(Id recordId) {
        CTRRequestFormItem__c rqit = [
            SELECT Id, ChangeCreditInternalCreditRating__c, ChangeCreditCreditCondition__c, ChangeCreditCreditLimit__c, FinancialKey__c,Customer__c,Credit_Condition__c,CreditLimit__c, ServiceArea__c
            FROM CTRRequestFormItem__c
            WHERE Id = :recordId
        ];

        String accountId = rqit.Customer__c;
        String financialKey = rqit.FinancialKey__c;
        List<C360_FinancialInfo__c> fcif = [
            SELECT Id, InternalCreditRating__c, Credit_Condition__c, CreditLimit__c
            FROM C360_FinancialInfo__c
            WHERE CompanyName__c = :accountId
                AND Key__c = :financialKey
        ];

        if(fcif.size() > 0)
        {
            fcif[0].InternalCreditRating__c = rqit.ChangeCreditCreditCondition__c;
            fcif[0].Credit_Condition__c = rqit.Credit_Condition__c;
            fcif[0].CreditLimit__c = rqit.CreditLimit__c;

            update fcif[0];
        }

    }

    private static List<User> getTRCR(String recordId) {
        List<CTRRequestFormItem__c> usr = [SELECT SubBU__c, InterestedProductTypeAsSupplierTOP__c, RecordType.Name, Country__r.Code__c, ServiceArea__c FROM CTRRequestFormItem__c WHERE Id = :recordId];

        if (!(usr.size() > 0)) {
            return new List<User>();
        }

        String salesOrg = usr[0].SubBU__c;
        String counterpartyType = usr[0].RecordType?.Name?.contains('Customer') ? 'Customer' : (usr[0].RecordType?.Name?.contains('Supplier') ? 'Supplier' : '');
        // String isDom = usr[0].Country__r?.Code__c == 'TH' ? 'Domestic' : 'International';
        String isDom = (usr[0].ServiceArea__c != null) ? usr[0].ServiceArea__c: 'Domestic' ;
        String product = usr[0].InterestedProductTypeAsSupplierTOP__c;
        String hasCrude = String.isNotBlank(product) && product.contains('Crude') ? 'Crude' : '';
        String interByTX = 'No';

        return CTRCommitteeSelectionController.getTRCR(salesOrg, counterpartyType, isDom, hasCrude, interByTX);
    }

}