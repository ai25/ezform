import { z } from "zod";
import { env } from "~/env.mjs";
import { type UnsplashSearchResponse } from "~/types/unsplash";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { type UnsplashErrorResponse } from "../../../types/unsplash";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";

const searchPhotosQueryParamsSchema = z.object({
    query: z.string(),
    per_page: z.number().optional(),
    order_by: z.union([z.literal("latest"), z.literal("relevant")]).optional(),
    collections: z.string().optional(),
    content_filter: z.union([z.literal("low"), z.literal("high")]).optional(),
    color: z
        .union([
            z.literal("black_and_white"),
            z.literal("black"),
            z.literal("white"),
            z.literal("yellow"),
            z.literal("orange"),
            z.literal("red"),
            z.literal("purple"),
            z.literal("magenta"),
            z.literal("green"),
            z.literal("teal"),
            z.literal("blue"),
        ])
        .optional(),
    orientation: z.union([z.literal("landscape"), z.literal("portrait"), z.literal("squarish")]).optional(),
    lang: z.string().optional(),
    cursor: z.number().nullish(),
});

export const unsplashRouter = createTRPCRouter({
    search: protectedProcedure
        .input(searchPhotosQueryParamsSchema)
        .query(
            async ({
                input: { query, per_page, order_by, collections, content_filter, color, orientation, lang, cursor },
            }) => {
                cursor = cursor ?? 1;
                const url = new URL(
                    `https://api.unsplash.com/search/photos?query=${query}&client_id=${env.UNSPLASH_ACCESS_KEY}${
                        cursor ? `&page=${cursor}` : ""
                    }${per_page ? `&per_page=${per_page}` : ""}${order_by ? `&order_by=${order_by}` : ""}${
                        collections ? `&collections=${collections}` : ""
                    }${content_filter ? `&content_filter=${content_filter}` : ""}${color ? `&color=${color}` : ""}${
                        orientation ? `&orientation=${orientation}` : ""
                    }${lang ? `&lang=${lang}` : ""} `,
                );
                const response = await fetch(url);
                const results = (await response.json()) as UnsplashSearchResponse | UnsplashErrorResponse;
                if ((results as UnsplashErrorResponse).errors) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: (results as UnsplashErrorResponse).errors[0],
                    });
                }
                const totalPages = (results as UnsplashSearchResponse).total_pages;
                const nextPage = cursor < totalPages ? cursor + 1 : null;
                return { ...results, nextPage };
            },
        ),
});
