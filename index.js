import SendbirdPlatformSdk from "sendbird_platform_sdk";
import dotEnv from "dotenv";
import bodyParser from "body-parser";
import { google } from "googleapis";
import express from "express";

dotEnv.config();
const app = express();
const port = 3000;
app.use(bodyParser.text({ type: "json" }));

var apiInstance = new SendbirdPlatformSdk.GroupChannelApi();
apiInstance.apiClient.basePath = `https://api-${process.env.APP_ID}.sendbird.com`;

function banUser(channelUrl, senderId) {
  var seconds = 86400;
  var description = "Toxic message sent- User will be banned for 1 day";
  var agentId = 0;
  var opts = {
    apiToken: process.env.API_TOKEN,
    gcBanUserData: new SendbirdPlatformSdk.GcBanUserData(
      channelUrl,
      senderId,
      agentId,
      seconds,
      description
    ),
  };

  apiInstance.gcBanUser(channelUrl, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully. Returned data: " + data);
    }
  });
}

function testToxicity(message, channelUrl, senderId) {
  var API_KEY = process.env.PERSPECTIVE_API_KEY;
  var DISCOVERY_URL =
    "https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1";

  google
    .discoverAPI(DISCOVERY_URL)
    .then((client) => {
      const analyzeRequest = {
        comment: {
          text: message,
        },
        requestedAttributes: {
          TOXICITY: {},
        },
      };

      client.comments.analyze(
        {
          key: API_KEY,
          resource: analyzeRequest,
        },
        (err, response) => {
          if (err) throw err;
          console.log(JSON.stringify(response.data, null, 2));
          if (
            response.data.attributeScores.TOXICITY.spanScores[0].score.value >
            0.5
          ) {
            banUser(channelUrl, senderId);
          }
        }
      );
    })
    .catch((err) => {
      throw err;
    });
}

app.post("/analyze_message", async (req, res) => {
  const body = req.body;
  const parsedBody = JSON.parse(body);
  var channelUrl = parsedBody.channel.channel_url;
  var message = parsedBody.payload.message;
  var senderId = parsedBody.sender.user_id;
  testToxicity(message, channelUrl, senderId);
  res.send(parsedBody);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
