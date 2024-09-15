export interface RepositoryInterface<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  find(id: string): Promise<T>;
  delete(id: string): Promise<void>;
  findAll(): Promise<T[]>;
}
