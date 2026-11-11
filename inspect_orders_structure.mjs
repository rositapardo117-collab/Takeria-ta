import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function inspect() {
  console.log('Inspecting orders table structure...');
  const { data, error } = await supabase.from('orders').select('*').limit(1);
  if (error) {
    console.error('Error fetching order:', error);
    return;
  }
  if (data && data.length > 0) {
    console.log('Sample order structure:', JSON.stringify(data[0], null, 2));
  } else {
    console.log('No orders found to inspect structure.');
  }
}

inspect();
