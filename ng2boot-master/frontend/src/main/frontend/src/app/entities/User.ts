/**
 * Created by shubhampaul on 2/25/2018.
 */

export class User {
  userId: number;
  userName: string;
  password: string;


  constructor() {
    this.userId = -1;
    this.userName = '';
    this.password = '';
  }


  copy(user:User) {
    this.userId = (user.userId !== undefined) ? user.userId : this.userId;
    this.userName = user.userName;
    this.password = user.password;
  }
}
