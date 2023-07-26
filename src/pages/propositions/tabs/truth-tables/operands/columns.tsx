import Latex from 'react-latex';
import React from 'react';
import latex from 'utils/texts/propositions/latex-expressions';
import { TableColumn } from 'types';

export const TRUTH_TABLES_OPERANDS_COLUMNS: TableColumn[] = [
  { field: 'f0', headerComponent: <Latex>{latex.constantFalse}</Latex> },
  { field: 'f1', headerComponent: <Latex>{latex.and}</Latex> },
  { field: 'f2', headerComponent: <Latex>{latex.notImplication}</Latex> },
  { field: 'f3', headerComponent: <Latex>{latex.constantP}</Latex> },
  { field: 'f4', headerComponent: <Latex>{latex.notBackImplication}</Latex> },
  { field: 'f5', headerComponent: <Latex>{latex.constantQ}</Latex> },
  { field: 'f6', headerComponent: <Latex>{latex.nor}</Latex> },
  { field: 'f7', headerComponent: <Latex>{latex.or}</Latex> },
  { field: 'f8', headerComponent: <Latex>{latex.pierce}</Latex> },
  { field: 'f9', headerComponent: <Latex>{latex.equivalence}</Latex> },
  { field: 'f10', headerComponent: <Latex>{latex.notQ}</Latex> },
  { field: 'f11', headerComponent: <Latex>{latex.implication}</Latex> },
  { field: 'f12', headerComponent: <Latex>{latex.notP}</Latex> },
  { field: 'f13', headerComponent: <Latex>{latex.backImplication}</Latex> },
  { field: 'f14', headerComponent: <Latex>{latex.sheffer}</Latex> },
  { field: 'f15', headerComponent: <Latex>{latex.constantFalse}</Latex> },
];
