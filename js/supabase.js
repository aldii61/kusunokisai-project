const SUPABASE_URL =
  "https://krvaoancjvnjeolarpim.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_WyhnLx1EbNm9TDyiyGdlog_VVedJGgb";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);