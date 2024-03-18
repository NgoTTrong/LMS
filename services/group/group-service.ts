import {
    IComment,
    IGroup,
    IGroupDetail,
    IGroupMember,
    IPost,
} from "@/interfaces/group/group-interface";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";
import { headers } from "next/headers";

const groupRoutes = {
    createGroup: apiEndpoint + "/group",
    joinGroup: apiEndpoint + "/group/join",
    browse: apiEndpoint + "/group/browse",
    comment: apiEndpoint + "/group/post",
    replyComment: apiEndpoint + "/group/post/reply",
};

export default class GroupService {
    static getAllGroups = async () => {
        try {
            const response = await RequestAPI.call<IGroup[]>(
                groupRoutes.createGroup,
                {
                    method: "GET",
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return [];
    };
    static getById = async (groupId: string) => {
        try {
            const response = await RequestAPI.call<IGroupDetail>(
                groupRoutes.createGroup + "/" + groupId,
                {
                    method: "GET",
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };
    static createGroup = async (
        userId: string,
        groupInfo: {
            title: string;
            description: string;
            password?: string;
            image: string;
        }
    ) => {
        try {
            const response = await RequestAPI.call(groupRoutes.createGroup, {
                method: "POST",
                data: groupInfo,

                headers: {
                    Authorization: userId,
                },
            });
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };
    static createPost = async (
        groupId: string,
        userId: string,
        postInfo: {
            name: string;
            content: string;
        }
    ) => {
        try {
            const response = await RequestAPI.call<IPost>(
                groupRoutes.createGroup + "/" + groupId + "/post",
                {
                    method: "POST",
                    headers: {
                        Authorization: userId,
                    },
                    data: postInfo,
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };
    static getAllPosts = async (groupId: string) => {
        try {
            const response = await RequestAPI.call<IPost[]>(
                groupRoutes.createGroup + "/" + groupId + "/post",
                {
                    method: "GET",
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return [];
    };
    static getAllComment = async (postId: string) => {
        try {
            const response = await RequestAPI.call<IComment[]>(
                groupRoutes.comment + "/" + postId,
                {
                    method: "GET",
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return [];
    };
    static createComment = async (
        userId: string,
        postId: string,
        message: string
    ) => {
        try {
            const response = await RequestAPI.call(
                groupRoutes.comment + "/" + postId,
                {
                    method: "POST",
                    data: { message },

                    headers: {
                        Authorization: userId,
                    },
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return [];
    };
    static replyComment = async (
        userId: string,
        postId: string,
        commentId: string,
        message: string
    ) => {
        try {
            const response = await RequestAPI.call(
                groupRoutes.replyComment + "/" + postId,
                {
                    method: "POST",
                    data: { message, commentId },

                    headers: {
                        Authorization: userId,
                    },
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return [];
    };
    static getAllReplyComments = async (commentId: string) => {
        try {
            const response = await RequestAPI.call<IComment[]>(
                groupRoutes.replyComment + "/" + commentId,
                {
                    method: "GET",
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return [];
    };
    static joinGroup = async (
        userId: string,
        groupId: string,
        password?: string
    ) => {
        try {
            const response = await RequestAPI.call<IGroupMember>(
                groupRoutes.joinGroup + "/" + groupId,
                {
                    method: "GET",
                    headers: {
                        Authorization: userId,
                    },
                    params: { password },
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };

    static browse = async (groupMemberId: string, status?: "JOINED") => {
        try {
            const response = await RequestAPI.call<IGroupMember>(
                groupRoutes.browse + "/" + groupMemberId,
                {
                    method: "GET",
                    params: {
                        status,
                    },
                }
            );
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {}
        return null;
    };
}
