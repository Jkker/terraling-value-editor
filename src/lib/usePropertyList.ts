import { useState } from 'react';
import { ILingProperty } from '../types';

export default function usePropertyList(data: ILingProperty[]) {
	const [propertyList, setPropertyList] = useState<ILingProperty[]>(data);
	const [currentIndex, setCurrentIndex] = useState(0);

	function nextProperty() {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % propertyList.length);
	}
	function prevProperty() {
		setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? propertyList.length - 1 : prevIndex - 1));
	}
	function nextUnset() {
		for (let i = 1; i < propertyList.length; i++) {
			const idx = (currentIndex + i) % propertyList.length;
			if (!propertyList[idx].sureness) {
				setCurrentIndex(idx);
				return idx;
			}
		}
		return undefined;
	}
	function nextUncertain() {
		for (let i = 1; i < propertyList.length; i++) {
			const idx = (currentIndex + i) % propertyList.length;
			if (propertyList[idx].sureness && propertyList[idx].sureness !== 'certain') {
				setCurrentIndex(idx);
				return idx;
			}
		}
		return undefined;
	}
	function updatePropertyById(id: string | number, newValues: Partial<ILingProperty>) {
		setPropertyList(propertyList.map((p) => (p.id === id ? { ...p, ...newValues } : p)));
	}
	function updateProperty(newValues: Partial<ILingProperty>) {
		setPropertyList(
			propertyList.map((p, idx) => (idx === currentIndex ? { ...p, ...newValues } : p))
		);
	}

	return {
		propertyList,
		setPropertyList,
		currentIndex,
		setCurrentIndex,
		currentProperty: propertyList[currentIndex],
		nextUncertain,
		nextUnset,
		prevProperty,
		nextProperty,
		updateProperty,
		updatePropertyById,
	};
}
