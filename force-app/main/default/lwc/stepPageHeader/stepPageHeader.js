import { LightningElement, api, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import getStepFromNumber from "@salesforce/apex/EQCCCheckedSheetNavigationController.getStepFromNumber";

export default class StepPageHeader extends NavigationMixin(LightningElement) {
    @api numSteps;
    @api currentStep;
    @api percentage;
    @api isCurrent;
    @api recordId;
    @track nextStep;
    @track group;

    get steps() {
        let stepArr = [];
        for (let i = 1; i <= this.numSteps; i++) {
            stepArr.push({
                title: "Step " + i,
                class:
                    i == this.currentStep
                        ? "slds-path__item slds-is-current slds-is-active"
                        : "slds-path__item slds-is-incomplete",
                step: i
            });
        }
        return stepArr;
    }

    navigateToStep(event) {
        event.preventDefault();
        let selectedStep = event.currentTarget.dataset.step;
        getStepFromNumber({ stepId: this.recordId, stepNum: selectedStep })
            .then((result) => {
                this.nextStep = result.Id;
                this.group = result.Form_Group__c;
            })
            .finally(() => {
                let forApprovals = ((new URL(window.location.href)).searchParams.get("c__forApprovals"));
                if( forApprovals == null || forApprovals == undefined ){
                    forApprovals = true;
                }
                this[NavigationMixin.Navigate]({
                    type: "standard__component",
                    attributes: {
                        componentName: "c__THOR_ApprovalSteps"
                    },
                    state: {
                        c__recordId: this.nextStep,
                        c__forApprovals: forApprovals,
                        c__sheetGroup: this.group
                    }
                });
            });
    }
}