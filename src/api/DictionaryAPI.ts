import { createEntry, IEntry } from "./Entry";

/**
 * [define description]
 * @param  {string}                       word [description]
 * @return {Promise<IEntry>}      [description]
 *
 * @todo Plug this into an actual API.
 */
export function define(word: string): Promise<IEntry> {
  return new Promise(
    (resolve) => resolve(
      createEntry({
        definition: "definition",
        id: 1,
        word: word,
      })
    )
  );
}

/**
 * [search description]
 * @param  {string}                         query [description]
 * @return {Promise<IEntry[]>}       [description]
 *
 * @todo Plug this into an actual API.
 */
export function search(query: string): Promise<IEntry[]> {
  return new Promise(
    (resolve) => resolve([
      createEntry({
        definition: "definition",
        id: 1,
        word: "test",
      }),
      createEntry({
        definition: "definition",
        id: 1,
        word: "test",
      }),
      createEntry({
        definition: "definition",
        id: 1,
        word: "test",
      }),
    ])
  );
}
