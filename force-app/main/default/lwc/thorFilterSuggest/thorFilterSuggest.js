import { api, wire, LightningElement } from 'lwc'
import getDescribeFieldResult from '@salesforce/apex/THOR_FilterController.getDescribeFieldResult'
import getMasterMapByTpye from '@salesforce/apex/THOR_FilterController.getMasterMapByTpye'
import getMasterMapReversed from '@salesforce/apex/THOR_FilterController.getMasterMapReversed'

export default class ThorFilterSuggest extends LightningElement {
	_key
	_value
	_label
	_required

	// condition
	_isInitialized = false
	_isFocus = false
	_isSeleted = false

	@api
	fieldName
	@api
	labelName
	@api
	get required() {
		return this._required
	}
	set required(val) {
		this._required = val && val === 'true'
	}

	_masterMapType
	@api
	get masterMapType() {
		return this._masterMapType
	}
	set masterMapType(val) {
		this._masterMapType = val
	}

	@api
	dependencyValue
	@api
	reverseValue
	@api
	alignment

	@api
	get value() {
		return this._value
	}
	set value(val) {
		this._value = val || ''
	}

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

	connectedCallback() {
		this._isInitialized = true
	}

	renderedCallback() {
		if (!this._value) {
			this._isSeleted = false
		} else if (this._isInitialized && !this._isFocus) {
			this._isSeleted = true
			this._isInitialized = false
		}
	}

	_masterMapDataDisplay = []
	_masterMapData = []
	_isHasMasterMapData = false
	@wire(getMasterMapByTpye, {
		filterQuery: '$_value',
		type: '$_masterMapType'
	})
	callbackMasterMapByType({ data, error }) {
		if (data) {
			this._masterMapData = JSON.parse(JSON.stringify(data))
				.map((m) => {
					m.Code__c = m.Code__c ? m.Code__c : m.RelatedMasterMap2__r ? m.RelatedMasterMap2__r.Code__c : ''
					return m
				})
				.filter((f) => f.Code__c)
			this._masterMapDataDisplay = this._masterMapData || []
			this._isHasMasterMapData = data.length > 0
		} else if (error) {
			console.error(error)
		}
	}

	@wire(getDescribeFieldResult, { fieldName: '$fieldName', sObjectName: 'THOR_Filter__c' })
	callbackDescribeFieldResult({ data, error }) {
		if (data) this._label = data.label
	}

	async handleFocus(e) {
		e.preventDefault()

		let reverseList = []
		if (this.reverseValue && [...this.reverseValue].some((s) => s)) {
			try {
				reverseList = await getMasterMapReversed({
					code2: this.reverseValue.find((val) => !!val),
					type: this.masterMapType
				})
			} catch (error) {
				console.error(error)
			}
		}

		this._masterMapDataDisplay = this._masterMapData.filter((f) => {
			if (this.dependencyValue) {
				return f.RelatedMasterMap1__r && f.RelatedMasterMap1__r.Code__c === this.dependencyValue
			}
			// Checking for reverserd only
			else if (reverseList.length > 0) {
				return reverseList.some((s) => s.RelatedMasterMap1__r && s.RelatedMasterMap1__r.Code__c === f.Code__c)
			}
			return f
		})
		this._isHasMasterMapData = this._masterMapDataDisplay.length > 0
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

		this._key = e.currentTarget.dataset.selectedRecordId || null
		this._value = e.currentTarget.dataset.selectedValue || ''
		this.fireEvent()
	}

	fireEvent() {
		this.dispatchEvent(
			new CustomEvent('changeValue', {
				detail: {
					fieldName: this.fieldName,
					key: this._key,
					value: this.value
				}
			})
		)
	}
}