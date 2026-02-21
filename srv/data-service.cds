using { sap.fe.cap.travel as travel } from '../db/schema';
using { sap.common }                  from '../db/common';

/**
 * DataService — read-only API exposing the full relational graph
 * for MCP tools, agent-to-agent queries, and data exploration.
 *
 * Entity projections preserve every association and composition
 * defined in the db layer. Denormalized views provide pre-joined
 * data for common cross-entity queries.
 *
 * Relationship Map (FK → Association):
 * ─────────────────────────────────────
 * Travel      → TravelAgency    (to_Agency)       FK: AgencyID
 * Travel      → Passenger       (to_Customer)     FK: CustomerID
 * Travel      → TravelStatus    (TravelStatus)    FK: TravelStatus_code
 * Travel      ⟿ Booking        (to_Booking)      Composition 1:N
 * Booking     → Travel          (to_Travel)       FK: to_Travel_TravelUUID
 * Booking     → Airline         (to_Carrier)      FK: to_Carrier_AirlineID
 * Booking     → Passenger       (to_Customer)     FK: CustomerID
 * Booking     → Flight          (to_Flight)       FK: AirlineID + FlightDate + ConnectionID
 * Booking     → BookingStatus   (BookingStatus)   FK: BookingStatus_code
 * Booking     ⟿ BookingSupplement (to_BookSupplement) Composition 1:N
 * BookingSupplement → Booking   (to_Booking)      FK: to_Booking_BookingUUID
 * BookingSupplement → Travel    (to_Travel)       FK: to_Travel_TravelUUID
 * BookingSupplement → Supplement(to_Supplement)    FK: to_Supplement_SupplementID
 * Flight      → Airline         (to_Airline)      FK: AirlineID
 * Flight      → FlightConnection(to_Connection)   FK: AirlineID + ConnectionID
 * FlightConnection → Airline    (to_Airline)      FK: AirlineID
 * FlightConnection → Airport    (DepartureAirport) FK: DepartureAirport_AirportID
 * FlightConnection → Airport    (DestinationAirport) FK: DestinationAirport_AirportID
 * Supplement  → SupplementType  (Type)            FK: Type_code
 * Airport     → Countries       (CountryCode)     FK: CountryCode_code
 * Passenger   → Countries       (CountryCode)     FK: CountryCode_code
 * TravelAgency→ Countries       (CountryCode)     FK: CountryCode_code
 * [All *Price/Fee fields] → Currencies (CurrencyCode) FK: CurrencyCode_code
 */
@path: '/api/data'
@readonly
service DataService {

  // ── Transactional Entities (Composition Root: Travel) ────────

  @cds.redirection.target
  entity Travel            as projection on travel.Travel;
  @cds.redirection.target
  entity Booking           as projection on travel.Booking;
  entity BookingSupplement as projection on travel.BookingSupplement;

  // ── Master Data ──────────────────────────────────────────────

  entity Airline           as projection on travel.Airline;
  entity Airport           as projection on travel.Airport;
  @cds.redirection.target
  entity Flight            as projection on travel.Flight;
  entity FlightConnection  as projection on travel.FlightConnection;
  entity Passenger         as projection on travel.Passenger;
  entity TravelAgency      as projection on travel.TravelAgency;
  entity Supplement        as projection on travel.Supplement;

  // ── Code Lists / Enumerations ────────────────────────────────

  entity BookingStatus     as projection on travel.BookingStatus;
  entity TravelStatus      as projection on travel.TravelStatus;
  entity SupplementType    as projection on travel.SupplementType;

  // ── Common Reference Data ────────────────────────────────────

  entity Currencies        as projection on common.Currencies;
  entity Countries         as projection on common.Countries;

  // ── Denormalized Views ───────────────────────────────────────
  // Pre-joined for flat queries — no $expand needed by agents.

  /**
   * FlightSchedule: One row per flight with full route details.
   * Keys: AirlineID + FlightDate + ConnectionID (same as Flight).
   * Joins: Flight → Airline, Flight → Connection → Airports.
   */
  entity FlightSchedule as select from travel.Flight {
    key AirlineID,
    key FlightDate,
    key ConnectionID,
    to_Airline.Name                                    as AirlineName,
    Price,
    CurrencyCode,
    PlaneType,
    MaximumSeats,
    OccupiedSeats,
    MaximumSeats - OccupiedSeats                       as AvailableSeats   : Integer,
    to_Connection.DepartureTime,
    to_Connection.ArrivalTime,
    to_Connection.Distance,
    to_Connection.DistanceUnit,
    to_Connection.DepartureAirport.AirportID           as DepartureAirportID,
    to_Connection.DepartureAirport.Name                as DepartureAirport,
    to_Connection.DepartureAirport.City                as DepartureCity,
    to_Connection.DepartureAirport.CountryCode.code    as DepartureCountry,
    to_Connection.DestinationAirport.AirportID         as ArrivalAirportID,
    to_Connection.DestinationAirport.Name              as ArrivalAirport,
    to_Connection.DestinationAirport.City              as ArrivalCity,
    to_Connection.DestinationAirport.CountryCode.code  as ArrivalCountry
  };

  /**
   * BookingOverview: One row per booking with travel, customer,
   * airline, and route details flattened.
   * Key: BookingUUID.
   * Joins: Booking → Travel, Carrier, Customer, Flight → Connection → Airports.
   */
  entity BookingOverview as select from travel.Booking {
    key BookingUUID                                         as ID,
    to_Travel.TravelID                                      as TravelID,
    BookingID,
    BookingDate,
    FlightDate,
    FlightPrice,
    CurrencyCode,
    BookingStatus.code                                      as Status,
    to_Carrier.AirlineID                                    as AirlineID,
    to_Carrier.Name                                         as AirlineName,
    ConnectionID,
    to_Customer.CustomerID                                  as CustomerID,
    to_Customer.FirstName                                   as CustomerFirstName,
    to_Customer.LastName                                    as CustomerLastName,
    to_Flight.PlaneType                                     as PlaneType,
    to_Flight.to_Connection.DepartureAirport.AirportID      as DepartureAirportID,
    to_Flight.to_Connection.DepartureAirport.City            as DepartureCity,
    to_Flight.to_Connection.DestinationAirport.AirportID     as ArrivalAirportID,
    to_Flight.to_Connection.DestinationAirport.City           as ArrivalCity,
    to_Flight.to_Connection.DepartureTime                    as DepartureTime,
    to_Flight.to_Connection.ArrivalTime                      as ArrivalTime,
    to_Flight.to_Connection.Distance                         as Distance,
    to_Flight.to_Connection.DistanceUnit                     as DistanceUnit
  };

  /**
   * TravelSummary: One row per travel with agency, customer,
   * and status details flattened.
   * Key: TravelUUID.
   * Joins: Travel → Agency, Customer, TravelStatus.
   */
  entity TravelSummary as select from travel.Travel {
    key TravelUUID                                     as ID,
    TravelID,
    BeginDate,
    EndDate,
    BookingFee,
    TotalPrice,
    CurrencyCode,
    Description,
    TravelStatus.code                                  as Status,
    to_Agency.AgencyID                                 as AgencyID,
    to_Agency.Name                                     as AgencyName,
    to_Customer.CustomerID                             as CustomerID,
    to_Customer.FirstName                              as CustomerFirstName,
    to_Customer.LastName                               as CustomerLastName,
    to_Customer.EMailAddress                           as CustomerEmail,
    createdAt,
    createdBy,
    LastChangedAt
  };
}
