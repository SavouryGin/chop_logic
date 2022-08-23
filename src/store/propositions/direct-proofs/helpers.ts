import { DirectProofsTableItem } from './interfaces';

export const findDependentDPItemsToDelete = (selectedIds: string[], tableData: DirectProofsTableItem[]): DirectProofsTableItem[] => {
  const selectedItems: DirectProofsTableItem[] = tableData.filter((item) => !selectedIds.includes(item.id));
  const dependentSteps: number[] = [];

  for (const item of selectedItems) {
    if (item.dependentSteps) {
      dependentSteps.push(...item.dependentSteps);
    }
  }

  const uniqueDependentSteps = new Set(dependentSteps);

  return tableData.filter((item) => uniqueDependentSteps.has(item.step));
};

export const updateDPTableData = (tableData: DirectProofsTableItem[], idsToFilter: string[]): DirectProofsTableItem[] => {
  return tableData
    .filter((item) => !idsToFilter.includes(item.id))
    .map((item, index) => {
      return {
        ...item,
        step: index + 1,
        id: `proof-step-${index + 1}`,
      };
    });
};
