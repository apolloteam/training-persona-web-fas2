import { TimeZone } from './time-zone';

/**
 *  Contains geolocated data from a place.
 */
export interface Location {

    /** Full location name (e.g. "Miami International Airport (MIA)"). */
    name: string;

    /** Address line (number and street name). (e.g. "1640 NW 42nd Ave, Miami, FL 33126, USA"). */
    address: string;

    /** Complementary address line (door, floor, office, etc). (e.g. "second floor, office 2"). */
    address2: string;

    /** Full location name and address line. (e.g. "Miami International Airport (MIA) 1640 NW 42nd Ave, Miami, FL 33126, USA"). */
    summary: string;

    /** Country code (ISO 3166-1 alfa-2 ). (e.g. "US"). */
    countryCode: string;

    /** Latitude (WGS-84 format). (e.g. 25.796549). */
    latitude: string;

    /** Longitude (WGS-84 format). (e.g. -80.275613). */
    longitude: string;

    /** Location category, such as Address, Airport, Hotel, Political, etc. (e.g. "airport;establishment"). */
    category: string;

    /** 
     * Determines if the location has coordinates of a concrete point, 
     * for example the locations with political categories are abstract and locations with stablishment categories are concrete.
     */
    isConcrete: boolean;

    /** The real value inserted by user for a search. (e.g. "miami airport"). */
    autocompleteSelectedItem: string;

    /** A time zone offset from Coordinated Universal Time (UTC) by a whole number of hours (UTC−12 to UTC+14). */
    timeZone: TimeZone;
}
