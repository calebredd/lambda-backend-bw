const db=require('../database/db-config');

function find(){
  return db('users');
}

function findBy(filter){
  return db('users').where(filter);
}

function findById(id){
  return db('users').where({id})
}

async function insert(user){
  const [id]=await db('users').insert(user);
  return findById(id);
}

function update(id, user){
  return db('users').where({id}).update(user);
}

function remove(id){
  return findById(id).del();
}

module.exports={find, findBy, findById, insert, update, remove}