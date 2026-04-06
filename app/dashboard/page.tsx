import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { PortalPlanPurchase } from "@/components/dashboard/PortalPlanPurchase";
import { StorageUploadField } from "@/components/common/StorageUploadField";
import { DailyCheckReminder } from "@/components/common/DailyCheckReminder";
import {
  raiseRequestAction,
  respondApprovalAction,
  sendClientMessageAction,
  updateClientSettingsAction
} from "@/app/dashboard/actions";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/roles";

type DashboardTab =
  | "dashboard"
  | "calendar"
  | "approvals"
  | "deliverables"
  | "ad-insights"
  | "analytics"
  | "messages"
  | "settings"
  | "upgrade-plan";

const CLIENT_TABS: Array<{ id: DashboardTab; label: string }> = [
  { id: "dashboard", label: "Dashboard" },
  { id: "calendar", label: "Content Calendar" },
  { id: "approvals", label: "Approvals" },
  { id: "deliverables", label: "Deliverables" },
  { id: "ad-insights", label: "Ad Insights" },
  { id: "analytics", label: "Analytics" },
  { id: "messages", label: "Messages" },
  { id: "settings", label: "Settings" },
  { id: "upgrade-plan", label: "Upgrade Plan" }
];

function getActiveTab(input?: string): DashboardTab {
  const candidate = input as DashboardTab | undefined;
  if (candidate && CLIENT_TABS.some((tab) => tab.id === candidate)) {
    return candidate;
  }
  return "dashboard";
}

export default async function DashboardPage({
  searchParams
}: {
  searchParams?: Promise<{ tab?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createClient();
  const { user, profile } = await getCurrentProfile();

  if (!user) redirect("/login?next=/dashboard");
  if (!profile || profile.role !== "client") {
    if (profile && (profile.role === "owner" || profile.role === "admin" || profile.role === "manager")) {
      redirect("/admin/dashboard");
    }
    redirect("/login?error=invalid_portal");
  }

  const activeTab = getActiveTab(resolvedSearchParams?.tab);

  const { data: activeClient } = await supabase
    .from("clients")
    .select("id,name,industry")
    .eq("primary_contact_auth_user_id", user.id)
    .maybeSingle();

  const clientId = activeClient?.id;
  const clientName = activeClient?.name ?? "Client Account";
  const businessType = activeClient?.industry ?? "";

  const posts = clientId
    ? (
        await supabase
          .from("posts")
          .select("id,platform,title,status,scheduled_at,published_at,media_type,media_url,plan_note,metrics")
          .eq("client_id", clientId)
          .order("scheduled_at", { ascending: true })
      ).data ?? []
    : [];

  const purchasedPlans = user.email
    ? (
        await supabase
          .from("payments")
          .select("id,plan_id,status,created_at")
          .eq("payer_email", user.email)
          .eq("status", "paid")
          .order("created_at", { ascending: false })
      ).data ?? []
    : [];

  const approvals = clientId
    ? (
        await supabase
          .from("approvals")
          .select("id,status,due_date,feedback,post_id,posts!inner(title,platform,client_id,media_url)")
          .eq("posts.client_id", clientId)
          .order("created_at", { ascending: false })
      ).data ?? []
    : [];

  const deliverables = clientId
    ? (
        await supabase
          .from("deliverables")
          .select("id,title,status,due_date,delivered_at,media_type,media_url,quantity")
          .eq("client_id", clientId)
          .order("created_at", { ascending: false })
      ).data ?? []
    : [];

  const reports = clientId
    ? (
        await supabase
          .from("reports")
          .select("id,report_type,period_start,period_end,meta_insights,google_insights,notes,created_at")
          .eq("client_id", clientId)
          .order("period_end", { ascending: false })
      ).data ?? []
    : [];

  const requests = clientId
    ? (
        await supabase
          .from("client_requests")
          .select("id,request_type,priority,status,subject,details,created_at")
          .eq("client_id", clientId)
          .order("created_at", { ascending: false })
      ).data ?? []
    : [];

  const messages = clientId
    ? (
        await supabase
          .from("messages")
          .select("id,sender_user_id,sender_role,body,attachment_url,created_at")
          .eq("client_id", clientId)
          .order("created_at", { ascending: false })
          .limit(50)
      ).data ?? []
    : [];

  const senderIds = Array.from(new Set(messages.map((message) => message.sender_user_id).filter(Boolean)));
  const senderNameMap = new Map<string, string>();

  if (senderIds.length) {
    const { data: senders } = await supabase
      .from("users")
      .select("id,full_name")
      .in("id", senderIds);

    (senders ?? []).forEach((sender) => senderNameMap.set(sender.id, sender.full_name));
  }

  const pendingApprovals = approvals.filter((item) => item.status === "pending");
  const scheduledPosts = posts.filter((post) => post.status === "scheduled" || post.status === "in_review");
  const runningAds = posts.filter((post) => post.status === "published" || post.status === "scheduled");
  const latestReport = reports[0];
  const latestMeta = (latestReport?.meta_insights as { reach?: number; ctr?: number; interactions?: number; followers?: number } | null) ?? {};
  const latestGoogle = (latestReport?.google_insights as { clicks?: number; cpc?: number; message_contacts?: number; followers?: number } | null) ?? {};

  const postCounts = {
    posts: posts.filter((post) => (post.media_type ?? "image") === "image").length,
    reels: posts.filter((post) => (post.media_type ?? "") === "video").length,
    stories: posts.filter((post) => post.title.toLowerCase().includes("story")).length
  };

  return (
    <section className="section-shell section-y">
      <DailyCheckReminder />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {profile.avatar_url ? (
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/20">
              <Image
                src={profile.avatar_url}
                alt={profile.full_name}
                fill
                className="object-cover"
                sizes="56px"
                unoptimized
              />
            </div>
          ) : (
            <div className="grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-white/5 text-sm font-semibold text-[#f3e7c5]">
              {(profile.full_name ?? "C").slice(0, 1).toUpperCase()}
            </div>
          )}
          <div>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Client Dashboard</p>
          <h1 className="font-display text-5xl font-semibold text-[#f6f0cf]">
            Welcome back, <span className="text-[#ce1919]">{clientName}</span>
          </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-[#9ff0b3]">
            Campaign Live
          </span>
          <LogoutButton redirectTo="/login" />
        </div>
      </div>

      <p className="theme-muted mt-2">
        Welcome back, {profile.full_name ?? user.email}. Track calendar, approvals, deliverables,
        ads, analytics, requests, and messages in one place.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[250px_1fr]">
        <aside className="theme-card rounded-2xl p-4">
          <p className="font-display text-2xl text-[#f6f0cf]">TulSip Portal</p>
          <p className="theme-muted mt-1 text-xs uppercase tracking-[0.08em]">{clientName}</p>
          <nav className="mt-4 space-y-2">
            {CLIENT_TABS.map((tab) => (
              <Link
                key={tab.id}
                href={`/dashboard?tab=${tab.id}`}
                className={`block rounded-lg border px-3 py-2 text-sm transition ${
                  activeTab === tab.id
                    ? "border-[#ce1919]/70 bg-[#7d0f0f]/30 text-[#f6f0cf]"
                    : "border-white/10 text-[#cdbf9f] hover:bg-white/5"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="space-y-5">
          {activeTab === "dashboard" && (
            <>
              {!purchasedPlans.length && (
                <PortalPlanPurchase defaultEmail={user.email ?? ""} defaultClientName={clientName} />
              )}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="theme-card rounded-xl p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Scheduled Posts</p>
                  <p className="mt-2 font-display text-4xl text-[#f6f0cf]">{scheduledPosts.length}</p>
                </article>
                <article className="theme-card rounded-xl p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Pending Approvals</p>
                  <p className="mt-2 font-display text-4xl text-[#f6f0cf]">{pendingApprovals.length}</p>
                </article>
                <article className="theme-card rounded-xl p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Deliverables</p>
                  <p className="mt-2 font-display text-4xl text-[#f6f0cf]">{deliverables.length}</p>
                </article>
                <article className="theme-card rounded-xl p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Open Requests</p>
                  <p className="mt-2 font-display text-4xl text-[#f6f0cf]">
                    {requests.filter((request) => request.status === "open" || request.status === "in_progress").length}
                  </p>
                </article>
              </div>

              <article className="theme-card rounded-2xl p-5">
                <h2 className="font-display text-3xl text-[#f6f0cf]">Next Up</h2>
                <ul className="mt-4 space-y-2">
                  {scheduledPosts.slice(0, 8).map((post) => (
                    <li key={post.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/15 px-3 py-2 text-sm">
                      <span className="text-[#f3e7c5]">
                        {post.title} ({post.platform})
                      </span>
                      <span className="theme-muted">
                        {post.scheduled_at ? new Date(post.scheduled_at).toLocaleString("en-IN") : "TBD"}
                      </span>
                    </li>
                  ))}
                  {!scheduledPosts.length && <li className="theme-muted text-sm">No scheduled items yet.</li>}
                </ul>
              </article>
            </>
          )}

          {activeTab === "upgrade-plan" && (
            <PortalPlanPurchase defaultEmail={user.email ?? ""} defaultClientName={clientName} />
          )}

          {activeTab === "calendar" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Content Calendar</h2>
              <p className="theme-muted mt-2 text-sm">View all post/reel schedules with dates and notes.</p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/15 text-[#bdae8a]">
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Content</th>
                      <th className="px-3 py-2">Platform</th>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id} className="border-b border-white/10">
                        <td className="px-3 py-2 text-[#f3e7c5]">{post.scheduled_at ? new Date(post.scheduled_at).toLocaleString("en-IN") : "TBD"}</td>
                        <td className="px-3 py-2 text-[#f3e7c5]">{post.title}</td>
                        <td className="px-3 py-2">{post.platform}</td>
                        <td className="px-3 py-2">{post.media_type ?? "image"}</td>
                        <td className="px-3 py-2">{post.status}</td>
                        <td className="px-3 py-2">{post.plan_note ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!posts.length && <p className="theme-muted mt-3 text-sm">No calendar items yet.</p>}
              </div>
            </article>
          )}

          {activeTab === "approvals" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Approvals</h2>
              <p className="theme-muted mt-2 text-sm">Approve content, reject with suggestions, or raise request.</p>
              <div className="mt-4 space-y-4">
                {approvals.map((approval) => (
                  <div key={approval.id} className="rounded-xl border border-white/10 bg-black/15 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-[#f3e7c5]">{(approval.posts as { title?: string } | null)?.title ?? "Post"}</p>
                      <span className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">{approval.status}</span>
                    </div>
                    <p className="theme-muted mt-1 text-xs">Due: {approval.due_date ?? "TBD"}</p>
                    {approval.status === "pending" && (
                      <form action={respondApprovalAction} className="mt-3 grid gap-2">
                        <input type="hidden" name="approval_id" value={approval.id} />
                        <select name="decision" className="theme-input rounded-lg px-3 py-2 text-sm">
                          <option value="approved">Approve</option>
                          <option value="rejected">Reject</option>
                        </select>
                        <textarea name="feedback" rows={3} placeholder="Suggestions / change requests" className="theme-input rounded-lg px-3 py-2 text-sm" />
                        <button className="theme-btn-primary w-fit rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">Submit Decision</button>
                      </form>
                    )}
                    {approval.feedback && <p className="theme-muted mt-2 text-sm">Feedback: {approval.feedback}</p>}
                  </div>
                ))}
                {!approvals.length && <p className="theme-muted text-sm">No approvals found.</p>}
              </div>

              <form action={raiseRequestAction} className="mt-6 grid gap-3 rounded-xl border border-white/10 bg-black/15 p-4">
                <p className="text-sm font-semibold text-[#f3e7c5]">Raise Request</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <select name="request_type" className="theme-input rounded-lg px-3 py-2 text-sm">
                    <option value="content_request">Content Request</option>
                    <option value="revision">Revision</option>
                    <option value="support">Support</option>
                  </select>
                  <select name="priority" className="theme-input rounded-lg px-3 py-2 text-sm">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <input name="subject" placeholder="Request subject" className="theme-input rounded-lg px-3 py-2 text-sm" required />
                <textarea name="details" rows={3} placeholder="Request details" className="theme-input rounded-lg px-3 py-2 text-sm" />
                <button className="theme-btn-primary w-fit rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">Raise Request</button>
              </form>
            </article>
          )}

          {activeTab === "deliverables" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Deliverables</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-black/15 p-3">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Post Count</p>
                  <p className="mt-2 font-display text-3xl text-[#f6f0cf]">{postCounts.posts}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/15 p-3">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Reel Count</p>
                  <p className="mt-2 font-display text-3xl text-[#f6f0cf]">{postCounts.reels}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/15 p-3">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Story Count</p>
                  <p className="mt-2 font-display text-3xl text-[#f6f0cf]">{postCounts.stories}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {deliverables.map((item) => (
                  <div key={item.id} className="rounded-xl border border-white/10 bg-black/15 p-4">
                    <p className="font-semibold text-[#f3e7c5]">{item.title}</p>
                    <p className="theme-muted mt-1 text-xs">Status: {item.status}</p>
                    <p className="theme-muted mt-1 text-xs">Due: {item.due_date ?? "TBD"}</p>
                    <p className="theme-muted mt-1 text-xs">Delivered: {item.delivered_at ? new Date(item.delivered_at).toLocaleDateString("en-IN") : "-"}</p>
                    {item.media_url ? (
                      <a href={item.media_url} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-xs underline underline-offset-4 text-[#f3e7c5]">
                        Open asset
                      </a>
                    ) : null}
                  </div>
                ))}
                {!deliverables.length && <p className="theme-muted text-sm">No deliverables yet.</p>}
              </div>
            </article>
          )}

          {activeTab === "ad-insights" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Ad Insights</h2>
              <p className="theme-muted mt-2 text-sm">Current running/scheduled ads and latest Meta + Google overview.</p>
              <div className="mt-4 space-y-2">
                {runningAds.map((ad) => (
                  <div key={ad.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/15 px-3 py-2 text-sm">
                    <span className="text-[#f3e7c5]">{ad.title} ({ad.platform})</span>
                    <span className="theme-muted">{ad.status}</span>
                  </div>
                ))}
                {!runningAds.length && <p className="theme-muted text-sm">No active ads listed.</p>}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/15 p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Meta Insights</p>
                  <p className="mt-2 text-sm text-[#f3e7c5]">
                    Reach: {Number((latestReport?.meta_insights as { reach?: number } | null)?.reach ?? 0).toLocaleString()}
                  </p>
                  <p className="theme-muted text-sm">
                    CTR: {Number((latestReport?.meta_insights as { ctr?: number } | null)?.ctr ?? 0).toFixed(2)}%
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/15 p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Google Insights</p>
                  <p className="mt-2 text-sm text-[#f3e7c5]">
                    Clicks: {Number((latestReport?.google_insights as { clicks?: number } | null)?.clicks ?? 0).toLocaleString()}
                  </p>
                  <p className="theme-muted text-sm">
                    CPC: {Number((latestReport?.google_insights as { cpc?: number } | null)?.cpc ?? 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </article>
          )}

          {activeTab === "analytics" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Analytics</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Views (Meta Reach)</p>
                  <p className="mt-2 font-display text-3xl text-[#f6f0cf]">
                    {Number(latestMeta.reach ?? 0).toLocaleString("en-IN")}
                  </p>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#ce1919]"
                      style={{ width: `${Math.min(100, Math.max(8, Number(latestMeta.ctr ?? 0) * 12))}%` }}
                    />
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Content Interactions</p>
                  <p className="mt-2 font-display text-3xl text-[#f6f0cf]">
                    {Number(latestMeta.interactions ?? latestGoogle.clicks ?? 0).toLocaleString("en-IN")}
                  </p>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#8e1a1a]"
                      style={{ width: `${Math.min(100, Math.max(8, Number(latestGoogle.clicks ?? 0) / 120))}%` }}
                    />
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Message Contacts</p>
                  <p className="mt-2 font-display text-3xl text-[#f6f0cf]">
                    {Number(latestGoogle.message_contacts ?? messages.length).toLocaleString("en-IN")}
                  </p>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#b31313]"
                      style={{ width: `${Math.min(100, Math.max(8, Number(latestGoogle.message_contacts ?? messages.length) * 3))}%` }}
                    />
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Followers</p>
                  <p className="mt-2 font-display text-3xl text-[#f6f0cf]">
                    {Number(latestMeta.followers ?? latestGoogle.followers ?? 0).toLocaleString("en-IN")}
                  </p>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#d33232]"
                      style={{ width: `${Math.min(100, Math.max(8, Number(latestMeta.followers ?? latestGoogle.followers ?? 0) / 100))}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/15 text-[#bdae8a]">
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Period</th>
                      <th className="px-3 py-2">Meta Reach</th>
                      <th className="px-3 py-2">Meta CTR</th>
                      <th className="px-3 py-2">Google Clicks</th>
                      <th className="px-3 py-2">Google CPC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => {
                      const meta = (report.meta_insights as { reach?: number; ctr?: number } | null) ?? {};
                      const google = (report.google_insights as { clicks?: number; cpc?: number } | null) ?? {};
                      return (
                        <tr key={report.id} className="border-b border-white/10">
                          <td className="px-3 py-2 text-[#f3e7c5]">{report.report_type}</td>
                          <td className="px-3 py-2">{report.period_start} to {report.period_end}</td>
                          <td className="px-3 py-2">{meta.reach ?? 0}</td>
                          <td className="px-3 py-2">{Number(meta.ctr ?? 0).toFixed(2)}%</td>
                          <td className="px-3 py-2">{google.clicks ?? 0}</td>
                          <td className="px-3 py-2">{Number(google.cpc ?? 0).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {!reports.length && <p className="theme-muted mt-3 text-sm">No analytics reports available yet.</p>}
              </div>
            </article>
          )}

          {activeTab === "messages" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Messages</h2>
              <div className="mt-4 max-h-[420px] space-y-2 overflow-auto pr-1">
                {messages
                  .slice()
                  .reverse()
                  .map((message) => {
                    const isClient = message.sender_role === "client";
                    return (
                      <div key={message.id} className={`rounded-xl border px-3 py-2 text-sm ${isClient ? "ml-10 border-[#ce1919]/30 bg-[#7d0f0f]/25" : "mr-10 border-white/10 bg-black/20"}`}>
                        <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">
                          {senderNameMap.get(message.sender_user_id) ?? message.sender_role}
                        </p>
                        <p className="mt-1 text-[#f3e7c5]">{message.body}</p>
                        {message.attachment_url ? (
                          <a href={message.attachment_url} target="_blank" rel="noreferrer" className="mt-1 inline-flex text-xs underline underline-offset-4 text-[#f3e7c5]">
                            Attachment
                          </a>
                        ) : null}
                        <p className="theme-muted mt-1 text-[11px]">{new Date(message.created_at).toLocaleString("en-IN")}</p>
                      </div>
                    );
                  })}
                {!messages.length && <p className="theme-muted text-sm">No messages yet.</p>}
              </div>

              <form action={sendClientMessageAction} className="mt-4 grid gap-2">
                <textarea name="body" rows={3} placeholder="Write your message to admin" className="theme-input rounded-lg px-3 py-2 text-sm" required />
                <StorageUploadField
                  name="attachment_url"
                  label="Attach image/video"
                  folder="messages/client"
                  accept="image/*,video/*"
                />
                <button className="theme-btn-primary w-fit rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">Send Message</button>
              </form>
            </article>
          )}

          {activeTab === "settings" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Settings</h2>
              <form action={updateClientSettingsAction} className="mt-4 grid max-w-xl gap-3">
                <input name="full_name" defaultValue={profile.full_name} placeholder="Full name" className="theme-input rounded-lg px-3 py-2 text-sm" required />
                <StorageUploadField
                  name="avatar_url"
                  label="Profile image"
                  folder="avatars/client"
                  accept="image/*"
                  defaultValue={profile.avatar_url ?? ""}
                />
                <input
                  name="business_type"
                  defaultValue={businessType}
                  placeholder="Business type (Cafe, Clinic, E-commerce...)"
                  className="theme-input rounded-lg px-3 py-2 text-sm"
                />
                <select name="preferred_language" defaultValue={profile.preferred_language ?? "en"} className="theme-input rounded-lg px-3 py-2 text-sm">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="pa">Punjabi</option>
                </select>
                <input
                  type="number"
                  min={1}
                  max={240}
                  name="inactivity_timeout_minutes"
                  defaultValue={profile.inactivity_timeout_minutes ?? 60}
                  placeholder="Auto logout (minutes)"
                  className="theme-input rounded-lg px-3 py-2 text-sm"
                />
                <button className="theme-btn-primary w-fit rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">Save Settings</button>
              </form>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/15 p-4 text-sm">
                <p className="text-[#f3e7c5]">Password management</p>
                <p className="theme-muted mt-1">Use secure OTP reset flow to change password.</p>
                <Link href="/forgot-password" className="mt-2 inline-flex text-xs underline underline-offset-4 text-[#f3e7c5]">
                  Reset password with OTP
                </Link>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}




