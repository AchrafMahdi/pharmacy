const FAQ = () => {
    return (
        <div>
            {/* <!-- FAQ --> */}
            <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                {/* <!-- Title --> */}
                <div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                    <h2 class="text-2xl font-bold md:text-3xl md:leading-tight text-gray-800">
                        Frequently Asked Questions
                    </h2>
                </div>
                {/* <!-- End Title --> */}

                <div class="max-w-5xl mx-auto">
                    {/* <!-- Grid --> */}
                    <div class="grid sm:grid-cols-2 gap-6 md:gap-12">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">
                                How do I find a night-shift pharmacy near me?
                            </h3>
                            <p class="mt-2 text-gray-600">
                                Use our search tool to locate pharmacies open
                                during night shifts in your area.
                            </p>
                        </div>
                        {/* <!-- End Col --> */}

                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">
                                Can I order prescription medicine through
                                Pharma?
                            </h3>
                            <p class="mt-2 text-gray-600">
                                Yes, simply upload your prescription during the
                                ordering process.
                            </p>
                        </div>
                        {/* <!-- End Col --> */}

                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">
                                How long does delivery take?
                            </h3>
                            <p class="mt-2 text-gray-600">
                                Delivery times vary but are typically within 1-2
                                hours for urgent needs.
                            </p>
                        </div>
                        {/* <!-- End Col --> */}

                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">
                                Is there a delivery fee for ordering medicine?
                            </h3>
                            <p class="mt-2 text-gray-600">
                                Delivery fees depend on the pharmacy and the
                                distance. The fee will be clearly displayed
                                during the checkout process.
                            </p>
                        </div>
                        {/* <!-- End Col --> */}

                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">
                                Can I track my medicine delivery?
                            </h3>
                            <p class="mt-2 text-gray-600">
                                Yes, once your order is placed, you will receive
                                a tracking link to monitor the status of your
                                delivery in real-time.
                            </p>
                        </div>
                        {/* <!-- End Col --> */}

                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">
                                What if I have a problem with my order?
                            </h3>
                            <p class="mt-2 text-gray-600">
                                If you encounter any issues with your order,
                                please contact our customer support team via
                                email or phone for assistance. We are here to
                                help 24/7.
                            </p>
                        </div>
                        {/* <!-- End Col --> */}
                    </div>
                    {/* <!-- End Grid --> */}
                </div>
            </div>
            {/* <!-- End FAQ --> */}
        </div>
    );
};

export default FAQ;
