define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Course = /** @class */ (function () {
        function Course(id, desc, refYear, startD, endD, isPeriodic, coordinator) {
            this.Id = id;
            this.Description = desc;
            this.RefYear = refYear;
            this.StartDate = startD;
            this.EndDate = endD;
            this.IsPeriodic = isPeriodic;
            this.Coordinator = coordinator;
        }
        return Course;
    }());
    exports.Course = Course;
});
//# sourceMappingURL=Course.js.map