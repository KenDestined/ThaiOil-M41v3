import { api, LightningElement } from 'lwc';

export default class UtilityLwcButton extends LightningElement {
    @api label
    @api type
    @api title
    @api variant

    @api
    submit_click() {
        this.template.querySelector('.btn_func_click').click()
    }
}