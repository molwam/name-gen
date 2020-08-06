export interface GeneratorSettings {
  gender?: Gender;
  maxChars?: number;
  categories: Category[];
  favouriteChar?: Char;
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
}

export interface NamePart {
  category: Category;
  gender: Gender;
  content: string;
}

export type Name = string;

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
