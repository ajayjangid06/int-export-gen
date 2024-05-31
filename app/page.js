import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col p-24">
            <Link
                href={"/signin"}
                className="ms-1 font-semibold leading-6 text-blue-500 hover:text-blue-600"
            >
                Signin
            </Link>
            <Link
                href={"/create-account"}
                className="ms-1 font-semibold leading-6 text-blue-500 hover:text-blue-600"
            >
                create account
            </Link>
        </main>
    );
}
