import { DirectProofsTableItem } from './interfaces';
import { LocalText } from 'types';

export const findDependentDPItemsToDelete = (selectedIds: string[], tableData: DirectProofsTableItem[]): DirectProofsTableItem[] => {
  const selectedItems: DirectProofsTableItem[] = tableData.filter((item) => selectedIds.includes(item.id));
  const dependentStepsIds: string[] = [];

  for (const selectedItem of selectedItems) {
    const dependencies = tableData.filter((item) => item.dependentOn?.includes(selectedItem.id)).map((item) => item.id);
    if (dependencies.length) {
      dependentStepsIds.push(...dependencies);
    }
  }

  const uniqueIds = new Set(dependentStepsIds);

  return tableData.filter((item) => uniqueIds.has(item.id) && !selectedIds.includes(item.id));
};

export const updateDPTableData = (tableData: DirectProofsTableItem[], idsToFilter: string[]): DirectProofsTableItem[] => {
  return tableData
    .filter((item) => !idsToFilter.includes(item.id))
    .map((item, index) => {
      return {
        ...item,
        step: index + 1,
      };
    });
};

export const updateTableComments = (tableData: DirectProofsTableItem[]): DirectProofsTableItem[] => {
  return tableData.map((item) => {
    let newComment: LocalText | undefined;

    if (item.dependentOn) {
      const [id1, id2] = item.dependentOn;
      const dependency1 = tableData.find((x) => x.id === id1);
      const dependency2 = tableData.find((x) => x.id === id2);

      if (dependency1 && dependency2) {
        newComment = { en: `IE: ${dependency1.step}, ${dependency2.step}`, ru: `УИ: ${dependency1.step}, ${dependency2.step}` };
      }
    }

    return {
      ...item,
      comment: newComment || item.comment,
    };
  });
};
