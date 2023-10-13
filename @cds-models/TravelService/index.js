// This is an automatically generated file. Please do not change its contents manually!
const cds = require('@sap/cds')
const csn = cds.entities('TravelService')
module.exports = { name: 'TravelService' }
module.exports.Travel = csn.Travel
module.exports.Travel_ = csn.Travel
module.exports.Currency = csn.Currencies
module.exports.Currencies = csn.Currencies
module.exports.TravelStatu = csn.TravelStatus
module.exports.TravelStatus = csn.TravelStatus
module.exports.TravelAgency = csn.TravelAgency
module.exports.TravelAgency_ = csn.TravelAgency
module.exports.Passenger = csn.Passenger
module.exports.Passenger_ = csn.Passenger
module.exports.Booking = csn.Booking
module.exports.Booking_ = csn.Booking
module.exports.Country = csn.Countries
module.exports.Countries = csn.Countries
module.exports.BookingStatu = csn.BookingStatus
module.exports.BookingStatus = csn.BookingStatus
module.exports.BookingSupplement = csn.BookingSupplement
module.exports.BookingSupplement_ = csn.BookingSupplement
module.exports.Airline = csn.Airline
module.exports.Airline_ = csn.Airline
module.exports.Flight = csn.Flight
module.exports.Flight_ = csn.Flight
module.exports.Supplement = csn.Supplement
module.exports.Supplement_ = csn.Supplement
module.exports.FlightConnection = csn.FlightConnection
module.exports.FlightConnection_ = csn.FlightConnection
module.exports.SupplementType = csn.SupplementType
module.exports.SupplementType_ = csn.SupplementType
module.exports.Airport = csn.Airport
module.exports.Airport_ = csn.Airport
// events
// actions
// enums
module.exports.TravelStatu.code = Object.fromEntries(Object.entries(cds.model.definitions['TravelService.TravelStatus'].elements.code.enum).map(([k,v]) => [k,v.val]))
module.exports.BookingStatu.code = Object.fromEntries(Object.entries(cds.model.definitions['TravelService.BookingStatus'].elements.code.enum).map(([k,v]) => [k,v.val]))
module.exports.SupplementType.code = Object.fromEntries(Object.entries(cds.model.definitions['TravelService.SupplementType'].elements.code.enum).map(([k,v]) => [k,v.val]))
