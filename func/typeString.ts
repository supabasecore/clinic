export function capitalizeWords(input: string): string {
  return input.toLowerCase().replace(/(?:^|\s)\S/g, function (char) {
    return char.toUpperCase();
  });
}

export function convertFormat(text: string | undefined | null): string {
  if (text === undefined || text === null) {
    return "";
  }

  const words = text.toLowerCase().split(" ");
  const formattedWords = words.map((word) => {
    if (word.length > 0) {
      const initialUpperCase = word[0].toUpperCase();
      const restLowerCase = word.slice(1);
      return initialUpperCase + restLowerCase;
    }
    return "";
  });

  return formattedWords.join(" ");
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  } else {
    const truncatedText = text.slice(0, maxLength);
    return truncatedText + "...";
  }
}
