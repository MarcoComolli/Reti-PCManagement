define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Enrollment = /** @class */ (function () {
        function Enrollment(id, res, leader, course, startdate, endDate, admit, notes) {
            this.Id = id;
            this.Resource = res;
            this.ProjectLeader = leader;
            this.Course = course;
            this.StartDate = startdate;
            this.MaxEndDate = endDate;
            this.IsAdmitted = admit;
            this.Notes = notes;
        }
        return Enrollment;
    }());
    exports.Enrollment = Enrollment;
});
//# sourceMappingURL=Enrollment.js.map