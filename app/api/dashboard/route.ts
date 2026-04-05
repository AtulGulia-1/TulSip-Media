import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [postsRes, approvalsRes, deliverablesRes, reportsRes] = await Promise.all([
    supabase.from("posts").select("*").order("scheduled_at", { ascending: true }).limit(10),
    supabase.from("approvals").select("*").order("due_date", { ascending: true }).limit(10),
    supabase.from("deliverables").select("*").order("due_date", { ascending: true }).limit(10),
    supabase
      .from("reports")
      .select("id,client_id,report_type,period_start,period_end,meta_insights,google_insights,notes")
      .order("period_end", { ascending: false })
      .limit(6)
  ]);

  return NextResponse.json({
    posts: postsRes.data ?? [],
    approvals: approvalsRes.data ?? [],
    deliverables: deliverablesRes.data ?? [],
    reports: reportsRes.data ?? []
  });
}
