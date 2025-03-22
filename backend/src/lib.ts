import { z } from "zod";

export const credential = z
  .object({
    type: z.literal("credential"),
    value: z.string(),
  })
  .or(
    z.object({
      type: z.literal("file"),
      mimeType: z.string(),
      sourceB64: z.string(),
    }),
  );

export const loanDetails = z.object({
  amountRequested: z.number(),
  reason: z.string(),
});

export const loansRequest = z.object({
  credentials: z.record(z.string(), credential),
  loanDetails,
});

export const errorResponse = <T extends string>(text: T) =>
  z.object({ error: z.literal(text) });
