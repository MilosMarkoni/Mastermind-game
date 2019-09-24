export const randomZeroToX = x => Math.floor(Math.random() * x);

export const isEmpty = str => !str || 0 === str.length;

export const isBlank = str => !str || /^\s*$/.test(str);
