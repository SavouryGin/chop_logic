import { DirectProofsTableItem } from './direct-proofs/interfaces';
import { LocalText } from 'types';
import { NPFormulaBase } from 'enums';
import { NaturalProofsTableItem } from './natural-proofs/interfaces';

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

export const findDependentNPItemsToDelete = (selectedIds: string[], tableData: NaturalProofsTableItem[]): NaturalProofsTableItem[] => {
  const selectedItems: NaturalProofsTableItem[] = tableData.filter((item) => selectedIds.includes(item.id));
  const dependentStepsIds: string[] = [];

  for (const selectedItem of selectedItems) {
    if (selectedItem.formulaBase === NPFormulaBase.Assumption) {
      const assumptionLevel = selectedItem.level;
      const dependencies = tableData.filter((item) => item.level >= assumptionLevel).map((item) => item.id);
      if (dependencies.length) {
        dependentStepsIds.push(...dependencies);
      }
    } else {
      const dependencies = tableData.filter((item) => item.dependentOn?.includes(selectedItem.id)).map((item) => item.id);
      if (dependencies.length) {
        dependentStepsIds.push(...dependencies);
      }
    }
  }

  const uniqueIds = new Set(dependentStepsIds);

  return tableData.filter((item) => uniqueIds.has(item.id) && !selectedIds.includes(item.id));
};

export const removeSelectedItemsFromTable = <T extends { id: string }>(tableData: T[], idsToFilter: string[]): T[] => {
  return tableData
    .filter((item) => !idsToFilter.includes(item.id))
    .map((item, index) => {
      return {
        ...item,
        step: index + 1,
      };
    });
};

export const updateDPTableComments = (tableData: DirectProofsTableItem[]): DirectProofsTableItem[] => {
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

export const updateNPTableComments = (tableData: NaturalProofsTableItem[]): NaturalProofsTableItem[] => {
  return tableData.map((item) => {
    let newComment = item.comment;

    // TODO: update dependent comments
    switch (item.formulaBase) {
      case NPFormulaBase.DI: {
        if (item.dependentOn?.length) {
          const dependentId = item.dependentOn[0];
          const dependency = tableData.find((x) => x.id === dependentId);
          if (dependency) {
            newComment = { en: `DI: ${dependency.step}`, ru: `ВД: ${dependency.step}` };
          }
        }
        break;
      }

      case NPFormulaBase.DE: {
        if (item.dependentOn?.length) {
          const [id1, id2, id3] = item.dependentOn;
          const dependency1 = tableData.find((x) => x.id === id1);
          const dependency2 = tableData.find((x) => x.id === id2);
          const dependency3 = tableData.find((x) => x.id === id3);

          if (dependency1 && dependency2 && dependency3) {
            newComment = {
              en: `DE: ${dependency1.step}, ${dependency2.step}, ${dependency3.step}`,
              ru: `УД: ${dependency1.step}, ${dependency2.step}, ${dependency3.step}`,
            };
          }
        }
      }
    }

    return {
      ...item,
      comment: newComment,
    };
  });
};
