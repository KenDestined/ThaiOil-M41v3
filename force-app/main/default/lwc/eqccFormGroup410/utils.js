function disableButtons(save, submit, reject, recall, formStatus, isSubmit) {
    if(isSubmit) {
        if(formStatus == "Draft" || formStatus == "Recalled") {
            if(recall) {
                recall.setAttribute("disabled", "true");
            }
            if (save) {
                save.removeAttribute("disabled");
            }
            if (submit) {
                submit.removeAttribute("disabled");
            }
            if (reject) {
                reject.removeAttribute("disabled");
            }
        }
        else if(formStatus == 'In progress' || formStatus == 'Approved') {
            if (save) {
                save.setAttribute("disabled", "true");
            }
            if (submit) {
                submit.setAttribute("disabled", "true");
            }
            if (reject) {
                reject.setAttribute("disabled", "true");
            }
            if (recall) {
                submit.setAttribute("disabled", "true");
            }
        }
        else {
            if (save) {
                save.setAttribute("disabled", "true");
            }
            if (submit) {
                submit.setAttribute("disabled", "true");
            }
            if (reject) {
                reject.setAttribute("disabled", "true");
            }
            if (recall) {
                recall.removeAttribute("disabled");
            }
        }
    }
    else {
        if (save) {
            save.setAttribute("disabled", "true");
        }
        if (submit) {
            submit.setAttribute("disabled", "true");
        }
        if (reject) {
            reject.setAttribute("disabled", "true");
        }
        if (recall) {
            recall.setAttribute("disabled", "true");
        }
    }
}

function dynamicRow(checkedSheetName) {
    switch (checkedSheetName) {
        case "Inspection_Test_Report_Control_VOOV_1_7": {
            let htmlText = "";
            for (let i=4;i<=10;i++) {
                let tr =`<tr class="hideRow"><td class="text-center"><div class="slds-form-element__control"><input type="text" data-id="1-7-input-`+i+`-1" class="slds-input"/></div></td><td class="text-center"><div class="slds-form-element__control"><input type="text" data-id="1-7-input-`+i+`-2" class="slds-input"/></div></td><td class="text-center"><div class="slds-form-element__control"><input type="text" data-id="1-7-input-`+i+`-3" class="slds-input"/></div></td></tr>`;
                htmlText+=tr;
            }
            return htmlText;
        }
        case "Inspection_Test_Report_Control_VOOV_1_8": {
            let htmlText = "";
            for (let i=4;i<=10;i++) {
                let tr = `<tr class="hideRow"><td class="text-center"><div class="slds-form-element__control"><input onchange={onIEH} type="text" data-id="1-8-input-`+i+`-1" class="slds-input" /></div></td><td class="text-center"><div class="slds-form-element__control"><input onchange={onIEH} type="text" data-id="1-8-input-`+i+`-2" class="slds-input" /></div></td><td class="text-center"><div class="slds-form-element__control"><input onchange={onIEH} type="text" data-id="1-8-input-`+i+`-3" class="slds-input" /></div></td></tr>`;
                htmlText+=tr;
            }
            return htmlText;
        }
        case "Inspection_Test_Report_Control_VOOV_UPLOAD": {
            let htmlText = "";
            for (let i=3;i<=10;i=i+2) {
                let j = i;
                j++;
                let trUpload = `<div class="slds-grid slds-wrap hideRow"><div class="slds-col slds-size_1-of-1 slds-medium-size_6-of-12 slds-large-size_6-of-12 slds-var-p-left_small"> <article class="slds-card"><div class="slds-card__header slds-grid"> <header class="slds-media slds-media_center slds-has-flexi-truncate"><div class="slds-media__body"><h2 class="slds-card__header-title"> <span class="slds-form-element__label">Before</span></h2></div><div class="slds-no-flex"><div class="upload-btn-wrapper" > <button class="btn-file">Upload File</button> <input type="file" name="myfile" data-id="`+i+`" data-upload="`+i+`" class="upload"/></div> <button class="slds-button slds-button_brand save" data-id="`+i+`" data-save="`+i+`" disabled="disabled">Upload</button></div> </header></div><div class=""> <span class="slds-card"><div class="text-center"> <span data-filename="`+i+`" class="filename"> <img src="https://thaioil--c.documentforce.com/servlet/servlet.ImageServer?id=0152v00000HLxWo&oid=00D2v000003OMdM&lastMod=1613126764000" width="30%"> </span></div> </span></div> <footer class="slds-card__footer"> <button data-id="`+i+`" data-preview="`+i+`" class="slds-button slds-button_success preview" disabled="disabled">Preview</button> <button data-id="`+i+`" data-delete="`+i+`" class="slds-button slds-button_destructive delete" disabled="disabled">Delete</button><div class="slds-form-element__control"> <input type="text" data-name="`+i+`" data-id="filename-`+i+`" disabled="disabled" class="slds-input slds-hidden name"/> <input type="text" data-id="remark-`+i+`" class="slds-input"/></div> </footer> </article></div><div class="slds-col slds-size_1-of-1 slds-medium-size_6-of-12 slds-large-size_6-of-12 slds-var-p-left_small"> <article class="slds-card"><div class="slds-card__header slds-grid"> <header class="slds-media slds-media_center slds-has-flexi-truncate"><div class="slds-media__body"><h2 class="slds-card__header-title"> <span class="slds-form-element__label">After</span></h2></div><div class="slds-no-flex"><div class="upload-btn-wrapper" > <button class="btn-file">Upload File</button> <input type="file" name="myfile" data-id="`+j+`" data-upload="`+j+`" class="upload"/></div> <button class="slds-button slds-button_brand save" data-id="`+j+`" data-save="`+j+`" disabled="disabled">Upload</button></div> </header></div><div class=""> <span class="slds-card"><div class="text-center"> <span data-filename="`+j+`" class="filename"> <img src="https://thaioil--c.documentforce.com/servlet/servlet.ImageServer?id=0152v00000HLxWo&oid=00D2v000003OMdM&lastMod=1613126764000" width="30%"> </span></div> </span></div> <footer class="slds-card__footer"> <button data-id="`+j+`" data-preview="`+j+`" class="slds-button slds-button_success preview" disabled="disabled">Preview</button> <button data-id="`+j+`" data-delete="`+j+`" class="slds-button slds-button_destructive delete" disabled="disabled">Delete</button><div class="slds-form-element__control"> <input type="text" data-name="`+j+`" data-id="filename-`+j+`" disabled="disabled" class="slds-input slds-hidden name"/> <input type="text" data-id="remark-`+j+`" class="slds-input"/></div> </footer> </article></div></div>`;
                htmlText+=trUpload;
            }
            return htmlText;
        }
    }
}
function ENEM_QFR_2604_REL(countPart1) { //Dev
    let ENEM_QFR_2604_REL = ''; //Dev
            let part1 = `[{"notification":"Notification","order":"Order","fl":"FL.","status":"Status","collapseZero":"","date":"Date","unit":"Unit","header-na-1":"input N/A","sectionOne-remark":"Remark","sectionOne-inputRemark":"Remark","1-point1":"Point1 Ohm","1-point2":"Point2 Ohm","1-point3":"Point3 Ohm","1-point4":"Point4 Ohm","1-point5":"Point5 Ohm","1-point6":"Point6 Ohm","1-point7":"Point7 Ohm","1-point8":"Point8 Ohm","1-remark-1":"Remark","2-point1":"Point1 Ohm","2-point2":"Point2 Ohm","2-point3":"Point3 Ohm","2-point4":"Point4 Ohm","2-point5":"Point5 Ohm","2-point6":"Point6 Ohm","2-point7":"Point7 Ohm","2-point8":"Point8 Ohm","1-remark-2":"Remark","3-point1":"Point1 Ohm","3-point2":"Point2 Ohm","3-point3":"Point3 Ohm","3-point4":"Point4 Ohm","3-point5":"Point5 Ohm","3-point6":"Point6 Ohm","3-point7":"Point7 Ohm","3-point8":"Point8 Ohm","1-remark-3":"Remark","4-point1":"Point1 Ohm","4-point2":"Point2 Ohm","4-point3":"Point3 Ohm","4-point4":"Point4 Ohm","4-point5":"Point5 Ohm","4-point6":"Point6 Ohm","4-point7":"Point7 Ohm","4-point8":"Point8 Ohm","1-remark-4":"Remark","5-point1":"Point1 Ohm","5-point2":"Point2 Ohm","5-point3":"Point3 Ohm","5-point4":"Point4 Ohm","5-point5":"Point5 Ohm","5-point6":"Point6 Ohm","5-point7":"Point7 Ohm","5-point8":"Point8 Ohm","1-remark-5":"Remark","6-point1":"Point1 Ohm","6-point2":"Point2 Ohm","6-point3":"Point3 Ohm","6-point4":"Point4 Ohm","6-point5":"Point5 Ohm","6-point6":"Point6 Ohm","6-point7":"Point7 Ohm","6-point8":"Point8 Ohm","1-remark-6":"Remark","7-point1":"Point1 Ohm","7-point2":"Point2 Ohm","7-point3":"Point3 Ohm","7-point4":"Point4 Ohm","7-point5":"Point5 Ohm","7-point6":"Point6 Ohm","7-point7":"Point7 Ohm","7-point8":"Point8 Ohm","7-remark-6":"Remark","8-point1":"Point1 Ohm","8-point2":"Point2 Ohm","8-point3":"Point3 Ohm","8-point4":"Point4 Ohm","8-point5":"Point5 Ohm","8-point6":"Point6 Ohm","8-point7":"Point7 Ohm","8-point8":"Point8 Ohm","8-remark-6":"Remark"`;
            if(countPart1 > 0) {
                for (let i=0;i<countPart1;i++) {
                    let count = 9;
                    count = count + i;
                    let count2 = count+1;
                    let str ='"1-equipment-'+count+'": "'+count+'. Equipment",'+
                    '"'+count+'-point1": "Point1 Ohm",'+
                    '"'+count+'-point2": "Point2 Ohm",'+
                    '"'+count+'-point3": "Point3 Ohm",'+
                    '"'+count+'-point4": "Point4 Ohm",'+
                    '"'+count+'-point5": "Point5 Ohm",'+
                    '"'+count+'-point6": "Point6 Ohm",'+
                    '"'+count+'-point7": "Point7 Ohm",'+
                    '"'+count+'-point8": "Point8 Ohm",'+
                    '"'+count+'-remark-'+count2+'": "Remark",';
                    part1 += str;
                }
            }
            
            ENEM_QFR_2604_REL = part1 + `}]`;
            return ENEM_QFR_2604_REL;
}
function ENEM_QFR_1325_UPS(countPart1) { //Dev
    let ENEM_QFR_1325_UPS = ''; //Dev
            let part1 = `[{"notification":"Notification","order":"Order","fl":"FL.","status":"Status","substation":"Substation :","UPS-charger-maker":"UPS/charger maker :","output-voltage":"Out put voltage :","batteries-maker":"Batteries maker :","volts-cell":"Volts / cell :","date":"Date :","service":"Service :","type":"Type :","out-of-current":"Out put current :","cell-type":"Cell type :","number-of-cell":"Number of cell :","header-na-1":"input N/A","sectionOne-remark":"Remark","sectionOne-inputRemark":"Remark","1-1-radio-1":"1.1 Batteries : Check terminal connection Done","1-1-radio-2":"1.1 Batteries : Check anti-corrosive coated all connection Done","1-1-radio-3":"1.1 Batteries : Check liquid level of each cell Done","1-1-radio-4":"1.1 Batteries : Check no cell leak Done","1-1-radio-5":"1.1 Batteries : Refill distilled water in cell Done","1-1-radio-6":"1.1 Batteries : Clean batteries Done","1-2-radio-1":"1.2 UPS / charger : Check cable and earth connection Done","1-2-radio-2":"1.2 UPS / charger : Check no hot spot in cabinet Done","1-2-radio-3":"1.2 UPS / charger : Check no abnormal noise Done","1-2-radio-4":"1.2 UPS / charger : Check indicating lamp and meter Done","1-2-radio-5":"1.2 UPS / charger : Clean heat sink and cabinet Done","1-2-radio-6":"1.2 UPS / charger : Test remote alarm relay Done","1-2-radio-7":"1.2 UPS / charger : Test DC earth fault alarm Done","1-3-radio-1":"1.3 DC. distribution board : Clean board and bus bar Done","1-3-radio-2":"1.3 DC. distribution board : Check bus bar connection Done","1-3-radio-3":"1.3 DC. distribution board : Check cable connection Done","1-3-radio-4":"1.3 DC. distribution board : Check DC. earth fault alarm relay Done","1-3-radio-5":"1.3 DC. distribution board : Check indicating lamp and meter Done","1-3-radio-6":"1.3 DC. distribution board : Circuit modification Done","header-na-2":"input N/A","sectionTwo-remark":"Remark","sectionTwo-inputRemark":"Remark","2-1-input-1":"Vdc (Volts) On trickle charge","2-1-input-2":"Adc (Amps) On trickle charge","2-2-input-1":"Vdc (Volts) On boost charge","2-2-input-2":"Adc (Amps) On boost charge","2-3-input-1":"Vdc (Volts) On float charge","2-3-input-2":"Adc (Amps) On float charge","header-na-3":"input N/A","sectionThree-remark":"Remark","sectionThree-inputRemark":"Remark","3-input-1":"Start time (boost charge/discharge test) Hour","3-input-2":"Total time Hour","3-input-3":"Capacity Ah.","3-input-4":"Finish time Hour","3-input-5":"(Boost/Dicharge) current A.","header-na-4":"input N/A","sectionFour-remark":"Remark","sectionFour-inputRemark":"Remark","4-radio-1":"Testing equipment to use Bridge tester","4-radio-2":"Testing equipment to use Earth tester","4-radio-3":"Check cable and connection Done","4-input-1":"Check AC/DC distribution board earthing resistance Ohms","4-input-2":"Check rectifier unit earthing resistance Ohms","header-na-5":"input N/A","sectionFive-remark":"Remark","sectionFive-inputRemark":"Remark","5-input-1":"Testing equipment to use","5-input-2":"Battery total voltage before (boost charge / discharge test) VDC.","5-input-3":"Battery total voltage after (boost charge / discharge tested) VDC.","sectionSix":"6 BATTERY CELL VOLTAGE RECORD","headingSix":"6 BATTERY CELL VOLTAGE RECORD","header-na-6":"input N/A","sectionSix-remark":"Remark","sectionSix-inputRemark":"Remark","6-1-input-a":"1. A*","6-1-input-b":"1. B*","6-1-input-c":"1. C*","6-2-input-a":"2. A*","6-2-input-b":"2. B*","6-2-input-c":"2. C*","6-3-input-a":"3. A*","6-3-input-b":"3. B*","6-3-input-c":"3. C*","6-4-input-a":"4. A*","6-4-input-b":"4. B*","6-4-input-c":"4. C*","6-5-input-a":"5. A*","6-5-input-b":"5. B*","6-5-input-c":"5. C*",`;
            let part2 = `"6-input-1":"Average Voltage BEFORE Volt.","6-input-2":"Average Voltage AFTER Volt.","6-input-3":"Room Temperature Deg.C.","6-radio-1":"1. All Voltage/Cell before boost charge > 1.0 Volt Yes","6-radio-2":"1. All Voltage/Cell before boost charge > 1.0 Volt No","6-radio-3":"2. All Voltage/Cell after boost charge > Voltage/Cell before boost charge Yes","6-radio-4":"2. All Voltage/Cell after boost charge > Voltage/Cell before boost charge No"}]`;
            if(countPart1 > 0) {
                for (let i=0;i<countPart1;i++) {
                    let count = 6;
                    count = count + i;
                    let str ='"6-'+count+'-input-a": "5. A*",'+
                    '"6-'+count+'-input-b": "5. B*",'+
                    '"6-'+count+'-input-c": "5. C*",';
                    part1 += str;
                }
            }
            
            ENEM_QFR_1325_UPS = part1 + part2;
            return ENEM_QFR_1325_UPS;
}
function ENIM_QFR_743(countPart1) { //Dev
    let ENIM_QFR_743 = ''; //Dev
            let part1 = `[{"notification":"Notification","order":"Order","fl":"FL.","status":"Status","service":"Service:","area":"Area:","analyzer":"Analyzer Type:","manufacturer":"Manufacturer/Model:","range":"Range:","ph-buffer-solution-1":"pH Buffer Solution:","lot-no-1":"Lot No.:","expiration-date-1":"Expiration Date:","ph-buffer-solution-2":"pH Buffer Solution:","lot-no-2":"Lot No.:","expiration-date-2":"Expiration Date:","ph-buffer-solution-3":"pH Buffer Solution:","lot-no-3":"Lot No.:","expiration-date-3":"Expiration Date:","reference":"Reference portable pH meter tag number:","header-na-1":"input N/A","sectionOne-remark":"Remark","sectionOne-inputRemark":"Remark","1-checkbox-1":"Inform panel man","1-checkbox-2":"Inhibit alarm at DCS","1-checkbox-3":"Maintenance Override Switch","1-checkbox-4":"Force signal at PLC","1-checkbox-5":"Hold signal at transmitter","1-checkbox-6":"Manual mode on DCS","2-input-1":"Analyzer Reading: pH","2-input-2":"Sample Temp.: °C","2-input-3":"Sensor Slope: %","2-input-4":"Zero offset: mV","3-checkbox-1":"Clean","3-checkbox-2":"Check Equipment","3-checkbox-3":"Leak Test","4-checkbox-1":"Clean","4-checkbox-2":"Replace","5-checkbox-1":"Clean","5-checkbox-2":"Check","6-checkbox-1":"Fill KCL","6-checkbox-2":"Clean","6-checkbox-3":"Replace","7-radio-1":"Clean","7-radio-2":"Replace","8-input-1":"Inlet pressure: Bar","8-input-2":"Onlet pressure: Bar","9-input-1":"Fast loop flow:","9-input-2":"Inlet sample flow:","10-input-1":"Standard Solution: pH Buffer","10-input-2":"Before Calibration: Analyzer Reading","10-input-3":"mV","10-input-4":"Error","10-input-5":"After Calibration Analyzer Reading","10-input-6":"mV","10-input-7":"Error","10-input-8":"Control Limit",`;
            let part2 = `"11-input-1":"pH","12-input-1":"Analyzer Reading: pH","12-input-2":"Sample Temp.: °C","12-input-3":"Sensor Slope: %","12-input-4":"Zero offset: mV","12-radio-1":"Analyzer Status Pass","12-radio-2":"Analyzer Status Fail","12-input-5":"Action:","13-radio-1":"Done","14-radio-1":"Done","15-radio-1":"Done","remark":"Remark:"}]`;
            if(countPart1 > 0) {
                for (let i=0;i<countPart1;i++) {
                    let count = 2;
                    count = count + i;
                    let str ='"10-input-1-'+count+'": "Standard Solution: pH Buffer",'+
                    '"10-input-2-'+count+'": "Before Calibration: Analyzer Reading",'+
                    '"10-input-3-'+count+'": "mV",'+
                    '"10-input-4-'+count+'": "Error",'+
                    '"10-input-5-'+count+'": "After Calibration Analyzer Reading",'+
                    '"10-input-6-'+count+'": "mV",'+
                    '"10-input-7-'+count+'": "Error",'+
                    '"10-input-8-'+count+'": "Control Limit",';
                    part1 += str;
                }
            }
            
            ENIM_QFR_743 = part1 + part2;
            return ENIM_QFR_743;
}
function ENEM_QFR_9008_GNR(countPart1, countPart2, countPart3) { //Dev
    let ENEM_QFR_9008_GNR = ''; //Dev
            let part1 = `[{"notification":"Notification","order":"Order","fl":"FL","status":"Status","date":"Date:","substation":"Substation:","header-na-1":"input N/A","sectionOne-remark":"Remark","sectionOne-inputRemark":"Remark","a-1-radio-1":"1. SWB & HV. Room ปกติ","a-1-radio-2":"1. SWB & HV. Room ต้องแก้ไข","a-1-input-1":"1. SWB & HV. Room Notification No. ถ้ามีแก้ไข","a-2-radio-1":"2. SWB & LV. Room ปกติ","a-2-radio-2":"2. SWB & LV. Room ต้องแก้ไข","a-2-input-1":"2. SWB & LV. Room Notification No. ถ้ามีแก้ไข","a-3-radio-1":"3. UPS / Charger ปกติ","a-3-radio-2":"3. UPS / Charger ต้องแก้ไข","a-3-input-1":"3. UPS / Charger Notification No. ถ้ามีแก้ไข","a-4-radio-1":"4. แบตเตอรี่และห้องแบตเตอรี่ ปกติ","a-4-radio-2":"4. แบตเตอรี่และห้องแบตเตอรี่ ต้องแก้ไข","a-4-input-1":"4. แบตเตอรี่และห้องแบตเตอรี่ Notification No. ถ้ามีแก้ไข","a-5-radio-1":"5. ระบบน้ำล้างตาฉุกเฉินในห้องแบตเตอรี่ ปกติ","a-5-radio-2":"5. ระบบน้ำล้างตาฉุกเฉินในห้องแบตเตอรี่ ต้องแก้ไข","a-5-input-1":"5. ระบบน้ำล้างตาฉุกเฉินในห้องแบตเตอรี่ Notification No. ถ้ามีแก้ไข","a-6-radio-1":"6. เครื่องปรับอากาศ ปกติ","a-6-radio-2":"6. เครื่องปรับอากาศ ต้องแก้ไข","a-6-input-1":"6. เครื่องปรับอากาศ Notification No. ถ้ามีแก้ไข","a-7-radio-1":"7. ลานหม้อแปลงปกติ","a-7-radio-2":"7. ลานหม้อแปลงต้องแก้ไข","a-7-input-1":"7. ลานหม้อแปลงNotification No.","a-8-radio-1":"8. ไฟฟ้าแสงสว่าง, Emergency lighting, Exit Lighting ปกติ","a-8-radio-2":"8. ไฟฟ้าแสงสว่าง, Emergency lighting, Exit Lighting ต้องแก้ไข","a-8-input-1":"8. ไฟฟ้าแสงสว่าง, Emergency lighting, Exit Lighting Notification No. ถ้ามีแก้ไข","a-9-radio-1":"9. ประตู Sub ทั้งหมดล็อคหรือไม่ ปกติ","a-9-radio-2":"9. ประตู Sub ทั้งหมดล็อคหรือไม่ ต้องแก้ไข","a-9-input-1":"9. ประตู Sub ทั้งหมดล็อคหรือไม่ Notification No. ถ้ามีแก้ไข","a-10-radio-1":"10. ทดสอบ Indicator lamp ที่ Annunciator ปกติ","a-10-radio-2":"10. ทดสอบ Indicator lamp ที่ Annunciator ต้องแก้ไข","a-10-input-1":"10. ทดสอบ Indicator lamp ที่ Annunciator Notification No. ถ้ามีแก้ไข","a-11-radio-1":"11. ตรวจสอบความชื้นภายในตู้ Electrical Panel (กรุณาระบุ Tag ของตู้ถ้าพบว่าไม่ปกติ) ปกติ","a-11-radio-2":"11. ตรวจสอบความชื้นภายในตู้ Electrical Panel (กรุณาระบุ Tag ของตู้ถ้าพบว่าไม่ปกติ) ต้องแก้ไข","a-11-input-1":"11. ตรวจสอบความชื้นภายในตู้ Electrical Panel (กรุณาระบุ Tag ของตู้ถ้าพบว่าไม่ปกติ) Notification No. ถ้ามีแก้ไข","header-na-2":"input N/A","sectiontwo-remark":"Remark","sectiontwo-inputRemark":"Remark","b-1-radio-1":"1. ป้ายเตือนอันตราย (Danger Signs) ปกติ","b-1-radio-2":"1. ป้ายเตือนอันตราย (Danger Signs) ต้องแก้ไข","b-1-input-1":"1. ป้ายเตือนอันตราย (Danger Signs) Notification No. ถ้ามีแก้ไข","b-2-radio-1":"2. ป้าย First Aid / Electrical Shock Treatment Directions ปกติ","b-2-radio-2":"2. ป้าย First Aid / Electrical Shock Treatment Directions ต้องแก้ไข","b-2-input-1":"2. ป้าย First Aid / Electrical Shock Treatment Directions Notification No. ถ้ามีแก้ไข","b-3-radio-1":"3. Substation Single Line Diagram (Latest update revision) ปกติ","b-3-radio-2":"3. Substation Single Line Diagram (Latest update revision) ต้องแก้ไข","b-3-input-1":"3. Substation Single Line Diagram (Latest update revision) Notification No. ถ้ามีแก้ไข","b-4-radio-1":"4. Log Book ประจำ Sub และ MMBO Log Book ปกติ","b-4-radio-2":"4. Log Book ประจำ Sub และ MMBO Log Book ต้องแก้ไข","b-4-input-1":"4. Log Book ประจำ Sub และ MMBO Log Book Notification No. ถ้ามีแก้ไข","b-5-radio-1":"5. Telephone and telephone Number List ปกติ","b-5-radio-2":"5. Telephone and telephone Number List ต้องแก้ไข","b-5-input-1":"5. Telephone and telephone Number List Notification No. ถ้ามีแก้ไข","b-6-radio-1":"6. ประตู ที่ล็อคประตู และ Panic bars (ชำรุดหรือไม่) ปกติ","b-6-radio-2":"6. ประตู ที่ล็อคประตู และ Panic bars (ชำรุดหรือไม่) ต้องแก้ไข","b-6-input-1":"6. ประตู ที่ล็อคประตู และ Panic bars (ชำรุดหรือไม่) Notification No. ถ้ามีแก้ไข","b-7-radio-1":"7. Bar Earth, Cable Earth under Substation ปกติ","b-7-radio-2":"7. Bar Earth, Cable Earth under Substation ต้องแก้ไข","b-7-input-1":"7. Bar Earth, Cable Earth under Substation Notification No. ถ้ามีแก้ไข","header-na-3":"input N/A","sectionThree-remark":"Remark","sectionThree-inputRemark":"Remark","c-1-radio-1":"1. Fire Siren Control Panel ปกติ","c-1-radio-2":"1. Fire Siren Control Panel ต้องแก้ไข","c-1-input-1":"1. Fire Siren Control Panel Notification No. ถ้ามีแก้ไข","c-2-radio-1":"2. Indicating Lamp ปกติ","c-2-radio-2":"2. Indicating Lamp ต้องแก้ไข","c-2-input-1":"2. Indicating Lamp Notification No. ถ้ามีแก้ไข","header-na-4":"input N/A","sectionFour-remark":"Remark","sectionFour-inputRemark":"Remark","d-1-radio-1":"1. ตรวจสอบการทำงานของพัดลมในห้องแบตเตอรี่ว่าทำงานปกติหรือไม่ ปกติ","d-1-radio-2":"1. ตรวจสอบการทำงานของพัดลมในห้องแบตเตอรี่ว่าทำงานปกติหรือไม่ ต้องแก้ไข","d-1-input-1":"1. ตรวจสอบการทำงานของพัดลมในห้องแบตเตอรี่ว่าทำงานปกติหรือไม่ Notification No. ถ้ามีแก้ไข","27-input-2":"Remark","header-na-5":"input N/A","sectionFive-remark":"Remark","sectionFive-inputRemark":"Remark","e-1-input-1":"1. Tag No.","e-1-input-2":"1. Distribution Board No.","e-1-input-3":"1. System Voltage","e-1-input-4":"1. Bus Voltage เทียบกับ GND ขั้วบวก","e-1-input-5":"1. Bus Voltage เทียบกับ GND % E","e-1-input-6":"1. Bus Voltage เทียบกับ GND ขั้วลบ","e-1-input-7":"1. Bus Voltage เทียบกับ GND % E","e-1-input-8":"1. Error Range","e-1-input-9":"1. Remark","e-2-input-1":"2. Tag No.","e-2-input-2":"2. Distribution Board No.","e-2-input-3":"2. System Voltage","e-2-input-4":"2. Bus Voltage เทียบกับ GND ขั้วบวก","e-2-input-5":"2. Bus Voltage เทียบกับ GND % E","e-2-input-6":"2. Bus Voltage เทียบกับ GND ขั้วลบ","e-2-input-7":"2. Bus Voltage เทียบกับ GND % E","e-2-input-8":"2. Error Range","e-2-input-9":"2. Remark","e-3-input-1":"3. Tag No.","e-3-input-2":"3. Distribution Board No.","e-3-input-3":"3. System Voltage","e-3-input-4":"3. Bus Voltage เทียบกับ GND ขั้วบวก","e-3-input-5":"3. Bus Voltage เทียบกับ GND % E","e-3-input-6":"3. Bus Voltage เทียบกับ GND ขั้วลบ","e-3-input-7":"3. Bus Voltage เทียบกับ GND % E","e-3-input-8":"3. Error Range","e-3-input-9":"3. Remark","e-4-input-1":"4. Tag No.","e-4-input-2":"4. Distribution Board No.","e-4-input-3":"4. System Voltage","e-4-input-4":"4. Bus Voltage เทียบกับ GND ขั้วบวก","e-4-input-5":"4. Bus Voltage เทียบกับ GND % E","e-4-input-6":"4. Bus Voltage เทียบกับ GND ขั้วลบ","e-4-input-7":"4. Bus Voltage เทียบกับ GND % E","e-4-input-8":"4. Error Range","e-4-input-9":"4. Remark","e-5-input-1":"5. Tag No.","e-5-input-2":"5. Distribution Board No.","e-5-input-3":"5. System Voltage","e-5-input-4":"5. Bus Voltage เทียบกับ GND ขั้วบวก","e-5-input-5":"5. Bus Voltage เทียบกับ GND % E","e-5-input-6":"5. Bus Voltage เทียบกับ GND ขั้วลบ","e-5-input-7":"5. Bus Voltage เทียบกับ GND % E","e-5-input-8":"5. Error Range","e-5-input-9":"5. Remark",`;
            let part2 = `"header-na-6":"input N/A","sectionSix-remark":"Remark","sectionSix-inputRemark":"Remark","f-1-input-1":"1. Tag No.","f-1-input-2":"1. Distribution Board No.","f-1-input-3":"1. System Voltage","f-1-input-4":"1. Bus Voltage เทียบกับ GND ขั้วบวก","f-1-input-5":"1. Bus Voltage เทียบกับ GND % E","f-1-input-6":"1. Bus Voltage เทียบกับ GND ขั้วลบ","f-1-input-7":"1. Bus Voltage เทียบกับ GND % E","f-1-input-8":"1. Error Range","f-1-input-9":"1. Remark","f-2-input-1":"2. Tag No.","f-2-input-2":"2. Distribution Board No.","f-2-input-3":"2. System Voltage","f-2-input-4":"2. Bus Voltage เทียบกับ GND ขั้วบวก","f-2-input-5":"2. Bus Voltage เทียบกับ GND % E","f-2-input-6":"2. Bus Voltage เทียบกับ GND ขั้วลบ","f-2-input-7":"2. Bus Voltage เทียบกับ GND % E","f-2-input-8":"2. Error Range","f-2-input-9":"2. Remark","f-3-input-1":"3. Tag No.","f-3-input-2":"3. Distribution Board No.","f-3-input-3":"3. System Voltage","f-3-input-4":"3. Bus Voltage เทียบกับ GND ขั้วบวก","f-3-input-5":"3. Bus Voltage เทียบกับ GND % E","f-3-input-6":"3. Bus Voltage เทียบกับ GND ขั้วลบ","f-3-input-7":"3. Bus Voltage เทียบกับ GND % E","f-3-input-8":"3. Error Range","f-3-input-9":"3. Remark","f-4-input-1":"4. Tag No.","f-4-input-2":"4. Distribution Board No.","f-4-input-3":"4. System Voltage","f-4-input-4":"4. Bus Voltage เทียบกับ GND ขั้วบวก","f-4-input-5":"4. Bus Voltage เทียบกับ GND % E","f-4-input-6":"4. Bus Voltage เทียบกับ GND ขั้วลบ","f-4-input-7":"4. Bus Voltage เทียบกับ GND % E","f-4-input-8":"4. Error Range","f-4-input-9":"4. Remark","f-5-input-1":"5. Tag No.","f-5-input-2":"5. Distribution Board No.","f-5-input-3":"5. System Voltage","f-5-input-4":"5. Bus Voltage เทียบกับ GND ขั้วบวก","f-5-input-5":"5. Bus Voltage เทียบกับ GND % E","f-5-input-6":"5. Bus Voltage เทียบกับ GND ขั้วลบ","f-5-input-7":"5. Bus Voltage เทียบกับ GND % E","f-5-input-8":"5. Error Range","f-5-input-9":"5. Remark",`;
            
            let part3 = `"header-na-7":"input N/A","sectionSeven-remark":"Remark","sectionSeven-inputRemark":"Remark","g-1-input-1":"1. Tag No.","g-1-input-2":"1. Distribution Board No.","g-1-input-3":"1. System Voltage","g-1-input-4":"1. Bus Voltage เทียบกับ GND ขั้วบวก","g-1-input-5":"1. Bus Voltage เทียบกับ GND % E","g-1-input-6":"1. Bus Voltage เทียบกับ GND ขั้วลบ","g-1-input-7":"1. Bus Voltage เทียบกับ GND % E","g-1-input-8":"1. Error Range","g-1-input-9":"1. Remark","g-2-input-1":"2. Tag No.","g-2-input-2":"2. Distribution Board No.","g-2-input-3":"2. System Voltage","g-2-input-4":"2. Bus Voltage เทียบกับ GND ขั้วบวก","g-2-input-5":"2. Bus Voltage เทียบกับ GND % E","g-2-input-6":"2. Bus Voltage เทียบกับ GND ขั้วลบ","g-2-input-7":"2. Bus Voltage เทียบกับ GND % E","g-2-input-8":"2. Error Range","g-2-input-9":"2. Remark","g-3-input-1":"3. Tag No.","g-3-input-2":"3. Distribution Board No.","g-3-input-3":"3. System Voltage","g-3-input-4":"3. Bus Voltage เทียบกับ GND ขั้วบวก","g-3-input-5":"3. Bus Voltage เทียบกับ GND % E","g-3-input-6":"3. Bus Voltage เทียบกับ GND ขั้วลบ","g-3-input-7":"3. Bus Voltage เทียบกับ GND % E","g-3-input-8":"3. Error Range","g-3-input-9":"3. Remark","g-4-input-1":"4. Tag No.","g-4-input-2":"4. Distribution Board No.","g-4-input-3":"4. System Voltage","g-4-input-4":"4. Bus Voltage เทียบกับ GND ขั้วบวก","g-4-input-5":"4. Bus Voltage เทียบกับ GND % E","g-4-input-6":"4. Bus Voltage เทียบกับ GND ขั้วลบ","g-4-input-7":"4. Bus Voltage เทียบกับ GND % E","g-4-input-8":"4. Error Range","g-4-input-9":"4. Remark","g-5-input-1":"5. Tag No.","g-5-input-2":"5. Distribution Board No.","g-5-input-3":"5. System Voltage","g-5-input-4":"5. Bus Voltage เทียบกับ GND ขั้วบวก","g-5-input-5":"5. Bus Voltage เทียบกับ GND % E","g-5-input-6":"5. Bus Voltage เทียบกับ GND ขั้วลบ","g-5-input-7":"5. Bus Voltage เทียบกับ GND % E","g-5-input-8":"5. Error Range","g-5-input-9":"5. Remark"`;
            if(countPart1 > 0) {
                for (let i=0;i<countPart1;i++) {
                    let count = 6;
                    count = count + i;
                    let str ='"e-'+count+'-input-1": "'+count+'. Tag No.",'+
                    '"e-'+count+'-input-2": "'+count+'. Distribution Board No.",'+
                    '"e-'+count+'-input-3": "'+count+'. System Voltage",'+'\n'+
                    '"e-'+count+'-input-4": "'+count+'. Bus Voltage เทียบกับ GND ขั้วบวก",'+
                    '"e-'+count+'-input-5": "'+count+'. Bus Voltage เทียบกับ GND % E",'+
                    '"e-'+count+'-input-6": "'+count+'. Bus Voltage เทียบกับ GND ขั้วลบ",'+
                    '"e-'+count+'-input-7": "'+count+'. Bus Voltage เทียบกับ GND % E",'+
                    '"e-'+count+'-input-8": "'+count+'. Error Range",'+
                    '"e-'+count+'-input-9": "'+count+'. Remark",';
                    part1 += str;
                }
            }
            if(countPart2 > 0) {
                for (let i=0;i<countPart2;i++) {
                    let count = 6;
                    count = count + i;
                    let str ='"f-'+count+'-input-1": "'+count+'. Tag No.",'+
                    '"f-'+count+'-input-2": "'+count+'. Distribution Board No.",'+
                    '"f-'+count+'-input-3": "'+count+'. System Voltage",'+'\n'+
                    '"f-'+count+'-input-4": "'+count+'. Bus Voltage เทียบกับ GND ขั้วบวก",'+
                    '"f-'+count+'-input-5": "'+count+'. Bus Voltage เทียบกับ GND % E",'+
                    '"f-'+count+'-input-6": "'+count+'. Bus Voltage เทียบกับ GND ขั้วลบ",'+
                    '"f-'+count+'-input-7": "'+count+'. Bus Voltage เทียบกับ GND % E",'+
                    '"f-'+count+'-input-8": "'+count+'. Error Range",'+
                    '"f-'+count+'-input-9": "'+count+'. Remark",';
                    part2 += str;
                }
            }
            if(countPart3 > 0) {
                for (let i=0;i<countPart3;i++) {
                    let count = 6;
                    count = count + i;
                    let str ='"g-'+count+'-input-1": "'+count+'. Tag No.",'+
                    '"g-'+count+'-input-2": "'+count+'. Distribution Board No.",'+
                    '"g-'+count+'-input-3": "'+count+'. System Voltage",'+
                    '"g-'+count+'-input-4": "'+count+'. Bus Voltage เทียบกับ GND ขั้วบวก",'+
                    '"g-'+count+'-input-5": "'+count+'. Bus Voltage เทียบกับ GND % E",'+
                    '"g-'+count+'-input-6": "'+count+'. Bus Voltage เทียบกับ GND ขั้วลบ",'+
                    '"g-'+count+'-input-7": "'+count+'. Bus Voltage เทียบกับ GND % E",'+
                    '"g-'+count+'-input-8": "'+count+'. Error Range",'+
                    '"g-'+count+'-input-9": "'+count+'. Remark",';
                    part3 += str;
                }
            }
            
            ENEM_QFR_9008_GNR = part1 + part2 + part3 + `}]`;
            return ENEM_QFR_9008_GNR;
}
function ENEM_QFR_9003_GNR(countPart1, countPart2, countPart3,countPart4, countPart5, countPart6) { //Dev
    let ENEM_QFR_9003_GNR = ''; //Dev
            let part1 = `[{"notification":"Notification","order":"Order","fl":"FL.","status":"Status","substation":"Substation:","date":"วันที่:","time":"เวลา:","header-na-1":"input N/A","sectionOne-remark":"Remark","sectionOne-inputRemark":"Remark","a-1-radio-1":"1. สภาพทั่วไปของ Substation number มองเห็นชัด สีไม่ซีด ปกติ","a-1-radio-2":"1. สภาพทั่วไปของ Substation number มองเห็นชัด สีไม่ซีด ต้องแก้ไข","a-1-input-1":"1. สภาพทั่วไปของ Substation number มองเห็นชัด สีไม่ซีด ถ้ามีแก้ไข","a-2-radio-1":"2. Danger sign มีสภาพสมบูรณ์ ไม่หลุดร่วง ปกติ","a-2-radio-2":"2. Danger sign มีสภาพสมบูรณ์ ไม่หลุดร่วง ต้องแก้ไข","a-2-input-1":"2. Danger sign มีสภาพสมบูรณ์ ไม่หลุดร่วง ถ้ามีแก้ไข","a-3-radio-1":"3. Single line diagram ชัดเจน ไม่ฉีกขาด และ Lastest updated revision ปกติ","a-3-radio-2":"3. Single line diagram ชัดเจน ไม่ฉีกขาด และ Lastest updated revision ต้องแก้ไข","a-3-input-1":"3. Single line diagram ชัดเจน ไม่ฉีกขาด และ Lastest updated revision ถ้ามีแก้ไข","a-4-radio-1":"4. เครื่องดับเพลิงและป้ายบอกวิธีการใช้ มีสภาพดีวางในที่กำหนด ปกติ","a-4-radio-2":"4. เครื่องดับเพลิงและป้ายบอกวิธีการใช้ มีสภาพดีวางในที่กำหนด ต้องแก้ไข","a-4-input-1":"4. เครื่องดับเพลิงและป้ายบอกวิธีการใช้ มีสภาพดีวางในที่กำหนด ถ้ามีแก้ไข","a-5-radio-1":"5. ประตู sub กุญแจ และ panic bar สภาพสมบูรณ์ ยึดติดแน่น ปกติ","a-5-radio-2":"5. ประตู sub กุญแจ และ panic bar สภาพสมบูรณ์ ยึดติดแน่น ต้องแก้ไข","a-5-input-1":"5. ประตู sub กุญแจ และ panic bar สภาพสมบูรณ์ ยึดติดแน่น ถ้ามีแก้ไข","a-6-radio-1":"6. ป้าย first aid มีสภาพสมบูรณ์ สีไม่ซีด หรือ หลุดร่วง ปกติ","a-6-radio-2":"6. ป้าย first aid มีสภาพสมบูรณ์ สีไม่ซีด หรือ หลุดร่วง ต้องแก้ไข","a-6-input-1":"6. ป้าย first aid มีสภาพสมบูรณ์ สีไม่ซีด หรือ หลุดร่วง ถ้ามีแก้ไข","a-7-radio-1":"7. Log book มีอยู่ประจำที่ ปกติ","a-7-radio-2":"7. Log book มีอยู่ประจำที่ ต้องแก้ไข","a-7-input-1":"7. Log book มีอยู่ประจำที่ ถ้ามีแก้ไข","a-8-radio-1":"8. โทรศัพท์ใช้งานได้มีเสียงชัดเจนและมีรายการโทรศัพท์อยู่คู่กัน ปกติ","a-8-radio-2":"8. โทรศัพท์ใช้งานได้มีเสียงชัดเจนและมีรายการโทรศัพท์อยู่คู่กัน ต้องแก้ไข","a-8-input-1":"8. โทรศัพท์ใช้งานได้มีเสียงชัดเจนและมีรายการโทรศัพท์อยู่คู่กัน ถ้ามีแก้ไข","a-9-radio-1":"9. ความเรียบร้อยภายในตู้เก็บแบบ ปกติ","a-9-radio-2":"9. ความเรียบร้อยภายในตู้เก็บแบบ ต้องแก้ไข","a-9-input-1":"9. ความเรียบร้อยภายในตู้เก็บแบบ ถ้ามีแก้ไข","a-10-radio-1":"10. Fuse ในตู้เก็บแบบมีจำนวนเพียงพอกับการใช้งานปกติ ปกติ","a-10-radio-2":"10. Fuse ในตู้เก็บแบบมีจำนวนเพียงพอกับการใช้งานปกติ ต้องแก้ไข","a-10-input-1":"10. Fuse ในตู้เก็บแบบมีจำนวนเพียงพอกับการใช้งานปกติ ถ้ามีแก้ไข","a-11-radio-1":"11. ความเรียบร้อยภายในตู้เก็บกุญแจ ตู้ต้องล็อคกุญแจ ปกติ","a-11-radio-2":"11. ความเรียบร้อยภายในตู้เก็บกุญแจ ตู้ต้องล็อคกุญแจ ต้องแก้ไข","a-11-input-1":"11. ความเรียบร้อยภายในตู้เก็บกุญแจ ตู้ต้องล็อคกุญแจ ถ้ามีแก้ไข","a-12-radio-1":"12. ความสะอาดและความเรียบร้อยใน substation ปกติ","a-12-radio-2":"12. ความสะอาดและความเรียบร้อยใน substation ต้องแก้ไข","a-12-input-1":"12. ความสะอาดและความเรียบร้อยใน substation ถ้ามีแก้ไข","a-13-radio-1":"13. แผ่นยางรองพื้นอยู่ในสภาพสมบูรณ์ ปกติ","a-13-radio-2":"13. แผ่นยางรองพื้นอยู่ในสภาพสมบูรณ์ ต้องแก้ไข","a-13-input-1":"13. แผ่นยางรองพื้นอยู่ในสภาพสมบูรณ์ ถ้ามีแก้ไข","a-14-radio-1":"14. ความเรียบร้อยของ special tool และ earthing equipment ปกติ","a-14-radio-2":"14. ความเรียบร้อยของ special tool และ earthing equipment ต้องแก้ไข","a-14-input-1":"14. ความเรียบร้อยของ special tool และ earthing equipment ถ้ามีแก้ไข","a-15-radio-1":"15. Normal และ essential lighting ไม่ขาด ไม่กระพริบ ปกติ","a-15-radio-2":"15. Normal และ essential lighting ไม่ขาด ไม่กระพริบ ต้องแก้ไข","a-15-input-1":"15. Normal และ essential lighting ไม่ขาด ไม่กระพริบ ถ้ามีแก้ไข","a-16-radio-1":"16. ตรวจสอบระบบ lighting และ ไฟทางออก ไม่ขาด ไม่กระพริบ ปกติ","a-16-radio-2":"16. ตรวจสอบระบบ lighting และ ไฟทางออก ไม่ขาด ไม่กระพริบ ต้องแก้ไข","a-16-input-1":"16. ตรวจสอบระบบ lighting และ ไฟทางออก ไม่ขาด ไม่กระพริบ ถ้ามีแก้ไข","a-17-radio-1":"17. ทดสอบระบบ Exit Lighting และเช็คสภาพแบตเตอรี่ ปกติ","a-17-radio-2":"17. ทดสอบระบบ Exit Lighting และเช็คสภาพแบตเตอรี่ ต้องแก้ไข","a-17-input-1":"17. ทดสอบระบบ Exit Lighting และเช็คสภาพแบตเตอรี่ ถ้ามีแก้ไข","a-18-radio-1":"18.1 Annunciator และ control panel ปกติ","a-18-radio-2":"18.1 Annunciator และ control panel ต้องแก้ไข","a-18-input-1":"18.1 Annunciator และ control panel ถ้ามีแก้ไข","a-18-radio-4":"18.2 HV./LV. switchgear panel ปกติ","a-18-radio-5":"18.2 HV./LV. switchgear panel ต้องแก้ไข","a-18-input-2":"18.2 HV./LV. switchgear panel ถ้ามีแก้ไข","a-18-radio-7":"18.3 UPS/Charger/Heater panel ปกติ","a-18-radio-8":"18.3 UPS/Charger/Heater panel ต้องแก้ไข","a-18-input-3":"18.3 UPS/Charger/Heater panel ถ้ามีแก้ไข","a-18-radio-10":"18.4 OLTC/distribution board ปกติ","a-18-radio-11":"18.4 OLTC/distribution board ต้องแก้ไข","a-18-input-4":"18.4 OLTC/distribution board ถ้ามีแก้ไข","a-19-radio-1":"19. HV / LV switchboard ไม่มีเสียงหรือร่องรอยผิดปกติ ปกติ","a-19-radio-2":"19. HV / LV switchboard ไม่มีเสียงหรือร่องรอยผิดปกติ ต้องแก้ไข","a-19-input-1":"19. HV / LV switchboard ไม่มีเสียงหรือร่องรอยผิดปกติ ถ้ามีแก้ไข","a-20-radio-1":"20. UPS, Charger, Battery ไม่มีเสียงหรือร่องรอยผิดปกติ ปกติ","a-20-radio-2":"20. UPS, Charger, Battery ไม่มีเสียงหรือร่องรอยผิดปกติ ต้องแก้ไข","a-20-input-1":"20. UPS, Charger, Battery ไม่มีเสียงหรือร่องรอยผิดปกติ ถ้ามีแก้ไข","a-21-radio-1":"21. ตู้ I/EE, I/E ไม่มีเสียงหรือร่องรอยผิดปกติ ปกติ","a-21-radio-2":"21. ตู้ I/EE, I/E ไม่มีเสียงหรือร่องรอยผิดปกติ ต้องแก้ไข","a-21-input-1":"21. ตู้ I/EE, I/E ไม่มีเสียงหรือร่องรอยผิดปกติ ถ้ามีแก้ไข","a-22-radio-1":"22. Air-conditioner ไม่มีเสียงหรือร่องรอยผิดปกติ ปกติ","a-22-radio-2":"22. Air-conditioner ไม่มีเสียงหรือร่องรอยผิดปกติ ต้องแก้ไข","a-22-input-1":"22. Air-conditioner ไม่มีเสียงหรือร่องรอยผิดปกติ ถ้ามีแก้ไข","a-23-radio-1":"23. อุณหภูมิใน sub อยู่ในระดับปกติ ปกติ","a-23-radio-2":"23. อุณหภูมิใน sub อยู่ในระดับปกติ ต้องแก้ไข","a-23-input-1":"23. อุณหภูมิใน sub อยู่ในระดับปกติ ถ้ามีแก้ไข","a-24-radio-1":"24. ที่ล้างตาในห้อง battery อยู่ในสภาพสมบูรณ์พร้อมใช้งาน ปกติ","a-24-radio-2":"24. ที่ล้างตาในห้อง battery อยู่ในสภาพสมบูรณ์พร้อมใช้งาน ต้องแก้ไข","a-24-input-1":"24. ที่ล้างตาในห้อง battery อยู่ในสภาพสมบูรณ์พร้อมใช้งาน ถ้ามีแก้ไข","a-25-radio-1":"25. พัดลมระบายอากาศในห้อง battery ทำงานปกติ ปกติ","a-25-radio-2":"25. พัดลมระบายอากาศในห้อง battery ทำงานปกติ ต้องแก้ไข","a-25-input-1":"25. พัดลมระบายอากาศในห้อง battery ทำงานปกติ ถ้ามีแก้ไข","a-26-radio-1":"26. ประตูลูกกรงใต้ sub ต้องล็อคกุญแจ ปกติ","a-26-radio-2":"26. ประตูลูกกรงใต้ sub ต้องล็อคกุญแจ ต้องแก้ไข","a-26-input-1":"26. ประตูลูกกรงใต้ sub ต้องล็อคกุญแจ ถ้ามีแก้ไข","a-27-radio-1":"27. Earth connection (ที่มองเห็น) ไม่หลุดหลวม ปกติ","a-27-radio-2":"27. Earth connection (ที่มองเห็น) ไม่หลุดหลวม ต้องแก้ไข","a-27-input-1":"27. Earth connection (ที่มองเห็น) ไม่หลุดหลวม ถ้ามีแก้ไข","a-28-radio-1":"28. Socket outlet อยู่ในสภาพปกติ ปกติ","a-28-radio-2":"28. Socket outlet อยู่ในสภาพปกติ ต้องแก้ไข","a-28-input-1":"28. Socket outlet อยู่ในสภาพปกติ ถ้ามีแก้ไข","a-29-radio-1":"29. ตรวจสอบความชื้นภายในตู้ Electrical Panel (กรุณาระบุ Tag ของตู้ถ้าพบว่าไม่ปกติ) ปกติ","a-29-radio-2":"29. ตรวจสอบความชื้นภายในตู้ Electrical Panel (กรุณาระบุ Tag ของตู้ถ้าพบว่าไม่ปกติ) ต้องแก้ไข","a-29-input-1":"29. ตรวจสอบความชื้นภายในตู้ Electrical Panel (กรุณาระบุ Tag ของตู้ถ้าพบว่าไม่ปกติ) ถ้ามีแก้ไข","header-na-2":"input N/A","sectionTwo-remark":"Remark","sectionTwo-inputRemark":"Remark","b-1-radio-1":"1. รั้วตาข่ายไม่ชำรุด ประตูเปิด-ปิด สะดวก และล็อคกุญแจ ปกติ","b-1-radio-2":"1. รั้วตาข่ายไม่ชำรุด ประตูเปิด-ปิด สะดวก และล็อคกุญแจ ต้องแก้ไข","b-1-input-1":"1. รั้วตาข่ายไม่ชำรุด ประตูเปิด-ปิด สะดวก และล็อคกุญแจ ถ้ามีแก้ไข","b-2-radio-1":"2. สาย Earth ของรั้วแน่นไม่หลุดหลวม ปกติ","b-2-radio-2":"2. สาย Earth ของรั้วแน่นไม่หลุดหลวม ต้องแก้ไข","b-2-input-1":"2. สาย Earth ของรั้วแน่นไม่หลุดหลวม ถ้ามีแก้ไข","b-3-radio-1":"3. สาย Earth ของหม้อแปลงแน่นไม่หลุดหลวม ปกติ","b-3-radio-2":"3. สาย Earth ของหม้อแปลงแน่นไม่หลุดหลวม ต้องแก้ไข","b-3-input-1":"3. สาย Earth ของหม้อแปลงแน่นไม่หลุดหลวม ถ้ามีแก้ไข","b-4-radio-1":"4. ความสะอาดเรียบร้อยของลานหม้อแปลง ปกติ","b-4-radio-2":"4. ความสะอาดเรียบร้อยของลานหม้อแปลง ต้องแก้ไข","b-4-input-1":"4. ความสะอาดเรียบร้อยของลานหม้อแปลง ถ้ามีแก้ไข","5-1-r-1":"5.1 No abnormal sound - right","5-1-l-1":"5.1 No abnormal sound - left","5-2-r-1":"5.2 Color painting are in good condition - right","5-2-l-1":"5.2 Color painting are in good condition - left","5-3-r-1":"5.3 Load of Tr (MW) - right","5-3-l-1":"5.3 Load of Tr (MW) - left","5-4-r-1":"5.4 Test run cooling fans - right","5-4-l-1":"5.4 Test run cooling fans - left","5-5-r-1":"5.5 Oil temperature (degree C.) - right","5-5-l-1":"5.5 Oil temperature (degree C.) - left","5-6-r-1":"5.6 Winding temperature (degree C.) - right","5-6-l-1":"5.6 Winding temperature (degree C.) - left","5-7-1-r-1":"5.7.1 Oil temperature setting DegreeC. Alarm - right","5-7-1-l-1":"5.7.1 Oil temperature setting DegreeC. Alarm - left","5-7-2-r-1":"5.7.2 Oil temperature setting DegreeC. Trip - right","5-7-2-l-1":"5.7.2 Oil temperature setting DegreeC. Trip - left","5-8-1-r-1":"5.8.1 Winding temperature setting DegreeC. Alarm - right","5-8-1-l-1":"5.8.1 Winding temperature setting DegreeC. Alarm - left","5-8-2-r-1":"5.8.2 Winding temperature setting DegreeC. Trip - right","5-8-2-l-1":"5.8.2 Winding temperature setting DegreeC. Trip - left","5-9-r-1":"5.9 Tap switch locked and Tap No. (in off load tap changer) - right","5-9-l-1":"5.9 Tap switch locked and Tap No. (in off load tap changer) - left","5-10-1-r-1":"5.10.1 Check oil level in Main tank ( % ) - right","5-10-1-l-1":"5.10.1 Check oil level in Main tank ( % ) - left","5-10-2-r-1":"5.10.2 Check oil level in OLTC tank ( % ) - right","5-10-2-l-1":"5.10.2 Check oil level in OLTC tank ( % ) - left","5-10-3-r-1":"5.10.3 Check oil level in Conservator tank ( % ) - right","5-10-3-l-1":"5.10.3 Check oil level in Conservator tank ( % ) - left","5-11-r-1":"5.11 No oil leak - right","5-11-l-1":"5.11 No oil leak - left","5-12-1-r-1":"5.12.1 Color of silica gel Main tank (Normal / Pale / Replace) - right","5-12-1-l-1":"5.12.1 Color of silica gel Main tank (Normal / Pale / Replace) - left","5-12-2-r-1":"5.12.2 Color of silica gel OLTC tank (Normal / Pale / Replace) - right","5-12-2-l-1":"5.12.2 Color of silica gel OLTC tank (Normal / Pale / Replace) - left","5-13-r-1":"5.13 OLTC counter (in on load tap changer) - right","5-13-l-1":"5.13 OLTC counter (in on load tap changer) - left",`;
            let part2 = `"2-6-input-1":"ถ้าต้องมีการแก้ไขให้สร้าง Notification ในระบบ SAP และลงรายละเอียดและหมายเลข Notification ด้านล่างนี้","header-na-3":"input N/A","sectionThree-remark":"Remark","sectionThree-inputRemark":"Remark","c-1-input-1":"1. หมายเลขตู้","c-1-input-2":"1. Circuit No.","c-1-input-3":"1. Setting mA","c-1-radio-1":"1. ทำงาน","c-1-radio-2":"1. ไม่ทำงาน","c-2-input-1":"2. หมายเลขตู้","c-2-input-2":"2. Circuit No.","c-2-input-3":"2. Setting mA","c-2-radio-1":"2. ทำงาน","c-2-radio-2":"2. ไม่ทำงาน","c-3-input-1":"3. หมายเลขตู้","c-3-input-2":"3. Circuit No.","c-3-input-3":"3. Setting mA","c-3-radio-1":"3. ทำงาน","c-3-radio-2":"3. ไม่ทำงาน","c-4-input-1":"4. หมายเลขตู้","c-4-input-2":"4. Circuit No.","c-4-input-3":"4. Setting mA","c-4-radio-1":"4. ทำงาน","c-4-radio-2":"4. ไม่ทำงาน","c-5-input-1":"5. หมายเลขตู้","c-5-input-2":"5. Circuit No.","c-5-input-3":"5. Setting mA","c-5-radio-1":"5. ทำงาน","c-5-radio-2":"5. ไม่ทำงาน",`;
            
            let part3 = `"c-6-input--1":"Notification No # ถ้ามีแก้ไข","3.3":"หมายเหตุ","c-6-input--2":"หมายเหตุ","header-na-4":"input N/A","sectionFour-remark":"Remark","sectionFour-inputRemark":"Remark","switchboard-tag":"หมายเลขตู้ (Switchboard Tag)","d-1-radio-1":"ทำงาน","d-1-radio-2":"ไม่ทำงาน","d-1-radio-4":"ทำงาน","d-1-radio-5":"ไม่ทำงาน","d-1-radio-7":"Annunciator","d-1-radio-8":"ELICS","d-2-1-input-1":"CIRCUIT NO. 1","d-2-1-radio-1":"ทำงาน","d-2-1-radio-2":"ไม่ทำงาน","d-2-2-input-1":"CIRCUIT NO. 2","d-2-2-radio-1":"ทำงาน","d-2-2-radio-2":"ไม่ทำงาน","d-2-3-input-1":"CIRCUIT NO. 3","d-2-3-radio-1":"ทำงาน","d-2-3-radio-2":"ไม่ทำงาน","d-2-4-input-1":"CIRCUIT NO. 4","d-2-4-radio-1":"ทำงาน","d-2-4-radio-2":"ไม่ทำงาน","d-2-5-input-1":"CIRCUIT NO. 5","d-2-5-radio-1":"ทำงาน","d-2-5-radio-2":"ไม่ทำงาน",`;
            let part4 = `"d-3-input-1":"D3) Notification No # ถ้ามีแก้ไข","d-4-input-1":"D4) หมายเหตุ","header-na-5":"input N/A","sectionFive-remark":"Remark","sectionFive-inputRemark":"Remark","e-1-1-input-1":"1. Tag No.","e-1-1-input-2":"1. Distribution Board No.","e-1-1-input-4":"1. Bus Voltage เทียบกับ GND ขั้วบวก","e-1-1-input-5":"1. % E","e-1-1-input-6":"1. Bus Voltage เทียบกับ GND ขั้วลบ","e-1-1-input-7":"1. % E","e-1-1-input-8":"1. Error Range","e-1-1-input-9":"1. Remark","e-1-2-input-1":"2. Tag No.","e-1-2-input-2":"2. Distribution Board No.","e-1-2-input-4":"2. Bus Voltage เทียบกับ GND ขั้วบวก","e-1-2-input-5":"2. % E","e-1-2-input-6":"2. Bus Voltage เทียบกับ GND ขั้วลบ","e-1-2-input-7":"2. % E","e-1-2-input-8":"2. Error Range","e-1-2-input-9":"2. Remark","e-1-3-input-1":"3. Tag No.","e-1-3-input-2":"3. Distribution Board No.","e-1-3-input-4":"3. Bus Voltage เทียบกับ GND ขั้วบวก","e-1-3-input-5":"3. % E","e-1-3-input-6":"3. Bus Voltage เทียบกับ GND ขั้วลบ","e-1-3-input-7":"3. % E","e-1-3-input-8":"3. Error Range","e-1-3-input-9":"3. Remark","e-1-4-input-1":"4. Tag No.","e-1-4-input-2":"4. Distribution Board No.","e-1-4-input-4":"4. Bus Voltage เทียบกับ GND ขั้วบวก","e-1-4-input-5":"4. % E","e-1-4-input-6":"4. Bus Voltage เทียบกับ GND ขั้วลบ","e-1-4-input-7":"4. % E","e-1-4-input-8":"4. Error Range","e-1-4-input-9":"4. Remark","e-1-5-input-1":"5. Tag No.","e-1-5-input-2":"5. Distribution Board No.","e-1-5-input-4":"5. Bus Voltage เทียบกับ GND ขั้วบวก","e-1-5-input-5":"5. % E","e-1-5-input-6":"5. Bus Voltage เทียบกับ GND ขั้วลบ","e-1-5-input-7":"5. % E","e-1-5-input-8":"5. Error Range","e-1-5-input-9":"5. Remark",`;
            let part5 = `"e-2-1-input-1":"1. Tag No.","e-2-1-input-2":"1. Distribution Board No.","e-2-1-input-3":"1. System Voltage","e-2-1-input-4":"1. Bus Voltage เทียบกับ GND ขั้วบวก","e-2-1-input-5":"1. % E","e-2-1-input-6":"1. Bus Voltage เทียบกับ GND ขั้วลบ","e-2-1-input-7":"1. % E","e-2-1-input-8":"1. Error Range","e-2-1-input-9":"1. Remark","e-2-2-input-1":"2. Tag No.","e-2-2-input-2":"2. Distribution Board No.","e-2-2-input-3":"2. System Voltage","e-2-2-input-4":"2. Bus Voltage เทียบกับ GND ขั้วบวก","e-2-2-input-5":"2. % E","e-2-2-input-6":"2. Bus Voltage เทียบกับ GND ขั้วลบ","e-2-2-input-7":"2. % E","e-2-2-input-8":"2. Error Range","e-2-2-input-9":"2. Remark","e-2-3-input-1":"3. Tag No.","e-2-3-input-2":"3. Distribution Board No.","e-2-3-input-3":"3. System Voltage","e-2-3-input-4":"3. Bus Voltage เทียบกับ GND ขั้วบวก","e-2-3-input-5":"3. % E","e-2-3-input-6":"3. Bus Voltage เทียบกับ GND ขั้วลบ","e-2-3-input-7":"3. % E","e-2-3-input-8":"3. Error Range","e-2-3-input-9":"3. Remark","e-2-4-input-1":"4. Tag No.","e-2-4-input-2":"4. Distribution Board No.","e-2-4-input-3":"4. System Voltage","e-2-4-input-4":"4. Bus Voltage เทียบกับ GND ขั้วบวก","e-2-4-input-5":"4. % E","e-2-4-input-6":"4. Bus Voltage เทียบกับ GND ขั้วลบ","e-2-4-input-7":"4. % E","e-2-4-input-8":"4. Error Range","e-2-4-input-9":"4. Remark","e-2-5-input-1":"5. Tag No.","e-2-5-input-2":"5. Distribution Board No.","e-2-5-input-3":"5. System Voltage","e-2-5-input-4":"5. Bus Voltage เทียบกับ GND ขั้วบวก","e-2-5-input-5":"5. % E","e-2-5-input-6":"5. Bus Voltage เทียบกับ GND ขั้วลบ","e-2-5-input-7":"5. % E","e-2-5-input-8":"5. Error Range","e-2-5-input-9":"5. Remark",`;
            let part6 = `"e-3-1-input-1":"1. Tag No.","e-3-1-input-2":"1. Distribution Board No.","e-3-1-input-3":"1. System Voltage","e-3-1-input-4":"1. Bus Voltage เทียบกับ GND ขั้วบวก","e-3-1-input-5":"1. % E","e-3-1-input-6":"1. Bus Voltage เทียบกับ GND ขั้วลบ","e-3-1-input-7":"1. % E","e-3-1-input-8":"1. Error Range","e-3-1-input-9":"1. Remark","e-3-2-input-1":"2. Tag No.","e-3-2-input-2":"2. Distribution Board No.","e-3-2-input-3":"2. System Voltage","e-3-2-input-4":"2. Bus Voltage เทียบกับ GND ขั้วบวก","e-3-2-input-5":"2. % E","e-3-2-input-6":"2. Bus Voltage เทียบกับ GND ขั้วลบ","e-3-2-input-7":"2. % E","e-3-2-input-8":"2. Error Range","e-3-2-input-9":"2. Remark","e-3-3-input-1":"3. Tag No.","e-3-3-input-2":"3. Distribution Board No.","e-3-3-input-3":"3. System Voltage","e-3-3-input-4":"3. Bus Voltage เทียบกับ GND ขั้วบวก","e-3-3-input-5":"3. % E","e-3-3-input-6":"3. Bus Voltage เทียบกับ GND ขั้วลบ","e-3-3-input-7":"3. % E","e-3-3-input-8":"3. Error Range","e-3-3-input-9":"3. Remark","e-3-4-input-1":"4. Tag No.","e-3-4-input-2":"4. Distribution Board No.","e-3-4-input-3":"4. System Voltage","e-3-4-input-4":"4. Bus Voltage เทียบกับ GND ขั้วบวก","e-3-4-input-5":"4. % E","e-3-4-input-6":"4. Bus Voltage เทียบกับ GND ขั้วลบ","e-3-4-input-7":"4. % E","e-3-4-input-8":"4. Error Range","e-3-4-input-9":"4. Remark","e-3-5-input-1":"5. Tag No.","e-3-5-input-2":"5. Distribution Board No.","e-3-5-input-3":"5. System Voltage","e-3-5-input-4":"5. Bus Voltage เทียบกับ GND ขั้วบวก","e-3-5-input-5":"5. % E","e-3-5-input-6":"5. Bus Voltage เทียบกับ GND ขั้วลบ","e-3-5-input-7":"5. % E","e-3-5-input-8":"5. Error Range","e-3-5-input-9":"5. Remark"`;
            if(countPart1 > 0) {
                for (let i=0;i<countPart1;i++) {
                    let count = 2;
                    count = count + i;
                    let str ='"tr-'+count+'": "5. Transformer condition",'+
                    '"tbody-'+count+'": "",'+
                    '"5-1-r-'+count+'": "5.1 No abnormal sound - right",'+
                    '"5-1-l-'+count+'": "5.1 No abnormal sound - left",'+
                    '"5-2-r-'+count+'": "5.2 Color painting are in good condition - right",'+
                    '"5-2-l-'+count+'": "5.2 Color painting are in good condition - left",'+
                    '"5-3-r-'+count+'": "5.3 Load of Tr (MW) - right",'+
                    '"5-3-l-'+count+'": "5.3 Load of Tr (MW) - left",'+
                    '"5-4-r-'+count+'": "5.4 Test run cooling fans - right",'+
                    '"5-4-l-'+count+'": "5.4 Test run cooling fans - left",'+
                    '"5-5-r-'+count+'": "5.5 Oil temperature (degree C.) - right",'+
                    '"5-5-l-'+count+'": "5.5 Oil temperature (degree C.) - left",'+
                    '"5-6-r-'+count+'": "5.6 Winding temperature (degree C.) - right",'+
                    '"5-6-l-'+count+'": "5.6 Winding temperature (degree C.) - left",'+
                    '"5-7-1-r-'+count+'": "5.7.1 Oil temperature setting DegreeC. Alarm - right",'+
                    '"5-7-1-l-'+count+'": "5.7.1 Oil temperature setting DegreeC. Alarm - left",'+
                    '"5-7-2-r-'+count+'": "5.7.2 Oil temperature setting DegreeC. Trip - right",'+
                    '"5-7-2-l-'+count+'": "5.7.2 Oil temperature setting DegreeC. Trip - left",'+
                    '"5-8-1-r-'+count+'": "5.8.1 Winding temperature setting DegreeC. Alarm - right",'+
                    '"5-8-1-l-'+count+'": "5.8.1 Winding temperature setting DegreeC. Alarm - left",'+
                    '"5-8-2-r-'+count+'": "5.8.2 Winding temperature setting DegreeC. Trip - right",'+
                    '"5-8-2-l-'+count+'": "5.8.2 Winding temperature setting DegreeC. Trip - left",'+
                    '"5-9-r-'+count+'": "5.9 Tap switch locked and Tap No. (in off load tap changer) - right",'+
                    '"5-9-l-'+count+'": "5.9 Tap switch locked and Tap No. (in off load tap changer) - left",'+
                    '"5-10-1-r-'+count+'": "5.10.1 Check oil level in Main tank ( % ) - right",'+
                    '"5-10-1-l-'+count+'": "5.10.1 Check oil level in Main tank ( % ) - left",'+
                    '"5-10-2-r-'+count+'": "5.10.2 Check oil level in OLTC tank ( % ) - right",'+
                    '"5-10-2-l-'+count+'": "5.10.2 Check oil level in OLTC tank ( % ) - left",'+
                    '"5-10-3-r-'+count+'": "5.10.3 Check oil level in Conservator tank ( % ) - right",'+
                    '"5-10-3-l-'+count+'": "5.10.3 Check oil level in Conservator tank ( % ) - left",'+
                    '"5-11-r-'+count+'": "5.11 No oil leak - right",'+
                    '"5-11-l-'+count+'": "5.11 No oil leak - left",'+
                    '"5-12-1-r-'+count+'": "5.12.1 Color of silica gel Main tank (Normal / Pale / Replace) - right",'+
                    '"5-12-1-l-'+count+'": "5.12.1 Color of silica gel Main tank (Normal / Pale / Replace) - left",'+
                    '"5-12-2-r-'+count+'": "5.12.2 Color of silica gel OLTC tank (Normal / Pale / Replace) - right",'+
                    '"5-12-2-l-'+count+'": "5.12.2 Color of silica gel OLTC tank (Normal / Pale / Replace) - left",'+
                    '"5-13-r-'+count+'": "5.13 OLTC counter (in on load tap changer) - right",'+
                    '"5-13-l-'+count+'": "5.13 OLTC counter (in on load tap changer) - left",';
                    part1 += str;
                }
            }
            if(countPart2 > 0) {
                for (let i=0;i<countPart2;i++) {
                    let count = 6;
                    count = count + i;
                    let str ='"c-'+count+'-input-1": "1. หมายเลขตู้",'+
                    '"c-'+count+'-input-2": "1. Circuit No.",'+
                    '"c-'+count+'-input-3": "1. Setting mA",'+
                    '"c-'+count+'-radio-1": "1. ทำงาน",'+
                    '"c-'+count+'-radio-2": "1. ไม่ทำงาน",';
                    part2 += str;
                }
            }
            if(countPart3 > 0) {
                for (let i=0;i<countPart3;i++) {
                    let count = 6;
                    count = count + i;
                    let str ='"d-2-'+count+'-input-1": "CIRCUIT NO. 1",'+
                    '"d-2-'+count+'-radio-1": "ทำงาน",'+
                    '"d-2-'+count+'-radio-2": "ไม่ทำงาน",';
                    part3 += str;
                }
            }
            if(countPart4 > 0) {
                for (let i=0;i<countPart4;i++) {
                    let count = 6;
                    count = count + i;
                    let str ='"e-1-'+count+'-input-1": "'+count+'. Tag No.",'+
                    '"e-1-'+count+'-input-2": "'+count+'. Distribution Board No.",'+
                    '"e-1-'+count+'-input-4": "'+count+'. Bus Voltage เทียบกับ GND ขั้วบวก",'+
                    '"e-1-'+count+'-input-5": "'+count+'. % E",'+
                    '"e-1-'+count+'-input-6": "'+count+'. Bus Voltage เทียบกับ GND ขั้วลบ",'+
                    '"e-1-'+count+'-input-7": "'+count+'. % E",'+
                    '"e-1-'+count+'-input-8": "'+count+'. Error Range",'+
                    '"e-1-'+count+'-input-9": "'+count+'. Remark",';
                    part4 += str;
                }
            }
            if(countPart5 > 0) {
                for (let i=0;i<countPart5;i++) {
                    let count = 6;
                    count = count + i;
                    let str ='"e-2-'+count+'-input-1": "'+count+'. Tag No.",'+
                    '"e-2-'+count+'-input-2": "'+count+'. Distribution Board No.",'+
                    '"e-2-'+count+'-input-3": "'+count+'. System Voltage",'+
                    '"e-2-'+count+'-input-4": "'+count+'. Bus Voltage เทียบกับ GND ขั้วบวก",'+
                    '"e-2-'+count+'-input-5": "'+count+'. % E",'+
                    '"e-2-'+count+'-input-6": "'+count+'. Bus Voltage เทียบกับ GND ขั้วลบ",'+
                    '"e-2-'+count+'-input-7": "'+count+'. % E",'+
                    '"e-2-'+count+'-input-8": "'+count+'. Error Range",'+
                    '"e-2-'+count+'-input-9": "'+count+'. Remark",';
                    part5 += str;
                }
            }
            if(countPart6 > 0) {
                for (let i=0;i<countPart6;i++) {
                    let count = 6;
                    count = count + i;
                    let str ='"e-3-'+count+'-input-1": "'+count+'. Tag No.",'+
                    '"e-3-'+count+'-input-2": "'+count+'. Distribution Board No.",'+
                    '"e-3-'+count+'-input-3": "'+count+'. System Voltage",'+
                    '"e-3-'+count+'-input-4": "'+count+'. Bus Voltage เทียบกับ GND ขั้วบวก",'+
                    '"e-3-'+count+'-input-5": "'+count+'. % E",'+
                    '"e-3-'+count+'-input-6": "'+count+'. Bus Voltage เทียบกับ GND ขั้วลบ",'+
                    '"e-3-'+count+'-input-7": "'+count+'. % E",'+
                    '"e-3-'+count+'-input-8": "'+count+'. Error Range",'+
                    '"e-3-'+count+'-input-9": "'+count+'. Remark",';
                    part6 += str;
                }
            }
            
            ENEM_QFR_9003_GNR = part1 + part2 + part3 + part4 + part5 + part6 + `}]`;
            return ENEM_QFR_9003_GNR;
}

//export { disableButtons, dynamicRow };
export { disableButtons, dynamicRow,ENEM_QFR_2604_REL,ENEM_QFR_1325_UPS,ENIM_QFR_743,ENEM_QFR_9008_GNR,ENEM_QFR_9003_GNR };