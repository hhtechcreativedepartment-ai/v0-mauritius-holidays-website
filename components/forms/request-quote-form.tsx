"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Plane, Shield } from "lucide-react"
import { airports, brand, hotels } from "@/lib/data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  compact?: boolean
  defaultHotel?: string
  className?: string
}

type FormValues = {
  title: string
  firstName: string
  surname: string
  phone: string
  email: string
  hotel: string
  boardBasis: string
  departureDate: string
  flexibility: string
  nights: string
  airport: string
  maximumPrice: string
  adults: string
  children: string
  childAges: string[]
  comments: string
}

const initialValues = (defaultHotel = ""): FormValues => ({
  title: "", firstName: "", surname: "", phone: "", email: "",
  hotel: defaultHotel, boardBasis: "", departureDate: "", flexibility: "",
  nights: "", airport: "", maximumPrice: "", adults: "2", children: "0",
  childAges: [], comments: "",
})

const boardOptions = ["Room Only", "Bed and Breakfast", "Half Board", "Full Board", "All Inclusive"]
const flexibilityOptions = ["Exact date", "± 1 day", "± 3 days", "± 7 days", "Fully flexible"]
const requiredMessage: Record<string, string> = {
  title: "Please select your title.",
  firstName: "Please enter your first name.",
  surname: "Please enter your surname.",
  phone: "Please enter a valid phone number.",
  email: "Please enter a valid email address.",
  hotel: "Please select your preferred hotel.",
  boardBasis: "Please select a board basis.",
  departureDate: "Please select a future departure date.",
  flexibility: "Please select your date flexibility.",
  nights: "Please select the number of nights.",
  airport: "Please select your preferred departure airport.",
  adults: "Please select at least one adult.",
}

function QuoteSelect({
  id,
  value,
  placeholder,
  options,
  onChange,
  error,
}: {
  id: string
  value: string
  placeholder: string
  options: Array<{ value: string; label: string }>
  onChange: (value: string) => void
  error?: string
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-13! w-full cursor-pointer rounded-2xl border-slate-200 bg-white px-5 text-base text-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:border-sky-300 hover:bg-sky-50/30 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 data-[placeholder]:text-slate-400"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={7}
        showScrollButtons={false}
        className="max-h-[min(28rem,var(--radix-select-content-available-height))] rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.14)] [&_[data-slot=select-viewport]]:[scrollbar-width:none] [&_[data-slot=select-viewport]::-webkit-scrollbar]:hidden"
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            showIndicator={false}
            className="my-0.5 min-h-10 cursor-pointer rounded-xl px-3.5 py-2 text-sm text-slate-700 outline-none transition-colors focus:bg-sky-50 focus:text-primary data-[state=checked]:bg-sky-100 data-[state=checked]:font-semibold data-[state=checked]:text-primary"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function RequestQuoteForm({ compact = false, defaultHotel = "", className = "" }: Props) {
  const [values, setValues] = useState<FormValues>(() => initialValues(defaultHotel))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const grid = compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"

  const update = (name: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: "" }))
  }

  const setChildren = (value: string) => {
    const count = Number(value)
    setValues((current) => ({
      ...current,
      children: value,
      childAges: Array.from({ length: count }, (_, index) => current.childAges[index] ?? ""),
    }))
  }

  const validate = () => {
    const next: Record<string, string> = {}
    Object.keys(requiredMessage).forEach((key) => {
      if (!values[key as keyof FormValues]) next[key] = requiredMessage[key]
    })
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = requiredMessage.email
    if (values.phone && !/^[+\d][\d\s().-]{6,}$/.test(values.phone)) next.phone = requiredMessage.phone
    if (values.departureDate && values.departureDate < today) next.departureDate = requiredMessage.departureDate
    if (Number(values.adults) < 1) next.adults = requiredMessage.adults
    if (values.maximumPrice && Number(values.maximumPrice) < 0) next.maximumPrice = "Maximum price cannot be negative."
    values.childAges.forEach((age, index) => {
      if (age === "") next[`childAge${index}`] = `Please select Child ${index + 1}'s age.`
    })
    if (values.comments.length > 2000) next.comments = "Comments must be 2,000 characters or fewer."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (status === "submitting" || !validate()) return
    setStatus("submitting")
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, pageUrl: window.location.href }),
      })
      if (!response.ok) {
        const body = await response.json().catch(() => null)
        if (body?.errors) setErrors(body.errors)
        throw new Error("Submission failed")
      }
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className={`rounded-[2rem] bg-white p-8 text-center shadow-sm ${className}`} role="status">
        <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-emerald-600" />
        <h2 className="font-serif text-3xl font-bold text-primary">Thank You</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Your quote request has been received. One of our Mauritius holiday experts will contact you within 24 hours.
        </p>
      </div>
    )
  }

  const fieldClass = "h-13 w-full rounded-full border border-slate-200 bg-slate-50 px-5 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 disabled:opacity-60"
  const ErrorText = ({ name }: { name: string }) => errors[name] ? <p id={`${name}-error`} className="mt-1.5 text-sm text-red-600">{errors[name]}</p> : null
  const Field = ({ name, label, children }: { name: string; label: string; children: React.ReactNode }) => (
    <div className="min-w-0">
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-slate-800">{label} <span className="text-red-600" aria-hidden="true">*</span></label>
      {children}
      <ErrorText name={name} />
    </div>
  )
  const errorProps = (name: string) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  })

  return (
    <div className={`rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(15,44,85,0.08)] sm:p-10 ${className}`}>
      <div className="mb-10">
        <h2 className="font-serif text-3xl font-bold text-primary">Request a Quote</h2>
        <p className="mt-2 text-muted-foreground">Fill in your details and we&apos;ll send you a personalised quote within 24 hours.</p>
      </div>
      <form onSubmit={submit} noValidate>
        <fieldset disabled={status === "submitting"} className="space-y-10">
          <section aria-labelledby="personal-details">
            <h3 id="personal-details" className="mb-5 border-b border-sky-100 pb-3 text-xl font-bold text-primary">Personal Details</h3>
            <div className={`grid gap-x-6 gap-y-6 ${grid}`}>
              <Field name="title" label="Title">
                <QuoteSelect id="title" value={values.title} placeholder="Select title" options={["Mr.", "Mrs.", "Miss", "Ms.", "Dr."].map((v) => ({ value: v, label: v }))} onChange={(value) => update("title", value)} error={errors.title} />
              </Field>
              <Field name="firstName" label="First Name"><input id="firstName" value={values.firstName} onChange={(e) => update("firstName", e.target.value)} autoComplete="given-name" className={fieldClass} {...errorProps("firstName")} /></Field>
              <Field name="surname" label="Surname"><input id="surname" value={values.surname} onChange={(e) => update("surname", e.target.value)} autoComplete="family-name" className={fieldClass} {...errorProps("surname")} /></Field>
              <Field name="phone" label="Phone Number"><input id="phone" type="tel" value={values.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" className={fieldClass} {...errorProps("phone")} /></Field>
              <Field name="email" label="Email Address"><input id="email" type="email" value={values.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" className={fieldClass} {...errorProps("email")} /></Field>
            </div>
          </section>

          <section aria-labelledby="holiday-details">
            <h3 id="holiday-details" className="mb-5 border-b border-sky-100 pb-3 text-xl font-bold text-primary">Holiday Details</h3>
            <div className={`grid gap-x-6 gap-y-6 ${grid}`}>
              <Field name="hotel" label="Select Hotel">
                <QuoteSelect id="hotel" value={values.hotel} placeholder="Select a hotel" options={hotels.map((h) => ({ value: h.slug, label: h.name }))} onChange={(value) => update("hotel", value)} error={errors.hotel} />
              </Field>
              <Field name="boardBasis" label="Board Basis">
                <QuoteSelect id="boardBasis" value={values.boardBasis} placeholder="Select board basis" options={boardOptions.map((v) => ({ value: v, label: v }))} onChange={(value) => update("boardBasis", value)} error={errors.boardBasis} />
              </Field>
            </div>
          </section>

          <section aria-labelledby="departure-details">
            <h3 id="departure-details" className="mb-5 border-b border-sky-100 pb-3 text-xl font-bold text-primary">Preferred Departure Date</h3>
            <div className={`grid gap-x-6 gap-y-6 ${grid}`}>
              <Field name="departureDate" label="Departure Date"><input id="departureDate" type="date" min={today} value={values.departureDate} onChange={(e) => update("departureDate", e.target.value)} className={fieldClass} {...errorProps("departureDate")} /></Field>
              <Field name="flexibility" label="Flexibility">
                <QuoteSelect id="flexibility" value={values.flexibility} placeholder="Select flexibility" options={flexibilityOptions.map((v) => ({ value: v, label: v }))} onChange={(value) => update("flexibility", value)} error={errors.flexibility} />
              </Field>
              <Field name="nights" label="Number of Nights">
                <QuoteSelect id="nights" value={values.nights} placeholder="Select nights" options={Array.from({ length: 28 }, (_, i) => i + 1).map((v) => ({ value: String(v), label: `${v} night${v === 1 ? "" : "s"}` }))} onChange={(value) => update("nights", value)} error={errors.nights} />
              </Field>
              <Field name="airport" label="Departure Airport">
                <QuoteSelect id="airport" value={values.airport} placeholder="Select airport" options={airports.map((v) => ({ value: v, label: v }))} onChange={(value) => update("airport", value)} error={errors.airport} />
              </Field>
              <div>
                <label htmlFor="maximumPrice" className="mb-2 block text-sm font-semibold text-slate-800">Maximum Price £</label>
                <div className="relative"><span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-600">£</span><input id="maximumPrice" type="number" min="0" step="1" value={values.maximumPrice} onChange={(e) => update("maximumPrice", e.target.value)} className={`${fieldClass} pl-8`} {...errorProps("maximumPrice")} /></div>
                <ErrorText name="maximumPrice" />
              </div>
            </div>
          </section>

          <section aria-labelledby="passengers">
            <h3 id="passengers" className="mb-5 border-b border-sky-100 pb-3 text-xl font-bold text-primary">Passengers</h3>
            <div className={`grid gap-x-6 gap-y-6 ${grid}`}>
              <Field name="adults" label="Adults">
                <QuoteSelect id="adults" value={values.adults} placeholder="Select adults" options={Array.from({ length: 10 }, (_, i) => i + 1).map((v) => ({ value: String(v), label: String(v) }))} onChange={(value) => update("adults", value)} error={errors.adults} />
              </Field>
              <div><label htmlFor="children" className="mb-2 block text-sm font-semibold text-slate-800">Children</label><QuoteSelect id="children" value={values.children} placeholder="Select children" options={Array.from({ length: 7 }, (_, i) => i).map((v) => ({ value: String(v), label: String(v) }))} onChange={setChildren} /></div>
              {values.childAges.map((age, index) => (
                <Field key={index} name={`childAge${index}`} label={`Child ${index + 1} Age`}>
                  <QuoteSelect id={`childAge${index}`} value={age} placeholder="Select age" options={Array.from({ length: 18 }, (_, i) => i).map((v) => ({ value: String(v), label: `${v} year${v === 1 ? "" : "s"}` }))} onChange={(value) => setValues((current) => ({ ...current, childAges: current.childAges.map((v, i) => i === index ? value : v) }))} error={errors[`childAge${index}`]} />
                </Field>
              ))}
            </div>
          </section>

          <section aria-labelledby="additional-information">
            <h3 id="additional-information" className="mb-5 border-b border-sky-100 pb-3 text-xl font-bold text-primary">Additional Information</h3>
            <label htmlFor="comments" className="mb-2 block text-sm font-semibold text-slate-800">Comments / Special Requests</label>
            <textarea id="comments" rows={6} maxLength={2000} value={values.comments} onChange={(e) => update("comments", e.target.value)} placeholder="Tell us about your preferred hotel, room requirements, special occasions or anything else that will help us prepare your quote..." className="w-full resize-y rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100" {...errorProps("comments")} />
            <ErrorText name="comments" />
          </section>

          {status === "error" && <p role="alert" className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">We could not send your quote request. Please check your details and try again.</p>}
          <div className="flex items-start gap-3 rounded-2xl bg-sky-50 p-4 text-sm text-slate-700">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" aria-hidden="true" />
            <p>Your information is safe with us. We will only use it to prepare and respond to your holiday enquiry. See our <Link href="/privacy" className="font-semibold text-primary underline-offset-2 hover:underline">Privacy Policy</Link>.</p>
          </div>
          <button type="submit" disabled={status === "submitting"} className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-white transition hover:bg-primary/90 focus-visible:ring-4 focus-visible:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-60">
            <Plane className="h-4 w-4" aria-hidden="true" />{status === "submitting" ? "Sending Request..." : "Request Quote"}
          </button>
        </fieldset>
        <p className="mt-5 text-center text-sm text-muted-foreground">Prefer to call? <a className="font-semibold text-primary hover:underline" href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a></p>
      </form>
    </div>
  )
}
