import {LightningElement, api, wire } from 'lwc'
import getDescribeFieldResult from '@salesforce/apex/ODM_FilterController.getDescribeFieldResult'
import fetchRecordsRecently from '@salesforce/apex/ODM_FilterController.fetchRecordsRecently'
import getRecordInfo from '@salesforce/apex/ODM_FilterController.getRecordInfo'

export default class OdmSuggestLookup extends LightningElement {
    _required
    _label
    _value
    _displayValue

	_hasRecordsDisplay = false
	_recordsDisplay = []

    _isInitialized = false
    _isFocused = false
    _isSelected = false
    _showError = false
    _filterDescription = false

	@api sObjectName
	@api fieldName
	@api labelName
    @api fetchFieldName
	@api fetchSObjectName
	@api nameDisplayFormat
	@api descriptionDisplayFormat
	@api alignment
    @api filterDescription

    @api
    get required() {
        return this._required
    }
    set required(val) {
        this._required = (val === 'true')
    }

    @api
	get value() {
		return this._value
	}
	set value(val) {
		this._value = val
	}

    get displayValue() {
		return this._displayValue || this.value
	}

	get fieldsFilter() {
        if (this.filterDescription) {
            return this.getFieldsByParagraph(this.nameDisplayFormat).concat(
                this.getFieldsByParagraph(this.descriptionDisplayFormat)
            )
        } else {
            return this.getFieldsByParagraph(this.nameDisplayFormat)
        }
	}

	get classDropdownTrigger() {
		return `slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click ${this._isFocused ? 'slds-is-open' : ''}`
	}

	connectedCallback() {
		this._isInitialized = true
		this.value = null
	}

	renderedCallback() {
		if (!this._value) {
			this._isSelected = false
		} else if (this._isInitialized && !this._isFocused) {
			this._isSelected = true
			this._isInitialized = false
		}
	}

	@wire(getDescribeFieldResult, { fieldName: '$fieldName', sObjectName: '$sObjectName' })
	callbackDescribeFieldResult({ data, error }) {
		if (data) this._label = data.label
	}

	@wire(getRecordInfo, { recordId: '$value' })
	callbackRecordInfo({ data, error }) {
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

	async handleFocusIn(e) {
		e.preventDefault()

		this._isFocused = true
	}

	handleFocusOut(e) {
		e.preventDefault()

		setTimeout(() => {
			this._isFocused = false
            console.log('handleFocusOut');
            if (this._required && this._value) {
                if (!this._isSelected) {
                    this._showError = true
                    this.template.querySelector(`[data-id="txtSearch"]`).classList.add('slds-has-error')
                }
            }
		}, 150)
	}

    handleClearValue(e) {
        e.preventDefault()

        this._isSelected = false
        this._value = ''
        this.fireEvent()
    }

	handleChangeValue(e) {
		e.preventDefault()
		this._isFocused = true
		this._isSelected = false
		this._isInitialized = false

		this._value = e.target.value
		//this.fireEvent()
	}

	handleSelectValue(e) {
		e.preventDefault()

		this._isFocused = false
		this._isSelected = true
		this._displayValue = e.currentTarget.dataset.selectedDisplayName || ''
		this._value = e.currentTarget.dataset.selectedRecordId || null
        
        this._showError = false
        if (this.template.querySelector(`[data-id="txtSearch"]`)) {
            this.template.querySelector(`[data-id="txtSearch"]`).classList.remove('slds-has-error')
        }

		this.fireEvent()
	}

    fireEvent() {
        this.dispatchEvent(
            new CustomEvent('changeValue', {
                detail: {
                    fieldName: this.fieldName,
                    value:
                        this.fetchFieldName && this._isSelected
                            ? this._recordsDisplay.find((f) => f.Id === this.value)[this.fetchFieldName] || this.value
                            : this.value,
                    displayValue: this._displayValue,
                    isSelected: this._isSelected
                }
            })
        )
    }
}