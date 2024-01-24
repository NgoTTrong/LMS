import Image from "next/image";

const Logo = () => {
  return <Image src={"/logo.svg"} alt="logo" height={160} width={160} />;
};

export default Logo;
