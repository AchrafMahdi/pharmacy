import { useState } from "react";

const SelectMap = () => {
    const cities = [
        {
            city: "agadir",
            mapUrl: "https://www.google.com/maps/d/u/2/embed?mid=1gEc1Kl64X5PU9gYRO5zKA1VKY9J0xic&ehbc=2E312F&noprof=1",
        },
        {
            city: "casablanca",
            mapUrl: "https://www.google.com/maps/d/u/2/embed?mid=127f6gJLnzscoTwsfYrkY_n87JeRnM8E&ehbc=2E312F&noprof=1",
        },
        {
            city: "marrackech",
            mapUrl: "https://www.google.com/maps/d/u/2/embed?mid=1JOB8t6-e1gZM_V1l4Zm5eesk9q4WUlI&ehbc=2E312F&noprof=1",
        },
        {
            city: "Rabat",
            mapUrl: "https://www.google.com/maps/d/u/2/embed?mid=115tMRG4aOslkm5FuB5e8knv4wi3yeoE&ehbc=2E312F&noprof=1",
        },
        {
            city: "Salé",
            mapUrl: "https://www.google.com/maps/d/u/2/embed?mid=1F8csq2Jm_UxtHrojlM2KzL8nvSosXx4&ehbc=2E312F&noprof=1",
        },
    ].sort();

    const [citi, setCiti] = useState(cities[0].mapUrl);

    return (
        <div>
            <div className="w-56 md:w-96 mx-auto">
                <label htmlFor="hs-hidden-select" className="sr-only">
                    Choose city
                </label>
                <select
                    onChange={(s) => setCiti(s.target.value)}
                    id="hs-hidden-select"
                    className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none text-center"
                >
                    <option selected="">-- choose a city --</option>
                    {cities.map((city) => (
                        <option value={city.mapUrl}>
                            {city.city.charAt(0).toUpperCase() +
                                city.city.slice(1).toLowerCase()}
                        </option>
                    ))}
                </select>
            </div>
            {/* <!-- Features --> */}
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                {/* <!-- Tab Content --> */}
                <div className="mt-12 md:mt-16">
                    <div
                        id="tabs-with-card-1"
                        role="tabpanel"
                        aria-labelledby="tabs-with-card-item-1"
                    >
                        {/* <!-- Devices --> */}
                        <div className="max-w-[1140px] lg:pb-32 relative">
                            {/* <!-- Browser Device --> */}
                            <figure className="ms-auto me-20 relative z-[1] max-w-full w-[50rem] h-auto shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] rounded-b-lg">
                                <div className="relative flex items-center max-w-[50rem] bg-white border-b border-gray-100 rounded-t-lg py-2 px-24">
                                    <div className="flex space-x-1 absolute top-2/4 start-4 -translate-y-1">
                                        <span className="size-2 bg-gray-200 rounded-full"></span>
                                        <span className="size-2 bg-gray-200 rounded-full"></span>
                                        <span className="size-2 bg-gray-200 rounded-full"></span>
                                    </div>
                                    <div className="flex justify-center items-center size-full bg-gray-200 text-[.25rem] text-gray-800 rounded-sm sm:text-[.5rem]">
                                        www.pharma.co
                                    </div>
                                </div>

                                <div className="bg-gray-800 rounded-b-lg">
                                    <iframe
                                        className="w-full"
                                        src={citi}
                                        height="480"
                                    ></iframe>
                                </div>
                            </figure>
                            {/* <!-- End Browser Device --> */}
                        </div>
                        {/* <!-- End Devices --> */}
                    </div>

                    <div
                        id="tabs-with-card-2"
                        className="hidden"
                        role="tabpanel"
                        aria-labelledby="tabs-with-card-item-2"
                    >
                        {/* <!-- Devices --> */}
                        <div className="max-w-[1140px] lg:pb-32 relative">
                            {/* <!-- Browser Device --> */}
                            <figure className="ms-auto me-20 relative z-[1] max-w-full w-[50rem] h-auto shadow-shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)] rounded-b-lg">
                                <div className="relative flex items-center max-w-[50rem] bg-gray-800 border-b border-gray-700 rounded-t-lg py-2 px-24">
                                    <div className="flex space-x-1 absolute top-2/4 start-4 -translate-y-1">
                                        <span className="size-2 bg-gray-700 rounded-full"></span>
                                        <span className="size-2 bg-gray-700 rounded-full"></span>
                                        <span className="size-2 bg-gray-700 rounded-full"></span>
                                    </div>
                                    <div className="flex justify-center items-center size-full bg-gray-700 text-[.25rem] sm:text-[.5rem] text-gray-200 rounded-sm">
                                        www.pharma.co
                                    </div>
                                </div>

                                <div className="bg-gray-800 rounded-b-lg">
                                    <iframe
                                        className="w-full"
                                        src={citi}
                                        height="480"
                                    ></iframe>
                                </div>
                            </figure>
                            {/* <!-- End Browser Device --> */}
                        </div>
                        {/* <!-- End Devices --> */}
                    </div>

                    <div
                        id="tabs-with-card-3"
                        className="hidden"
                        role="tabpanel"
                        aria-labelledby="tabs-with-card-item-3"
                    >
                        {/* <!-- Devices --> */}
                        <div className="max-w-[1140px] lg:pb-32 relative">
                            {/* <!-- Mobile Device --> */}
                            <figure className="hidden absolute bottom-0 start-0 z-[2] max-w-full w-60 h-auto mb-20 ms-20 lg:block">
                                <div className="p-1.5 bg-gray-100 rounded-3xl shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(45_55_75_/_20%),_0_2rem_4rem_-2rem_rgb(45_55_75_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(45_55_75_/_20%)]">
                                    <img
                                        className="max-w-full rounded-[1.25rem] h-auto"
                                        src="../assets/img/mockups/img13.jpg"
                                        alt="Image Description"
                                    />
                                </div>
                            </figure>
                            {/* <!-- End Mobile Device --> */}

                            {/* <!-- Browser Device --> */}
                            <figure className="ms-auto me-20 relative z-[1] max-w-full w-[50rem] h-auto shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] rounded-b-lg">
                                <div className="relative flex items-center max-w-[50rem] bg-white border-b border-gray-100 rounded-t-lg py-2 px-24">
                                    <div className="flex space-x-1 absolute top-2/4 start-4 -translate-y-1">
                                        <span className="size-2 bg-gray-200 rounded-full"></span>
                                        <span className="size-2 bg-gray-200 rounded-full"></span>
                                        <span className="size-2 bg-gray-200 rounded-full"></span>
                                    </div>
                                    <div className="flex justify-center items-center size-full bg-gray-200 text-[.25rem] text-gray-800 rounded-sm sm:text-[.5rem]">
                                        www.preline.co
                                    </div>
                                </div>

                                <div className="bg-gray-800 rounded-b-lg">
                                    <img
                                        className="max-w-full h-auto rounded-b-lg"
                                        src="../assets/img/mockups/img12.jpg"
                                        alt="Image Description"
                                    />
                                </div>
                            </figure>
                            {/* <!-- End Browser Device --> */}
                        </div>
                        {/* <!-- End Devices --> */}
                    </div>
                </div>
                {/* <!-- End Tab Content --> */}
            </div>
            {/* <!-- End Features --> */}
        </div>
    );
};

export default SelectMap;
