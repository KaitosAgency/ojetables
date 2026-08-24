"use client";

import { useMemo, useState } from "react";
import { LinkButton } from "@/components/ui/link-button";
import {
  personalizationProductTypes,
  personalizationWizardOptions,
  routes,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type WizardAnswers = {
  event: string;
  quantity: string;
  delay: string;
};

function getRecommendation(answers: WizardAnswers) {
  const { event, quantity, delay } = answers;
  if (!event || !quantity || !delay) return null;

  if (quantity === "small" || delay === "express") {
    return personalizationProductTypes.find((p) => p.id === "reusable-digital")!;
  }
  if (quantity === "volume" || event === "chr" || event === "pro") {
    return personalizationProductTypes.find((p) => p.id === "reusable-seri")!;
  }
  if (event === "mariage" || quantity === "medium") {
    return personalizationProductTypes.find((p) => p.id === "carton")!;
  }
  return personalizationProductTypes.find((p) => p.id === "carton")!;
}

export function PersonalizationWizard() {
  const [answers, setAnswers] = useState<WizardAnswers>({
    event: "",
    quantity: "",
    delay: "",
  });

  const recommendation = useMemo(() => getRecommendation(answers), [answers]);
  const allAnswered = answers.event && answers.quantity && answers.delay;

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-teal">
        Assistant
      </p>
      <h3 className="mt-2 text-xl font-bold text-brand-navy md:text-2xl">
        Quel produit personnalisé pour mon projet ?
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        3 questions - nous vous orientons vers la bonne gamme avec minimum et délai clairs.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <fieldset>
          <legend className="text-sm font-semibold text-brand-navy">Type d&apos;événement</legend>
          <div className="mt-3 flex flex-col gap-2">
            {personalizationWizardOptions.events.map((option) => (
              <label
                key={option.id}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                  answers.event === option.id
                    ? "border-brand-teal/40 bg-brand-beige/50 text-brand-navy"
                    : "border-border hover:bg-muted/50",
                )}
              >
                <input
                  type="radio"
                  name="event"
                  value={option.id}
                  checked={answers.event === option.id}
                  onChange={() => setAnswers((prev) => ({ ...prev, event: option.id }))}
                  className="accent-brand-teal"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-brand-navy">Quantité estimée</legend>
          <div className="mt-3 flex flex-col gap-2">
            {personalizationWizardOptions.quantities.map((option) => (
              <label
                key={option.id}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                  answers.quantity === option.id
                    ? "border-brand-teal/40 bg-brand-beige/50 text-brand-navy"
                    : "border-border hover:bg-muted/50",
                )}
              >
                <input
                  type="radio"
                  name="quantity"
                  value={option.id}
                  checked={answers.quantity === option.id}
                  onChange={() => setAnswers((prev) => ({ ...prev, quantity: option.id }))}
                  className="accent-brand-teal"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-brand-navy">Délai souhaité</legend>
          <div className="mt-3 flex flex-col gap-2">
            {personalizationWizardOptions.delays.map((option) => (
              <label
                key={option.id}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                  answers.delay === option.id
                    ? "border-brand-teal/40 bg-brand-beige/50 text-brand-navy"
                    : "border-border hover:bg-muted/50",
                )}
              >
                <input
                  type="radio"
                  name="delay"
                  value={option.id}
                  checked={answers.delay === option.id}
                  onChange={() => setAnswers((prev) => ({ ...prev, delay: option.id }))}
                  className="accent-brand-teal"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div
        className={cn(
          "mt-8 rounded-xl border p-5 transition-all",
          allAnswered
            ? "border-brand-teal/30 bg-brand-beige/40"
            : "border-dashed border-border bg-muted/20",
        )}
      >
        {recommendation ? (
          <>
            <p className="text-xs font-bold uppercase tracking-wide text-brand-teal">
              Recommandation
            </p>
            <p className="mt-2 text-lg font-bold text-brand-navy">{recommendation.label}</p>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Minimum</dt>
                <dd className="font-medium text-brand-navy">{recommendation.minQty}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">À partir de</dt>
                <dd className="font-medium text-brand-navy">{recommendation.unitFrom}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Délai indicatif</dt>
                <dd className="font-medium text-brand-navy">{recommendation.delay}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Technique</dt>
                <dd className="font-medium text-brand-navy">{recommendation.technique}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-3">
              <LinkButton href={recommendation.href} variant="brand" size="ctaSm">
                Voir ce produit
              </LinkButton>
              <LinkButton href={routes.quote} variant="brandOutline" size="ctaSm">
                Demander un devis
              </LinkButton>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Répondez aux 3 questions pour afficher la gamme adaptée à votre projet.
          </p>
        )}
      </div>
    </div>
  );
}
