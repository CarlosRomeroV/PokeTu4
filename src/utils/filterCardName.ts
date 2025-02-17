export function filterCardName(cardName: string): string {
    
    if (cardName.startsWith('m ')) {
      return cardName.slice(2);
    }
    if (cardName.startsWith("sabrina's ")) {
        return cardName.slice(10);
      }
      if (cardName.startsWith("alolan ")) {
        return cardName.slice(7);
      }
    return cardName;
  }