"use client";
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas } from "@/lib/functions";
import PaymentService from "@/services/payment/payment-service";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
	courseId: string;
	price: number;
};

const CoursePayment = ({ courseId, price }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();
	const { userId } = useAuth();
	if (!userId) {
		redirect("/");
	}
	const purchaseCourse = async () => {
		try {
			setIsLoading(true);
			const purchase = await PaymentService.purchaseCourse(
				courseId,
				userId
			);
			if (purchase) {
				toast.success("Enroll successfully");
				router.refresh();
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Button onClick={purchaseCourse}>
			{isLoading ? (
				<Loader2 className="w-4 h-4 animate-spin" />
			) : (
				`Enroll for ${formatNumberWithCommas(price)}`
			)}
		</Button>
	);
};

export default CoursePayment;
