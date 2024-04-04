const axios = require("axios");
const md5 = require("md5");

const generateAuthHeader = () => {
  const clientKey = process.env.CLIENT_KEY;
  const clientSecret = process.env.CLIENT_SECRET;
  const userKey = process.env.USER_KEY;
  const userSecret = process.env.USER_SECRET;
  const nonce = Math.random().toString(36).substring(7);
  const timestamp = Math.floor(Date.now() / 1000);

  const cSecretHash = md5(clientSecret + nonce);
  const uSecretHash = md5(userSecret + nonce);

  return `c_key=${clientKey},c_secret=${cSecretHash},u_key=${userKey},u_secret=${uSecretHash},nonce=${nonce},timestamp=${timestamp}`;
};

const getLists = async (req, res) => {
  try {
    const authHeader = generateAuthHeader();

    const response = await axios.get("http://api.responder.co.il/main/lists", {
      headers: {
        Authorization: authHeader,
      },
    });

    res.status(response.status).json(response.data);
    console.log("lists:" + response.data);
  } catch (error) {
    console.error("Error fetching lists:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSubscribers = async (req, res) => {
  try {
    const authHeader = generateAuthHeader();
    const listId = req.params.listId; // Retrieve listId from request parameters

    const response = await axios.get(
      `http://api.responder.co.il/main/lists/${listId}/subscribers`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    res.status(response.status).json(response.data);
    console.log("subscribers:" + response.data);
  } catch (error) {
    console.error("Error fetching subscribers:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addSubscriber = async (req, res) => {
    try {
      const authHeader = generateAuthHeader();
      const listId = req.params.listId;
      const { name, email, phone } = req.body; // Destructure name, email, phone from req.body
  
      const subscriber = {
        NAME: name, 
        EMAIL: email, 
        PHONE: phone, 
        STATUS: 1,
        PHONE_IGNORE: 0,
      };
  
      const response = await axios.post(
        `http://api.responder.co.il/main/lists/${listId}/subscribers`,
        JSON.stringify(subscriber),
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json"
          }
        }
      );
  
      res.status(response.status).json(response.data);
      console.log("Subscriber added:", response.data);
    } catch (error) {
      console.error("Error adding subscriber:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
module.exports = { getLists, getSubscribers, addSubscriber };
