import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dbmybwmbhnuiddmwzwdx.supabase.co";
const supabaseKey = "sb_publishable_56Z22F96ME0YRunaWzV_RQ_3W0JbGPT";
const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

export { supabase as s };
