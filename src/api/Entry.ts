export interface IEntry {
  content?: any;
  id: number;
  name: string;
}

/**
 * Dictionary entry creator.
 * @param  {IDictionaryAPIEntry} item [description]
 * @return {void}
 *
 * @todo Turn whatever's returned from the API into a consistent object.
 */
export function createEntry(item?: any): IEntry {
  return {
    content: item && item.definition || "",
    id: item && item.id || 0,
    name: item && item.word || "",
  };
}
