//conn = new Mongo();
//db = conn.getDB("suppliers_db");
db.suppliers.insertMany([
  {
    name: "first 1",
    contact: "first@supplier.com",
  },
  { name: "second 2", contact: "627276543" },
]);
