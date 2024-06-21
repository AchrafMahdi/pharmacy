import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <div class="max-w-[50rem] flex flex-col mx-auto size-full">
                <main id="content">
                    <div class="text-center py-10 px-4 sm:px-6 lg:px-8">
                        <h1 class="block text-7xl font-bold text-gray-800 sm:text-9xl">
                            404
                        </h1>
                        <p class="mt-3 text-gray-600">
                            Oops, something went wrong.
                        </p>
                        <p class="text-gray-600">
                            Sorry, we couldn't find your page.
                        </p>
                        <div class="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                            <Link
                                class="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-lime-600 text-white hover:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none"
                                to="/home"
                            >
                                <svg
                                    class="flex-shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                                Back to homepage
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
