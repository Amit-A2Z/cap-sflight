// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './..';
import * as _sap_fe_cap_travel from './../sap/fe/cap/travel';
import * as __ from './../_';
import * as _custom from './../custom';
import * as _sap_common from './../sap/common';
export default { name: 'AnalyticsService' }
// enum
const BookingStatu_code = {
  New: "N",
  Booked: "B",
  Canceled: "X",
} as const;
type BookingStatu_code = "N" | "B" | "X"

// enum
const TravelStatu_code = {
  Open: "O",
  Accepted: "A",
  Canceled: "X",
} as const;
type TravelStatu_code = "O" | "A" | "X"

export function _BookingAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Booking extends Base {
        BookingUUID?: string;
        BookingID?: number;
        BookingDate?: string;
        ConnectionID?: string;
        FlightDate?: string;
        FlightPrice?: number;
    /**
    * Type for an association to Currencies
    * 
    * See https://cap.cloud.sap/docs/cds/common#type-currency
    */
        CurrencyCode?: _.Currency;
        CurrencyCode_code?: string;
        BookingStatus?: __.Association.to<_sap_fe_cap_travel.BookingStatu>;
        BookingStatus_code?: BookingStatu_code;
        to_BookSupplement?: __.Composition.of.many<_sap_fe_cap_travel.BookingSupplement_>;
        to_BookSupplement_BookSupplUUID?: string;
        to_Carrier?: __.Association.to<_sap_fe_cap_travel.Airline>;
        to_Carrier_AirlineID?: string;
        to_Customer?: __.Association.to<_sap_fe_cap_travel.Passenger>;
        to_Customer_CustomerID?: string;
        to_Travel?: __.Association.to<_sap_fe_cap_travel.Travel>;
        to_Travel_TravelUUID?: string;
        to_Flight?: __.Association.to<_sap_fe_cap_travel.Flight>;
        to_Flight_AirlineID?: string;
        to_Flight_FlightDate?: string;
        to_Flight_ConnectionID?: string;
      static actions: {
    }
  };
}
export class Booking extends _custom._managedAspect(_BookingAspect(__.Entity)) {static drafts: typeof Booking}
export class Bookings extends Array<Booking> {static drafts: typeof Booking}
Object.defineProperty(Booking, 'name', { value: 'AnalyticsService.Bookings' })
Object.defineProperty(Bookings, 'name', { value: 'AnalyticsService.Bookings' })

export function _BookingStatuAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class BookingStatu extends Base {
        code?: BookingStatu_code;
      static code = BookingStatu_code
      static actions: {
    }
  };
}
export class BookingStatu extends _sap_common._CodeListAspect(_BookingStatuAspect(__.Entity)) {}
export class BookingStatus extends Array<BookingStatu> {}
Object.defineProperty(BookingStatu, 'name', { value: 'AnalyticsService.BookingStatus' })
Object.defineProperty(BookingStatus, 'name', { value: 'AnalyticsService.BookingStatus' })

export function _TravelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Travel extends Base {
        TravelUUID?: string;
        TravelID?: number;
        BeginDate?: string;
        EndDate?: string;
        BookingFee?: number;
        TotalPrice?: number;
    /**
    * Type for an association to Currencies
    * 
    * See https://cap.cloud.sap/docs/cds/common#type-currency
    */
        CurrencyCode?: _.Currency;
        CurrencyCode_code?: string;
        Description?: string;
        TravelStatus?: __.Association.to<_sap_fe_cap_travel.TravelStatu>;
        TravelStatus_code?: TravelStatu_code;
        to_Agency?: __.Association.to<_sap_fe_cap_travel.TravelAgency>;
        to_Agency_AgencyID?: string;
        to_Customer?: __.Association.to<_sap_fe_cap_travel.Passenger>;
        to_Customer_CustomerID?: string;
        to_Booking?: __.Composition.of.many<_sap_fe_cap_travel.Booking_>;
        to_Booking_BookingUUID?: string;
      static actions: {
    }
  };
}
export class Travel extends _custom._managedAspect(_TravelAspect(__.Entity)) {}
export class Travels extends Array<Travel> {}
Object.defineProperty(Travel, 'name', { value: 'AnalyticsService.Travels' })
Object.defineProperty(Travels, 'name', { value: 'AnalyticsService.Travels' })

export function _AirlineAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Airline extends Base {
        AirlineID?: string;
        Name?: string;
    /**
    * Type for an association to Currencies
    * 
    * See https://cap.cloud.sap/docs/cds/common#type-currency
    */
        CurrencyCode?: _.Currency;
        CurrencyCode_code?: string;
        AirlinePicURL?: string;
      static actions: {
    }
  };
}
export class Airline extends _sap_fe_cap_travel._MasterDataAspect(_AirlineAspect(__.Entity)) {}
export class Airline_ extends Array<Airline> {}
Object.defineProperty(Airline, 'name', { value: 'sap.fe.cap.travel.Airline' })
Object.defineProperty(Airline_, 'name', { value: 'sap.fe.cap.travel.Airline' })

export function _FlightAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Flight extends Base {
        AirlineID?: string;
        FlightDate?: string;
        ConnectionID?: string;
        Price?: number;
    /**
    * Type for an association to Currencies
    * 
    * See https://cap.cloud.sap/docs/cds/common#type-currency
    */
        CurrencyCode?: _.Currency;
        CurrencyCode_code?: string;
        PlaneType?: string;
        MaximumSeats?: number;
        OccupiedSeats?: number;
        to_Airline?: __.Association.to<_sap_fe_cap_travel.Airline>;
        to_Airline_AirlineID?: string;
        to_Connection?: __.Association.to<_sap_fe_cap_travel.FlightConnection>;
        to_Connection_ConnectionID?: string;
        to_Connection_AirlineID?: string;
      static actions: {
    }
  };
}
export class Flight extends _sap_fe_cap_travel._MasterDataAspect(_FlightAspect(__.Entity)) {}
export class Flight_ extends Array<Flight> {}
Object.defineProperty(Flight, 'name', { value: 'sap.fe.cap.travel.Flight' })
Object.defineProperty(Flight_, 'name', { value: 'sap.fe.cap.travel.Flight' })

/**
* Code list for currencies
* 
* See https://cap.cloud.sap/docs/cds/common#entity-currencies
*/
export function _CurrencyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Currency extends Base {
        code?: string;
        symbol?: string;
        minorUnit?: number;
        numcode?: number;
        exponent?: number;
        minor?: string;
      static actions: {
    }
  };
}
export class Currency extends _sap_common._CodeListAspect(_CurrencyAspect(__.Entity)) {}
export class Currencies extends Array<Currency> {}
Object.defineProperty(Currency, 'name', { value: 'sap.common.Currencies' })
Object.defineProperty(Currencies, 'name', { value: 'sap.common.Currencies' })

export function _TravelStatuAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TravelStatu extends Base {
        code?: TravelStatu_code;
        criticality?: number;
        fieldControl?: number;
        createDeleteHidden?: boolean;
        insertDeleteRestriction?: boolean;
      static code = TravelStatu_code
      static actions: {
    }
  };
}
export class TravelStatu extends _sap_common._CodeListAspect(_TravelStatuAspect(__.Entity)) {}
export class TravelStatus extends Array<TravelStatu> {}
Object.defineProperty(TravelStatu, 'name', { value: 'sap.fe.cap.travel.TravelStatus' })
Object.defineProperty(TravelStatus, 'name', { value: 'sap.fe.cap.travel.TravelStatus' })

export function _TravelAgencyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class TravelAgency extends Base {
        AgencyID?: string;
        Name?: string;
        Street?: string;
        PostalCode?: string;
        City?: string;
    /**
    * Type for an association to Countries
    * 
    * See https://cap.cloud.sap/docs/cds/common#type-country
    */
        CountryCode?: _.Country;
        CountryCode_code?: string;
        PhoneNumber?: string;
        EMailAddress?: string;
        WebAddress?: string;
      static actions: {
    }
  };
}
export class TravelAgency extends _sap_fe_cap_travel._MasterDataAspect(_TravelAgencyAspect(__.Entity)) {}
export class TravelAgency_ extends Array<TravelAgency> {}
Object.defineProperty(TravelAgency, 'name', { value: 'sap.fe.cap.travel.TravelAgency' })
Object.defineProperty(TravelAgency_, 'name', { value: 'sap.fe.cap.travel.TravelAgency' })

export function _PassengerAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Passenger extends Base {
        CustomerID?: string;
        FirstName?: string;
        LastName?: string;
        Title?: string;
        Street?: string;
        PostalCode?: string;
        City?: string;
    /**
    * Type for an association to Countries
    * 
    * See https://cap.cloud.sap/docs/cds/common#type-country
    */
        CountryCode?: _.Country;
        CountryCode_code?: string;
        PhoneNumber?: string;
        EMailAddress?: string;
      static actions: {
    }
  };
}
export class Passenger extends _custom._managedAspect(_sap_fe_cap_travel._MasterDataAspect(_PassengerAspect(__.Entity))) {}
export class Passenger_ extends Array<Passenger> {}
Object.defineProperty(Passenger, 'name', { value: 'sap.fe.cap.travel.Passenger' })
Object.defineProperty(Passenger_, 'name', { value: 'sap.fe.cap.travel.Passenger' })

export function _FlightConnectionAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class FlightConnection extends Base {
        ConnectionID?: string;
        AirlineID?: string;
        DepartureAirport?: __.Association.to<_sap_fe_cap_travel.Airport>;
        DepartureAirport_AirportID?: string;
        DestinationAirport?: __.Association.to<_sap_fe_cap_travel.Airport>;
        DestinationAirport_AirportID?: string;
        DepartureTime?: string;
        ArrivalTime?: string;
        Distance?: number;
        DistanceUnit?: string;
        to_Airline?: __.Association.to<_sap_fe_cap_travel.Airline>;
        to_Airline_AirlineID?: string;
      static actions: {
    }
  };
}
export class FlightConnection extends _sap_fe_cap_travel._MasterDataAspect(_FlightConnectionAspect(__.Entity)) {}
export class FlightConnection_ extends Array<FlightConnection> {}
Object.defineProperty(FlightConnection, 'name', { value: 'sap.fe.cap.travel.FlightConnection' })
Object.defineProperty(FlightConnection_, 'name', { value: 'sap.fe.cap.travel.FlightConnection' })

/**
* Code list for countries
* 
* See https://cap.cloud.sap/docs/cds/common#entity-countries
*/
export function _CountryAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Country extends Base {
        code?: string;
      static actions: {
    }
  };
}
export class Country extends _sap_common._CodeListAspect(_CountryAspect(__.Entity)) {}
export class Countries extends Array<Country> {}
Object.defineProperty(Country, 'name', { value: 'sap.common.Countries' })
Object.defineProperty(Countries, 'name', { value: 'sap.common.Countries' })

export function _AirportAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Airport extends Base {
        AirportID?: string;
        Name?: string;
        City?: string;
    /**
    * Type for an association to Countries
    * 
    * See https://cap.cloud.sap/docs/cds/common#type-country
    */
        CountryCode?: _.Country;
        CountryCode_code?: string;
      static actions: {
    }
  };
}
export class Airport extends _sap_fe_cap_travel._MasterDataAspect(_AirportAspect(__.Entity)) {}
export class Airport_ extends Array<Airport> {}
Object.defineProperty(Airport, 'name', { value: 'sap.fe.cap.travel.Airport' })
Object.defineProperty(Airport_, 'name', { value: 'sap.fe.cap.travel.Airport' })
