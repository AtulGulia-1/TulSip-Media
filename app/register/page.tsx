import { registerClientAction } from "@/app/register/actions";

export default async function RegisterPage({
  searchParams
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const error = resolvedSearchParams?.error;

  return (
    <>
      <section className="section-shell section-y" data-reveal>
        <h1 className="font-display text-5xl font-semibold text-[#f6f0cf]">Client Registration</h1>
        <p className="theme-muted mt-3 max-w-2xl">
          Create your portal account. You will get access to content calendar, approvals,
          deliverables, and reports after signup.
        </p>
      </section>

      <section className="section-shell section-b" data-reveal>
        <form action={registerClientAction} className="theme-card mx-auto grid max-w-2xl gap-4 rounded-2xl p-6">
          {error === "username_taken" && (
            <p className="rounded-lg border border-[#ce1919]/40 bg-[#7d0f0f]/20 px-3 py-2 text-xs text-[#ffd8d8]">
              Username is already taken. Please choose another one.
            </p>
          )}
          <input
            name="full_name"
            placeholder="Full name"
            className="theme-input rounded-xl px-3 py-2 text-sm"
            required
          />
          <input
            name="username"
            placeholder="Username (for login)"
            className="theme-input rounded-xl px-3 py-2 text-sm"
            required
          />
          <input
            name="business_name"
            placeholder="Business / Client name"
            className="theme-input rounded-xl px-3 py-2 text-sm"
            required
          />
          <input
            name="business_type"
            placeholder="Business type (Cafe, Real Estate, Salon...)"
            className="theme-input rounded-xl px-3 py-2 text-sm"
          />
          <input
            name="website"
            placeholder="Website URL"
            className="theme-input rounded-xl px-3 py-2 text-sm"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="theme-input rounded-xl px-3 py-2 text-sm"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="theme-input rounded-xl px-3 py-2 text-sm"
            required
          />
          <button className="theme-btn-primary w-fit rounded-sm px-5 py-2 text-sm font-semibold">
            Register
          </button>
        </form>
      </section>
    </>
  );
}

