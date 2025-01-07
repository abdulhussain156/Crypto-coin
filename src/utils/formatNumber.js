import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}

export function extractDomainPart(url) {
  try {
    const hostname = new URL(url).hostname; // Extract hostname (e.g., "bitcoin.org")
    const pathParts = new URL(url).pathname.split('/'); // Split path into parts
    const mainDomain = hostname.includes('www.')
      ? hostname.split('.')[1] // If "www" is present, get the second part
      : hostname.split('.')[0]; // If no "www", get the first part of the domain

    // Check the path for specific terms, prioritize over domain if present
    for (const part of pathParts) {
      if (part && !part.includes('.') && part !== 'www') {
        return part; // Return the part of the path
      }
    }

    return mainDomain; // Default to domain-based extraction
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}
