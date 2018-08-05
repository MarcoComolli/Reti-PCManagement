define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Resource = /** @class */ (function () {
        function Resource(id, username, name, surname, status) {
            this.Id = id;
            this.Username = username;
            this.Name = name;
            this.Surname = surname;
            this.Status = status;
        }
        return Resource;
    }());
    exports.Resource = Resource;
});
//# sourceMappingURL=Resource.js.map