"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SessionRepository_1 = require("../repositories/SessionRepository");
const httpStatus = require("http-status");
const sendReponse = function (res, statusCode, data) {
    res.status(statusCode).json(data);
};
class SessionController {
    constructor() { }
    get(req, res) {
        SessionRepository_1.default
            .getAll()
            .then(user => sendReponse(res, httpStatus.OK, user))
            .catch(err => console.error.bind(console, `Error ${err}`));
    }
    getById(req, res) {
        const _id = { id: req.params.id };
        if (!_id) {
            sendReponse(res, httpStatus.OK, 'user not found!');
        }
        else {
            SessionRepository_1.default
                .getById(req.params.id)
                .then(programs => sendReponse(res, httpStatus.OK, programs))
                .catch(err => console.error.bind(console, `Error ${err}`));
        }
    }
    create(req, res) {
        SessionRepository_1.default
            .create(req.body)
            .then(menus => sendReponse(res, httpStatus.OK, menus))
            .catch(err => console.error.bind(console, `Error ${err}`));
    }
    update(req, res) {
        const _id = { id: req.params.id };
        if (req.body.length == 0) {
            return sendReponse(res, httpStatus.NOT_FOUND, 'User not found!');
        }
        SessionRepository_1.default
            .update(_id, req.body)
            .then(user => sendReponse(res, httpStatus.OK, user))
            .catch(err => console.error.bind(console, `Error ${err}`));
    }
    delete(req, res) {
        if (!req.params.id) {
            return sendReponse(res, httpStatus.NOT_FOUND, 'User not found!');
        }
        SessionRepository_1.default
            .delete(req.params.id)
            .then(user => sendReponse(res, httpStatus.OK, `User  ${user.name} deleted with success!`))
            .catch(err => console.error.bind(console, `Error ${err}`));
    }
}
exports.default = new SessionController();