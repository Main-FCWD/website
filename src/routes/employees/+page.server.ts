// import { supabaseClient } from "$lib/supabase";

// let billingDept = [];
// let distributeDept = [];
// let maintainDept = [];

// // Fetch data from 'staff' table and populate respective arrays based on 'department' value
// async function fetchStaffData() {
//     const { data: staff, error: err } = await supabaseClient.from('staff').select('*');
  
//     if (err) {
//       console.error('Error fetching staff data:', err.message);
//     } else {
//       billingDept = data.filter(row => row.department === 'Billing');
//       distributeDept = data.filter(row => row.department === 'Distribution');
//       maintainDept = data.filter(row => row.department === 'Maintenance');
//     }
//   }
  
//   // Call the function to fetch the staff data when needed
//   fetchStaffData();