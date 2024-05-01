export interface ILeaderBoard {
	userId: string;
	point: number;
	createdAt: string;
	user: {
		name: string;
		avatar: string;
		rank: IRank;
	};
}

export interface IRank {
	id: string;
	createdAt: string;
	name: string;
	description: string;
	minPoint: number;
	maxPoint: number;
	rankIcon: string;
}
