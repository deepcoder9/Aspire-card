export const formatCardNumber = (
  cardNumber: string,
  isVisible: boolean
): string => {
  cardNumber = String(cardNumber)?.replace(/\D/g, "").padStart(16, "0");
  if (isVisible) {
    return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  } else {
    const masked = "•••• •••• •••• " + cardNumber.slice(-4);
    return masked;
  }
};
