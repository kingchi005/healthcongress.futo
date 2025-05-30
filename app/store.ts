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
		title: "Innovative Solutions",
		text: "Discuss innovative indigenous technologies for health promotion and Health Management in Nigeria and other developing countries.",
	},
	{
		icon: "job-promo.png",
		title: "Expert Knowledge",
		text: "Learn from academics, scientists, policy makers, and industrialists about addressing emerging health concerns through indigenous knowledge.",
	},
	{
		icon: "time-management.jpg",
		title: "Networking Opportunity",
		text: "Connect with stakeholders in health sciences, technology and industry for potential collaborations and partnerships.",
	},
];

export const contacts = [
	{
		id: 1,
		name: "Dr. A. U. Megwas",
		title: "+234 8175074719",
		photo: "avatar.png",
	},
	{
		id: 0,
		name: "Congress Secretariat",
		title: "+234 8065687571",
		photo: "avatar.png",
	},
];

export const speakers = [
	{
		photo: "prof-emmanuel.jpg",
		name: "Prof. Emmanuel C. Opara",
		title:
			"Professor of Regenerative Medicine, Wake Forest University School of Medicine, Winston-Salem, North Carolina, United States",
	},
	{
		photo: "prof-nwoko.png",
		name: "Prof. B. E. B. Nwoke",
		title:
			"Professor of Public Health, Parasitology and Entomology, Imo State University, Nigeria",
	},
	{
		photo: "prof-john.jpeg",
		name: "Prof. John Emaimo",
		title:
			"Professor of Social Work Rector, Federal College of Dental Technology and Therapy, Enugu, Nigeria",
	},
];

export const host = [
	{
		photo: "dean-sict.jpg",
		name: "School of Health Technology",
		title: "Federal University of Technology, Owerri",
	},
];

export const guest = [
	{
		photo: "prof-gloria.jpg",
		name: "Dr. A. U. Megwas",
		title: "LOC Chairman, Dept. of Optometry",
	},
];
