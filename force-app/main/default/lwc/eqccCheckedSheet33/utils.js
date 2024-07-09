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

export { disableButtons };