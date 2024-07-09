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

export { disableButtons, dynamicRow };