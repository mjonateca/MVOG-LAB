type DisabledSupabaseClient = {
  from: (table: string) => any;
};

export function createSupabaseAdmin(): DisabledSupabaseClient | null {
  return null;
}
