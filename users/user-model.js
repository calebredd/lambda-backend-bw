const db = require("../database/db-config");

function find() {
  return db("users").select(
    "id",
    "username",
    "city",
    "state",
    "zipCode",
    "profileImgURL",
    "farmer"
  );
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .select(
      "id",
      "username",
      "city",
      "state",
      "zipCode",
      "profileImgURL",
      "farmer"
    );
}

function findById(id) {
  return db("users")
    .where({ id })
    .select(
      "id",
      "username",
      "city",
      "state",
      "zipCode",
      "profileImgURL",
      "farmer"
    );
}

async function insert(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function update(id, user) {
  return db("users")
    .where({ id })
    .update(user);
}

function remove(id) {
  return findById(id).del();
}

module.exports = { find, findBy, findById, insert, update, remove };
