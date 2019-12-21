import { JSONObject, JSONArray, JSONValue, JSONPrimitive } from './types';

export const keys = <T extends {}>(obj: T) => Object.keys(obj);

export const union = <T>(arr1: T[], arr2: T[]) => {
  const arr = arr1.concat(arr2);
  const set = new Set<T>();
  const result = new Array<T>();
  arr.forEach(value => {
    if (!set.has(value)) {
      set.add(value);
      result.push(value);
    }
  });
  return result;
};

export const has = <T extends {}>(obj: T, property: string) => obj.hasOwnProperty(property);

export const isObject = (value: JSONValue): value is JSONObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isArray = (value: JSONValue): value is JSONArray => Array.isArray(value);

export const isPrimitive = (value: JSONValue): value is JSONPrimitive => !isArray(value) && !isObject(value);

/** Converts array to object (indexes to string keys)*/
export const toObject = (list: JSONArray): JSONObject =>
  list
    .map((item, i) => ({ key: String(i), value: item }))
    .reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
