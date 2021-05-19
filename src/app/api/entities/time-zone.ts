/**
 * A time zone offset from Coordinated Universal Time (UTC) by a whole number of hours (UTC−12 to UTC+14).
 */
export interface TimeZone {

        /** A string containing the Id of the time zone (e.g. "America/New_York"). These Ids are defined in the IANA Time Zone Database. */
        timeZoneId: string;

        /** A string containing the long form name of the time zone. (e.g. "Eastern Daylight Time"). */
        timeZoneName: string;

        /** 
         * The amount of time (in seconds) to add to UTC to get standard time in this time zone 
         * (the value is not affected by daylight saving time). 
         */
        rawOffset: string;

        /** The offset for daylight-savings time (in seconds). */
        dstOffset: string;
}
