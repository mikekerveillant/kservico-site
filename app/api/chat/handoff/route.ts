import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { isOfficeHours, OFFICE_HOURS_LABEL } from "@/lib/chat/office-hours";

export async function POST(request: Request) {
  const { conversationId, name, email, phone } = await request.json();

  if (!conversationId) {
    return NextResponse.json({ error: "conversationId is required" }, { status: 400 });
  }

  const supabase = await createServiceClient();

  await supabase
    .from("chat_conversations")
    .update({
      status: "handoff_requested",
      customer_name: name ?? null,
      customer_email: email ?? null,
      customer_phone: phone ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", conversationId);

  const officeHoursNow = isOfficeHours();

  const note = officeHoursNow
    ? "You've been connected to our support team — someone will be with you shortly."
    : `You've been connected to our support team. We're currently outside office hours (${OFFICE_HOURS_LABEL}), so a staff member will follow up as soon as we're open.`;

  await supabase.from("chat_messages").insert({
    conversation_id: conversationId,
    role: "system",
    content: note,
  });

  return NextResponse.json({ note, officeHoursNow });
}
