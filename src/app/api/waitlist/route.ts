import { getSupabaseClient } from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email, name, whatsapp_number, niche, frequency,
      blockers, dream_outcome, biggest_fear, audience_size,
      open_feedback, income_bracket, willing_to_pay, willing_price,
      completed_onboarding,
    } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Valid email required." }, { status: 400 });
    }

    const record: Record<string, unknown> = {
      email: email.toLowerCase().trim(),
    };

    if (name)                 record.name = name;
    if (whatsapp_number)      record.whatsapp_number = whatsapp_number;
    if (niche)                record.niche = niche;
    if (frequency)            record.frequency = frequency;
    if (blockers?.length)     record.blockers = blockers;
    if (dream_outcome)        record.dream_outcome = dream_outcome;
    if (biggest_fear)         record.biggest_fear = biggest_fear;
    if (audience_size)        record.audience_size = audience_size;
    if (open_feedback)        record.open_feedback = open_feedback;
    if (income_bracket)       record.income_bracket = income_bracket;
    if (willing_to_pay)       record.willing_to_pay = willing_to_pay;
    if (willing_price)        record.willing_price = willing_price;
    if (completed_onboarding) record.completed_onboarding = true;

    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("waitlist")
      .upsert(record, { onConflict: "email" });

    if (error) {
      console.error("[waitlist] Supabase error:", error);
      return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }

    return Response.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[waitlist] Unhandled error:", err);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
