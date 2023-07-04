import { ButtonID } from 'enums';
import { ButtonText } from 'types';

export const buttonTexts: ButtonText = {
  [ButtonID.Cancel]: {
    title: { en: 'Cancel', ru: 'Отмена' },
  },
  [ButtonID.Navigation]: {
    title: { en: 'Navigation', ru: 'Навигация' },
  },
  [ButtonID.ColorTheme]: {
    title: { en: 'Color Theme', ru: 'Цветовая тема' },
  },
  [ButtonID.Sounds]: {
    title: { en: 'Sounds', ru: 'Звуки' },
  },
  [ButtonID.Settings]: {
    title: { en: 'Settings', ru: 'Настройки' },
  },
  [ButtonID.FullScreen]: {
    title: { en: 'Full Screen', ru: 'Полный экран' },
  },
  [ButtonID.Tools]: {
    title: { en: 'Tools', ru: 'Инструменты' },
  },
  [ButtonID.Apply]: {
    title: { en: 'Apply', ru: 'Применить' },
    innerText: { en: 'Apply', ru: 'Применить' },
  },
  [ButtonID.Premise]: {
    title: { en: 'Enter a premise', ru: 'Ввести посылку' },
    innerText: { en: 'Premise', ru: 'Посылка' },
  },
  [ButtonID.Reiteration]: {
    title: { en: 'Reiterate proof step(s)', ru: 'Повторить шаг доказательства' },
    innerText: { en: 'Reiteration', ru: 'Повтор' },
  },
  [ButtonID.Replace]: {
    title: { en: 'Replace a symbol', ru: 'Заменить символ' },
    innerText: { en: 'Replace', ru: 'Заменить' },
  },
  [ButtonID.Delete]: {
    title: { en: 'Delete the proof step(s)', ru: 'Удалить шаг доказательства' },
    innerText: { en: 'Delete', ru: 'Удалить' },
  },
  [ButtonID.ImplicationCreation]: {
    title: { en: 'Implication Creation', ru: 'Введение импликации' },
    innerText: { en: 'IC', ru: 'ВИ' },
  },
  [ButtonID.ImplicationDistribution]: {
    title: { en: 'Implication Distribution', ru: 'Дистрибуция импликации' },
    innerText: { en: 'ID', ru: 'ДИ' },
  },
  [ButtonID.ContradictionRealization]: {
    title: { en: 'Contradiction Realization', ru: 'Создание противоречия' },
    innerText: { en: 'CR', ru: 'СП' },
  },
  [ButtonID.ImplicationElimination]: {
    title: { en: 'Implication Elimination', ru: 'Удаление импликации' },
    innerText: { en: 'IE', ru: 'УИ' },
  },
  [ButtonID.Assumption]: {
    title: { en: 'Enter an assumption', ru: 'Ввести гипотезу' },
    innerText: { en: 'Assumption', ru: 'Гипотеза' },
  },
  [ButtonID.NotIntroduction]: {
    title: { en: 'Negation Introduction', ru: 'Введение отрицания' },
    innerText: { en: `NI`, ru: `ВО` },
  },
  [ButtonID.NotElimination]: {
    title: { en: 'Negation Elimination', ru: 'Удаление отрицания' },
    innerText: { en: `NE`, ru: `УО` },
  },
  [ButtonID.AndIntroduction]: {
    title: { en: 'Conjunction Introduction', ru: 'Введение конъюнкции' },
    innerText: { en: `CI`, ru: `ВК` },
  },
  [ButtonID.AndElimination]: {
    title: { en: 'Conjunction Elimination', ru: 'Удаление конъюнкции' },
    innerText: { en: `CE`, ru: `УК` },
  },
  [ButtonID.OrIntroduction]: {
    title: { en: 'Disjunction Introduction', ru: 'Введение дизъюнкции' },
    innerText: { en: `DI`, ru: `ВД` },
  },
  [ButtonID.OrElimination]: {
    title: { en: 'Disjunction Elimination', ru: 'Удаление дизъюнкции' },
    innerText: { en: `DE`, ru: `УД` },
  },
  [ButtonID.ImpliesIntroduction]: {
    title: { en: 'Implication Introduction', ru: 'Введение импликации' },
    innerText: { en: `II`, ru: `ВИ` },
  },
  [ButtonID.ImpliesElimination]: {
    title: { en: 'Implication Elimination', ru: 'Удаление импликации' },
    innerText: { en: `IE`, ru: `УИ` },
  },
  [ButtonID.EquivIntroduction]: {
    title: { en: 'Equivalence Introduction', ru: 'Введение эквивалентности' },
    innerText: { en: `EI`, ru: `ВЭ` },
  },
  [ButtonID.EquivElimination]: {
    title: { en: 'Equivalence Elimination', ru: 'Удаление эквивалентности' },
    innerText: { en: `EE`, ru: `УЭ` },
  },
  [ButtonID.Shortcut]: {
    title: { en: 'Create a shortcut', ru: 'Добавить краткий вывод' },
    innerText: { en: 'Shortcut', ru: 'Кр. вывод' },
  },
  [ButtonID.SavePDF]: {
    title: { en: 'Export proof in PDF', ru: 'Скачать доказательство в PDF' },
  },
  [ButtonID.ExportXML]: {
    title: { en: 'Export proof in XML', ru: 'Скачать доказательство в XML' },
    innerText: { en: 'Export', ru: 'Экспорт' },
  },
  [ButtonID.ImportXML]: {
    title: { en: 'Import proof from XML', ru: 'Импортировать доказательство из XML' },
    innerText: { en: 'Import', ru: 'Импорт' },
  },
  [ButtonID.CopyProof]: {
    title: { en: 'Copy the selected proof steps', ru: 'Копировать выделенные шаги доказательства' },
    innerText: { en: 'Copy', ru: 'Копировать' },
  },
  [ButtonID.PasteProof]: {
    title: { en: 'Paste the copied proof steps', ru: 'Вставить выделенные шаги доказательства' },
    innerText: { en: 'Paste', ru: 'Вставить' },
  },
  [ButtonID.CutProof]: {
    title: { en: 'Cut the copied proof steps', ru: 'Вырезать выделенные шаги доказательства' },
    innerText: { en: 'Cut', ru: 'Вырезать' },
  },
  [ButtonID.Reset]: {
    title: { en: 'Reset values', ru: 'Очистить значения' },
    innerText: { en: 'Reset', ru: 'Очистить' },
  },
};
