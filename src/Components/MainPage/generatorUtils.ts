import * as Data from "../../Data/NameParts";
import * as Types from "../../types";

function drawRandomFromArray<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const firstUpper = (string: string) => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};

export const generateName = (
  settings: Types.GeneratorSettings,
  dataTree: Data.NamePartTree
) => {
  const filteredNamePartTree = buildFilteredNamePartTree(settings, dataTree);

  if (
    filteredNamePartTree === {} ||
    (settings.favouriteChar && !filteredNamePartTree[settings.favouriteChar])
  ) {
    return undefined;
  }
  let possibleName = "";
  while (
    (settings.maxChars && possibleName.length > settings.maxChars) ||
    !(possibleName.length > 0)
  ) {
    const favChar = settings.favouriteChar
      ? settings.favouriteChar
      : drawRandomFromArray(Object.keys(filteredNamePartTree) as Types.Char[]);

    possibleName = settings.categories.reduce((result, category) => {
      const newRes = result.concat(
        firstUpper(
          drawRandomFromArray(filteredNamePartTree[favChar]![category]!).content
        )
      );
      return newRes;
    }, "");
  }
  return possibleName;
};

const buildFilteredNamePartTree = (
  settings: Types.GeneratorSettings,
  dataTree: Data.NamePartTree
) => {
  const mergedNamePartTree = mergeNamePartTreeBySettings(settings, dataTree);
  const result = {} as {
    [char in Types.Char]?: { [cat in Types.Category]?: Types.NamePart[] };
  };
  Object.entries(mergedNamePartTree).forEach(([char, namePartsByCat]) => {
    if (
      namePartsByCat &&
      Object.keys(namePartsByCat).length === settings.categories.length
    ) {
      result[char as Types.Char] = namePartsByCat;
    }
  });
  return result;
};

const namePartFitsSettings = (
  namePart: Types.NamePart,
  settings: Types.GeneratorSettings
): boolean => {
  if (settings.gender) {
    if (
      (settings.gender === Types.Gender.Female &&
        namePart.gender === Types.Gender.Male) ||
      (settings.gender === Types.Gender.Male &&
        namePart.gender === Types.Gender.Female)
    ) {
      return false;
    }
  }
  if (settings.maxChars && settings.maxChars < namePart.content.length) {
    return false;
  }
  if (
    settings.favouriteChar &&
    settings.favouriteChar !== namePart.content.charAt(0).toLowerCase()
  ) {
    return false;
  }
  let foundCat = false;
  for (const cat of settings.categories) {
    if (cat === namePart.category) {
      foundCat = true;
      break;
    }
  }
  return foundCat;
};

const filterNameParts = (
  settings: Types.GeneratorSettings,
  nameParts: Types.NamePart[] | undefined
) => {
  if (!nameParts || nameParts === []) return [];
  return nameParts.reduce((result, namePart) => {
    return namePartFitsSettings(namePart, settings)
      ? result.concat([namePart])
      : result;
  }, [] as Types.NamePart[]);
};

const cleanNamePartsByChar = (
  settings: Types.GeneratorSettings,
  namePartsByChar: { [char in Types.Char]?: Types.NamePart[] }
) => {
  const result = {} as { [char in Types.Char]?: Types.NamePart[] };
  for (let [char, nameParts] of Object.entries(namePartsByChar)) {
    const filteredNameParts = filterNameParts(settings, nameParts);
    if (filteredNameParts.length > 0) {
      result[char as Types.Char] = filteredNameParts;
    }
  }
  return result;
};

const mergeNamePartTreeBySettings = (
  settings: Types.GeneratorSettings,
  dataTree: Data.NamePartTree
) => {
  const result: {
    [char in Types.Char]?: { [cat in Types.Category]?: Types.NamePart[] };
  } = {};

  for (let [category, namePartsByChar] of Object.entries(dataTree.data)) {
    if (namePartsByChar) {
      const cleanedNamePartsByChar = cleanNamePartsByChar(
        settings,
        namePartsByChar
      );
      for (let [char, nameParts] of Object.entries(cleanedNamePartsByChar)) {
        if (!result[char as Types.Char]) {
          result[char as Types.Char] = {};
        }
        result[char as Types.Char]![category as Types.Category] = nameParts;
      }
    }
  }

  return result;
};
