// router.js
const {API_KEY, API_SECRET} = require("./config");
const Amadeus = require("amadeus");
const express = require("express");

// Create router
const router = express.Router();
// Create Amadeus API client
const amadeus = new Amadeus({
    clientId: API_KEY,
    clientSecret: API_SECRET,
});
const API = "api";
// City search suggestions
router.get(`/${API}/search`, async (req, res) => {
    try {
        const {keyword} = req.query;
        // console.log(keyword)
        const response = await amadeus.referenceData.locations.get({
            keyword,
            subType: Amadeus.location.city,
        });
        // console.log(response.body)

        await res.json(JSON.parse(response.body));
    } catch (err) {
        await res.json(err);
    }
});
// Querying hotels
router.get(`/${API}/hotels`, async (req, res) => {
    try {
        const {cityCode, checkInDate, checkOutDate} = req.query;
        const response = await amadeus.shopping.hotelOffers.get({
        // const response = await amadeus.shopping.hotelOffersSearch.get({
        // const response = await amadeus.referenceData.locations.hotels.byCity.get({
            cityCode,
            checkInDate,
            checkOutDate,
        });
         console.log(cityCode, checkInDate, checkOutDate)
        console.log(response.body)

        await res.json(JSON.parse(response.body));
    } catch (err) {
        await res.json(err);
    }
});
// Querying hotel offers
router.get(`/${API}/offers`, async (req, res) => {
    try {
        const {hotelId} = req.query;
        console.log(hotelId)
        const response = await amadeus.shopping.hotelOffersByHotel.get({
            hotelId,
        });

        await res.json(JSON.parse(response.body));
    } catch (err) {
        await res.json(err);
    }
});
// Confirming the offer
router.get(`/${API}/offer`, async (req, res) => {
    try {
        const {offerId} = req.query;
        console.log(offerId)
        const response = await amadeus.shopping.hotelOffer(offerId).get();

        await res.json(JSON.parse(response.body));
    } catch (err) {
        await res.json(err);
    }
});
// Booking
router.post(`/${API}/booking`, async (req, res) => {
    try {
        const {offerId} = req.query;
        console.log(offerId)
        const {body} = req;
        const response = await amadeus.booking.hotelBookings.post(
            JSON.stringify({
                data: {
                    offerId,
                    guests: body.guests,
                    payments: body.payments,
                },
            })
        );

        res.json(JSON.parse(response.body));
    } catch (err) {
        await res.json(err);
    }
});

module.exports = router;
