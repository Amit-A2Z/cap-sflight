// This is an automatically generated file. Please do not change its contents manually!
const cds = require('@sap/cds')
const csn = cds.entities('AnalyticsService')
module.exports = { name: 'AnalyticsService' }
module.exports.Booking = csn.Bookings
module.exports.Bookings = csn.Bookings
module.exports.BookingStatu = csn.BookingStatus
module.exports.BookingStatus = csn.BookingStatus
module.exports.Travel = csn.Travels
module.exports.Travels = csn.Travels
module.exports.Airline = csn.Airline
module.exports.Airline_ = csn.Airline
module.exports.Flight = csn.Flight
module.exports.Flight_ = csn.Flight
module.exports.Currency = csn.Currencies
module.exports.Currencies = csn.Currencies
module.exports.TravelStatu = csn.TravelStatus
module.exports.TravelStatus = csn.TravelStatus
module.exports.TravelAgency = csn.TravelAgency
module.exports.TravelAgency_ = csn.TravelAgency
module.exports.Passenger = csn.Passenger
module.exports.Passenger_ = csn.Passenger
module.exports.FlightConnection = csn.FlightConnection
module.exports.FlightConnection_ = csn.FlightConnection
module.exports.Country = csn.Countries
module.exports.Countries = csn.Countries
module.exports.Airport = csn.Airport
module.exports.Airport_ = csn.Airport
// events
// actions
// enums
module.exports.BookingStatu.code = Object.fromEntries(Object.entries(cds.model.definitions['AnalyticsService.BookingStatus'].elements.code.enum).map(([k,v]) => [k,v.val]))
module.exports.TravelStatu.code = Object.fromEntries(Object.entries(cds.model.definitions['AnalyticsService.TravelStatus'].elements.code.enum).map(([k,v]) => [k,v.val]))
