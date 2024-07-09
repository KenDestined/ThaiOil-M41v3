import { LightningElement, api, track } from "lwc";

export default class lwcModal extends LightningElement {
    @api isVisible;
    @api confirmText = "Yes";
    @api cancelText = "No";
    @api title;
    @api message;
    @api name;
    @track reason;

    handleModalClickEvent(e) {
        e.preventDefault();
        const event = new CustomEvent("selected", {
            detail: { response: e.currentTarget.dataset.action, name: this.name, reason: this.reason }
        });
        this.dispatchEvent(event);
    }

    handleReasonChange(e) {
        this.reason = e.target.value;
    }

    get isRejectForm() {
        return this.name === "rejectForm";
    }
}