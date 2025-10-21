import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // Unique identifier per client
    const identifier = req.ip; // fetching the ip of the clients since no authentication in the application that is why cant fetch the user id
    // this ip will only block the client with tht specific ip and not everyone 
    // if we do not use unique ids for rate limit if the site reach the rate limit then it will be blocked for everyone

    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    next();
  } catch (error) {
    console.error("Rate Limit Error:", error);
    next(error);
  }
};

export default rateLimiter;
