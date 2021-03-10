export default interface IDeleteProductService {
  execute(id: string): Promise<string>;
}
