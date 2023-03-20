import Latex from 'react-latex';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import latex from 'texts/propositions/latex-expressions';
import { CommonProps } from 'types';

const NPDefinitionsRu = ({ className }: CommonProps): React.ReactElement => {
  const definitionClass = formatClass([{ [`${className}_definition-block`]: !!className }]);

  const derivationProperties = (
    <div className={definitionClass}>
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

  const deductionTheorem = (
    <div className={definitionClass}>
      <dfn>Теорема о дедукции</dfn>. Если в некоторой формальной теории из множества формул <Latex>{latex.F1FnMinus1Fn}</Latex> выводима
      формула <Latex>{latex.G}</Latex>, то из множества <Latex>{latex.F1FnMinus1}</Latex> выводима формула <Latex>{latex.FnToG}</Latex>.
      Краткая запись:
      <div>
        Если <Latex>{latex.F1FnMinus1FnDashG}</Latex>, то <Latex>{latex.F1FnMinus1FnDashToG}</Latex>.
      </div>
      В частности, если <Latex>{latex.FdashG}</Latex>, то <Latex>{latex.dashFtoG}</Latex>.
    </div>
  );

  const npTheory = (
    <div className={definitionClass}>
      Исчисление высказываний натурального вывода отличается от аксиоматического исчисления тем, что в нем нет формул, считающихся
      аксиомами, и в нём больше правил вывода, компенсирующих отсутствие аксиом. В натуральном исчислении все необходимые посылки для
      применения правил вывода можно задать внутри доказательства в качестве гипотез. Вводя гипотезу, мы открываем под-доказательство, то
      есть вложенную ветку логического вывода.<br></br>Для вложенного доказательства действуют те же самые правила, что и для основного.
      Выйти из под-доказательства в основное можно с помощью особого правила вывода <abbr title='Введение импликации'>ВИ</abbr>. Это правило
      представляет собой частный случай теоремы о дедукции: если, сделав предположение <Latex>{latex.F}</Latex>, мы смогли вывести из него{' '}
      <Latex>{latex.G}</Latex>, то мы доказали <Latex>{latex.FtoG}</Latex>.<br></br>Внутри под-доказательства можно сделать еще одну
      гипотезу и открыть таким образом под-под-доказательство. Внутри него &#8212; еще одно рассуждение и т.д. Уровней вложенности может
      быть сколько угодно. Тем не менее в конце мы должны выйти изо всех вложенных доказательств в основную ветку рассуждения.<br></br>
      Поскольку доказательства в натуральном исчислении, в отличие от линейных доказательств аксиоматических теорий, имеют уровни
      вложенности, их называют <em>структурными доказательствами</em>.
    </div>
  );

  return (
    <div className={formatClass([className])}>
      {derivationProperties}
      <hr></hr>
      {deductionTheorem}
      <hr></hr>
      {npTheory}
    </div>
  );
};

export default NPDefinitionsRu;
