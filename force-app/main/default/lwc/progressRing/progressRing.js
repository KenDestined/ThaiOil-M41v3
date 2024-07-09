import { LightningElement, api } from 'lwc'

export default class ProgressRing extends LightningElement {
	@api isCurrent
	@api percentage

	get progress() {
		if (this.percentage) {
			return `${this.percentage}`
		}
		return 0
	}

	get showPercentage() {
		return true
	}
}