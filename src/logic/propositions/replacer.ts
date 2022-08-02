import { DirectProofsTableItem } from 'store/propositions/interfaces';

const replacer = {
  replacePropositionalVariableInTableItems(data: DirectProofsTableItem[], variable: string): DirectProofsTableItem[] {
    console.log(data);
    console.log(variable);

    return data;
  },
};

export default replacer;
