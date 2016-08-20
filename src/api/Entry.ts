import { IRawEntry, IRawSense } from "./DictionaryAPI";

export interface ISense {
  definition: string;
  grammarGroup: string;
  usage?: string;
}

export interface IEntry {
  etymology?: string;
  id: string;
  index: number;
  pronunciation?: string;
  raw?: IRawEntry;
  senses: ISense[];
  spelling: string;
  word: string;
}

function createSense(sense: IRawSense): ISense {
  return {
    definition: sense.def,
    grammarGroup: sense.gramGrp,
    usage: sense.usg && sense.usg["#text"],
  };
}

/**
 * [createEntry description]
 * @param  {string}        word    [description]
 * @param  {number|string} id      [description]
 * @param  {any}           content [description]
 * @return {IEntry}                [description]
 */
export function createEntry(word: string, rawId: string = word, entry?: IRawEntry): IEntry {
  return {
    etymology: entry && entry.etym && entry.etym["#text"],
    id: entry && entry["@id"] || rawId,
    index: entry && entry["@n"] && parseInt(entry["@n"], 10),
    pronunciation: entry && entry.form && entry.form.pron,
    raw: entry,
    senses: entry && entry.sense.map(createSense) || [],
    spelling: entry && entry.form && entry.form.orth || word,
    word,
  };
}
