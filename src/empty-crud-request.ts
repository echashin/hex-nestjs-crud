import { CrudRequest } from "./interfaces/crud-request.interface";

export const emptyCrudRequest: CrudRequest = {
  parsed: {
    fields: [],
    paramsFilter: [],
    search: {},
    filter: [],
    join: [],
    sort: [],
    limit: 0,
    cache: 0,
    offset: 0,
    page: 0,
    or: [],
    includeDeleted: 0,
  },
  options: { query: { join: {} } },
};
