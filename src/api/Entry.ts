interface IEntryRaw {
  definition?: any;
  id?: number;
  word?: string;
}

export interface IEntry {
  content?: any;
  id: number | string;
  name: string;
}

/**
 * Dictionary entry creator.
 * @param  {any}    item  Raw entry item data.
 * @return {IEntry}       Entry instance.
 *
 * @todo Turn whatever's returned from the API into a consistent object.
 */
export function createEntry(item?: IEntryRaw): IEntry {
  return {
    content: item && item.definition || "",
    id: item && item.id || 0,
    name: item && item.word || "",
  };
}
