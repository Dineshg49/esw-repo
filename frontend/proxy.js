
const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/test', (req, res) => {
  request(
    { url: 'https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-12/Node-1/Data/la',
		headers: {
			'X-M2M-Origin': 'DLVosnfNhb:8FHrMl@3TX',
			'Accept': 'application/json'
		}
},
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

app.get('/testy', (req, res) => {
  request(
    { url: 'https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-12/Node-1/Data?rcn=4',
		headers: {
			'X-M2M-Origin': 'DLVosnfNhb:8FHrMl@3TX',
			'Accept': 'application/json'
		}
},
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
