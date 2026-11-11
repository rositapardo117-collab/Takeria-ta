import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://klcisvnvkckwjeeznrfd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsY2lzdm52a2Nrd2plZXpucmZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NjkxNjksImV4cCI6MjA5MjA0NTE2OX0.hNlMMu1VDQSoilIwEGeR_maHfNrLJCpTSob5UtrjL5M'
);

async function testTables() {
   let { data: rests } = await supabase.from('restaurants').select('id').limit(1);
   if (!rests || rests.length === 0) return console.log('No restaurants');
   const restId = rests[0].id;

   const newTable = { number: 'Mesa Prueba', restaurant_id: restId, status: 'available', bill: 0, active_items: [] };

   const { data, error } = await supabase.from('tables').insert([newTable]).select();
   
   if (error) {
       console.log('--- ERROR TABLES ---');
       console.log(JSON.stringify(error, null, 2));
   } else {
       console.log('INSERT tables: SUCCESS');
       await supabase.from('tables').delete().eq('id', data[0].id);
   }
}

testTables();
