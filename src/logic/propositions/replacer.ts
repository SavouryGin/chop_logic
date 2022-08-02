import { DirectProofsTableItem } from 'store/propositions/interfaces';

const replacer = {
  replacePropositionalVariableInTableItems(
    data: DirectProofsTableItem[],
    newVariable: string,
    oldVariable: string,
  ): DirectProofsTableItem[] {
    console.log(data);

    return data.map((item) => this.replacePropositionalVariableInItem(item, newVariable, oldVariable));
  },

  replacePropositionalVariableInItem(item: DirectProofsTableItem, newVariable: string, oldVariable: string): DirectProofsTableItem {
    console.log(newVariable, oldVariable);

    return {
      ...item,
    };
  },
};

export default replacer;
