import { LightningElement, track, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { updateRecord, getRecord, getFieldValue } from "lightning/uiRecordApi";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

import { disableButtons } from './utils';

import recallForApproval from "@salesforce/apex/THOR_ApprovalFlowService.recallForApproval";
import ignorSpecialSubmitForm from "@salesforce/apex/THOR_ApprovalFlowService.getIgnorSpecialSubmit";
import getSubmitor from "@salesforce/apex/THOR_UserController.isSubmited";
import submitForApproval from "@salesforce/apex/THOR_ApprovalFlowService.submitForApproval";
import updateStepPercentage from "@salesforce/apex/HeaderSheetHandler.updateStepPercentage";
import updateHeaderSheetRequester from "@salesforce/apex/HeaderSheetHandler.updateHeaderSheetRequester";
import updateHeaderSheetPercentages from "@salesforce/apex/HeaderSheetHandler.updateHeaderSheetPercentages";
import rejectStepAndHeaderSheet from "@salesforce/apex/HeaderSheetHandler.rejectStepAndHeaderSheet";
import formstyles from "@salesforce/resourceUrl/formstyles";
import EQCC_STEP_ID from "@salesforce/schema/EQCC_Step__c.Id";
import EQCC_STEP_JSON from "@salesforce/schema/EQCC_Step__c.jsonString__c";
import EQCC_STEP_STATUS from "@salesforce/schema/EQCC_Step__c.Status__c";
import EQCC_STEP_NUMBER from "@salesforce/schema/EQCC_Step__c.Step_Number__c";
import EQCC_STEP_IS_CURRENT from "@salesforce/schema/EQCC_Step__c.Is_Current__c";
import EQCC_STEP_PERCENTEAGE from "@salesforce/schema/EQCC_Step__c.Percentage__c";
import EQCC_STEP_FORM_TYPE from "@salesforce/schema/EQCC_Step__c.Header_Sheet__r.Sheet__r.Form_Type__c";
import EQCC_FORM_QUESTIONS from "@salesforce/schema/EQCC_Step__c.Header_Sheet__r.Sheet__r.Form_Questions__c";
import EQCC_FUNCTIONAL_LOCATION from "@salesforce/schema/EQCC_Step__c.Header_Sheet__r.Header__r.FunctionalLocation__r.Name";
import EQCC_NOTIFICATION from "@salesforce/schema/EQCC_Step__c.Header_Sheet__r.Header__r.Notification__r.Name";
import EQCC_ORDER from "@salesforce/schema/EQCC_Step__c.Header_Sheet__r.Header__r.Order__r.Name";
import ORDER_ID from "@salesforce/schema/EQCC_Step__c.Header_Sheet__r.Header__r.Order__c";
import PERCENTAGE_BY_STEP from "@salesforce/schema/EQCC_Step__c.Header_Sheet__r.Percentage_by_Step__c";
import TOTAL_PERCENTAGE from "@salesforce/schema/EQCC_Step__c.Header_Sheet__r.Percentage__c";

import Q_RVP_ABB_ANL_Maintenance from "./forms/Q_RVP_ABB_ANL_Maintenance.html";
import Q_RVP_Common_ANL_Maintenance from "./forms/Q_RVP_Common_ANL_Maintenance.html";
import Q_Sulphur_SOLA_II_Analyzer from "./forms/Q_Sulphur_SOLA_II_Analyzer_Check.html";
import Q_TOC_ANL_Maintenance from "./forms/Q_TOC_ANL_Maintenance.html";
import Q_Turbidity_ANL_Maintenance from "./forms/Q_Turbidity_ANL_Maintenance.html";
import Q_Viscosity_ANL_Maintenance from "./forms/Q_Viscosity_ANL_Maintenance.html";
import Q_Opacity_ANL_Maintenance from "./forms/Q_Opacity_ANL_Maintenance.html";
import Q_N2_ANL_Maintenance from "./forms/Q_N2_ANL_Maintenance.html";
import Q_Moisture_Alu_ANL_Maintenance from "./forms/Q_Moisture_Alu_ANL_Maintenance.html";
import Q_Moisture_Amitek_ANL_Maintenance from "./forms/Q_Moisture_Amitek_ANL_Maintenance.html";
import Q_H2SSO2_ANL_Maintenance from "./forms/Q_H2SSO2_ANL_Maintenance.html";
import Q_H2SCOS_ANL_Maintenance from "./forms/Q_H2SCOS_ANL_Maintenance.html";
import Q_H2S_Spectra_ANL_Maintenance from "./forms/Q_H2S_Spectra_ANL_Maintenance.html";
import Q_H2S_Maihak_ANL_Maintenance from "./forms/Q_H2S_Maihak_ANL_Maintenance.html";
import Q_H2HC_ANL_Maintenance from "./forms/Q_H2HC_ANL_Maintenance.html";
import Q_H2_ANL_Maintenance from "./forms/Q_H2_ANL_Maintenance.html";
import Q_90boilingpoint_ANL from "./forms/Q_90boilingpoint_ANL.html";
import Q_95boilingpoint_ANL from "./forms/Q_95boilingpoint_ANL.html";
import Q_CEMS_ANL_Maintenance from "./forms/Q_CEMS_ANL_Maintenance.html";
import Q_CH4_ANL_Maintenance from "./forms/Q_CH4_ANL_Maintenance.html";
import Q_CO_ANL_Maintenance from "./forms/Q_CO_ANL_Maintenance.html";
import Q_CO2_ANL_Maintenance from "./forms/Q_CO2_ANL_Maintenance.html";
import Q_COD_ANL_Maintenance from "./forms/Q_COD_ANL_Maintenance.html";
import Q_Colour_ANL_Maintenance from "./forms/Q_Colour_ANL_Maintenance.html";
import Q_Conductivity_ANL_Maintenance from "./forms/Q_Conductivity_ANL_Maintenance.html";
import Q_DensitySG_ANL_Maintenance from "./forms/Q_DensitySG_ANL_Maintenance.html";
import Q_Density_ANL_Maintenance from "./forms/Q_Density_ANL_Maintenance.html";
import Q_DewPointAlu_ANL_Maintenance from "./forms/Q_DewPointAlu_ANL_Maintenance.html";
import Q_DO_ANL_Maintenance from "./forms/Q_DO_ANL_Maintenance.html";
import Q_FinalBoilingPoint_ANL_Maintenance from "./forms/Q_FinalBoilingPoint_ANL_Maintenance.html";
import Q_FlashPointFlashCup_ANL_Maintenance from "./forms/Q_FlashPointFlashCup_ANL_Maintenance.html";
import Q_FlashPoint_ANL_Maintenance from "./forms/Q_FlashPoint_ANL_Maintenance.html";
import Q_FTNIR_ANL_Maintenance from "./forms/Q_FTNIR_ANL_Maintenance.html";
//import Q_Gas_Chromo_ANL_Maintenance from "./forms/Q_Gas_Chromo_ANL_Maintenance.html";

import defaultTemplate from "./forms/_default.html";

import saveFile from '@salesforce/apex/THOR_FileUploadActionController.saveFile';
import releatedFiles from '@salesforce/apex/THOR_FileUploadActionController.releatedFiles';
import deleteContentDocument from '@salesforce/apex/THOR_FileUploadActionController.deleteContentDocument';
import deleteFiles from '@salesforce/apex/THOR_FileUploadActionController.deleteFiles';

let inputMap = new Map();
let avoidPercentageInputsDataIds = [];
let disabledSectionInputs = new Set();
let activeRemarkInputsMap = new Map();
let filesMap = new Map();
let relatedFileMap = new Map();
let isSubmit = false;
//let questionsPerStep = [];

export default class EqccCheckedSheet33 extends NavigationMixin(LightningElement) {

    @api loading = false;
    @api error = false;
    @api readOnly = false;
    @track record;
    @track stepNumber;
    @track isCurrent;
    @track status;
    @track checkedSheetName;
    @track nextStep;
    @track percentage = 1;
    @track stepPercentage = 1;
    @track percentageByStep = "";
    @track formPercentage = 1;
    @track modalVisible = false;
    @track modalTitle;
    @track modalMessage;
    @track modalConfirmButton;
    @track modalCancelButton;
    @track modalName;
    @track formQuestions;
    disabledSections = [];
    isDifferent = false;
    newRecordId;
    orderId;
    userRole;
    _formStatus;
    _functionalLocation;
    _notification;
    _order;
    _isModified = false;
    _navigable = true;
    @track showLoadingSpinner = false;
    filesUploaded = [];
    file;
    fileContents;
    fileReader;
    content;
    MAX_FILE_SIZE = 15000000;

    @wire(getRecord, {
        recordId: "$recordId",
        fields: [
            EQCC_STEP_JSON,
            EQCC_STEP_NUMBER,
            EQCC_STEP_FORM_TYPE,
            EQCC_STEP_STATUS,
            EQCC_FUNCTIONAL_LOCATION,
            EQCC_NOTIFICATION,
            EQCC_ORDER,
            ORDER_ID,
            EQCC_STEP_IS_CURRENT,
            EQCC_FORM_QUESTIONS,
            EQCC_STEP_PERCENTEAGE,
            PERCENTAGE_BY_STEP,
            TOTAL_PERCENTAGE
        ]
    })

    recordResult({ data, error }) {
        if (data) {
            this.record = data;
            this.stepNumber = getFieldValue(this.record, EQCC_STEP_NUMBER);
            this.checkedSheetName = getFieldValue(this.record, EQCC_STEP_FORM_TYPE);
            this.formStatus = getFieldValue(this.record, EQCC_STEP_STATUS);
            this.functionalLocation = getFieldValue(this.record, EQCC_FUNCTIONAL_LOCATION);
            this.notification = getFieldValue(this.record, EQCC_NOTIFICATION);
            this.order = getFieldValue(this.record, EQCC_ORDER);
            this.orderId = getFieldValue(this.record, ORDER_ID);
            this.isCurrent = getFieldValue(this.record, EQCC_STEP_IS_CURRENT);
            this.formQuestions = getFieldValue(this.record, EQCC_FORM_QUESTIONS);
            this.stepPercentage = getFieldValue(this.record, EQCC_STEP_PERCENTEAGE);
            this.formPercentage = getFieldValue(this.record, TOTAL_PERCENTAGE);
            this.percentageByStep = getFieldValue(this.record, PERCENTAGE_BY_STEP);
            this.percentage = this.resolvePercentageFromStep();

            this.loadDraft();
        } else if (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Error",
                    message: error.body.message,
                    variant: "error"
                })
            );
        }
    }

    resolvePercentageFromStep() {
        if (this.percentageByStep) {
            let percentages = JSON.parse(this.percentageByStep);
            let currentPercentage = 0;
            let totalPercentage = 0;

            for (let key in percentages) {
                if (key < this.stepNumber) {
                    currentPercentage += Number(percentages[key]);
                }
                totalPercentage += Number(percentages[key]);
            }

            this.percentage = currentPercentage + Number(this.stepPercentage);
            this.formPercentage = totalPercentage
                ? totalPercentage + Number(this.stepPercentage)
                : Number(this.stepPercentage);
        }
    }

    render() {
        switch (this.checkedSheetName) {
            case "Q_RVP_ABB_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_RVP_ABB_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_RVP_Common_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_RVP_Common_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_Sulphur_SOLA_II_Analyzer": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_Sulphur_SOLA_II_Analyzer;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_TOC_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_TOC_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_Turbidity_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_Turbidity_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_Viscosity_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_Viscosity_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_Opacity_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_Opacity_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_N2_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_N2_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_Moisture_Alu_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_Moisture_Alu_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_Moisture_Amitek_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_Moisture_Amitek_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_H2SSO2_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_H2SSO2_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_H2SCOS_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_H2SCOS_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_H2S_Spectra_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_H2S_Spectra_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_H2S_Maihak_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_H2S_Maihak_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_H2HC_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_H2HC_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_H2_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_H2_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_90boilingpoint_ANL": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_90boilingpoint_ANL;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_95boilingpoint_ANL": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_95boilingpoint_ANL;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_CEMS_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_CEMS_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_CH4_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_CH4_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_CO_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_CO_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_CO2_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_CO2_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_COD_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_COD_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_Colour_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_Colour_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_Conductivity_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_Conductivity_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_DensitySG_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_DensitySG_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_Density_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_Density_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_DewPointAlu_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_DewPointAlu_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_DO_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_DO_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_FinalBoilingPoint_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_FinalBoilingPoint_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_FlashPointFlashCup_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_FlashPointFlashCup_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_FlashPoint_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_FlashPoint_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_FTNIR_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_FTNIR_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            case "Q_Gas_Chromo_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        return Q_Gas_Chromo_ANL_Maintenance;
                    default:
                        return defaultTemplate;
                }
            }
            default:
                return defaultTemplate;
         }
    }

    connectedCallback() {
        Promise.all([
            loadStyle(this, formstyles)
        ]).then(() => {});
    }

    @api
    get recordId() {
        return this.newRecordId;
    }
    set recordId(value) {
        if (this.newRecordId !== value) {
            this.isDifferent = true;
            this.disabledSections = [];
        }
        this.newRecordId = value;
    }

    renderedCallback() {
        console.log('callback')
        if (this.isDifferent === true) {
            disabledSectionInputs.clear();
            this.getIgnorSpecialSubmit();
            this.submitor();
            //this.loadDraft();
        }
        //this.disableFields();
        //this.createHeaderInputsList();
        this.calculatePercentage();
    }

    submitor() {
        getSubmitor({ stepId: this.recordId })
            .then((result) => {
                isSubmit = result;
                this.disableFields();
                this.loadDraft();
            })
           .catch((error) => {
                console.log(error)
           });
    }



    getIgnorSpecialSubmit() {
        ignorSpecialSubmitForm({ stepId: this.recordId })
            .then((result) => {
                this.specialSubmitForm = result;
            })
           .catch((error) => {
                console.log(error)
           });
    }

    expandSection(event) {

        let sections = this.template.querySelectorAll(".slds-accordion__section");
        sections.forEach((element) => {
            if (element.dataset.id) {
                let contentArea = element.querySelector(".slds-accordion__content");
                if (element.dataset.id === event.currentTarget.dataset.parent) {
                    if (!contentArea.dataset.height) {
                        contentArea.style.cssText =
                            "position: absolute, max-height: unset, height: auto, visibility: hidden, display: block";
                        contentArea.setAttribute("data-height", contentArea.scrollHeight);
                        let height = contentArea.dataset.height;
                        let calcTransition = height * 0.002;
                        if (calcTransition > 1) {
                            calcTransition = 1;
                        }
                        contentArea.style.cssText = "";
                        contentArea.style.transition = "max-height " + calcTransition + "s ease-in-out";
                    }
                    if (element.classList.contains("slds-is-open")) {
                        contentArea.style.setProperty("max-height", "0px", "important");
                        element.classList.remove("slds-is-open");
                    } else {
                        element.classList.add("slds-is-open");
                        contentArea.style.setProperty("max-height", contentArea.dataset.height + "0px", "important");

                        this.recalculateHeight(contentArea);
                    }
                } else {
                    if (element.dataset.id !== event.currentTarget.dataset.ischildren) {
                        if (element.classList.contains("slds-is-open")) {
                            element.classList.remove("slds-is-open");
                            contentArea.style.setProperty("max-height", "0px", "important");
                        }
                    }
                }
            }
        });
    }

    closeSection(event) {
        if (event.currentTarget.checked) {
            let sections = this.template.querySelectorAll(".slds-accordion__section");
            sections.forEach((element) => {
                if (element.dataset.id === event.currentTarget.dataset.parent) {
                    if (element.classList.contains("slds-is-open")) {
                        this.expandSection(event);
                    }
                }
            });
        }
    }

    recalculateHeight(elem, hideHiddenFields = false) {
        let contentArea;
        let contentHight = 0;
        let datasetHight = 0;
        if (elem.classList.contains("slds-accordion__content")) {
            contentArea = elem;
        } else {
            contentArea = elem.closest(".slds-accordion__content");
        }

        let section = contentArea.closest(".slds-accordion__section");
        let isOpen = section.classList.contains("slds-is-open");

        if (isOpen) {
            if (!hideHiddenFields) {
                let contents = contentArea.querySelectorAll(".card-body");

                contents.forEach((content) => {
                    if (content.scrollHeight > contentHight) {
                        contentHight = content.scrollHeight;
                    }
                });
            }
            datasetHight = contentArea.dataset.height;
        }

        let newHeight = parseInt(datasetHight) + parseInt(contentHight);

        contentArea.style.setProperty("max-height", newHeight + "0px", "important");
    }

    createHeaderInputsList() {
        avoidPercentageInputsDataIds = [];
        let headerInputs = this.template.querySelectorAll(".avoidPercentageInput");

        for (let avoidPercentageInput of headerInputs) {
            let headerInputName = avoidPercentageInput.dataset.id;

            if (avoidPercentageInput.type === "radio" || avoidPercentageInput.type === "checkbox") {
                headerInputName = avoidPercentageInput.name;
            }

            if (!avoidPercentageInputsDataIds.includes(headerInputName)) {
                avoidPercentageInputsDataIds.push(headerInputName);
            }
        }
    }

    disableFields() {
        if(isSubmit) {
            if (
                this.readOnly ||
                !this.isCurrent ||
                this.formStatus === "Approved" ||
                this.formStatus === "Pending for Approval" ||
                this.formStatus === "Rejected"
            ) {
                var inputs = this.template.querySelectorAll("input, textarea, select");

                this.disableActionButtons();

                inputs.forEach((element) => {
                    let domElement = this.template.querySelector("[data-id='" + element.dataset.id + "']");
                    if (domElement) {
                        domElement.setAttribute("disabled", "true");
                    }
                });
            }
            else if(this.formStatus === "Recalled" || this.formStatus === "Draft") {
                var inputs = this.template.querySelectorAll("input, textarea");
                this.disableActionButtons();

                inputs.forEach((element) => {
                    if(element.dataset.id != "notification" && element.dataset.id != "order" && element.dataset.id != "fl" && element.dataset.id != "status") {
                        let domElement = this.template.querySelector("[data-id='" + element.dataset.id + "']");
                        if (domElement) {
                            domElement.removeAttribute("disabled");
                        }
                    }
                });
            }
        } else {
            var inputs = this.template.querySelectorAll("input, textarea");
            this.disableActionButtons();
            inputs.forEach((element) => {
                let domElement = this.template.querySelector("[data-id='" + element.dataset.id + "']");
                if (domElement) {
                    domElement.setAttribute("disabled", "true");
                }
            });
        }

        this.disabledSections.forEach((sectionId) => {
            let section = this.template.querySelector("[data-id='" + sectionId + "']");
            let inputs = section.querySelectorAll("input, textarea");
            inputs.forEach((input) => {
                if (input.name === "options") {
                    input.checked = true;
                } else if (input.dataset.id !== sectionId + "-inputRemark") {
                    if (input.type === "radio" || input.type === "checkbox") input.checked = false;
                    else input.value = "";
                    input.setAttribute("disabled", "true");
                    if (input.type === "radio" || input.type === "checkbox") {
                        if (input.name !== "options") {
                            if (!(input.dataset.controlledby && input.classList.contains("avoidPercentageInput"))) {
                                disabledSectionInputs.add(input.name);
                            }
                        }
                    } else {
                        if (!(input.dataset.controlledby && input.classList.contains("avoidPercentageInput"))) {
                            disabledSectionInputs.add(input.dataset.id);
                        }
                    }
                }
            });
            let remark = section.querySelector("[data-id='" + sectionId + "-remark'");
            if (remark.classList.contains("hide-remark")) remark.classList.remove("hide-remark");
        });
        this.calculatePercentage();
    }

    /*disableActionButtons() {
        var save = this.template.querySelector("[data-id=saveEQCCStep]");
        var submit = this.template.querySelector("[data-id=submitEQCCStep]");
        var reject = this.template.querySelector("[data-id=rejectEQCCStep]");
        if (save) {
            save.setAttribute("disabled", "true");
        }
        if (submit) {
            submit.setAttribute("disabled", "true");
        }
        if (reject) {
            reject.setAttribute("disabled", "true");
        }
    }*/

    disableActionButtons() {
        disableButtons(this.template.querySelector("[data-id=saveEQCCStep]"),
                       this.template.querySelector("[data-id=submitEQCCStep]"),
                       this.template.querySelector("[data-id=rejectEQCCStep]"),
                       this.template.querySelector("[data-id=recallEQCCStep]"),
                       this.formStatus,
                       isSubmit);
    }

    onKeyPress(e) {
        if (!((e.charCode >= 48 && e.charCode <= 57) || e.charCode === 46 || e.charCode === 45)) {
            e.preventDefault();
        }
    }

    calculatePercentage() {
        let questionsCount = this.formQuestions;
        let questions = this.template.querySelectorAll("[data-answered]");

        questions.forEach((element) => {
            if (element.style.display === "none") {
                element.dataset.answered = false;
                questionsCount -= 1;
            }
        });

        let questionAnswered = this.template.querySelectorAll(`[data-answered="true"]`);

        if (!this.readOnly) {
            let tempPercentage = (questionAnswered.length / questionsCount) * 100;
            this.stepPercentage = parseFloat(tempPercentage).toFixed(0);
            this.resolvePercentageFromStep();
        }
        console.log('this.percentage >>> ' + this.percentage);
        console.log('this.stepPercentage >>> ' + this.stepPercentage);
        this.dispatchEvent(
					new CustomEvent('percentage', {
						detail: {
							percentage: this.percentage || this.stepPercentage
						}
					})
				)
    }

    drawDynamicRows() {
        switch (this.checkedSheetName) {
            case "Q_Gas_Chromo_ANL_Maintenance": {
                switch (this.stepNumber) {
                    case 1:
                        let firstHiddenRow = this.template.querySelector(".hideRow");

                        if (!firstHiddenRow) {
                            let htmlTextB = "";
                            let htmlTextA = "";
                            let rowsBodySectionB = this.template.querySelector(".rowsBodySectionB");
                            let rowsBodySectionA = this.template.querySelector(".rowsBodySectionA");
                            if (rowsBodySectionB && rowsBodySectionA ) {
                                for (let i = 4; i <= 15; i++) {
                                    let trB = `<tr class="hideRow" data-dynamicrow="true" ><td></td><td class="text-left"><div  class="slds-form-element__control"> <input onchange={onIEH} type="text" data-id="1-14-input-`+i+`B-`+(i+1)+`" class="slds-input"/></div></td><td class="text-left"><div  class="slds-form-element__control"><input onchange={onIEH} type="text" data-id="1-14-input-`+i+`B-`+(i+2)+`" class="slds-input"/></div></td><td class="text-left"><div class="slds-form-element__control"><input onchange={onIEH} type="text" data-id="1-14-input-`+i+`B-`+(i+3)+`" class="slds-input" /></div></td><td class="text-left"><div  class="slds-form-element__control"><input onchange={onIEH} type="text" data-id="1-14-input-`+i+`B-`+(i+4)+`" class="slds-input"/></div></td><td class="text-left"><div  class="slds-form-element__control"><input onchange={onIEH} type="text" data-id="1-14-input-`+i+`B-`+(i+5)+`" class="slds-input"/></div></td><td></td></tr>`;
                                    let trA = `<tr class="hideRow" data-dynamicrow="true" ><td></td><td class="text-left"><div  class="slds-form-element__control"> <input onchange={onIEH} type="text" data-id="1-14-input-`+i+`A-`+(i+1)+`" class="slds-input"/></div></td><td class="text-left"><div  class="slds-form-element__control"><input onchange={onIEH} type="text" data-id="1-14-input-`+i+`A-`+(i+2)+`" class="slds-input"/></div></td><td class="text-left"><div class="slds-form-element__control"><input onchange={onIEH} type="text" data-id="1-14-input-`+i+`A-`+(i+3)+`" class="slds-input" /></div></td><td class="text-left"><div  class="slds-form-element__control"><input onchange={onIEH} type="text" data-id="1-14-input-`+i+`A-`+(i+4)+`" class="slds-input"/></div></td><td class="text-left"><div  class="slds-form-element__control"><input onchange={onIEH} type="text" data-id="1-14-input-`+i+`A-`+(i+5)+`" class="slds-input"/></div></td><td></td></tr>`;
                                    htmlTextB += trB;
                                    htmlTextA += trA;
                                }
                                rowsBodySectionB.insertAdjacentHTML("beforeend", htmlTextB);
                                rowsBodySectionA.insertAdjacentHTML("beforeend", htmlTextA);

                                let inputsListB = rowsBodySectionB.querySelectorAll("input");
                                let inputsListA = rowsBodySectionB.querySelectorAll("input");

                                inputsListB.forEach((input) => {
                                    if (input.dataset.affectcells) {
                                        input.addEventListener("change", this.handleAffectedCells.bind(this));
                                    } else {
                                        input.addEventListener("change", this.onIEH.bind(this));
                                    }
                                });
                                inputsListA.forEach((input) => {
                                    if (input.dataset.affectcells) {
                                        input.addEventListener("change", this.handleAffectedCells.bind(this));
                                    } else {
                                        input.addEventListener("change", this.onIEH.bind(this));
                                    }
                                });

                            }
                        }
                }
                return;
            }
        }
    }
    loadDraft() {
        if (
            this.checkedSheetName === "Q_Gas_Chromo_ANL_Maintenance"
        ) {
            this.drawDynamicRows();
        }
        this.loadDraftAfterDraw();
    }

    loadDraftAfterDraw() {
        var inputJson = getFieldValue(this.record, EQCC_STEP_JSON);
        if (this.record && this.isDifferent === true) {
            let inputs = JSON.parse(inputJson);
            if (inputs == null) {
                let inputElements = this.template.querySelectorAll("input, textarea, select");
                inputElements.forEach((element) => {
                    if (element.type === "radio" || element.type === "checkbox") {
                        element.checked = false;
                    } else {
                        element.value = "";
                    }
                });
                this.isDifferent = false;
            } else {
                inputs.forEach((element) => {
                    let domElement = this.template.querySelector("[data-id='" + element.id + "']");
                    try {
                        let str = element.id;
                        if(str.search('filename') != -1) {
                            if (element.value != "") {
                                let id = str.split('-');
                                let save = this.template.querySelector('[data-save="' + id[1] + '"]');
                                let preview = this.template.querySelector('[data-preview="' + id[1] + '"]');
                                let filename = this.template.querySelector('[data-filename="' + id[1] + '"]');
                                let del = this.template.querySelector('[data-delete="' + id[1] + '"]');
                                save.setAttribute("disabled", "disabled");
                                preview.removeAttribute("disabled");
                                del.removeAttribute("disabled");
                                filename.innerHTML = element.value;
                            }
                        } else if(str.search('relatedFiles') != -1) {
                            if (element.value != "") {
                                let values = JSON.parse(element.value);
                                values.forEach( value => {
                                    relatedFileMap.set(value[0], value[1]);
                                })
                            }
                        }

                        if (domElement.type === "radio" || domElement.type === "checkbox") {
                            if (element.value === true) {
                                if (domElement.name != "options") {
                                    this.loadQuestion(domElement);
                                }
                                domElement.checked = true;
                                if (domElement.type === "checkbox" && domElement.name === "options") {
                                    let section = domElement.closest("section");
                                    if (this.disabledSections.indexOf(section.dataset.id) === -1)
                                        this.disabledSections.push(section.dataset.id);

                                    let collapsibleSection = domElement.closest(".slds-accordion__section");
                                    let questions = collapsibleSection.querySelectorAll("[data-answered]");
                                    questions.forEach((question) => {
                                        question.dataset.answered = true;
                                    });
                                }
                                this.handleHiddenFields(domElement, true);
                            } else if (element.value === false) {
                                domElement.checked = false;
                            }
                        } else {
                            if (element.value) {
                                this.showRow(domElement);
                                this.loadQuestion(domElement);
                                if (this.formStatus === "Needs Revision" && element.id === "status") {
                                    element.value = "Needs Revision";
                                }
                            }
                            domElement.value = element.value;
                        }
                        if (domElement.name != "options") {
                            this.handleDependentField(domElement, true);
                        }
                        this.isDifferent = false;
                    } catch (e) {
                        this.isDifferent = true;
                    }
                });
            }
            this._isModified = false;
        }
    }

    loadQuestion(element) {
        let question = element.closest("[data-answered]");
        if (question) {
            question.dataset.answered = true;
        }
    }

    addRow(e) {
        this.loadDraft();
        let dynamicRowsSection = e.currentTarget.closest(".dynamicRows");
        if (dynamicRowsSection && (this.formStatus === "Draft" || this.formStatus === "Needs Revision")) {
            let hiddenRow = dynamicRowsSection.querySelector(".hideRow");

            if (hiddenRow) {
                hiddenRow.classList.remove("hideRow");
                hiddenRow.classList.add("showRow");
                if (hiddenRow.dataset.newquestion) {
                    hiddenRow.setAttribute("data-answered", "false");
                }
                // this.disableTRInputs(e);
                this.saveDraft(this.formStatus, true);
            }
        }
    }

    removeRow(e) {
        let dynamicRowsSection = e.currentTarget.closest(".dynamicRows");

        let shownRows = dynamicRowsSection.querySelectorAll(".showRow");

        if (shownRows && (this.formStatus === "Draft" || this.formStatus === "Needs Revision")) {
            let shownRow = shownRows[shownRows.length - 1];
            if (shownRow) {
                shownRow.classList.add("hideRow");
                shownRow.classList.remove("showRow");
                shownRow.querySelectorAll("input").forEach(item => {item.value = ""});
                if (shownRow.dataset.newquestion) {
                    shownRow.removeAttribute("data-answered");
                }
                this.saveDraft(this.formStatus, true);
            } else {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error",
                        message: "Cannot remove default row",
                        variant: "error"
                    })
                );
            }
        }
    }

    showRow(element) {
        let hiddenRow = element.closest(".hideRow");

        if (hiddenRow) {
            if (!hiddenRow.classList.contains("showRow")) {
                hiddenRow.classList.remove("hideRow");
                hiddenRow.classList.add("showRow");
            }
        }
    }

    onIEH(e) {
        if (e.currentTarget.type === "radio" || e.currentTarget.type === "checkbox") {
            inputMap.set(e.currentTarget.name, e.currentTarget.checked);
        } else {
            if (e.currentTarget.value) {
                inputMap.set(e.currentTarget.dataset.id, true);
            } else {
                inputMap.set(e.currentTarget.dataset.id, false);
            }
        }
        this.handleHiddenFields(e.currentTarget);

        this.setQuestionValue(e.currentTarget);

        this.handleDependentField(e.currentTarget);
        this.calculatePercentage();
        this._isModified = true;
        this.saveDraft(this.formStatus, true);
    }

    handleHiddenFields(parent, isLoading = false) {
        if (this.checkedSheetName === "Resources_Order_Form") {
            let hiddenChildren = this.template.querySelectorAll(`[data-hidden*="` + parent.dataset.id + `"]`);
            let shownChildren = this.template.querySelectorAll(`[data-shown*="` + parent.dataset.id + `"]`);

            if (hiddenChildren) {
                hiddenChildren.forEach((elem) => {
                    elem.style.display = "none";
                });
            }
            if (shownChildren) {
                shownChildren.forEach((elem) => {
                    elem.style.display = "block";
                    if (!isLoading) {
                        let sectionInputs = elem.querySelectorAll("input");
                        sectionInputs.forEach((input) => {
                            if (input.type === "radio" || input.type === "checkbox") {
                                input.checked = false;
                            }
                            input.value = "";
                        });
                    }
                });
            }

            if (parent.dataset.hidecontroller) {
                let answers = this.template.querySelectorAll(`[data-answered="true"]`);
                answers.forEach((answer) => {
                    answer.dataset.answered = false;
                });
            }

            let sectionsToShow = this.template.querySelectorAll(`[data-parent-shown*="` + parent.dataset.id + `"]`);
            if (sectionsToShow) {
                sectionsToShow.forEach((elem) => {
                    elem.style.display = "block";

                    this.recalculateHeight(elem);
                });
            }
        }
    }

    handleDependentField(parent, isLoading = false) {
        let children = this.template.querySelectorAll(`input[data-controlledby*="` + parent.dataset.id + `"]`);
        children.forEach((elem) => {
            if (parent.checked) {
                if (elem.type === "checkbox") {
                    elem.checked = false;
                }

                elem.dataset.children = Number(elem.dataset.children) + 1;

                if (parent.type === "radio") {
                    if (parent.dataset.enabler) {
                        elem.dataset.children = Number(parent.dataset.enabler);
                        elem.value = "";
                    } else {
                        elem.checked = false;
                    }
                }

                if (elem.dataset.children > 0) {
                    elem.disabled = true;
                    elem.classList.add("avoidPercentageInput");
                } else {
                    elem.disabled = false;
                    elem.classList.remove("avoidPercentageInput");
                }
            } else {
                if (!isLoading) {
                    elem.dataset.children = Number(elem.dataset.children) - 1;
                    if (elem.type !== "checkbox") {
                        elem.value = "";
                    }
                    if (elem.dataset.children == 0) {
                        elem.disabled = false;
                        elem.classList.remove("avoidPercentageInput");
                    }
                    if (elem.dataset.children < 0) {
                        elem.disabled = true;
                        elem.classList.add("avoidPercentageInput");
                    }
                }
            }
        });
        this.setQuestionValue(parent);
    }

    setQuestionValue(element) {
        let collapsibleSection = element.closest(".slds-accordion__section");
        let inputNA = collapsibleSection.querySelector('input[name="options"]');

        if (!inputNA || !inputNA.checked) {
            let question = element.closest("[data-answered]");

            if (question) {
                let answers = question.querySelectorAll("[data-id]");

                var hasAnswer = "";
                var i;
                for (i = 0; i < answers.length; i++) {
                    if (answers[i].type === "radio" || answers[i].type === "checkbox") {
                        hasAnswer = answers[i].checked;
                    } else {
                        hasAnswer = answers[i].value;
                    }

                    if (hasAnswer) {
                        break;
                    }
                }

                if (hasAnswer) {
                    question.dataset.answered = true;
                } else {
                    question.dataset.answered = false;
                }
            }
        }
    }

    disableSection(e) {
        this.closeSection(e);

        let section = e.currentTarget.closest("section");
        if (e.currentTarget.checked) {
            let contentArea = section.querySelector(".slds-accordion__content");
            this.recalculateHeight(contentArea, true);

            if (this.disabledSections.indexOf(section.dataset.id) === -1) {
                this.disabledSections.push(section.dataset.id);
            }
            let remark = section.querySelector("[data-id='" + section.dataset.id + "-remark'");
            let inputRemark = remark.querySelector("[data-id='" + section.dataset.id + "-inputRemark'");
            activeRemarkInputsMap.set(inputRemark.dataset.id, inputRemark);
            let controlledFields = section.querySelectorAll("[data-children]");
            controlledFields.forEach((elem) => {
                elem.dataset.children = 0;
            });

            let questions = section.querySelectorAll("[data-answered]");
            questions.forEach((question) => {
                question.dataset.answered = true;
            });
        } else {
            let controlledFieldsDisabled = section.querySelectorAll("[data-disabled]");
            controlledFieldsDisabled.forEach((elem) => {
                elem.dataset.children = -1;
            });

            const index = this.disabledSections.indexOf(section.dataset.id);
            if (index !== -1) this.disabledSections.splice(index, 1);
            let inputs = section.querySelectorAll("input, textarea");
            let remark = section.querySelector("[data-id='" + section.dataset.id + "-remark'");
            let inputRemark = remark.querySelector("[data-id='" + section.dataset.id + "-inputRemark'");
            if (!remark.classList.contains("hide-remark")) remark.classList.add("hide-remark");
            if (inputRemark.disabled == false) inputRemark.setAttribute("disabled", "disabled");
            inputs.forEach((input) => {
                if (!input.dataset.disabled) {
                    input.disabled = false;
                }
                if (input.type === "radio" || input.type === "checkbox") {
                    if (input.name !== "options") {
                        disabledSectionInputs.delete(input.name);
                    }
                } else {
                    disabledSectionInputs.delete(input.dataset.id);
                }
            });
            activeRemarkInputsMap.delete(inputRemark.dataset.id);

            let questions = section.querySelectorAll("[data-answered]");
            questions.forEach((question) => {
                question.dataset.answered = false;
            });
        }

        this.disableFields();
        this.saveDraft(this.formStatus, true);
    }

    openSaveModal() {
        let requiredFields = this.checkRequiredInputs();
        if (!requiredFields) {
            this.scrollToTop();
            this.modalTitle = "Save Draft";
            this.modalMessage = "Do you wish to save this draft? Previous changes will be overwritten.";
            this.modalCancelButton = "Cancel";
            this.modalConfirmButton = "Save Draft";
            this.modalVisible = true;
            this.modalName = "saveDraft";
        }
    }

    openSubmitModal() {
        let requiredFields = this.checkRequiredInputs();
        if (!requiredFields) {
            this.scrollToTop();
            this.modalTitle = "Submit Form";
            this.modalMessage =
                "Are you sure you want to submit this form? Once submitted, you will not be able to modify the form.";
            this.modalCancelButton = "Cancel";
            this.modalConfirmButton = "Submit";
            this.modalVisible = true;
            this.modalName = "submitForm";
        }
    }

    openRejectModal() {
        let requiredFields = this.checkRequiredInputs();
        if (!requiredFields) {
            this.modalTitle = "Reject Step";
            this.modalMessage = "Enter some text";
            this.modalCancelButton = "Cancel";
            this.modalConfirmButton = "Reject";
            this.modalVisible = true;
            this.modalName = "rejectForm";
            this.scrollToTop();
        }
    }

    rejectFormButton(reason) {
        this.saveDraft("Rejected", true)
            .then(() => {
                updateStepPercentage({
                    stepId: this.recordId,
                    percentage: this.stepPercentage
                });
            })
            .then((response) => {
                rejectStepAndHeaderSheet({
                    stepId: this.recordId,
                    reason: reason
                });
            })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Success",
                        message: "Form has been rejected.",
                        variant: "success"
                    })
                );
                this.readOnly = true;
                this.disableFields();
                this.scrollToTop();
            })
            .then(() => {
                let percentages = JSON.parse(this.percentageByStep);
                percentages[this.stepNumber] = this.stepPercentage;

                updateHeaderSheetPercentages({
                    stepId: this.recordId,
                    percentages: JSON.stringify(percentages)
                });
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error",
                        message: error.body.message,
                        variant: "error"
                    })
                );
            });
    }

    handleModalSelection(e) {
        if (e.detail !== 1) {
            if (e.detail.name === "saveDraft") {
                if (e.detail.response === "confirm") {
                    this.saveDraft();
                }
            } else if (e.detail.name === "backButton") {
                if (e.detail.response === "cancel") {
                    this.backButton();
                }
            } else if (e.detail.name === "submitForm") {
                if (e.detail.response === "confirm") {
                    this.submitForApprovalButton();
                }
            } else if (e.detail.name === "rejectForm") {
                if (e.detail.response === "confirm") {
                    this.rejectFormButton(e.detail.reason);
                }
            }
            else if (e.detail.name === "recallForm") {
                if (e.detail.response === "confirm") {
                    this.recallForApprovalButton();
                }
            }
        }
        this.modalVisible = false;
    }

    saveDraft(status = "Draft", notoast = false) {
        return new Promise((resolve, reject) => {
            let inputElements = this.template.querySelectorAll("input, textarea, select");
            let inputs = [];
            inputElements.forEach((element) => {
                if (element.type === "radio" || element.type === "checkbox") {
                    inputs.push({
                        id: element.dataset.id,
                        value: element.checked
                    });
                } else {
                    inputs.push({
                        id: element.dataset.id,
                        value: element.value
                    });
                }
            });

            if (status === "Pending for Approval") {
                let statusInput = inputs.find((el) => el.id === "status");
                if (statusInput) {
                    statusInput.value = "Pending for Approval";
                }
            }

            if (status === "Rejected") {
                let statusInput = inputs.find((el) => el.id === "status");
                if (statusInput) {
                    statusInput.value = "Rejected";
                }
            }

            const fields = {};
            fields[EQCC_STEP_ID.fieldApiName] = this.recordId;
            if (inputs && inputs.length > 0) {
                fields[EQCC_STEP_JSON.fieldApiName] = JSON.stringify(inputs);
            }
            fields[EQCC_STEP_STATUS.fieldApiName] = status;
            const recordInput = {
                fields
            };
            updateRecord(recordInput)
                .then(() => {
                    if (!notoast) {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: "Success",
                                message: "Saved Sheet successfully.",
                                variant: "success"
                            })
                        );
                    }
                    this._isModified = false;
                    resolve();
                })
                .then(() => {
                    updateHeaderSheetRequester({
                        stepId: this.recordId
                    });
                })
                .catch((error) => {
                    if (
                        error.body &&
                        error.body.output &&
                        error.body.output.errors &&
                        error.body.output.errors[0] &&
                        error.body.output.errors[0].errorCode === "ENTITY_IS_LOCKED"
                    ) {
                        console.log("===> this is fine");
                    } else {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: "Error",
                                message: "Unable to save draft.",
                                variant: "error"
                            })
                        );
                        reject();
                    }
                });
        });
    }

    submitForApprovalButton() {
        this.saveDraft("Pending for approval", true)
            .then(() => {
                updateStepPercentage({
                    stepId: this.recordId,
                    percentage: this.stepPercentage
                });
            })
            .then((response) => {
                return submitForApproval({
                    stepId: this.recordId
                });
            })
            .then((result) => {
                if (result) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Success",
                            message: "Form submitted for approval.",
                            variant: "success"
                        })
                    );
                    this.readOnly = true;
                    this.disableFields();
                    this.scrollToTop();
                } else {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Error",
                            message: "Form has already been submitted.",
                            variant: "error"
                        })
                    );
                }
            })
            .then(() => {
                let percentages = JSON.parse(this.percentageByStep);
                percentages[this.stepNumber] = this.stepPercentage;
                updateHeaderSheetPercentages({
                    stepId: this.recordId,
                    percentages: JSON.stringify(percentages)
                });
            })
            .catch((error) => {
                if (error.body.message !== "EQCC step already in progress.") {
                    this.saveDraft("Draft", true);
                    this.readOnly = false;
                    this.disableFields();
                }
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error",
                        message: error.body.message,
                        variant: "error"
                    })
                );
            });
    }

    checkRequiredInputs() {
        let requiredFields = false;
        for (let [key, val] of activeRemarkInputsMap) {
            if (!val.value) {
                requiredFields = true;
                break;
            }
        }
        if (requiredFields) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Error",
                    message: "Remark inputs are required",
                    variant: "error"
                })
            );
        }
        return requiredFields;
    }

    scrollToTop() {
        let formBegin = this.template.querySelector(`[data-id="formBegin"]`);
        formBegin.scrollIntoView();
    }

    get progress() {
        return `${this.percentage}`;
    }
    get formStatus() {
        if (this._formStatus) {
            return `${this._formStatus}`;
        } else {
            return "Draft";
        }
    }
    set formStatus(status) {
        this._formStatus = status;
    }
    get navigable() {
        if (this._navigable) {
            return `${this._navigable}`;
        } else {
            return "Draft";
        }
    }
    set navigable(navi) {
        this._navigable = navi;
    }
    get functionalLocation() {
        if (this._functionalLocation) {
            return `${this._functionalLocation}`;
        } else {
            return "";
        }
    }
    set functionalLocation(fl) {
        this._functionalLocation = fl;
    }
    get notification() {
        if (this._notification) {
            return `${this._notification}`;
        } else {
            return "";
        }
    }
    set notification(n) {
        this._notification = n;
    }

    get order() {
        if (this._order) {
            return `${this._order}`;
        } else {
            return "";
        }
    }
    set order(o) {
        this._order = o;
    }

    get showPercentage() {
        if (this.percentage === "100") {
            return false;
        } else {
            return true;
        }
    }

    recallForApprovalButton() {
        this.saveDraft("Recalled", true)
            .then(() => {
                updateStepPercentage({
                    stepId: this.recordId,
                    percentage: this.stepPercentage
                });
            })
            .then((response) => {
                return recallForApproval({
                    stepId: this.recordId
                });
            })
            .then((result) => {
                if (result) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Success",
                            message: "Approval has been recalled",
                            variant: "success"
                        })
                    );
                    this.readOnly = false;
                    this.disableFields();
                    this.scrollToTop();
                } else {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Error",
                            message: "Approval has already been recalled.",
                            variant: "error"
                        })
                    );
                }
            })
            .then(() => {
                let percentages = JSON.parse(this.percentageByStep);
                percentages[this.stepNumber] = this.stepPercentage;
                updateHeaderSheetPercentages({
                    stepId: this.recordId,
                    percentages: JSON.stringify(percentages)
                });
            })
            .catch((error) => {
                if (error.body.message !== "EQCC step already in progress.") {
                    this.saveDraft("Draft", true);
                    this.readOnly = false;
                    this.disableFields();
                }
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error",
                        message: error.body.message,
                        variant: "error"
                    })
                );
            });
    }

    // THOR 2
    @track isModalOpen = false;
    @track userName = '';
    @track userRecordId;

    openModal() {
        if(this.specialSubmitForm) {
            this.openSubmitModal();
        }
        else {
            this.isModalOpen = true;
        }
    }

    closeModal() {
        this.isModalOpen = false;
    }

    submit() {
        this.isModalOpen = false;
        if(this.userName == '') {
            this.submitForApprovalButton();
        }
        else {
            this.specialSubmit();
        }
    }

    selectedRecordId; //store the record id of the selected
    handleValueSelcted(event) {
        this.selectedRecordId = event.detail;
    }

    onUserSelection(event){
        this.userName = event.detail.selectedValue;
        this.userRecordId = event.detail.selectedRecordId;
    }

    specialSubmit() {
        this.saveDraft("Pending for Approval", true)
            .then(() => {
                updateStepPercentage({
                    stepId: this.recordId,
                    percentage: this.stepPercentage
                });
            })
            .then((response) => {
                return submitForApproval({
                    stepId: this.recordId,
                    userId: this.userRecordId
                });
            })
            .then((result) => {
                if (result) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Success",
                            message: "Form submitted for approval.",
                            variant: "success"
                        })
                    );
                    this.readOnly = true;
                    this.disableFields();
                    this.scrollToTop();
                } else {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Error",
                            message: "Form has already been submitted.",
                            variant: "error"
                        })
                    );
                }
            })
            .then(() => {
                let percentages = JSON.parse(this.percentageByStep);
                percentages[this.stepNumber] = this.stepPercentage;
                updateHeaderSheetPercentages({
                    stepId: this.recordId,
                    percentages: JSON.stringify(percentages)
                });
            })
            .catch((error) => {
                if (error.body.message !== "EQCC step already in progress.") {
                    this.saveDraft("Draft", true);
                    this.readOnly = false;
                    this.disableFields();
                }
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error",
                        message: error.body.message,
                        variant: "error"
                    })
                );
            });
    }
}