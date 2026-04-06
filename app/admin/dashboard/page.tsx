import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { StorageUploadField } from "@/components/common/StorageUploadField";
import {
  addClientAction,
  addDeliverableAction,
  addPostAction,
  addReportAction,
  createAdminTicketAction,
  removeClientAction,
  resetClientPasswordAction,
  resolveClientRequestAction,
  sendAdminMessageAction,
  updateAdminSessionSettingsAction,
  upsertStaffRoleAction,
  addPortfolioItemAction,
  deletePortfolioItemAction
} from "@/app/admin/dashboard/actions";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/roles";

type AdminTab =
  | "dashboard"
  | "calendar"
  | "approvals"
  | "deliverables"
  | "ad-insights"
  | "analytics"
  | "messages"
  | "settings"
  | "website-cms";

const ADMIN_TABS: Array<{ id: AdminTab; label: string }> = [
  { id: "dashboard", label: "Dashboard" },
  { id: "calendar", label: "Content Calendar" },
  { id: "approvals", label: "Approvals + Requests" },
  { id: "deliverables", label: "Deliverables" },
  { id: "ad-insights", label: "Ad Insights" },
  { id: "analytics", label: "Analytics" },
  { id: "messages", label: "Messages" },
  { id: "settings", label: "Settings" },
  { id: "website-cms", label: "Website CMS" }
];

function getActiveTab(input?: string): AdminTab {
  const candidate = input as AdminTab | undefined;
  if (candidate && ADMIN_TABS.some((tab) => tab.id === candidate)) {
    return candidate;
  }
  return "dashboard";
}

export default async function AdminDashboardPage({
  searchParams
}: {
  searchParams?: Promise<{ tab?: string; client?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createClient();
  const { user, profile } = await getCurrentProfile();

  if (!user) redirect("/admin/login?next=/admin/dashboard");
  if (!profile || !["owner", "admin", "manager"].includes(profile.role)) redirect("/dashboard");

  const activeTab = getActiveTab(resolvedSearchParams?.tab);

  const { data: clients } = await supabase
    .from("clients")
    .select("id,name,industry,website,primary_contact_auth_user_id")
    .order("created_at", { ascending: false });

  const selectedClientId =
    resolvedSearchParams?.client && clients?.some((client) => client.id === resolvedSearchParams?.client)
      ? resolvedSearchParams?.client
      : clients?.[0]?.id;

  const selectedClient = clients?.find((client) => client.id === selectedClientId);

  const postsBase = supabase
    .from("posts")
    .select("id,client_id,platform,title,status,scheduled_at,published_at,media_type,media_url,plan_note,metrics")
    .order("scheduled_at", { ascending: false });
  const posts = selectedClientId ? (await postsBase.eq("client_id", selectedClientId)).data ?? [] : (await postsBase.limit(100)).data ?? [];

  const approvalsBase = supabase
    .from("approvals")
    .select("id,status,due_date,feedback,created_at,posts!inner(id,client_id,title,platform)")
    .order("created_at", { ascending: false });
  const approvals = selectedClientId
    ? (await approvalsBase.eq("posts.client_id", selectedClientId)).data ?? []
    : (await approvalsBase.limit(100)).data ?? [];

  const deliverablesBase = supabase
    .from("deliverables")
    .select("id,client_id,title,status,due_date,delivered_at,media_type,media_url,quantity")
    .order("created_at", { ascending: false });
  const deliverables = selectedClientId
    ? (await deliverablesBase.eq("client_id", selectedClientId)).data ?? []
    : (await deliverablesBase.limit(100)).data ?? [];

  const reportsBase = supabase
    .from("reports")
    .select("id,client_id,report_type,period_start,period_end,meta_insights,google_insights,notes,created_at")
    .order("period_end", { ascending: false });
  const reports = selectedClientId
    ? (await reportsBase.eq("client_id", selectedClientId)).data ?? []
    : (await reportsBase.limit(100)).data ?? [];

  const requestsBase = supabase
    .from("client_requests")
    .select("id,client_id,request_type,priority,status,subject,details,created_at")
    .order("created_at", { ascending: false });
  const requests = selectedClientId
    ? (await requestsBase.eq("client_id", selectedClientId)).data ?? []
    : (await requestsBase.limit(100)).data ?? [];

  const messagesBase = supabase
    .from("messages")
    .select("id,client_id,sender_user_id,sender_role,body,attachment_url,created_at")
    .order("created_at", { ascending: false });
  const messages = selectedClientId
    ? (await messagesBase.eq("client_id", selectedClientId)).data ?? []
    : (await messagesBase.limit(200)).data ?? [];

  const { data: portfolioItems } = await supabase
    .from("portfolio_items")
    .select("id,title,result,media_url,media_type,external_link,is_published,sort_order,created_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const senderIds = Array.from(new Set(messages.map((message) => message.sender_user_id).filter(Boolean)));
  const senderNameMap = new Map<string, string>();

  if (senderIds.length) {
    const { data: senders } = await supabase.from("users").select("id,full_name").in("id", senderIds);
    (senders ?? []).forEach((sender) => senderNameMap.set(sender.id, sender.full_name));
  }

  const pendingApprovals = approvals.filter((item) => item.status === "pending");
  const openRequests = requests.filter((item) => item.status === "open" || item.status === "in_progress");

  return (
    <section className="section-shell section-y">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Admin Console</p>
          <h1 className="font-display text-5xl font-semibold text-[#f6f0cf]">TulSip Operations Portal</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-[#9ff0b3]">
            {selectedClient ? `Viewing: ${selectedClient.name}` : "All Clients"}
          </span>
          <LogoutButton redirectTo="/admin/login" />
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[250px_1fr]">
        <aside className="theme-card rounded-2xl p-4">
          <p className="font-display text-2xl text-[#f6f0cf]">Admin Menu</p>
          <p className="theme-muted mt-1 text-xs uppercase tracking-[0.08em]">{profile.full_name}</p>

          <div className="mt-4 rounded-lg border border-white/10 bg-black/15 p-3">
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#bdae8a]">Client Scope</p>
            <div className="mt-2 space-y-1">
              <Link href={`/admin/dashboard?tab=${activeTab}`} className={`block rounded-md px-2 py-1 text-xs ${!selectedClientId ? "bg-[#7d0f0f]/30 text-[#f6f0cf]" : "text-[#d8caad]"}`}>
                All clients
              </Link>
              {(clients ?? []).map((client) => (
                <Link
                  key={client.id}
                  href={`/admin/dashboard?tab=${activeTab}&client=${client.id}`}
                  className={`block rounded-md px-2 py-1 text-xs ${selectedClientId === client.id ? "bg-[#7d0f0f]/30 text-[#f6f0cf]" : "text-[#d8caad]"}`}
                >
                  {client.name}
                </Link>
              ))}
            </div>
          </div>

          <nav className="mt-4 space-y-2">
            {ADMIN_TABS.map((tab) => (
              <Link
                key={tab.id}
                href={`/admin/dashboard?tab=${tab.id}${selectedClientId ? `&client=${selectedClientId}` : ""}`}
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
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="theme-card rounded-xl p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Active Clients</p>
                  <p className="mt-2 font-display text-4xl text-[#f6f0cf]">{clients?.length ?? 0}</p>
                </article>
                <article className="theme-card rounded-xl p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Pending Approvals</p>
                  <p className="mt-2 font-display text-4xl text-[#f6f0cf]">{pendingApprovals.length}</p>
                </article>
                <article className="theme-card rounded-xl p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Open Requests</p>
                  <p className="mt-2 font-display text-4xl text-[#f6f0cf]">{openRequests.length}</p>
                </article>
                <article className="theme-card rounded-xl p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Unread Messages</p>
                  <p className="mt-2 font-display text-4xl text-[#f6f0cf]">{messages.filter((message) => message.sender_role === "client").length}</p>
                </article>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <article className="theme-card rounded-2xl p-5">
                  <h2 className="font-display text-3xl text-[#f6f0cf]">Recent Client Requests</h2>
                  <ul className="mt-4 space-y-2 text-sm">
                    {requests.slice(0, 10).map((item) => {
                      const client = clients?.find((client) => client.id === item.client_id);
                      return (
                        <li key={item.id} className="rounded-lg border border-white/10 bg-black/15 p-3">
                          <p className="text-[#f3e7c5]">{item.subject} ({client?.name ?? "Client"})</p>
                          <p className="theme-muted mt-1 text-xs">{item.request_type} | {item.priority} | {item.status}</p>
                        </li>
                      );
                    })}
                    {!requests.length && <li className="theme-muted">No requests yet.</li>}
                  </ul>
                </article>

                <article className="theme-card rounded-2xl p-5">
                  <h2 className="font-display text-3xl text-[#f6f0cf]">Quick Add Client</h2>
                  <form action={addClientAction} className="mt-4 grid gap-3">
                    <input name="name" placeholder="Client name" className="theme-input rounded-lg px-3 py-2 text-sm" required />
                    <input name="industry" placeholder="Business type (Cafe, Salon, SaaS...)" className="theme-input rounded-lg px-3 py-2 text-sm" />
                    <input name="website" placeholder="Website URL" className="theme-input rounded-lg px-3 py-2 text-sm" />
                    <button className="theme-btn-primary w-fit rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">Add Client</button>
                  </form>
                </article>
              </div>
            </>
          )}

          {activeTab === "calendar" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Content Calendar Management</h2>
              <form action={addPostAction} className="mt-4 grid gap-3 rounded-xl border border-white/10 bg-black/15 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <select name="client_id" className="theme-input rounded-lg px-3 py-2 text-sm" defaultValue={selectedClientId} required>
                    <option value="">Select client</option>
                    {(clients ?? []).map((client) => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                  <input name="title" placeholder="Post/Reel title" className="theme-input rounded-lg px-3 py-2 text-sm" required />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="platform" placeholder="Platform (Instagram/Meta/Google)" className="theme-input rounded-lg px-3 py-2 text-sm" />
                  <input type="datetime-local" name="scheduled_at" className="theme-input rounded-lg px-3 py-2 text-sm" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <select name="media_type" className="theme-input rounded-lg px-3 py-2 text-sm">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                  <StorageUploadField name="media_url" label="Upload media" folder="posts/admin" accept="image/*,video/*" />
                </div>
                <textarea name="plan_note" rows={2} placeholder="Next day plan / notes" className="theme-input rounded-lg px-3 py-2 text-sm" />
                <button className="theme-btn-primary w-fit rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">Create Calendar Entry</button>
              </form>

              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/15 text-[#bdae8a]">
                      <th className="px-3 py-2">Client</th>
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Content</th>
                      <th className="px-3 py-2">Platform</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id} className="border-b border-white/10">
                        <td className="px-3 py-2 text-[#f3e7c5]">{clients?.find((client) => client.id === post.client_id)?.name ?? "Client"}</td>
                        <td className="px-3 py-2">{post.scheduled_at ? new Date(post.scheduled_at).toLocaleString("en-IN") : "TBD"}</td>
                        <td className="px-3 py-2">{post.title}</td>
                        <td className="px-3 py-2">{post.platform}</td>
                        <td className="px-3 py-2">{post.status}</td>
                        <td className="px-3 py-2">{post.plan_note ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          )}

          {activeTab === "approvals" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Approvals + Client Requests</h2>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="font-display text-2xl text-[#f6f0cf]">Approvals</h3>
                  {approvals.map((approval) => (
                    <div key={approval.id} className="rounded-lg border border-white/10 bg-black/15 p-3 text-sm">
                      <p className="text-[#f3e7c5]">{(approval.posts as { title?: string } | null)?.title ?? "Post"}</p>
                      <p className="theme-muted mt-1">{(approval.posts as { platform?: string } | null)?.platform ?? "Platform"} | {approval.status} | Due {approval.due_date ?? "TBD"}</p>
                      {approval.feedback && <p className="theme-muted mt-1">Client feedback: {approval.feedback}</p>}
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-2xl text-[#f6f0cf]">Requests</h3>
                  {requests.map((request) => (
                    <div key={request.id} className="rounded-lg border border-white/10 bg-black/15 p-3">
                      <p className="text-sm text-[#f3e7c5]">{request.subject}</p>
                      <p className="theme-muted mt-1 text-xs">{request.request_type} | {request.priority} | {request.status}</p>
                      <form action={resolveClientRequestAction} className="mt-2 flex flex-wrap items-center gap-2">
                        <input type="hidden" name="request_id" value={request.id} />
                        <select name="status" defaultValue={request.status} className="theme-input rounded-md px-2 py-1 text-xs">
                          <option value="open">Open</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                        <button className="theme-btn-primary rounded-sm px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]">Update</button>
                      </form>
                    </div>
                  ))}
                </div>
              </div>

              <form action={createAdminTicketAction} className="mt-5 grid gap-3 rounded-xl border border-white/10 bg-black/15 p-4">
                <p className="text-sm font-semibold text-[#f3e7c5]">Raise Admin Ticket to Client</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <select name="client_id" className="theme-input rounded-lg px-3 py-2 text-sm" defaultValue={selectedClientId} required>
                    <option value="">Select client</option>
                    {(clients ?? []).map((client) => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                  <select name="priority" className="theme-input rounded-lg px-3 py-2 text-sm">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <input name="subject" placeholder="Ticket subject" className="theme-input rounded-lg px-3 py-2 text-sm" required />
                <textarea name="details" rows={3} placeholder="Ticket details" className="theme-input rounded-lg px-3 py-2 text-sm" />
                <button className="theme-btn-primary w-fit rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">Create Ticket</button>
              </form>
            </article>
          )}

          {activeTab === "deliverables" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Deliverables Management</h2>
              <form action={addDeliverableAction} className="mt-4 grid gap-3 rounded-xl border border-white/10 bg-black/15 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <select name="client_id" className="theme-input rounded-lg px-3 py-2 text-sm" defaultValue={selectedClientId} required>
                    <option value="">Select client</option>
                    {(clients ?? []).map((client) => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                  <input name="title" placeholder="Deliverable title" className="theme-input rounded-lg px-3 py-2 text-sm" required />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <select name="status" className="theme-input rounded-lg px-3 py-2 text-sm">
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  <select name="media_type" className="theme-input rounded-lg px-3 py-2 text-sm">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                  <input type="number" min={1} name="quantity" defaultValue={1} className="theme-input rounded-lg px-3 py-2 text-sm" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <StorageUploadField name="media_url" label="Upload deliverable media" folder="deliverables/admin" accept="image/*,video/*" />
                  <input type="date" name="due_date" className="theme-input rounded-lg px-3 py-2 text-sm" />
                </div>
                <button className="theme-btn-primary w-fit rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">Save Deliverable</button>
              </form>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {deliverables.map((item) => (
                  <div key={item.id} className="rounded-xl border border-white/10 bg-black/15 p-4">
                    <p className="text-sm text-[#f3e7c5]">{item.title}</p>
                    <p className="theme-muted mt-1 text-xs">{clients?.find((client) => client.id === item.client_id)?.name ?? "Client"}</p>
                    <p className="theme-muted mt-1 text-xs">{item.status} | Qty {item.quantity ?? 1}</p>
                    <p className="theme-muted mt-1 text-xs">Due {item.due_date ?? "TBD"}</p>
                  </div>
                ))}
              </div>
            </article>
          )}

          {activeTab === "ad-insights" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Ad Insights</h2>
              <p className="theme-muted mt-2 text-sm">Current ad activity and latest Meta/Google insights per selected client.</p>
              <div className="mt-4 space-y-2">
                {posts.filter((post) => post.status === "scheduled" || post.status === "published").map((post) => (
                  <div key={post.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/15 px-3 py-2 text-sm">
                    <span className="text-[#f3e7c5]">{post.title} ({post.platform})</span>
                    <span className="theme-muted">{post.status}</span>
                  </div>
                ))}
              </div>
            </article>
          )}

          {activeTab === "analytics" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Analytics + Reports</h2>
              <form action={addReportAction} className="mt-4 grid gap-3 rounded-xl border border-white/10 bg-black/15 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <select name="client_id" className="theme-input rounded-lg px-3 py-2 text-sm" defaultValue={selectedClientId} required>
                    <option value="">Select client</option>
                    {(clients ?? []).map((client) => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                  <select name="report_type" className="theme-input rounded-lg px-3 py-2 text-sm">
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input type="date" name="period_start" className="theme-input rounded-lg px-3 py-2 text-sm" required />
                  <input type="date" name="period_end" className="theme-input rounded-lg px-3 py-2 text-sm" required />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input type="number" name="meta_reach" placeholder="Meta reach" className="theme-input rounded-lg px-3 py-2 text-sm" />
                  <input type="number" step="0.01" name="meta_ctr" placeholder="Meta CTR" className="theme-input rounded-lg px-3 py-2 text-sm" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input type="number" name="google_clicks" placeholder="Google clicks" className="theme-input rounded-lg px-3 py-2 text-sm" />
                  <input type="number" step="0.01" name="google_cpc" placeholder="Google CPC" className="theme-input rounded-lg px-3 py-2 text-sm" />
                </div>
                <textarea name="notes" rows={2} placeholder="Report notes" className="theme-input rounded-lg px-3 py-2 text-sm" />
                <button className="theme-btn-primary w-fit rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">Publish Report</button>
              </form>

              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/15 text-[#bdae8a]">
                      <th className="px-3 py-2">Client</th>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Period</th>
                      <th className="px-3 py-2">Meta</th>
                      <th className="px-3 py-2">Google</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => {
                      const meta = (report.meta_insights as { reach?: number; ctr?: number } | null) ?? {};
                      const google = (report.google_insights as { clicks?: number; cpc?: number } | null) ?? {};
                      return (
                        <tr key={report.id} className="border-b border-white/10">
                          <td className="px-3 py-2 text-[#f3e7c5]">{clients?.find((client) => client.id === report.client_id)?.name ?? "Client"}</td>
                          <td className="px-3 py-2">{report.report_type}</td>
                          <td className="px-3 py-2">{report.period_start} - {report.period_end}</td>
                          <td className="px-3 py-2">Reach {meta.reach ?? 0}, CTR {Number(meta.ctr ?? 0).toFixed(2)}%</td>
                          <td className="px-3 py-2">Clicks {google.clicks ?? 0}, CPC {Number(google.cpc ?? 0).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </article>
          )}

          {activeTab === "messages" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Messages</h2>
              <div className="mt-4 max-h-[380px] space-y-2 overflow-auto pr-1">
                {messages
                  .slice()
                  .reverse()
                  .map((message) => {
                    const isClient = message.sender_role === "client";
                    return (
                      <div key={message.id} className={`rounded-xl border px-3 py-2 text-sm ${isClient ? "mr-10 border-white/10 bg-black/20" : "ml-10 border-[#ce1919]/30 bg-[#7d0f0f]/25"}`}>
                        <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">
                          {senderNameMap.get(message.sender_user_id) ?? message.sender_role} | {clients?.find((client) => client.id === message.client_id)?.name ?? "Client"}
                        </p>
                        <p className="mt-1 text-[#f3e7c5]">{message.body}</p>
                        <p className="theme-muted mt-1 text-[11px]">{new Date(message.created_at).toLocaleString("en-IN")}</p>
                      </div>
                    );
                  })}
              </div>

              <form action={sendAdminMessageAction} className="mt-4 grid gap-2">
                <select name="client_id" className="theme-input rounded-lg px-3 py-2 text-sm" defaultValue={selectedClientId} required>
                  <option value="">Select client</option>
                  {(clients ?? []).map((client) => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
                <textarea name="body" rows={3} placeholder="Message to client" className="theme-input rounded-lg px-3 py-2 text-sm" required />
                <StorageUploadField name="attachment_url" label="Attach image/video" folder="messages/admin" accept="image/*,video/*" />
                <button className="theme-btn-primary w-fit rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">Send</button>
              </form>
            </article>
          )}

          {activeTab === "website-cms" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Website CMS</h2>
              <p className="theme-muted mt-2 text-sm">
                Upload unlimited work snapshots/videos. Only media upload is required; title and notes are optional. Layout auto-stays consistent across screens.
              </p>
              <form action={addPortfolioItemAction} className="mt-4 grid gap-3 rounded-xl border border-white/10 bg-black/15 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="title" placeholder="Optional title (auto-generated if blank)" className="theme-input rounded-lg px-3 py-2 text-sm" />
                  <input name="result" placeholder="Optional note/result" className="theme-input rounded-lg px-3 py-2 text-sm" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <select name="media_type" className="theme-input rounded-lg px-3 py-2 text-sm">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                  <input
                    type="number"
                    name="sort_order"
                    defaultValue={0}
                    className="theme-input rounded-lg px-3 py-2 text-sm"
                    placeholder="Display order"
                  />
                </div>
                <StorageUploadField name="media_url" label="Portfolio media" folder="portfolio" accept="image/*,video/*" />
                <input name="external_link" placeholder="Case-study link (optional)" className="theme-input rounded-lg px-3 py-2 text-sm" />
                <label className="inline-flex items-center gap-2 text-xs text-[#e9ddba]">
                  <input type="checkbox" name="is_published" defaultChecked />
                  Publish on portfolio page
                </label>
                <button className="theme-btn-primary w-fit rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">
                  Save Portfolio Item
                </button>
              </form>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(portfolioItems ?? []).map((item) => (
                  <div key={item.id} className="rounded-xl border border-white/10 bg-black/15 p-4">
                    <p className="text-sm font-semibold text-[#f3e7c5]">{item.title}</p>
                    <p className="theme-muted mt-1 text-xs">{item.result}</p>
                    <p className="theme-muted mt-1 text-xs">
                      {item.media_type} | {item.is_published ? "Published" : "Draft"} | Order {item.sort_order ?? 0}
                    </p>
                    <a href={item.media_url} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-xs text-[#f3e7c5] underline underline-offset-4">
                      Open media
                    </a>
                    <form action={deletePortfolioItemAction} className="mt-3">
                      <input type="hidden" name="portfolio_id" value={item.id} />
                      <button className="rounded-sm border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10">
                        Delete
                      </button>
                    </form>
                  </div>
                ))}
                {!portfolioItems?.length && (
                  <p className="theme-muted text-sm">
                    No CMS portfolio items yet. Add your first item above. If this stays empty, run the SQL table setup for `portfolio_items`.
                  </p>
                )}
              </div>
            </article>
          )}

          {activeTab === "settings" && (
            <article className="theme-card rounded-2xl p-5">
              <h2 className="font-display text-3xl text-[#f6f0cf]">Admin Settings</h2>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <form action={updateAdminSessionSettingsAction} className="rounded-xl border border-white/10 bg-black/15 p-4">
                  <p className="text-sm font-semibold text-[#f3e7c5]">Session Settings</p>
                  <select
                    name="preferred_language"
                    defaultValue={profile.preferred_language ?? "en"}
                    className="theme-input mt-3 w-full rounded-lg px-3 py-2 text-sm"
                  >
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
                    className="theme-input mt-3 w-full rounded-lg px-3 py-2 text-sm"
                    placeholder="Auto logout (minutes)"
                  />
                  <button className="theme-btn-primary mt-3 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">Save</button>
                </form>

                <form action={removeClientAction} className="rounded-xl border border-white/10 bg-black/15 p-4">
                  <p className="text-sm font-semibold text-[#f3e7c5]">Remove Client</p>
                  <select name="client_id" className="theme-input mt-3 w-full rounded-lg px-3 py-2 text-sm" required>
                    <option value="">Select client</option>
                    {(clients ?? []).map((client) => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                  <button className="theme-btn-primary mt-3 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">Remove</button>
                </form>

                <form action={resetClientPasswordAction} className="rounded-xl border border-white/10 bg-black/15 p-4">
                  <p className="text-sm font-semibold text-[#f3e7c5]">Reset Client Password</p>
                  <input name="email" type="email" placeholder="Client email" className="theme-input mt-3 w-full rounded-lg px-3 py-2 text-sm" required />
                  <input name="new_password" type="password" placeholder="New temporary password" className="theme-input mt-3 w-full rounded-lg px-3 py-2 text-sm" minLength={8} required />
                  <button className="theme-btn-primary mt-3 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">Reset Password</button>
                </form>

                {profile.role === "owner" && (
                  <form action={upsertStaffRoleAction} className="rounded-xl border border-white/10 bg-black/15 p-4">
                    <p className="text-sm font-semibold text-[#f3e7c5]">Owner Controls: Create/Update Staff Role</p>
                    <input
                      name="full_name"
                      placeholder="Full name"
                      className="theme-input mt-3 w-full rounded-lg px-3 py-2 text-sm"
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="User email"
                      className="theme-input mt-3 w-full rounded-lg px-3 py-2 text-sm"
                      required
                    />
                    <select
                      name="role"
                      className="theme-input mt-3 w-full rounded-lg px-3 py-2 text-sm"
                      defaultValue="admin"
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="owner">Owner</option>
                      <option value="client">Client</option>
                    </select>
                    <input
                      name="password"
                      type="password"
                      placeholder="Password (required for new users)"
                      className="theme-input mt-3 w-full rounded-lg px-3 py-2 text-sm"
                    />
                    <button className="theme-btn-primary mt-3 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]">
                      Save Role
                    </button>
                  </form>
                )}
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}




