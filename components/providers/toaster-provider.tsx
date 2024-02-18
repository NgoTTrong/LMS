"use client";
import LoginService from "@/services/login/login-service";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
	const { isLoaded, userId, sessionId, getToken } = useAuth();

	useEffect(() => {
		if (userId && isLoaded) LoginService.loginClerk(userId);
	}, [userId, isLoaded]);
	return <Toaster />;
};

export default ToasterProvider;
