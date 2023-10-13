// This is an automatically generated file. Please do not change its contents manually!
const cds = require('@sap/cds')
const csn = cds.entities('sap.fe.cap.travel')
module.exports.Airline = csn.Airline
module.exports.Airline_ = csn.Airline
module.exports.Airport = csn.Airport
module.exports.Airport_ = csn.Airport
module.exports.Supplement = csn.Supplement
module.exports.Supplement_ = csn.Supplement
module.exports.Flight = csn.Flight
module.exports.Flight_ = csn.Flight
module.exports.FlightConnection = csn.FlightConnection
module.exports.FlightConnection_ = csn.FlightConnection
module.exports.Passenger = csn.Passenger
module.exports.Passenger_ = csn.Passenger
module.exports.TravelAgency = csn.TravelAgency
module.exports.TravelAgency_ = csn.TravelAgency
module.exports.SupplementType = csn.SupplementType
module.exports.SupplementType_ = csn.SupplementType
module.exports.Travel = csn.Travel
module.exports.Travel_ = csn.Travel
module.exports.Booking = csn.Booking
module.exports.Booking_ = csn.Booking
module.exports.BookingSupplement = csn.BookingSupplement
module.exports.BookingSupplement_ = csn.BookingSupplement
module.exports.BookingStatu = csn.BookingStatus
module.exports.BookingStatus = csn.BookingStatus
module.exports.TravelStatu = csn.TravelStatus
module.exports.TravelStatus = csn.TravelStatus
// events
// actions
// enums
module.exports.SupplementType.code = Object.fromEntries(Object.entries(cds.model.definitions['sap.fe.cap.travel.SupplementType'].elements.code.enum).map(([k,v]) => [k,v.val]))
module.exports.BookingStatu.code = Object.fromEntries(Object.entries(cds.model.definitions['sap.fe.cap.travel.BookingStatus'].elements.code.enum).map(([k,v]) => [k,v.val]))
module.exports.TravelStatu.code = Object.fromEntries(Object.entries(cds.model.definitions['sap.fe.cap.travel.TravelStatus'].elements.code.enum).map(([k,v]) => [k,v.val]))
