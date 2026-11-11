import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://klcisvnvkckwjeeznrfd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsY2lzdm52a2Nrd2plZXpucmZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NjkxNjksImV4cCI6MjA5MjA0NTE2OX0.hNlMMu1VDQSoilIwEGeR_maHfNrLJCpTSob5UtrjL5M'
);

async function probe() {
  const testData = {
    name: 'PROBE_NAME',
    phone: '123',
    email: 'PROBE_EMAIL',
    points: 10,
    visits: 1,
    restaurant_id: 'e48a1d74-f26b-4573-8418-5a265696d595', // Use a valid UUID format
    last_visit: new Date().toISOString()
  };
  
  const { error } = await supabase.from('customers').insert([testData]);
  if (error) {
    console.log('Error:', error.message);
  } else {
    console.log('Success! All these columns exist.');
  }
}

probe();
