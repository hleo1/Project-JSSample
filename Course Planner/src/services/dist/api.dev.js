"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.getAll = getAll;
exports.create = create;
exports.remove = remove;
exports.update = update;
exports.search = search;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var axiosInstance = _axios["default"].create({
  baseURL: "https://courses-api-hw4.herokuapp.com",
  headers: {
    Authorization: "hleo1"
  }
});

function get(url) {
  var response;
  return regeneratorRuntime.async(function get$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axiosInstance.get(url));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          throw _context.t0;

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function getAll() {
  var response;
  return regeneratorRuntime.async(function getAll$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(get("/api/courses"));

        case 2:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function create(course) {
  var response;
  return regeneratorRuntime.async(function create$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(axiosInstance.post("/api/courses", course));

        case 3:
          response = _context3.sent;
          return _context3.abrupt("return", response.data.data);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function remove(course) {
  var response;
  return regeneratorRuntime.async(function remove$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(axiosInstance["delete"]("/api/courses/".concat(course._id)));

        case 3:
          response = _context4.sent;
          return _context4.abrupt("return", response.data.data);

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function update(course, status) {
  var response;
  return regeneratorRuntime.async(function update$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(axiosInstance.patch("/api/courses/".concat(course._id), {
            status: status
          }));

        case 3:
          response = _context5.sent;
          return _context5.abrupt("return", response.data.data);

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          throw _context5.t0;

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function search(query) {
  var page,
      limit,
      _args6 = arguments;
  return regeneratorRuntime.async(function search$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          page = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 1;
          limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : 9;

          if (query) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", {
            data: [],
            pagination: {},
            links: {}
          });

        case 6:
          return _context6.abrupt("return", get("/api/search?query=".concat(query, "&page=").concat(page, "&limit=").concat(limit)));

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
}