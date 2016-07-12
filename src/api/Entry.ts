export interface ISense {
  "@ast"?: string;
  def: string;
  gramGrp?: string;
  usg?: {
    "@type"?: string;
    "#text"?: string;
  };
}

export interface IEntry {
  "@id": string;
  "@n": string;
  "@type"?: string;
  form: {
    orth: string;
    pron?: string;
  };
  sense: ISense[];
}

export interface IDictionaryEntry {
  raw?: IEntry;
  getId: () => string;
  getIndex: () => number;
  getOrthography: () => string;
  getPronunciation: () => string;
  getSenses: () => ISense[];
  id: string;
  word: string;
}

/**
 * [createEntry description]
 * @param  {string}        word    [description]
 * @param  {number|string} id      [description]
 * @param  {any}           content [description]
 * @return {IDictionaryEntry}      [description]
 */
export function createEntry(word: string, id: string = word, entry?: IEntry): IDictionaryEntry {

  function getId() {
    return entry && entry["@id"] || id;
  }

  function getIndex() {
    return entry && entry["@n"] && parseInt(entry["@n"], 10);
  }

  function getOrthography() {
    return entry && entry.form && entry.form.orth || word;
  }

  function getPronunciation() {
    return entry && entry.form && entry.form.pron || "";
  }

  function getSenses() {
    return entry && entry.sense || [];
  }

  return {
    raw: entry,
    getId,
    getIndex,
    getOrthography,
    getPronunciation,
    getSenses,
    id,
    word,
  };
}
