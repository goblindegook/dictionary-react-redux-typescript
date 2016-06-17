import { IDictionaryAPIEntry } from "./DictionaryAPI";

export default class Entry {
  public id: number;
  public name: string;
  public content: any;

  /**
   * Dictionary entry constructor.
   * @param  {IDictionaryAPIEntry} item [description]
   * @return {void}
   *
   * @todo Turn whatever's returned from the API into a consistent object.
   */
  public constructor(item?: IDictionaryAPIEntry) {
    this.id = item && item.id || 0;
    this.name = item && item.word || "";
    this.content = item && item.definition || "";
  }
}
