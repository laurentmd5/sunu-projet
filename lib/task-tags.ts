export function normalizeTaskTags(tags: unknown): string[] | null {
    return Array.isArray(tags) && tags.every((tag) => typeof tag === "string")
        ? tags
        : null;
}
