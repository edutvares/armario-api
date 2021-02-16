"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.post("/events", "EventController.store").middleware("auth");
Route.get("/events", "EventController.index").middleware("auth");
Route.put("/events/:id", "EventController.update").middleware("auth");
Route.delete("/events/:id", "EventController.destroy").middleware("auth");

Route.post("/user", "UserController.store");
Route.post("/login", "UserController.login");
Route.get("/user", "UserController.index").middleware("auth");
