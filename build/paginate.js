/**
 * Paginates an array of items based on limit and offset.
 *
 * @template T - The type of items being paginated
 * @param items - The full array of items to paginate
 * @param limit - Maximum number of items to return (0 = unlimited)
 * @param offset - Number of items to skip from the beginning
 * @returns Paginated result with items and metadata
 *
 * @example
 * ```ts
 * const allSongs = ['Song A', 'Song B', 'Song C', 'Song D', 'Song E'];
 * const page = paginate(allSongs, 2, 2);
 * // page.items: ['Song C', 'Song D']
 * // page.showing: '3-4 of 5'
 * // page.hasMore: true
 * // page.nextOffset: 4
 * ```
 */
export function paginate(items, limit, offset) {
    const total = items.length;
    const start = offset;
    const end = limit > 0 ? Math.min(offset + limit, total) : total;
    const page = items.slice(start, end);
    const showing = total === 0 ? '0' : `${start + 1}-${end} of ${total}`;
    const hasMore = limit > 0 && offset + limit < total;
    return {
        items: page,
        total,
        showing,
        hasMore,
        nextOffset: offset + limit,
    };
}
/**
 * Prints a hint to the console showing how to get the next page of results.
 *
 * @param page - The current page result
 */
export function printPaginationHint(page) {
    if (page.hasMore) {
        console.log(`\n   Use --offset ${page.nextOffset} to see more`);
    }
}
