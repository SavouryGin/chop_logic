import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';

const converterJS = {
  xmlToDPTableData(input: string): DirectProofsTableItem[] {
    console.log('XML input', input);

    return [];
  },
};

export default Object.freeze(converterJS);
