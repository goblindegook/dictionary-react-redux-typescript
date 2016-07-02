import * as fetch from "isomorphic-fetch";
import { createEntry, IEntry } from "./Entry";

const rootUrl = "http://localhost:3000/api/search-json";

/**
 * [search description]
 * @param  {string}                         prefix [description]
 * @return {Promise<IEntry[]>}       [description]
 *
 * @todo Plug this into an actual API.
 */
export function search(prefix: string): Promise<IEntry[]> {
  const indices = {};

  return fetch(`${rootUrl}?prefix=${prefix}`, { mode: "cors" })
    .then((response) => {
      if (!response.status || response.status.toString().charAt(0) !== "2") {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then((results) => results.list.map(
      (entry: string) => {
        indices[entry] = 1 + (indices[entry] || 0);
        return createEntry(entry, `${entry}:${indices[entry]}`);
      }
    ));
}

/**
 * [define description]
 * @param  {string}                       id [description]
 * @return {Promise<IEntry>}      [description]
 *
 * @todo Plug this into an actual API.
 */
export function define(id: string): Promise<IEntry[]> {
  return fetch(`${rootUrl}/${id}`, { mode: "cors" })
    .then((response) => {
      if (!response.status || response.status.toString().charAt(0) !== "2") {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then((results) => {
      const entries = results.superEntry ? results.superEntry : [ results ];
      return entries.map(
        (result) => createEntry(id.split(":")[0], result.entry["@id"], result.entry)
      );
    });
}
