import Realm from 'realm';
class ActiveUser {
    static schema = {
      name: 'ActiveUser',
      primaryKey: 'user_id',
      properties: {
        user_id: 'int',
        firstname: 'string',
        lastname: 'string',
        username: 'string'
      },
    };
}
class UsersLength {
  static schema = {
    name: 'UsersLength',
    primaryKey: 'id',
    properties: {
      id: 'int',
      length: 'int'
    },
  };
}
class Product {
  static schema = {
    name: 'Product',
    primaryKey: 'id',
    properties: {
      id: 'int',
      user: 'string',
      name: 'string',
      price: 'string',
    },
  };
}
const version = 1
const encryptionKey = new Int8Array(64);

const realm = new Realm({
  encryptionKey,
  schema: [
    ActiveUser,
    UsersLength,
    Product
  ],
  schemaVersion: version,
});

export function getTable(name){
  
  return realm.objects(name)
}
export function createRow(name, data, update) {
    update = update || false;
    console.log({ name, data, update });
  
    realm.write(() => {
      realm.create(name, data, update);
    });
}
export function deleteRow(object) {
    realm.write(() => {
      realm.delete(object);
    });
}

export default realm;
