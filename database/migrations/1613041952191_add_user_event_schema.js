"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddUserEventSchema extends Schema {
  up() {
    this.table("events", (table) => {
      table
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.table("events", (table) => {
      table.dropColumn("user_id");
    });
  }
}

module.exports = AddUserEventSchema;
