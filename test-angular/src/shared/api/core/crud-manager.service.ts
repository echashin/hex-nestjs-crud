import {Injectable} from "@angular/core";
import {Observable} from "rxjs";


import {ApiService} from "../../services/api.service";

import {ImportDto, ManagerCreateInput, ManagerEntity, ManagerUpdateInput, Pageable} from "./data-contracts";
import {CrudApiService} from "../../../modules/crud/interfaces/crud-api-service";

@Injectable({
  providedIn: "root",
})
export class CrudManagerService extends ApiService implements CrudApiService<ManagerEntity> {
  protected override url: string = "http://localhost:3000";
  /**
   * @description find
   *
   * @tags crud-manager
   * @name CrudManagerControllerFind
   * @summary Retrieve multiple items ManagerEntity[]
   * @request GET:/crud-manager
   * @response `200` `(Pageable & {
    items?: (ManagerEntity)[],

})`
   */
  find = (query?: {
    /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
    fields?: string;
    /** Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a> */
    s?: string;
    /** Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a> */
    filter?: string[];
    /** Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a> */
    or?: string[];
    /** Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a> */
    sort?: string[];
    /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
    join?: string[];
    /** Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a> */
    limit?: number;
    /** Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a> */
    page?: number;
    /** Load deleted items */
    includeDeleted?: boolean;
  }): Observable<
    Pageable & {
    items?: ManagerEntity[];
  }
  > =>
    this.request<
      Pageable & {
      items?: ManagerEntity[];
    },
      any
    >(`/crud-manager`, "GET", null, query);
  /**
   * No description
   *
   * @tags crud-manager
   * @name CrudManagerControllerCreate
   * @summary Create one item ManagerEntity
   * @request POST:/crud-manager
   * @response `201` `ManagerEntity`
   */
  create = (data: ManagerCreateInput): Observable<ManagerEntity> =>
    this.request<ManagerEntity, ManagerCreateInput>(`/crud-manager`, "POST", data);
  /**
   * No description
   *
   * @tags crud-manager
   * @name CrudManagerControllerDeleteMany
   * @summary Delete multiple items
   * @request DELETE:/crud-manager
   * @response `200` `number`
   */
  deleteMany = (query: {
    /** ID`s of items selected for delete */
    ids: string[];
  }): Observable<number> => this.request<number, any>(`/crud-manager`, "DELETE", null, query);
  /**
   * @description find on item
   *
   * @tags crud-manager
   * @name CrudManagerControllerFindOne
   * @summary Retrieve one item ManagerEntity
   * @request GET:/crud-manager/{id}
   * @response `200` `ManagerEntity`
   */
  findOne = (
    id: string,
    query?: {
      /** Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a> */
      fields?: string;
      /** Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a> */
      join?: string[];
      /** Load deleted items */
      includeDeleted?: boolean;
    },
  ): Observable<ManagerEntity> => this.request<ManagerEntity, any>(`/crud-manager/${id}`, "GET", null, query);
  /**
   * No description
   *
   * @tags crud-manager
   * @name CrudManagerControllerUpdate
   * @summary Update item ManagerEntity
   * @request PATCH:/crud-manager/{id}
   * @response `200` `ManagerEntity`
   */
  update = (id: string, data: ManagerUpdateInput): Observable<ManagerEntity> =>
    this.request<ManagerEntity, ManagerUpdateInput>(`/crud-manager/${id}`, "PATCH", data);
  /**
   * No description
   *
   * @tags crud-manager
   * @name CrudManagerControllerDelete
   * @summary Delete one item
   * @request DELETE:/crud-manager/{id}
   * @response `200` `number`
   */
  delete = (id: string): Observable<number> => this.request<number, any>(`/crud-manager/${id}`, "DELETE");
  /**
   * No description
   *
   * @tags crud-manager
   * @name CrudManagerControllerRecover
   * @summary Recover item ManagerEntity
   * @request PUT:/crud-manager/{id}
   * @response `200` `ManagerEntity`
   */
  recover = (id: string): Observable<ManagerEntity> => this.request<ManagerEntity, any>(`/crud-manager/${id}`, "PUT");
  /**
   * No description
   *
   * @tags crud-manager
   * @name CrudManagerControllerImport
   * @summary Import multiple items by file upload
   * @request POST:/crud-manager/import
   * @response `201` `ImportDto`
   */
  import = (data: {
    /** @format binary */
    file: File;
  }): Observable<ImportDto> =>
    this.request<
      ImportDto,
      {
        /** @format binary */
        file: File;
      }
    >(`/crud-manager/import`, "POST", data);
  /**
   * No description
   *
   * @tags crud-manager
   * @name CrudManagerControllerExport
   * @summary Export items to file
   * @request GET:/crud-manager/export
   * @response `200` `void`
   */
  export = (query: {
    /** ID`s of items selected for export */
    ids?: string[];
    /**
     * Export File Type
     * @default "json"
     */
    fileExt: "xlsx" | "ods" | "json";
  }): Observable<void> => this.request<void, any>(`/crud-manager/export`, "GET", null, query);
}
