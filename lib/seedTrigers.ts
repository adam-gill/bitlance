import postgres from "postgres";
import "dotenv/config";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("Couldn't find db url");
}
const sql = postgres(dbUrl);

async function main() {
  // Create the function to handle new user insertions
  await sql`
    CREATE OR REPLACE FUNCTION auth.handle_new_user()
    RETURNS trigger AS $$
    BEGIN
      INSERT INTO public.user (user_id, username, email, created_at, name, discord_handle, role)
      VALUES (NEW.user_id, NEW.username, NEW.email, NEW.created_at, NEW.name, NEW.discord_handle, NEW.role);
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `;

  // Create the trigger to call the function on new user insertions
  await sql`
    CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION auth.handle_new_user();
  `;

  // Create the function to handle user deletions
  await sql`
    CREATE OR REPLACE FUNCTION auth.handle_user_delete()
    RETURNS trigger AS $$
    BEGIN
      DELETE FROM auth.users WHERE user_id = OLD.user_id;
      RETURN OLD;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `;

  // Create the trigger to call the function on user deletions
  await sql`
    CREATE OR REPLACE TRIGGER on_profile_user_deleted
    AFTER DELETE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION auth.handle_user_delete();
  `;

  console.log("Finished adding triggers and functions for user handling.");
  process.exit();
}

main();
