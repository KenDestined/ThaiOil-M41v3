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
        case "Sundyne_LMV_311_Checklist_Form": {
            let htmlText = "";
            let sectionTitles = ["3.1 หน้าซีลอยู่กับที่ด้านใน (Stationary Seal Face Primary Side) Surface Ware","3.2 หน้าซีลอยู่กับที่ด้านนอก (Stationary Seal Face Secondary Side) Surface Ware","3.3 หน้าซีลหมุนด้านใน (Rotary seal face Primary Side) Surface ware","3.4 หน้าซีลหมุนด้านนอก (Rotary Seal Face Secondary Side) Surface Ware","3.5 หน้าซีลอยู่กับที่ด้าน Lube oil (Stationary Seal Face Lube oil Side) Surface Ware","3.6 หน้าซีลหมุนด้าน Lube oil (Rotary Seal Face Lube oil Side) Surface Ware"];
            let checkbox1Titles = ["Silicon cabide","Carbon GE","Tungsten cabide","Carbon RY","Ceramic","Bellow","Stellite"];
            let checkbox2Titles = ["หน้าหมด","Feed ซึม","แตก","Heat cracks","Broken","Damage","โค้กติด","Normal wear","Excessive wear","Light grooved","Heavy grooved","หลวม","Erosion","Corrosion","Pit corrosion","เป็นรอย","Chipped at O.D.","Chipped at I.D.","Chemical attacked","Abrasive","Disbonding"];

            for (let i = 1; i <= 6; i++) {
                let section=`<section class="drawnSection" data-answered="false" data-id="3.`+i+`" class="section-tb"> <label class="e-label">`+sectionTitles[i - 1]+`</label><br /><label class="e-label">Face Material;</label><br />`;

                for (let j = 1; j <= checkbox1Titles.length; j++) {
                    section+=`<div class="slds-radio"> <input type="radio" name="3-`+i+`-radio-` +i +`" data-id="3-`+i+`-radio-`+j+`" id="3-`+i+`-radio-`+j+`" value="`+checkbox1Titles[j - 1]+`" /> <label class="slds-radio__label" for="3-`+i+`-radio-`+j+`"><span class="slds-radio_faux"></span><span class="e-label">`+checkbox1Titles[j - 1]+`</span></label></div>`;
                }
                section+=`<br /> <br /><div class="slds-checkbox"> <input type="checkbox" name="3-`+i+`-checkbox--1" data-id="3-`+i+`-checkbox--1" id="3-`+i+`-checkbox--1" data-children="0" data-controlledby="`;

                for (let k=2;k<=23;k++) {
                    if (k==23) {
                        section+=`3-`+i+`-checkbox--`+k;
                    } else {
                        section+=`3-`+i+`-checkbox-`+k;
                    }
                }
                section+=`value="ดี" /><label class="slds-checkbox__label" for="3-`+i+`-checkbox--1"><span class="slds-checkbox_faux"></span> <span class="e-label">ดี</span></label></div>`;

                for (let h=2;h<checkbox2Titles.length+2;h++) {
                    section+=`<div class="slds-checkbox"><input type="checkbox" data-controlledby="3-`+i+`-checkbox--1" data-children="0" name="3-`+i+`-checkbox-`+h+`" data-id="3-`+i+`-checkbox-`+h+`" id="3-`+i+`-checkbox-`+h+`" value="`+checkbox2Titles[h - 2]+`" /><label class="slds-checkbox__label" for="3-`+i+`-checkbox-`+h+`"><span class="slds-checkbox_faux"></span><span class="e-label">`+checkbox2Titles[h - 2]+`</span></label></div>`;
                }

                section+=`<ul class="slds-list_horizontal slds-has-block-links_space"><li><div class="slds-checkbox"> <input type="checkbox" name="3-`+i+`-checkbox--23" data-id="3-`+i+`-checkbox--23" id="3-`+i+`-checkbox--23" value="อื่นๆ" data-children="0" data-controlledby="3-`+i+`-checkbox--1"/><label class="slds-checkbox__label" for="3-`+i+`-checkbox--23"><span class="slds-checkbox_faux"></span> <span class="e-label">อื่นๆ</span></label></div></li><li class="w-80"><div class="f-c"><input type="text" data-id="3-`+i+`-input" disabled data-disabled="true" data-children="-1" data-controlledby="3-`+i+`-checkbox--23" class="slds-input" /></div></li></ul> <label class="e-label">Remark</label><div class="f-c"><textarea onchange={onIEH} data-id="3-`+i +`-remark" class="slds-textarea"></textarea></div></section>`;

                htmlText+=section;
            }
            return htmlText;
        }
    }
}

export { disableButtons, dynamicRow };