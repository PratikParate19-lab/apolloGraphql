import { RESTDataSource } from 'apollo-datasource-rest';

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/';
  }
  public async getUserList() {
    return await this.get(`user`);
  }
}
export default UserAPI;
