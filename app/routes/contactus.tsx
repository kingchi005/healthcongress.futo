import React from "react";
import {
	FaPhone,
	FaEnvelope,
	FaMapMarkerAlt,
	FaUniversity,
	FaPaperPlane,
} from "react-icons/fa";

export default function Contact() {
	return (
		<div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Get in touch with the Congress Secretariat for any inquiries about
						the 5th International Congress on Health Sciences and Technology.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Contact Information */}
					<div className="bg-white rounded-xl p-8 transform transition-all duration-300">
						<h2 className="text-2xl font-semibold text-gray-900 mb-8 border-b pb-4">
							Contact Information
						</h2>

						<div className="space-y-8">
							<div className="flex items-start group">
								<div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
									<FaUniversity className="w-6 h-6 text-blue-600" />
								</div>
								<div className="ml-4">
									<h3 className="text-lg font-medium text-gray-900">
										Congress Secretariat
									</h3>
									<p className="mt-2 text-gray-600 leading-relaxed">
										C/o Dean Office,
										<br />
										School of Health Technology
										<br />
										Federal University of Technology
										<br />
										P.M.B 1562, Owerri, Nigeria
									</p>
								</div>
							</div>

							<div className="flex items-start group">
								<div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
									<FaPhone className="w-6 h-6 text-blue-600" />
								</div>
								<div className="ml-4">
									<h3 className="text-lg font-medium text-gray-900">
										Phone Numbers
									</h3>
									<p className="mt-2 text-gray-600">
										<a
											href="tel:+2348175074719"
											className="hover:text-blue-600 transition-colors duration-300"
										>
											+234 8175074719
										</a>
										<br />
										<a
											href="tel:+2348065687571"
											className="hover:text-blue-600 transition-colors duration-300"
										>
											+234 8065687571
										</a>
									</p>
								</div>
							</div>

							<div className="flex items-start group">
								<div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
									<FaEnvelope className="w-6 h-6 text-blue-600" />
								</div>
								<div className="ml-4">
									<h3 className="text-lg font-medium text-gray-900">
										Email Addresses
									</h3>
									<p className="mt-2 text-gray-600">
										<a
											href="mailto:healthcongress@futo.edu.ng"
											className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
										>
											healthcongress@futo.edu.ng
										</a>
										<br />
										<a
											href="mailto:fifthhealthcongress@gmail.com"
											className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
										>
											fifthhealthcongress@gmail.com
										</a>
									</p>
								</div>
							</div>

							<div className="flex items-start group">
								<div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
									<FaMapMarkerAlt className="w-6 h-6 text-blue-600" />
								</div>
								<div className="ml-4">
									<h3 className="text-lg font-medium text-gray-900">
										Location
									</h3>
									<p className="mt-2 text-gray-600">
										Owerri, Imo State, Nigeria
										<br />
										Sam Mbakwe International Cargo Airport
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className="bg-white rounded-xl shadow p-8 transform transition-all duration-300 hover:shadow-2xl">
						<h2 className="text-2xl font-semibold text-gray-900 mb-8 border-b pb-4">
							Send us a Message
						</h2>
						<form className="space-y-6">
							<div className="space-y-2">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Full Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									className="app-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-300"
									required
									placeholder="Enter your full name"
								/>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className="app-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-300"
									required
									placeholder="Enter your email address"
								/>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="subject"
									className="block text-sm font-medium text-gray-700"
								>
									Subject
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									className="app-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-300"
									required
									placeholder="Enter message subject"
								/>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="message"
									className="block text-sm font-medium text-gray-700"
								>
									Message
								</label>
								<textarea
									id="message"
									name="message"
									rows={4}
									className="app-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-300"
									required
									placeholder="Type your message here..."
								></textarea>
							</div>

							<button
								type="submit"
								className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02]"
							>
								<FaPaperPlane className="mr-2" />
								Send Message
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
