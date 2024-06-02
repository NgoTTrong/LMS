"use client";
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas } from "@/lib/functions";
import { apiEndpoint } from "@/services/api/endpoint";
import PaymentService, { IPayment } from "@/services/payment/payment-service";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

type Props = {
	courseId: string;
	price: number;
};

const CoursePayment = ({ courseId, price }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();
	const { userId } = useAuth();
	const [purchase, setPurchase] = useState<IPayment>();
	const [socket, setSocket] = useState<any>(null);
	const connectFirstSocket = useRef(false);

	if (!userId) {
		redirect("/");
	}

	useEffect(() => {
		if (!socket) {
			setSocket(
				io(apiEndpoint, {
					withCredentials: true,
				})
			);

			return;
		}
	}, []);
	useEffect(() => {
		if (socket && purchase) {
			socket.on("payment-success", (data: any) => {
				console.log("Res", data);
				console.log("payment", purchase?.payment?.id);
				if (!data) return;
				if (data == purchase?.payment?.id) {
					console.log("Here");
					toast.success("Purchase course successfully");
					router.refresh();
				}
			});
		}
	}, [socket, purchase]);
	const purchaseCourse = async () => {
		try {
			setIsLoading(true);
			const purchase = await PaymentService.purchaseCourse(
				courseId,
				userId
			);
			if (purchase) {
				setPurchase(purchase);
				console.log(purchase?.zaloOrder?.order_url);
				window.open(purchase?.zaloOrder?.order_url, "_blank");
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
