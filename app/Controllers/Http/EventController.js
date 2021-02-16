"use strict";

const Event = use("App/Models/Event");

const { validateAll } = use("Validator");

class EventController {
  async store({ request, response, auth }) {
    const rules = {
      title: "required",
      date: "required",
      hour: "required",
      location: "required",
    };

    const messages = {
      "title.required": "O titulo do evento deve ser informado",
      "date.required": "A data do evento deve ser informada",
      "hour.required": "A hora do evento deve ser informada",
      "location.required": "O local do evento deve ser informado",
    };

    const validate = await validateAll(request.all(), rules, messages);

    if (validate.fails()) {
      return response.status(401).send({ message: validate.messages() });
    }

    const { id } = auth.user;
    const { title, date, hour, location } = request.all();

    const event = await Event.create({
      title,
      date,
      hour,
      location,
      user_id: id,
    });

    return event;
  }

  async index({ request, response }) {
    const events = await Event.query().with("user").fetch();

    const eventsWithoutPassword = events.toJSON();

    eventsWithoutPassword.map((event) => {
      event.user.password && delete event.user.password;
    });

    return eventsWithoutPassword;
  }

  async update({ request, response, params }) {
    const { title, date, hour, location } = request.all();

    const event = await Event.find(params.id);

    if (!event)
      return response.status(404).send({ message: "This item is not found" });

    event.title = title;
    event.date = date;
    event.hour = hour;
    event.location = location;

    await event.save();

    return event;
  }

  async destroy({ request, response, params }) {
    const event = await Event.find(params.id);

    if (!event)
      return response.status(404).send({ message: "This item is not found" });

    await event.delete();

    return response.status(200).send({ message: "this item has been deleted" });
  }
}

module.exports = EventController;
