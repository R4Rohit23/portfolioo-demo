export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};

export function convertToNormalString(str: string) {
  const words = str.split("_");
  const normalString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return normalString;
}
