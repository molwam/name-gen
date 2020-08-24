export interface GeneratorSettings {
  gender?: Gender;
  maxChars?: number;
  category1: Category;
  category2: Category;
  firstChar?: Char;
  isAnagram: boolean;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Neutral = "Neutral",
}

export enum Category {
  Profession = "Profession",
  Title = "Title",
  Food = "Food",
  All = "All",
}

export interface NamePart {
  category: Category;
  gender: Gender;
  content1: string;
  content2: string;
}

export interface Name {
  fullName: string;
  firstPart: string;
  secondPart: string;
}

export type NameHistory = Name[];

export type Char =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | "ä"
  | "ü"
  | "ö";
