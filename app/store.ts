import { create } from "zustand";
import { compute, computed } from "zustand-computed-state";

interface AuthStore {
	authed: boolean;
	token: string;
	authenticate(): void;
	logout(): void;
}

export const useAuth = create<AuthStore>()(
	computed((set, get) =>
		compute<AuthStore>({
			token: "",
			get authed() {
				return !!this.token;
			},
			authenticate() {
				set((st) => ({ ...st, token: "authenticated" }));
			},
			logout() {
				set((st) => ({ ...st, token: "" }));
			},
		})
	)
);

export const about_cards = [
	{
		icon: "group-of-people-laptop.jpeg",
		title: "Network and Collaborate",
		text: "Meet like-minded designers and developers, build valuable relationships and collaborate on exciting projects and share knowledge.",
	},
	{
		icon: "job-promo.png",
		title: "Advance Your Career",
		text: "Acquire in-demand skills, build a strong portfolio and prepare for a successful career in web design.",
	},
	{
		icon: "time-management.jpg",
		title: "Maximizing Your Time",
		text: "With a carefully curated agenda and a focus on efficiency, we ensure that you get the most out of your time with us",
	},
];

export const contacts = [
	{
		id: 1,
		name: "Ihekwoba Success C.",
		title: "08137095749",
		photo: "dr-amadi.jpg",
	},
	{
		id: 0,
		name: "Enemuor Chidubem Mmaduka",
		title: "09034075099",
		photo: "dr-ayogu.jpg",
	},
];

export const speakers = [
	// {
	// 	photo: "Kingchi-photo.jpg",
	// 	name: "Mr. KingDavid C. Ezennwa",
	// 	title: "CE-sPESS Intern (Full stack Web developer)",
	// },
	// // { photo: "dr-mbonu.jpg", name: "Dr. Ekene Mbonu", title: "(MCE/SESET FUTO)" },
	// // {
	// // 	photo: "dr-ayogu.jpg",
	// // 	name: "Dr. Ayogu Ikechukwu",
	// // 	title: "(CSC/SICT FUTO)",
	// // },
	// {
	// 	photo: "mrs-chinwe.jpg",
	// 	name: "Mrs. Chinwe Ezirim",
	// 	title: "(MD Kuch-99 Agriculture and Seeds Limited)",
	// },
];

export const host = [
	{
		photo: "dean-sict.jpg",
		name: "Prof. U.F. Eze",
		title: "Dean SICT (Host)",
	},
	{
		photo: "cyb-hod.jpg",
		name: "Prof. Onojo Ondoma",
		title: "HOD CYB (Co-host)",
	},
	{
		photo: "dr-amadi.jpg",
		name: "Engr. Dr. E. C. Amadi",
		title: "Leturer IFT (Organizer)",
	},
];

export const guest = [
	{
		photo: "prof-gloria.jpg",
		name: "Prof.Gloria Chukwudebe",
		title: "Immediately past Dean SICT/Director CE-sPESS",
	},
];
