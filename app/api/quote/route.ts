import { NextResponse } from "next/server"
import { z } from "zod"

const quoteSchema = z.object({
  title: z.enum(["Mr.", "Mrs.", "Miss", "Ms.", "Dr."]),
  firstName: z.string().trim().min(1).max(80),
  surname: z.string().trim().min(1).max(80),
  phone: z.string().trim().regex(/^[+\d][\d\s().-]{6,}$/),
  email: z.string().trim().email(),
  hotel: z.string().trim().min(1),
  boardBasis: z.enum(["Room Only", "Bed and Breakfast", "Half Board", "Full Board", "All Inclusive"]),
  departureDate: z.string().date(),
  flexibility: z.enum(["Exact date", "± 1 day", "± 3 days", "± 7 days", "Fully flexible"]),
  nights: z.coerce.number().int().min(1).max(365),
  airport: z.string().trim().min(1),
  maximumPrice: z.union([z.literal(""), z.coerce.number().nonnegative()]),
  adults: z.coerce.number().int().min(1).max(20),
  children: z.coerce.number().int().min(0).max(10),
  childAges: z.array(z.coerce.number().int().min(0).max(17)),
  comments: z.string().max(2000),
  pageUrl: z.string().url(),
}).superRefine((data, context) => {
  const today = new Date().toISOString().slice(0, 10)
  if (data.departureDate < today) context.addIssue({ code: "custom", path: ["departureDate"], message: "Please select a future departure date." })
  if (data.childAges.length !== data.children) context.addIssue({ code: "custom", path: ["childAges"], message: "Please provide an age for every child." })
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const result = quoteSchema.safeParse(body)
  if (!result.success) {
    const errors: Record<string, string> = {}
    for (const issue of result.error.issues) errors[String(issue.path[0])] = issue.message
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  // This project has no configured CRM, email service, or database. This endpoint
  // is the single integration point for adding one without changing every form.
  const enquiry = { ...result.data, submittedAt: new Date().toISOString() }
  console.info("Quote enquiry received", enquiry)
  return NextResponse.json({ ok: true }, { status: 201 })
}
