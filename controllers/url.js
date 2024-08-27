const shortid = require("shortid");
const URL = require("../models/url");

async function handlegenerateNewShortURL(req,res){
    const shortID = shortid();
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "URL is required"});
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistort: [],
        createdBy: req.user._id,
    });

    return res.render("homepage",{
        id: shortID,
    });

}
async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks: result.visitHistort.length, analytics: result.visitHistort});
}
module.exports= {
    handlegenerateNewShortURL,
    handleGetAnalytics,
}