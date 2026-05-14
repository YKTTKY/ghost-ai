"use client"

import { SignIn } from "@clerk/nextjs"
import { dark } from "@clerk/ui/themes"
import { Workflow, Users, Bot } from "lucide-react"

const features = [
  {
    icon: Bot,
    title: "AI-Powered Design Generation",
    description: "Describe your architecture in plain English and let Ghost AI generate the diagram for you.",
  },
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description: "Your entire team can refine, comment, and iterate on the same canvas simultaneously.",
  },
  {
    icon: Workflow,
    title: "Interactive System Diagrams",
    description: "Drag, connect, and visualize your system architecture with an intuitive interface.",
  },
]

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 flex-col justify-between px-14 py-12 bg-elevated">
        <h1 className="text-xl font-semibold text-text-primary tracking-tight">
          ghost
          <span className="text-accent-primary"> AI</span>
        </h1>
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold text-text-primary leading-tight">
            Design systems at the speed of thought.
          </h2>
          <p className="mt-4 text-base text-text-secondary leading-relaxed">
            Describe your architecture in plain English. Ghost AI maps it to a shared
            canvas your whole team can refine in real time.
          </p>
          <ul className="mt-10 space-y-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <li key={feature.title} className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-primary-dim text-accent-primary">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{feature.title}</p>
                    <p className="mt-0.5 text-sm text-text-muted leading-relaxed">{feature.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div />
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-12 bg-base">
        <div className="w-full max-w-sm">
          <SignIn
              appearance={{
                theme: dark,
                variables: {
                  colorPrimary: "var(--accent-primary)",
                  colorBackground: "var(--bg-surface)",
                  colorDanger: "var(--state-error)",
                  colorSuccess: "var(--state-success)",
                  colorWarning: "var(--state-warning)",
                  colorInput: "var(--bg-elevated)",
                  colorInputForeground: "var(--text-primary)",
                  colorForeground: "var(--text-primary)",
                  colorMutedForeground: "var(--text-secondary)",
                  colorNeutral: "var(--bg-subtle)",
                  fontFamily: "var(--font-geist-sans)",
                },
                options: {
                  socialButtonsVariant: "iconButton",
                },
              }}
            forceRedirectUrl="/editor"
            signUpUrl="/sign-up"
          />
        </div>
      </div>
    </div>
  )
}
