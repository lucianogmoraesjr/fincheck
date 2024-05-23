/**
 * Capitalizes the first letter of a given string.
 * @param str - The string to capitalize.
 * @returns The string with the first letter capitalized.
 */
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
