import { RESTDataSource } from 'apollo-datasource-rest';

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3001/';
  }
  public async getUserList() {
    return await this.get(`user`);
  }
  public async postUser(data) {
    return await this.post(`user`, data);
  }
  public async userDelete(id: any) {
    return await this.delete(`user`, id);
  }
}
export default UserAPI;
