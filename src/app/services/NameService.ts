import { nameParts, NamePartTree } from "../data/NameParts";
import {
  Char,
  Category,
  Name,
  NamePart,
  GeneratorSettings,
  Gender,
} from "../../types";

let dataTree: NamePartTree;
let nextNames: Name[];
let currentNameIndex: number;

export const init = () => {
  updateNameTree();
  nextNames = [];
  currentNameIndex = 0;
};

export const updateNameTree = () => {
  dataTree = buildNameDataTree();
};

const buildNameDataTree = () => {
  return nameParts.reduce(
    (tree, catNamePart) => {
      const startingChar = catNamePart.content1.charAt(0).toLowerCase() as Char;
      addNameDataTreeEntry(tree, catNamePart, catNamePart.category);
      addNameDataTreeEntry(tree, catNamePart, Category.All);
      return tree;
    },
    {
      data: {},
    } as NamePartTree
  );
};

const addNameDataTreeEntry = (
  tree: NamePartTree,
  entry: NamePart,
  category: Category
) => {
  const startingChar = entry.content1.charAt(0).toLowerCase() as Char;

  if (!tree.data[category]) {
    tree.data[category] = { all: [], byChar: {} };
  }
  tree.data[category]!.all.push(entry);

  if (!tree.data[category]!.byChar[startingChar]) {
    tree.data[category]!.byChar[startingChar] = [];
  }
  tree.data[category]!.byChar[startingChar]!.push(entry);
};

export const generateNextNames = (settings: GeneratorSettings) => {
  const possibleFirstParts = getFilterdNameTreeBranch(
    settings.category1,
    1,
    settings.firstChar,
    settings.maxChars,
    undefined
  );
  const possibleSecondParts = getFilterdNameTreeBranch(
    settings.category2,
    2,
    settings.isAnagram ? settings.firstChar : undefined,
    settings.maxChars,
    settings.gender
  );

  nextNames =
    possibleFirstParts &&
    possibleFirstParts.length !== 0 &&
    possibleSecondParts &&
    possibleSecondParts.length !== 0
      ? shuffleArray(
          matchNameParts(
            possibleFirstParts,
            possibleSecondParts,
            settings.isAnagram,
            settings.maxChars
          )
        )
      : [];
};

const getFilterdNameTreeBranch = (
  category: Category,
  namePartIndex: 1 | 2,
  char?: Char,
  maxLength?: number,
  gender?: Gender
) => {
  const catNameParts = dataTree.data[category];
  if (!catNameParts) return [];
  const charNameParts = char ? catNameParts.byChar[char] : catNameParts.all;
  return charNameParts?.filter(
    (namePart) =>
      (namePartIndex === 1
        ? !maxLength || namePart.content1.length <= maxLength
        : !maxLength || namePart.content2.length <= maxLength) &&
      (!gender || namePart.gender === gender)
  );
};

const matchNameParts = (
  firstNameParts: NamePart[],
  secondNameParts: NamePart[],
  isAnagram: boolean,
  maxChars?: number
): Name[] => {
  return firstNameParts.reduce((Names, firstNamePart) => {
    secondNameParts.forEach((secondNamePart) => {
      if (
        (isAnagram &&
          firstNamePart.content1[0].toLowerCase() !==
            secondNamePart.content2[0].toLowerCase()) ||
        firstNamePart.content1 === secondNamePart.content1
      )
        return;
      const nameContent =
        firstUpper(firstNamePart.content1) +
        firstUpper(secondNamePart.content2);
      if (maxChars && maxChars < nameContent.length) return;
      Names.push({
        firstPart: firstUpper(firstNamePart.content1),
        secondPart: firstUpper(secondNamePart.content2),
        fullName: nameContent,
      });
    });
    return Names;
  }, [] as Name[]);
};

export const getNextName = () => {
  if (nextNames.length === 0) {
    return undefined;
  }
  currentNameIndex = (currentNameIndex + 1) % nextNames.length;
  console.log(currentNameIndex);

  return nextNames[currentNameIndex];
};

const firstUpper = (string: string) => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
