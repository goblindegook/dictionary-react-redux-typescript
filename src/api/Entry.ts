import { IRawEntry, IRawSense } from "./DictionaryAPI"

interface ISense {
  definition: string
  grammarGroup: string
  usage?: string
}

export interface IEntry {
  etymology?: string
  id: string
  index: number
  pronunciation?: string
  raw?: IRawEntry
  senses: ISense[]
  spelling: string
  word: string
}

function createSense(sense: IRawSense): ISense {
  return {
    definition: sense.def,
    grammarGroup: sense.gramGrp,
    usage: sense.usg && sense.usg["#text"],
  }
}

/**
 * Create an entry stub.
 * @param  {string} word  Entry term.
 * @param  {string} rawId Entry ID.
 * @return {IEntry}       Entry object.
 */
export function createEntryStub(word: string, rawId?: string): IEntry
export function createEntryStub(word: string, rawId: string = word): IEntry {
  return {
    id: rawId,
    index: 0,
    senses: [],
    spelling: word,
    word,
  }
}

/**
 * Create an entry stub or full entry.
 * @param  {string}    word  Entry term.
 * @param  {string}    rawId Entry ID.
 * @param  {IRawEntry} entry Raw data from the dictionary API.
 * @return {IEntry}          Entry object.
 */
export function createEntry(word: string, rawId: string = word, entry?: IRawEntry): IEntry {
  if (entry == null) {
    return createEntryStub(word, rawId)
  }

  return {
    etymology: entry.etym && entry.etym["#text"],
    id: entry["@id"] || rawId,
    index: parseInt(entry["@n"] || "", 10),
    pronunciation: entry.form && entry.form.pron,
    raw: entry,
    senses: entry.sense.map(createSense) || [],
    spelling: entry.form && entry.form.orth || word,
    word,
  }
}
