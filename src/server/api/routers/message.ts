import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const messageRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const messages = await ctx.db.message.findMany({
      orderBy: { createdAt: "asc" },
    });

    return messages;
  }),

  create: publicProcedure
    .input(
      z.object({
        content: z.string().min(1).max(500),
        username: z.string().min(1).max(50),
        color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.message.create({
        data: {
          content: input.content,
          username: input.username,
          color: input.color,
        },
      });
    }),
});