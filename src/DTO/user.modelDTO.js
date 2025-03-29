class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.age = user.age;
    this.email = user.email;
    this.cartId = user.cartId;
    this.role = user.role;
  }
}

export default UserDTO;