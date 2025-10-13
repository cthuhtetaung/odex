# Airtable Integration Setup for OdeX Website

## Overview
Your website contact form is now configured to submit data directly to your Airtable "Kairoswallet" base.

## Setup Instructions

### 1. Get Your Airtable Credentials

#### API Key:
1. Go to https://airtable.com/create/tokens
2. Click "Create new token"
3. Name it "OdeX Website Integration"
4. Give it access to your "Kairoswallet" base
5. Copy the generated API key

#### Base ID:
1. Go to https://airtable.com/api
2. Find your "Kairoswallet" base
3. Copy the Base ID (starts with "app...")

### 2. Update the JavaScript File

In `/js/main.js`, find these lines (around line 1580):

```javascript
const AIRTABLE_API_KEY = 'YOUR_AIRTABLE_API_KEY'; // Replace with your actual API key
const BASE_ID = 'YOUR_BASE_ID'; // Replace with your Kairoswallet base ID
```

Replace with your actual credentials:
```javascript
const AIRTABLE_API_KEY = 'patXXXXXXXXXXXXXX'; // Your actual API key
const BASE_ID = 'appXXXXXXXXXXXXXX'; // Your actual base ID
```

### 3. Configure Airtable Fields

Based on your current Airtable structure, the form will submit to these fields:
- `A Name` - Contact's name
- `A Company Name` - Company name
- `A Email` - Email address
- `A Phone` - Phone number
- `A Message` - Message content
- `A Contact Research` - Set to "Website Contact Form"
- `Created` - Today's date

### 4. Field Mapping

If your Airtable fields have different names, update the field mapping in the `submitToAirtable` function:

```javascript
fields: {
    'Your Actual Field Name': data.name,
    'Your Company Field': data.company,
    // ... etc
}
```

### 5. Test the Integration

1. Go to your contact page
2. Fill out the form
3. Submit it
4. Check your Airtable base to see if the data appears

## Security Notes

⚠️ **Important**: The API key is currently visible in the JavaScript code. For production use, consider:

1. Using a server-side proxy
2. Setting up CORS properly
3. Using environment variables
4. Implementing rate limiting

## Troubleshooting

### Common Issues:

1. **CORS Error**: Make sure your Airtable base allows web requests
2. **Field Not Found**: Check that field names in Airtable match exactly
3. **Permission Error**: Ensure your API key has write access to the base
4. **Base Not Found**: Verify the Base ID is correct

### Testing API Connection:

You can test your credentials using this URL in your browser (replace with your actual values):
```
https://api.airtable.com/v0/YOUR_BASE_ID/Table%201?api_key=YOUR_API_KEY
```

## Support

If you need help setting this up, check:
1. Airtable API documentation: https://airtable.com/developers/web/api/introduction
2. Your Airtable base field names and structure
3. Browser console for any JavaScript errors
