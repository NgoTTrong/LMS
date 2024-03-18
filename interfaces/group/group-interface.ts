import { IUser } from "../user/user-interface";

export interface IGroup {
    id: string;
    createdAt: Date;
    creatorId: string;
    image: string;
    title: string;
    description: string;
    password: string;
    isPublic: boolean;
    creator: IUser;
    _count: {
        GroupMember: number;
    };
    GroupMember: IGroupMember[];
}
export interface IGroupMember {
    id: string;
    memberId: string;
    status: "JOINED" | "WAITING";
    groupId: string;
    isOwner: boolean;
}
export interface IGroupDetail {
    id: string;
    createdAt: Date;
    creatorId: string;
    image: string;
    title: string;
    description: string;
    password: string;
    isPublic: boolean;
    creator: IUser;
    _count: {
        GroupMember: number;
    };
    GroupMember: {
        id: string;
        memberId: string;
        status: "JOINED" | "WAITING";
        groupId: string;
        isOwner: boolean;
        member: IUser;
    }[];
    GroupPost: IPost[];
}
export interface IPost {
    id: string;
    createdAt: Date;
    creatorId: string;
    creator: IUser;
    content: string;
    name: string;
    groupId: string;
    GroupPostComment: IComment[];
}
export interface IComment {
    id: string;
    createdAt: Date;
    memberId: string;
    message: string;
    postId: string;
    parentId?: string;
    member: IUser;
    numOfReplys: number;
}
