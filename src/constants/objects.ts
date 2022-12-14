export const ERRORS = {
  QUERY: {
    NOT_DEFINED: 'QUERY_NOT_DEFINED',
    ARE_EQUALS: 'QUERIES_ARE_EQUALS',
    FORMAT: 'QUERY_NOT_FORMATED',
  },
  FETCH: {
    HYDRATION: 'HYDRATION_ERROR',
    DATA: 'DATA_ERROR',
  },
} as const;

export const MACHINES = {
  QUERY_FILTER: 'QUERY_FILTER',
  DROPDOWNS: {
    COUNTRY: 'COUNTRY',
    TYPE: 'TYPE',
  },
  INPUTS: {
    PRICE: {
      SUPERIOR_OR_EQUAL_TO: 'SUPERIOR_OR_EQUAL_TO',
      INFERIOR_OR_EQUAL_TO: 'INFERIOR_OR_EQUAL_TO',
    },
  },
} as const;

export const EVENTS = {
  TOGGLE: 'TOGGLE',
  INPUT: 'INPUT',
  FILTER: 'FILTER',
} as const;
