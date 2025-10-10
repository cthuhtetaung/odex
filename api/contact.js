export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    // Enforce JSON content type
    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('application/json')) {
      return res.status(415).json({ ok: false, error: 'Unsupported Media Type' });
    }

    // Basic origin check (adjust allowed list if you change domains)
    const origin = req.headers.origin || '';
    const allowedOrigins = [
      'https://cthuhtetaung.github.io',
      'https://*.vercel.app'
    ];
    if (origin && !allowedOrigins.some(o => {
      if (o.includes('*')) {
        const suffix = o.replace('https://*', '');
        return origin.startsWith('https://') && origin.endsWith(suffix);
      }
      return origin === o;
    })) {
      return res.status(403).json({ ok: false, error: 'Forbidden' });
    }

    const { name, company, email, phone, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    // Honeypot: drop obvious bots
    if (req.body.companyWebsite) {
      return res.status(200).json({ ok: true });
    }

    // Trim and length constraints
    const trimmed = {
      name: String(name).trim().slice(0, 120),
      company: String(company || '').trim().slice(0, 120),
      email: String(email).trim().slice(0, 150),
      phone: String(phone || '').trim().slice(0, 40),
      message: String(message).trim().slice(0, 2000)
    };

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
              'A Name': trimmed.name,
              'A Company Name': trimmed.company,
              'A Email': trimmed.email,
              'A Ph No.': trimmed.phone,
              'A Msg': trimmed.message
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
