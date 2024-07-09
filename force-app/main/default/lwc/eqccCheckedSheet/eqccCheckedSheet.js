import { LightningElement, track, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { updateRecord, getRecord, getFieldValue } from "lightning/uiRecordApi";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
// label mapping
import {  disableButtons, dynamicRow,ENEM_QFR_2604_REL,ENEM_QFR_1325_UPS,ENIM_QFR_743,ENEM_QFR_9008_GNR,ENEM_QFR_9003_GNR } from './utils';
import getCount from "@salesforce/apex/THOR_FormMappingLabelController.getCount";
import updateFormMapping from "@salesforce/apex/THOR_FormMappingLabelController.updateFormMapping";
// label mapping
import submitForApproval from "@salesforce/apex/THOR_ApprovalFlowService.submitForApproval";
import updateStepPercentage from "@salesforce/apex/HeaderSheetHandler.updateStepPercentage";
import updateHeaderSheetRequester from "@salesforce/apex/HeaderSheetHandler.updateHeaderSheetRequester";
import updateHeaderSheetPercentages from "@salesforce/apex/HeaderSheetHandler.updateHeaderSheetPercentages";
import rejectStepAndHeaderSheet from "@salesforce/apex/HeaderSheetHandler.rejectStepAndHeaderSheet";
import recallForApproval from "@salesforce/apex/THOR_ApprovalFlowService.recallForApproval";
import ignorSpecialSubmitForm from "@salesforce/apex/THOR_ApprovalFlowService.getIgnorSpecialSubmit";
// add
import getSubmitor from "@salesforce/apex/THOR_UserController.isSubmited";
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
import tankLevelGaugeMaintenance1 from "./forms/TankLevelGaugeMaintenance1.html";
import scaffoldingInspectionChecklist1 from "./forms/ScaffoldingInspectionChecklist1.html";
import flangeAssemblyControlDocument1 from "./forms/FlangeAssemblyControlDocument1.html";
import finFansPreventiveMaintenance1 from "./forms/BeltDrivenFinFansMaintenance1.html";
import finFansPreventiveMaintenance2 from "./forms/BeltDrivenFinFansMaintenance2.html";
import finFansCorrectiveMaintenance1 from "./forms/BeltDrivenFinFansCorrective1.html";
import finFansCorrectiveMaintenance2 from "./forms/BeltDrivenFinFansCorrective2.html";
import Checklist_For_Lifting_With_CraneHiab1 from "./forms/Checklist_For_Lifting_With_CraneHiab1.html";
import SIF_Test_Report_Differential_Pressure_TX1 from "./forms/SIF_Test_Report_Differential_Pressure_TX1.html";
import SIF_Test_Report_Pressure_Transmitter1 from "./forms/SIF_Test_Report_Pressure_Transmitter1.html";
import QC_Workshop_Motor_Inspection1 from "./forms/QC_Workshop_Motor_Inspection1.html";
import hrzntlPumpInstallRemoveChkList1 from "./forms/HorizontalPump_RmInst_Checklist1.html";
import hrzntlPumpInstallRemoveChkList2 from "./forms/HorizontalPump_RmInst_Checklist2.html";
import hrzntlPumpInstallRemoveChkList3 from "./forms/HorizontalPump_RmInst_Checklist3.html";
import InstmntHlthChckShtCtrlValve1 from "./forms/Instmnt_Hlth_Chck_Sht_Ctrl_Valve1.html";
import Inspection_for_Rmv_Insulation1 from "./forms/Inspection_for_Rmv_Insulation1.html";
import InspectionReportForInstallInsulation1 from "./forms/InspectionReportForInstallInsulation1.html";
import QAQC_Elec_Eq_Insp_Form1 from "./forms/QAQC_Elec_Eq_Insp_Form1.html";
import Thai_Oil_Surface_Inspection_Report1 from "./forms/Thai_Oil_Surface_Inspection_Report1.html";
import InspectionRprtForMixingOfRefractory1 from "./forms/InspectionRprtForMixingOfRefractory1.html";
import QC_Contractor_Motor_Inspection_Form1 from "./forms/QC_Contractor_Motor_Inspection_Form1.html";
import Concrete_Placing_Checklist1 from "./forms/Concrete_Placing_Checklist1.html";
import Thai_Oil_Coating_Inspection_Report1 from "./forms/Thai_Oil_Coating_Inspection_Report1.html";
import LVVSDS1 from "./forms/LVVSDS1.html";
import pHAnalyzerMaintenance1 from "./forms/pHAnalyzerMaintenanceCheckSheet1.html";
import OxygenAnalyzerMaintenance1 from "./forms/OxygenAnalyzerMaintenance1.html";
import SafetyReliefValve1 from "./forms/SafetyReliefValve1.html";
import SafetyReliefValve2 from "./forms/SafetyReliefValve2.html";
import PumpPreventiveMaintenance1 from "./forms/PumpPreventiveMaintenance1.html";
import QC_MOTOR_BEARING_GREASING_PM1 from "./forms/QC_MOTOR_BEARING_GREASING_PM1.html";
import QCMotorInstallationForm1 from "./forms/QCMotorInstallationForm1.html";
import ResourcesOrderForm1 from "./forms/ResourcesOrderForm1.html";
import EarthResistanceContinuityTesting1 from "./forms/EarthResistanceContinuityTesting1";
import BatteriesChargerUPSInpsTestRec1 from "./forms/BatteriesChargerUPSInspTestRec1.html";
import DifferentialPressureLevelTransmitter1 from "./forms/DifferentialPressureLevelTransmitter1.html";
import SIF_Test_Report_Differential_Pressure_LT1 from "./forms/SIF_Test_Report_Differential_Pressure_LT1.html";
import AirFinnedCoolerAssembly1 from "./forms/AirFinnedCoolerAssembly1.html";
import BLOWERINSPECTIONINSTALLATION1 from "./forms/BLOWERINSPECTIONINSTALLATION1.html";
import BLOWERINSPECTIONINSTALLATION2 from "./forms/BLOWERINSPECTIONINSTALLATION2.html";
import InstrumentInspectionTestReportControlVOOV1 from "./forms/InstrumentInspectionTestReportControlVOOV1.html";
import DifferentialPressureFlowTransmitter1 from "./forms/DifferentialPressureFlowTransmitter1.html";
import Floating_Head1 from "./forms/Floating_Head1.html";
import Floating_Head2 from "./forms/Floating_Head2.html";
import Floating_Head3 from "./forms/Floating_Head3.html";
import CONVENTIONAL_TYPE_PRESSURE_RELIEF_VALVE1 from "./forms/CONVENTIONAL_TYPE_PRESSURE_RELIEF_VALVE1.html";
import FourMonthlySubstationInspection1 from "./forms/FourMonthlySubstationInspection1.html";
import MonthlySubstationInspection1 from "./forms/MonthlySubstationInspection1.html";
import SundyneLMV311ChecklistForm1 from "./forms/SundyneLMV311ChecklistForm1.html";
import OverhungPumpHorizontal1 from "./forms/OverhungPumpHorizontalTypeChecklistForm1.html";
import defaultTemplate from "./forms/_default.html";
import getStepFromNumber from "@salesforce/apex/EQCCCheckedSheetNavigationController.getStepFromNumber";

let inputMap = new Map();
let avoidPercentageInputsDataIds = [];
let disabledSectionInputs = new Set();
let activeRemarkInputsMap = new Map();
let questionsPerStep = [];
let mapA = new Map();
let mapB = new Map();
let isSubmit = false;
// label mapping
let ENEM_QFR_2604_REL_Part1 = 0;
let ENEM_QFR_1325_UPS_Part1 = 0;
let ENIM_QFR_743_Part1 = 0;
let ENEM_QFR_9008_GNR_Part1 = 0;
let ENEM_QFR_9008_GNR_Part2 = 0;
let ENEM_QFR_9008_GNR_Part3 = 0;
let ENEM_QFR_9003_GNR_Part1 = 0;
let ENEM_QFR_9003_GNR_Part2 = 0;
let ENEM_QFR_9003_GNR_Part3 = 0;
let ENEM_QFR_9003_GNR_Part4 = 0;
let ENEM_QFR_9003_GNR_Part5 = 0;
let ENEM_QFR_9003_GNR_Part6 = 0;
// label mapping

export default class EqccCheckedSheet extends NavigationMixin(LightningElement) {
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
    can;
    orderId;
    userRole;
    _formStatus;
    _functionalLocation;
    _notification;
    _order;
    _isModified = false;
    _navigable = true;

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
            case "Tank_Gauge_Level_Maintenance_Record": {
                switch (this.stepNumber) {
                    case 1:
                        return tankLevelGaugeMaintenance1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Scaffolding_Inspection_Record": {
                switch (this.stepNumber) {
                    case 1:
                        return scaffoldingInspectionChecklist1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Flange_Assembly_Control_Record": {
                switch (this.stepNumber) {
                    case 1:
                        return flangeAssemblyControlDocument1;
                    default:
                        return defaultTemplate;
                }
            }
            case "QC_Workshop_Motor_Inspection": {
                switch (this.stepNumber) {
                    case 1:
                        return QC_Workshop_Motor_Inspection1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Checklist_For_Lifting_With_CraneHiab": {
                switch (this.stepNumber) {
                    case 1:
                        return Checklist_For_Lifting_With_CraneHiab1;
                    default:
                        return defaultTemplate;
                }
            }
            case "SIF_Test_Report_Pressure_Transmitter": {
                switch (this.stepNumber) {
                    case 1:
                        return SIF_Test_Report_Pressure_Transmitter1;
                    default:
                        return defaultTemplate;
                }
            }
            case "SIF_Test_Report_Differential_Pressure_TX": {
                switch (this.stepNumber) {
                    case 1:
                        return SIF_Test_Report_Differential_Pressure_TX1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Fin_Fans_Preventive_Maintenance_Record": {
                switch (this.stepNumber) {
                    case 1:
                        return finFansPreventiveMaintenance1;
                    case 2:
                        return finFansPreventiveMaintenance2;
                    default:
                        return defaultTemplate;
                }
            }
            case "Fin_Fans_Corrective_Maintenance_Record": {
                switch (this.stepNumber) {
                    case 1:
                        return finFansCorrectiveMaintenance1;
                    case 2:
                        return finFansCorrectiveMaintenance2;
                    default:
                        return defaultTemplate;
                }
            }
            case "HorizontalPump_RmInst_Checklist": {
                switch (this.stepNumber) {
                    case 1:
                        return hrzntlPumpInstallRemoveChkList1;
                    case 2:
                        return hrzntlPumpInstallRemoveChkList2;
                    case 3:
                        return hrzntlPumpInstallRemoveChkList3;
                    default:
                        return defaultTemplate;
                }
            }
            case "Instmnt_Hlth_Chck_Sht_Ctrl_Valve": {
                switch (this.stepNumber) {
                    case 1:
                        return InstmntHlthChckShtCtrlValve1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Inspection_for_Rmv_Insulation": {
                switch (this.stepNumber) {
                    case 1:
                        return Inspection_for_Rmv_Insulation1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Inspection_Report_For_Install_Insulation": {
                switch (this.stepNumber) {
                    case 1:
                        return InspectionReportForInstallInsulation1;
                    default:
                        return defaultTemplate;
                }
            }
            case "QAQC_Elec_Eq_Insp_Form": {
                switch (this.stepNumber) {
                    case 1:
                        return QAQC_Elec_Eq_Insp_Form1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Thai_Oil_Surface_Inspection_Report": {
                switch (this.stepNumber) {
                    case 1:
                        return Thai_Oil_Surface_Inspection_Report1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Inspection_Rprt_for_Mixing_of_Refractory": {
                switch (this.stepNumber) {
                    case 1:
                        return InspectionRprtForMixingOfRefractory1;
                    default:
                        return defaultTemplate;
                }
            }
            case "QC_Contractor_Motor_Inspection_Form": {
                switch (this.stepNumber) {
                    case 1:
                        return QC_Contractor_Motor_Inspection_Form1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Concrete_Placing_Checklist": {
                switch (this.stepNumber) {
                    case 1:
                        return Concrete_Placing_Checklist1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Thai_Oil_Coating_Inspection_Report": {
                switch (this.stepNumber) {
                    case 1:
                        return Thai_Oil_Coating_Inspection_Report1;
                    default:
                        return defaultTemplate;
                }
            }
            case "LV_VSDS": {
                switch (this.stepNumber) {
                    case 1:
                        return LVVSDS1;
                    default:
                        return defaultTemplate;
                }
            }
            case "pH_Analyzer_Maintenance_Check_Sheet": {
                switch (this.stepNumber) {
                    case 1:
                        return pHAnalyzerMaintenance1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Oxygen_Analyzer_Maintenance_Check_Sheet": {
                switch (this.stepNumber) {
                    case 1:
                        return OxygenAnalyzerMaintenance1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Safety_Relief_Val": {
                switch (this.stepNumber) {
                    case 1:
                        return SafetyReliefValve1;
                    case 2:
                        return SafetyReliefValve2;
                    default:
                        return defaultTemplate;
                }
            }
            case "PUMP_PREVENTIVE_MAINTENANCE": {
                switch (this.stepNumber) {
                    case 1:
                        return PumpPreventiveMaintenance1;
                    default:
                        return defaultTemplate;
                }
            }
            case "QC_MOTOR_BEARING_GREASING_PM_FORM": {
                switch (this.stepNumber) {
                    case 1:
                        return QC_MOTOR_BEARING_GREASING_PM1;
                    default:
                        return defaultTemplate;
                }
            }
            case "QC_Motor_Installation_Form": {
                switch (this.stepNumber) {
                    case 1:
                        return QCMotorInstallationForm1;
                    default:
                        return defaultTemplate;
                }
            }

            case "Sundyne_LMV_311_Checklist_Form": {
                switch (this.stepNumber) {
                    case 1:
                        return SundyneLMV311ChecklistForm1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Resources_Order_Form": {
                switch (this.stepNumber) {
                    case 1:
                        return ResourcesOrderForm1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Earth_Resistance_Continuity_Testing": {
                switch (this.stepNumber) {
                    case 1:
                        return EarthResistanceContinuityTesting1;
                    default:
                        return defaultTemplate;
                }
            }
            case "BatteriesChargerUPSInspTestRec": {
                switch (this.stepNumber) {
                    case 1:
                        return BatteriesChargerUPSInpsTestRec1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Differential_Pressure_Level_Transmitter": {
                switch (this.stepNumber) {
                    case 1:
                        return DifferentialPressureLevelTransmitter1;
                    default:
                        return defaultTemplate;
                }
            }

            case "SIF_Test_Report_Diff_Pressure_Level": {
                switch (this.stepNumber) {
                    case 1:
                        return SIF_Test_Report_Differential_Pressure_LT1;
                    default:
                        return defaultTemplate;
                }
            }

            case "SIF_Test_Report_Diff_Pressure_Level": {
                switch (this.stepNumber) {
                    case 1:
                        return SIF_Test_Report_Differential_Pressure_LT1;
                    default:
                        return defaultTemplate;
                }
            }

            case "SIF_Test_Report_Diff_Pressure_Level": {
                switch (this.stepNumber) {
                    case 1:
                        return SIF_Test_Report_Differential_Pressure_LT1;
                    default:
                        return defaultTemplate;
                }
            }
            case "AIR_FINNED_COOLER_ASSEMBLY": {
                switch (this.stepNumber) {
                    case 1:
                        return AirFinnedCoolerAssembly1;
                    default:
                        return defaultTemplate;
                }
            }
            case "BLOWER_INSPECTION_AND_INSTALLATION": {
                switch (this.stepNumber) {
                    case 1:
                        return BLOWERINSPECTIONINSTALLATION1;
                    case 2:
                        return BLOWERINSPECTIONINSTALLATION2;
                    default:
                        return defaultTemplate;
                }
            }
            case "Inspection_Test_Report_Control_VOOV": {
                switch (this.stepNumber) {
                    case 1:
                        return InstrumentInspectionTestReportControlVOOV1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Differential_Pressure_Flow_Transmitter": {
                switch (this.stepNumber) {
                    case 1:
                        return DifferentialPressureFlowTransmitter1;
                    default:
                        return defaultTemplate;
                }
            }
            case "Floating_Head": {
                switch (this.stepNumber) {
                    case 1:
                        return Floating_Head1;
                    case 2:
                        return Floating_Head2;
                    case 3:
                        return Floating_Head3;
                    default:
                        return defaultTemplate;
                }
            }
            case "CONVENTIONAL_TYPE_PRESSURE_RELIEF_VALVE": {
                switch (this.stepNumber) {
                    case 1:
                        return CONVENTIONAL_TYPE_PRESSURE_RELIEF_VALVE1;
                    default:
                        return defaultTemplate;
                }
            }

            case "Monthly_Substation_Inspection": {
                switch (this.stepNumber) {
                    case 1:
                        return MonthlySubstationInspection1;
                    default:
                        return defaultTemplate;
                }
            }

            case "Four_Monthly_Substation_Inspection": {
                switch (this.stepNumber) {
                    case 1:
                        return FourMonthlySubstationInspection1;
                    default:
                        return defaultTemplate;
                }
            }

            case "Overhung_pump_Horizontal": {
                switch (this.stepNumber) {
                    case 1:
                        return OverhungPumpHorizontal1;
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

    /*@api
    get isCan() {
        return this.can;
    }
    set isCan(value) {
        this.can = value;
        this.disableFields();
        this.createHeaderInputsList();
    }*/

    renderedCallback() {
        if (this.isDifferent === true) {
            disabledSectionInputs.clear();
            //this.loadDraft();
            this.getIgnorSpecialSubmit();
            this.submitor();
            // label mapping
            if(this.checkedSheetName == 'Earth_Resistance_Continuity_Testing') {
                this.Earth_Resistance_Continuity_Testing();
            }
            if(this.checkedSheetName == 'BatteriesChargerUPSInspTestRec') {
                this.BatteriesChargerUPSInspTestRec();
            }
            if(this.checkedSheetName == 'pH_Analyzer_Maintenance_Check_Sheet') {
                this.pH_Analyzer_Maintenance_Check_Sheet();
            }
            if(this.checkedSheetName == 'Monthly_Substation_Inspection') {
                this.Monthly_Substation_Inspection();
            }
            if(this.checkedSheetName == 'Four_Monthly_Substation_Inspection') {
                this.Four_Monthly_Substation_Inspection();
            }
            // label mapping
        }
        else {
            console.log('isDifferent == false')
        }
        //this.disableFields();
        this.calculatePercentage();

    }
    // label mapping
    Earth_Resistance_Continuity_Testing() {
        getCount({
            stepId : this.recordId
        })
        .then(result => {
            if(result) {
                let strResult = result.split("-");
                if(strResult.length > 0) {
                    if(strResult[0]) {
                        ENEM_QFR_2604_REL_Part1 = parseInt(strResult[0]);
                    }
                }
            }
        })
    }
    BatteriesChargerUPSInspTestRec() {
        getCount({
            stepId : this.recordId
        })
        .then(result => {
            if(result) {
                let strResult = result.split("-");
                if(strResult.length > 0) {
                    if(strResult[0]) {
                        ENEM_QFR_1325_UPS_Part1 = parseInt(strResult[0]);
                    }
                }
            }
        })
    }
    pH_Analyzer_Maintenance_Check_Sheet() {
        getCount({
            stepId : this.recordId
        })
        .then(result => {
            if(result) {
                let strResult = result.split("-");
                if(strResult.length > 0) {
                    if(strResult[0]) {
                        ENIM_QFR_743_Part1 = parseInt(strResult[0]);
                    }
                }
            }
        })
    }
    Monthly_Substation_Inspection() {
        getCount({
            stepId : this.recordId
        })
        .then(result => {
            if(result) {
                let strResult = result.split("-");
                if(strResult.length > 0) {
                    if(strResult[0]) {
                        ENEM_QFR_9008_GNR_part1 = parseInt(strResult[0]);
                    }
                    if(strResult[1]) {
                        ENEM_QFR_9008_GNR_part2 = parseInt(strResult[1]);
                    }
                    if(strResult[2]) {
                        ENEM_QFR_9008_GNR_part3 = parseInt(strResult[2]);
                    }
                }
            }
        })
    }
    Four_Monthly_Substation_Inspection() {
        getCount({
            stepId : this.recordId
        })
        .then(result => {
            if(result) {
                let strResult = result.split("-");
                if(strResult.length > 0) {
                    if(strResult[0]) {
                        ENEM_QFR_9003_GNR_part1 = parseInt(strResult[0]);
                    }
                    if(strResult[1]) {
                        ENEM_QFR_9003_GNR_part2 = parseInt(strResult[1]);
                    }
                    if(strResult[2]) {
                        ENEM_QFR_9003_GNR_part3 = parseInt(strResult[2]);
                    }
                    if(strResult[3]) {
                        ENEM_QFR_9003_GNR_part4 = parseInt(strResult[3]);
                    }
                    if(strResult[4]) {
                        ENEM_QFR_9003_GNR_part5 = parseInt(strResult[4]);
                    }
                    if(strResult[5]) {
                        ENEM_QFR_9003_GNR_part6 = parseInt(strResult[5]);
                    }
                }
            }
        })
    }
    // label mapping

    submitor() {
        getSubmitor({ stepId: this.recordId })
            .then((result) => {
                isSubmit = result;
                console.log('isSubmit >>> ' + isSubmit);
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
    disableActionButtons() {
        disableButtons(this.template.querySelector("[data-id=saveEQCCStep]"),
                       this.template.querySelector("[data-id=submitEQCCStep]"),
                       this.template.querySelector("[data-id=rejectEQCCStep]"),
                       this.template.querySelector("[data-id=recallEQCCStep]"),
                       this.formStatus,
                       isSubmit);
    }

    drawDynamicRows() {
        switch (this.checkedSheetName) {
            case "Monthly_Substation_Inspection": {
                switch (this.stepNumber) {
                    case 1:
                        if((this.formStatus == 'Draft' || this.formStatus == 'Recalled' || this.formStatus == 'Pending for Approval') && isSubmit) {
                            let firstHiddenRow = this.template.querySelector(".hideRow");

                            if (!firstHiddenRow) {
                                let rowsBodySectionE = this.template.querySelector(".rowsBodySectionE");
                                let rowsBodySectionF = this.template.querySelector(".rowsBodySectionF");
                                let rowsBodySectionG = this.template.querySelector(".rowsBodySectionG");

                                if (rowsBodySectionE && rowsBodySectionF && rowsBodySectionG) {
                                    rowsBodySectionE.insertAdjacentHTML("beforeend", dynamicRow("Monthly_Substation_Inspection_Row_E"));
                                    rowsBodySectionF.insertAdjacentHTML("beforeend", dynamicRow("Monthly_Substation_Inspection_Row_F"));
                                    rowsBodySectionG.insertAdjacentHTML("beforeend", dynamicRow("Monthly_Substation_Inspection_Row_G"));

                                    let inputsListE = rowsBodySectionE.querySelectorAll("input");
                                    let inputsListF = rowsBodySectionF.querySelectorAll("input");
                                    let inputsListG = rowsBodySectionG.querySelectorAll("input");

                                    inputsListE.forEach((input) => {
                                        if (input.dataset.affectcells) {
                                            input.addEventListener("change", this.handleAffectedCells.bind(this));
                                        } else {
                                            input.addEventListener("change", this.onIEH.bind(this));
                                        }
                                    });
                                    inputsListF.forEach((input) => {
                                        if (input.dataset.affectcells) {
                                            input.addEventListener("change", this.handleAffectedCells.bind(this));
                                        } else {
                                            input.addEventListener("change", this.onIEH.bind(this));
                                        }
                                    });
                                    inputsListG.forEach((input) => {
                                        if (input.dataset.affectcells) {
                                            input.addEventListener("change", this.handleAffectedCells.bind(this));
                                        } else {
                                            input.addEventListener("change", this.onIEH.bind(this));
                                        }
                                    });
                                }
                            }
                        }

                }
                return;
            }

            case "Four_Monthly_Substation_Inspection": {
                switch (this.stepNumber) {
                    case 1:
                        if((this.formStatus == 'Draft' || this.formStatus == 'Recalled' || this.formStatus == 'Pending for Approval') && isSubmit) {
                            let firstHiddenRow = this.template.querySelector(".hideRow");
                            if (!firstHiddenRow) {

                                let rowsBodySectionTR = this.template.querySelector(".rowsBodySectionTR");
                                let rowsBodySectionC = this.template.querySelector(".rowsBodySectionC");
                                let rowsBodySectionD = this.template.querySelector(".rowsBodySectionD");
                                let rowsBodySectionE1 = this.template.querySelector(".rowsBodySectionE1");
                                let rowsBodySectionE2 = this.template.querySelector(".rowsBodySectionE2");
                                let rowsBodySectionE3 = this.template.querySelector(".rowsBodySectionE3");

                                if (
                                    rowsBodySectionC &&
                                    rowsBodySectionD &&
                                    rowsBodySectionE1 &&
                                    rowsBodySectionE2 &&
                                    rowsBodySectionE3
                                ) {
                                    rowsBodySectionC.insertAdjacentHTML("beforeend", dynamicRow("Four_Monthly_Substation_Inspection_Row_C"));
                                    rowsBodySectionD.insertAdjacentHTML("beforeend", dynamicRow("Four_Monthly_Substation_Inspection_Row_D"));
                                    rowsBodySectionE1.insertAdjacentHTML("beforeend", dynamicRow("Four_Monthly_Substation_Inspection_Row_E1"));
                                    rowsBodySectionE2.insertAdjacentHTML("beforeend", dynamicRow("Four_Monthly_Substation_Inspection_Row_E2"));
                                    rowsBodySectionE3.insertAdjacentHTML("beforeend", dynamicRow("Four_Monthly_Substation_Inspection_Row_E3"));
                                    rowsBodySectionTR.insertAdjacentHTML("beforeend", dynamicRow("Four_Monthly_Substation_Inspection_Row_R"));

                                    let inputsListC = rowsBodySectionC.querySelectorAll("input");
                                    let inputsListD = rowsBodySectionD.querySelectorAll("input");
                                    let inputsListE1 = rowsBodySectionE1.querySelectorAll("input");
                                    let inputsListE2 = rowsBodySectionE2.querySelectorAll("input");
                                    let inputsListE3 = rowsBodySectionE3.querySelectorAll("input");
                                    let inputsListTR = rowsBodySectionTR.querySelectorAll("input");
                                    let addRowButtons = rowsBodySectionTR.querySelectorAll(".slds-button");

                                    addRowButtons.forEach((button) => {
                                        button.addEventListener("click", this.addRow.bind(this));
                                    });

                                    inputsListTR.forEach((input) => {
                                        input.addEventListener("change", this.onIEH.bind(this));
                                    });
                                    inputsListC.forEach((input) => {
                                        input.addEventListener("change", this.onIEH.bind(this));
                                    });
                                    inputsListD.forEach((input) => {
                                        input.addEventListener("change", this.onIEH.bind(this));
                                    });
                                    inputsListE1.forEach((input) => {
                                        if (input.dataset.affectcells) {
                                            input.addEventListener("change", this.handleAffectedCells.bind(this));
                                        } else {
                                            input.addEventListener("change", this.onIEH.bind(this));
                                        }
                                    });
                                    inputsListE2.forEach((input) => {
                                        if (input.dataset.affectcells) {
                                            input.addEventListener("change", this.handleAffectedCells.bind(this));
                                        } else {
                                            input.addEventListener("change", this.onIEH.bind(this));
                                        }
                                    });
                                    inputsListE3.forEach((input) => {
                                        if (input.dataset.affectcells) {
                                            input.addEventListener("change", this.handleAffectedCells.bind(this));
                                        } else {
                                            input.addEventListener("change", this.onIEH.bind(this));
                                        }
                                    });
                                }
                            }
                        }

                }
                return;
            }

            case "Earth_Resistance_Continuity_Testing": {
                switch (this.stepNumber) {
                    case 1:
                        if((this.formStatus == 'Draft' || this.formStatus == 'Recalled' || this.formStatus == 'Pending for Approval') && isSubmit) {
                            let firstHiddenRow = this.template.querySelector(".hideRow");

                            if (!firstHiddenRow) {
                                let rowsBodySection = this.template.querySelector(".rowsBodySection");

                                if (rowsBodySection) {

                                    rowsBodySection.insertAdjacentHTML("beforeend", dynamicRow("Earth_Resistance_Continuity_Testing"));

                                    let inputsList = rowsBodySection.querySelectorAll("input");

                                    inputsList.forEach((input) => {
                                        input.addEventListener("change", this.onIEH.bind(this));
                                    });
                                }
                            }
                        }

                }
                return;
            }

            case "pH_Analyzer_Maintenance_Check_Sheet": {
                switch (this.stepNumber) {
                    case 1:
                        if((this.formStatus == 'Draft' || this.formStatus == 'Recalled' || this.formStatus == 'Pending for Approval') && isSubmit) {
                            let firstHiddenRow = this.template.querySelector(".hideRow");

                            if (!firstHiddenRow) {
                                let rowsBodySection = this.template.querySelector(".rowsBodySection");
                                if (rowsBodySection) {
                                    rowsBodySection.insertAdjacentHTML("beforeend", dynamicRow("pH_Analyzer_Maintenance_Check_Sheet"));
                                    let inputsList = rowsBodySection.querySelectorAll("input");
                                    inputsList.forEach((input) => {
                                        input.addEventListener("change", this.onIEH.bind(this));
                                    });
                                }
                            }
                        }

                }
                return;
            }

            case "Sundyne_LMV_311_Checklist_Form": {
                switch (this.stepNumber) {
                    case 1:
                        if((this.formStatus == 'Draft' || this.formStatus == 'Recalled' || this.formStatus == 'Pending for Approval') && isSubmit) {
                            let drawnSection = this.template.querySelector(".drawnSection");

                            if (!drawnSection) {
                                let rowsBodySection = this.template.querySelector(".rowsBodySection");
                                if (rowsBodySection) {

                                    rowsBodySection.insertAdjacentHTML("beforeend", dynamicRow("Sundyne_LMV_311_Checklist_Form"));
                                    let inputsList = rowsBodySection.querySelectorAll("input");
                                    inputsList.forEach((input) => {
                                        input.addEventListener("change", this.onIEH.bind(this));
                                    });
                                } else {
                                    this.saveDraft(this.formStatus, true);
                                }
                            }
                        }

                }
                return;
            }

            case "Overhung_pump_Horizontal": {
                switch (this.stepNumber) {
                    case 1:
                        if((this.formStatus == 'Draft' || this.formStatus == 'Recalled' || this.formStatus == 'Pending for Approval') && isSubmit) {
                            let drawnSection3 = this.template.querySelector(".drawnSection3");

                            if (!drawnSection3) {
                                let rowsBodySection3 = this.template.querySelector(".rowsBodySection3");
                                if (rowsBodySection3) {
                                    rowsBodySection3.insertAdjacentHTML("beforeend", dynamicRow("Overhung_pump_Horizontal_Section_3"));
                                    let inputsList = rowsBodySection3.querySelectorAll("input");
                                    inputsList.forEach((input) => {
                                        input.addEventListener("change", this.onIEH.bind(this));
                                    });
                                } else {
                                    this.saveDraft(this.formStatus, true);
                                }
                            }

                            let drawnSection8 = this.template.querySelector(".drawnSection8");
                            if (!drawnSection8) {
                                let rowsBodySection8 = this.template.querySelector(".rowsBodySection8");
                                if (rowsBodySection8) {
                                    rowsBodySection8.insertAdjacentHTML("beforeend", dynamicRow("Overhung_pump_Horizontal_Section_8"));
                                    let inputsList = rowsBodySection8.querySelectorAll("input");
                                    inputsList.forEach((input) => {
                                        input.addEventListener("change", this.onIEH.bind(this));
                                    });
                                }
                            }
                        }
                }
                return;
            }

            case "BatteriesChargerUPSInspTestRec": {
                switch (this.stepNumber) {
                    case 1:
                        console.log('formStatus ' + this.formStatus)
                        console.log('isSubmit ' + isSubmit)
                        if((this.formStatus == 'Draft' || this.formStatus == 'Recalled' || this.formStatus == 'Pending for Approval') && isSubmit) {
                            let firstHiddenRow = this.template.querySelector(".hideRow");
                            console.log('firstHiddenRow ' + firstHiddenRow)
                            if (!firstHiddenRow) {
                                let rowsBodySection = this.template.querySelector(".rowsBodySection");
                                if (rowsBodySection) {
                                    rowsBodySection.insertAdjacentHTML("beforeend", dynamicRow("BatteriesChargerUPSInspTestRec"));
                                    let inputsListA = rowsBodySection.querySelectorAll('[data-cell="A"]');
                                    let inputsListB = rowsBodySection.querySelectorAll('[data-cell="B"]');
                                    inputsListA.forEach((input) => {
                                        input.addEventListener("change", this.handleSectionCellsA.bind(this));
                                    });

                                    inputsListB.forEach((input) => {
                                        input.addEventListener("change", this.handleSectionCellsB.bind(this));
                                    });
                                }
                            }
                        }

                }
                return;
            }

            case "Inspection_Test_Report_Control_VOOV": {
                switch (this.stepNumber) {
                    case 1:
                        if((this.formStatus == 'Draft' || this.formStatus == 'Recalled') && isSubmit) {
                            let firstHiddenRow = this.template.querySelector(".hideRow");

                            if (!firstHiddenRow) {
                                let rowsBodySection1_7 = this.template.querySelector(".rowsBodySection1_7");
                                let rowsBodySection1_8 = this.template.querySelector(".rowsBodySection1_8");
                                if (rowsBodySection1_7) {
                                    rowsBodySection1_7.insertAdjacentHTML("beforeend", dynamicRow("Inspection_Test_Report_Control_VOOV_1_7"));
                                    let inputsList1_7 = rowsBodySection1_7.querySelectorAll("input");
                                    inputsList1_7.forEach((input) => {
                                        input.addEventListener("change", this.onIEH.bind(this));
                                    });
                                }
                                if (rowsBodySection1_8) {
                                    rowsBodySection1_8.insertAdjacentHTML("beforeend", dynamicRow("Inspection_Test_Report_Control_VOOV_1_8"));
                                    let inputsList1_8 = rowsBodySection1_8.querySelectorAll("input");
                                    inputsList1_8.forEach((input) => {
                                        input.addEventListener("change", this.onIEH.bind(this));
                                    });
                                }
                            }
                        }
                }
                return;
            }
        }
    }

    loadDraft() {
        if (
            this.checkedSheetName === "Monthly_Substation_Inspection" ||
            this.checkedSheetName === "Four_Monthly_Substation_Inspection" ||
            this.checkedSheetName === "Earth_Resistance_Continuity_Testing" ||
            this.checkedSheetName === "pH_Analyzer_Maintenance_Check_Sheet" ||
            this.checkedSheetName === "Sundyne_LMV_311_Checklist_Form" ||
            this.checkedSheetName === "Overhung_pump_Horizontal" ||
            this.checkedSheetName === "BatteriesChargerUPSInspTestRec" ||
            this.checkedSheetName === "Inspection_Test_Report_Control_VOOV"
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
                let inputElements = this.template.querySelectorAll("input, textarea");
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

            if (status === "Recalled") {
                let statusInput = inputs.find((el) => el.id === "status");
                if (statusInput) {
                    statusInput.value = "Recalled";
                }
                status = "Recalled";
            }

            if(this.checkedSheetName == 'Earth_Resistance_Continuity_Testing') {
                let mapping = ENEM_QFR_2604_REL(ENEM_QFR_2604_REL_Part1); //Dev
                updateFormMapping( {
                    jsonString: mapping,
                    formCode: 'ENEM_QFR_2604_REL', //Dev
                    stepId: this.recordId,
                    count: ENEM_QFR_2604_REL_Part1 //Dev
                });
            }
            if(this.checkedSheetName == 'BatteriesChargerUPSInspTestRec') {
                let mapping = ENEM_QFR_1325_UPS(ENEM_QFR_1325_UPS_Part1); //Dev
                updateFormMapping( {
                    jsonString: mapping,
                    formCode: 'ENEM_QFR_1325_UPS', //Dev
                    stepId: this.recordId,
                    count: ENEM_QFR_1325_UPS_Part1 //Dev
                });
            }
            if(this.checkedSheetName == 'pH_Analyzer_Maintenance_Check_Sheet') {
                let mapping = ENIM_QFR_743(ENIM_QFR_743_Part1); //Dev
                updateFormMapping( {
                    jsonString: mapping,
                    formCode: 'ENIM_QFR_743', //Dev
                    stepId: this.recordId,
                    count: ENIM_QFR_743_Part1 //Dev
                });
            }
            if(this.checkedSheetName == 'Monthly_Substation_Inspection') {
                let mapping = ENEM_QFR_9008_GNR(ENEM_QFR_9008_GNR_Part1, ENEM_QFR_9008_GNR_Part2, ENEM_QFR_9008_GNR_Part3); //Dev
                updateFormMapping( {
                    jsonString: mapping,
                    formCode: 'ENEM_QFR_9008_GNR', //Dev
                    stepId: this.recordId,
                    count: ENEM_QFR_9008_GNR_Part1 + '-' + ENEM_QFR_9008_GNR_Part2 + '-' + ENEM_QFR_9008_GNR_Part3 //Dev
                });
            }
            if(this.checkedSheetName == 'Four_Monthly_Substation_Inspection') {
                let mapping = ENEM_QFR_9003_GNR(ENEM_QFR_9003_GNR_Part1, ENEM_QFR_9003_GNR_Part2, ENEM_QFR_9003_GNR_Part3,ENEM_QFR_9003_GNR_Part4, ENEM_QFR_9003_GNR_Part5, ENEM_QFR_9003_GNR_Part6); //Dev
                updateFormMapping( {
                    jsonString: mapping,
                    formCode: 'ENEM_QFR_9003_GNR', //Dev
                    stepId: this.recordId,
                    count: ENEM_QFR_9003_GNR_Part1 + '-' + ENEM_QFR_9003_GNR_Part2 + '-' + ENEM_QFR_9003_GNR_Part3 + '-' + ENEM_QFR_9003_GNR_Part4 + '-' + ENEM_QFR_9003_GNR_Part5 + '-' + ENEM_QFR_9003_GNR_Part6 //Dev
                });
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
    navigateToStep(event) {
        let selectedStep = event.currentTarget.dataset.step;
        getStepFromNumber({
            stepId: this.recordId,
            stepNum: selectedStep
        })
            .then((result) => {
                this.nextStep = result;
            })
            .finally(() => {
                this[NavigationMixin.Navigate]({
                    type: "standard__component",
                    attributes: {
                        componentName: "c__EQCCCheckedSheetLWCContainer"
                    },
                    state: {
                        c__recordId: this.nextStep
                    }
                });
            });
    }
    submitForApprovalButton() {
        this.saveDraft("Pending for Approval", true)
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
    scrollToTop() {
        let formBegin = this.template.querySelector(`[data-id="formBegin"]`);
        formBegin.scrollIntoView();
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
    createInputMap() {
        inputMap = new Map();
        let elements = this.template.querySelectorAll("input, textarea");
        elements.forEach((element) => {
            if (element.type === "radio" || element.type === "checkbox") {
                if (inputMap.get(element.name) !== true && element.name !== "options") {
                    inputMap.set(element.name, element.checked);
                }
            } else {
                if (element.value != null && element.value !== "") {
                    inputMap.set(element.dataset.id, true);
                } else {
                    inputMap.set(element.dataset.id, false);
                }
            }

            if (element.dataset.id.includes("-inputRemark")) {
                element.classList.add("avoidPercentageInput");
            }
        });
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

    onKeyPress(e) {
        if (!((e.charCode >= 48 && e.charCode <= 57) || e.charCode === 46 || e.charCode === 45)) {
            e.preventDefault();
        }
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

    showRow(element) {
        let hiddenRow = element.closest(".hideRow");

        if (hiddenRow) {
            if (!hiddenRow.classList.contains("showRow")) {
                hiddenRow.classList.remove("hideRow");
                hiddenRow.classList.add("showRow");
            }
        }
    }

    addRow(e) {
        // label mapping
        let addRow = e.currentTarget.dataset.id;
        if(this.checkedSheetName == 'Earth_Resistance_Continuity_Testing') {
            if(addRow == 'addRowPart1') {
                ENEM_QFR_2604_REL_Part1++;
            }
        }
        if(this.checkedSheetName == 'BatteriesChargerUPSInspTestRec') {
            if(addRow == 'addRowPart1') {
                ENEM_QFR_1325_UPS_Part1++;
            }
        }
        if(this.checkedSheetName == 'pH_Analyzer_Maintenance_Check_Sheet') {
            if(addRow == 'addRowPart1') {
                ENIM_QFR_743_Part1++;
            }
        }
        if(this.checkedSheetName == 'Monthly_Substation_Inspection') {
            if(addRow == 'addRowPart1') {
                ENEM_QFR_9008_GNR_Part1++;
            }
            if(addRow == 'addRowPart2') {
                ENEM_QFR_9008_GNR_Part2++;
            }
            if(addRow == 'addRowPart3') {
                ENEM_QFR_9008_GNR_Part3++;
            }
        }
        if(this.checkedSheetName == 'Four_Monthly_Substation_Inspection') {
            if(addRow == 'addRowPart1') {
                ENEM_QFR_9003_GNR_Part1++;
            }
            if(addRow == 'addRowPart2') {
                ENEM_QFR_9003_GNR_Part2++;
            }
            if(addRow == 'addRowPart3') {
                ENEM_QFR_9003_GNR_Part3++;
            }
            if(addRow == 'addRowPart4') {
                ENEM_QFR_9003_GNR_Part4++;
            }
            if(addRow == 'addRowPart5') {
                ENEM_QFR_9003_GNR_Part5++;
            }
            if(addRow == 'addRowPart6') {
                ENEM_QFR_9003_GNR_Part6++;
            }
        }
        // label mapping
        this.loadDraft();
        let dynamicRowsSection = e.currentTarget.closest(".dynamicRows");
        if (dynamicRowsSection && (this.formStatus === "Draft" || this.formStatus === "Needs Revision" || this.formStatus === "Recalled")) {
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
        let removeRow = e.currentTarget.dataset.id;
        if(this.checkedSheetName == 'Earth_Resistance_Continuity_Testing') {
            if((removeRow == 'removeRowPart1') && (ENEM_QFR_2604_REL_Part1 > 0)) {
                ENEM_QFR_2604_REL_Part1 = ENEM_QFR_2604_REL_Part1 - 1;
            }
        }
        if(this.checkedSheetName == 'BatteriesChargerUPSInspTestRec') {
            if((removeRow == 'removeRowPart1') && (ENEM_QFR_1325_UPS_Part1 > 0)) {
                ENEM_QFR_1325_UPS_Part1 = ENEM_QFR_1325_UPS_Part1 - 1;
            }
        }
        if(this.checkedSheetName == 'pH_Analyzer_Maintenance_Check_Sheet') {
            if((removeRow == 'removeRowPart1') && (ENIM_QFR_743_Part1 > 0)) {
                ENIM_QFR_743_Part1 = ENIM_QFR_743_Part1 - 1;
            }
        }
        if(this.checkedSheetName == 'Monthly_Substation_Inspection') {
            if((removeRow == 'removeRowPart1') && (ENEM_QFR_9008_GNR_Part1 > 0)) {
                ENEM_QFR_9008_GNR_Part1 = ENEM_QFR_9008_GNR_Part1 - 1;
            }
            if((removeRow == 'removeRowPart2') && (ENEM_QFR_9008_GNR_Part2 > 0)) {
                ENEM_QFR_9008_GNR_Part2 = ENEM_QFR_9008_GNR_Part2 - 1;
            }
            if((removeRow == 'removeRowPart3') && (ENEM_QFR_9008_GNR_Part3 > 0)) {
                ENEM_QFR_9008_GNR_Part3 = ENEM_QFR_9008_GNR_Part3 - 1;
            }
        }
        if(this.checkedSheetName == 'Four_Monthly_Substation_Inspection') {
            if((removeRow == 'removeRowPart1') && (ENEM_QFR_9003_GNR_Part1 > 0)) {
                ENEM_QFR_9003_GNR_Part1 = ENEM_QFR_9003_GNR_Part1 - 1;
            }
            if((removeRow == 'removeRowPart2') && (ENEM_QFR_9003_GNR_Part2 > 0)) {
                ENEM_QFR_9003_GNR_Part2 = ENEM_QFR_9003_GNR_Part2 - 1;
            }
            if((removeRow == 'removeRowPart3') && (ENEM_QFR_9003_GNR_Part3 > 0)) {
                ENEM_QFR_9003_GNR_Part3 = ENEM_QFR_9003_GNR_Part3 - 1;
            }
            if((removeRow == 'removeRowPart4') && (ENEM_QFR_9003_GNR_Part4 > 0)) {
                ENEM_QFR_9003_GNR_Part4 = ENEM_QFR_9003_GNR_Part4 - 1;
            }
            if((removeRow == 'removeRowPart5') && (ENEM_QFR_9003_GNR_Part5 > 0)) {
                ENEM_QFR_9003_GNR_Part5 = ENEM_QFR_9003_GNR_Part5 - 1;
            }
            if((removeRow == 'removeRowPart6') && (ENEM_QFR_9003_GNR_Part6 > 0)) {
                ENEM_QFR_9003_GNR_Part6 = ENEM_QFR_9003_GNR_Part6 - 1;
            }
        }

        let dynamicRowsSection = e.currentTarget.closest(".dynamicRows");

        let shownRows = dynamicRowsSection.querySelectorAll(".showRow");

        if (shownRows && (["Draft", "Needs Revision", "Recalled"].includes(this.formStatus))) {
            let shownRow = shownRows[shownRows.length - 1];
            if (shownRow) {
                shownRow.classList.add("hideRow");
                shownRow.classList.remove("showRow");
                shownRow.querySelectorAll("input, textarea")
                    .forEach((element) => {
                        if(element.getAttribute("type") === 'radio') {
                            element.checked = element.defaultChecked
                        }
                        else {
                            element.value = element.defaultValue
                        }
                    });
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
        this.dispatchEvent(
					new CustomEvent('percentage', {
						detail: {
							percentage: this.percentage || this.stepPercentage
						}
					})
				)
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
    backButton() {
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName: "c__THOR_OrderRecordDisplay"
            },
            state: {
                c__recordId: this.orderId
            }
        });
    }
    openBackModal() {
        if (this._isModified) {
            this.modalTitle = "Exit Without Saving?";
            this.modalMessage =
                "You have unsaved changes made on this form. If you navigate away from this form your changes will not be saved.";
            this.modalCancelButton = "Discard Changes";
            this.modalConfirmButton = "Go Back";
            this.modalVisible = true;
            this.modalName = "backButton";
        } else {
            this.backButton();
        }
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

    openRecallModal() {
        // let requiredFields = this.checkRequiredInputs();
        // if (!requiredFields) {
            this.modalTitle = "Recall Step";
            this.modalMessage = "Are you sure you want to recall the approval process?";
            this.modalCancelButton = "Cancel";
            this.modalConfirmButton = "Recall";
            this.modalVisible = true;
            this.modalName = "recallForm";
            this.scrollToTop();
        //}
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