import { ILingProperty } from '../types';
import data from '../data'

class LingPropertyList {
	constructor(properties: Array<ILingProperty>) {
		this.properties = properties;
		this.currentIndex = 0;
	}

	public properties: Array<ILingProperty>;
	public currentIndex: number;

	public getProperty(id: string | number): ILingProperty | undefined {
		return this.properties.find((property) => property.id == id);
	}
	public getNext(): ILingProperty | undefined {
		this.currentIndex = (this.currentIndex + 1) % this.properties.length;
		return this.properties[this.currentIndex];
	}
	public getPrevious(): ILingProperty | undefined {
		this.currentIndex = (this.currentIndex - 1) < 0 ? this.properties.length - 1 : this.currentIndex - 1;
		return this.properties[this.currentIndex];
	}
	public getNextUnset(): ILingProperty | undefined {
		for (let i = 0; i < this.properties.length; i++) {
			const idx = (this.currentIndex + i) % this.properties.length;
			if (this.properties[idx].status == 'unset') {
				this.currentIndex = idx;
				return this.properties[idx];
			}
		}
	}
	public getNextUncertain(): ILingProperty | undefined {
		for (let i = 0; i < this.properties.length; i++) {
			const idx = (this.currentIndex + i) % this.properties.length;
			if (this.properties[idx].status == 'uncertain') {
				this.currentIndex = idx;
				return this.properties[idx];
			}
		}
	}
}

function main(){
  const list = new LingPropertyList(data);
  console.log(list.getNext());
  console.log(list.getNext());
}

main()