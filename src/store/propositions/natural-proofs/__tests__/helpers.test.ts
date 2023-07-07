import propositionsTableItems from '__mocks__/data/propositions/table-items';
import { findDependentDPItemsToDelete, findDependentNPItemsToDelete } from 'logic/propositions/helpers';

describe('Propositions store utils tests', () => {
  it('findDependentDPItemsToDelete() test', () => {
    expect(findDependentDPItemsToDelete([propositionsTableItems.dpTableDataIE[0].id], propositionsTableItems.dpTableDataIE)).toEqual([
      propositionsTableItems.dpTableDataIE[2],
    ]);

    expect(findDependentDPItemsToDelete([propositionsTableItems.dpTableDataIE[1].id], propositionsTableItems.dpTableDataIE)).toEqual([
      propositionsTableItems.dpTableDataIE[2],
    ]);

    expect(findDependentDPItemsToDelete([propositionsTableItems.dpTableDataIE[2].id], propositionsTableItems.dpTableDataIE)).toEqual([]);
  });

  it('findDependentNPItemsToDelete() test', () => {
    expect(
      findDependentNPItemsToDelete(
        [propositionsTableItems.npTableEIandEE[2].id, propositionsTableItems.npTableEIandEE[3].id],
        propositionsTableItems.npTableEIandEE,
      ),
    ).toEqual([propositionsTableItems.npTableEIandEE[4], propositionsTableItems.npTableEIandEE[5]]);

    expect(findDependentNPItemsToDelete([propositionsTableItems.npTableEIandEE[4].id], propositionsTableItems.npTableEIandEE)).toEqual([]);
  });
});
