import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://klcisvnvkckwjeeznrfd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsY2lzdm52a2Nrd2plZXpucmZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NjkxNjksImV4cCI6MjA5MjA0NTE2OX0.hNlMMu1VDQSoilIwEGeR_maHfNrLJCpTSob5UtrjL5M'
);

async function inspectCustomers() {
  const { data, error } = await supabase.from('customers').select('*').limit(1);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('KEYS:', Object.keys(data[0] || {}));
    console.log('Sample data:', data[0]);
  }
}

inspectCustomers();
