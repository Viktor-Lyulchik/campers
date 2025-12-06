// Capitalizes the first letter of a string and makes the rest lowercase
export const capitalize = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

type Primitive = string | number | boolean;
type ParamValue = Primitive | Primitive[] | undefined | null;

// Serializes an object of parameters into a URL query string
export function serializeParams(params: Record<string, ParamValue>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      searchParams.set(key, value.join(','));
    } else {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
}
