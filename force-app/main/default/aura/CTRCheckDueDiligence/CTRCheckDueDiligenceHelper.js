({
    retrieveRiskLevel : function(component) {
        component.set('v.isLoaded', false);
        var action = component.get("c.retrieveRiskLevel");
        action.setParams({
            "recordId": component.get('v.recordId')
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log('[retrieveRiskLevel] result -----', result);
                component.set('v.displayReview', result.displayReviewOnCheckDue);
                var riskLevelList = result.riskLevelList;
                if(component.get('v.displayReview')) {
                    var resultJSON = JSON.parse(result.dueDiligenceReviewSection);
                    component.set('v.sectionLabelMap', resultJSON.sectionMap);
                    console.log('sectionLabelMap -----', Object.assign({}, component.get('v.sectionLabelMap')));
                    component.set('v.hasPermission', component.get('v.sectionLabelMap.traderReview.hasPermission'));
                } else {
                    for(var i=0; i<riskLevelList.length; i++) {
                        if(!$A.util.isEmpty(riskLevelList[i].disabled) && !riskLevelList[i].disabled) {
                            component.set('v.hasPermission', true);
                            switch(riskLevelList[i].actorStep) {
                                case 'Credit':
                                    component.set('v.isFASubmitted', true);
                                    break;
                                case 'CPCE':
                                    component.set('v.isCPCESubmitted', true);
                                    break;
                            }
                            break;
                        }
                    }
                }
                component.set('v.riskLevelList', riskLevelList);
                if(!$A.util.isEmpty(component.get('v.riskLevelBySystem'))) {
                    var riskLevelBySystem = component.get('v.riskLevelBySystem');
                    this.updateRiskLevel(component, riskLevelBySystem.fieldName, riskLevelBySystem.value);
                }
            } else if (state === "ERROR") {
                var errors = response.getError();
                if(errors) {
                    if(errors[0] && errors[0].message) {
                        console.log('[retrieveRiskLevel] error -----', errors[0].message);
                        this.showToast('Error', 'error', errors[0].message);
                    }
                } else {
                    console.log('[retrieveRiskLevel] unknown error -----');
                    this.showToast('Error', 'error', 'Unknown error');
                }
            }
            component.set('v.isLoaded', true);
        });
        $A.enqueueAction(action);
    },

    updateRiskLevel : function(component, fieldName, value) {
        console.log('[updateRiskLevel] ' + fieldName + ' -----', value);
        var riskLevelList = component.get('v.riskLevelList');
        for(var i=0; i<riskLevelList.length; i++) {
            if(riskLevelList[i].fieldName == fieldName) {
                for(var j=0; j<riskLevelList[i].options.length; j++) {
                    if(riskLevelList[i].options[j].value == value) {
                        riskLevelList[i].options[j].isSelected = true;
                    } else {
                        riskLevelList[i].options[j].isSelected = false;
                    }
                }
            }
        }
        console.log('[updateRiskLevel] riskLevelList -----', Object.assign({}, riskLevelList));
        component.set('v.riskLevelList', riskLevelList);
    },

    updateDueDiligence : function(component, type) {
        if(!$A.util.isEmpty(component.get('v.riskLevelList'))) {
            component.set('v.isLoaded', false);
            var riskLevelInfo = {};
            var riskLevelList = component.get('v.riskLevelList');
            for(var i=0; i<riskLevelList.length; i++) {
                for(var j=0; j<riskLevelList[i].options.length; j++) {
                    if(riskLevelList[i].options[j].isSelected == true) {
                        riskLevelInfo[riskLevelList[i].fieldName] = riskLevelList[i].options[j].value;
                        break;
                    }
                }
                if($A.util.isEmpty(riskLevelInfo[riskLevelList[i].fieldName])) {
                    riskLevelInfo[riskLevelList[i].fieldName] = '';
                }
            }
            riskLevelInfo['Id'] = component.get('v.recordId');
            if(component.get('v.displayReview')) {
                var inputField = component.find("inputField"); // there's only one field
                console.log('inputField -----', inputField);
                if(inputField !== undefined) {
                    console.log(inputField.get('v.fieldName') + ' -----', inputField.get('v.value'));
                    if(inputField.get('v.required') !== undefined && inputField.get('v.required') == true) {
                        if(!$A.util.isEmpty(inputField.get('v.value'))) {
                            riskLevelInfo[inputField.get('v.fieldName')] = inputField.get('v.value');
                            const reviewInfo = component.get('v.sectionLabelMap.traderReview.reviewInfo');
                            for(const key of Object.keys(reviewInfo)) {
                                console.log(key + ' -----');
                                if(key != inputField.get('v.fieldName')) {
                                    if(key.includes('DateTime')) {
                                        riskLevelInfo[key] = new Date().toISOString();
                                    } else {
                                        riskLevelInfo[key] = $A.get("$SObjectType.CurrentUser.Id");
                                    }
                                }
                            }
                        } else {
                            this.showToast('Warning', 'warning', 'Please complete all required fields.');
                            component.set('v.isLoaded', true);
                            return;
                        }
                    }
                }
            }
            if(type == 'submit') {
                // update more fields
                if(component.get('v.displayReview')) {
                    riskLevelInfo['Status__c'] = 'New';
                    riskLevelInfo['Approval_Step__c'] = 'Open';
                    riskLevelInfo['SubmittedTrader__c'] = true;
                }

                // - Actor = Credit --> CTRRequestFormItem__r.IsFASubmitted__c = TRUE
                // - Actor = CPCE --> CTRRequestFormItem__r.IsCPCESubmitted__c = TRUE
                // START UATIS-INICUS-01-932
                if(component.get('v.isFASubmitted')) {
                    riskLevelInfo['IsFASubmitted__c'] = true;
                }
                if(component.get('v.isCPCESubmitted')) {
                    riskLevelInfo['IsCPCESubmitted__c'] = true;
                }
                // END UATIS-INICUS-01-932
            }
            console.log('[updateDueDiligence] riskLevelInfo -----', riskLevelInfo);
            debugger;
            var action = component.get("c.updateDueDiligence");
            action.setParams({
                "riskLevelInfo": JSON.stringify(riskLevelInfo),
                "actionType": type,
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if(state === "SUCCESS") {
                    this.closeModal(component);
                    
                } else if (state === "ERROR") {
                    var errors = response.getError();
                    if(errors) {
                        if(errors[0] && errors[0].message) {
                            console.log('[updateDueDiligence] error -----', errors[0].message);
                            this.showToast('Error', 'error', errors[0].message);
                        }
                    } else {
                        console.log('[updateDueDiligence] unknown error -----');
                        this.showToast('Error', 'error', 'Unknown error');
                    }
                }
                component.set('v.isLoaded', true);
            });
            $A.enqueueAction(action);
        }
    },

    closeModal : function(component) {
        component.set("v.isLoaded", true);
        $A.get("e.force:closeQuickAction").fire();
        $A.get('e.force:refreshView').fire();
    },

    showToast : function(title, type, message) {
		var toastEvent = $A.get("e.force:showToast");
		toastEvent.setParams({
			"title": title,
			"type": type,
			"message": message
		});
		toastEvent.fire();
	},
})