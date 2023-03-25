import Latex from 'react-latex';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import latex from 'texts/propositions/latex-expressions';
import { CommonProps } from 'types';

const NPHeuristicsRu = (props: CommonProps): React.ReactElement => {
  return (
    <ol className={formatClass([props.className])}>
      <li>
        Если цель &#8212; доказать формулу вида <Latex>{latex.FtoG}</Latex>, следует ввести гипотезу <Latex>{latex.F}</Latex> и в
        открывшемся под-доказательстве попытаться вывести <Latex>{latex.G}</Latex>. Затем нужно использовать правило{' '}
        <abbr
          title='Введение
        импликации'
        >
          ВИ
        </abbr>{' '}
        на первой и последней формулах под-доказательства, чтобы получить <Latex>{latex.FtoG}</Latex>.
      </li>
      <li>
        Если цель &#8212; доказать формулу вида <Latex>{latex.FandG}</Latex>, то сначала нужно вывести формулу <Latex>{latex.F}</Latex>, а
        затем &#8212; формулу <Latex>{latex.G}</Latex>. Если вывод обеих формул удался, нужно применить на них правило{' '}
        <abbr title='Введение конъюнкции'>ВК</abbr>, чтобы получить <Latex>{latex.FandG}</Latex>.
      </li>
      <li>
        Если цель &#8212; доказать формулу <Latex>{latex.ForG}</Latex>, то необходимо вывести хотя бы одну из формул{' '}
        <Latex>{latex.F}</Latex> или <Latex>{latex.G}</Latex>. Как только получен вывод одной из формул, можно получить дизъюнкцию данной
        формулы с любой другой формулой по правилу <abbr title='Введение дизъюнкции'>ВД</abbr>.
      </li>
      <li>
        Если цель &#8212; доказать формулу вида <Latex>{latex.notF}</Latex>, следует ввести гипотезу <Latex>{latex.F}</Latex> и вывести в
        под-доказательстве противоречие, то есть две формулы: <Latex>{latex.FtoG}</Latex> и <Latex>{latex.FtoNotG}</Latex>. Как только
        противоречие получено, правило <abbr title='Введение отрицания'>ВО</abbr> даст нам искомую <Latex>{latex.notF}</Latex>.
      </li>
      <li>
        Если дана посылка в виде <Latex>{latex.FtoG}</Latex> и цель &#8212; доказать <Latex>{latex.G}</Latex>, нужно сначала вывести{' '}
        <Latex>{latex.F}</Latex>. Если вывод удался, то формулу <Latex>{latex.G}</Latex> можно получить по правилу{' '}
        <abbr
          title='Удаление
        импликации'
        >
          УИ
        </abbr>
        .
      </li>
      <li>
        Если дана посылка в виде <Latex>{latex.ForG}</Latex> и цель &#8212; вывести <Latex>{latex.H}</Latex>, то следует сначала доказать,
        что <Latex>{latex.FtoH}</Latex>, а затем &#8212; <Latex>{latex.GtoH}</Latex>. На этих двух формулах и исходной дизъюнктивной посылке
        следует использовать правило <abbr title='Удаление дизъюнкции'>УД</abbr>, чтобы получить <Latex>{latex.H}</Latex>.
      </li>
    </ol>
  );
};

export default NPHeuristicsRu;
