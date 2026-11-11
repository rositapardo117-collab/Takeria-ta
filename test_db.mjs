import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://klcisvnvkckwjeeznrfd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsY2lzdm52a2Nrd2plZXpucmZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NjkxNjksImV4cCI6MjA5MjA0NTE2OX0.hNlMMu1VDQSoilIwEGeR_maHfNrLJCpTSob5UtrjL5M'
);

async function testDB() {
   let { data: users, error: err1 } = await supabase.from('auth_users').select('*').limit(1);
   const user = users[0];
   let restId = user.restaurant_id;

   if (!restId) {
       const { data: rests } = await supabase.from('restaurants').select('id').limit(1);
       if (rests && rests.length > 0) restId = rests[0].id;
   }

   if (restId) {
       const newOrder = {
           id: `temp-${Date.now()}`,
           restaurant_id: restId,
           table_id: 'TEST',
           table_name: 'TEST TABLE',
           items: [],
           status: 'pending'
       };

       const { data, error: err2 } = await supabase.from('orders').insert([newOrder]).select();
       
       if (err2) {
           console.log('--- ERROR ORDERS ---');
           console.log(JSON.stringify(err2, null, 2));
       } else {
           console.log('INSERT orders: SUCCESS');
           await supabase.from('orders').delete().eq('id', newOrder.id);
       }
       
       const { error: err3 } = await supabase.from('menu_items').insert([{
           name: 'Test', price: 10, category: 'Test', stock: 10, restaurant_id: restId
       }]).select();
       
       if (err3) {
           console.log('--- ERROR MENU_ITEMS ---');
           console.log(JSON.stringify(err3, null, 2));
       } else {
           console.log('INSERT menu_items: SUCCESS');
       }
   }
}

testDB();
