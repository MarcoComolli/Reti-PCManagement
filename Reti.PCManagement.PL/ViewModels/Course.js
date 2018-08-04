define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Course = /** @class */ (function () {
        function Course(id, desc, refYear, startD, endD, isPeriodic, resource) {
            this.Id = id;
            this.Description = desc;
            this.RefYear = refYear;
            this.StartDate = startD;
            this.EndDate = endD;
            this.IsPeriodic = isPeriodic;
            this.ResourceEntity = resource;
        }
        return Course;
    }());
    exports.Course = Course;
});
//export class Coordinator{
//    Username: string = " ";
//}
//# sourceMappingURL=Course.js.map