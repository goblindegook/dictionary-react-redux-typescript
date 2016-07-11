export interface IEntry {
  content?: any;
  id: string;
  word: string;
}

/**
 * [createEntry description]
 * @param  {string}        word    [description]
 * @param  {number|string} id      [description]
 * @param  {any}           content [description]
 * @return {IEntry}                [description]
 */
export function createEntry(word: string, id: string = word, content?: {}): IEntry {
  return {
    content,
    id,
    word,
  };
}
