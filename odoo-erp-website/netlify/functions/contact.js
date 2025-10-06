exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, company, email, phone, message } = JSON.parse(event.body || '{}');

    if (!name || !email || !message) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Missing required fields' }) };
    }

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableIdOrName = process.env.AIRTABLE_TABLE_ID || process.env.TABLE_NAME;

    if (!apiKey || !baseId || !tableIdOrName) {
      return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'Server not configured' }) };
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableIdOrName)}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Name: name,
              Company: company || '',
              Email: email,
              Phone: phone || '',
              Message: message
            }
          }
        ]
      })
    });

    if (!res.ok) {
      const txt = await res.text();
      return { statusCode: res.status, body: JSON.stringify({ ok: false, error: txt }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: e.message }) };
  }
};
