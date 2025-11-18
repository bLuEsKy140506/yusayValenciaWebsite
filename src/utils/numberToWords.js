export function numberToWords(num) {
  const a = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
    "sixteen", "seventeen", "eighteen", "nineteen"
  ];

  const b = [
    "", "", "twenty", "thirty", "forty", "fifty",
    "sixty", "seventy", "eighty", "ninety"
  ];

  const inWords = (n) => {
    if (n === 0) return "zero";
    if (n < 20) return a[n];
    if (n < 100)
      return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + inWords(n % 100) : "")
      );
    if (n < 1_000_000)
      return (
        inWords(Math.floor(n / 1000)) +
        " thousand" +
        (n % 1000 ? " " + inWords(n % 1000) : "")
      );
    if (n < 1_000_000_000)
      return (
        inWords(Math.floor(n / 1_000_000)) +
        " million" +
        (n % 1_000_000 ? " " + inWords(n % 1_000_000) : "")
      );
    if (n < 10_000_000_000)
      return (
        inWords(Math.floor(n / 1_000_000_000)) +
        " billion" +
        (n % 1_000_000_000 ? " " + inWords(n % 1_000_000_000) : "")
      );

    return n.toString(); // fallback for >10 digits
  };

  // Split peso and centavo parts
  const [pesoPart, centavoPart] = num.toFixed(2).split(".");
  const pesoNum = parseInt(pesoPart, 10);
  const centNum = parseInt(centavoPart, 10);

  const pesoWords =
    pesoNum === 0
      ? "Zero"
      : inWords(pesoNum).replace(/\b\w/g, (c) => c.toUpperCase());

  return centNum > 0
    ? `${pesoWords} And ${centNum.toString().padStart(2, "0")}/100`
    : `${pesoWords} Only`;
}
