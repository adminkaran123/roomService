HUBSPOT_CLIENT_ID=9c3ce827-82a1-4831-81a9-cb2bd9341024
HUBSPOT_CLIENT_SECRET=78732e33-f56f-4ff7-a11f-02a506e3f279
MONGO_USER=karan
MONGO_DB = mongodb+srv://karan:fmW4olpcySm3xA81@cluster0.n61e1bl.mongodb.net/;

const _ = require('lodash');

const express = require('express');
const hubspot = require('@hubspot/api-client');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_DB;
mongoose
  .connect(uri)
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => console.log('no connection', uri));

const PORT = 3000;
const OBJECTS_LIMIT = 30;
const CLIENT_ID = process.env.HUBSPOT_CLIENT_ID;
const CLIENT_SECRET = process.env.HUBSPOT_CLIENT_SECRET;
const SCOPES ='crm.objects.contacts.read%20crm.objects.contacts.write%20crm.schemas.contacts.read';
const REDIRECT_URI = `http://localhost:${PORT}/oauth-callback`;
const GRANT_TYPES = {
  AUTHORIZATION_CODE: 'authorization_code',
  REFRESH_TOKEN: 'refresh_token',
};

let tokenStore = {};

const logResponse = (message, data) => {
  console.log(message, JSON.stringify(data, null, 1));
};

const checkEnv = (req, res, next) => {
  if (_.startsWith(req.url, '/error')) return next();

  if (_.isNil(CLIENT_ID))
    return res.redirect(
      '/error?msg=Please set HUBSPOT_CLIENT_ID env variable to proceed'
    );
  if (_.isNil(CLIENT_SECRET))
    return res.redirect(
      '/error?msg=Please set HUBSPOT_CLIENT_SECRET env variable to proceed'
    );

  next();
};

const isAuthorized = () => {
  return !_.isEmpty(tokenStore.refreshToken);
};

const isTokenExpired = () => {
  return Date.now() >= tokenStore.updatedAt + tokenStore.expiresIn * 1000;
};

const prepareContactsContent = (contacts) => {
  return _.map(contacts, (contact) => {
    const companyName = _.get(contact, 'properties.company') || '';
    const name = getFullName(contact.properties);
    return { id: contact.id, name, companyName };
  });
};

const getFullName = (contactProperties) => {
  const firstName = _.get(contactProperties, 'firstname') || '';
  const lastName = _.get(contactProperties, 'lastname') || '';
  return `${firstName} ${lastName}`;
};

const refreshToken = async () => {
  const result = await hubspotClient.oauth.tokensApi.createToken(
    GRANT_TYPES.REFRESH_TOKEN,
    undefined,
    undefined,
    CLIENT_ID,
    CLIENT_SECRET,
    tokenStore.refreshToken
  );
  tokenStore = result;
  tokenStore.updatedAt = Date.now();
  console.log('Updated tokens', tokenStore);

  hubspotClient.setAccessToken(tokenStore.accessToken);
};

const handleError = (e, res) => {
  if (_.isEqual(e.message, 'HTTP request failed')) {
    const errorMessage = JSON.stringify(e, null, 2);
    console.error(errorMessage);
    return res.redirect(`/error?msg=${errorMessage}`);
  }

  console.error(e);
  res.redirect(
    `/error?msg=${JSON.stringify(e, Object.getOwnPropertyNames(e), 2)}`
  );
};

const app = express();


const hubspotClient = new hubspot.Client();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  })
);

app.use(
  bodyParser.json({
    limit: '50mb',
    extended: true,
  })
);
app.use(
  cookieSession({
    name: 'bezkoder-session',
    keys: ['COOKIE_SECRET'], // should use as secret environment variable
    httpOnly: true,
  })
);
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});
app.use(checkEnv);

// simple route

app.get('/', async (req, res) => {
  try {
    if (!isAuthorized()) return res.render('login');
    if (isTokenExpired()) await refreshToken();

    const properties = ['firstname', 'lastname', 'company'];

    // Get first contacts page
    // GET /crm/v3/objects/contacts
    // https://developers.hubspot.com/docs/api/crm/contacts
    console.log('Calling crm.contacts.basicApi.getPage. Retrieve contacts.');
    const contactsResponse = await hubspotClient.crm.contacts.basicApi.getPage(
      OBJECTS_LIMIT,
      undefined,
      properties
    );
    logResponse('Response from API', contactsResponse);

    res.render('contacts', {
      tokenStore,
      contacts: prepareContactsContent(contactsResponse.results),
    });
  } catch (e) {
    handleError(e, res);
  }
});

app.use('/oauth', async (req, res) => {
  // Use the client to get authorization Url
  // https://www.npmjs.com/package/@hubspot/api-client#obtain-your-authorization-url
  console.log('Creating authorization Url');
  const authorizationUrl = hubspotClient.oauth.getAuthorizationUrl(
    CLIENT_ID,
    REDIRECT_URI,
    encodeURIComponent(SCOPES)
  );

  //const authUrl = `https://app.hubspot.com/oauth/authorize?client_id=9c3ce827-82a1-4831-81a9-cb2bd9341024&redirect_uri=${REDIRECT_URI}&scope=`
  console.log('Authorization Url', authorizationUrl);

  res.redirect(authorizationUrl);
});

app.use('/oauth-callback', async (req, res) => {
  const code = _.get(req, 'query.code');

  // Create OAuth 2.0 Access Token and Refresh Tokens
  // POST /oauth/v1/token
  // https://developers.hubspot.com/docs/api/working-with-oauth
  console.log('Retrieving access token by code:', code);
  const getTokensResponse = await hubspotClient.oauth.tokensApi.createToken(
    GRANT_TYPES.AUTHORIZATION_CODE,
    code,
    REDIRECT_URI,
    CLIENT_ID,
    CLIENT_SECRET
  );
  logResponse('Retrieving access token result:', getTokensResponse);

  tokenStore = getTokensResponse;
  tokenStore.updatedAt = Date.now();

  // Set token for the
  // https://www.npmjs.com/package/@hubspot/api-client
  hubspotClient.setAccessToken(tokenStore.accessToken);
  res.redirect('/');
});

app.get('/login', (req, res) => {
  tokenStore = {};
  res.redirect('/');
});

app.get('/refresh', async (req, res) => {
  try {
    if (isAuthorized()) await refreshToken();
    res.redirect('/');
  } catch (e) {
    handleError(e, res);
  }
});

app.get('/error', (req, res) => {
  res.render('error', { error: req.query.msg });
});

app.use((error, req, res) => {
  res.render('error', { error: error.message });
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

