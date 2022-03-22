import { AlertDefinitionFilter, AlertFilter } from './types';

/**
 * Convert an object key-value to a query string
 * @param params object
 * @returns
 */
export function objectToQueryString(
  params:
    | { [key: string]: string | number }
    | AlertDefinitionFilter
    | AlertFilter
) {
  return Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    )
    .join('&');
}

/**
 * Convert an array of values to a query string with the same key
 * @param values Array of values
 * @param key key value
 * @returns string
 */
export function arrayToQueryString(values: Array<any>, key: string) {
  return values
    .map((v) => encodeURIComponent(key) + '=' + encodeURIComponent(v))
    .join('&');
}
