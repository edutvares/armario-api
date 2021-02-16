"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EventSchema extends Schema {
  up() {
    this.create("events", (table) => {
      table.increments();
      table.string("title").notNullable();
      table.string("date").notNullable();
      table.string("hour").notNullable();
      table.string("location").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("events");
  }
}

module.exports = EventSchema;
