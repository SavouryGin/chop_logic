import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { LocalText, NPCommentData } from 'types';
import { NPFormulaBase } from 'enums';
import { NaturalProofsTableItem } from 'store/propositions/natural-proofs/interfaces';

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

    switch (item.formulaBase) {
      case NPFormulaBase.DI: {
        newComment = commentsUpdater.updateDIcomment({ item, tableData, defaultComment: item.comment });
        break;
      }

      case NPFormulaBase.CI: {
        newComment = commentsUpdater.updateCIComment({ item, tableData, defaultComment: item.comment });
        break;
      }

      case NPFormulaBase.CE: {
        newComment = commentsUpdater.updateCEComment({ item, tableData, defaultComment: item.comment });
        break;
      }

      case NPFormulaBase.DE: {
        newComment = commentsUpdater.updateDEComment({ item, tableData, defaultComment: item.comment });
        break;
      }

      case NPFormulaBase.NI: {
        newComment = commentsUpdater.updateNIComment({ item, tableData, defaultComment: item.comment });
        break;
      }

      case NPFormulaBase.NE: {
        newComment = commentsUpdater.updateNEComment({ item, tableData, defaultComment: item.comment });
        break;
      }

      case NPFormulaBase.EI: {
        newComment = commentsUpdater.updateEIComment({ item, tableData, defaultComment: item.comment });
        break;
      }

      case NPFormulaBase.EE: {
        newComment = commentsUpdater.updateEEComment({ item, tableData, defaultComment: item.comment });
        break;
      }

      case NPFormulaBase.IE: {
        newComment = commentsUpdater.updateIEComment({ item, tableData, defaultComment: item.comment });
        break;
      }

      case NPFormulaBase.II: {
        newComment = commentsUpdater.updateIIComment({ item, tableData, defaultComment: item.comment });
        break;
      }
    }

    return {
      ...item,
      comment: newComment,
    };
  });
};

export const commentsUpdater = {
  updateDIcomment({ item, tableData, defaultComment }: NPCommentData): LocalText | string {
    if (item.dependentOn?.length) {
      const dependentId = item.dependentOn[0];
      const dependency = tableData.find((x) => x.id === dependentId);
      if (dependency) {
        return { en: `DI: ${dependency.step}`, ru: `ВД: ${dependency.step}` };
      }
    }

    return defaultComment;
  },

  updateCIComment({ item, tableData, defaultComment }: NPCommentData): LocalText | string {
    if (item.dependentOn?.length) {
      const [id1, id2] = item.dependentOn;
      const dependency1 = tableData.find((x) => x.id === id1);
      const dependency2 = tableData.find((x) => x.id === id2);

      if (dependency1 && dependency2) {
        return {
          en: `CI: ${dependency1.step}, ${dependency2.step}`,
          ru: `ВК: ${dependency1.step}, ${dependency2.step}`,
        };
      } else if (dependency1 && !dependency2) {
        return {
          en: `CI: ${dependency1.step}`,
          ru: `ВК: ${dependency1.step}`,
        };
      }
    }

    return defaultComment;
  },

  updateCEComment({ item, tableData, defaultComment }: NPCommentData): LocalText | string {
    if (item.dependentOn?.length) {
      const [id] = item.dependentOn;
      const dependency = tableData.find((x) => x.id === id);

      if (dependency) {
        return {
          en: `CE: ${dependency.step}`,
          ru: `УК: ${dependency.step}`,
        };
      }
    }

    return defaultComment;
  },

  updateDEComment({ item, tableData, defaultComment }: NPCommentData): LocalText | string {
    if (item.dependentOn?.length) {
      const [id1, id2, id3] = item.dependentOn;
      const dependency1 = tableData.find((x) => x.id === id1);
      const dependency2 = tableData.find((x) => x.id === id2);
      const dependency3 = tableData.find((x) => x.id === id3);

      if (dependency1 && dependency2 && dependency3) {
        return {
          en: `DE: ${dependency1.step}, ${dependency2.step}, ${dependency3.step}`,
          ru: `УД: ${dependency1.step}, ${dependency2.step}, ${dependency3.step}`,
        };
      }
    }

    return defaultComment;
  },

  updateNIComment({ item, tableData, defaultComment }: NPCommentData): LocalText | string {
    if (item.dependentOn?.length) {
      const [id1, id2] = item.dependentOn;
      const dependency1 = tableData.find((x) => x.id === id1);
      const dependency2 = tableData.find((x) => x.id === id2);

      if (dependency1 && dependency2) {
        return {
          en: `NI: ${dependency1.step}, ${dependency2.step}`,
          ru: `BO: ${dependency1.step}, ${dependency2.step}`,
        };
      }
    }

    return defaultComment;
  },

  updateNEComment({ item, tableData, defaultComment }: NPCommentData): LocalText | string {
    if (item.dependentOn?.length) {
      const [id] = item.dependentOn;
      const dependency = tableData.find((x) => x.id === id);

      if (dependency) {
        return {
          en: `NE: ${dependency.step}`,
          ru: `УО: ${dependency.step}`,
        };
      }
    }

    return defaultComment;
  },

  updateEIComment({ item, tableData, defaultComment }: NPCommentData): LocalText | string {
    if (item.dependentOn?.length) {
      const [id1, id2] = item.dependentOn;
      const dependency1 = tableData.find((x) => x.id === id1);
      const dependency2 = tableData.find((x) => x.id === id2);

      if (dependency1 && dependency2) {
        return {
          en: `EI: ${dependency1.step}, ${dependency2.step}`,
          ru: `ВЭ: ${dependency1.step}, ${dependency2.step}`,
        };
      }
    }

    return defaultComment;
  },

  updateEEComment({ item, tableData, defaultComment }: NPCommentData): LocalText | string {
    if (item.dependentOn?.length) {
      const [id] = item.dependentOn;
      const dependency = tableData.find((x) => x.id === id);

      if (dependency) {
        return {
          en: `EE: ${dependency.step}`,
          ru: `УЭ: ${dependency.step}`,
        };
      }
    }

    return defaultComment;
  },

  updateIEComment({ item, tableData, defaultComment }: NPCommentData): LocalText | string {
    if (item.dependentOn?.length) {
      const [id1, id2] = item.dependentOn;
      const dependency1 = tableData.find((x) => x.id === id1);
      const dependency2 = tableData.find((x) => x.id === id2);

      if (dependency1 && dependency2) {
        return {
          en: `IE: ${dependency1.step}, ${dependency2.step}`,
          ru: `УИ: ${dependency1.step}, ${dependency2.step}`,
        };
      }
    }

    return defaultComment;
  },

  updateIIComment({ item, tableData, defaultComment }: NPCommentData): LocalText | string {
    if (item.dependentOn?.length) {
      const [id1, id2] = item.dependentOn;
      const dependency1 = tableData.find((x) => x.id === id1);
      const dependency2 = tableData.find((x) => x.id === id2);

      if (dependency1 && dependency2) {
        return {
          en: `II: ${dependency1.step}, ${dependency2.step}`,
          ru: `ВИ: ${dependency1.step}, ${dependency2.step}`,
        };
      } else if (dependency1 && !dependency2) {
        return {
          en: `II: ${dependency1.step}`,
          ru: `ВИ: ${dependency1.step}`,
        };
      }
    }

    return defaultComment;
  },
};
