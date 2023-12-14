import { Data } from './useData';

const filteredData = ref<Data[]>([]);

export const useFilteredData = () => {
	return { filteredData };
};
export const setFilteredData = (data: Data[]) => {
	filteredData.value = data;
};
