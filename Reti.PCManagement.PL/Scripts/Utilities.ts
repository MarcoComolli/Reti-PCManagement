import { Resource } from "../ViewModels/Resource";
import { Course } from "../ViewModels/Course";

export class Utilities {

    /**
     * Convert input resource in a compact string representation
     *
     * @static
     * @param {Resource} res
     * @returns {string}
     * @memberof Utilities
     */
    public static toResourceString(res: Resource): string {
        return res.Surname + " " + res.Name + " (" + res.Username + ")";
    }
    
    /**
     * Convert input Course in a compact string representation with the description trimmed to 45 chars.
     * If cropString parameter is set to false ehe Course description will not be cropped.
     *
     * @static
     * @param {Course} crs
     * @param {boolean} [cropString=true]
     * @returns {string}
     * @memberof Utilities
     */
    public static toCourseString(crs: Course, cropString = true): string {
        if (cropString) {
            if (crs.Description.length > 45) {
                return crs.RefYear + " - " + crs.Description.substr(0, 45) + "...";
            }
        }
        return crs.RefYear + " - " + crs.Description;
       
    }
    
    
    
    /**
     * Utility function taken from internet to convert Date in the format yyyy-mm-dd
     *
     * @static
     * @param {Date} date
     * @returns
     * @memberof Utilities
     */
    public static dateToYMD(date: Date) {
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }
}