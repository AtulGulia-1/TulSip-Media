import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRole) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@tulsipmedia.com";
const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "TulSipAdmin@123";
const ownerEmail = process.env.SEED_OWNER_EMAIL ?? "owner@tulsipmedia.com";
const ownerPassword = process.env.SEED_OWNER_PASSWORD ?? "TulSipOwner@123";
const clientEmail = process.env.SEED_CLIENT_EMAIL ?? "client@tulsipmedia.com";
const clientPassword = process.env.SEED_CLIENT_PASSWORD ?? "TulSipClient@123";

const supabase = createClient(supabaseUrl, serviceRole, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function upsertUser({ email, password, fullName, role }) {
  const created = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  const userId = created.data.user?.id;
  if (!userId) {
    const list = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const existing = list.data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (!existing) throw created.error ?? new Error(`Unable to create user ${email}`);
    await supabase.auth.admin.updateUserById(existing.id, { password, email_confirm: true });

    await supabase.from("users").upsert(
      { auth_user_id: existing.id, full_name: fullName, role },
      { onConflict: "auth_user_id" }
    );
    return existing.id;
  }

  await supabase.from("users").upsert(
    { auth_user_id: userId, full_name: fullName, role },
    { onConflict: "auth_user_id" }
  );
  return userId;
}

const adminUserId = await upsertUser({
  email: adminEmail,
  password: adminPassword,
  fullName: "TulSip Admin",
  role: "admin"
});

const ownerUserId = await upsertUser({
  email: ownerEmail,
  password: ownerPassword,
  fullName: "TulSip Owner",
  role: "owner"
});

const clientUserId = await upsertUser({
  email: clientEmail,
  password: clientPassword,
  fullName: "Demo Client",
  role: "client"
});

await supabase.from("clients").upsert(
  {
    name: "TulSip Demo Client",
    industry: "Retail",
    website: "https://example.com",
    primary_contact_auth_user_id: clientUserId
  },
  { onConflict: "name" }
);

console.log("Seeded users:");
console.log(`Owner: ${ownerEmail} / ${ownerPassword}`);
console.log(`Admin: ${adminEmail} / ${adminPassword}`);
console.log(`Client: ${clientEmail} / ${clientPassword}`);
console.log(`Owner user id: ${ownerUserId}`);
console.log(`Admin user id: ${adminUserId}`);
