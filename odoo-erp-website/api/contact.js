export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const { name, company, email, phone, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableIdOrName = process.env.AIRTABLE_TABLE_ID || process.env.TABLE_NAME;

    if (!apiKey || !baseId || !tableIdOrName) {
      return res.status(500).json({ ok: false, error: 'Server not configured' });
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableIdOrName)}`;

    const airtableResp = await fetch(url, {
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

    if (!airtableResp.ok) {
      const txt = await airtableResp.text();
      return res.status(airtableResp.status).json({ ok: false, error: txt });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}
