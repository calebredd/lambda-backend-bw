const db = require("../database/db-config");

function find() {
  return db("users").select(
    "id",
    "username",
    "city",
    "state",
    "zipCode",
    "profileImgURL"
  );
}

function findByName(filter) {
  return db("users")
    .where({ username:filter })
    .first()
    .select("id", "username", "city", "state", "zipCode", "profileImgURL");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first()
    .select("id", "username", "city", "state", "zipCode", "profileImgURL");
}

async function insert(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function update(id, user) {
  return db("users")
    .where({ id })
    .first()
    .update(user);
}

function remove(id) {
  return findById(id).del();
}

module.exports = { find, findByName, findById, insert, update, remove };
