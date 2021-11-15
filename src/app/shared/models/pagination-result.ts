export class PaginationResult<T> {
  public content: T[];
  public totalPages: number;
  public last: boolean;
  public totalElements: number;
  public sort: any;
  public first: boolean;
  public numberOfElements: number;
  public size: number;
  public number: number;
}
