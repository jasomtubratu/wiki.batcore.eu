"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "@nextui-org/input";

import Footer from "@/components/main/footer";
import { Navbar } from "@/components/navbar";


export default function SignupFormDemo() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();

    async function verifyIfLogged() {
        const key = Cookies.get("sessionKey");

        toast("Kontrolujem ťvôj účet")
        const response = await fetch("/api/admin/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + key,
            },
        })

        if (response.ok) {
            router.push("/admin");
            toast.success("Gratulujeme! Dostal si sa k nám do Administrácie!")
        } else {
            toast.error("Nemáš dostatočné práva na prístup do tejto sekcie")
        }
    }


    useEffect(() => {
        if (Cookies.get("sessionKey")) {
            verifyIfLogged()
        }
    }, [])

    async function handleSubmit(event: any) {
        event.preventDefault();
        toast.loading("Kontrolujem ťvôj účet");

        if (!email || !password) return toast.error("Nemôžeš sa prihlásiť bez emailu a hesla");
        

        const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        if (response.ok) {
            const data = await response.json();

            if (data.key) {
                Cookies.set("googlesesionid", data.key, { expires: 7 });
                toast.success("Gratulujeme! Dostal si sa k nám do Administrácie!");
                router.push("/admin");
            } else {
                toast.error("Server nám poslal neplatný request :(");
            }
            verifyIfLogged()
        } else {
            toast.error("Nemáš dostatočné práva na prístup do tejto sekcie");
        }
    }

    // tento kod som napisal 21 53 ked sa ma typek pytal aky som bol sigma ked som sa rozpraval zo zenou
    return (
        <>
        <Navbar />
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">

                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Poďme sa prihlásiť!
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Ale najskôr sa uisti, či si naozaj jeden z vyvolených Editorov na to, aby si sa mohol prihlásiť.
                </p>

                <form className="my-8" onSubmit={handleSubmit}>
                    <Input className="mb-4" id="email" label="Emailová adresa" placeholder="info@batcore.eu" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input className="mb-4" id="password" label="Heslo" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                        onClick={(event) => handleSubmit(event)}
                    >
                        Prihlásiť sa &rarr;
                        <BottomGradient />
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};