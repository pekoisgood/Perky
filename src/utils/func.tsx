export function capitalize(tag: string) {
  const splitTagStrings = tag.split(" ");
  const capitalizedTag = splitTagStrings.map((string) => {
    return string[0].toUpperCase() + string.slice(1);
  });
  return capitalizedTag.reduce((acc, cur) => acc + " " + cur);
}
