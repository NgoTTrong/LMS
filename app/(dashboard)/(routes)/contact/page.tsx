"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";
import toast from "react-hot-toast";

const ContactPage = () => {
	return (
		<main className="w-full p-6 md:grid md:grid-cols-2 flex flex-col md:gap-24 gap-4">
			<div className="col-span-1 flex flex-col gap-6">
				<h1 className="text-2xl font-medium">
					Contact us or report bugs to us
				</h1>
				<div className="flex flex-col gap-2">
					<label htmlFor="name">Name</label>
					<Input
						placeholder="Enter your name"
						id="name"
						type="text"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="email">Email</label>
					<Input
						placeholder="Enter your email"
						id="email"
						type="email"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="message">Message</label>
					<Textarea placeholder="Typing" id="message" />
				</div>
				<Button
					onClick={() => {
						toast.success("Send successfully, thank you so muck!");
					}}
				>
					Submit
				</Button>
			</div>
			<div className="col-span-1 flex flex-col items-start gap-4">
				<img
					src="/gif/contact.png"
					className="w-[400px] object-cover"
					alt=""
				/>
				<div className="flex items-center gap-4">
					<Mail />
					<span>toeicmastery@gmail.com</span>
				</div>
				<div className="flex items-center gap-4">
					<Phone />
					<span>+84 362928053</span>
				</div>
			</div>
		</main>
	);
};

export default ContactPage;
