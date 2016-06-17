import Entry from "./Entry";

export interface IDictionaryAPIEntry {
  definition: any;
  id: number;
  word: string;
}

/**
 * [define description]
 * @param  {string}                       word [description]
 * @return {Promise<IDictionaryAPIEntry>}      [description]
 *
 * @todo Plug this into an actual API.
 */
export function define(word: string): Promise<IDictionaryAPIEntry> {
  return new Promise(() => new Entry({
    definition: "definition",
    id: 1,
    word: word,
  }));
}

/**
 * [search description]
 * @param  {string}                         query [description]
 * @return {Promise<IDictionaryAPIEntry[]>}       [description]
 *
 * @todo Plug this into an actual API.
 */
export function search(query: string): Promise<IDictionaryAPIEntry[]> {
  return new Promise(() => [
    new Entry({
      definition: "definition",
      id: 1,
      word: "test",
    }),
    new Entry({
      definition: "definition",
      id: 1,
      word: "test",
    }),
    new Entry({
      definition: "definition",
      id: 1,
      word: "test",
    }),
  ]);
}
