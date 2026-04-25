// 1. Load the secret passwords first!
require('dotenv').config();

// 2. Import the tools
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// 3. Create the 'app' (This is what was missing!)
const app = express();
const PORT = 5001;

// 4. Setup middleware
app.use(cors());
app.use(express.json());

// 5. Connect to Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- ROUTE 1: GET ALL PROPERTIES (For the website load) ---
app.get('/api/properties', async (req, res) => {
  console.log("📥 GET /api/properties request received at:", new Date().toISOString());
  try {
    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Supabase credentials missing in .env");
      return res.status(500).json({ error: 'Server configuration error: Supabase credentials missing' });
    }

    const { data, error } = await supabase
      .from('properties')
      .select('*');

    if (error) {
      console.error("❌ Supabase Error:", JSON.stringify(error, null, 2));
      return res.status(500).json({ error: error.message || 'Supabase query failed' });
    }

    console.log(`✅ Successfully fetched ${data?.length || 0} properties`);
    res.json(data); 

  } catch (err) {
    console.error("❌ Database error (catch block):", err);
    res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
});

// --- ROUTE 2: ADD A NEW PROPERTY (Secure) ---
app.post('/api/properties', async (req, res) => {
  
  // Security Check
  const userPassword = req.headers.authorization;
  if (userPassword?.trim() !== process.env.ADMIN_PASSWORD?.trim()) {
    return res.status(403).json({ error: 'Unauthorized! Only the administrator can add listings.' });
  }

  try {
    const newProperty = {
      address: req.body.address,
      price: Number(req.body.price),
      size: Number(req.body.size),
      type: req.body.type,
      desc: req.body.desc,
      postal: '585202 Gurumitkal',
      energy: 'C',
      isNew: true,
      isOpen: false,
      isEye: false,
      agent: 'prashat reddy',
      img: '/image/plot1.png',
      lat: 16.865 + (Math.random() * 0.005), 
      lng: 77.392 + (Math.random() * 0.005)
    };

    const { data, error } = await supabase
      .from('properties')
      .insert([newProperty])
      .select();

    if (error) throw error;
    res.json(data[0]); 

  } catch (err) {
    console.error("Error saving property:", err.message);
    res.status(500).json({ error: 'Failed to add property' });
  }
});

// 6. Turn the server on!
app.listen(PORT, () => {
  console.log(`✅ server is open! Connected to Supabase on port ${PORT}`);
});

// Keep the process alive for the sandbox
setInterval(() => {}, 1000);