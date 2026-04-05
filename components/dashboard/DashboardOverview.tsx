type CalendarItem = {
  day: string;
  item: string;
  status: string;
};

type TrackingItem = {
  channel: string;
  impressions: string;
  engagement: string;
};

type ApprovalItem = {
  asset: string;
  status: string;
};

type DeliverableItem = {
  item: string;
  deliveryDate: string;
};

type DashboardOverviewProps = {
  clientName: string;
  calendar: CalendarItem[];
  tracking: TrackingItem[];
  approvals: ApprovalItem[];
  deliverables: DeliverableItem[];
  analyticsSummary: string;
};

export function DashboardOverview({
  clientName,
  calendar,
  tracking,
  approvals,
  deliverables,
  analyticsSummary
}: DashboardOverviewProps) {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const calendarByDay = weekdays.map((day) => ({
    day,
    items: calendar.filter((entry) => entry.day.toLowerCase().startsWith(day.toLowerCase().slice(0, 2)))
  }));

  return (
    <div className="grid gap-5 lg:grid-cols-[250px_1fr]">
      <aside className="theme-card rounded-2xl p-4">
        <p className="font-display text-2xl text-[#f6f0cf]">TulSip Portal</p>
        <p className="theme-muted mt-1 text-xs uppercase tracking-[0.08em]">{clientName}</p>
        <nav className="mt-5 space-y-2">
          {[
            "Dashboard",
            "Content Calendar",
            "Approvals",
            "Deliverables",
            "Ad Insights",
            "Analytics",
            "Messages",
            "Settings"
          ].map((item, index) => (
            <div
              key={item}
              className={`rounded-lg border px-3 py-2 text-sm ${
                index === 0
                  ? "border-[#ce1919]/70 bg-[#7d0f0f]/30 text-[#f6f0cf]"
                  : "border-white/10 text-[#cdbf9f]"
              }`}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      <div className="grid gap-5">
        <section className="theme-card rounded-2xl p-5">
          <h2 className="font-display text-3xl text-[#f6f0cf]">Content Calendar</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-7">
            {calendarByDay.map((slot) => (
              <article key={slot.day} className="rounded-xl border border-white/10 bg-black/15 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#bdae8a]">{slot.day}</p>
                <ul className="mt-3 space-y-2">
                  {slot.items.length ? (
                    slot.items.slice(0, 3).map((entry) => (
                      <li key={`${slot.day}-${entry.item}`} className="rounded-md border border-white/10 bg-white/5 px-2 py-1">
                        <p className="truncate text-xs text-[#f3e7c5]">{entry.item}</p>
                        <p className="text-[10px] uppercase tracking-[0.08em] text-[#b9ac97]">{entry.status}</p>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-[#8f816b]">No post</li>
                  )}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-2">
          <section className="theme-card rounded-2xl p-5">
            <h3 className="font-display text-2xl text-[#f6f0cf]">Post Tracking</h3>
            <ul className="mt-4 space-y-2">
              {tracking.length ? (
                tracking.map((entry) => (
                  <li key={entry.channel} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/15 px-3 py-2 text-sm">
                    <span className="text-[#f3e7c5]">{entry.channel}</span>
                    <span className="theme-muted">
                      {entry.impressions} | {entry.engagement}
                    </span>
                  </li>
                ))
              ) : (
                <li className="theme-muted text-sm">No tracking data yet.</li>
              )}
            </ul>
          </section>

          <section className="theme-card rounded-2xl p-5">
            <h3 className="font-display text-2xl text-[#f6f0cf]">Pending Approvals</h3>
            <ul className="mt-4 space-y-2">
              {approvals.length ? (
                approvals.map((entry) => (
                  <li key={entry.asset} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/15 px-3 py-2 text-sm">
                    <span className="text-[#f3e7c5]">{entry.asset}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] ${
                      entry.status === "pending" ? "bg-[#7d0f0f]/50 text-[#ffd5d5]" : "bg-white/10 text-[#d8caad]"
                    }`}>
                      {entry.status}
                    </span>
                  </li>
                ))
              ) : (
                <li className="theme-muted text-sm">No approvals pending.</li>
              )}
            </ul>
          </section>
        </div>

        <section className="theme-card rounded-2xl p-5">
          <h3 className="font-display text-2xl text-[#f6f0cf]">Deliverables + Meta/Google Insights</h3>
          <ul className="mt-4 grid gap-2 md:grid-cols-2">
            {deliverables.length ? (
              deliverables.map((entry) => (
                <li key={entry.item} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/15 px-3 py-2 text-sm">
                  <span className="text-[#f3e7c5]">{entry.item}</span>
                  <span className="theme-muted">{entry.deliveryDate}</span>
                </li>
              ))
            ) : (
              <li className="theme-muted text-sm">No deliverables yet.</li>
            )}
          </ul>
          <div className="theme-muted mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-sm leading-7">
            {analyticsSummary}
          </div>
        </section>
      </div>
    </div>
  );
}
