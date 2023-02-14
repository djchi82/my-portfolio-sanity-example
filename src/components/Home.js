import React from "react";
import image from "../shark.jpg"

export default function Home() {
    return (
        <main>
            <img src={image} alt="Shark diver image" className="absolute object-cover w-full h-full"  />
            <section className="relative flex justify-center min-h-scree pt-12 lg:pt-64 px-8">
                <h1 className="text-6xl text-green-100 font-bold cursive leading-none lg:leading-snug home-name">Hi! I'm Ryan</h1>
            </section>
        </main>
    )
}