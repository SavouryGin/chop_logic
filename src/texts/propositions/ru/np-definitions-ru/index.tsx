import Latex from 'react-latex';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import latex from 'texts/propositions/latex-expressions';
import { CommonProps } from 'types';

const NPDefinitionsRu = ({ className }: CommonProps): React.ReactElement => {
  const derivationProperties = (
    <div className={formatClass([{ [`${className}_definition-block`]: !!className }])}>
      <dfn>Свойства отношения выводимости</dfn>. Пусть <Latex>{latex.Gamma}</Latex> и <Latex>{latex.Delta}</Latex> &#8212; некоторые
      подмножества множества формул формальной теории, а <Latex>{latex.F}</Latex> и <Latex>{latex.G}</Latex> &#8212; некоторые формулы этой
      теории. Тогда:
      <ol>
        <li>
          если <Latex>{latex.GammaDashF}</Latex> и <Latex>{latex.GammaSubsetDelta}</Latex>, то <Latex>{latex.DeltaDashF}</Latex>;
        </li>
        <li>
          <Latex>{latex.GammaDashF}</Latex> тогда и только тогда, когда в <Latex>{latex.Gamma}</Latex> найдется такое конечное подмножество{' '}
          <Latex>{latex.Delta}</Latex>, что <Latex>{latex.DeltaDashF}</Latex>;
        </li>
        <li>
          если для любой формулы <Latex>{latex.G}</Latex> из множества <Latex>{latex.Delta}</Latex> справедливо, что{' '}
          <Latex>{latex.GammaDashG}</Latex> и <Latex>{latex.DeltaDashF}</Latex>, то <Latex>{latex.GammaDashF}</Latex>.
        </li>
      </ol>
    </div>
  );

  return <div className={formatClass([className])}>{derivationProperties}</div>;
};

export default NPDefinitionsRu;
