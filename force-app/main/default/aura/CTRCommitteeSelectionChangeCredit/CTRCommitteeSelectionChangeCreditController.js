({
    doInit: function (component, event, helper) {
        helper.component = component;
        // helper.disableEditMode();
        helper.setIsDataLoading(true);

        const p1 = helper.onLoadedBUProfile = helper.getCurrentUserBUProfile();
        const p2 = helper.onLoadedRequestCounterpartyType = helper.getRequestCounterpartyType();
        const p3 = helper.onLoadedCommitteeInfo = Promise.all([p1, p2]).then($A.getCallback(function () {
            return helper.getCommitteeInfo();
        })).catch($A.getCallback(function (error) {
            helper.showToast(error.message, 'error');
        }));
        const p4 = helper.onLoadedGroupedCommittees = helper.getGroupedCommittees();
        const p5 = p3.then($A.getCallback(() => {
            const subBU = helper.getSubBU();
            const counterpartyType = helper.getCounterpartyType();
            const type = helper.isDomesticOrInternational();
            const hasCrude = helper.hasCrudeProduct() ? "Crude" : "";
            const interByTX = helper.isInterByTX() ? "Yes" : "No";

            return helper.getTRCR(subBU, counterpartyType, type, hasCrude, interByTX);
        })).catch($A.getCallback((error) => {
            helper.showToast(error.message, 'error');
        }));
        const p6 = p3.then($A.getCallback(() => {
            const subBU = helper.getSubBU();
            const counterpartyType = helper.getCounterpartyType();
            const type = helper.isDomesticOrInternational();
            const hasCrude = helper.hasCrudeProduct() ? "Crude" : "";
            const interByTX = helper.isInterByTX() ? "Yes" : "No";

            return helper.getTRCRSectionHead(subBU, counterpartyType, type, hasCrude, interByTX);
        })).catch($A.getCallback((error) => {
            helper.showToast(error.message, 'error');
        }));
        const p7 = p3.then($A.getCallback(() => {
            const subBU = helper.getSubBU();
            const counterpartyType = helper.getCounterpartyType();
            const type = helper.isDomesticOrInternational();
            const hasCrude = helper.hasCrudeProduct() ? "Crude" : "";
            const interByTX = helper.isInterByTX() ? "Yes" : "No";

            return helper.getCEO(subBU, counterpartyType, type, hasCrude, interByTX);
        })).catch($A.getCallback((error) => {
            helper.showToast(error.message, 'error');
        }));
        const p8 = p3.then($A.getCallback(() => {
            return helper.getSpecialGroupedCommittees();
        })).catch($A.getCallback((error) => {
            helper.showToast(error.message, 'error');
        }));

        Promise.all([p3, p4, p5, p6, p7, p8]).then($A.getCallback(function ([committeeInfo, groupedCommittees, trcrList, trcrHeadList, ceoList, changeCommittees]) {
            const bu = helper.getBU();
            const subBU = helper.getSubBU();
            console.log('Debug changeCommittees',changeCommittees)
            console.log('Debug committeeInfo',committeeInfo)
            if (!$A.util.isEmpty(changeCommittees)) {
                const lstCommittee = helper.convertChangeCreditCommitteesToList(changeCommittees);
                const lstCompany = [subBU];

                if (!committeeInfo.EmailAuthorization__c && !committeeInfo.CommitteeName__c) {
                    helper.defaultChangeCreditCommittee(lstCommittee, lstCompany, committeeInfo);
                } else {
                    helper.loadChangeCreditCommittee(lstCommittee, lstCompany, committeeInfo);
                }
            } else {
                const lstCommittee = helper.convertGroupedCommitteesToList(groupedCommittees);
                const lstCompany = [subBU];
    
                if (String(committeeInfo.EmailAuthorization__c).toLowerCase() === "ceo required") {
                    component.set("v.emailInfo.EmailTo__c", helper.getCEOEmail());
                    component.set("v.requestFormObj.EmailTo__c", helper.getCEOEmail());
                    helper.loadCommittee(lstCommittee, lstCompany, committeeInfo);
                } else if (String(committeeInfo.EmailAuthorization__c).toLowerCase() === "committee required") {
                    if (!committeeInfo.CommitteeName__c) {
                        helper.defaultCommittee(lstCommittee, lstCompany, committeeInfo);
                    } else {
                        helper.loadCommittee(lstCommittee, lstCompany, committeeInfo);
                    }
                } else {
                    helper.loadCommittee(lstCommittee, lstCompany, committeeInfo);
                }
                
                if (bu === "TX") {
                    helper.setEmailAuthorizationTX();
                    if (!committeeInfo.CommitteeName__c && committeeInfo.EmailAuthorization__c !== "Committee Required") {
                        helper.defaultCommittee(lstCommittee, lstCompany, committeeInfo);
                    }
                }
    
                helper.setDefaultFinalCreditCondition();
            }

            helper.canEdit(trcrList, trcrHeadList);
            helper.setCreditOwnerWhereCondition(trcrList);
        })).catch($A.getCallback(function (error) {
            helper.showToast(error.message, 'error');
        })).finally($A.getCallback(function () {
            helper.setIsDataLoading(false);
        }));
    },

    handleClickSelectCommittee: function (component, event, helper) {
        helper.enableEditMode();
        let cmpEmailAuthorization = component.find("EmailAuthorization");
        if (!$A.util.isEmpty(cmpEmailAuthorization)) {
            if ($A.util.isArray(cmpEmailAuthorization)) {
                cmpEmailAuthorization = cmpEmailAuthorization[0];
            }
            const emailAuthorization = cmpEmailAuthorization.get("v.value");
            const emailAuthorizationLowerCase = String(emailAuthorization).toLowerCase();
            helper.toggleCommitteeSelection(emailAuthorizationLowerCase);
        }
    },

    handleClickToggleSection: function (component, event, helper) {
        const sectionAuraId = event.currentTarget.getAttribute("data-auraid");
        const sectionDiv = component.find(sectionAuraId).getElement();
        const sectionState = sectionDiv.getAttribute("class").search("slds-is-open");

        if (sectionState == -1) {
            sectionDiv.setAttribute("class", "slds-section slds-is-open");
        } else {
            sectionDiv.setAttribute("class", "slds-section");
        }
    },

    handleClickPreview: function (component, event, helper) {
        helper.setPreviewEMailInfo();
        component.set("v.isModalOpen", true);
    },

    handleClickCancel: function (component, event, helper) {
        window.location.reload();
    },

    handleClickRevert: function (component, event, helper) {
        helper.setIsDataSaving(true);
        helper.revertToTRCR()
            .then($A.getCallback(function () {
                helper.disableEditMode();
                window.setTimeout(
                    $A.getCallback(function () {
                        window.location.reload();
                    }), 3000
                );
            }))
            .catch($A.getCallback(function (errors) {
                errors.forEach($A.getCallback(function(error) {
                    let errorMessage = "Error when revert to Credit Team: ";
                    if ($A.util.isArray(error.fieldErrors)) {
                        error.fieldErrors.forEach($A.getCallback(function(fieldError) {
                            helper.showToast(errorMessage + fieldError.message, "error");
                        }));
                    }
                    if ($A.util.isArray(error.pageErrors)) {
                        error.pageErrors.forEach($A.getCallback(function(pageError) {
                            helper.showToast(errorMessage + pageError.message, "error");
                        }));
                    }
                }));
            }))
            .finally($A.getCallback(function () {
                helper.setIsDataSaving(false);
            }));
    },

    handleClickSubmitToSH: function (component, event, helper) {
        event.preventDefault();
        helper.submitType = "SubmitToSH";
        document.getElementById("buttonSave").click();
    },

    handleClickSubmitToCommittees: function (component, event, helper) {
        event.preventDefault();
        helper.submitType = "SubmitToCommittee";
        document.getElementById("buttonSave").click();
    },

    handleSave: function (component, event, helper) {
        event.preventDefault();

        let cmpEmailAuthorization = component.find("EmailAuthorization");
        if (!$A.util.isEmpty(cmpEmailAuthorization)) {
            if ($A.util.isArray(cmpEmailAuthorization)) {
                cmpEmailAuthorization = cmpEmailAuthorization[0];
            }
            const emailAuthorization = cmpEmailAuthorization.get("v.value");
            const emailAuthorizationLowerCase = String(emailAuthorization).toLowerCase();

            const emailInfo = component.get('v.emailInfo');
            if (
                (emailAuthorizationLowerCase === "ceo required" ||
                    emailAuthorizationLowerCase === "committee required") &&
                ($A.util.isEmpty(emailInfo) ||
                    $A.util.isEmpty(emailInfo.Subject__c) ||
                    $A.util.isEmpty(emailInfo.Message__c))
            ) {
                helper.showToast('Please recheck Email information', 'error');
                return;
            }

            const selectedEmailCommittees = component.get('v.selectedEmailCommittees');
            if (
                emailAuthorizationLowerCase === "committee required" &&
                (!selectedEmailCommittees || selectedEmailCommittees.length === 0)
            ) {
                helper.showToast('Please select Committee Name', 'error');
                return;
            }

            if (helper.submitType === 'SubmitToSH') {
                let cmpCTRFileUpload = component.find("CTRFileUpload");
                if ($A.util.isArray(cmpCTRFileUpload)) {
                    cmpCTRFileUpload = cmpCTRFileUpload[0];
                }
                cmpCTRFileUpload.deletePendingAttachments()
                    .then($A.getCallback(function () {
                        component.set(
                            "v.requestFormObj.CommitteeAttachment__c",
                            JSON.stringify(cmpCTRFileUpload.getMergedAttachments()));

                        helper.setIsDataSaving(true);
                        helper.disableEditMode();

                        return helper.submitToSH();
                    }))
                    .then($A.getCallback(function () {
                        window.setTimeout(
                            $A.getCallback(function () {
                                window.location.reload();
                            }), 3000
                        );
                    }))
                    .catch($A.getCallback(function (error) {
                        helper.showToast(error.message, 'error');
                    }))
                    .finally($A.getCallback(function () {
                        helper.setIsDataSaving(false);
                    }));
            } else if (helper.submitType === 'SubmitToCommittee') {
                let cmpCTRFileUpload = component.find("CTRFileUpload");
                if ($A.util.isArray(cmpCTRFileUpload)) {
                    cmpCTRFileUpload = cmpCTRFileUpload[0];
                }
                cmpCTRFileUpload.deletePendingAttachments()
                    .then($A.getCallback(function () {
                        component.set(
                            "v.requestFormObj.CommitteeAttachment__c",
                            JSON.stringify(cmpCTRFileUpload.getMergedAttachments()));

                        helper.setIsDataSaving(true);
                        helper.disableEditMode();

                        if (emailAuthorizationLowerCase === "ceo required") {
                            return helper.submitToCEO();
                        } else if (emailAuthorizationLowerCase === "committee required") {
                            return helper.submitToCommittees();
                        } else {
                            return helper.submitNoApproval()
                        }
                    }))
                    .then($A.getCallback(function () {
                        helper.uploadFileToSharePoint();
                        window.setTimeout(
                            $A.getCallback(function () {
                                window.location.reload();
                            }), 3000
                        );
                    }))
                    .catch($A.getCallback(function (error) {
                        helper.showToast(error.message, 'error');
                    }))
                    .finally($A.getCallback(function () {
                        helper.setIsDataSaving(false);
                    }));
            } else {
                let cmpCTRFileUpload = component.find("CTRFileUpload");
                if ($A.util.isArray(cmpCTRFileUpload)) {
                    cmpCTRFileUpload = cmpCTRFileUpload[0];
                }
                cmpCTRFileUpload.deletePendingAttachments()
                    .then($A.getCallback(function () {
                        component.set(
                            "v.requestFormObj.CommitteeAttachment__c",
                            JSON.stringify(cmpCTRFileUpload.getMergedAttachments()));

                        helper.setIsDataSaving(true);
                        helper.disableEditMode();

                        const committeeStatus = component.get("v.committeeStatus");
                        if (committeeStatus === "Waiting Section Head Review") {
                            return helper.saveRequestFormSH();
                        } else {
                            return helper.saveRequestForm();
                        }
                    }))
                    .then($A.getCallback(function () {
                        window.setTimeout(
                            $A.getCallback(function () {
                                window.location.reload();
                            }), 3000
                        );
                    }))
                    .catch($A.getCallback(function (error) {
                        helper.showToast(error.message, 'error');
                    }))
                    .finally($A.getCallback(function () {
                        helper.setIsDataSaving(false);
                    }));
            }
            helper.submitType = '';
        }
    },

    handleChangeEmailAuthorization: function (component, event, helper) {
        let cmpEmailAuthorization = component.find("EmailAuthorization");
        if (!$A.util.isEmpty(cmpEmailAuthorization)) {
            if ($A.util.isArray(cmpEmailAuthorization)) {
                cmpEmailAuthorization = cmpEmailAuthorization[0];
            }
            const emailAuthorization = cmpEmailAuthorization.get("v.value");
            const emailAuthorizationLowerCase = String(emailAuthorization).toLowerCase();

            helper.toggleCommitteeSelection(emailAuthorization);
            console.log('Debug handleChangeEmailAuthorization',emailAuthorization)
            helper.toggleMailToCommittee(emailAuthorization);

            if (emailAuthorizationLowerCase === "ceo required") {
                helper.resetCommittee(emailAuthorizationLowerCase);
                // component.set("v.emailInfo.EmailTo__c", helper.getCEOEmail());
                // component.set("v.requestFormObj.EmailTo__c", helper.getCEOEmail());
            } else if (emailAuthorizationLowerCase === "committee required") {
                const subBU = helper.getSubBU();
                const groupedCommittees = component.get("v.groupedCommittees");
                const changeCommittees = component.get("v.specialGroupedCommittees");
                const committeeInfo = component.get("v.committeeInfo");
                const lstCompany = [subBU];
                console.log('Debug committeeInfo',changeCommittees,committeeInfo,groupedCommittees)
                if (!$A.util.isEmpty(changeCommittees)) {
                    const lstCommittee = helper.convertChangeCreditCommitteesToList(changeCommittees);
                    helper.defaultChangeCreditCommittee(lstCommittee, lstCommittee, committeeInfo)
                } else {
                    const lstCommittee = helper.convertGroupedCommitteesToList(groupedCommittees);
                    helper.defaultCommittee(lstCommittee, lstCompany, committeeInfo);
                }
            } else {
                helper.resetCommittee();
            }
        }
    },

    handleChangeSelectedCommittees: function (component, event, helper) {
        const selectedCommittees = component.get("v.selectedCommittees");
        component.set("v.requestFormObj.CommitteeName__c", selectedCommittees.join(","));
    },

    handleChangeSelectedEmailCommittees: function (component, event, helper) {
        const requestFormObj = component.get("v.requestFormObj");
        const selectedEmailCommittees = component.get("v.selectedEmailCommittees");

        if (!$A.util.isEmpty(requestFormObj.EmailAuthorization__c)) {
            const emailAuthorization = String(requestFormObj.EmailAuthorization__c).toLowerCase();
            if (emailAuthorization === "committee required") {
                component.set("v.emailInfo.EmailTo__c", selectedEmailCommittees.join(","));
                component.set("v.requestFormObj.EmailTo__c", selectedEmailCommittees.join(","));
            }
        }
    },

    handleChangeEmailUrgent: function (component, event, helper) {
        const emailUrgent = component.get("v.emailUrgent");
        var currSubject = component.get("v.requestFormObj.Subject__c");
        var subject = currSubject;
        if (currSubject && currSubject.includes("[Urgent]")) {
            if (emailUrgent === "No") {
                subject = currSubject.replace('[Urgent]', '');
            }
        } else {
            if (emailUrgent === "Yes") {
                subject = "[Urgent]" + currSubject;
            }
        }
        component.set("v.emailInfo.Subject__c", subject);
    },
})