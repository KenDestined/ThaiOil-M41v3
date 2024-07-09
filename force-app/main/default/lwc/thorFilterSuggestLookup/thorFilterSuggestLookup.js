import { api, LightningElement, wire } from 'lwc'
import getDescribeFieldResult from '@salesforce/apex/THOR_FilterController.getDescribeFieldResult'
import fetchRecordsRecently from '@salesforce/apex/THOR_FilterController.fetchRecordsRecently'
import getRecordInfo from '@salesforce/apex/THOR_FilterController.getRecordInfo'

export default class ThorFilterSuggestLookup extends LightningElement {
	_displayValue
	_value
	_label
	_required

	// condition
	_isInitialized = false
	_isFocus = false
	_isSeleted = false

	@api
	sObjectName
	@api
	fieldName
	@api
	labelName
	@api
	isDisplayValue = false
	@api
	get required() {
		return this._required
	}
	set required(val) {
		this._required = val === 'true'
	}

	@api
	fetchFieldName
	/**
	 * @description
	 * fetch value by field name api default value is Id (key)
	 */
	@api
	fetchSObjectName
	@api
	nameDisplayFormat
	@api
	descriptionDisplayFormat
	@api
	alignment

	@api
	get value() {
		return this._value
	}
	set value(val) {
		this._value = val
	}

	_hasRecordsDisplay = false
	_recordsDisplay = []

	get classDropdownTrigger() {
		return `slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click ${this._isFocus ? 'slds-is-open' : ''}`
	}
	get classDropdown() {
		return `slds-dropdown slds-dropdown_length-with-icon-5 slds-dropdown_fluid ${
			this.alignment === 'bottom' ? '' : 'custom-dropdown-up'
		}`
	}
	get classSeleted() {
		return `slds-combobox_container ${this._isSeleted ? 'slds-has-selection' : ''}`
	}

	get displayValue() {
		return this._displayValue || this.value
	}
	get fieldsFilter() {
		return this.getFieldsByParagraph(this.nameDisplayFormat).concat(
			this.getFieldsByParagraph(this.descriptionDisplayFormat)
		)
	}

	connectedCallback() {
		this._isInitialized = true
		this.value = null
	}

	renderedCallback() {
		// this._isSeleted = !!this._value
		if (!this._value) {
			this._isSeleted = false
		} else if (this._isInitialized && !this._isFocus) {
			this._isSeleted = true
			this._isInitialized = false
		}
	}

	@wire(getDescribeFieldResult, { fieldName: '$fieldName', sObjectName: '$sObjectName' })
	callbackDescribeFieldResult({ data, error }) {
		if (data) this._label = data.label
	}

	@wire(getRecordInfo, { recordId: '$value' })
	callbackRecordInfo({ data, error }) {
		// if (error) {
		// 	const { body: message } = error
		// 	console.error(message)
		// }
		this._displayValue = data ? this.transformDisplay(this.nameDisplayFormat, data) : this._displayValue || ''
		if (typeof this._displayValue === 'string' && this._displayValue.includes('undefined')) {
			this._displayValue = data ? this.transformDisplay(`{Name}`, data) : this._displayValue || ''
		}
	}

	@wire(fetchRecordsRecently, {
		sObjectName: '$fetchSObjectName',
		searchText: '$value',
		fieldsFilter: '$fieldsFilter'
	})
	callbackFetchRecordsRecently({ data, error }) {
		if (error) {
			const { body: message } = error
			console.error(message)
		}
		this._recordsDisplay = data
			? data.reduce((l, recordInfo) => {
					const name = this.transformDisplay(this.nameDisplayFormat, recordInfo)
					const description = this.transformDisplay(this.descriptionDisplayFormat, recordInfo)
					// console.log(recordInfo, name, description);
					l.push({
						...recordInfo,
						name: !name.includes('undefined') ? name : recordInfo.Name,
						description: !description.includes('undefined') ? description : ''
					})
					return l
			  }, [])
			: []
		this._hasRecordsDisplay = this._recordsDisplay.length > 0
	}

	getParagraphFormat(text) {
		const paragraph = text.match(/{(.*?)}/g)
		return paragraph ? paragraph[0] : ''
	}

	getFieldsByParagraph(text) {
		const paragraph = this.getParagraphFormat(text)
		return paragraph.match(/([a-zA-Z0-9])\w+/g) || []
	}

	transformDisplay(textFormat, recordInfo) {
		try {
			return (
				textFormat.replace(
					this.getParagraphFormat(textFormat),
					this.getFieldsByParagraph(textFormat)
						.reduce(
							(text, field) => (recordInfo[field] && field !== 'Id' ? text.replace(field, recordInfo[field]) : text),
							this.getParagraphFormat(textFormat)
						)
						.replace(/[{}]/g, '')
				) || ''
			)
		} catch (e) {
			return ''
		}
	}

	async handleFocus(e) {
		e.preventDefault()

		this._isFocus = true
	}

	handleFocusOut(e) {
		e.preventDefault()

		setTimeout(() => {
			this._isFocus = false
		}, 150)
	}

	handleClearValue(e) {
		e.preventDefault()
		this._isSeleted = false

		this._value = ''
		this.fireEvent()
	}

	handleChangeValue(e) {
		e.preventDefault()
		this._isFocus = true
		this._isSeleted = false
		this._isInitialized = false

		this._value = e.target.value
		this.fireEvent()
	}

	handleSelected(e) {
		e.preventDefault()
		this._isFocus = false
		this._isSeleted = true

		this._displayValue = e.currentTarget.dataset.selectedDisplayName || ''
		this._value = e.currentTarget.dataset.selectedRecordId || null
		this.fireEvent()
	}

	fireEvent() {
		this.dispatchEvent(
			new CustomEvent('changeValue', {
				detail: {
					fieldName: this.fieldName,
					value:
						this.fetchFieldName && this._isSeleted
							? this._recordsDisplay.find((f) => f.Id === this.value)[this.fetchFieldName] || this.value
							: this.value,
					displayValue: this._displayValue
				}
			})
		)
	}
}