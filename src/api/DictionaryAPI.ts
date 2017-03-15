import * as fetch from "isomorphic-fetch"
import { createEntry, createEntryStub, IEntry } from "./Entry"

export interface IRawSense {
  "@ast"?: string
  def: string
  gramGrp: string
  usg?: {
    "@type": string
    "#text": string;
  }
}

export interface IRawEntry {
  "@ast"?: string
  "@id": string
  "@n"?: string
  "@type"?: string
  etym?: {
    "@orig": string
    "#text": string;
  }
  form: {
    orth: string
    pron?: string;
  }
  sense: IRawSense[]
}

// FIXME: Move to configuration file.
const rootUrl = "http://localhost:3000/api/search-json"

/**
 * [search description]
 * @param  {string}                         prefix [description]
 * @return {Promise<IEntry[]>}       [description]
 *
 * @todo Plug this into an actual API.
 */
export async function search(prefix: string): Promise<IEntry[]> {
  const indices = {}

  const response = await fetch(`${rootUrl}?prefix=${prefix}`, { mode: "cors" })

  if (!response.status || response.status.toString().charAt(0) !== "2") {
    throw new Error(response.statusText)
  }

  const results = await response.json()

  return results.list.map((entry: string) => {
    indices[entry] = 1 + (indices[entry] || 0)
    return createEntryStub(entry, `${entry}:${indices[entry]}`)
  })
}

/**
 * [define description]
 * @param  {string}                       id [description]
 * @return {Promise<IEntry>}      [description]
 *
 * @todo Plug this into an actual API.
 */
export async function define(id: string): Promise<IEntry[]> {
  const response = await fetch(`${rootUrl}/${id}`, { mode: "cors" })

  if (!response.status || response.status.toString().charAt(0) !== "2") {
    throw new Error(response.statusText)
  }

  const results = await response.json()
  const entries = results.superEntry ? results.superEntry : [ results ]

  return entries.map((result: { entry: IRawEntry }) =>
    createEntry(id.split(":")[0], result.entry["@id"], result.entry))
}
