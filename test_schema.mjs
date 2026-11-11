import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://klcisvnvkckwjeeznrfd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsY2lzdm52a2Nrd2plZXpucmZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NjkxNjksImV4cCI6MjA5MjA0NTE2OX0.hNlMMu1VDQSoilIwEGeR_maHfNrLJCpTSob5UtrjL5M'
);

// We try to query a bunch of tables returning 1 row to see which ones throw 404/PGRST205
async function testSchema() {
    const list = ['restaurants', 'auth_users', 'menu_items', 'tables', 'orders', 'sales', 'cash_sessions', 'expenses', 'customers'];
    for(const t of list) {
       const { error } = await supabase.from(t).select('*').limit(1);
       if (error) {
           console.log(`Table ${t} ERROR: ${error.message}`);
       } else {
           console.log(`Table ${t} EXISTS`);
       }
    }
}
testSchema();
