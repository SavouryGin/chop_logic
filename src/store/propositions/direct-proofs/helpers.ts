import { DirectProofsTableItem } from './interfaces';

export const findDependentDPItemsToDelete = (selectedIds: string[], tableData: DirectProofsTableItem[]): DirectProofsTableItem[] => {
  const selectedItems: DirectProofsTableItem[] = tableData.filter((item) => selectedIds.includes(item.id));
  const dependentSteps: number[] = [];

  for (const selectedItem of selectedItems) {
    console.log('selectedItem', selectedItem);
    const dependencies = tableData.filter((item) => item.dependentOn?.includes(selectedItem.step)).map((item) => item.step);
    console.log('dependencies', dependencies);
    if (dependencies.length) {
      dependentSteps.push(...dependencies);
    }
  }

  const uniqueDependentSteps = new Set(dependentSteps);
  console.log(uniqueDependentSteps);

  return tableData.filter((item) => uniqueDependentSteps.has(item.step) && !selectedIds.includes(item.id));
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
