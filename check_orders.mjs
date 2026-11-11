import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://klcisvnvkckwjeeznrfd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsY2lzdm52a2Nrd2plZXpucmZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NjkxNjksImV4cCI6MjA5MjA0NTE2OX0.hNlMMu1VDQSoilIwEGeR_maHfNrLJCpTSob5UtrjL5M');

async function check() {
  console.log('Checking pending orders...');
  const { data, error } = await supabase.from('orders').select('*').eq('status', 'pending');
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Pending orders count:', data.length);
  if (data.length > 0) {
    console.log('Last order:', JSON.stringify(data[data.length-1], null, 2));
  }
}

check();
