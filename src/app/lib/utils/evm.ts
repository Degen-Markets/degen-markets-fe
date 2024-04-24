export const prettifyAddress = (address: string): string =>
  address
    .substring(0, 6)
    .concat("...")
    .concat(address.substring(address.length - 4));
