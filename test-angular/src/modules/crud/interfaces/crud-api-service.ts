import { Observable } from 'rxjs';
import {ExportFileInput, ImportDto, InputError, Pageable} from "../../../shared/api/core/data-contracts";



export interface CrudApiService<T> {
  isLoading$: Observable<boolean>;
  errors$: Observable<InputError[]>;

  find(query?: {
    fields?: string;
    s?: string;
    filter?: string[];
    or?: string[];
    sort?: string[];
    join?: string[];
    limit?: number;
    page?: number;
    softDelete?: boolean;
  }): Observable<Pageable & { items?: T[] }>;

  findOne?(id: string, query?: { fields?: string; join?: string[]; softDelete?: boolean;}): Observable<T>;

  create?(input: Record<string, any>): Observable<T>;

  update?(id: string, input: Record<string, any>): Observable<T>;

  updateMany?(query: { ids: string[] }, input: Record<string, any>): Observable<number>;

  delete?(id: string): Observable<number>;

  deleteMany?(query: { ids: string[] }): Observable<number>;

  import?(formData: { file?: File }): Observable<ImportDto>;

  export?(body: ExportFileInput): Observable<void>;
}
