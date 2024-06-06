'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

/**
 * A search input field component with debounced search functionality.
 *
 * @param {string} placeholder - The placeholder text for the search input field.
 */
export default function Search({ placeholder }: { placeholder: string }) {
  /**
   * Get the current search parameters from the URL.
   */
  const searchParams = useSearchParams();

  /**
   * Get the current pathname from the URL.
   */
  const pathname = usePathname();

  /**
   * Get the router object with the replace function.
   */
  const { replace } = useRouter();

  /**
   * Create a debounced function to handle search input changes.
   *
   * @param {string} term - The current value of the search input field.
   */
  const handleSearch = useDebouncedCallback((term) => {
    /**
     * Log a message to the console indicating that a search is being performed.
     */
    console.log(`Searching... ${term}`);

    /**
     * Create a new URLSearchParams object with the current search parameters.
     */
    const params = new URLSearchParams(searchParams);

    /**
     * If the search term is not empty, set the query parameter in the URLSearchParams object.
     */
    if (term) {
      params.set('query', term);
    } else {
      /**
       * If the search term is empty, delete the query parameter from the URLSearchParams object.
       */
      params.delete('query');
    }

    /**
     * Navigate to the current pathname with the updated search parameters.
     */
    replace(`${pathname}?${params.toString()}`);

    /**
     * Log the current value of the search input field to the console.
     */
    console.log(term);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          /**
           * Call the debounced handleSearch function with the current value of the search input field.
           */
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
